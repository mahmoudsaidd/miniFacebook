import { userModel } from "../../../DB/models/user.model.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../../services/sendEmail.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode,
} from 'http-status-codes';


export const signUp = async (req, res) => {
  try {
    const { name, email, password, cPassword } = req.body;
  const foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "you are already Registered" });
  } else {
    let hashedPass = await bcryptjs.hash(
      password,
      parseInt(process.env.saltRounds)
    );
    let user = new userModel({ name, email, password: hashedPass });
    let savedUser = await user.save();
    let token = jwt.sign({ id: savedUser._id }, process.env.tokenEmailKey, {
      expiresIn: 60,
    });
    let refreshToken = jwt.sign(
      { id: savedUser._id },
      process.env.tokenEmailKey,
      { expiresIn: 60 * 60 }
    );
    // let URL=`${req.protocol}://`
    let link=`${req.protocol}://${req.headers.host}${process.env.baseURL}auth/confirmEmail/${token}`
    let message = `<a href="${link}">Please click here to verify your email </a>
        <br>
        <br>
        <a href="http://localhost:3000/api/v1/auth/refreshToken/${refreshToken}">Click here to get new one</a>`;
    sendEmail(email, message);
   console.log( sendEmail(email, message));
    res.status(StatusCodes.CREATED).json({ message: "added successfully", savedUser,status:getReasonPhrase(StatusCodes.CREATED) });
  }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    
  }
};




export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
    let matched = await bcryptjs.compare(password, foundedUser.password);
    if (matched) {
      if (foundedUser.isConfirmed) {
        let token = jwt.sign({ id: foundedUser._id }, process.env.tokenKey, {
          expiresIn: 60*60,
        });
        res.json({ message: "Welcome", foundedUser, token });
      } else {
        res.json({ message: "Please Confirm your email first" });
      }
    } else {
      res.json({ message: "Password in-correct" });
    }
  } else {
    res.json({ message: "you have to register first or confirm the email" });
  }
};


export const confirmEmail = async (req, res) => {
  let { token } = req.params;
  let decoded = jwt.verify(token, process.env.tokenEmailKey);
  if (decoded) {
    let user = await userModel.findOne({
      _id: decoded.id,
      isConfirmed: false,
    });
    if (user) {
      let updatedUser = await userModel.findByIdAndUpdate(
        decoded.id,
        { isConfirmed: true },
        { new: true }
      );
      res.json({ message: "Confirmed successfully", updatedUser });
    } else {
      res.json({ message: "You are already Confirmed or Invalid Token" });
    }
  } else {
    res.json({ message: "Invalid Token" });
  }
};


export const refreshToken = async (req, res) => {
  let { token } = req.params;
  let decoded = jwt.verify(token, process.env.tokenKey);
  if (!decoded || !decoded.id) {
    res.json({ message: "Invalid Token or ID" });
  } else {
    let user = await userModel.findById(decoded.id);
    if (!user) {
      res.json({ message: "user didn't register" });
    } else {
      if (user.isConfirmed) {
        res.json({ message: "Already confirmed" });
      } else {
        let token = jwt.sign({ id: user._id }, process.env.tokenEmailKey);
        let message = `<a href="http://localhost:3000/api/v1/auth/confirmEmail/${token}>This is the second email</a>`;
        sendEmail(user.email, message);
        res.json({ message: "Done, please check your email" });
      }
    }
  }
};


export const sendCode = async (req, res) => {
  let { email } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    res.json({ message: "User didn't register yet" });
  } else {
    let OTPCode = nanoid();
    console.log(OTPCode);
    await userModel.findByIdAndUpdate(user._id, { OTPCode });
    let message = `your OTPCode is ${OTPCode}`;
    sendEmail(user.email, message);
    res.json({ message: "Done, please check your email" });
  }
};


export const forgetPassword = async (req, res) => {
  try {
    let { OTPCode, email, password } = req.body;
    if (!OTPCode) {
      res.json({ message: "Code is not valid" });
    } else {
      let user = await userModel.findOne({ email, OTPCode });
      if (!user) {
        res.json({ message: "Email or code is not valid" });
      } else {
        const hashedPass = await bcryptjs.hash(
          password,
          parseInt(process.env.saltRound)
        );
        let updated = await userModel.findByIdAndUpdate(
          user._id,
          { OTPCode: null, password: hashedPass },
          { new: true }
        );
        res.json({ message: "Success", updated });
      }
    }
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

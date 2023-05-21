import joi from "joi";

export const signUpSchema = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(4).max(10).required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{3,8}$"))
        .required(),
      cPassword: joi.string().valid(joi.ref("password")).required(),
    }),
};

export const signInSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{3,8}$"))
        .required(),
    }),
};

export const forgetPassSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      OTPCode: joi.string().required(),
      password: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{3,8}$"))
        .required(),
    }),
};

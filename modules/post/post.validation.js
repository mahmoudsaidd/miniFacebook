import joi from "joi";

export const addPostSchema={
    body:joi.object().required().keys({
      content: joi.string().required(),
      image:joi.string()

    })
}
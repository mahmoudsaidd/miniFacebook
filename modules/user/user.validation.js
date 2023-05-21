import joi from "joi";

export const changePasswordSchema={
    body:joi.object().required().keys({
        currentPassword:joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{3,8}$")).required(),
        newPassword:joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{3,8}$")).required(),
        newCPassword:joi.string().valid(joi.ref('newPassword'))

    }),
    headers:joi.object().required().keys({
        authorization:joi.string().required()
    }).unknown(true)
}


export const deletedUserSchema={
    headers:joi.object().required().keys({
        authorization:joi.string().required()
    }).unknown(true)
}

export const getAllUsersSchema={
    headers:joi.object().required().keys({
        authorization:joi.string().required()
    }).unknown(true)
}
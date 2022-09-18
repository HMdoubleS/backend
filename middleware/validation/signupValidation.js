const yup = require('yup');
const { namePatten, emailPattern, passwordPattern }= require('../../utils/regexValidation');

const signupSchema = yup.object({
    firstName: yup.string().trim().matches(namePatten, 'First name not valid').required(),
    lastName: yup.string().trim().matches(namePatten, 'Last name not valid').required(),
    email: yup.string().trim().matches(emailPattern, 'Email is not valid').required(),
    password: yup.string().trim().matches(passwordPattern, 'Password is not valid').required()
});


exports.signupValidation = async (req, res, next) => {
    const body = req.body

    try {
        await signupSchema.validate(body)
        next();
        return next();
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
};
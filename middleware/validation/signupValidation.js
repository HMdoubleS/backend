function signupValidation(signupSchema) {
    return async (req, res, next) => {
        try {
            const validatedSignup = await signupSchema.validate(req.body);
            req.body = validatedSignup;
            next();
        } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
        }
    };
};

module.exports = signupValidation;
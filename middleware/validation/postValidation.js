function postValidation(postSchema) {
    return async (req, res, next) => {
        try {
            const validatedPost = await postSchema.validate(req.body);
            req.body = validatedPost;
            next();
        } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
        }
    };
};

module.exports = postValidation;




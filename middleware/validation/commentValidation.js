const yup = require('yup');

const commentSchema = yup.object({
    author: yup.string().trim().required(),
    commentText: yup.string().min(10).max(300).required()
});

exports.commentValidation = async (req, res, next) => {
    const body = req.body

    try {
        await commentSchema.validate(body)
        next();
        return next();
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
};
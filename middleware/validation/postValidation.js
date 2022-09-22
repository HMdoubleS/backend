const yup = require('yup');

const postSchema = yup.object({

    title: yup.string().min(8).max(40).required(),
    author: yup.string().trim().required(),
    postText: yup.string().min(10).max(300).required(),
    media: yup.mixed()

});

exports.postValidation = async (req, res, next) => {
    const body = req.body

    try {
        await postSchema.validate(body)
        next();
        return next();
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
};





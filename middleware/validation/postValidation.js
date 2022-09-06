const yup = require('yup');

const postSchema = yup.object({
  body: yup.object({
    title: yup.string().min(8).max(40).required(),

  })  
});

async function postValidation(req, res, next) {
    try {
         req.body = await postSchema.validate(req.body);
         next();
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
};

module.exports =  postValidation;

const yup = require('yup');

const postSchema = yup.object({
  body: yup.object({
    title: yup.string().min(8).max(40).required(),
    author: yup.string().trim().required(),
    postText: yup.string().min(10).max(300).required(),
    image: yup.mixed()

  })  
});

module.exports = postSchema;


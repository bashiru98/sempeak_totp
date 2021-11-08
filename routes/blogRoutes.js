const mongoose = require('mongoose');
const qr = require("qrcode")
const totp = require("totp-generator");
const requireLogin = require('../middlewares/requireLogin');
const cleanCache = require('../middlewares/cleanCache');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/totps/:id', requireLogin, async (req, res) => {
    try {
     
      const code = await Blog.findOne({
        _id: req.params.id
      });

     
      qr.toDataURL(code.secret, (err, src) => {
        const blog  = {
          _id:code._id,
          imageUrl:src,
          content:totp(code.secret,{ period: 30 }),
          createdAt:code.createdAt,
          title:code.title,
        }

        res.send(blog);
      })
     
    } catch (error) {
      console.log(error)
    }
    
  });

  app.get('/api/totps',requireLogin, async (req, res) => {
  

    const blogs = await Blog.find({ })

    res.send(blogs);
  });

  app.post('/api/totps',requireLogin, async (req, res) => {
    const { title, content, imageUrl,user,secret} = req.body;
    const blog = new Blog({
      imageUrl,
      title,
      content,
      _user:user,
      secret:secret,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};

const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // store the results of the db query in a variable called postData. 
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId
      }
    });
    // this sanitizes the data we just got from the db above.
    const posts = postData.map((post) => post.get({ plain: true }));
    
    // render the "all-post-admin" template
    res.render('all-posts-admin', {
      // this is how we specify a different layout other than main! 
      layout: 'dashboard',
      
      posts,
    });
  
  } catch (err) {
    res.redirect('login');
  }
});

// Get new-post
router.get('/new', withAuth, (req, res) => {
  
  // render "new-post" template
  res.render('new-post', {
    // again, rendering with a different layout than main! 
    layout: 'dashboard',
  });
});

// GET route single post for updating
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // serializing the data
      const post = postData.get({ plain: true });
      // render "edit-post" template
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;

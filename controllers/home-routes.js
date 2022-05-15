const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    // we need to get all Posts and include the User for each.
    const postData = await Post.findAll({
      include: [User],
    });
    // serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));
    // Send over the 'loggedIn' session variable to the 'all-post' template
    res.render('all-posts', { posts, loggedIn:req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // serialize the data
      const post = postData.get({ plain: true });
      // Send over the 'loggedIn' session variable to the 'single-post' template
      res.render('single-post', { post, loggedIn:req.session.loggedIn});
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// giving you the login and signup route pieces below
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'signup' template
  res.render('signup');
});

module.exports = router;

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// post belongsTo User
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
//Post have many comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});
//Comment belongsTo User
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Post
};
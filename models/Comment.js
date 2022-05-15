const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

class Comment extends Model {}

// create fields/columns for Comment model
Comment.init(
    {
     
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  );
  
  
  module.exports = Comment;
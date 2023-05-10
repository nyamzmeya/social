const { Schema, model } = require('mongoose')

let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email is already taken!'],
      required: true,
    },
    username: {
      type: String,
      unique: [true, 'Username is already taken!'],
    },
    password: {
      type: String,
      validate: {
        validator: (value) => passwordRegex.test(value),
        message:
          'Password must have minimum eight characters, at least one letter and one number',
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    education: String,
    home: String,
    profilePicture: {
      type: 'ObjectId',
      ref: 'Image',
    },
    posts: [
      {
        type: 'ObjectId',
        ref: 'Post',
      },
    ],
    friends: [
      {
        type: 'ObjectId',
        ref: 'User',
      },
    ],
  },
);


UserSchema.methods.matchPassword = function (enteredPassword) {
  return enteredPassword === this.password;
};



module.exports = new model('User', userSchema)

var mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
// var userSchema = new mongoose.Schema({

// })
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      // Higher the number more previllage
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

// Creating Virtual Fields
userSchema
  .virtual('password')
  .set(function (password) {
    //   this.password = password
    // Fine but to make this.password  a private variable
    this._password = password
    //populating this salt here
    this.salt = uuidv1()

    this.encry_password = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

// For Getting Secured Password
userSchema.method = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password
  },
  securePassword: function (plainpassword) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
}

module.exports = mongoose.model('User', userSchema)

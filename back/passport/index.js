const passport = require('passport');
const local = require('./local');
const { User } = require('../models');
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 로그인 성공 후 그 다음 요청
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
}
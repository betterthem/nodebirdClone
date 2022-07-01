const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/',  async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
      });
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
})

// POST /user/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(err);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(201).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect('/');
  })
})

// POST /user 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error) // status 500
  }
});

// PATCH user/nickname
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    // 해석 : 내 아이디 ( id: req.user.id )를
    // 프론트에서 받은 닉네임 ( req.body.nickname ) 으로 수정한다
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: {
        id: req.user.id,
      }
    });
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error) // status 500
  }
})

// PATCH user/1/follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    })
    if (!user) {
      res.status(403).send('존재하지 않은 회원입니다.');
    }
    await user.addFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId) }); // action.data
  } catch (error) {
    console.error(error);
    next(error) // status 500
  }
})

// DELETE user/1/follow 언팔로우
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    })
    if (!user) {
      res.status(403).send('존재하지 않은 회원입니다.');
    }
    await user.removeFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error) // status 500
  }
})

// DELETE user/follower/:userId 팔로워 제거
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send('존재하지 않는 사람입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });

  } catch (error) {
    console.error(error);
    next(error) // status 500
  }
})

// GET user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    })
    if (!user) {
      res.status(403).send('존재하지 않은 회원입니다.');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers); // action.data
  } catch (error) {
    console.error(error);
    next(error) // status 500
  }
})

// GET user/followers
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    })
    if (!user) {
      res.status(403).send('존재하지 않은 회원입니다.');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings); // action.data
  } catch (error) {
    console.error(error);
    next(error) // status 500
  }
})

module.exports = router;
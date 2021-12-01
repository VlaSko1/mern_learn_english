const Router = require("express");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const Roles = require("../models/Roles");
const router = new Router();

router.post('/registration',
  [
    check('email', "Uncorrect email").isEmail(),
    check('password', "Password must be longer than 3 shorter than 12").isLength({ min: 3, max: 12 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }

      const { email, password } = req.body;
      console.log(email, password);

      const candidate = await Users.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: `User with email ${email} already exist` });
      }

      const role = await Roles.findOne({role: 'user'});
      const roleId = role.id;

      const hashPassword = await bcrypt.hash(password, 8); // хэшируем пароль, что бы хранить на сервере хэш, а не пароль в чистом виде
      const user = new Users({ email, password: hashPassword, roleId  });  // TODO добавь вставку роли пользователя по умолчанию (для простых пользователей)
      await user.save();
      return res.json({ message: "User was created" });

    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  });

router.post('/login',
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({email});
      if (!user) {
        return res.status(404).json({message: "User not found"});
      }

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return res.status(400).json({message: "Invalid password"});
      }

      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          roleId: user.roleId,
        }
      })
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  });


module.exports = router;
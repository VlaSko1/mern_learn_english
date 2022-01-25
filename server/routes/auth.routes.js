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
    check('email', "Uncorrect email.").isEmail(),
    check('password', "Password must be longer than 6.").isLength({ min: 6 }),
    check('password', "Password must contain one or more Latin letters, one or more uppercase Latin letters, one or more digits, one or more special characters: !@#$%^&*").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/),
    check('name', "Name must be longer than 3 shorter than 20.").isLength({ min: 3, max: 20 }),
    check('name', "The name field can contain only Latin letters, numbers, hyphens and underscores!").matches(/^[\w-]{3,20}/)
  ],
  async (req, res) => {
    try {
      const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${location}[${param}]: ${msg}`;
      };
      const errors = validationResult(req).formatWith(errorFormatter);
      
      if (!errors.isEmpty()) {
        let string = errors.errors.reduce((ack, elem) => ack + elem.msg + ' ', "").slice(0, -1);

        return res.status(400).json({ message: string });
      }

      const { email, password, name } = req.body;


      const candidate = await Users.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: `User with email ${email} already exist` });
      }

      const candidateByName = await Users.findOne({ name });

      if (candidateByName) {
        return res.status(400).json({ message: `User with name ${name} already exist` });
      }

      const role = await Roles.findOne({ role: 'user' });
      const roleId = role.id;

      const hashPassword = await bcrypt.hash(password, 8); // хэшируем пароль, что бы хранить на сервере хэш, а не пароль в чистом виде
      const user = new Users({ email, name, password: hashPassword, roleId });
      await user.save();
      return res.status(200).json({ message: `User with name ${name} was created` });

    } catch (e) {
      return res.status(400).json({ message: "Bad request " });
    }
  });

router.post('/login',
  [
    check('email', "Uncorrect email.").isEmail(),
    check('password', "Password must be longer than 6.").isLength({ min: 6 }),
    check('password', "Password must contain one or more Latin letters, one or more uppercase Latin letters, one or more digits, one or more special characters: !@#$%^&* .").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/),
  ],
  async (req, res) => {
    try {
      const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${location}[${param}]: ${msg}`;
      };
      const errors = validationResult(req).formatWith(errorFormatter);
      
      if (!errors.isEmpty()) {
        let string = errors.errors.reduce((ack, elem) => ack + elem.msg + ' ', "").slice(0, -1);

        return res.status(400).json({ message: string });
      }

      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" });
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          roleId: user.roleId,
          name: user.name,
        }
      })
    } catch (e) {
      res.send({ message: "Server error" });
    }
  });


module.exports = router;
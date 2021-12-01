const Router = require("express");
const router = new Router();



router.get('/', (req, res) => {
    try {
      console.log("Работает");
      res.status(200).send({message: "Server is good!"});

    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  });

module.exports = router;
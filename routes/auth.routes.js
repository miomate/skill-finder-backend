const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/router-guard.middleware");

router.get("/", (req, res) => {
  res.json("All good in auth");
});

//post signup
router.post("/signup", async (req, res, next) => {
  const credentials = req.body;

  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(credentials.password, salt);
  try {
    const newUser = await User.create({ ...credentials, passwordHash });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
//post login
router.post("/login", async (req, res, next) => {
  const credentials = req.body;
  //check user with given username
  try {
    const potentialUser = await User.findOne({
      username: credentials.username
    });
    if (potentialUser) { //check pw
      if (bcrypt.compareSync(credentials.password, potentialUser.passwordHash)) {
        //zser gas tge rigt credebtuks
        const payload = {
          userId: potentialUser._id,
        };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algortihm: "HS256",
          expiresIn: "6h",
        });

        res.json({token: authToken});

        res.status(200).json({ message: "Welcome" });
      } else {
        res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      res.status(400).json({ message: "Username not found" });
    }
  } catch (error) {
    next(error);
  }
});

//get verify
router.get("/verify", 
//   (req, res, next) => {
//   console.log("log from middleware")
//   next()
// }
isAuthenticated, async(req, res, next) => {
  console.log("log from handler")
  try {
    const currentUser = await User.findById(req.tokenPayload.userId);
    res.json(currentUser)
  } catch (error) {
    next(error)
  }

}
);

module.exports = router;

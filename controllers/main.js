const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { user, pass } = req.body;
    console.log(user, pass);
    if (!user || !pass) {
      return res
        .status(200)
        .json({ msg: "Username or Password cannot be empty" });
    }
    const id = new Date().getTime().toString();
    const token = jwt.sign({ id, user }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ msg: "Logged in", token });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
};

const dashboard = async (req, res) => {
  try {
    const luckyNum = Math.floor(Math.random() * 100);
    console.log(req.user);
    res.status(200).json({
      msg: `${req.user.user} authorized`,
      secret: `Secret number is ${luckyNum}`,
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = { login, dashboard };

import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.header("Authorization");
    req.user = jwt.verify(token, process.env.auth_secret);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

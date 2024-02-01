const jwt = require("jsonwebtoken");
const argon2 = require("@node-rs/argon2");
// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.user.create(user);
    await tables.save.create(1, insertId);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await tables.user.signIn(email);

    if (user.length === 1) {
      const verified = await argon2.verify(user[0].password, password);

      if (verified) {
        // Respond with the user and a signed token in JSON format (but without the hashed password)
        delete user.password;

        const tokenUser = jwt.sign(
          { email: user[0].email, userId: user[0].id },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );

        if (user[0].admin === 1) {
          res.cookie("token", tokenUser, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).send({
            message: "Authentification réussie",
            admin: true,
          });

          await tables.user.saveToken(tokenUser, email);
        } else {
          res.cookie("token", tokenUser, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).send({
            message: "Authentification réussie",
            admin: false,
          });

          await tables.user.saveToken(tokenUser, email);
        }
      } else {
        res.status(401).send({ message: "Mot de passe incorrect" });
      }
    } else {
      res
        .status(401)
        .send({ message: "Aucun compte n'a été trouvé avec cet email" });
    }
  } catch (err) {
    next(err);
  }
};

const checktoken = async (req, res, next) => {
  if (!req.cookies.token) {
    res.status(204).send({ message: "Not Conencted" });
  } else {
    const { token } = req.cookies;

    try {
      const decodedToken = jwt.verify(token, process.env.APP_SECRET);

      const { userId } = decodedToken;
      const checkUserToken = await tables.user.checkToken(token);

      if (
        checkUserToken.length === 1 &&
        checkUserToken[0].token === token &&
        checkUserToken[0].id === userId
      ) {
        res.status(200).send({
          message: "OK",
          id: userId,
          save: checkUserToken[0].save,
        });
      } else res.status(200).send({ message: "Error" });
    } catch (err) {
      res.status(200).send({ message: err });
      next(err);
    }
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "OK" });
  } catch (err) {
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
  login,
  checktoken,
  logout,
};

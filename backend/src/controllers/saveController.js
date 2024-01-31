// Import access to database tables
const tables = require("../tables");

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const user = await tables.save.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const save = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.save.create(save);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  const save = req.body;

  try {
    const user = await tables.save.update(save);

    if (user.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(202).send({ message: "user updated" });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  //   browse,
  read,
  add,
  edit,
  //   login,
  //   checktoken,
  //   logout,
};

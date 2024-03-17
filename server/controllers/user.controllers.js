const UserSchema = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function for getting all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find().select('-hashed_password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function for getting a single user by id
exports.getUserById = async (req, res) => {
  let user;
  try {
    user = await UserSchema.findById(req.params.id).select('-hashed_password');
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(user);
};

// Authenticate User
exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Required field missing!" })
  }
  try {
    const existingUser = await UserSchema.findOne({
      email: email
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const passwordMatched = await bcrypt.compare(password, existingUser.hashed_password);

    if (!passwordMatched) {
      return res.status(401).json({ message: "Wrong Credentials!" });
    }

    const token = jwt.sign({ userId: existingUser._id }, 'touhid-nunu', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Function for creating a new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Required field missing' })
    }
    const existingUser = await UserSchema.findOne({
      email: email
    });

    // CHECK IF EMAIL IS ALREADY IN USE
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use!' })
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({
      name: name,
      email: email,
      hashed_password: hashedPassword
    });

    // EXCLUDE THE hashed_password FIELD FROM THE RESPONSE
    newUser.toJSON = function () {
      const obj = this.toObject();
      delete obj.hashed_password;
      return obj;
    }

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function for updating a user
exports.updateUser = async (req, res) => {
  let user;
  try {
    user = await UserSchema.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  if (req.body.name !== null) {
    user.name = req.body.name;
  }

  if (req.body.email !== null) {
    user.email = req.body.email;
  }

  // CLOUDINARY /FIREBASE OR ETC
  // if(req.body.image !== null ) {
  //   co
  // }

  if (req.body.password !== null) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.hashed_password = hashedPassword;
  }

  try {
    const updatedUser = await user.save();

    // EXCLUDE THE hashed_password FIELD FROM THE RESPONSE
    updatedUser.toJSON = function () {
      const obj = this.toObject();
      delete obj.hashed_password;
      return obj;
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function for deleting a user
exports.deleteUser = async (req, res) => {
  let user;
  try {
    user = await UserSchema.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  try {
    await user.remove();
    res.json({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
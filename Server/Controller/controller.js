//this is the server controller where i do send data to the back end....
const User = require('../Model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;





//Creating A User
const postUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const id = req.body.id
    let savedUser = null;
    if(!id) {
      // Create New User
      const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      savedUser = await newUser.save();
    }
    if(id){
      // Update User
      const updateUser = await User.findById(id);

      if (!updateUser) {
        throw new Error('User not found');
      }

      updateUser.firstName = req.body.firstName;
      updateUser.lastName = req.body.lastName;
      updateUser.email = req.body.email;
      
      savedUser = await updateUser.save();
    }
    
    const user = await User.findById(savedUser._id)
      .select('firstName lastName _id')
      .lean();

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    // send a response to the front end
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad Credentials');
  }
};

// Login a User
const getLogIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user and select necessary fields
    const user = await User.findOne({ email })
      .select('firstName lastName email password')
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const loggedUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = jwt.sign({ user: loggedUser }, process.env.SECRET, {
      expiresIn: '24h',
    });
    // send a response to the front end
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json('Bad Credentials');
  }
};

//RETRIEVE ALL USER
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('firstName lastName email _id')
      .lean();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json('Something Went Wrong!.');
  }
};

//RETRIEVE A USER BY ID
const getAUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)
    const user = await User.findById(id)
      .select('firstName lastName email _id')
      .lean();
    if (!user) {
      throw new Error('Something Went Wrong!.');
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json('Something Went Wrong!.');
  }
};

//DELETING A USER
const postDeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedUser = await User.findByIdAndDelete(id)
    res.status(200).json();
    
  } catch (error) {
    console.log(error)
  }
  // await User.findByIdAndDelete(id)
  //   .then((result) => {
  //     console.log(result);
  //     res.status(200).json(result);
  //   })
  //   .catch((err) => res.status(400).json(err));
};

module.exports = {
  postUser,
  getAllUsers,
  getAUserByID,
  postDeleteUser,
  getLogIn,
};

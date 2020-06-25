const { v4: uuidv4 } = require("uuid");

const HttpError = require('../models/http-error');

const USERS = [
  {
    id: "u1",
    name: "tom",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
    res.json({ users: USERS });
};

const signup = (req, res, next) => {
    const {name, email, password} = req.body;

    const hasUser = USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError(
          "Could not create user, email already exists.",
          422
        );
    }

    const createdUser = {
      id: uuidv4(),
      name: name,
      email: email,
      password: password
    };

    USERS.push(createdUser);

    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const {email, password} = req.body;

    const identifiedUser = USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
      throw new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        401
      );
    }

    res.json({message: "Logged In !"});
    
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
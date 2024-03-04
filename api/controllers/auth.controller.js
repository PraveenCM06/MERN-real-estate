import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  //Creating new Entry with input we got
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    //Method to save
    await newUser.save();
    res.status(201).json("User created Successfully!");
  } catch (error) {
    //default method
    // res.status(500).json(error.message);

    //can return custom error response
    // return next(errorHandler(500, "error from function"));

    //return actual error
    return next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(
        errorHandler(
          401,
          "Wrong Credentials, please try with valid email and Password"
        )
      );
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password:pass, ...rest} = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req,res) => {
  try {
    const users = await Users.findAll({
      attributes:['id', 'fullName', 'username', 'email']
    });
    res.json(users);
  } catch (error) {
    console.log(error)
  }
}

export const SignUp = async(req,res) => {
  const {fullName, username, email, password, confPassword} = req.body;
  if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password not Match!"});
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      fullName:fullName,
      username:username,
      email:email,
      password:hashPassword
    });
    res.json({msg: "Sign Up Succedd"});
  } catch (error) {
    console.log(error)
  }
}

export const SignIn = async(req,res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email
      }
    });
    const match = await bcrypt.compare(req.body.password, user[0].password)
    if(!match) return res.status(400).json({msg:"Wrong Password!"});
    const userId = user[0].id;
    const fullName = user[0].fullName;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign({userId, fullName, username, email}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '60s'
    })
    const refreshToken = jwt.sign({userId, fullName, username, email}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    })
    await Users.update({refresh_token: refreshToken}, {
      where: {
        id: userId
      }
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly : true,
      maxAge : 24 * 60 * 60 * 1000
    });
    res.json({accessToken});
  } catch(error) {
    res.status(404).json({msg:"Email not found!"})
  }
}

export const SignOut = async(req,res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update({refresh_token:null}, {
    where: {
      id:userId
    }
  })
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}
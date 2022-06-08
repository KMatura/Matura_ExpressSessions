import { validateLogin, validateRegister } from './validators.js';
import { dbPostUser, dbGetUsers } from '../models/users.js';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
  const users = await dbGetUsers();
  if(!validateLogin(req.body)) return res.status(400).send('Invalid data!');
  console.log(req.body.password);
  const user = users.find(async (u) => u.email === req.body.email && await bcrypt.compare(req.body.password, u.password));
  console.log(user);
  if (!user) return res.status(404).send('Server error!');
  if (await bcrypt.compare(req.body.password, user.password) == false) return res.status(401).send('Invalid password!');
  if(user){
    const { uid, name } = user;
    req.session.userId = user.uid;
    return res.status(200).json({uid, name});
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
  return res.status(200).send('Logout success!');
};

const register = async (req, res) => {
  const users = await dbGetUsers();
  if(!validateRegister(req.body)) return res.status(400).send('Invalid data!');
  const user = users.find((u) => u.email === req.body.email);
  if (user) return res.status(400).send('User already exists!');

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  console.log(hashedPassword);
  console.log(await bcrypt.compare(req.body.password, hashedPassword));

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    secret: req.body.secret,
  };
  const response = await dbPostUser(newUser)
  res.status(200).send(response);
};

const getSecret = async (req, res) => {
  const users = await dbGetUsers();
  const user = users.find((el) => el.uid === Number(req.params.id));
  if (!user) return res.status(404).send('Server error!');
  res.status(200).send(user.secret);
};

const redirectLogin = (req, res, next) => {
  console.log(req.session);
  if (!req.session.userid) res.status(400).send('You are not logged in!');
  else next();
};

const isauthenticated = (req, res) => {
  if (req.session.userid) return true;
  return false;
};

export { login, logout, register, getSecret, redirectLogin, isauthenticated };

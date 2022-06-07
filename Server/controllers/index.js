import { validateLogin, validateRegister } from './validators.js';
import { users } from '../models/users.js';

const login = (req, res) => {
  if(!validateLogin(req.body)) return res.status(400).send('Invalid data!');
  const user = users.find((u) => u.email === req.body.email && u.password === req.body.password);
  if (!user) return res.status(404).send('Server error!');
  if (user.password !== req.body.password) return res.status(401).send('Invalid password!');
  if(user){
    const { id, name } = user;
    req.session.userId = user.id;
    return res.status(200).json({id, name});
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
  return res.status(200).send('Logout success!');
};

const register = (req, res) => {
  if(!validateRegister(req.body)) return res.status(400).send('Invalid data!');
  const user = users.find((u) => u.email === req.body.email);
  if (user) return res.status(400).send('User already exists!');
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    secret: '',
  };
  users.push(newUser);
  res.status(200).send(newUser, 'registered');
};

const getSecret = (req, res) => {
  const user = users.find((el) => el.id === Number(req.params.id));
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

export { login, logout, register, getSecret, redirectLogin };

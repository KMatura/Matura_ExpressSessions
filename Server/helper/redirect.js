const redirectLogin = (req, res, next) => {
  if (!req.session.userid) res.status(400).send('You are not logged in!');
  else next();
};

export { redirectLogin };
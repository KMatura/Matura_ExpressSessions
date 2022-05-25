const redirectLogin = (req, res, next) => {
  console.log(req.session);
  if (!req.session.userId) res.status(400).send('You are not logged in!');
  else next();
};

export { redirectLogin };

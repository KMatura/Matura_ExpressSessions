import query from '../db/index.js'

const dbPostUser = async ({ name, email, password, secret }) => {
  const { rows } = await query(
    'INSERT INTO users(name, email, password, secret) values ($1, $2, $3, $4) returning *',
    [name, email, password, secret],
  );
  return rows[0];
};

const dbGetUsers = async () => {
  const { rows } = await query('SELECT * FROM users');
  return rows;
}

const dbGetUserByEmail = async (email) => {
  const { rows } = await query('SELECT name, email, password, uid FROM users WHERE email = $1', [email]);
  return rows[0];
}

export { dbPostUser, dbGetUsers, dbGetUserByEmail };

// const login = async (req, res) => {
//   const users = await dbGetUsers();
//   if (!validateLogin(req.body)) return res.status(400).send('Invalid data!');
//   // const user = users.find(async (u) => {
//   //   return (
//   //     (await bcrypt.compare(req.body.password, users[1].password)) &&
//   //     u.email == req.body.email
//   //   );
//   // });
//   let user;
//   users.forEach(async (u) => {
//     if (
//       (await bcrypt.compare(req.body.password, u.password)) &&
//       u.email === req.body.email
//     ) {
//       user = u;
//       if (user) {
//         const { uid, name } = user;
//         req.session.userId = user.uid;
//         return res.status(200).json({ uid, name });
//       }
//     }
//     console.log(user);
//   });

//   // console.log(user);
//   // if (!user) return res.status(404).send('Server error!');
//   // if ((await bcrypt.compare(req.body.password, user.password)) == false)
//   //   return res.status(401).send('Invalid password!');
//   // if (user) {
//   //   const { uid, name } = user;
//   //   req.session.userId = user.uid;
//   //   return res.status(200).json({ uid, name });
//   // }
// };
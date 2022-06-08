import query from '../db/index.js'

// export const users = [
//   {
//     id: 2,
//     name: 'Sandy',
//     email: 'sandy@gmail.com',
//     password: '1234',
//     secret: 'Hates Deutschrap',
//   },
//   {
//     id: 3,
//     name: 'Willy',
//     email: 'willy@gmail.com',
//     password: '1234',
//     secret: 'Sleeps with a gun under his pillow',
//   },
// ];

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

export { dbPostUser, dbGetUsers };
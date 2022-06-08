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

export { dbPostUser, dbGetUsers };
import mysql from 'mysql2';
// create the connection to database
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project'
});

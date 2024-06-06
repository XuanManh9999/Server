import mysql from "mysql2/promise";

// Tạo một đối tượng Pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "654321@Ab",
  database: "databasenckh",
  connectionLimit: 10,
});

// Kiểm tra kết nối thông qua promise
pool
  .getConnection()
  .then(() => {
    console.log("Connect DB Success");
  })
  .catch((err) => {
    console.error("Connect DB Error", err);
  });

export { pool };

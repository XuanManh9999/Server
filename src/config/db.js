import mysql from "mysql2";

// Tạo một đối tượng Pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "project",
    connectionLimit: 10,
});

// Kiểm tra kết nối thông qua sự kiện
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Connect DB Error", err);
    } else {
        console.log("Connect DB Success");
        // Đối tượng connection sẵn sàng sử dụng
        connection.release();
    }
});

export { pool };

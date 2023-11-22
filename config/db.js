import mysql from "mysql2";
// create the connection to database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "project",
    connectionLimit: 10, // Số lượng kết nối tối đa
});
if (connection) {
    console.log("Connect DB Success");
} else {
    console.log("Connect DB Error");
}
export { connection };

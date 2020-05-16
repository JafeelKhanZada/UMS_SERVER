const SQL = require("mysql2");
class DB {
  constructor() {
    this.host = "database-1.cnc9aex3iecv.us-east-2.rds.amazonaws.com";
    this.port = 3306;
    this.username = "admin";
    this.password = "admin123";
    this.dbname = "UMS";
  }
  createConnection = () => {
    const connect = SQL.createConnection({
      host: this.host,
      user: this.username,
      database: this.dbname,
      port: this.port,
      password: this.password,
      waitForConnections: true,
    });

    return connect;
  };
}
module.exports = DB;

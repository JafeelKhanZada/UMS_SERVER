const SQL = require("mysql2");
class DB {
  constructor() {
    this.host = "localhost";
    this.port = 8889;
    this.username = "root";
    this.password = "root";
    this.dbname = "UMS";
  }
  createConnection = () => {
    const connect = SQL.createConnection({
      host: this.host,
      user: this.username,
      database: this.dbname,
      port: this.port,
      password: this.password
    });

    return connect;
  };
}
module.exports = DB;

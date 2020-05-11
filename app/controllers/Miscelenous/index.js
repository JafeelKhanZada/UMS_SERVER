const DB = require("../../database/");
class Miscelenous extends DB {
  constructor() {
    super();
    this.database = this.createConnection();
    this.getCardSuperAdmin = this.getCardSuperAdmin.bind(this);
  }
  getCardSuperAdmin = (req, res, next) => {
    const query = `SELECT  (SELECT COUNT(*) FROM STUDENT) AS STUDENT,
    (SELECT COUNT(*) FROM EMPLOYEMENT) AS EMPLOYEE,
    (SELECT COUNT(*) FROM TEACHERS) AS TEACHER,
    (SELECT COUNT(*) FROM ADMIN) AS ADMIN;`;
    return this.database.query(query, (error, resulted, affect) => {
      if (error) {
        res.json({
          error: true,
          message: "Error Occurs At Get Student Data!",
          data: error,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Get Successfully!",
          data: resulted,
        });
        next();
      }
    });
  };
}
module.exports = Miscelenous;

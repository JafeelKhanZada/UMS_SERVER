const DB = require("../../database/");
class EmployementExperience extends DB {
  constructor() {
    super();
    this.database = this.createConnection();
    this.getData = this.getData.bind(this);
  }
  getData = (req, res, next) => {};
}
module.exports = EmployementExperience;

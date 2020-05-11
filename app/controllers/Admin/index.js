const DB = require("../../database");
class Admin extends DB {
  constructor() {
    super();
    this.InsertData = this.InsertData.bind(this);
    this.GetData = this.GetData.bind(this);
    this.UpdateRoles = this.UpdateRoles.bind(this);
    this.DeleteRoles = this.DeleteRoles.bind(this);
    this.database = this.createConnection();
  }
  InsertData = (req, res, next) => {
    const { eID, rID, dID } = req.body;
    const query = `INSERT INTO ADMIN (EMPLOYEE_ID,DEPARTMENT_ID) VALUES ('${eID}','${dID}')`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert ADMIN!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Inserted Successfully!",
          data: [result, affected],
        });
        next();
      }
    });
  };
  GetData = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM ADMIN ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get ADMIN Data!",
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM ADMIN ${
          id !== null ? " WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get ADMIN Data!",
              data: error,
            });
            next();
          } else {
            if (resulted.length > 0) {
              res.json({
                totalRecord: result[0].total,
                currentPage: page,
                totalPage: totalPage,
                error: false,
                message: "Data Get Successfully!",
                data: resulted,
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No Data Found!",
                data: resulted,
              });
              next();
            }
          }
        });
      }
    });
  };
  DeleteRoles = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map((val) => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM ADMIN WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete ADMIN!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Deleted Successfully!",
          data: result.info,
        });
        next();
      }
    });
  };
  UpdateRoles = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE ADMIN SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, next) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update ADMIN!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Update Successfully!",
          data: result.info,
        });
        next();
      }
    });
  };
}
module.exports = Admin;

const DB = require("../../database");
class Program extends DB {
  constructor() {
    super();
    this.InsertData = this.InsertData.bind(this);
    this.GetData = this.GetData.bind(this);
    this.UpdateRoles = this.UpdateRoles.bind(this);
    this.DeleteRoles = this.DeleteRoles.bind(this);
    this.database = this.createConnection();
  }
  InsertData = (req, res, next) => {
    const { name } = req.body;
    const query = `INSERT INTO ROLES (ROLE_NAME) VALUES ('${name}')`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert Roles!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Inserted Successfully!",
          data: result.info,
        });
        next();
      }
    });
  };
  GetData = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM ROLES ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get Program Data!",
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM ROLES ${
          id !== null ? " WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get ROLES Data!",
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
    const query = `DELETE FROM ROLES WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete ROLES!",
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
    const Query = `UPDATE ROLES SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, next) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update ROLES!",
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
module.exports = Program;

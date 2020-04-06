const DB = require("../../database");
class Fees extends DB {
  constructor() {
    super();
    this.GetData = this.GetData.bind(this);
    this.UpdateData = this.UpdateData.bind(this);
    this.DeleteData = this.DeleteData.bind(this);
    this.InsertData = this.InsertData.bind(this);
    this.database = this.createConnection();
  }
  InsertData = (req, res, next) => {
    const { fees, issueDate, feesType, dueDate, sID } = req.body;
    const Query = `INSERT INTO FEES (FEES,ISSUE_DATE,FEES_TYPE,DUE_DATE,STUDENT_ID) VALUES ('${fees}','${issueDate}','${feesType}','${dueDate}','${sID}')`;
    return this.database.query(Query, (err, result, affect) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert Fees!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Inserted Successfully!",
          data: result
        });
        next();
      }
    });
  };
  GetData = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM FEES ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get FEES Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM FEES S ${
          id !== null ? "WHERE S.ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get FEES Data!",
              data: error
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
                data: resulted
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No Data Found!",
                data: resulted
              });
              next();
            }
          }
        });
      }
    });
  };
  DeleteData = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM FEES WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete FEES!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Deleted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  UpdateData = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE FEES SET ? WHERE ID=${id}`;
    return this.database.query(
      Query,
      { ...req.body },
      (err, result, affected) => {
        if (err) {
          res.json({
            error: true,
            message: "Error Occurs At Update FEES!",
            data: err
          });
          next();
        } else {
          res.json({
            error: false,
            message: "Data Update Successfully!",
            data: result.info
          });
          next();
        }
      }
    );
  };
}
module.exports = Fees;

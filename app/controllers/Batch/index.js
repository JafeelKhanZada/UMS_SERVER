const DB = require("../../database/");
class Batch extends DB {
  constructor() {
    super();
    this.InsertBatch = this.InsertBatch.bind(this);
    this.GetBatch = this.GetBatch.bind(this);
    this.UpdateBatch = this.UpdateBatch.bind(this);
    this.DeleteBatch = this.DeleteBatch.bind(this);
    this.database = this.createConnection();
  }
  InsertBatch = (req, res, next) => {
    const {
      totalEnrolled,
      batchCode,
      startDate,
      endDate,
      totalPass,
      programID
    } = req.body;
    const Query = `INSERT INTO BATCH (TOTAL_ENROLLED,BATCH_CODE,START_DATE,END_DATE,TOTAL_PASS_OUT,PROGRAM_ID) VALUES
    ('${totalEnrolled}','${batchCode}','${startDate}','${endDate}','${totalPass}','${programID}')`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert Batch!",
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
  GetBatch = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM BATCH ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get Batch Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM BATCH ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Batch Data!",
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
  UpdateBatch = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE BATCH SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, next) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update Batch!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Batch Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  DeleteBatch = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM Batch WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete Batch!",
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
}
module.exports = Batch;

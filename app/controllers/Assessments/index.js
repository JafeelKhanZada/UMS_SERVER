const DB = require("../../database/");
class Assessment extends DB {
  constructor() {
    super();
    this.InsertAssessments = this.InsertAssessments.bind(this);
    this.GetAssessments = this.GetAssessments.bind(this);
    this.UpdateAssessments = this.UpdateAssessments.bind(this);
    this.DeleteAssessments = this.DeleteAssessments.bind(this);
    this.database = this.createConnection();
  }
  InsertAssessments = (req, res, next) => {
    const {
            OBTAIN_MARKS,
            TOTAL_MARKS,
            ASSESSMENT_ID,
    } = req.body;
    const Query = `INSERT INTO ASSESSMENTS (OBTAIN_MARKS,TOTAL_MARKS,ASSESSMENT_ID) VALUES
    ('${OBTAIN_MARKS}','${TOTAL_MARKS}','${ASSESSMENT_ID}')`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert ASSESSMENTS!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "ASSESSMENTS Inserted Successfully!",
          data: result
        });
        next();
      }
    });
  };
  GetAssessments = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM ASSESSMENTS ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get ASSESSMENTS Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM ASSESSMENTS ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get ASSESSMENTS Data!",
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
                message: "ASSESSMENTS Get Successfully!",
                data: resulted
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No ASSESSMENTS Found!",
                data: resulted
              });
              next();
            }
          }
        });
      }
    });
  };
  UpdateAssessments = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE ASSESSMENTS SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, effect) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update ASSESSMENTS!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data ASSESSMENTS Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  DeleteAssessments = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM ASSESSMENTS WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete ASSESSMENTS!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "ASSESSMENTS Deleted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
}
module.exports = Assessment;

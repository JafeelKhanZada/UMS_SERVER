const DB = require("../../database");
class Assessment_type extends DB {
  constructor() {
    super();
    this.InsertAssessment = this.InsertAssessment.bind(this);
    this.GetAssessment = this.GetAssessment.bind(this);
    this.UpdateAssessment = this.UpdateAssessment.bind(this);
    this.DeleteAssessment = this.DeleteAssessment.bind(this);
    this.database = this.createConnection();
  }
  InsertAssessment = (req, res, next) => {
    const {
      VALUE,
    } = req.body;
    const Query = `INSERT INTO  ASSESSMENT_TYPE (VALUE) VALUES
    ('${VALUE}')`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert  ASSESSMENT_TYPE!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: " ASSESSMENT_TYPE Inserted Successfully!",
          data: result
        });
        next();
      }
    });
  };
  GetAssessment = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM  ASSESSMENT_TYPE ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get  ASSESSMENT_TYPE Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM  ASSESSMENT_TYPE ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get  ASSESSMENT_TYPE Data!",
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
                message: " ASSESSMENT_TYPE Get Successfully!",
                data: resulted
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No  ASSESSMENT_TYPE Found!",
                data: resulted
              });
              next();
            }
          }
        });
      }
    });
  };
  UpdateAssessment = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE  ASSESSMENT_TYPE SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, effect) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update  ASSESSMENT_TYPE!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data  ASSESSMENT_TYPE Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  DeleteAssessment = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM  ASSESSMENT_TYPE WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete  ASSESSMENT_TYPE!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: " ASSESSMENT_TYPE Deleted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
}
module.exports = Assessment_type;

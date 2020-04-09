const DB = require("../../database/");
class Enrolled_Courses extends DB {
  constructor() {
    super();
    this.InsertEnrolled = this.InsertEnrolled.bind(this);
    this.GetEnrolled = this.GetEnrolled.bind(this);
    this.UpdateEnrolled = this.UpdateEnrolled.bind(this);
    this.DeleteEnrolled = this.DeleteEnrolled.bind(this);
    this.database = this.createConnection();
  }
  InsertEnrolled = (req, res, next) => {
    const { 
        COURSE_ID,
        SECTION_ID, 
        ASSESSMENT_ID, 
        IS_REPEATED ,
        IS_DROPPED, 
        TOTAL_CLASSES,
    } = req.body;
    const Query = `INSERT INTO ENROLLED_COURSES (COURSE_ID,SECTION_ID,ASSESSMENT_ID,IS_REPEATED,IS_DROPPED,TOTAL_CLASSES) VALUES
    ('${COURSE_ID}','${SECTION_ID}','${ASSESSMENT_ID}','${IS_REPEATED}','${IS_DROPPED}','${TOTAL_CLASSES}')`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert ENROLLED!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "ENROLLED_COURSES Inserted Successfully!",
          data: result
        });
        next();
      }
    });
  };
  GetEnrolled = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM ENROLLED_COURSES ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get ENROLLED_COURSES Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM ENROLLED_COURSES ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get ENROLLED_COURSES Data!",
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
                message: "ENROLLED_COURSES Get Successfully!",
                data: resulted
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No ENROLLED_COURSES Found!",
                data: resulted
              });
              next();
            }
          }
        });
      }
    });
  };
  UpdateEnrolled = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE ENROLLED_COURSES SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result,effect) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update ENROLLED_COURSES!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data ENROLLED_COURSES Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  DeleteEnrolled = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM ENROLLED_COURSES WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete ENROLLED_COURSES!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "ENROLLED_COURSES Deleted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
}
module.exports = Enrolled_Courses;

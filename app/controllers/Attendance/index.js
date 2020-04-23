const DB = require("../../database");
class Attendance extends DB {
    constructor() {
      super();
      this.database = this.createConnection();
      this.InsertAttendance = this.InsertAttendance.bind(this);
      this.GetAttendance = this.GetAttendance.bind(this);
      this.DeleteAttendance = this.DeleteAttendance.bind(this);
      this.UpdateAttendance = this.UpdateAttendance.bind(this);
    
    }
    InsertAttendance =(req, res, next)=>
    {
        const{
            SECTION_ID,
             STUDENT_ID,
            COURSE_ID,
            INSTRUCTOR_ID,
            ISLAB,
            CLASS_DATE,
            IS_ATTEND,

        }=req.body;
        const query=`INSERT INTO ATTENDANCE(SECTION_ID,STUDENT_ID,COURSE_ID,INSTRUCTOR_ID,ISLAB,CLASS_DATE,IS_ATTEND) VALUES('${SECTION_ID}','${STUDENT_ID}','${COURSE_ID}','${INSTRUCTOR_ID}','${ISLAB}','${CLASS_DATE}','${IS_ATTEND}')`;
        this.database.query(query, (err, result, affected) => {
            if (err) {
              res.json({
                error: true,
                message: "Error Occurs At Insert Attendance",
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
        }
          GetAttendance = (req, res, next) => {
            const { page, pageSizes, id } = req.body;
            const pageSize = page * pageSizes;
            const offset = (page - 1) * pageSizes;
            const query = `SELECT count(*) as total FROM ATTENDANCE ${
              id !== null ? "WHERE ID =" + id : ""
            }`;
            return this.database.query(query, (err, result, affected) => {
              if (err) {
                res.json({
                  error: true,
                  message: "Error Occurs At GeT ATTENDANCE Data!",
                  data: err,
                });
                next();
              } else {
                let totalPage = result[0].total / pageSizes;
                totalPage = Math.ceil(totalPage);
                const Query = `SELECT * FROM ATTENDANCE ${
                  id !== null ? "WHERE ID =" + id : ""
                } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
                return this.database.query(Query, (error, resulted, affect) => {
                  if (error) {
                    res.json({
                      error: true,
                      message: "Error Occurs At Get ATTENDANCE Data!",
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
          DeleteAttendance = (req, res, next) => {
            const { id } = req.body;
            let string = new String();
            if (id.length > 1) {
              id.map((val) => (string += `'${val}',`));
              string = string.slice(0, string.length - 1);
            } else {
              string = id[0];
            }
            const query = `DELETE FROM ATTENDANCE WHERE ID IN(${string})`;
            return this.database.query(query, (err, result, affected) => {
              if (err) {
                res.json({
                  error: true,
                  message: "Error Occurs At Delete ATTENDANCE!",
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
          UpdateAttendance = (req, res, next) => {
            const { id } = req.params;
            const Query = `UPDATE ATTENDANCE SET ? WHERE ID=${id}`;
            return this.database.query(
              Query,
              { ...req.body },
              (err, result, affected) => {
                if (err) {
                  res.json({
                    error: true,
                    message: "Error Occurs At Update ATTENDANCE",
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
              }
            );
          };
}
module.exports= Attendance;
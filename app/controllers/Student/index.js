const DB = require("../../database");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
class Student extends DB {
  constructor() {
    super();
    this.InsertData = this.InsertData.bind(this);
    this.UpdateData = this.UpdateData.bind(this);
    // this.Login = this.Login.bind(this);
    this.UpdatePassword = this.UpdatePassword.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
    this.GetUser = this.GetUser.bind(this);
    this.GetAll = this.GetAll.bind(this);
    this.database = this.createConnection();
  }
  InsertData = (req, res, next) => {
    const {
      sID,
      totalCourse,
      totalCredit,
      cgpa,
      currentSemester,
      password,
      email,
    } = req.body;
    return bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res
          .json({
            error: true,
            message: "Error In Genrating Salt Insert Data Student!",
            data: err,
          })
          .status(401);
        next();
      } else {
        return bcrypt.hash(password, salt, (error, result) => {
          if (error) {
            res
              .json({
                error: true,
                message: "Error In Hashing Insert Data Student!",
                data: error,
              })
              .status(401);
            next();
          } else {
            const Query = `INSERT INTO STUDENT (STUDENT_ID,TOTAL_COURSES,TOTAL_CREDIT_HOURS,CGPA,CURRENT_SEMESTER,PASSWORD,EMAIL) VALUES ('${sID}','${totalCourse}','${totalCredit}','${cgpa}','${currentSemester}','${result}','${email}')`;
            return this.database.query(Query, (ERROR, result, affected) => {
              if (ERROR) {
                res
                  .json({
                    error: true,
                    message: "Error In Insert Data Student!",
                    data: ERROR,
                  })
                  .status(404);
                next();
              } else {
                res.json({
                  error: false,
                  message: "Student Has Been Added Successfully",
                  data: result,
                });
                next();
              }
            });
          }
        });
      }
    });
  };
  GetUser = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM STUDENT ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get Student Data!",
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM STUDENT ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Student Data!",
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
  DeleteUser = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map((val) => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM Student WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete Student!",
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
  UpdateData = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE Student SET ? WHERE ID=${id}`;
    return this.database.query(
      Query,
      { ...req.body },
      (err, result, affected) => {
        if (err) {
          res.json({
            error: true,
            message: "Error Occurs At Update Student!",
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

  UpdatePassword = (req, res, next) => {
    const { id, oldPassword, newPassword } = req.body;
    const Query = `SELECT * FROM STUDENT WHERE ID=${id}`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error In Finding User!",
          data: err,
        });
        next();
      } else {
        if (result.length === 0) {
          res.json({
            error: false,
            message: "No User Found Against ID!",
            data: null,
          });
          next();
        } else {
          let data = result[0];
          return bcrypt.compare(
            oldPassword,
            data.PASSWORD,
            (error, decoded) => {
              if (error) {
                res.json({
                  error: true,
                  message: "Error In User Password!",
                  data: error,
                });
                next();
              } else {
                if (!decoded) {
                  res.json({
                    error: false,
                    message: "Password Not Matched!",
                    data: null,
                  });
                  next();
                } else {
                  return bcrypt.genSalt(10, (saltError, salt) => {
                    if (saltError) {
                      res.json({
                        error: true,
                        message: "Error In Generating Salt!",
                        data: saltError,
                      });
                      next();
                    } else {
                      return bcrypt.hash(
                        newPassword,
                        salt,
                        (hashingError, hashed) => {
                          if (hashingError) {
                            res.json({
                              error: true,
                              message: "Error In Hashing Password!",
                              data: saltError,
                            });
                            next();
                          } else {
                            const UpdateQuery = `UPDATE STUDENT SET ? WHERE ID=${id}`;
                            return this.database.query(
                              UpdateQuery,
                              {
                                PASSWORD: hashed,
                              },
                              (errors, resulted, affects) => {
                                if (errors) {
                                  res.json({
                                    error: true,
                                    message: "Error In Updating Password!",
                                    data: errors,
                                  });
                                  next();
                                } else {
                                  res.json({
                                    error: false,
                                    message: "Password Updated Successfully",
                                    data: true,
                                  });
                                  next();
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  });
                }
              }
            }
          );
        }
      }
    });
  };
  GetAll = (req, res, next) => {};
}
module.exports = Student;

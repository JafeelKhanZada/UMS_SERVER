const DB = require("../../database");
class Teacher extends DB {
  constructor() {
    super();
    this.database = this.createConnection();
    this.InsertTeacher = this.InsertTeacher.bind(this);
    this.GetTeacher = this.GetTeacher.bind(this);
    this.UpdateTeacher = this.UpdateTeacher.bind(this);
    this.DeleteTeacher = this.DeleteTeacher.bind(this);
  }
  InsertTeacher = (req, res, next) => {
    const { EMPLOYEE_ID, DESIGNATION, AOI } = req.body;
    const query = `INSERT INTO TEACHERS(EMPLOYEE_ID,DESIGNATION,AOI) VALUES('${EMPLOYEE_ID}','${DESIGNATION}','${AOI}')`;
    this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert Teacher!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Teacher data Inserted Successfully!",
          data: result.info,
        });
        next();
      }
    });
  };
  GetTeacher = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM TEACHERS ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get Teachers Data!",
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT T.ID AS ID, T.DESIGNATION AS DESIGNATION, T.AOI AS AREAOFINTREST, S.ID AS EID, S.GENDER AS GENDER, S.FIRST_NAME AS FIRSTNAME,S.LAST_NAME AS LASTNAME, S.NATIONALITY AS NATIONALITY, S.CNIC AS CNIC, S.RELIGON AS RELIGON, S.POSTAL_CODE AS POSTCODE, S.CITY AS CITY, S.STREETNO AS STREETNO, S.HOUSENO AS HOUSENO, S.STATE AS STATE, S.COUNTRY AS COUNTRY, S.DOB AS DOB, S.JOINING_DATE AS JOININGDATE, S.PHONENUMBER AS PHONENUMBER, P.NAME AS PROGRAMNAME, P.TOTAL_FEES AS TOTALFEES, P.DURATION AS DURATION, P.TOTAL_CREDIT_HOURS AS CREDITHOURS, P.ID AS PROGRAMID FROM TEACHERS T JOIN EMPLOYEMENT S ON S.ID=T.EMPLOYEE_ID JOIN PROGRAM P ON P.ID=S.PROGRAM_ID   ${
          id !== null ? "WHERE T.ID =" + id : ""
        } ORDER BY T.ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Teachers Data!",
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
                message: " Tacehers Data Get Successfully!",
                data: resulted,
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No Teachers Data Found!",
                data: resulted,
              });
              next();
            }
          }
        });
      }
    });
  };
  DeleteTeacher = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map((val) => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM TEACHERS WHERE ID IN(${string})`;
    this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete Teachers!",
          data: err,
          string: string,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Teachers Data Deleted Successfully!",
          data: result,
        });
        next();
      }
    });
  };
  UpdateTeacher = (req, res, next) => {
    const { id } = req.params;
    const query = `UPDATE TEACHERS SET ? WHERE ID=${id}`;
    this.database.query(query, { ...req.body }, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update Teachers!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: " Teachers Data Update Successfully!",
          data: result.info,
        });
        next();
      }
    });
  };
}
module.exports = Teacher;

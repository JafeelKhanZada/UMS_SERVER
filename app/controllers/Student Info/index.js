const DB = require("../../database");
class Student_Info extends DB {
  constructor() {
    super();
    this.InsertData = this.InsertData.bind(this);
    this.GetData = this.GetData.bind(this);
    this.UpdateData = this.UpdateData.bind(this);
    this.DeleteData = this.DeleteData.bind(this);
    this.database = this.createConnection();
  }
  InsertData = (req, res, next) => {
    const {
      gender,
      email,
      fname,
      lname,
      nationality,
      cnic,
      religon,
      postalCode,
      city,
      street,
      house,
      state,
      country,
      dob,
      admissionDate,
      batchID,
      programID,
      phoneNumber
    } = req.body;
    const query = `INSERT INTO STUDENT_INFO (GENDER,EMAIL,FIRST_NAME,LAST_NAME,NATIONALITY,CNIC,RELIGON,POSTAL_CODE,CITY,STREETNO,HOUSENO,STATE,COUNTRY,DOB,ADMISSION_DATE,BATCH_ID,PROGRAM_ID,PHONENUMBER) VALUES ('${gender}','${email}','${fname}','${lname}','${nationality}','${cnic}','${religon}','${postalCode}','${city}','${street}','${house}','${state}','${country}','${dob}','${admissionDate}','${batchID}','${programID}','${phoneNumber}')`;
    this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert STUDENT_INFO!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Inserted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  GetData = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM STUDENT_INFO ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get STUDENT_INFO Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM STUDENT_INFO S ${
          id !== null ? "WHERE S.ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get STUDENT_INFO Data!",
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
    const query = `DELETE FROM STUDENT_INFO WHERE ID IN(${string})`;
    this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete STUDENT_INFO!",
          data: err,
          string: string
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
    const Query = `UPDATE STUDENT_INFO SET ? WHERE ID=${id}`;
    this.database.query(Query, { ...req.body }, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update STUDENT_INFO!",
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
    });
  };
}
module.exports = Student_Info;

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
      phoneNumber,
    } = req.body;
    const query = `INSERT INTO STUDENT_INFO (GENDER,EMAIL,FIRST_NAME,LAST_NAME,NATIONALITY,CNIC,RELIGON,POSTAL_CODE,CITY,STREETNO,HOUSENO,STATE,COUNTRY,DOB,ADMISSION_DATE,BATCH_ID,PHONENUMBER) VALUES ('${gender}','${email}','${fname}','${lname}','${nationality}','${cnic}','${religon}','${postalCode}','${city}','${street}','${house}','${state}','${country}','${dob}','${admissionDate}','${batchID}','${phoneNumber}')`;
    this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert STUDENT_INFO!",
          data: err,
        });
        next();
      } else {
        const Query = res.json({
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
    const query = `SELECT count(*) as total FROM STUDENT_INFO ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get STUDENT_INFO Data!",
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT S.ID AS SID, S.GENDER AS GENDER, S.EMAIL AS EMAIL, S.FIRST_NAME AS FIRSTNAME,S.LAST_NAME AS LASTNAME, S.NATIONALITY AS NATIONALITY, S.CNIC AS CNIC, S.RELIGON AS RELIGON, S.POSTAL_CODE AS POSTCODE, S.CITY AS CITY, S.STREETNO AS STREETNO, S.HOUSENO AS HOUSENO, S.STATE AS STATE, S.COUNTRY AS COUNTRY, S.DOB AS DOB, S.ADMISSION_DATE AS ADMISSIONDATE,S.BATCH_ID AS BID, S.PHONENUMBER AS PHONENUMBER,  B.ID AS BATCH_ID, B.TOTAL_ENROLLED AS TOTALENROLLED, B.BATCH_CODE AS BATCH, B.START_DATE AS STARTINGDATE,B.END_DATE AS ENDDATE, B.TOTAL_PASS_OUT AS TOTALPASS, P.NAME AS PROGRAMNAME, P.TOTAL_FEES AS TOTALFEES, P.DURATION AS DURATION, P.TOTAL_CREDIT_HOURS AS CREDITHOURS, P.ID AS PROGRAMID FROM STUDENT_INFO S JOIN BATCH B ON B.ID=S.BATCH_ID JOIN PROGRAM P ON P.ID=B.PROGRAM_ID  ${
          id !== null ? "WHERE S.ID =" + id : ""
        } ORDER BY S.ID LIMIT ${pageSize} OFFSET ${offset}`;
        this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get STUDENT_INFO Data!",
              data: error,
            });
            next();
          } else {
            if (resulted.length > 0) {
              const response = resulted.map((v) => {
                const {
                  BATCH_ID,
                  TOTALENROLLED,
                  BATCH,
                  STARTINGDATE,
                  ENDDATE,
                  TOTALPASS,
                  PROGRAMNAME,
                  TOTALFEES,
                  DURATION,
                  CREDITHOURS,
                  PROGRAMID,
                  SID,
                  GENDER,
                  EMAIL,
                  FIRSTNAME,
                  LASTNAME,
                  NATIONALITY,
                  CNIC,
                  RELIGON,
                  POSTCODE,
                  CITY,
                  STREETNO,
                  HOUSENO,
                  STATE,
                  COUNTRY,
                  DOB,
                  ADMISSIONDATE,
                } = v;
                return {
                  sID: SID,
                  gender: GENDER,
                  email: EMAIL,
                  first_name: FIRSTNAME,
                  last_name: LASTNAME,
                  nationaliy: NATIONALITY,
                  cnic: CNIC,
                  religon: RELIGON,
                  postCode: POSTCODE,
                  city: CITY,
                  streetNo: STREETNO,
                  houseNo: HOUSENO,
                  state: STATE,
                  country: COUNTRY,
                  dob: DOB,
                  admissionDate: ADMISSIONDATE,
                  batch: {
                    batchID: BATCH_ID,
                    batchName: BATCH,
                    totalEnrolled: TOTALENROLLED,
                    startDate: STARTINGDATE,
                    endDate: ENDDATE,
                    totalPass: TOTALPASS,
                    program: {
                      name: PROGRAMNAME,
                      fees: TOTALFEES,
                      duration: DURATION,
                      creditHour: CREDITHOURS,
                      programID: PROGRAMID,
                    },
                  },
                };
              });
              res.json({
                totalRecord: result[0].total,
                currentPage: page,
                totalPage: totalPage,
                error: false,
                message: "Data Get Successfully!",
                data: response,
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
  DeleteData = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map((val) => (string += `'${val}',`));
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
          string: string,
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
    const Query = `UPDATE STUDENT_INFO SET ? WHERE ID=${id}`;
    this.database.query(Query, { ...req.body }, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update STUDENT_INFO!",
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
module.exports = Student_Info;

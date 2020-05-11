const DB = require("../../database/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Authentication extends DB {
  constructor() {
    super();
    this.database = this.createConnection();
    this.Login = this.Login.bind(this);
  }
  Login = (req, res, next) => {
    const { email, password } = req.body;
    const Query = `SELECT * FROM AUTHENTICATION WHERE EMAIL='${email}'`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At First Query!",
          data: err,
        });
        next();
      } else {
        if (result.length === 0) {
          res.json({
            error: true,
            message: "No User Exists!",
            data: [],
          });
          next();
        } else {
          const data = { ...result[0] };
          console.log(data);
          return bcrypt.compare(password, data.PASSWORD, (err, response) => {
            if (err) {
              res.json({
                error: true,
                message: "Error in de-Hashing Password!",
                data: [],
              });
              next();
            } else {
              if (!response) {
                res.json({
                  error: true,
                  message: "Wrong Email or Password!",
                  data: [],
                });
                next();
              } else {
                let QUERY = new String();
                switch (data.ROLL_ID) {
                  case 1: {
                    QUERY = `SELECT S.ID AS ID, A.EMAIL AS EMAIL FROM SUPER_ADMIN S JOIN AUTHENTICATION A ON A.USER_ID=S.ID AND A.ROLL_ID=1 WHERE S.ID=${data.USER_ID}`;
                    break;
                  }
                  case 2: {
                    QUERY = `SELECT S.ID AS SID, S.GENDER AS GENDER, S.EMAIL AS EMAIL, S.FIRST_NAME AS FIRSTNAME,S.LAST_NAME AS LASTNAME, S.NATIONALITY AS NATIONALITY, S.CNIC AS CNIC, S.RELIGON AS RELIGON, S.POSTAL_CODE AS POSTCODE, S.CITY AS CITY, S.STREETNO AS STREETNO, S.HOUSENO AS HOUSENO, S.STATE AS STATE, S.COUNTRY AS COUNTRY, S.DOB AS DOB, S.JOINING_DATE AS JOININGDATE, S.PHONENUMBER AS PHONENUMBER, P.NAME AS PROGRAMNAME, P.ID AS PROGRAMID FROM ADMIN T JOIN EMPLOYEMENT S ON T.EMPLOYEE_ID=S.ID JOIN PROGRAM P ON P.ID=S.PROGRAM_ID WHERE T.EMPLOYEE_ID=${data.USER_ID}`;
                    break;
                  }
                  case 3: {
                    QUERY = `SELECT S.ID AS SID, S.GENDER AS GENDER, S.EMAIL AS EMAIL, S.FIRST_NAME AS FIRSTNAME,S.LAST_NAME AS LASTNAME, S.NATIONALITY AS NATIONALITY, S.CNIC AS CNIC, S.RELIGON AS RELIGON, S.POSTAL_CODE AS POSTCODE, S.CITY AS CITY, S.STREETNO AS STREETNO, S.HOUSENO AS HOUSENO, S.STATE AS STATE, S.COUNTRY AS COUNTRY, S.DOB AS DOB, S.JOINING_DATE AS JOININGDATE, S.PHONENUMBER AS PHONENUMBER, P.NAME AS PROGRAMNAME, P.TOTAL_FEES AS TOTALFEES, P.DURATION AS DURATION, P.TOTAL_CREDIT_HOURS AS CREDITHOURS, P.ID AS PROGRAMID FROM TEACHERS T JOIN EMPLOYEMENT S ON T.EMPLOYEE_ID=S.ID JOIN PROGRAM P ON P.ID=S.PROGRAM_ID WHERE T.EMPLOYEE_ID=${data.USER_ID}`;
                    break;
                  }
                  case 4: {
                    QUERY = `SELECT SI.TOTAL_COURSES AS TOTALCOURSES, SI.TOTAL_CREDIT_HOURS AS CREDITHOUR,SI.CGPA AS CGPA,SI.CURRENT_SEMESTER AS SEMESTER, S.ID AS SID, S.GENDER AS GENDER, S.EMAIL AS EMAIL, S.FIRST_NAME AS FIRSTNAME,S.LAST_NAME AS LASTNAME, S.NATIONALITY AS NATIONALITY, S.CNIC AS CNIC, S.RELIGON AS RELIGON, S.POSTAL_CODE AS POSTCODE, S.CITY AS CITY, S.STREETNO AS STREETNO, S.HOUSENO AS HOUSENO, S.STATE AS STATE, S.COUNTRY AS COUNTRY, S.DOB AS DOB, S.ADMISSION_DATE AS ADMISSIONDATE,S.BATCH_ID AS BID, S.PHONENUMBER AS PHONENUMBER,  B.ID AS BATCH_ID, B.TOTAL_ENROLLED AS TOTALENROLLED, B.BATCH_CODE AS BATCH, B.START_DATE AS STARTINGDATE,B.END_DATE AS ENDDATE, B.TOTAL_PASS_OUT AS TOTALPASS, P.NAME AS PROGRAMNAME, P.TOTAL_FEES AS TOTALFEES, P.DURATION AS DURATION, P.TOTAL_CREDIT_HOURS AS CREDITHOURS, P.ID AS PROGRAMID FROM STUDENT SI JOIN STUDENT_INFO S ON S.ID=SI.STUDENT_ID JOIN BATCH B ON B.ID=S.BATCH_ID JOIN PROGRAM P ON P.ID=B.PROGRAM_ID WHERE SI.STUDENT_ID=${data.USER_ID}`;
                  }
                }
                return this.database.query(QUERY, (ers, results, affecteds) => {
                  if (!ers) {
                    let response = [];
                    if (data.ROLL_ID === 4) {
                      response = results.map((v) => {
                        const {
                          TOTALCOURSES,
                          SEMESTER,
                          CREDITHOUR,
                          BATCH_ID,
                          CGPA,
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
                          role: "STUDENT",
                          student: {
                            totalCourse: TOTALCOURSES,
                            semester: SEMESTER,
                            creditHour: CREDITHOUR,
                            cgpa: CGPA,
                          },
                          info: {
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
                          },
                          batch: {
                            batchID: BATCH_ID,
                            batchName: BATCH,
                            totalEnrolled: TOTALENROLLED,
                            startDate: STARTINGDATE,
                            endDate: ENDDATE,
                            totalPass: TOTALPASS,
                          },
                          program: {
                            name: PROGRAMNAME,
                            fees: TOTALFEES,
                            duration: DURATION,
                            creditHour: CREDITHOURS,
                            programID: PROGRAMID,
                          },
                        };
                      });
                    } else if (data.ROLL_ID === 3) {
                      response = results;
                      response[0].role = "TEACHER";
                    } else if (data.ROLL_ID === 2) {
                      response = results;
                      console.log("Response", response);
                      response[0].role = "ADMIN";
                    } else {
                      response = results;
                      response[0].role = "SUPER_ADMIN";
                    }
                    const user = { ...response[0] };
                    return jwt.sign(
                      user,
                      "FUCKINGSECRET",
                      {
                        expiresIn: 60 * 60,
                      },
                      (error, token) => {
                        if (error) {
                          res.json({
                            error: true,
                            message: "Error In Genrating Token!",
                            data: error,
                          });
                          next();
                        } else {
                          let tokens = {
                            token: `Bearer ${token}`,
                          };
                          res.json({
                            error: false,
                            message: "Login Successfully!",
                            data: tokens,
                          });
                          next();
                        }
                      }
                    );
                  } else {
                    res.json({
                      error: true,
                      message: "Error In Find And Generate Token!",
                      data: ers,
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
  };
}
module.exports = Authentication;

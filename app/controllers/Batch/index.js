const DB = require("../../database/");
class Batch extends DB {
  constructor() {
    super();
    this.InsertBatch = this.InsertBatch.bind(this);
    this.GetBatch = this.GetBatch.bind(this);
    this.UpdateBatch = this.UpdateBatch.bind(this);
    this.DeleteBatch = this.DeleteBatch.bind(this);
    this.BatchByStudent = this.BatchByStudent.bind(this);
    this.GetBatchByProgramID = this.GetBatchByProgramID.bind(this);
    this.database = this.createConnection();
  }
  InsertBatch = (req, res, next) => {
    const { batchCode, startDate, endDate, programID } = req.body;
    const Query = `INSERT INTO BATCH (BATCH_CODE,START_DATE,END_DATE,PROGRAM_ID) VALUES
    ('${batchCode}','${startDate}','${endDate}','${programID}')`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert Batch!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Inserted Successfully!",
          data: result,
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
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT B.ID AS BATCH_ID, B.TOTAL_ENROLLED AS TOTALENROLLED, B.BATCH_CODE AS BATCH, B.START_DATE AS STARTINGDATE,B.END_DATE AS ENDDATE, B.TOTAL_PASS_OUT AS TOTALPASS, P.NAME AS PROGRAMNAME, P.TOTAL_FEES AS TOTALFEES, P.DURATION AS DURATION, P.TOTAL_CREDIT_HOURS AS CREDITHOURS, P.ID AS PROGRAMID FROM BATCH B JOIN PROGRAM P ON B.PROGRAM_ID=P.ID ${
          id !== null ? "WHERE B.ID =" + id : ""
          } ORDER BY B.ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Batch Data!",
              data: error,
            });
            next();
          } else {
            if (resulted.length > 0) {
              let responses = resulted.map((val) => {
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
                } = val;
                return {
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
                };
              });
              res.json({
                totalRecord: result[0].total,
                currentPage: page,
                totalPage: totalPage,
                error: false,
                message: "Data Get Successfully!",
                data: responses,
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
  GetBatchByProgramID = (req, res, next) => {
    const { page, pageSizes, id, pID } = req.body;
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
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT B.ID AS BATCH_ID, B.TOTAL_ENROLLED AS TOTALENROLLED, B.BATCH_CODE AS BATCH, B.START_DATE AS STARTINGDATE,B.END_DATE AS ENDDATE, B.TOTAL_PASS_OUT AS TOTALPASS, P.NAME AS PROGRAMNAME, P.TOTAL_FEES AS TOTALFEES, P.DURATION AS DURATION, P.TOTAL_CREDIT_HOURS AS CREDITHOURS, P.ID AS PROGRAMID FROM BATCH B JOIN PROGRAM P ON B.PROGRAM_ID=P.ID ${
          id !== null ? "WHERE B.ID =" + id + "AND P.ID=" + pID : "WHERE P.ID=" + pID
          } ORDER BY B.ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Batch Data!",
              data: error,
            });
            next();
          } else {
            if (resulted.length > 0) {
              let responses = resulted.map((val) => {
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
                } = val;
                return {
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
                };
              });
              res.json({
                totalRecord: result[0].total,
                currentPage: page,
                totalPage: totalPage,
                error: false,
                message: "Data Get Successfully!",
                data: responses,
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
  UpdateBatch = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE BATCH SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, next) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update Batch!",
          data: err,
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Batch Successfully!",
          data: result.info,
        });
        next();
      }
    });
  };
  DeleteBatch = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map((val) => (string += `'${val}',`));
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
  BatchByStudent = (req, res, next) => {
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
          data: err,
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT S.ID AS SID, S.GENDER AS GENDER, S.EMAIL AS EMAIL, S.FIRST_NAME AS FIRSTNAME,S.LAST_NAME AS LASTNAME, S.NATIONALITY AS NATIONALITY, S.CNIC AS CNIC, S.RELIGON AS RELIGON, S.POSTAL_CODE AS POSTCODE, S.CITY AS CITY, S.STREETNO AS STREETNO, S.HOUSENO AS HOUSENO, S.STATE AS STATE, S.COUNTRY AS COUNTRY, S.DOB AS DOB, S.ADMISSION_DATE AS ADMISSIONDATE,S.BATCH_ID AS BID, S.PHONENUMBER AS PHONENUMBER,  B.ID AS BATCH_ID, B.TOTAL_ENROLLED AS TOTALENROLLED, B.BATCH_CODE AS BATCH, B.START_DATE AS STARTINGDATE,B.END_DATE AS ENDDATE, B.TOTAL_PASS_OUT AS TOTALPASS, P.NAME AS PROGRAMNAME, P.TOTAL_FEES AS TOTALFEES, P.DURATION AS DURATION, P.TOTAL_CREDIT_HOURS AS CREDITHOURS, P.ID AS PROGRAMID FROM BATCH B JOIN STUDEN B ON B.ID=S.BATCH_ID JOIN PROGRAM P ON P.ID=B.PROGRAM_ID  ${
          id !== null ? "WHERE B.ID =" + id : ""
          } ORDER BY B.ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Batch Data!",
              data: error,
            });
            next();
          } else {
            if (resulted.length > 0) {
              let responses = resulted.map((val) => {
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
                } = val;
                return {
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
                };
              });
              res.json({
                totalRecord: result[0].total,
                currentPage: page,
                totalPage: totalPage,
                error: false,
                message: "Data Get Successfully!",
                data: responses,
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
}
module.exports = Batch;

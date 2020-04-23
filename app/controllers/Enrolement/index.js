const DB = require("../../database");
class Enrolement extends DB {
  constructor() {
    super();
    this.InsertEnroll = this.InsertEnroll.bind(this);
    this.GetEnroll = this.GetEnroll.bind(this);
    this.UpdateEnroll = this.UpdateEnroll.bind(this);
    this.DeleteEnroll = this.DeleteEnroll.bind(this);
    this.database = this.createConnection();
  }
  InsertEnroll = (req, res, next) => {
    const { 
        COURSE_ID,
        SECTION_ID,  
        IS_OFFER ,
    } = req.body;
    const Query = `INSERT INTO ENROLEMENT (COURSE_ID,SECTION_ID,IS_OFFER) VALUES('${COURSE_ID}','${SECTION_ID}','${IS_OFFER}')`;
    return this.database.query(Query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Insert ENROLEMENT!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "ENROLEMENT Inserted Successfully!",
          data: result
        });
        next();
      }
    });
  };
  GetEnroll = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM ENROLEMENT ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get ENROLEMENT Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM ENROLEMENT ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At ENROLEMENT Data!",
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
                message: "ENROLEMENT Get Successfully!",
                data: resulted
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No ENROLEMENT Found!",
                data: resulted
              });
              next();
            }
          }
        });
      }
    });
  };
  UpdateEnroll = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE ENROLEMENT SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result,effect) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update ENROLEMENT!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data ENROLEMENT Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  DeleteEnroll = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM ENROLEMENT WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete ENROLEMENT!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "ENROLEMENT Deleted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
}
module.exports = Enrolement;

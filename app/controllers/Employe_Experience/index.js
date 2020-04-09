const DB = require("../../database");
class Employe_Experience extends DB{
 constructor()
 {
     super();
     this.database=this.createConnection();
     this.InsertExperience=this.InsertExperience.bind(this);
     this.GetExperience=this.GetExperience.bind(this);
     this.DeleteExperience=this.DeleteExperience.bind(this);
     this.UpdateExperience=this.UpdateExperience.bind(this);
 
 }
 InsertExperience=(req, res, next)=>{
     const {
         EMPLOYEE_ID,
         AOI,
         DESIGNATION,
     }=req.body;
     const query = `INSERT INTO EMPLOYE_EXPERIENCE (EMPLOYEE_ID,AOI,DESIGNATION) VALUES('${EMPLOYEE_ID}','${AOI}','${DESIGNATION}')`;
    this.database.query(query, (err, result, affected) => {
        if (err) {
          res.json({
            error: true,
            message: "Error Occurs At Insert Employe_Experiance",
            data: err
          });
          next();
        } else {
          res.json({
            error: false,
            message: "Employe_Experiance Inserted Successfully!",
            data: result
          });
          next();
        }
      });
 };
 GetExperience = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM EMPLOYE_EXPERIENCE ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get Experience Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM EMPLOYE_EXPERIENCE ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Experience Data!",
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
                message: "Experience Get Successfully!",
                data: resulted
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No Experience Found!",
                data: resulted
              });
              next();
            }
          }
        });
      }
    });
  };
  UpdateExperience = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE EMPLOYE_EXPERIENCE SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, next) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update Experience!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data Experience Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  DeleteExperience = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM EMPLOYE_EXPERIENCE WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete Experience!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Experience Deleted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
}
module.exports= Employe_Experience;
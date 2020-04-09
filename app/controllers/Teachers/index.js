const DB= require("../../database");
class Teacher extends DB {
 constructor(){
     super();
     this.database=this.createConnection();
     this.InsertTeacher=this.InsertTeacher.bind(this);
     this.GetTeacher=this.GetTeacher.bind(this);
     this.UpdateTeacher=this.UpdateTeacher.bind(this);
     this.DeleteTeacher=this.DeleteTeacher.bind(this);
 }
 InsertTeacher=(req,res,next)=>{
     const{
              EMPLOYEE_ID,
              DESIGNATION,
              PASSWORD,
              AOI,
     }=req.body;
     const query =`INSERT INTO TEACHERS(EMPLOYEe_ID,DESIGNATION,PASSWORD,AOI) VALUES('${EMPLOYEE_ID}','${DESIGNATION}','${PASSWORD}','${AOI}')`;
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
        const Query = `SELECT * FROM TEACHERS  ${
          id !== null ? "WHERE S.ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
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
module.exports= Teacher;
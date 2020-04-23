const DB= require("../../database");
class Samester extends DB {
    constructor(){
        super();
        this.database=this.createConnection();
        this.InsertSamester=this.InsertSamester.bind(this);
        this.GetSamester=this.GetSamester.bind(this);
        this.UpdateSamester=this.UpdateSamester.bind(this);
        this.DeleteSamester=this.DeleteSamester.bind(this);
    }
    InsertSamester=(req,res,next)=>{
        const{
                TOTAL_STUDENT,
                SEMESTER_CODE,
                BATCH_ID,
        }=req.body;
        const query =`INSERT INTO SEMESTER(TOTAL_STUDENT,SEMESTER_CODE,BATCH_ID) VALUES('${TOTAL_STUDENT}','${SEMESTER_CODE}','${BATCH_ID}')`;
        this.database.query(query, (err, result, affected) => {
        if (err) {
           res.json({
             error: true,
             message: "Error Occurs At Insert SAMESTER!",
             data: err,
           });
           next();
         } else {
           res.json({
             error: false,
             message: "SAMESTER data Inserted Successfully!",
             data: result.info,
           });
           next();
         }
       });
    };
    GetSamester = (req, res, next) => {
        const { page, pageSizes, id } = req.body;
        const pageSize = page * pageSizes;
        const offset = (page - 1) * pageSizes;
        const query = `SELECT count(*) as total FROM SEMESTER ${
          id !== null ? "WHERE ID =" + id : ""
        }`;
        return this.database.query(query, (err, result, affected) => {
          if (err) {
            res.json({
              error: true,
              message: "Error Occurs At Get SAMESTER Data!",
              data: err,
            });
            next();
          } else {
            let totalPage = result[0].total / pageSizes;
            totalPage = Math.ceil(totalPage);
            const Query = `SELECT * FROM SEMESTER  ${
              id !== null ? "WHERE S.ID =" + id : ""
            } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
            return this.database.query(Query, (error, resulted, affect) => {
              if (error) {
                res.json({
                  error: true,
                  message: "Error Occurs At Get SAMESTER Data!",
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
                    message: " SAMESTER Data Get Successfully!",
                    data: resulted,
                  });
                  next();
                } else {
                  res.json({
                    error: false,
                    message: "NO SAMESTER Data Found!",
                    data: resulted,
                  });
                  next();
                }
              }
            });
          }
        });
      };
      DeleteSamester = (req, res, next) => {
        const { id } = req.body;
        let string = new String();
        if (id.length > 1) {
          id.map((val) => (string += `'${val}',`));
          string = string.slice(0, string.length - 1);
        } else {
          string = id[0];
        }
        const query = `DELETE FROM SEMESTER WHERE ID IN(${string})`;
        this.database.query(query, (err, result, affected) => {
          if (err) {
            res.json({
              error: true,
              message: "Error Occurs At Delete SAMESTER!",
              data: err,
              string: string,
            });
            next();
          } else {
            res.json({
              error: false,
              message: "SAMESTER Data Deleted Successfully!",
              data: result,
            });
            next();
          }
        });
      }; 
      UpdateSamester = (req, res, next) => {
        const { id } = req.params;
        const query = `UPDATE SEMESTER SET ? WHERE ID=${id}`;
        this.database.query(query, { ...req.body }, (err, result, affected) => {
          if (err) {
            res.json({
              error: true,
              message: "Error Occurs At Update SAMESTER!",
              data: err,
            });
            next();
          } else {
            res.json({
              error: false,
              message: " SAMESTER Data Update Successfully!",
              data: result.info,
            });
            next();
          }
        });
      };

}
module.exports=Samester;
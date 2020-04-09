const DB= require("../../database");
class Lab extends DB {
    constructor(){
        super();
        this.database=this.createConnection();
        this.InsertLab=this.InsertLab.bind(this);
        this.GetLab=this.GetLab.bind(this);
        this.UpdateLab=this.UpdateLab.bind(this);
        this.DeleteLab=this.DeleteLab.bind(this);
    }
    InsertLab=(req,res,next)=>{
        const{
                 CAPACITY,
                 ROOM_NO,
        }=req.body;
        const query =`INSERT INTO LAB(CAPACITY,ROOm_NO) VALUES('${CAPACITY}','${ROOM_NO}')`;
        this.database.query(query, (err, result, affected) => {
        if (err) {
           res.json({
             error: true,
             message: "Error Occurs At Insert Lab!",
             data: err,
           });
           next();
         } else {
           res.json({
             error: false,
             message: "Lab data Inserted Successfully!",
             data: result.info,
           });
           next();
         }
       });
    };
    GetLab = (req, res, next) => {
        const { page, pageSizes, id } = req.body;
        const pageSize = page * pageSizes;
        const offset = (page - 1) * pageSizes;
        const query = `SELECT count(*) as total FROM LAB ${
          id !== null ? "WHERE ID =" + id : ""
        }`;
        return this.database.query(query, (err, result, affected) => {
          if (err) {
            res.json({
              error: true,
              message: "Error Occurs At Get LAB Data!",
              data: err,
            });
            next();
          } else {
            let totalPage = result[0].total / pageSizes;
            totalPage = Math.ceil(totalPage);
            const Query = `SELECT * FROM LAB  ${
              id !== null ? "WHERE S.ID =" + id : ""
            } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
            return this.database.query(Query, (error, resulted, affect) => {
              if (error) {
                res.json({
                  error: true,
                  message: "Error Occurs At Get LAB Data!",
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
                    message: " LAB Data Get Successfully!",
                    data: resulted,
                  });
                  next();
                } else {
                  res.json({
                    error: false,
                    message: "NO LAB Data Found!",
                    data: resulted,
                  });
                  next();
                }
              }
            });
          }
        });
      };
      DeleteLab = (req, res, next) => {
        const { id } = req.body;
        let string = new String();
        if (id.length > 1) {
          id.map((val) => (string += `'${val}',`));
          string = string.slice(0, string.length - 1);
        } else {
          string = id[0];
        }
        const query = `DELETE FROM LAB WHERE ID IN(${string})`;
        this.database.query(query, (err, result, affected) => {
          if (err) {
            res.json({
              error: true,
              message: "Error Occurs At Delete LAB!",
              data: err,
              string: string,
            });
            next();
          } else {
            res.json({
              error: false,
              message: "LAB Data Deleted Successfully!",
              data: result,
            });
            next();
          }
        });
      }; 
      UpdateLab = (req, res, next) => {
        const { id } = req.params;
        const query = `UPDATE LAB SET ? WHERE ID=${id}`;
        this.database.query(query, { ...req.body }, (err, result, affected) => {
          if (err) {
            res.json({
              error: true,
              message: "Error Occurs At Update LAB!",
              data: err,
            });
            next();
          } else {
            res.json({
              error: false,
              message: " LAB Data Update Successfully!",
              data: result.info,
            });
            next();
          }
        });
      };

}
module.exports=Lab;
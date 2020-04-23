const DB =require("../../database");
class Section extends DB{
    constructor(){
        super();
        this.database=this.createConnection();
        this.InsertSection =this.InsertSection.bind(this);
        this.GetSection=this.GetSection.bind(this);
        this.DeleteSection=this.DeleteSection.bind(this);
        this.UpdateSection =this.UpdateSection.bind(this);
    }
    InsertSection=(req, res, next)=>
    {
        const{
            SECTION_CODE,
            SEMESTER_ID,
            TOTAL_STUDENT,
            TEACHER_ID,
            
        }=req.body;
        const query=`INSERT INTO SECTION(SECTION_CODE,SEMESTER_ID,TOTAL_STUDENT,TEACHER_ID) VALUES('${SECTION_CODE}','${SEMESTER_ID}','${TOTAL_STUDENT}','${TEACHER_ID}')`;
        this.database.query(query, (err, result, affected) => {
            if (err) {
              res.json({
                error: true,
                message: "Error Occurs At Insert Section",
                data: err,
              });
              next();
            } else {
              res.json({
                error: false,
                message: "Section Inserted Successfully!",
                data: result.info,
              });
              next();
            }
          });
        };
        GetSection = (req, res, next) => {
            const { page, pageSizes, id } = req.body;
            const pageSize = page * pageSizes;
            const offset = (page - 1) * pageSizes;
            const query = `SELECT count(*) as total FROM SECTION ${
              id !== null ? "WHERE ID =" + id : ""
            }`;
            return this.database.query(query, (err, result, affected) => {
              if (err) {
                res.json({
                  error: true,
                  message: "Error Occurs At GeT Section Data!",
                  data: err,
                });
                next();
              } else {
                let totalPage = result[0].total / pageSizes;
                totalPage = Math.ceil(totalPage);
                const Query = `SELECT * FROM SECTION ${
                  id !== null ? "WHERE ID =" + id : ""
                } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
                return this.database.query(Query, (error, resulted, affect) => {
                  if (error) {
                    res.json({
                      error: true,
                      message: "Error Occurs At Get Section Data!",
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
                        message: "Section Get Successfully!",
                        data: resulted,
                      });
                      next();
                    } else {
                      res.json({
                        error: false,
                        message: "No Section Found!",
                        data: resulted,
                      });
                      next();
                    }
                  }
                });
              }
            });
          };
           DeleteSection = (req, res, next) => {
            const { id } = req.body;
            let string = new String();
            if (id.length > 1) {
              id.map((val) => (string += `'${val}',`));
              string = string.slice(0, string.length - 1);
            } else {
              string = id[0];
            }
            const query = `DELETE FROM SECTION WHERE ID IN(${string})`;
            return this.database.query(query, (err, result, affected) => {
              if (err) {
                res.json({
                  error: true,
                  message: "Error Occurs At Delete Seection!",
                  data: err,
                });
                next();
              } else {
                res.json({
                  error: false,
                  message: "Section Deleted Successfully!",
                  data: result.info,
                });
                next();
              }
            });
          };
          UpdateSection = (req, res, next) => {
            const { id } = req.params;
            const Query = `UPDATE SECTION SET ? WHERE ID=${id}`;
            return this.database.query(
              Query,
              { ...req.body },
              (err, result, affected) => {
                if (err) {
                  res.json({
                    error: true,
                    message: "Error Occurs At Update Section",
                    data: err,
                  });
                  next();
                } else {
                  res.json({
                    error: false,
                    message: "Section Update Successfully!",
                    data: result.info,
                  });
                  next();
                }
              }
            );
          };

}
module.exports=Section;
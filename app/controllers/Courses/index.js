const DB= require("../../database");
class Courses extends DB{
    constructor()
    {
        super();
        this.InsertCourse=this.InsertCourse.bind(this);
        this.GetCourse=this.GetCourse.bind(this);
        this.DeleteCourse=this.DeleteCourse.bind(this);
        this.UpdateCourse=this.UpdateCourse.bind(this);
        this.database=this.createConnection();
    }
    InsertCourse=(req, res, next)=> {
            const{
                CREDITHOURS,
                IS_LAB,
                CODE,
                NAME,
            }=req.body;
            const query= `INSERT INTO COURSES(CREDITHOURS,IS_LAB,CODE,NAME) VALUES ('${CREDITHOURS}','${IS_LAB}','${CODE}','${NAME}')`;
            return this.database.query(query, (err, result, affected) => {
              if (err) {
                res.json({
                  error: true,
                  message: "Error Occurs At Insert Course!",
                  data: err
                });
                next();
              } else {
                res.json({
                  error: false,
                  message: "Course Inserted Successfully!",
                  data: result
                });
                next();
              }
            });
};
GetCourse = (req, res, next) => {
    const { page, pageSizes, id } = req.body;
    const pageSize = page * pageSizes;
    const offset = (page - 1) * pageSizes;
    const query = `SELECT count(*) as total FROM COURSES ${
      id !== null ? "WHERE ID =" + id : ""
    }`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Get Course Data!",
          data: err
        });
        next();
      } else {
        let totalPage = result[0].total / pageSizes;
        totalPage = Math.ceil(totalPage);
        const Query = `SELECT * FROM COURSES ${
          id !== null ? "WHERE ID =" + id : ""
        } ORDER BY ID LIMIT ${pageSize} OFFSET ${offset}`;
        return this.database.query(Query, (error, resulted, affect) => {
          if (error) {
            res.json({
              error: true,
              message: "Error Occurs At Get Course Data!",
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
                message: "Course Get Successfully!",
                data: resulted
              });
              next();
            } else {
              res.json({
                error: false,
                message: "No Course Found!",
                data: resulted
              });
              next();
            }
          }
        });
      }
    });
  };
  UpdateCourse = (req, res, next) => {
    const { id } = req.params;
    const Query = `UPDATE COURSES SET ? WHERE ID=${id}`;
    return this.database.query(Query, { ...req.body }, (err, result, next) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Update COURSE!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Data COURSE Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
  DeleteCourse = (req, res, next) => {
    const { id } = req.body;
    let string = new String();
    if (id.length > 1) {
      id.map(val => (string += `'${val}',`));
      string = string.slice(0, string.length - 1);
    } else {
      string = id[0];
    }
    const query = `DELETE FROM COURSES WHERE ID IN(${string})`;
    return this.database.query(query, (err, result, affected) => {
      if (err) {
        res.json({
          error: true,
          message: "Error Occurs At Delete Course!",
          data: err
        });
        next();
      } else {
        res.json({
          error: false,
          message: "Course Deleted Successfully!",
          data: result.info
        });
        next();
      }
    });
  };
}
module.exports= Courses;
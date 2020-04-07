const DB= require("../../database");
class Courses extends DB{
    constructor()
    {
        super();
        this.InsertCourse=this.InsertCourse.bind(this);
        this.GetCourse=this.GetCourse.bind(this);
        this.DeleteCourse=this.DeleteCourse.bind(this);
        this.UpdateCourse=this.UpdateCourse.bind(this);
        this.database-this.createConnection.bind(this);
    }
    InsertCourse=()=> {

    }
}
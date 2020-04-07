const Program = require("./Program");
const Batch = require("./Batch");
const StudentInfo = require("./Student Info/");
const AcademicRecordStudent = require("./Academic Record Student");
const Fees = require("./Fees");
const Student = require("./Student");
const Employement = require("./Employement");
const AcademicRecordEmployee = require("./Academic Record Employee");
const Attendance =require("./Attendance");

module.exports = (app) => {
  app.use("/api/program", Program);
  app.use("/api/batch", Batch);
  app.use("/api/student_info", StudentInfo);
  app.use("/api/academic_record_student", AcademicRecordStudent);
  app.use("/api/fees", Fees);
  app.use("/api/student", Student);
  app.use("/api/employement", Employement);
  app.use("/api/academic_record_employee", AcademicRecordEmployee);
  app.use("/api/attendance",Attendance);
};

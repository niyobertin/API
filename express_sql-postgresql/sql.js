const getStudents = "SELECT * FROM student";
const gettingStudentById = "SELECT * FROM student WHERE id = $1";
const nameIsUsed = "SELECT * FROM student WHERE name = $1";
const addStudent = "INSERT INTO student (name,gender) VALUES($1,$2)";
const removeStudent = "DELETE FROM student WHERE id = $1";
const apdateStudent = "UPDATE student SET name = $1 WHERE id = $2";

module.exports = {
    getStudents,
    gettingStudentById,
    nameIsUsed,
    addStudent,
    removeStudent,
    apdateStudent,
}
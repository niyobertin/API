const { route, Router } = require("express");
const pool = require("../student/db");
const getstudent = require("../sql");

const router = Router();


router.get("/", (req, res) => {
    pool.query(getstudent.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
});
//Getting unique students based on id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(getstudent.gettingStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
})

//Creating new student and inserting into  database.
router.post("/", (req, res) => {
    const { name, gender } = req.body;
    //cheack if email exist or not
    pool.query(getstudent.nameIsUsed, [name], (error, results) => {
        if (results.rows.length) {
            res.send(' Name was used by someone!!!');
        } else {
            //Add student to a database.
            pool.query(getstudent.addStudent, [name, gender], (error, results) => {
                if (error) throw error;
                res.status(201).send("Student created successfully!!");
            })
        };
    });
})
// Deleting student.
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(getstudent.gettingStudentById, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("No student to delete!!");
        } else {
            pool.query(getstudent.removeStudent, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Student deleted successfully");
            });
        };
    });
});

// updating student

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(getstudent.gettingStudentById, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("No student to found!!");
        }
        pool.query(getstudent.apdateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("student updates successfully!!");
        });
    });
});

module.exports = router;
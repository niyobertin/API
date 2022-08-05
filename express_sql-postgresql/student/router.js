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





module.exports = router;
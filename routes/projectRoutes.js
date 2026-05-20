// const express = require("express");

// const router = express.Router();

// const verifyToken = require("../middleware/authMiddleware");

// const {
//     createProject,
//     getProjects,
// } = require("../controllers/projectController");



// router.post("/", verifyToken, createProject);

// router.get("/", verifyToken, getProjects);

// module.exports = router;



const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
    createProject,
    getProjects,
    deleteProject,  // ← IMPORT IT
    verifyMember  // ← IMPORT IT
} = require("../controllers/projectController");

// Your routes should look like this:
router.get("/:projectId/verify-member/:userId", verifyToken, verifyMember);
router.post("/", verifyToken, createProject);
router.get("/", verifyToken, getProjects);
router.delete("/:id", verifyToken, deleteProject);  // ← ADD THIS


module.exports = router;
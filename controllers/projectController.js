const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                message: "Only Admin can create project",
            });
        }

        const { name, description, members } = req.body;

        const project = await Project.create({
            name,
            description,
            members,
            createdBy: req.user.id,
        });

        res.status(201).json({
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ADD THIS NEW FUNCTION
const verifyMember = async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        
        const project = await Project.findById(projectId);
        
        if (!project) {
            return res.status(200).json({ isMember: false });
        }

        // Check if user is project creator
        const isMember = project.createdBy.toString() === userId;

        res.status(200).json({ isMember });
        
    } catch (error) {
        res.status(200).json({ isMember: false });
    }
};

// Delete Project (Admin only)
const deleteProject = async (req, res) => {
    try {
        // Check if user is Admin
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                message: "Only Admin can delete projects",
            });
        }

        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    createProject,
    getProjects,
    deleteProject,
    verifyMember  // ← ADD THIS
};
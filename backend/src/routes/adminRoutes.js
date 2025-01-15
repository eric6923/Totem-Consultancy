import { createReview,updateReview,getReviews,deleteReview } from "../controllers/reviewController.js";
import express from "express"
import { verifyRole } from "../middleware/authMiddleware.js";
import { getAllTeamMembers,getTeamMemberById,createTeamMember,updateTeamMember,deleteTeamMember } from "../controllers/teamController.js";
import { getRecentActivities } from "../controllers/recent.js";
import {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certificateController.js";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
  } from '../controllers/courseController.js';
  import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
  } from '../controllers/projectCategoryController.js';
  import {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProject,
  } from '../controllers/projectController.js';


const router = express.Router();
router.get('/reviews', getReviews);
router.post('/reviews',verifyRole, createReview);
router.put('/reviews/:id',verifyRole, updateReview);
router.delete('/reviews/:id',verifyRole, deleteReview);

//team
router.get('/team', getAllTeamMembers); 
router.get('/team/:id',verifyRole, getTeamMemberById); 
router.post('/team', verifyRole,createTeamMember); 
router.put('/team/:id',verifyRole, updateTeamMember);
router.delete('/team/:id', verifyRole,deleteTeamMember);

//course

router.post('/courses', verifyRole,createCourse); 
router.get('/courses', getAllCourses);
router.get('/courses/:id', verifyRole,getCourseById); 
router.put('/courses/:id',verifyRole, updateCourse);
router.delete('/courses/:id',verifyRole, deleteCourse); 


//project actegory

router.post('/categories',verifyRole, createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id',verifyRole, getCategoryById);
router.put('/categories/:id',verifyRole, updateCategory);
router.delete('/categories/:id', verifyRole,deleteCategory);

//project

router.post('/projects',verifyRole, createProject);
router.get('/projects', getAllProjects);
router.get('/projects/:id',getProjectById);
router.delete('/projects/:id',verifyRole, deleteProject);


router.get('/recent',verifyRole, getRecentActivities);

//certificate

router.post("/certificates", verifyRole, createCertificate);
router.get("/certificates", getAllCertificates);
router.get("/certificates/:id", getCertificateById);
router.put("/certificates/:id", verifyRole, updateCertificate);
router.delete("/certificates/:id", verifyRole, deleteCertificate);

export default router;

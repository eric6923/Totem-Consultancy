import { createReview,updateReview,getReviews,deleteReview } from "../controllers/reviewController.js";
import express from "express"
import { verifyRole } from "../middleware/authMiddleware.js";
import { getAllTeamMembers,getTeamMemberById,createTeamMember,updateTeamMember,deleteTeamMember } from "../controllers/teamController.js";
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
router.get('/reviews',verifyRole, getReviews);
router.post('/reviews',verifyRole, createReview);
router.put('/reviews/:id',verifyRole, updateReview);
router.delete('/reviews/:id',verifyRole, deleteReview);

//team
router.get('/team',verifyRole, getAllTeamMembers); 
router.get('/team/:id',verifyRole, getTeamMemberById); 
router.post('/team', verifyRole,createTeamMember); 
router.put('/team/:id',verifyRole, updateTeamMember);
router.delete('/team/:id', verifyRole,deleteTeamMember);

//course

router.post('/courses', verifyRole,createCourse); 
router.get('/courses',verifyRole, getAllCourses);
router.get('/courses/:id', verifyRole,getCourseById); 
router.put('/courses/:id',verifyRole, updateCourse);
router.delete('/courses/:id',verifyRole, deleteCourse); 


//project actegory

router.post('/categories',verifyRole, createCategory);
router.get('/categories',verifyRole, getAllCategories);
router.get('/categories/:id',verifyRole, getCategoryById);
router.put('/categories/:id',verifyRole, updateCategory);
router.delete('/categories/:id', verifyRole,deleteCategory);

//project

router.post('/projects',verifyRole, createProject);
router.get('/projects',verifyRole, getAllProjects);
router.get('/projects/:id', verifyRole,getProjectById);
router.delete('/projects/:id',verifyRole, deleteProject);


export default router;
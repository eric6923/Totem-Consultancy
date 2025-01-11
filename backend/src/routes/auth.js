import express from "express";
import { adminLogin } from "../controllers/auth/loginController.js";  
import { registerAdmin } from "../controllers/auth/registerUser.js";
import { verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  await adminLogin(req, res); 
}); 
router.post("/register", verifyRole,async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  await registerAdmin(req, res);
}); 

export default router;
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();  // Move this to the top before using any env variables

const app = express();

// Middleware
app.use(cors());  // Use cors middleware properly
app.use(bodyParser.json());
app.use("/api/auth", auth);
app.use("/api", adminRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'CORS is working!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
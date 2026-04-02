import express from "express";
import gameRoutes from "./routes/gameRoutes.js"
import usersRoutes from "./routes/usersRoutes.js"
import cors from "cors";
import { connectDB } from "./util/bd.js";
const app = express();
const port = 5000

app.use(express.json());
app.use(cors());
await connectDB();
app.use("/games", gameRoutes);
app.use("/", usersRoutes);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
export default app;
import express from "express";
import gameRoutes from "./routes/gameRoutes.js"
const app = express();
const port = 5000

app.use(express.json())

app.use((req, res) => {
  res.send('Server is working!');
});

app.use("/", gameRoutes)
app.use("/login", userRoute)



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
export default app;
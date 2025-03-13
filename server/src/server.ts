import express from "express";
import cors from "cors";
import userRouter from "@/routes/userRoute";
import eventRouter from "@/routes/eventRoute";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/event", eventRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
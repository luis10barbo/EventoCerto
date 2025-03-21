import express from "express";
import cors from "cors";
import userRouter from "@/routes/userRoute";
import eventRouter from "@/routes/eventRoute";
import { connectMongoose } from "./db/connection";

const PORT = process.env.PORT || 8080;
const app = express();
connectMongoose();

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use("/user", userRouter);
app.use("/event", eventRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
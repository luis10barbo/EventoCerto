import express from "express";

import {EventCol} from "@/db/connection.js";

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
    const events = await EventCol.find();
    console.log(events);
    res.send(events);
});

eventRouter.post("/", async (_, res) => {
    const event = await EventCol.insertOne({name:"Mix", timestamp: new Date(), limit: 10})
    res.send(event);
})


export default eventRouter;
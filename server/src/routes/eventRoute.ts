import express from "express";

import {EventCol} from "@/db/connection.js";

const eventRouter = express.Router();

eventRouter.get("/get/:id", async (req, res) => {
    const eventId = req.params.id;

    const event = await EventCol.findById(eventId);
    if (event === null) {
        res.sendStatus(404);
        return;
    }
    res.send(event);
});

eventRouter.post("/", async (_, res) => {
    const event = await EventCol.insertOne({name:"Mix", timestamp: new Date(), limit: 10})
    res.send(event);
})

eventRouter.get("/getRT/:id", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
})

export default eventRouter;
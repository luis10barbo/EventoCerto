import { getEventRoom } from "@/controller/eventRoomController";
import { EventCol, getEventById } from "@/db/collections/eventCollection";
import { mapUserCollectionToUser } from "@/db/collections/userCollection";
import { formatEventMessage } from "@/model/eventModel";
import express from "express";
import { FindOperators } from "mongodb";

const eventRouter = express.Router();
const openConnections = new Set();


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
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    const eventId = req.params.id;
    if (!eventId) {
        res.emit("close");
        return;
    }
    const room = getEventRoom(eventId, res);

    const event = await room.getEventInfo(eventId);
    if (!event) {
        res.emit("close");
        return;
    }
    res.write(formatEventMessage({type: "info", id: event.id, askingToJoinUsers: event.askingToJoinUsers, confirmedUsers: event.confirmedUsers, discussion: event.discussion, invitedUsers: event.invitedUsers, limit: event.limit, location: event.location, name: event.name, timestamp: event.timestamp?.toString()}));
    openConnections.add(res);

    // When client closes connection, stop sending events
    req.on('close', () => {
        res.end();
        openConnections.delete(res);
    });
})

export default eventRouter;
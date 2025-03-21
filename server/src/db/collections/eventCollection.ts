import mongoose from "mongoose";
import { userSchemaTypeDefinition } from "./userCollection";

export const eventSchema = new mongoose.Schema({
    name: String,
    limit: Number,
    location: String,
    timestamp: Date,
    confirmedUsers: [userSchemaTypeDefinition],
    askingToJoinUsers: [userSchemaTypeDefinition],
    invitedUsers: [userSchemaTypeDefinition],
    discussion: [{
        userId: Number,
        message: String,
        timestamp: Date
    }]
})
export const EventCol = mongoose.model("event", eventSchema);

export async function getEventById(eventId: string) {
    const event = await EventCol.findById(eventId);
    if (event === null) {
        return undefined;
    }
    return event;
}

import { getEventById } from "@/db/collections/eventCollection";
import { Response } from "express";
import { DiscussionMessageType, formatEventMessage } from "./eventModel";

export class EventRoom {
    public openRooms: Map<string, EventRoom>
    public roomConnections = new Set<Response>();

    public constructor(openRooms: Map<string, EventRoom>, res?: Response) {
        this.openRooms = openRooms;
        if (res) {
            this.roomConnections.add(res);
        }
    }

    public addUserConnection(res: Response) {
        this.roomConnections.add(res);
    }
    public removeUserConnection(res: Response) {
        this.roomConnections.delete(res);
        if (this.roomConnections.size < 1) {
            this.openRooms.clear();
        }
    }
    public handleDiscussionMessage(discussionMessage: DiscussionMessageType) {
        this.roomConnections.forEach((connection) => {
            connection.write(formatEventMessage({type: "discussionMessage", data: discussionMessage}));
        })
    }
    public async getEventInfo(eventId: string) {
        return await getEventById(eventId);
        
    }
}


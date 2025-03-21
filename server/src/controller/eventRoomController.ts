import { EventRoom } from "@/model/eventRoomModel";
import { Response } from "express";

export const openRooms = new Map<string, EventRoom>()

export function getEventRoom(id: string, res?: Response) {
    let room = openRooms.get(id);
    if (!room) {
        room = new EventRoom(openRooms, res);
    }
    return room;
}
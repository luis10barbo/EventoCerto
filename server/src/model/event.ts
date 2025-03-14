import { EventCol } from "@/db/connection";

export type EventType = {_id: string, name: string | null, limit: number | null, timestamp: string | null, location: string | null, confirmedUsers: [], askingToJoinUsers: [], invitedUsers: [], discussion: []};

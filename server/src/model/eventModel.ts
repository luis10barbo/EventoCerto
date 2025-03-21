import { UserSensitiveType, UserType } from "./userModel";

// export type EventType = typeof EventCol
export type EventMessageInfoType = {type: "info", id?: string, name?: string | null, limit?: number | null, timestamp?: string | null, location?: string | null, confirmedUsers?: UserType[], askingToJoinUsers?: UserType[], invitedUsers?: UserType[], discussion?: any[]};
export type EventMessageDiscussionMessageType = {type: "discussionMessage", data: DiscussionMessageType}

export type DiscussionMessageType = {author: UserType, message: string, timestamp: string};

export type EventMessageType = EventMessageInfoType | EventMessageDiscussionMessageType;

export function formatEventMessage(eventMessage: EventMessageType) {
    return `data: ${JSON.stringify(eventMessage)}\n\n`;
}
"use client";
import { IoLocationSharp, IoRemoveSharp, IoSend, IoTimeSharp } from "react-icons/io5";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import { ReactNode, useEffect, useRef, useState } from "react";
import { EventMessageDiscussionMessageType, EventMessageInfoType, EventMessageType } from "@backend/model/eventModel"
import { BACKEND_DOMAIN } from "@/constants/app";
type Message = {nickname: string, message: string, datetime: Date};

function CardUser({nickname, children}: {nickname?: string, children?: ReactNode}) {
    const _nickname = nickname || children;
    return <div className="w-full bg-white hover:bg-neutral-100 cursor-pointer text-black h-12 px-2 py-2 rounded-sm text-base flex justify-between items-center">
        <div className="w-full h-full flex items-center gap-2">
            <div className="h-full aspect-square bg-neutral-300 rounded-full"></div>
            {_nickname} 
        </div>
        <IoRemoveSharp className="text-red-700 cursor-pointer"/>
    </div>
}

export default function EventComponent({eventId} : {eventId: string}) {
    const organizers = ["Luis"];
    const confirmed = ["Luis", "Luis Maligno", "Chrian"];
    const [discussion, setDiscussion] = useState<Message[]>([
        {nickname: "Luan", message: "oi eu sou o luan nem to no grupo", datetime: new Date()},
        {nickname: "Cwin", message: "oi eu sou o Cwin nem to no grupo", datetime: new Date()}
    ]);

    const [discussionMessage, setDiscussionMessage] = useState("");
    const [eventInfo, setEventInfo] = useState<EventMessageInfoType | undefined>(undefined);
    const [fetchingEvent, setFetchingEvent] = useState(true);

    const discussionMessagesRef = useRef<HTMLDivElement>(null);

    function handleDiscussionMessage(message: EventMessageDiscussionMessageType) {
        setDiscussion((oldDiscussion) => {
            return [...oldDiscussion, {nickname: message.data.author.nickname, datetime: new Date(message.data.timestamp), message: message.data.message}]
        });
    }

    useEffect(() => {
        if (!discussionMessagesRef.current) {
            return;
        }
        discussionMessagesRef.current.scroll({top: discussionMessagesRef.current.scrollHeight, behavior: "smooth"});
    }, [discussion])

    useEffect(() => {
        const eventSource = new EventSource(`${BACKEND_DOMAIN}/event/getRT/${eventId}`, {withCredentials: true});
        eventSource.onmessage = (event) => {
            const message: EventMessageType = JSON.parse(event.data);
            console.log(message);
            if (message.type === "info") {
                setEventInfo(message);
                setFetchingEvent(false);
            } else if (message.type === "discussionMessage") {
                handleDiscussionMessage(message)
            }
        };
        return () => {
            eventSource.close();
        }
    }, [eventId])

    function sendMessage() {
        setDiscussionMessage("");

        // TODO: Trocar implementacao
        setDiscussion((oldDiscussions) => {
            return [...oldDiscussions, {nickname: "Luis", message: discussionMessage, datetime: new Date()}]
        })
    }
    if (!eventInfo && fetchingEvent) {
        return <>Loading event</>;
    }
    else if (!eventInfo && !fetchingEvent) {
        return <>Event not found</>;
    } else if (!eventInfo) {
        return <>Unknown Error</>
    }
    return <>
        <header id="event-header">
            <span className='text-5xl'>{eventInfo.name}</span>
            {/* {JSON.stringify(event)} */}
            <div id="info-event" className='text-2xl font-light text-neutral-200 flex gap-16'>
                <span id='organizers-event'>
                Organized by <span className="text-indigo-300">{organizers.map((organizer, i) => {
                if (organizers.length - 1 !== i) {
                    return organizer + ","
                }
                return organizer
                })}</span>
                </span>
                <span id='location-event' className="flex gap-1 items-center">
                <IoLocationSharp className="text-base"/>
                {eventInfo.location ? eventInfo.location : <>No Location</>}
                </span>
                <span className="flex gap-1 items-center">
                    <IoTimeSharp/>
                    {eventInfo.timestamp ? new Date(eventInfo.timestamp).toLocaleString() : "No date set"}
                </span>
            </div>

            
        </header>
        <div className="flex gap-8 text-base h-full overflow-hidden">
                <section className="flex-1 flex flex-col gap-2">
                    <span className="">Confirmed</span>
                    {confirmed.map((confirmedPerson) => {
                        return <CardUser key={confirmedPerson}>{confirmedPerson}</CardUser>
                    })}
                </section>
                <section className="flex-1">
                    <span className="">Wants to Join</span>
                </section>
                <section className="flex-1">
                    <span className="">Invited</span>
                </section>
                <div id="discussions" className="bg-neutral-800 p-4 flex-1 min-w-[500px] rounded-xl h-full flex flex-col">
                    {/* <span className="">Discussion</span> */}
                    <div id="messages-discussions" className="flex flex-col h-full overflow-auto gap-2 " ref={discussionMessagesRef}>
                        {discussion.map((message, i) => {
                            return <div key={i} className="flex flex-col bg-neutral-700 px-4 py-2 rounded-sm">
                                <span className="text-base">{message.nickname}</span>
                                <span className="text-base font-light">{message.message}</span>
                            </div>
                        })}
                    </div>
                    <footer id="discussions-footer" className="flex gap-1 h-10 w-full">
                        <InputComponent value={discussionMessage} onChange={(e) => {setDiscussionMessage(e.target.value)}} onKeyDownCapture={(e) => {if (e.key === "Enter") {sendMessage()}}} className="h-full text-base w-full bg-white border-neutral-600 text-black" classNameHolder="w-full" placeholder="Digite uma mensagem aqui"/> <ButtonComponent onClick={() => {sendMessage()}} icone={<IoSend className="text-neutral-900 text-xl"/>} className="p-0 h-10 aspect-square bg-white border-neutral-300 hover:bg-green-200 border"/>
                    </footer>
                </div>

            </div>
      </>
}
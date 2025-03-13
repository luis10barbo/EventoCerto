import { IoLocationSharp, IoRemoveSharp, IoSend, IoTimeSharp } from "react-icons/io5";
import ButtonComponent from "./ButtonComponent"
import InputComponent from "./InputComponent"
import { ReactNode, useState } from "react";

type Message = {nickname: string, message: string, datetime: Date};

function CardUser({nickname, children}: {nickname?: string, children?: ReactNode}) {
    const _nickname = nickname || children;
    return <div className="w-full bg-white text-black h-12 px-2 py-2 rounded-sm text-base flex justify-between items-center">
        <div className="w-full h-full flex items-center gap-2">
            <div className="h-full aspect-square bg-neutral-300 rounded-full"></div>
            {_nickname} 
        </div>
        <IoRemoveSharp className="text-red-700 cursor-pointer"/>
    </div>
}

export default function EventComponent() {
    const organizers = ["Luis"];
    const confirmed = ["Luis", "Luis Maligno", "Chrian"];
    const [discussion, setDiscussion] = useState<Message[]>([
        {nickname: "Luan", message: "oi eu sou o luan nem to no grupo", datetime: new Date()},
        {nickname: "Cwin", message: "oi eu sou o Cwin nem to no grupo", datetime: new Date()}
    ]);

    const [discussionMessage, setDiscussionMessage] = useState("");

    function sendMessage() {
        setDiscussionMessage("");

        // TODO: Trocar implementacao
        setDiscussion((oldDiscussions) => {
            return [...oldDiscussions, {nickname: "Luis", message: discussionMessage, datetime: new Date()}]
        })
    }

    return <>
        <header id="event-header">
            <span className='text-5xl'>Event Name</span>

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
                No location
                </span>
                <span className="flex gap-1 items-center">
                    <IoTimeSharp/>
                    0/0/0 00:00 - 00:00
                </span>
            </div>

            
        </header>
        <div className="flex gap-8 text-base h-full">
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
                <div id="discussions" className="bg-neutral-800 p-2 flex-1 min-w-[500px] rounded-xl h-full flex flex-col">
                    {/* <span className="">Discussion</span> */}
                    <div id="messages-discussions" className="flex flex-col h-full overflow-auto gap-2 ">
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
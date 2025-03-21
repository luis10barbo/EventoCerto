import ButtonComponent from "./ButtonComponent";
import { FaCalendar, FaEnvelope } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default function HeaderComponent() {
    return <header className="flex justify-between w-full bg-neutral-800 py-4 px-8">
        <span className="text-4xl text-green-200 font-bold">EventoCerto</span>
        <div id="right-side-header" className="flex items-center gap-4">
            <div id="logged-in-buttons-header" className="gap-1 flex">
                <ButtonComponent icone={<IoMdAdd/>} className="gap-2">Create Event</ButtonComponent>
                <ButtonComponent icone={<FaEnvelope/>} className="gap-2">Your Invites</ButtonComponent>
                <ButtonComponent icone={<FaCalendar/>} className="gap-2">Your Events</ButtonComponent>
            </div>
            
            <div id="user-container-header" className="flex items-center gap-2">
                <div className="h-10 rounded-full  aspect-square bg-neutral-900"></div>User
            </div>
        </div>
    </header>
}
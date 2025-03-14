import EventComponent from '@/components/EventComponent'
import HeaderComponent from '@/components/HeaderComponent'
import { BACKEND_DOMAIN } from '@/constants/app';
import { EventType } from '@backend/model/event';

async function App({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    const response = await fetch(`${BACKEND_DOMAIN}/event/get/${id}`);
    if (response.status !== 200) {
        return <div className="bg-neutral-900 h-full w-full text-white flex flex-col ">
        <HeaderComponent/>
        <main className='flex flex-col gap-8 h-full p-16'>
          Event not found or you dont have permission to access it
        </main>
  
      </div>
    }
    const event: EventType = await response.json()
  return (
    <div className="bg-neutral-900 h-full w-full text-white flex flex-col ">
      <HeaderComponent/>
      <main className='flex flex-col gap-8 h-full p-16'>
        <EventComponent event={event}/>
      </main>

    </div>
  )
}

export default App

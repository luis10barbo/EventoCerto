import EventComponent from '@/components/EventComponent'
import HeaderComponent from '@/components/HeaderComponent'

async function App({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
  return (
    <div className="bg-neutral-900 h-full w-full text-white flex flex-col ">
      <HeaderComponent/>
      <main className='flex flex-col gap-8 h-full p-16 overflow-hidden'>
        <EventComponent eventId={id}/>
      </main>

    </div>
  )
}

export default App

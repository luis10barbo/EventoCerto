import EventComponent from '@/components/EventComponent'
import HeaderComponent from '@/components/HeaderComponent'

function App() {

  return (
    <div className="bg-neutral-900 h-full w-full text-white flex flex-col ">
      <HeaderComponent/>
      <main className='flex flex-col gap-8 h-full p-16'>
        <EventComponent/>
      </main>

    </div>
  )
}

export default App

import { ArrowRight } from 'lucide-react'

import logoImg from '../assets/ama-logo.svg'
// import { createRoom } from '../http/create-room'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function CreateRoom() {
  const navigate = useNavigate()

  async function createRoomAction(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      return
    }

    try {
      // const { roomId } = await createRoom({ theme })

      navigate(`/221d8db8-8286-40d8-bc06-a302ec0cd070`)
    } catch (err) {
      toast.error('Failed to create the room!')
    }
  }
  
  return (
    <main className="h-screen flex items-center justify-center px-5">
      <div className="max-w-[450px] flex flex-col gap-6">
        <img src={logoImg} alt="AMA" className="h-10" />

        <p className="leading-relaxed text-zinc-300 text-center">
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>

        <form 
          action={createRoomAction} 
          className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:ring-1 ring-orange-400 ring-offset-4 ring-offset-zinc-950"
        >
          <input
            name="theme" 
            type="text" 
            placeholder="Nome da sala" 
            className="flex-1 text-sm placeholder:text-zinc-500 bg-transparent mx-2 outline-none text-zinc-100"
          />
          <button 
            type="submit" 
            className="bg-orange-400 text-orange-950 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 text-nowrap transition-colors hover:bg-orange-500"
          >
            Criar sala
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  )
}
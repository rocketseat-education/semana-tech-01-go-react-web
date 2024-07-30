import { ArrowRight, Share2 } from "lucide-react";

import logoImg from '../assets/ama-logo.svg';
import { toast } from "sonner";
import { Navigate, useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { Messages } from "../components/messages";
import { Suspense } from "react";
import { useMutation } from "@tanstack/react-query";

export function Room() {
  const { roomId } = useParams<{ roomId: string }>()

  const { 
    mutateAsync: requestCreateMessage, 
    isPending: isCreatingMessage,
  } = useMutation({
    mutationFn: createMessage,
  })

  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.canShare !== undefined && navigator.canShare()) {
      navigator.share({ url })
    } else {
      navigator.clipboard.writeText(url)

      toast('O link da sala foi copiado para área de transferência!')
    }
  }

  async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if (!message || !roomId) {
      return
    }

    try {
      await requestCreateMessage({ message, roomId })
    } catch (err) {
      toast.error('Failed to create the message!')
    }
  }

  if (!roomId) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-5">
      <div className="flex items-center gap-2 px-3">
        <img src={logoImg} className="size-5" />

        <span className="text-sm text-zinc-500 truncate">
          Código da sala:{' '}
          <span className="text-zinc-300">
            {roomId}
          </span>
        </span>

        <button 
          type="button" 
          className="ml-auto py-1.5 px-3 rounded-lg bg-zinc-800 text-zinc-300 flex items-center gap-1.5 font-medium text-sm hover:bg-zinc-700 transition-colors"
          onClick={handleShareRoom}
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <form 
        action={createMessageAction} 
        className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:ring-1 ring-orange-400 ring-offset-4 ring-offset-zinc-950"
      >
        <input
          name="message" 
          type="text" 
          placeholder="Qual a sua pergunta?" 
          className="flex-1 text-sm placeholder:text-zinc-500 bg-transparent mx-2 outline-none text-zinc-100"
        />
        <button 
          type="submit" 
          disabled={isCreatingMessage}
          className="bg-orange-400 text-orange-950 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors hover:bg-orange-500 disabled:opacity-60"
        >
          Criar pergunta
          <ArrowRight className="size-4" />
        </button>
      </form>

      <Suspense fallback={<p>Carregando...</p>}>
        <Messages roomId={roomId} />
      </Suspense>
    </div>
  )
}
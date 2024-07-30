import { ArrowRight, Share2 } from "lucide-react";

import logoImg from '../assets/ama-logo.svg'
import { Message } from "../components/message";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

export function Room() {
  const { id } = useParams<{ id: string }>()

  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.canShare !== undefined && navigator.canShare()) {
      navigator.share({ url })
    } else {
      navigator.clipboard.writeText(url)

      toast('O link da sala foi copiado para área de transferência!')
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-5">
      <div className="flex items-center gap-2 px-3">
        <img src={logoImg} className="size-5" />

        <span className="text-sm text-zinc-500 truncate">
          Código da sala:{' '}
          <span className="text-zinc-300">
            {id}
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
        // action={createRoomAction} 
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
          className="bg-orange-400 text-orange-950 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors hover:bg-orange-500"
        >
          Criar pergunta
          <ArrowRight className="size-4" />
        </button>
      </form>

      <ol className="space-y-8">
        <Message 
          text="O que é GoLang e quais são suas principais vantagens em comparação com outras linguagens de programação como Python, Java ou C++?" 
          amountOfReactions={123} 
        />
        <Message 
          text="Como funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?" 
          amountOfReactions={82} 
        />
      </ol>
    </div>
  )
}
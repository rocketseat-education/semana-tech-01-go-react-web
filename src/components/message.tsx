import { useMutation } from "@tanstack/react-query";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { createMessageReaction } from "../http/create-message-reaction";
import { useParams } from "react-router-dom";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered: boolean
}

export function Message({ id, text, amountOfReactions, answered }: MessageProps) {
  const { roomId } = useParams<{ roomId: string }>()
  const [hasReacted, setHasReacted] = useState(false)

  if (!roomId) {
    throw new Error('Component should only be rendered when :roomId parameter exists.')
  }

  const { mutateAsync: requestCreateReaction } = useMutation({
    mutationFn: () => createMessageReaction({ messageId: id, roomId }),
    onMutate: () => setHasReacted(true),
  })

  const { mutateAsync: requestRemoveReaction } = useMutation({
    mutationFn: () => removeMessageReaction({ messageId: id, roomId }),
    onMutate: () => setHasReacted(false),
  })

  return (
    <li 
      data-answered={answered}
      className="list-decimal list-inside leading-relaxed data-[answered=true]:opacity-40 data-[answered=true]:pointer-events-none" 
    >
      {text}

      {hasReacted ? (
        <button 
          type="button" 
          onClick={() => requestRemoveReaction()} 
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button 
          type="button" 
          onClick={() => requestCreateReaction()} 
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
      
    </li>
  )
}
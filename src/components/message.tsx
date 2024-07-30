import { ArrowUp } from "lucide-react";

interface MessageProps {
  text: string
  amountOfReactions: number
}

export function Message({ text, amountOfReactions }: MessageProps) {
  return (
    <li className="list-decimal list-inside leading-relaxed">
      {text}
      <button type="button" className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium">
        <ArrowUp className="size-4" />
        Curtir pergunta ({amountOfReactions})
      </button>
    </li>
  )
}
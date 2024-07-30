import { useMessages } from "../hooks/use-messages";
import { Message } from "./message";

interface MessagesProps {
  roomId: string
}

export function Messages({ roomId }: MessagesProps) {
  const { messages } = useMessages(roomId)

  return (
    <ol className="space-y-8 px-3">
      {messages.map(message => {
        return (
          <Message 
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions} 
            answered={message.answered}
          />
        )
      })}
    </ol>
  )
}
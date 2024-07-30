export interface GetMessagesRequest {
  roomId: string
}

export interface GetMessagesResponse {
  messages: {
    id: string
    text: string
    amountOfReactions: number
    answered: boolean
  }[]
}

export async function getMessages({ roomId }: GetMessagesRequest): Promise<GetMessagesResponse> {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/rooms/${roomId}/messages`)

  const data: Array<{
    id: string
    room_id: string
    message: string
    reaction_count: number
    answered: false
  }> = await response.json()

  return { 
    messages: data.map(message => {
      return {
        id: message.id,
        text: message.message,
        amountOfReactions: message.reaction_count,
        answered: message.answered,
      }
    })
  }
}
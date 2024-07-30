interface CreateMessageRequest {
  roomId: string
  message: string
}

interface CreateMessageResponse {
  id: string
}

export async function createMessage({ roomId, message }: CreateMessageRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/rooms/${roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      message,
    }),
  })

  const data: CreateMessageResponse = await response.json()

  return { messageId: data.id }
}
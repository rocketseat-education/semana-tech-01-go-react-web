interface CreateMessageReactionRequest {
  roomId: string
  messageId: string
}

export async function createMessageReaction({ roomId, messageId }: CreateMessageReactionRequest): Promise<void> {
  await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'PATCH',
  })
}
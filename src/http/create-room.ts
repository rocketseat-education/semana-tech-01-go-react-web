interface CreateRoomRequest {
  theme: string
}

interface CreateRoomResponse {
  id: string
}

export async function createRoom({ theme }: CreateRoomRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/rooms`, {
    method: 'POST',
    body: JSON.stringify({
      theme,
    }),
  })

  const data: CreateRoomResponse = await response.json()

  return { roomId: data.id }
}
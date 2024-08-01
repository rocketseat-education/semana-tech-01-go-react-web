import { useEffect } from "react";
import { z } from 'zod'

const webhookMessage = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('message_created'),
    value: z.object({
      id: z.string().uuid(),
      room_id: z.string().uuid(),
      message: z.string(),
    }),
  }),

  z.object({
    kind: z.literal('message_answered'),
    value: z.object({
      id: z.string().uuid(),
    }),
  }),

  z.object({
    kind: z.literal('message_reaction_increased'),
    value: z.object({
      id: z.string().uuid(),
      count: z.number(),
    }),
  }),

  z.object({
    kind: z.literal('message_reaction_decreased'),
    value: z.object({
      id: z.string().uuid(),
      count: z.number(),
    }),
  }),
])

export type WebhookMessage = z.infer<typeof webhookMessage>

interface UseWebsocketParams {
  roomId: string
  onMessage: (message: WebhookMessage) => Promise<void> | void
}

export function useWebsocket({ roomId, onMessage }: UseWebsocketParams) {
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)

    ws.onopen = () => { console.log('Websocket connected!') }

    ws.onmessage = (event) => {
      const message = webhookMessage.parse(JSON.parse(event.data));

      onMessage(message)
    };

    return () => {
      ws.close();
    };
  }, [onMessage, roomId])
}
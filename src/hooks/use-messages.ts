import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getMessages, type GetMessagesResponse } from "../http/get-messages";
import { useCallback } from "react";
import { type WebhookMessage, useWebsocket } from "./use-websocket";

export function useMessages(roomId: string) {
  const queryClient = useQueryClient()
  
  const { data } = useSuspenseQuery({
    queryFn: () => getMessages({ roomId }),
    queryKey: ['messages', roomId],
  })

  const onWebhookMessage = useCallback((message: WebhookMessage) => {
    switch(message.kind) {
      case 'message_created':
        queryClient.setQueryData<GetMessagesResponse>(['messages', roomId], data => {
          return { 
            messages: [
              ...(data?.messages ?? []),  
              {
                id: message.value.id,
                text: message.value.message,
                amountOfReactions: 0,
                answered: false,
              }
            ],
          }  
        })

        break;
      case 'message_answered':
        queryClient.setQueryData<GetMessagesResponse>(['messages', roomId], data => {
          if (!data) {
            return { messages: [] }
          }

          return { 
            messages: data.messages.map(item => {
              if (item.id === message.value.id) {
                return { ...item, answered: true }
              }

              return item
            }),
          }  
        })

        break;
      case 'message_reaction_increased':
      case 'message_reaction_decreased':
        queryClient.setQueryData<GetMessagesResponse>(['messages', roomId], data => {
          if (!data) {
            return { messages: [] }
          }

          return { 
            messages: data.messages.map(item => {
              if (item.id === message.value.id) {
                return { ...item, amountOfReactions: message.value.count }
              }

              return item
            }),
          }  
        })

        break;
    }
  }, [queryClient, roomId])

  useWebsocket({ roomId, onMessage: onWebhookMessage })

  return { 
    messages: data.messages.sort((a, b) => b.amountOfReactions - a.amountOfReactions)
  }
}
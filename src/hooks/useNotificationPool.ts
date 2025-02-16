import {Dispatch, SetStateAction, useEffect} from "react";
import {Message} from "../components/chat/types.ts";
import RESTAPI from "../api";

export const useNotificationPool = (API: RESTAPI, chatId: string, setMessages: Dispatch<SetStateAction<Message[]>>) => {

  useEffect(() => {
    let timeout: number;
    let isMounted = true;
    const poll = async () => {
      try {
        const notification = await API.receiveNotification();

        if (notification && isMounted) {
          await API.deleteNotification(notification.receiptId)

          if (notification.body.typeWebhook === "incomingMessageReceived" && notification.body.senderData.chatId === chatId) {
            const message: Message = {
              id: notification.body.idMessage,
              message: notification.body.messageData.textMessageData.textMessage,
              sender: notification.body.senderData.chatId,
              type: "incoming"
            }
            setMessages(prev => [...prev, message])
          }
        }
      } catch(err) {
        console.log(`error: ${err}`)
        timeout = setTimeout(poll, 5000);
      } finally {
        if (isMounted && !timeout) {
          poll()
        }
      }
    }

    poll()

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    }

  }, [])
}
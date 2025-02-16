export interface Message {
  id: string
  message: string
  type: "outgoing" | 'incoming'
  sender: string
}

export interface Notification {
  body: {
    idMessage: string
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: string
    }
    messageData: {
      typeMessage: string
      textMessageData: {
        textMessage: string
      }
    },
    senderData: {
      chatId: string
      chatName: string
      sender: string
      senderName: string
      senderContactName: string
      timestamp: number
      typeWebhook: string
    }
  }
  receiptId: number
}
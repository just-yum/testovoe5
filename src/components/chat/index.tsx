import './index.scss'
import {Message as IMessage} from "./types.ts";
import Message from "./message";
import SendIcon from '/send-icon.svg'
import {KeyboardEvent, useEffect, useRef, useState} from "react";
import {useNotificationPool} from "../../hooks/useNotificationPool.ts";
import Input from "../input";
import RESTAPI from "../../api";
import {useCredentialsStore} from "../../store/credentialsStore.ts";

interface ChatProps {
  chatId: string
}

const Chat = ({chatId}: ChatProps) => {

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");

  const chatRef = useRef<HTMLDivElement | null>(null);
  const {instanceId, apiToken} = useCredentialsStore(state => state)
  const API = new RESTAPI(instanceId, apiToken);

  useNotificationPool(API, chatId, setMessages);

  const handleSendMessage = async () => {
    setInput("");

    try {
      const res = await API.sendMessage(chatId, input);
      const message: IMessage = {
        id: res.idMessage,
        message: input,
        type: 'outgoing',
        sender: 'me'
      }
      setMessages(prev => [...prev, message])

    } catch (err) {
      console.log(err)
    }
  }

  const handleEnterDown = async (event:  KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await handleSendMessage()
    }
  }

  useEffect(() => {
    const container = chatRef.current

    if (!container) return;

    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 250;

    if (isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }

  }, [messages]);

  return (
    <div className={"chat"}>
      <div className={"chat-head"}>
        <p>{chatId}</p>
      </div>
      <div className={"chat-content"} ref={chatRef}>
        <div className={"chat-messages"}>
          {messages.map(msg => <Message key={msg.id} message={msg}/>)}
        </div>
      </div>
      <div className={"chat-actions"}>
        <div className={"chat-input"}>
          <Input
            placeholder={"Введите сообщение"}
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={handleEnterDown}
          />
          <button onClick={handleSendMessage} ><img src={SendIcon} alt={"send-icon"}/></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
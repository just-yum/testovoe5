import {memo} from 'react';
import {Message as IMessage} from "../types.ts";
import './index.scss'
interface MessageProps {
  message: IMessage
}

const Message = memo(({ message }: MessageProps) => {
  return (
    <div className={`chat-message ${message.type}`}>
      <p>{message.message}</p>
      <div className={"message-info"}>
      </div>
    </div>
  );
})

export default Message;
import {useEffect, useState} from "react";
import Chat from "../components/chat";
import Input from "../components/input";
import './styles.scss'
import {useCredentialsStore} from "../store/credentialsStore.ts";
import { useDebounce } from '@uidotdev/usehooks'
function App() {
  const [chatId, setChatId] = useState<string>("");

  const { updateInstance, updateToken } = useCredentialsStore(store => store)

  const [instance, setInstance] = useState<string>("")
  const [token, setToken] = useState<string>("")

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

  const debouncedInstance = useDebounce(instance, 300)
  const debouncedToken = useDebounce(token, 300)


  useEffect(() => {
    updateInstance(debouncedInstance);
  }, [debouncedInstance]);

  useEffect(() => {
    updateToken(debouncedToken);
  }, [debouncedToken]);

  const handleExitChat = () => {
    setChatId("");
    setIsChatOpen(false);
  }

  const handleOpenChat = () => {
    setIsChatOpen(true);
  }


  return (
    <main>
      <div className={"form"}>
        <Input
          placeholder={"Введите Instance ID"}
          disabled={isChatOpen}
          value={instance}
          onChange={(e) => setInstance(e.target.value)}
        />
        <Input
          placeholder={"Введите API Token"}
          disabled={isChatOpen}
          value={token}
          onChange={(e) => setToken(e.target.value)}/>
        <Input
          placeholder={"Введите ID чата"}
          value={chatId}
          disabled={isChatOpen}
          onChange={(e) => setChatId(e.target.value)}/>
        {isChatOpen
          ? <button onClick={handleExitChat}>Выйти из чата</button>
          : <button onClick={handleOpenChat}>Войти в чат</button>
        }
      </div>
      {isChatOpen && <Chat chatId={chatId} />}
    </main>
  )
}

export default App

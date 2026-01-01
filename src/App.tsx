import { useState, useRef, useEffect } from "react";
import { HeaderChat } from "./components/Header";
import { MessagesArea } from "./components/MessagesArea";
import { InputArea } from "./components/InputArea";
import { SelectProfile } from "./components/SelectProfile/Index";
import type { Message, UserRole } from "./interface";
import logo from "./assets/images/logo.png";
import { groq } from "./utils/constants";
import {
  buildChatPayload,
  createMessage,
  handleAIError,
  scrollToBottom,
} from "./utils/functions";

export default function App() {
  const [inputText, setInputText] = useState("");

  const [role, setRole] = useState<UserRole>();

  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Olá! Informe o número de colaborador para iniciarmos.",
    },
  ]);

  /* sends a user message to the groq and handles the chat response */
  const handleSendToAI = async () => {
    if (!inputText.trim() || !role) return;

    const userMessage = createMessage(inputText, "user");

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoadingAI(true);

    const payload = buildChatPayload(messages, userMessage, role);

    try {
      const response = await groq.chat.completions.create(payload);

      const botText =
        response.choices[0]?.message?.content ||
        "Desculpe, não consegui entender sua mensagem, tente ser mais específico.";

      const botMessage = createMessage(botText, "bot");

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Erro ao enviar mensagem para o Groq:", error);

      setMessages((prev) => [
        ...prev,
        createMessage(handleAIError(error), "bot"),
      ]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  return (
    <div
      className="sm:min-h-screen h-screen sm:h-auto bg-gradient-to-br from-[#1a3661] via-[#5e3b6d] to-[#f6d379]  
    flex items-center justify-center relative p-3"
    >
      <div
        className="w-full max-w-4xl max-h-[90dvh] h-[95vh] sm:max-h-[95vh] bg-black/90 ounded-3xl  
        flex flex-col rounded-3xl z-[50] overflow-hidden  shadow-lg shadow-[#fff] "
      >
        <HeaderChat role={role} />

        {role ? (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 min-h-0 z-10">
              <MessagesArea
                role={role}
                isLoadingAI={isLoadingAI}
                messages={messages}
                messagesEndRef={messagesEndRef}
              />
            </div>

            <InputArea
              inputText={inputText}
              setInputText={setInputText}
              handleSend={handleSendToAI}
            />
          </div>
        ) : (
          <SelectProfile setRole={setRole} />
        )}
      </div>

      <div className=" absolute inset-0 z-0 overflow-hidden">
        <img
          src={logo}
          alt="Logo"
          className="absolute -top-4 -left-4 w-[20%] opacity-25 animate-spin [animation-duration:25s]"
        />
        <img
          src={logo}
          alt="Logo"
          className="absolute -bottom-24 -right-20 w-[40%] opacity-40 animate-spin
           [animation-duration:25s]"
        />
      </div>
    </div>
  );
}

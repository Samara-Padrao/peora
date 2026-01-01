import type { Message, UserRole } from "../../interface";

export interface IMessageAreaProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isLoadingAI: boolean
  role: UserRole
}

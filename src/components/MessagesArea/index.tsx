import { User } from "lucide-react";
import { RiRobot3Line } from "react-icons/ri";
import type { IMessageAreaProps } from "./interface";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";

export const MessagesArea = ({
  messages,
  messagesEndRef,
  isLoadingAI,
  role
}: IMessageAreaProps) => {
  return (
    <AnimatePresence>
      <div className="h-full min-h-0 overflow-y-auto p-6 space-y-4 z-50">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`flex gap-3 ${
              message.type === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
           <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
              message.type === "user"
                ? "bg-gradient-to-br from-[#f5f5f5] to-[#f6d379]"
                : "bg-gradient-to-br from-[#4a2c54] to-[#1e3a5f]"
            }`}
          >
              {message.type === "user" ? (
                role === "colaborador" ? (
                  <User className="w-6 h-6 text-[#4a2c54]" />
                ) : (
                  <FaUserShield className="w-5 h-5 text-[#4a2c54]" />
                )
              ) : (
                <RiRobot3Line className="w-6 h-6 text-white" />
              )}
            </div>

            <div
            className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-lg ${
              message.type === "user"
                ? "bg-gradient-to-br from-[#f5f5f5] to-[#f6d379] text-[#1a2332] rounded-tr-sm"
                : "bg-gradient-to-br from-[#4a2c54] to-[#1e3a5f] text-white rounded-tl-sm"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
          </motion.div>
        ))}

        {isLoadingAI && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md
              bg-gradient-to-br from-purple-400 to-blue-500"
            >
              <RiRobot3Line className="w-6 h-6 text-white" />
            </div>

            <div
              className="max-w-[70%] rounded-2xl px-5 py-3 shadow-md
             bg-gradient-to-br from-purple-400 to-blue-500 text-white rounded-tl-sm"
            >
              <p className="text-sm animate-pulse opacity-80">Digitando...</p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </AnimatePresence>
  );
};

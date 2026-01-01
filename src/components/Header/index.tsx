import { RiRobot3Fill } from "react-icons/ri";
import type { IHeaderChatProps } from "./interface";

export const HeaderChat = ({ role }: IHeaderChatProps) => {
  return (
    <div className="bg-gradient-to-l from-[#1e3a5f] to-[#4a2c54] flex items-center gap-3 p-6 rounded-t-3xl border-b-2 border-[#fff]/20">
      <div className="w-12 h-12 bg-[#fff] rounded-full flex items-center justify-center shadow-lg shadow-[#fff]/30">
        <RiRobot3Fill className="w-7 h-7 text-[#4a2c54]" />
      </div>

      <div className="flex flex-col"> 
        <h1 className="text-[#fff] font-bold text-xl leading-tight"> 
           Peora | PeopleCare AI
        </h1>
        <span className="text-[#fff] font-semibold text-sm leading-tight"> 
          Assistente de RH para Licenças e INSS
        </span>
        <p className="text-[#b8c5d6] text-sm mt-1"> 
          Online | <span className="capitalize font-semibold text-[#fff]">{role ? role : "Usuário"}</span>
        </p>
      </div>
    </div>
  );
};

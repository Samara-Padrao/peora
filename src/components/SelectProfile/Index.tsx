import { FaUserShield, FaUsers } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import type { ISelectProfileProps } from "./interface";
import type { UserRole } from "../../interface";
import type { JSX } from "react";
import { RiRobot3Fill } from "react-icons/ri";

export const SelectProfile = ({ setRole }: ISelectProfileProps) => {
  const typeRole: { role: UserRole; icon: JSX.Element }[] = [
    { role: "gestor", icon: <FaUserShield /> },
    { role: "colaborador", icon: <FaUsers /> },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-4 ">
      <div className="w-full max-w-md relative bg-[#0f1419]/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#fff]/30 shadow-xl">
        <div className="w-20 h-20 m-auto mb-4 rounded-full bg-gradient-to-br from-[#1e3a5f] via-[#4a2c54] to-[#fff] flex items-center justify-center shadow-lg shadow-[#fff]/40">
          <div className="w-16 h-16 bg-[#0f1419] rounded-full flex items-center justify-center">
            <RiRobot3Fill className="w-8 h-8 text-[#fff]" />
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#fff] via-[#b8935f] to-[#f5e6d3] bg-clip-text text-transparent">
          Selecione seu perfil
        </h3>

        <p className="text-[#8a95a8] text-center mb-8 text-sm">
          Escolha como deseja interagir com o sistema
        </p>

        <div className="space-y-4">
          {typeRole.map((item) => (
            <button
              key={item.role}
              onClick={() => setRole(item.role)}
              className="group w-full flex items-center justify-between rounded-xl bg-[#1a2332]/50 border-2 border-[#4a2c54] hover:border-[#fff] hover:bg-gradient-to-r hover:from-[#1e3a5f] hover:to-[#4a2c54] px-6 py-4 text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#fff]/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#4a2c54] to-[#1e3a5f] group-hover:from-[#fff] group-hover:to-[#b8935f] transition-all duration-300">
                  <span className="text-xl text-[#fff] group-hover:text-[#1e3a5f]">
                    {item.icon}
                  </span>
                </div>

                <span className="text-md sm:text-lg font-semibold capitalize text-[#f5e6d3]">
                  {item.role}
                </span>
              </div>

              <IoIosArrowForward className="h-5 w-5 text-[#fff] transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

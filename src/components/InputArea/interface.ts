import type { Dispatch, SetStateAction } from "react";

export interface IInputAreaProps {
    inputText: string;
    setInputText: Dispatch<SetStateAction<string>>
    handleSend: () => void;
}
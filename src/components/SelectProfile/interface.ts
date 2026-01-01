import type { UserRole } from "../../interface";

export interface ISelectProfileProps {
    setRole: ((role: UserRole) => void);
 }
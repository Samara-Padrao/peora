export interface Message {
  id: number ;
  type: "bot" | "user";
  text: string;
  status?: "typing" | "done";
}

export type UserRole = "gestor" | "colaborador";

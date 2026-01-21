import { createContext } from "react";

export interface GameUser {
    id: number;
    email: string;
    name: string;
}

export interface AuthContextType {
    user: GameUser | null;
    loading: boolean;
    setUser: (user: GameUser | null) => void;
}

export const AuthContext =
    createContext<AuthContextType | null>(null);

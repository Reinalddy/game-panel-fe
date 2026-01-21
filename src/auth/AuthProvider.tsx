import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext,type GameUser } from "./AuthContext";

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<GameUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/user/me");
                setUser(res.data.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loading, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

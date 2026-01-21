import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";

export default function SSOLogin() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const token = new URLSearchParams(
        window.location.search
    ).get("token");

    useEffect(() => {
        const login = async () => {
            try {
                const res = await api.post("/sso/login", { token });
                const accessToken = res.data.data.access_token;
                console.log(res);
                localStorage.setItem(
                    "game_access_token",
                    accessToken
                );

                const me = await api.get("/user/me");
                setUser(me.data.data);

                navigate("/dashboard");
            } catch (error) {
                console.error(error);
                // navigate("/login");
            }
        };

        login();
    }, [navigate, setUser, token]);

    // ⛔ derived state → langsung return UI
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">
                    SSO token tidak ditemukan
                </p>
            </div>
        );
    }



    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Logging in via SSO...</p>
        </div>
    );
}

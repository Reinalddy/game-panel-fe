import { BrowserRouter, Routes, Route } from "react-router-dom";
import SSOLogin from "../pages/SSOLogin";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sso/login" element={<SSOLogin />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

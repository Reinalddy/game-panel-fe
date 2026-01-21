import api from "./axios";

export const getPlugins = (params: {
    search?: string;
    page?: number;
}) =>
    api.get("/user/game/plugins", { params });

export const installPlugin = (id: number) =>
    api.post(`/user/game/plugins/${id}/install`);

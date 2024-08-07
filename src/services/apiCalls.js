import { toast } from "sonner";
import { api } from "./api.js";
import { store } from "../Context/store";
import { logout } from "../Context/authSlice.js";

export const apiCall = async (method, url, data) => {
    return await new Promise(async (resolve, reject) => {
        try {
            let response, error;

            if (method === "post") {
                response = await api.post(url, data).catch((err) => {
                    error = err;
                });
            } else if (method === "get") {
                response = await api.get(url).catch((err) => {
                    error = err;
                });
            } else if (method === "patch") {
                response = await api.patch(url, data).catch((err) => {
                    error = err;
                });
            } else if (method === "delete") {
                response = await api.delete(url).catch((err) => {
                    error = err;
                });
            } else if (method === "put") {
                response = await api.put(url, data).catch((err) => {
                    error = err;
                });
            }

            if (response) {
                resolve(response);
            } else if (error) {
                if (error?.response?.status == 401) {
                    toast.error("User is blocked");
                    store.dispatch(logout(null));
                    return;
                }

                reject(error?.response?.data);
            }
        } catch (err) {
            reject(err.response.data);
        }
    });
};
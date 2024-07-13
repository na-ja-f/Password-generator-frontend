import { apiCall } from "./apiCalls";
import { userUrls } from "./endPoints";

export const postRegister = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.register, userData)
                .then((response) => {
                    resolve(response);
                    console.log(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};

export const postLogin = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.login, userData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};

export const savePassword = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.save, userData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};

export const deletePassword = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.delete, userData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};
import axios from "axios";
axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Token ${localStorage.getItem(
            "idToken"
        )}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const authAxios = axios.create({
    headers: {
        Authorization: `Token ${localStorage.getItem("idToken")}`,
    },
});

export const getUsers = async () => {
    const url = `http://localhost/react-app/tpapp/api/user/`
    try {
        const response = await authAxios.get(url)
        return (response && response.data) || null;
    } catch (err) {
        return null;
    }
}
export const updateUser = async (form) => {
    const url = `http://localhost/react-app/tpapp/api/userupdate/`

    try {
        const response = await authAxios.put(url, form)
        return (response && response.data) || null;
    } catch (err) {
        return null;
    }
}
export const deleteUser = async (id) => {
    const url = `http://localhost/react-app/tpapp/api/userdelete/${id}`

    try {
        const response = await authAxios.delete(url)
        return (response && response.data) || null;
    } catch (err) {
        return null;
    }
}
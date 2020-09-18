import axios from "axios";

export const signupForm = async (form) => {
    const url = `http://localhost/react-app/tpapp/api/register/`

    try {
        const response = await axios.post(url, form)
        return (response && response.data) || null;
    } catch (err) {
        return null;
    }
    // // return {
    // //     "data": {
    // //         "email": "invalid email"
    // //     },
    // //     "status": false
    // // }
    // return {
    //     "data": "token",
    //     "status": true
    // }
}
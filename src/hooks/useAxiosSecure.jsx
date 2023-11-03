import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})

const useAxiosSecure = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, err => {
        if (err.response.status === 401 || err.response.status === 401) {
            logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err));
        }
    })

    return axiosSecure;
};

export default useAxiosSecure;
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { onChecking, onLogin, onLogout } from "../store";
import { cafeApi } from "../services";

export const useAuthStore = () => {
    const { status, user, errorMessage, statusStudent } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }: { email: string, password: string }) => {
        dispatch(onChecking());
        try {
            const { data } = await cafeApi.post('/auth', { email, password });
            console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            localStorage.setItem('data', JSON.stringify(data.user))
            dispatch(onLogin(data.user));
        } catch (error: any) {
            dispatch(onLogout());
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            const data = JSON.parse(localStorage.getItem('data')!)
            console.log(data)
            return dispatch(onLogin(data));
        } else {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        // dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        status,
        user,
        statusStudent,

        //* Métodos
        startLogin,
        checkAuthToken,
        startLogout,
    }

}

import { persistor } from "../store/store";
import { sair } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useDeslogar = () => {
    const dispatch = useDispatch();
    const navegar = useNavigate();

    return () => {
        dispatch(sair());
        persistor.purge();
        localStorage.removeItem("date");
        localStorage.removeItem("start");
        localStorage.removeItem("end");
        navegar("/login");
    };
};
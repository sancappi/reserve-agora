import React from "react";
import { useDispatch } from "react-redux";
import { sair } from "../features/auth/authSlice";
import {persistor} from ".././store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/entrar";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navegar = useNavigate();

    const sairConta = async () => {
        const analisar = await logout();
        
        if(analisar) {
            dispatch(sair());
            persistor.purge();
            localStorage.removeItem("date");
            localStorage.removeItem("start");
            localStorage.removeItem("end");
            navegar("/entrar");
        }      
    };
    
    return (
        <div className="bg-[rgba(27,119,191,1)] h-[10vh] flex items-center justify-end text-white">
            <button onClick={sairConta} type="button" className="bg-[rgba(27,119,191,1)] rounded-md m-4
                border-2 border-white pl-8 pr-8 sm:pt-2 sm:pb-2 cursor-pointer transition-transform active:scale-95 sm-h:m-2">
                Sair</button>
        </div>
    )
};

export default Header;
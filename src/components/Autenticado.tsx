import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import { RootState } from "../store/store";

const Autenticado: React.FC = () => {
    const autenticado = useSelector((state: RootState) => state.autenticar.autenticado);
    return autenticado? <Outlet/>: <Navigate to="/login" replace/>;
};

export default Autenticado;
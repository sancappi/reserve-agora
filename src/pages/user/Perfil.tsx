import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {faUser, faTrash, faPen, faCalendarCheck, faAddressBook, faClipboard} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";

const Perfil: React.FC = () => {
    const [usuarioState, setUsuario] = useState(true); 
    const usuario = useSelector((state: RootState) => state.autenticar.tipoPerfil);
    const navegar = useNavigate();
    
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const redirecionar = () => {
            navegar("/perfil");
        };
        window.addEventListener("popstate", redirecionar);
    }, []);

    useEffect(() => {
        if(usuario === "gestor") {
            setUsuario(false);
        }
    });

    return (
        <div className="h-screen white">
            <Header/>
            <main className="h-[80vh] flex flex-col">
                <div className=" w-[90%] sm:w-auto sm-h:h-auto m-0 m-auto p-2 relative pt-[1.25em]
                    pb-[1.25em] grid grid-rows-2 grid-cols-2 gap-3 items-center justify-center">
                    
                    <NavLink to="/atualizar" className=" bg-[rgba(27,119,191,1)] text-white h-44 w-full sm:w-64 sm-h:h-36  rounded-md flex flex-col justify-center 
                        gap-8 p-2 cursor-pointer shadow-lg transition-transform transform active:scale-95">
                        <div className=" flex p-2 items-center justify-center">
                            <FontAwesomeIcon icon={faPen} className="text-3xl sm:text-4xl"/>
                        </div>
                        <p className="sm:text-xl text-center">
                            Atualizar dados
                        </p>
                    </NavLink>
                    
                    <NavLink to="/deletar" className="bg-[rgba(27,119,191,1)] text-white h-44 w-full 
                        sm:w-64 sm-h:h-36 rounded-md flex flex-col justify-center items-center
                        gap-8 p-2 cursor-pointer shadow-lg transition-transform transform active:scale-95">
                        <div className=" flex p-2 items-center justify-center">
                            <FontAwesomeIcon icon={faTrash} className="text-3xl sm:text-4xl"/>
                        </div>
                        <p className="sm:text-xl text-center">
                            Deletar conta
                        </p>
                    </NavLink>

                    {usuarioState? (
                        <NavLink to="/reservar" className="bg-[rgba(27,119,191,1)] text-white h-44 w-full sm:w-64 sm-h:h-36  rounded-md flex flex-col justify-center 
                            gap-8 p-2 cursor-pointer shadow-lg transition-transform transform active:scale-95">
                            <div className=" flex p-2 items-center justify-center">
                                <FontAwesomeIcon icon={faCalendarCheck} className="text-3xl sm:text-4xl"/>
                            </div>
                            <p className="sm:text-xl text-center">
                                Reservar sala
                            </p>
                        </NavLink>
                        ) : (
                        <NavLink to="/salas" className="bg-[rgba(27,119,191,1)] text-white h-44 w-full sm:w-64  sm-h:h-36  rounded-md 
                            flex flex-col justify-center gap-8 p-2 cursor-pointer shadow-lg transition-transform transform active:scale-95">
                            <div className="flex p-2 items-center justify-center">
                                <FontAwesomeIcon icon={faAddressBook} className="text-3xl sm:text-4xl"/>
                            </div>
                            <p className="sm:text-xl text-center">
                                Gerir salas
                            </p>
                        </NavLink>
                    )}

                    {usuarioState? (
                        <NavLink to="/reservas" className="bg-[rgba(27,119,191,1)] text-white h-44 w-full sm:w-64 sm-h:h-36  rounded-md flex flex-col justify-center 
                            gap-4 p-2 cursor-pointer shadow-lg transition-transform transform active:scale-95">
                            <div className=" flex p-2 items-center justify-center">
                                <FontAwesomeIcon icon={faClipboard} className="text-3xl sm:text-4xl"/>
                            </div>
                            <p className="sm:text-xl text-center">
                                Minhas reservas
                            </p>
                        </NavLink>
                    ) : (
                        <NavLink to="/clientes" className="bg-[rgba(27,119,191,1)] text-white h-44 w-full sm:w-64 sm-h:h-36 rounded-md flex flex-col justify-center 
                            gap-4 p-2 cursor-pointer shadow-lg transition-transform transform active:scale-95">
                            <div className=" flex p-2 items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="text-3xl sm:text-4xl"/>
                            </div>
                            <p className="sm:text-xl text-center">
                                Gerir clientes
                            </p>
                        </NavLink>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    )
};

export default Perfil;
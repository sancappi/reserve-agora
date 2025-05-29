import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
import Voltar from "../../components/Voltar";

const Salas: React.FC = () => {
    return (
        <div>
            <Header/>
            <Voltar/>
            <main className="h-[80vh] flex flex-col items-center">
                <div className="mt-20 sm-h:mt-[4%] p-2 sm-h:p-1 bg-white text-xl shadow-md">
                    <h1>Gerencie suas salas</h1>
                </div>
                <div className="h-[60%] mt-[8%] sm:mt-[2%] sm-h:mt-[6%] w-[80%] max-w-[600px] flex flex-col justify-center items-center gap-4">
                    <div className="w-full bg-[rgba(27,119,191,1)] text-white  
                        text-center font-bold rounded p-4 sm-h:p-2 ">
                        <NavLink to="/disponibilizar">
                            <p>Disponibilizar salas</p>
                        </NavLink>
                    </div>
                    <div className="w-full bg-[rgba(27,119,191,1)] text-white  
                        text-center font-bold rounded p-4 sm-h:p-2">
                        <NavLink to="/disponibilizadas">
                            <p>Ver salas disponibilizadas</p>
                        </NavLink>
                    </div>
                    <div className="w-full bg-[rgba(27,119,191,1)] text-white  
                        text-center font-bold rounded p-4 sm-h:p-2">
                        <NavLink to="/reservar">
                            <p>Reservar salas</p>
                        </NavLink>
                    </div>
                    <div className="w-full bg-[rgba(27,119,191,1)] text-white  
                        text-center font-bold rounded p-4 sm-h:p-2">
                        <NavLink to="/reservas">
                            <p>Ver minhas reservas</p>
                        </NavLink>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Salas;
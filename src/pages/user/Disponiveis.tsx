import React, {useEffect, useState} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCalendar, faFilter, faUser, faCheck, faEye, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import escritorio from "../../assets/escritorio.jpg";
import ConfirmarReserva from "../../components/ConfirmarReserva";
import Filter from "../../components/Filter";
import { Sala } from "../../services/gestao";
import { useNavigate } from "react-router-dom";

interface Atualizar {
    _id: string;
    titulo: string;
};

const Disponiveis: React.FC = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [filter, setFilter] = useState<boolean>(false);
    const localizacao = useLocation();
    const date = localStorage.getItem("date");
    const start = localStorage.getItem("start");
    const end = localStorage.getItem("end");
    const dados: [Sala] = localizacao.state?.data || [];
    const [salasOriginais] = useState<Sala[]>(dados);
    const [salas, setSalas] = useState<Sala[]>(dados);
    const [selecionada, setSelecionada] = useState<Atualizar | null>(null);
    const navegar = useNavigate();

    useEffect(() => {
        setSalas(dados);
    }, [dados]);
    
    const retornar = () => {
        navegar("/reservar");
    };

    const alterarModal = (sala: Atualizar) => {
        setSelecionada({_id: sala._id, titulo: sala.titulo});
        setModal(!modal);
    };
    const alterarModalFilter = () => {
        setFilter(!filter);
    } ;

    return (
        <div>
            <Header/>
            <div className="absolute h-[10vh] top-0 flex ml-4">
                <button onClick={retornar} className="">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-3xl text-white"/>
                </button>
            </div>      
            <main className="w-full h-[80vh] flex flex-col items-center overflow-y-scroll">
                <div className="max-w-[800px] rounded h-[20%] w-full flex m-4 justify-center items-center">
                    <div className=" bg-gray-100 rounded w-[80%] sm:w-[96%] flex gap-2">
                        <div className=" flex p-2 w-[80%]">
                            <div className="flex items-center justify-center ml-2 text-gray-500 text-2xl">
                                <FontAwesomeIcon icon={faCalendar}/>
                                <div className="ml-2 text-sm text-black">
                                    <p>{`Data: ${date}`}</p>
                                    <p>{`Intervalo: ${start} - ${end}`}</p>
                                </div>
                            </div>
                            <div className=" ml-4 flex justify-center items-center ">
                                <NavLink to="/reservar" className="text-white 
                                    flex justify-center items-center text-xl w-10 h-12  
                                     rounded-md bg-[rgba(27,119,191,1)]">
                                    <FontAwesomeIcon icon={faPen} className=""/>
                                </NavLink>
                            </div>   
                        </div>
                        <div className=" w-flex w-[20%] flex justify-center items-center">
                            <button onClick={alterarModalFilter} className=" p-3 bg-[rgba(27,119,191,1)] rounded-md
                                flex justify-center items-center text-2xl text-white">
                                <FontAwesomeIcon icon={faFilter}/>
                            </button>
                            {filter && <Filter onFuncaoModal={alterarModalFilter} salasFiltrar={setSalas} salas={salasOriginais}/>}
                        </div>
                    </div>
                </div>
                {salas.length > 0? (
                    <div className="mt-4 mb-4 w-full flex flex-col items-center max-w-[800px]">
                        {salas.map((sala, index) => (
                            <div key={index} className="w-[96%] bg-blue-100 text-sm sm:text-md h-[160px] rounded-md flex p-2 grid grid-cols-3 gap-1
                                m-2 shadow" onClick={() => alterarModal(sala)} role="pointer" tabIndex={0}>
                                <div className="relative bg-white col-span-1 overflow-hidden m-0 min-w-[80px] rounded">
                                    <img src={sala.foto? sala.foto : escritorio} className="w-[100%] h-[100%] object-cover absolute top-0 left-0 m-0 p-0"/>
                                </div>
                                <div className="col-span-2 h-[140px]">
                                    <h3 className="font-bold">
                                        {sala.titulo}
                                    </h3>
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faUser}/>
                                        <p>{sala.capacidade}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faCheck}/>
                                        <p>{sala.recursos.join(", ")}</p>
                                    </div>
                                    <div className="flex gap-2 items-center ">
                                        <FontAwesomeIcon icon={faEye}/>
                                        <p className="break-all">{sala.observacoes}</p>
                                    </div>
                                </div>
                                {modal && selecionada && <ConfirmarReserva onFuncaoModal={() => setModal(false)} id={selecionada._id} titulo={selecionada.titulo} salasAtualizar={setSalas}/>}
                            </div>                             
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <p>
                            Não existem salas disponíveis neste período.
                        </p>
                    </div>
                )}
                
            </main>
            <Footer/>
        </div>
    )
};

export default Disponiveis;
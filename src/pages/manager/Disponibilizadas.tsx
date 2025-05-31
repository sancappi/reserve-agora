import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { disponibilizadas } from "../../services/gestao";
import { Sala } from "../../services/gestao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck, faClock, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import escritorio from "../../assets/escritorio.jpg";
import { NavLink } from "react-router-dom";
import ExcluirSala from "../../components/ExcluirSala";
import ParaSalas from "../../components/ParaSalas";
import Espera from "../../components/Espera";
import { useDeslogar } from "../../hook/deslogar";

const Disponibilizadas: React.FC = () => {
    const [salas, setSalas] = useState<Sala[]>([]);
    const [excluir, setExcluir] = useState<boolean>(false);
    const [esperar, setEspera] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const deslogar = useDeslogar();

    useEffect(()=> {
        const verSalas = async () => {
            setEspera(true);
            const recebidas = await disponibilizadas();
            if(recebidas === 2) {
                deslogar();
            } else if(recebidas === -1) {
                setEspera(false);
                setMensagem("Erro interno do servidor. Tente novamente mais tarde.");
            } else {
                setTimeout(() => {
                    setEspera(false);
                    setSalas(recebidas);
                }, 5000);
            }
        };
        verSalas();
    }, []);

    const mudarModal = () => {
        setExcluir(!excluir);
    }

    return (
        <div>
            <Header/>
            <ParaSalas/>
            <div>
                {esperar && <Espera/>}
            </div>
            <main className="w-full h-[80vh] flex flex-col items-center overflow-y-scroll">
                    <div className="w-full flex justify-center mt-2">
                        <h1 className="p-3 m-2 border-2 shadow-md  rounded-md">
                            Salas disponibilizadas
                        </h1>
                    </div>
                    {salas.length > 0 ? (
                        <div className="mt-4 mb-4 w-full flex flex-col items-center max-w-[800px]">
                            {salas.map((sala, index)=> (
                                <div key={index} className="w-[96%] bg-blue-100 text-sm sm:text-md h-[160px] rounded-md flex p-2 grid grid-cols-3 gap-1
                                m-2" role="pointer" tabIndex={0}>
                                    <div className="relative bg-white col-span-1 overflow-hidden m-0 min-w-[80px] rounded">
                                        <img src={sala.foto? sala.foto : escritorio} className="w-[100%] h-[100%] object-cover absolute top-0 left-0 m-0 p-0"/>
                                    </div>
                                    <div className="col-span-2 ">
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
                                        <div className="flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faClock}/>
                                            <p>{`${sala.abertura} - ${sala.fechamento}`}</p>
                                        </div>
                                        <div className="flex justify-end gap-4 text-[rgba(27,119,191,1)] text-2xl">
                                            <NavLink to={`/editar/${sala._id}`} className="">
                                                <FontAwesomeIcon icon={faPen}/>
                                            </NavLink>
                                            <button type="button" onClick={mudarModal}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                            {excluir && <ExcluirSala modal={mudarModal} id={sala._id} atualizar={setSalas}/>}
                                        </div>
                                </div>
                            </div> 
                            ))}
                        </div>
                    ) : (
                        <div className="">
                            <p>Não há salas disponibilizadas.</p>
                        </div>
                    )}
                    <p className="h-0 mt-2 text-sm -text-red-600">{mensagem}</p>
            </main>
            <Footer/>
        </div>
    )
}

export default Disponibilizadas;
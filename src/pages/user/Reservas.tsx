import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { reservas } from "../../services/usuario";
import { Sala } from "../../services/gestao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck, faEye, faClock, faTrash, faCalendar } from "@fortawesome/free-solid-svg-icons";
import escritorio from "../../assets/escritorio.jpg";
import Retornar from "../../components/Retornar";
import { useDeslogar } from "../../hook/deslogar";
import Espera from "../../components/Espera";
import ExcluirReserva from "./ExcluirReserva";
import { Reserva } from "../../services/usuario";

const Reservas: React.FC = () => {
    const [minhasReservas, setReservas] = useState<Reserva[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]);
    const [espera, setEspera] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>();
    const [mExcluir, setExcluir] = useState<boolean>(false);
    const deslogar = useDeslogar();

    useEffect(() => {
        const verSalas = async () => {
            setEspera(true);
            const recebidas = await reservas();    
            if (recebidas === 2) {
                deslogar();
            } else if (recebidas === -1) {
                setEspera(false);
                setMensagem("Erro interno do servidor.");
            } else {
                setReservas(recebidas.r || []);
                setSalas(recebidas.s || []);
                setTimeout(() => {
                    setEspera(false);
                }, 5000);                
            }
        };
        verSalas();
    }, []);

    const excluir = () => {
        setExcluir(!mExcluir);
    };
    
    return (
        <div>
            <Header/>
            <Retornar/>
            {espera && <Espera/>}
            <main className="w-full h-[80vh] flex flex-col items-center overflow-y-scroll">
                <div className="w-full flex justify-center mt-2">
                    <h1 className="p-3 m-2 border-2 shadow-md  rounded-md">
                        Minhas reservas
                    </h1>
                </div>
                {minhasReservas.length !== 0 ? (
                    <div className=" mt-4 mb-4 w-full flex flex-col items-center max-w-[800px] h-full">
                        {minhasReservas.map((reserva, index) => {
                            const a = salas.find(s => s._id === reserva.sala._id);
                            return (
                                <div key={index} className="w-[96%] bg-blue-100 text-sm sm:text-md h-[170px] rounded-md flex p-2 grid grid-cols-3 gap-1
                                    m-2" role="pointer" tabIndex={0}>
                                    <div className="relative bg-white col-span-1 overflow-hidden m-0 min-w-[80px] rounded">
                                        <img src={a?.foto? a.foto: escritorio} className="w-[100%] h-[100%] object-cover absolute top-0 left-0 m-0 p-0"/> 
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="font-bold">{a?.titulo}</h3>
                                        <div className="flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faCalendar}/>
                                            <p>{reserva.data}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faClock}/>
                                            <p>{`${reserva.inicio} - ${reserva.fim}`}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faUser}/>
                                            <p>{a?.capacidade}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faCheck}/>
                                            <p>{a?.recursos.join(", ")}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faEye}/>
                                            <p>{a?.observacoes}</p>
                                        </div>
                                        <div className="flex justify-end gap-4 text-[rgba(27,119,191,1)] text-2xl">
                                            <button onClick={excluir}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </div>
                                        {mExcluir && <ExcluirReserva onExcluir={excluir} id={reserva._id} atualizar={setReservas}/> }
                                    </div>
                                </div> 
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p>Não há reservas no momento.</p>
                    </div>
                )}
            <p className="text-red-500">{mensagem}</p>
            </main>
            <Footer/>
        </div>
    );
};

export default Reservas;
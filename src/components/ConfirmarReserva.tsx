import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { salvarReserva } from "../services/usuario";
import { useDeslogar } from "../hook/deslogar";
import Espera from "./Espera";
import { Sala } from "../services/gestao";

interface Confirmado  {
    onFuncaoModal: () => void;
    id: string;
    titulo: string;
    salasAtualizar: React.Dispatch<React.SetStateAction<Sala[]>>;
};

export interface CriarReserva {
    id?: string;
    sala: string;
    data: string | null;
    inicio: string | null;
    fim: string | null;
};

const ConfirmarReserva: React.FC<Confirmado> = ({onFuncaoModal, id, titulo, salasAtualizar}) => {
    const date = localStorage.getItem("date");
    const start = localStorage.getItem("start");
    const end = localStorage.getItem("end");
    const deslogar = useDeslogar();
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const [espera, setEspera] = useState<boolean>(false);

    const cancelar = async() => {
        onFuncaoModal();
    };
    const confirmar = async() => {
        setEspera(true);
        const reserva: CriarReserva = {
            sala: id,
            data: date,
            inicio: start,
            fim: end,
       };

       const res = await salvarReserva(reserva);
       if(res === 2) {
            deslogar();
       } else if(res === 0) {
            setTimeout(() => {
                setEspera(false);
                setMensagem({estilo: "text-center text-red-400", texto: "A sala já foi reservada."});
                setTimeout(() => {
                    salasAtualizar((originais: Sala[]) => originais.filter((s: Sala) => s._id !== id));
                }, 3000);
        }, 5000);
       } else if(res === 1) {
            setTimeout(() => {
                setEspera(false);
                setMensagem({estilo: "text-center text-green-400", texto: "Sala reservada com sucesso!"});
                setTimeout(() => {
                    salasAtualizar((originais: Sala[]) => originais.filter((s: Sala) => s._id !== id));
                }, 4000);
            }, 5000);
       } else {
        setEspera(false);
        setMensagem({estilo: "text-center text-red-400", texto: "Erro interno do servidor."});
       }
    };

    return (
        <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 bg-black/20 z-50 flex justify-center items-center">
            <div>{espera && <Espera/>}</div>
            <div className="bg-white flex flex-col gap-2 w-[80%] max-w-[300px] h-[280px] rounded-md p-4">
                <div className="flex justify-end text-xl sm:text-2xl text-[rgba(27,119,191,1)]">
                    <button onClick={onFuncaoModal} className="p-2">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>
                <div className="flex flex-col pt-2 pb-4 mb-8 ml-10">
                    <p className="font-bold ">{titulo}</p>
                    <p>{`Data: ${date}`}</p>
                    <p>{`Intervalo: ${start} - ${end}`}</p>
                </div>
                <div className="flex justify-center gap-6">
                    <button className="bg-[rgba(27,119,191,1)] text-white text-sm p-1 rounded-md" onClick={confirmar}>Confirmar reserva</button>
                    <button className="bg-[rgba(27,119,191,1)] text-white text-sm p-2 rounded-md" onClick={cancelar}>Cancelar</button>
                </div>
                <p className={mensagem.estilo}>{mensagem.texto}</p>
            </div>
        </div>
    );
};

export default ConfirmarReserva;
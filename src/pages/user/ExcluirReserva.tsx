import React, {useState} from "react";
import { excluirReserva, Reserva } from "../../services/usuario";
import { useDeslogar } from "../../hook/deslogar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Espera from "../../components/Espera";

interface Excluir {
    onExcluir: () => void;
    id: string;
    atualizar: React.Dispatch<React.SetStateAction<Reserva[]>>;
};

const ExcluirReserva:React.FC<Excluir>= ({onExcluir, id, atualizar}) => {
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const [esperar, setEsperar] = useState<boolean>(false);
    const deslogar = useDeslogar();

    const excluirR = async (id: string) => {
        setEsperar(true);
        const res = await excluirReserva(id);
        if(res === 2) {
            deslogar();
        } else if(res === 0) {
            setTimeout(() => {
                setEsperar(false);
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Reserva não encontrada." });
            }, 5000);
        } else if(res === -1) {
            setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
        } else {
            setTimeout(() => {
                setEsperar(false); 
                setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Reserva excluída!" });               
                setTimeout(() => {
                    atualizar((reservas: Reserva[]) => reservas.filter((reserva: Reserva) => reserva._id !== id));
                }, 3000);
            }, 5000);
            setMensagem({estilo: "", texto: ""});
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white flex flex-col gap-2 w-[80%] max-w-[300px] h-[280px] rounded-md p-4">
                <div className="w-full flex justify-end text-xl sm:text-2xl text-[rgba(27,119,191,1)]">
                    <button onClick={onExcluir} className="p-2">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center text-black text-xl h-full">
                    <p className="mb-2">Confirme a exclusão da sala.</p>
                    <button onClick={() => excluirR(id)} className="text-sm p-2 rounded-md text-white font-bold
                    bg-[rgba(27,119,191,1)]">Confirmar</button>
                </div> 
                <p className={mensagem.estilo}>{mensagem.texto}</p>
                <div>
                    {esperar && <Espera/>}
                </div> 
            </div>
        </div>
    );
};

export default ExcluirReserva;
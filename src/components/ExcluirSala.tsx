import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { excluir, Sala } from "../services/gestao";
import { useDeslogar } from "../hook/deslogar";
import Espera from "./Espera";

interface Modal {
    modal: () => void;
    id: string | undefined;
    atualizar: React.Dispatch<React.SetStateAction<Sala[]>>;
}

const ExcluirSala: React.FC<Modal> = ({modal, id, atualizar}) => {
    const [esperar, setEspera] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const deslogar = useDeslogar();

    const excluirSala = async (id: any) => {
        setEspera(true);
        const res = await excluir(id);
        if(res === 2) {
            deslogar();
        } else if(res === 0) {
            setTimeout(() => {
                setEspera(false);
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Sala não encontrada." });
            }, 5000);
        } else if(res === 1) {
            setTimeout(() => {
                setEspera(false); 
                setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Sala excluída!" });               
                setTimeout(() => {
                    atualizar((salas) => salas.filter((s) => s._id !== id));
                }, 3000);
            }, 5000);
            setMensagem({estilo: "", texto: ""});
        }
    } ;
    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white flex flex-col gap-2 w-[80%] max-w-[300px] h-[280px] rounded-md p-4">
                <div className="w-full flex justify-end text-xl sm:text-2xl text-[rgba(27,119,191,1)]">
                    <button onClick={modal} className="p-2">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center text-black text-xl h-full">
                    <p className="mb-2">Confirme a exclusão da sala.</p>
                    <button onClick={() => excluirSala(id)} className="text-sm p-2 rounded-md text-white font-bold
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

export default ExcluirSala;
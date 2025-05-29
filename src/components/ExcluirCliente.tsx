import React, {useState} from "react";
import { Cliente } from "../services/gestao";
import Espera from "./Espera";
import { useDeslogar } from "../hook/deslogar";
import { excluirCliente } from "../services/gestao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface Excluir {
    excluir: () => void;
    id: string;
    pExcluirCliente: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

const ExcluirCliente: React.FC<Excluir> = ({excluir, id, pExcluirCliente}) => {
    const [espera, setEsperar] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const deslogar= useDeslogar();

    const excluirC = async(id: string) => {
        setEsperar(true);
        const res = await excluirCliente(id);
        if(res === 2) {
            deslogar();
        } else if(res === 0) {
            setTimeout(() => {
                setEsperar(false);
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Cliente não encontrado." });
            }, 5000);
        } else if(res === 1) {
            setTimeout(() => {
                setEsperar(false); 
                setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Cliente excluído!" });               
                setTimeout(() => {
                    pExcluirCliente(clientes => clientes.filter((c) => c._id !== id));
                }, 3000);
            }, 5000);
            setMensagem({estilo: "", texto: ""});
        } else {
            setEsperar(false);
            setMensagem({estilo: "text-red-600 h-0 text-sm", texto: "Erro interno do servidor. Tente novamente mais tarde."});
        }
    };

    return (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-center">
            <div className="bg-white flex flex-col gap-2 w-[80%] max-w-[360px] h-[260px] rounded-md p-4">
                <div className="w-full flex justify-end text-xl sm:text-2xl text-[rgba(27,119,191,1)]">
                    <button onClick={excluir} className="p-2">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center text-black text-xl h-full">
                    <p className="mb-2">Confirme a exclusão do cliente.</p>
                    <button onClick={() => excluirC(id)} className="text-sm p-2 rounded-md text-white font-bold
                    bg-[rgba(27,119,191,1)]">Confirmar</button>
                </div> 
                <p className={mensagem.estilo}>{mensagem.texto}</p>
                <div>
                    {espera && <Espera/>}
                </div> 
            </div>
        </div>
    );
};

export default ExcluirCliente;
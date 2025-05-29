import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck } from "@fortawesome/free-solid-svg-icons";

interface Cadastrado {
    confirmar: () => void;
};

const ConfirmarCadastro: React.FC<Cadastrado> =({confirmar}) => {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center 
            items-center">
            <div className="bg-white flex flex-col w-[80%] max-w-[300px] h-[280px] rounded-md p-4">
                <div className="flex justify-end text-xl sm:text-2xl text-[rgba(27,119,191,1)]">
                    <button onClick={confirmar} className="p-2">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center text-center h-full">
                    <p>Usuário cadastrado com sucesso!</p>
                    <FontAwesomeIcon icon={faCheck} className="text-green-400 text-2xl"/>
                </div>
            </div>
        </div>
    );
};
export default ConfirmarCadastro;
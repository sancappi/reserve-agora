import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import { useDeslogar } from "../hook/deslogar";
import { Senha } from "../services/usuario";
import { atualizarSenha } from "../services/usuario";

interface Dados {
    senha: () => void;
}

const AlterarSenha: React.FC<Dados> = ({senha}) => {
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const {register, handleSubmit,formState: {errors}, watch, setError, reset} = useForm<Senha>({mode: "onBlur", reValidateMode: "onBlur"});
    const [ver, setVer] = useState<boolean>(false);
    const deslogar = useDeslogar();

    const alterar = () => {
        setVer(!ver);
    };

    const atualizar = async (dados: Senha) => {
        const res = await atualizarSenha(dados);
        if(res === 0) {
            setError("root", {
                type: "manual",
                message: "Senha atual está errads"
            });
        } else if(res === 2) {
            deslogar();
        } else if(res === 1){
            setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Senha atualizada com sucesso!" });
            setTimeout(() => {
                reset();
                setMensagem({estilo:"", texto: "" });

            }, 3000);
        } else {
            setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center 
            items-center">
            <div className="bg-white p-4 rounded-md w-[90%] max-w-[400px] h-[21em]">
                <div className="flex justify-end">
                    <button onClick={senha} className="p-2 text-xl text-[rgba(27,119,191,1)]">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>
                <form onSubmit={handleSubmit(atualizar)} noValidate className="flex flex-col">
                    <div className="flex flex-col justify-between">
                        <div className="mb-6 relative">
                            <nav onClick={alterar} className="cursor-pointer absolute top-[30%] right-[10px] 
                                text-[rgba(27,119,191,1)] text-md">
                                {ver? (<FontAwesomeIcon icon={faEyeSlash}/>) : (<FontAwesomeIcon icon={faEye}/>)}
                            </nav>
                            <input type={ver? "text" : "password"}
                            placeholder="Senha atual"
                            className="w-full p-2 border-2 border-gray-400  rounded-md
                                bg-gray-200 focus:ring-1 outline-none"
                                {...register("atual", {
                                    required: "Senha atual",
                                })}/>
                            {errors.atual && <p className="h-0 text-sm text-red-600">{errors.atual.message}</p>}
                        </div>
                        <div className="mb-6">
                            <input type={ver? "text" : "password"}
                                placeholder="Nova senha"
                                className="w-full p-2 border-2 border-gray-400 rounded-md bg-gray-200 focus:ring-1 outline-none"
                                {...register("nova", {
                                    required: "Nova senha",
                                    minLength: {
                                        value: 4,
                                        message: "Mínimo 4 caracteres"
                                    }
                                })}/>
                            {errors.nova && <p className="h-0 text-sm text-red-600">{errors.nova.message}</p>}
                        </div>
                        <div className="mb-6">
                            <input type={ver? "text" : "password"}
                            placeholder="Confirme a nova senha"
                            className="w-full p-2 border-2 border-gray-400 rounded-md
                                bg-gray-200 focus:ring-1 outline-none"
                                {...register("confirmacao", {
                                    required: "Confirme a nova senha",
                                    validate: (v) => v === watch("nova") || "As senhas não correspondem"
                                })}
                            />
                            {errors.confirmacao && <p className="h-0 text-sm text-red-600">{errors.confirmacao.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className="w-full p-2 rounded-md text-white font-bold
                        bg-[rgba(27,119,191,1)]">Salvar</button>
                    {errors.root && <p className="h-0 text-sm text-red-600">{errors.root.message}</p>}
                    {<p className={mensagem.estilo}>{mensagem.texto}</p>}
                </form>
            </div>
        </div>
    );
};

export default AlterarSenha;
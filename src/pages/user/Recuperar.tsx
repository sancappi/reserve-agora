import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { recuperarSenha } from "../../services/usuario";
import { NavLink } from "react-router-dom";
import { Recuperar } from "../../services/usuario";
import Espera from "../../components/Espera";

export interface Senhas {
    nova: string;
    confirmacao: string;
};

const RecuperarSenha: React.FC = () => {
    const [ver, setVer] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm<Senhas>({mode: "onBlur", reValidateMode: "onBlur"});
    const [espera, setEspera] = useState<boolean>(false);

    const recuperar = async(dados: Senhas) => {
        const url = new URLSearchParams(window.location.search);
        const token = String(url.get("token"));
        setEspera(true);
        const novos:Recuperar = {senha: dados.nova, token: token}
        const retorno = await recuperarSenha(novos);

        if(retorno === 0) {
            setEspera(false);
            setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Token de recuperação expirado. Tente novamente. "});
            reset();
        } else if(retorno === -1) {
            setEspera(false);
            setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
            reset();
        }  else { 
            setEspera(false);
            setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Senha atualizada!" });
            reset();
        }
        setTimeout(() => {
            setMensagem({estilo:"", texto: ""});
        }, 5000);
    };

    const alterar = () => {
        setVer(!ver);
    }
    
    return (
        <div className="">
            {espera && <Espera/>}
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <form onSubmit={handleSubmit(recuperar)} noValidate className="flex flex-col sm-h:w-[400px] sm-h:h-[400px] 
                    sm-h:border-none w-full max-w-[30em] h-[20em] 
                    sm:border-2 sm:border-gray-300 rounded-md p-4 pt-6 sm-h:pt-1 sm-h:p-3 pb-6">
                    <div className="h-[80%] sm:pl-2 sm:pr-2 flex flex-col justify-center mb-4">
                        <div className="mb-6 relative">
                            <nav onClick={alterar} className="cursor-pointer absolute top-[22%] right-[10px] 
                                text-[rgba(27,119,191,1)] text-md">
                                {ver? (<FontAwesomeIcon icon={faEyeSlash}/>) : (<FontAwesomeIcon icon={faEye}/>)}
                            </nav>
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
                </form>
                <div>
                    <p className={mensagem.estilo}>{mensagem.texto}</p>
                </div>
               
                <div className="flex justify-center text-sm mt-3 
                    p-2 font-bold text-[rgba(27,119,191,1)]">
                    <NavLink to="/login">
                        Clique aqui para fazer login.
                    </NavLink>
                </div>
            </div>
        </div>
    )
};

export default RecuperarSenha;
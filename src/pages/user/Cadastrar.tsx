import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import { Usuario } from "../../services/usuario";
import { cadastrar } from "../../services/usuario";
import { NavLink } from "react-router-dom";
import ConfirmarCadastro from "../../components/ConfirmarCadastro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export interface Retorno {
    mensagem: string;
    estilo: boolean;
};

const Cadastrar: React.FC = () => {
    const [modalClose, setModalClose] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const [ver, setVer] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}, setValue, watch, control} = useForm<Usuario>();

    const cadastrarUsuario = async (dados: Usuario) => {
        const enviar = await cadastrar(dados);
        if(enviar === 0) {
            setTimeout(()=> {
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "E-mail já cadastrado." });
            });
        } else if(enviar === -1) {
            setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
        }  else { 
            setModalClose(true);
        }
    };

    const modal = () => {
        setModalClose(!modalClose);
        setValue("nome", "");
        setValue("email", "");
        setValue("senha", "");
        setValue("confirmarSenha", "");
    };

    const alterar = () => {
        setVer(!ver);
    };

    return (
        <div>
            <div className="flex items-center justify-center w-full h-screen">
                <form onSubmit={handleSubmit(cadastrarUsuario)} noValidate className="flex flex-col sm-h:w-[360px] 
                    sm-h:h-[400px] sm-h:border-none w-full max-w-[30em] h-[34em] 
                    sm:border-2 sm:border-gray-300 rounded-md p-6 pt-6 sm-h:pt-1 sm-h:p-3 pb-6 sm:p-4">
                        <div className="h-full flex flex-col justify-center mb-4">
                            <div className=" mb-6">
                                    <input type="text" placeholder="Seu nome completo"
                                        className="w-full p-4 border-2 border-gray-400 rounded-md
                                        bg-gray-200 focus:ring-1 outline-none "
                                    {...register("nome", {
                                        required: "Digite seu nome completo",
                                    })}/>
                                    {errors.nome && <p className="h-0 text-sm text-red-600">{errors.nome.message}</p>}
                                </div>
                                
                                <div className=" mb-6">
                                    <input type="email" placeholder="Seu e-mail"
                                    className="w-full p-4 border-2 border-gray-400 rounded-md
                                    bg-gray-200 focus:ring-1 outline-none "
                                    {...register("email", {
                                        required: "Digite seu e-mail",
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "Formato de e-mail inválido"
                                        }
                                    })}/>
                                    {errors.email && <p className="h-0 text-sm text-red-600">{errors.email.message}</p>}
                                </div>
                                <div className="mb-6 relative">
                                    <nav onClick={alterar} className="cursor-pointer absolute top-[30%] right-[10px] 
                                        text-[rgba(27,119,191,1)] text-md">
                                        {ver? (<FontAwesomeIcon icon={faEyeSlash}/>) : (<FontAwesomeIcon icon={faEye}/>)}
                                    </nav>
                                    <input type={ver? "text" : "password"} placeholder="Sua senha"
                                        className="w-full p-4 border-2 border-gray-400 rounded-md
                                    bg-gray-200 focus:ring-1 outline-none "
                                    {...register("senha", {
                                        required: "Digite sua senha",
                                        minLength: {
                                            value: 4,
                                            message: "A senha deve ter pelo menos quatro caracteres"
                                        }
                                    })}/>
                                    {errors.senha && <p className="h-0 text-sm text-red-600">{errors.senha.message}</p>}
                                </div>
                                <div className=" mb-6">
                                    <input type={ver? "text" : "password"} placeholder="Confirme sua senha"
                                    className="w-full p-4 border-2 border-gray-400 rounded-md
                                    bg-gray-200 focus:ring-1 outline-none "
                                    {...register("confirmarSenha", {
                                        required: "Confirme sua senha",
                                        validate: (v) => v === watch("senha") || "As senhas não correspondem"                                        
                                        
                                    })}/>
                                    {errors.confirmarSenha && <p className="h-0 text-sm text-red-600">{errors.confirmarSenha?.message}</p>}
                                </div>
                                <div>
                                    <Controller
                                        name="tipoPerfil" control={control}
                                        rules={{required: "Selecione uma opção"}}
                                        render={({field}) => (
                                            <select {...field} className={`cursor-pointer mb-2 
                                                border-2 rounded-md p-2 text-[rgba(27,119,191,1)]
                                                ${errors.tipoPerfil? " border-3 border-red-400" : " border-[rgba(27,119,191,1)]"}`}>
                                                <option value="">Perfil</option>
                                                <option value="cliente">Cliente</option>
                                                <option value="gestor">Gestor</option>
                                            </select>
                                        )}
                                    />
                                    <button type="submit" className="w-full p-2 mb-2 rounded-md text-white font-bold
                                        bg-[rgba(27,119,191,1)]">Cadastrar</button>
                                        <p className={mensagem.estilo}>{mensagem.texto}</p>
                                    <div className="flex justify-center text-sm mt-3 
                                        p-2 font-bold text-[rgba(27,119,191,1)]">
                                        <NavLink to="/login">
                                            Já possui uma conta? Faça login.
                                        </NavLink>
                                    </div>
                            </div>
                        </div>
                </form>
                {modalClose && <ConfirmarCadastro confirmar={modal}/>}
            </div>
        </div>
                                        
    )
};

export default Cadastrar;
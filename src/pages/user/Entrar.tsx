import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { login } from "../../services/entrar";
import { Dados } from "../../services/entrar";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sucesso } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Entrar: React.FC = () => {
    const [ver, setVer] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const dispatch = useDispatch();
    const navegar = useNavigate();
    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm<Dados>({
        defaultValues: { email: "", senha: ""}
    });

    const logar: SubmitHandler<Dados> = async (dados) => {
        const tipoPerfil = await login(dados); 
        
        if (tipoPerfil === "gestor" || tipoPerfil === "cliente") {
            dispatch(sucesso(tipoPerfil));
            navegar("/perfil");
            reset();
        } else if(tipoPerfil === 0) {
            setMensagem({estilo:"text-sm text-red-600 text-center", texto: "E-mail ou senha incorretos." });
            setValue("email", "");
            setValue("senha", "");
            setTimeout(() => {
                setMensagem({estilo:"", texto: "" });
            }, 3000);
        } else {
            setMensagem({estilo:" text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
            setValue("email", "");
            setValue("senha", "");

            setTimeout(() => {
                setMensagem({estilo:"", texto: "" });
            }, 3000);
        }
    };

    const alterar = () => {
        setVer(!ver);
    };
    
    return (
        <div className="">
            <div className="flex items-center justify-center w-full h-screen">
                <form onSubmit={handleSubmit(logar)} noValidate className="flex flex-col sm-h:w-[360px] sm-h:h-[400px] sm-h:border-none sm:w-full max-w-[30em] h-[31.25em] 
                    sm:border-2 sm:border-gray-300 rounded-md p-6 pt-6 sm-h:pt-1 sm-h:p-3 pb-6 sm:p-4">
                    <div className="mb-2 h-[20%] flex flex-col justify-center">
                        <img src={logo} alt="Logo ReserveAgora" className="max-w-82 mt-8 sm-h:mt-2"/>
                    </div>
                    <div className="h-[80%] sm:pl-2 sm:pr-2 flex flex-col justify-center mb-4">
                        <div className=" mb-6">
                            <input 
                                id="email"
                                type="email"
                                placeholder="E-mail"
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
                            <input
                                id="senha"
                                type={ver? "text" : "password"}
                                placeholder="Senha"
                                className="w-full p-4 border-2 border-gray-400 rounded-md
                                    bg-gray-200 focus:ring-1 outline-none"
                                {...register("senha", {
                                    required: "Digite sua senha",
                                })}/>
                                {errors.senha && <p className="h-0 text-sm text-red-600 ">{errors.senha.message}</p>}
                                
                        </div>
                        <button type="submit" className="w-full p-2  rounded-md text-white font-bold
                            bg-[rgba(27,119,191,1)]">Entrar</button>
                        <p className={mensagem.estilo}>{mensagem.texto}</p>
                        <div className="flex justify-between text-sm mt-4 
                            p-2 font-bold  text-[rgba(27,119,191,1)]">
                            <NavLink to="/cadastrar">
                                Cadastre-se
                            </NavLink>
                            <NavLink to="/senha">
                                Esqueci a senha
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Entrar;
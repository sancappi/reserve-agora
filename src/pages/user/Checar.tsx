import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { NavLink } from "react-router-dom";
import { checarEmail } from "../../services/usuario";
import Espera from "../../components/Espera";

interface Email {
    email: string;
};

const Checar: React.FC = () => {
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Email>();
    const [espera, setEsperar] = useState<boolean>(false);
    
    const recuperar = async (dados: Email) => {
        setEsperar(true);
        const retorno = await checarEmail(dados.email);
        if(retorno === 0) {
            setTimeout(() => {
                setEsperar(false);
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Usuário não encontrado."});
                reset();
            }, 3000);
        } else if(retorno === -1) {
            setTimeout(() => {
                setEsperar(false);
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
                reset();
            }, 3000);
        }  else {
            setTimeout(() => {
                setEsperar(false);
                setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Link enviado!" });
                reset();
            }, 3000); 
        }
        setTimeout(() => {
            setMensagem({estilo:"", texto: "" });
        }, 5000);
    };

    return (
    <div>
        {espera && <Espera/>}
        <div className="flex items-center justify-center w-full h-screen">
            <form onSubmit={handleSubmit(recuperar)} noValidate className="flex flex-col sm-h:w-[360px] 
                sm-h:h-[400px] sm-h:border-none w-full max-w-[30em] h-[22em] 
                sm:border-2 sm:border-gray-300 rounded-md p-6 pt-6 sm-h:pt-1 sm-h:p-3 pb-6 sm:p-4">
                <div className="h-full flex flex-col justify-center mb-4"> 
                    <div className="flex justify-center p-4">
                        <p>Digite seu e-mail cadastrado para enviarmos um link de recuperação de senha.</p>
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
                        {errors.email && <p className="h-0 text-sm text-red-600 bg-red-100">{errors.email.message}</p>}
                    </div>
                    {<p className={mensagem.estilo}>{mensagem.texto}</p>}
                </div>
                <button type="submit" className="w-full p-2 mb-2 rounded-md text-white font-bold
                    bg-[rgba(27,119,191,1)]">Enviar</button>
                <div className="flex justify-center text-sm mt-2 
                    p-2 font-bold text-[rgba(27,119,191,1)]">
                    <NavLink to="/login">
                        Clique aqui para fazer login.
                    </NavLink>
                </div>
            </form>
        </div>
    </div>
    )
};

export default Checar;
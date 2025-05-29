import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AlterarSenha from "../../components/AlterarSenha";
import Voltar from "../../components/Voltar";
import {useForm} from "react-hook-form";
import { useDeslogar } from "../../hook/deslogar";
import { usuario, atualizarEmailNome } from "../../services/usuario";
import { Atualizar } from "../../services/usuario";

const AtualizarDados: React.FC = () => {
    const [abrir, setAbrir] = useState<boolean>(false);
    const [usuarioDados, setUsuario] = useState<Atualizar>();
    const {register, handleSubmit, formState: {errors}, setValue, setError} = useForm<Atualizar>();
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const [atualizar, setAtualizar] = useState<boolean>(false);
    const deslogar = useDeslogar();

    useEffect(() => {
        const usuariosRetorno = async() => {
            const retorno = await usuario();
            if(retorno === -1) {
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
            } else if(retorno === 2){
                deslogar();
            } else {
                setUsuario(retorno);
            }
        };
        usuariosRetorno();
    }, [atualizar]);

    setValue("email", usuarioDados?.email);
    setValue("nome", usuarioDados?.nome);
    
    const atualizarDados = async(dados: Atualizar) => {
        const email = dados.email;
        const nome = dados.nome;
        const analisar = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if(typeof email === "string" && nome !== "") {
            if(!analisar.test(email)) {
                setError("root", {
                    type: "manual",
                    message: "Formato de e-mail inválido"
                });
            } else {
                const res = await atualizarEmailNome(dados);
                if(res === 2) {
                    deslogar();
                } else if(res === 0) {
                    setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Dados incompletos." });
                } else if(res === 1) {
                    setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Usuário atualizado com sucesso!"});;
                    setTimeout(() => {
                        setMensagem({estilo:"", texto: "" });
                    }, 5000);
                    setAtualizar(!atualizar);
                } else {
                    setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
                }
            }
        }
    }; 

    const alterar = () => {
        setAbrir(!abrir);
    };

    return (
        <div>
            <Header/>
            <Voltar/>
            <main className="h-[80vh] flex items-center justify-center">
            {abrir && <AlterarSenha senha={alterar}/>}
                <div className="flex flex-col items-center gap-2 sm-h:gap-1 w-full h-full max-w-[31.32em] 
                    max-h-[31.32em]">
                    <div className="shadow bg-white mt-8 sm-h:mt-4">
                        <h1 className="p-2 text-lg ">Editar dados</h1>
                    </div>
                    <form onSubmit={handleSubmit(atualizarDados)} noValidate className="sm:w-full h-[31.25em] flex flex-col justify-center items-center 
                        m-6 w-[90%] sm-h:w-[80%] sm-h:h-[80%] sm-h:mb-4 p-4 sm:border-2 sm:border-gray-200 rounded-md">
                        <div className="w-full sm-h:mb-[10%]">
                            <div className="w-full mb-6">
                                <input type="text"
                                    {...register("nome")} 
                                    placeholder="Nome completo" className="w-full p-3 border-2 border-gray-400  rounded-md
                                    bg-gray-200 focus:ring-1 outline-none"/>
                            </div>
                            <div className="w-full mb-6">
                                <input {...register("email", {
                                    
                                })} placeholder="E-mail" type="email" className="
                                    w-full p-3 border-2 border-gray-400 rounded-md bg-gray-200
                                    focus:ring-1 outline-none"/>
                            </div>
                        </div>
                        <button className="w-full p-2 rounded-md text-white font-bold
                            bg-[rgba(27,119,191,1)]">Salvar</button>
                        {errors.root && <p className="h-0 text-sm text-red-600">{errors.root.message}</p>}
                        {<p className={mensagem.estilo}>{mensagem.texto}</p>}
                    </form>
                    <div className="w-[90%] pl-4 sm:w-full sm:pl-0">
                        <button  onClick={alterar} className="p-2 mb-20 sm-h:mb-0 rounded-md text-white font-bold
                            bg-[rgba(27,119,191,1)]">Alterar senha</button>
                    </div>                        
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default AtualizarDados;
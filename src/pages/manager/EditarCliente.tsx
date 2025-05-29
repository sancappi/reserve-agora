import React, {useState, useEffect} from "react";
import { listar, Cliente, atualizarCliente } from "../../services/gestao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDeslogar } from "../../hook/deslogar";
import {useForm} from "react-hook-form";
import Espera from "../../components/Espera";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const EditarCliente: React.FC = () => {
    const [espera, setEsperar] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const [clienteEditar, setClienteEditar] = useState<Cliente>();
    const [atualizar, setAtualizar] = useState<boolean>(false);
    const deslogar= useDeslogar();
    const {id} = useParams();
    const {handleSubmit, register, setValue} = useForm<Cliente>();
    const navegar = useNavigate();

    const retornar = () => {
        navegar("/clientes");
    };

    useEffect(() => {
        const buscar = async () => {
            const recebidas = await listar();
            if (recebidas === 2) {
                deslogar();
            } else if (recebidas === -1) {
                setMensagem({estilo: "text-red-600 h-0 text-sm", texto: "Erro interno do servidor. Tente novamente mais tarde."});
            } else {
                const cliente = recebidas.find((cliente: Cliente) => cliente._id === id);
                setClienteEditar(cliente);
            }
        };
        buscar();
    }, [atualizar]);
    
    useEffect(() => {
        if (clienteEditar) {
            setValue("nome", clienteEditar.nome);
            setValue("email", clienteEditar.email);
        
        }
    }, [clienteEditar]);
    
    const editar = async(cliente: Cliente) => {
        setEsperar(true);
        const res = await atualizarCliente(id, cliente);
        if(res === 2) {
            deslogar();
        } else if(res === 1) {
            setTimeout(() => {
                setEsperar(false);
                setMensagem({estilo: "text-green-600 h-0 text-sm", texto: "Cliente atualizado com sucesso!"});
            }, 5000);
            setTimeout(() => {
                setMensagem({estilo: "", texto: ""});
            }, 8000);
            setMensagem({estilo: "", texto: ""});
        } else if(res === 0) {
            setMensagem({estilo: "text-red-600 h-0 text-sm", texto: "Usuário não encontrado. Tente novamente."});
            setTimeout(() => {
                setEsperar(false);
                setMensagem({estilo: "", texto: ""});
                navegar("/clientes");
            }, 3000);
        } else {
            setEsperar(false);
            setMensagem({estilo: "text-red-600 h-0 text-sm", texto: "Erro interno do servidor. Tente novamente mais tarde."});
        }
    };

    return (
        <div>
          <Header />
            <div className="absolute h-[10vh] top-0 flex ml-4">
                <button onClick={retornar} className="">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-3xl text-white"/>
                </button>
            </div>          <div>
            {espera && <Espera/>}
            </div>
          <main className="h-[80vh] flex flex-col items-center justify-center">                
            <div className="rounded-md p-4 w-full sm:max-w-[360px] h-[260px] sm:border-2 sm:border-gray-200 flex flex-col justify-center">
                    <form onSubmit={handleSubmit(editar)} noValidate className="w-full flex flex-col 
                         sm-h:w-[80%] sm-h:h-[80%] sm-h:mb-4 text-sm text-black">
                        <div className="w-full sm-h:mb-[10%]">
                            <div className="w-full mb-6">
                                <input type="text"
                                    {...register("nome")} 
                                    placeholder="Nome completo" className="w-full p-4 border-2 border-gray-400 rounded-md
                                    bg-gray-200 focus:ring-1 outline-none"/>
                            </div>
                            <div className="w-full mb-6">
                                <input {...register("email", {
                                    
                                })} placeholder="E-mail" type="email" className="
                                    w-full p-4 border-2 border-gray-400 rounded-md bg-gray-200
                                    focus:ring-1 outline-none"/>
                            </div>
                        </div>
                        <button className="w-full p-4 rounded-md text-white font-bold
                            bg-[rgba(27,119,191,1)]">Salvar</button>
                        {<p className={mensagem.estilo}>{mensagem.texto}</p>}
                    </form>                       
                </div>  
            </main>
            <Footer/>
        </div>
    )
};

export default EditarCliente;
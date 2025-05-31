import React, {useState} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Espera from "../../components/Espera";
import { excluir } from "../../services/usuario";
import { useDeslogar } from "../../hook/deslogar";
import { useNavigate } from "react-router-dom";
import Voltar from "../../components/Voltar";

const Deletar: React.FC = () => { 
    const [mensagem, setMensagem] = useState("");
    const [estado, setEstado] = useState<boolean>(false);
    const navegar = useNavigate();
    const deslogar = useDeslogar();
    
    const excluirConta = async () => {
        setEstado(true);
        const res = await excluir();
        if(res === 2) {
            deslogar();
        } else if(res === 1){
            setTimeout(()=> {
                navegar("/login");
            }, 5000);
        } else {
            setEstado(false);
            setMensagem("Erro interno do servidor.");
        }
    };

    return (
        <div>
            <Header/>
            <Voltar/>
            <div className="">
                {estado && <Espera/>}
            </div>
            <main className="h-[80vh] flex flex-col justify-center items-center">
                <div className="flex flex-col items-center gap-4 w-[80%] max-w-[500px]">
                    <h1 className="text-center">Clique abaixo para confirmar a exclusão de sua conta</h1>
                    <button onClick={excluirConta} className="p-2 rounded-md text-white font-bold
                    bg-[rgba(27,119,191,1)] sm:w-[300px]">Excluir conta
                    </button>
                </div>
                <p className="h-0 mt-2 text-sm text-red-600">{mensagem}</p>
            </main>
            <Footer/>
        </div>
    );
};

export default Deletar;
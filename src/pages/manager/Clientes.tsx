import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { listar } from "../../services/gestao";
import { Cliente } from "../../services/gestao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import ExcluirCliente from "../../components/ExcluirCliente";
import Espera from "../../components/Espera";
import { useDeslogar } from "../../hook/deslogar";
import RetornarClientes from "../../components/RetornarClientes";
import { NavLink } from "react-router-dom";

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [espera, setEspera] = useState<boolean>(false);
  const [excluir, setExcluir] =useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>("");
  const deslogar = useDeslogar();

  useEffect(() => {
    const dados = async () => {
      setEspera(true);
      const res = await listar();
      if(res === 2) {
        deslogar();
      } else if(res === -1) {
        setEspera(false);
        setMensagem("Erro interno do servidor. Tente novamente mais tarde.");
      } else {
        setTimeout(() => {
          setEspera(false);
          setClientes(res);
        }, 5000);
      }
    };
    dados();
  }, []);

  const mExcluir = () => {
    setExcluir(!excluir);
  };

  return (
    <div>
      <Header/>
      <RetornarClientes/>
      {espera && <Espera/>}
      <p className="h-0 mt-2 text-sm -text-red-600">{mensagem}</p>
      <main className="h-[80vh] flex flex-col items-center overflow-y-scroll">
        <div className="w-full flex justify-center mt-2">
          <h1 className="p-3 m-2 border-2 shadow-md rounded-md">Clientes</h1>
        </div>
        {clientes.length > 0 ? clientes.map((cliente, index) => (
          <div key={index} className="w-[96%] bg-blue-100 max-w-[800px] text-sm sm: text-md min-h-[140px] sm:h-[160px] rounded-md flex
            p-2 grid grid-cols-4 gap-1 m-2" role="pointer" tabIndex={0}>
              <div className="col-span-3 flex flex-col justify-center gap-2">
                <div className="p-2 bg-white rounded-md">
                    <p>{cliente.nome}</p>
                </div>
                <div className="p-2 bg-white rounded-md">
                  <p>{cliente.email}</p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 text-[rgba(27,119,191,1)] text-2xl">
                <NavLink to={`/editar_cliente/${cliente._id}`}>
                  <FontAwesomeIcon icon={faPen}/>
                </NavLink>
                <button onClick={mExcluir} className="">
                  <FontAwesomeIcon icon={faTrash}/>
                </button>
                {excluir && <ExcluirCliente excluir={mExcluir} id={cliente._id} pExcluirCliente={setClientes}/>}
              </div>
          </div>
        )) : (
          <p>Não há usuários cadastrados no momento.</p>
        )}
      </main>
      <Footer/>
    </div>
  )
};

export default Clientes;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Retornar: React.FC = () => {
  const navigate = useNavigate();
  const usuario = useSelector((state: RootState) => 
        state.autenticar.tipoPerfil);
  const retornar = () => {
    if(usuario === "cliente") {
        navigate("/perfil");
    } else {
        navigate("/salas");
    }
  };

  return (
    <div className="absolute h-[10vh] top-0 flex ml-4">
      <button onClick={retornar} className="">
        <FontAwesomeIcon icon={faArrowLeft} className="text-3xl text-white"/>
      </button>
    </div>
  );
};

export default Retornar;

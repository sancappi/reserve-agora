import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const RetornarClientes: React.FC = () => {
    const navigate = useNavigate();

    const retornar = () => {
        navigate("/perfil");
    };

    return (
        <div className="absolute h-[10vh] top-0 flex ml-4">
        <button onClick={retornar} className="">
            <FontAwesomeIcon icon={faArrowLeft} className="text-3xl text-white"/>
        </button>
        </div>
    );
};

export default RetornarClientes;

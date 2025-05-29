import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ParaSalas = () => {
  const navigate = useNavigate();

  const voltar = () => {
    navigate("/salas");
  };

  return (
    <div className="absolute h-[10vh] top-0 flex ml-4">
      <button onClick={voltar} className="">
        <FontAwesomeIcon icon={faArrowLeft} className="text-3xl text-white"/>
      </button>
    </div>
  );
};

export default ParaSalas;

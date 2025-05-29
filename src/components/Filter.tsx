import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faClipboardCheck, faClose, faFilter, faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Sala } from "../services/gestao";

export interface Modal {
    onFuncaoModal: () => void;
    salasFiltrar: React.Dispatch<React.SetStateAction<Sala[]>>;
    salas: Sala[];
};

const Filter: React.FC<Modal> = ({onFuncaoModal, salasFiltrar, salas}) => {
    const {register, reset, watch} = useForm();

    const aplicar = () => {
        let capacidadeF = watch("capacidade");
        capacidadeF = capacidadeF === "mais20" ? 21 : capacidadeF? Number(capacidadeF) : null;
        const recursosF: [] = watch("recursos") || [];
        let filtradas: any;

        if(capacidadeF !== null) {
            if (recursosF.length > 0) {
                if (capacidadeF === 21) {
                    filtradas = salas.filter(s => s.capacidade >= 
                        capacidadeF && recursosF.every(r => s.recursos.includes(r)));
                } else {
                    filtradas = salas.filter(s => s.capacidade <= 
                        capacidadeF && recursosF.every(r => s.recursos.includes(r)));
                }
            } else {
                if (capacidadeF === 21) {
                    filtradas = salas.filter(s => s.capacidade >= capacidadeF);
                } else {
                    filtradas = salas.filter(s => s.capacidade <= capacidadeF);
                }
            };
        } else {
            filtradas = salas.filter((s) => recursosF.every(r => s.recursos.includes(r)));
        }
        salasFiltrar(filtradas);
    };

    const limpar = () => {
        reset({
            capacidade: "",
            recursos: []
        });
        salasFiltrar([...salas]);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center 
            items-center">
            <div className="bg-white flex flex-col w-[80%] max-w-[300px] h-[460px] rounded-md">
                <div className="flex justify-between p-2 text-xl text-[rgba(27,119,191,1)]">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faFilter}/>
                        <p className="">Filtrar por: </p>
                    </div>
                    <button onClick={onFuncaoModal} className="p-2">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>
                <div className="m-3  flex flex-col gap-2">
                    <div className="mt-1">
                        <div className="flex gap-2 justify-start items-center font-bold ">
                            <FontAwesomeIcon icon={faUser}/>
                            <h3>Capacidade</h3>
                        </div>
                        
                        <div className="flex flex-col mt-2 ">
                            <ul className="">
                                <li className="flex gap-2">
                                    <input type="radio" value="5"
                                    {...register("capacidade")}/>
                                    <label>Até 5 pessoas</label>
                                </li>
                                <li className="flex gap-2">
                                    <input type="radio" value="10"
                                    {...register("capacidade")}/>
                                    <label>Até 10 pessoas</label>
                                </li>
                                <li className="flex gap-2">
                                    <input type="radio" value="15"
                                    {...register("capacidade")}/>
                                    <label>Até 15 pessoas</label>
                                </li>
                                <li className="flex gap-2">
                                    <input type="radio" value="20"
                                    {...register("capacidade")}/>
                                    <label>Até 20 pessoas</label>
                                </li>
                                <li className="flex gap-2">
                                    <input type="radio" value="mais20"
                                    {...register("capacidade")}/>
                                    <label>Mais de 20 pessoas</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-2 justify-start items-center font-bold">
                            <FontAwesomeIcon icon={faClipboardCheck}/>
                            <h3>Recursos</h3>
                        </div>
                        
                        <div className="mt-2 flex flex-col">
                            <ul>
                                <li className="flex gap-2">
                                    <input type="checkbox" value="projetor"
                                    {...register("recursos")}/>
                                    <label>Projetor</label>
                                </li>
                                <li className="flex gap-2">
                                    <input type="checkbox" value="tv"
                                    {...register("recursos")}/>
                                    <label>TV</label>
                                </li>
                                <li className="flex gap-2">
                                    <input type="checkbox" value="quadro"
                                    {...register("recursos")}/>
                                    <label>Quadro branco</label>
                                </li>
                                <li className="flex gap-2">
                                    <input type="checkbox" value="monitor"
                                    {...register("recursos")}/>
                                    <label>Monitor</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" flex p-2 justify-center gap-4 ">
                    <button className="bg-[rgba(27,119,191,1)] text-white text-sm text-center p-2 rounded-md" onClick={() => aplicar()}>
                        Buscar
                    </button>
                    <button className="bg-[rgba(27,119,191,1)] text-white text-sm p-2 rounded-md" onClick={() => limpar()}>
                        Limpar filtro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
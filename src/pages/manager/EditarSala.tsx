import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {useForm} from "react-hook-form";
import { Sala } from "../../services/gestao";
import { atualizar } from "../../services/gestao";
import { disponibilizadas } from "../../services/gestao";
import { useDeslogar } from "../../hook/deslogar";
import Voltar from "../../components/Voltar";
import escritorio from "../../assets/escritorio.jpg";
import Espera from "../../components/Espera";

const EditarSala: React.FC = () => {
    const [customizar, setCustomizar] = useState(false);
    const [notificar, setNotificar] = useState<boolean>();
    const [salaEditar, setSalaEditar] = useState<Sala>();
    const [espera, setEspera] = useState<boolean>();
    const [mensagem, setMensagem] = useState({estilo: "", texto: ""});
    const {id} = useParams();
    console.log("id recebido", id);
    const {handleSubmit, register, formState: {errors}, setValue, watch} = useForm<Sala>();
    const deslogar = useDeslogar();
    const [atualizarSala, setAtualizar] = useState<boolean>(false);
    

    useEffect(() => {
        const buscar = async () => {
            const recebidas = await disponibilizadas();
            if (recebidas === 2) {
                deslogar();
            } else if (recebidas === -1) {
                setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
            } else {
                const sala = recebidas.find((s: Sala) => s._id === id);
                setSalaEditar(sala);
            }
        };
        buscar();
    }, [atualizarSala]);

    useEffect(() => {
        if (salaEditar) {
            setValue("titulo", salaEditar.titulo);
            const tipoCapacidade = salaEditar.capacidade;
            if (Number(tipoCapacidade) > 20) {
                setValue("capacidadePersonalizada", tipoCapacidade);
                setValue("capacidade", "mais20");
            } else {
                setValue("capacidade", String(salaEditar.capacidade));
            }

            setValue("recursos", salaEditar.recursos);
            setValue("foto", salaEditar.foto);
            setValue("abertura", salaEditar.abertura);
            setValue("fechamento", salaEditar.fechamento);
            setValue("observacoes", salaEditar.observacoes);
            setValue("notificacaoInput", salaEditar.notificacao);
        }
    }, [salaEditar]);
    
    const capacidadeValor = watch("capacidade");
    const notificarValor = watch("notificacaoInput");

    useEffect(() => {
        if (capacidadeValor === "mais20") {
            setCustomizar(true);
        }
    }, [capacidadeValor]);

    useEffect(() => {
        if (notificarValor !== 0 && notificarValor !== null) {
            setNotificar(true); 
        } else {
            setNotificar(false);
        }
    }, [notificarValor]);

    const alterarNotificar = () => {
        setNotificar(!notificar)
    };

    const onAtualizar = async(sala: Sala) => {
        console.log(sala);
        setEspera(true);
        const res = await atualizar(id, sala);
        if(res === 2) {
            deslogar();
        } else if(res === 1) {
            setTimeout(() => {
                setEspera(false);
                setMensagem({estilo:"text-sm text-green-600 text-center", texto: "Sala atualizada com sucesso!" });
            }, 5000);
            setAtualizar(!atualizarSala);
            setTimeout(() => {
                setMensagem({estilo:"", texto: "" });
            }, 8000);
            setMensagem({estilo:"", texto: "" });
        } else if(res === -1) {
            setEspera(false);
            setMensagem({estilo:"text-sm text-red-600 text-center", texto: "Erro interno do servidor." });
        }
    };

    const arquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const fr = new FileReader();

            fr.onloadend = () => {
                const base = fr.result;
                setValue("foto", String(base));
            };
            fr.readAsDataURL(file);
        }
    };

    return (
        <div>
          <Header />
          <Voltar/>
          <div>
            {espera && <Espera/>}
            </div>
          <main className="h-[80vh] flex flex-col items-center overflow-y-scroll">
            <form onSubmit={handleSubmit(onAtualizar)} noValidate className="flex flex-col 
                w-[90%] sm:w-[60%] md:w-[500px] m-2 sm:pb-4 bg-white border-2 border-gray-200 rounded-md
                ">
                <div className="mt-6 p-2 sm:pl-10 pb-2 h-16">
                <input placeholder="Título da sala" maxLength={28}
                    {...register("titulo", {
                    required: "Campo obrigatório"
                    })}
                    className="bg-gray-100 w-full sm:w-[80%] p-1 rounded-md border-2 border-gray-200"
                />
                {errors.titulo && (
                    <p className="h-0 text-red-500 text-sm ">{errors.titulo.message}</p>
                )}
                </div>

                <div className="m-2 flex flex-col gap-2 sm:pl-10">
                <h2 className="font-bold">Capacidade</h2>
                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <input id="capacidade5"
                            type="radio"
                            value="5"
                            {...register("capacidade", {
                                required: "Selecione uma opção"
                            })}
                            onChange={() => setCustomizar(false)}
                        />
                        <label htmlFor="capacidade5" className="">Até 5 pessoas</label>
                    </div>
                    <div className="flex gap-2">
                        <input id="capacidade10"
                            type="radio"
                            value="10"
                            {...register("capacidade", {
                                required: "Selecione uma opção"
                            })}
                            onChange={() => setCustomizar(false)}
                        />
                        <label htmlFor="capacidade10" className="">Até 10 pessoas</label>
                    </div>
                    <div className="flex gap-2">
                        <input id="capacidade15"
                            type="radio"
                            value="15"
                            {...register("capacidade", {
                                required: "Selecione uma opção"
                            })}
                            onChange={() => setCustomizar(false)}
                        />
                        <label htmlFor="capacidade15" className="">Até 15 pessoas</label>
                    </div>
                    <div className="flex gap-2">
                        <input id="capacidade20"
                            type="radio"
                            value="20"
                            {...register("capacidade", {
                                required: "Selecione uma opção"
                            })}
                            onChange={() => setCustomizar(false)}
                        />
                        <label htmlFor="capacidade20" className="">Até 20 pessoas</label>
                    </div>
                
                    <div className="flex gap-2">
                        <input id="mais20"
                            type="radio"
                            value="mais20"
                            {...register("capacidade", {
                                required: "Selecione uma opção"
                            })}
                            onChange={() => setCustomizar(true) }
                        />
                        <label htmlFor="mais20" className="">Mais de 20 pessoas</label>
                    </div>
                    {customizar && (
                        <div>
                            <input
                                type="number"
                                placeholder="   21"
                                {...register("capacidadePersonalizada", {
                                    required: "Digite a capacidade",
                                    min: {
                                        value: 21,
                                        message: "Digite um número maior do que 21."
                                    }
                                })}
                                className="w-14 bg-gray-100 border-2 border-gray-300
                                rounded mt-2"/>
                            {errors.capacidadePersonalizada && <p className="h-0 text-red-500 text-sm">{errors.capacidadePersonalizada.message}</p>}
                        </div>
                    )}
                    {errors.capacidade && (
                        <p className="h-0 text-red-500 text-sm">{errors.capacidade.message}</p>
                    )}
                </div>
                </div>
                <div className="m-2 flex flex-col gap-2 sm:pl-10">
                    <h2 className="font-bold">Recursos</h2>
                    
                    <div className="flex gap-2">
                        <input type="checkbox" value="projetor"
                            {...register("recursos", {
                            })}/>
                        <label className="">Projetor</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" value="tv"
                            {...register("recursos", {
                            })}/>
                        <label className="">TV</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" value="quadro"
                            {...register("recursos", {
                            })}/>
                        <label className="">Quadro branco</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" value="monitor"
                            {...register("recursos", {
                            })}/>
                        <label className="">Monitor</label>
                    </div>
                </div>
                <div className="h-[260px] m-2 flex flex-col justify-center items-center gap-4 sm:pl-10">
                    <div className="relative bg-white col-span-1 overflow-hidden m-0 w-[140px] sm:w-[] min-h-[180px] rounded shadow-md">
                        <img src={salaEditar?.foto === "" ? escritorio: salaEditar?.foto} className="w-[100%] h-[100%] object-cover absolute top-0 left-0 m-0 p-0"/>
                    </div>
                    <div className="">
                        <label htmlFor="fotoInput" className="cursor-pointer bg-[rgba(27,119,191,1)] 
                            text-white p-2 w-20 sm:w-80 rounded mt-4">Escolher arquivo</label>
                        <input id="fotoInput" type="file" onChange={arquivo} className="hidden" 
                        />
                    </div>
                    <input type="text" id="foto" className="hidden"
                    {...register("foto")}/>
                </div>
                <div className="m-2 flex justify-between sm:w-[300px] sm:pl-10">
                    <label htmlFor="abertura" className="font-bold">Abertura</label>
                    <input type="time" id="abertura" className="p-1 border-2 boder-gray-300 rounded-md"
                    {...register("abertura", {
                        required: "Campo obrigatório"
                    })}/>
                </div>
                {errors.abertura && (<p className=" w-32 ml-2 text-red-500 text-sm">{errors.abertura.message}</p>)}

                <div className="m-2 flex justify-between sm:w-[300px] sm:pl-10">
                    <label htmlFor="fechamento" className="font-bold">Fechamento</label>
                    <input type="time" id="fechamento" className="p-1 border-2 boder-gray-300 rounded-md"
                    {...register("fechamento", {
                        required: "Campo obrigatório"
                    })}/>
                </div>
                {errors.fechamento && (<p className=" w-32 ml-2 text-red-500 text-sm">{errors.fechamento.message}</p>)}
                <div className="flex flex-col m-2 gap-2">
                    <label htmlFor="observacoes" className="font-bold">Observações</label>
                    <textarea id="observacoes" placeholder="Escreva em até 100 caracteres..." className="rounded-md border-2 boder-gray-300 "
                    {...register("observacoes")} rows={4} maxLength={100}></textarea>
                </div>
                {errors.observacoes && (<p className="ml-2 text-red-500 text-sm">{errors.observacoes.message}</p>)}
                <div className="flex gap-4 items-center m-2">
                    <label htmlFor="notificacao" className="font-bold">Notificação de confirmação</label>
                    <input id="notificacao" type="checkbox" 
                   checked={notificar} onChange={() => alterarNotificar()}/>
                </div>
                {notificar && (
                    <div className="flex flex-col">
                        <div className="flex justify-between sm:justify-center sm:gap-4 m-2">
                            <label htmlFor="notificacaoInput">Quantos dias antes?</label>
                            <input id="notificacaoInput" type="number"
                                placeholder="1" className="w-20 rounded-sm text-center border-2 boder-gray-300" 
                            {...register("notificacaoInput", {
                                min: {
                                    value: 1,
                                    message: "A quantidade mínima é 1"
                                },
                                required: "Preencha este campo"
                            })} />
                        </div>
                        {errors.notificacaoInput && (<p className="ml-2 text-red-500 text-sm">{errors.notificacaoInput.message}</p>)}
                    </div>
                )}
                <div className="flex flex-col items-center justify-center mb-8">
                    <button 
                        type="submit"
                        className="bg-[rgba(27,119,191,1)] 
                        text-white p-2 w-20 sm:w-80 rounded mt-4">
                        Salvar 
                    </button>
                    <p className={mensagem.estilo}>{mensagem.texto}</p>
                </div>
                
            </form>
        </main>
          <Footer />
        </div>
      );
    };

export default EditarSala;
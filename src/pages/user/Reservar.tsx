import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { disponiveis } from "../../services/usuario";
import { useNavigate } from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import { useDeslogar } from "../../hook/deslogar";
import Retornar from "../../components/Retornar";

interface Dados {
    data: Date;
    inicio:string;
    fim: string;
};

const Reservar:React.FC = () => {
    const deslogar = useDeslogar();
    const navegar = useNavigate();
    const [mensagem, setMensagem] = useState<string>("");
    const {register, handleSubmit, control, setError, setValue, watch} = 
        useForm<Dados>({mode: "onBlur", reValidateMode: "onBlur"});
    
    useEffect(() => {
        const d = new Date;
        setValue("data", d);
    }, []);

    const opcoes = {
        inline: true,
        formatoData: "Y-m-d",
        enableTime: false,
        time_24hr: true,
        utc: false,
        minDate: "today"
    };

    const ver = async(dados: Dados) => {        
        if(dados.data === null || dados.inicio === "" || dados.fim === "") {
            setMensagem("Preencha todos os campos.");
            return;
        }
        const converterMin = (tempo:string): number => {
            let partes = tempo.split(":");
            let horas = parseInt(partes[0], 10);
            let minutos = parseInt(partes[1], 10);
            let total = horas * 60 + minutos;
            return total;
        };
        const d = new Date();
        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");
        const f = `${h}:${m}`;

        if (
            d.getFullYear() === new Date(watch("data")).getFullYear() &&
            d.getMonth() === new Date(watch("data")).getMonth() &&
            d.getDate() === new Date(watch("data")).getDate() &&
            (converterMin(dados.inicio) < converterMin(f) || converterMin(dados.fim) < converterMin(f))
        ) {
            setMensagem("Escolha um horário válido.");
            return;
        }
        if(converterMin(dados.inicio) > converterMin(dados.fim)) {
            setMensagem("Escolha um horário válido.");
            return;
        }
        setMensagem("");

        const atual = new Date();
        const dataRecebida = new Date(dados.data);

        atual.setHours(0, 0, 0, 0);
        dataRecebida.setHours(0, 0, 0, 0);

        let data = dataRecebida.toISOString().split("T")[0];
        let dia: string | number = dataRecebida.getUTCDate();
        let mes: string | number = dataRecebida?.getUTCMonth() + 1;
        let ano = dataRecebida?.getUTCFullYear();

        dia = dia < 10 ? "0" + dia: dia.toString();
        mes = mes < 10? "0" + mes: mes.toString();

        data = `${dia}-${mes}-${ano}`;

        localStorage.setItem("date", data);
        localStorage.setItem("start", dados.inicio);
        localStorage.setItem("end", dados.fim);

        const tratados = {
            data: data,
            horaI: dados.inicio,
            horaF: dados.fim
        };

        const salas = await disponiveis(tratados);
        if(salas === -1) {
            setMensagem("Erro interno do servidor.")
        } else if(salas === 2) {
            deslogar();
        } else {
            navegar("/disponiveis", {state: {data: salas}});
        }
    }; 

    return (
        <div>
            <Header/>
            <Retornar/>
            <main className=" h-[80vh] w-full flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit(ver)} className=" m-4 max-w-[600px] h-[500px] sm:w-[500px] sm:border-2 border-gray-200 rounded-md flex flex-col items-center justify-center">
                    <div className="">
                        <Controller
                            name="data"
                            control={control}
                            rules={{required: "É preciso selecionar a data."}}
                            render={({field}) => (
                                <Flatpickr
                                    {...field}
                                    options={opcoes}
                                    onChange={(data)=> field.onChange(data[0])}
                                />
                            )}
                        /> 
                    </div>
                    <div className="mt-4 flex justify-center gap-12 sm:gap-2">
                        <div className="flex gap-2 flex-col sm:flex-row jusify-center items-center">
                            <label>Início</label>
                            <input type="time" 
                                {...register("inicio", {required: "Escolha a hora inicial"})}
                                className="rounded-md border-2 border-gray-400 p-2"/>   
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row jusify-center items-center">
                            <label>Término</label>
                            <input type="time" 
                                {...register("fim", {required: "Escolha a hora final"})}
                                className="rounded-md border-2 border-gray-400 p-2" />
                        </div>
                    </div>

                    <button type="submit" className="w-full sm:w-auto p-2 rounded-md 
                        mt-6 mb-2 text-center text-white bg-[rgba(27,119,191,1)]">
                        Ver salas disponíveis
                    </button>
                    <p className="h-0 text-red-500 text-sm">{mensagem}</p>
                </form>
            </main>
            <Footer/>
        </div>
    )
};

export default Reservar;
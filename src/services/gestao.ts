import { API } from "./entrar";

export interface Sala {
    _id: string;
    titulo: string;
    capacidade: number | string;
    capacidadePersonalizada?: number | string;
    recursos: string[] | [];
    abertura: string;
    fechamento: string;
    observacoes?: string | undefined;
    notificacao: number | null;
    notificacaoInput?: number | null;
    foto?: string | undefined;
};

export interface Cliente {
    _id: string,
    nome: string;
    email: string;
};

export const salvar = async (sala: Sala):Promise<number> => {
    try {
        const res = await fetch(`${API}/salvar_sala`, {
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sala)            
        });

        if(res.status === 401) {
            return 0;
        } else if (res.status === 204){
            return 1;
        } else {
            throw new Error(res.statusText);
        }
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};

export const disponibilizadas = async ():Promise<any> => {
    try {
        const res = await fetch(`${API}/disponibilizadas`, {
            credentials: "include"
        });
        
        if(res.status === 401) {
            return 2;
        }
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        const salas = await res.json();
        return salas;
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};

export const atualizar = async (id:any, sala: Sala): Promise<number> => {
    try {
        const res = await fetch(`${API}/atualizar_sala/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sala)
        }); 
        if(res.status === 401) {
            return 2;
        } else if(res.status === 400) {
            return 0;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            return 1;
        }
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};

export const excluir = async (id: any): Promise<number> => {
    try {
        const res = await fetch(`${API}/excluir_sala/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if(res.status === 401) {
            return 2;
        } else if(res.status === 404) {
            return 0;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            return 1;
        }
    } catch(erro) {
        console.error(erro);
        return -1;
    };
};

export const listar = async ():Promise<any> => {
    try {
        const res = await fetch(`${API}/listar`, {
            credentials: "include"
        });
        if(res.status === 401) {
            return 2;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            const clientes = await res.json();
            return clientes;
        }
    } catch(erro) {
        console.error(erro);
        return -1; 
    };
};

export const atualizarCliente = async (id: any, cliente: Cliente): Promise<number> => {
    const dados = {
        email: cliente.email,
        nome: cliente.nome,
    };
    try {
        const res = await fetch(`${API}/atualizar_cliente/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if(res.status === 401) {
            return 2;
        } else if(res.status === 404) {
            return 0;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            return 1;
        }
    } catch(erro) {
        console.error(erro);
        return -1;
    };
};

export const excluirCliente = async (id: string): Promise<number> => {
    try {
        const res = await fetch(`${API}/excluir_cliente/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if(res.status === 401) {
            return 2;
        } else if(res.status === 404) {
            return 0;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            return 1;
        }
    } catch(erro) {
        console.error(erro);
        return -1;
    };
};






import { CriarReserva } from "../components/ConfirmarReserva";
import { API } from "./entrar";
import { Sala } from "./gestao";

export interface Usuario {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha?: string;
    tipoPerfil: "cliente" | "gestor";
};

export interface Atualizar {
    nome: string | undefined;
    email: string | undefined;
};

export interface Senha {
    atual: string;
    nova: string;
    confirmacao: string;
};

export interface Reserva {
    _id: any;
    sala: Sala;
    data: string | null;
    inicio: string | null;
    fim: string | null;
};

export interface Disponiveis {
    data: string;
    horaI: string;
    horaF: string;
};

export interface Recuperar {
    senha: string;
    token: string;
};

export const cadastrar = async (usuario: Usuario): Promise<number> => {
    try {
        const res = await fetch(`${API}/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        if(res.status === 409) {
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

export const atualizarEmailNome = async (dados: Atualizar): Promise<number> => {
    try {
        const res = await fetch(`${API}/atualizar_dados`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados),
        });
        if(res.status === 401) {
            return 2;
        } else if(res.status === 400) {
            return 0
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            return 1;
        }
    } catch(erro) {
        console.error(erro);
        ;return -1;
    };
};

export const usuario = async (): Promise<any> => {
    try {
        const res = await fetch(`${API}/usuarios`, {
            credentials: "include"
        });
        if(res.status === 401) {
            return 2;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            const usuario = await res.json();
            return usuario;
        }
    } catch(erro) {
        return -1;
    };
};

export const atualizarSenha = async (dados: Senha): Promise<number> => {
    const senha = {
        atual: dados.atual,
        nova: dados.nova
    };
    try {
        const res = await fetch(`${API}/atualizar_senha`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(senha)
        });
        if(res.status === 401) {
            return 2;
        } else if(res.status === 400) {
            return 0;
        } else {
            return 1;
        }
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};

export const excluir = async (): Promise<number> => {
    try {
        const res = await fetch(`${API}/excluir_usuario`, {
            method: "DELETE",
            credentials: "include"
        });

        if(res.status === 401) {
            return 2;
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

export const disponiveis = async (info:Disponiveis): Promise<any> => {
    try {
        const res = await fetch(`${API}/disponiveis`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info),
        });
        if(res.status === 401) {
            return 2;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            const dados = await res.json();
            return dados;
        }
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};

export const salvarReserva = async (reserva: CriarReserva): Promise<number> => {
    try {
        const res = await fetch(`${API}/salvar_reserva`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        });
        if(res.status === 401) {
            return 2;
        } else if(res.status === 409) {
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

export const reservas = async (): Promise<any> => {
    try {
        const res = await fetch(`${API}/reservas`, {
            credentials: "include"
        });
        if(res.status === 401) {
            return 2;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            const dados = await res.json();
            return dados;
        }
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};

export const excluirReserva = async (id:string): Promise<number> => {
    try {
        const res = await fetch(`${API}/excluir_reserva/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if(res.status === 401) {
            return 2;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            return 1;
        }
    } catch(erro) {
        console.log(erro);
        return -1;
    };
};

export const checarEmail = async (email: string): Promise<number> => {
    const dados = {
        email: email
    };

    try {
        const res = await fetch(`${API}/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if(res.status === 404) {
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

export const recuperarSenha = async (dados: Recuperar): Promise<number> => {
    try {
        const res = await fetch(`${API}/senha`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if(res.status === 404) {
            return 0
        }else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            return 1;
        }
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};






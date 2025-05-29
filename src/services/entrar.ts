export const API = process.env.REACT_APP_API;

export interface Dados {
    email: string;
    senha: string;
};

export const login = async(usuario: Dados): Promise<any> => {
    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if(res.status === 404) {
            return 0;
        } else if(!res.ok) {
            throw new Error(res.statusText);
        } else {
            const perfil = await res.json();
            return perfil.tipoPerfil;
        }
    } catch (erro) {
        console.error(erro);
        return -1;
    };
};

export const logout = async(): Promise<number> => {
    try {
        const res = await fetch(`${API}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return 1;
    } catch (erro) {
        return -1;
    };
};
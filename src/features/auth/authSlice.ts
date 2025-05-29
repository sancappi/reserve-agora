import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Autenticar {
    autenticado: boolean;
    tipoPerfil: string | null;
}

const initialState: Autenticar = {
    autenticado: false,
    tipoPerfil: null
};

const autenticarSlice = createSlice({
    name: "autenticar",
    initialState,
    reducers: {
        sucesso: (estado, acao: PayloadAction<string>) => {
            estado.autenticado = true;
            estado.tipoPerfil = acao.payload;
        },
        sair: (estado) => {
            estado.autenticado = false;
            estado.tipoPerfil = null;
        }
    }
});

export const {sucesso, sair} = autenticarSlice.actions;
export default autenticarSlice.reducer;
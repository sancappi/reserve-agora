import React from 'react';
import {Navigate, Routes, Route } from "react-router-dom";
import Autenticado from './components/Autenticado';
import Entrar from './pages/user/Entrar';
import Perfil from './pages/user/Perfil';
import Atualizar from './pages/user/Atualizar';
import Deletar from './pages/user/Deletar';
import Reservar from './pages/user/Reservar';
import Disponiveis from './pages/user/Disponiveis';
import Reservas from './pages/user/Reservas';
import Salas from './pages/manager/Salas';
import Clientes from './pages/manager/Clientes';
import Disponibilizar from './pages/manager/Disponibilizar';
import Disponibilizadas from './pages/manager/Disponibilizadas';
import EditarSala from './pages/manager/EditarSala';
import Cadastrar from './pages/user/Cadastrar';
import Checar from './pages/user/Checar';
import RecuperarSenha from './pages/user/Recuperar';
import EditarCliente from './pages/manager/EditarCliente';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Autenticado/>}>
            <Route index element={<Navigate to="/perfil" replace/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/atualizar" element={<Atualizar/>}/>
            <Route path="/deletar" element={<Deletar/>}/>
            <Route path="/reservar" element={<Reservar/>}/>
            <Route path="/disponiveis" element={<Disponiveis/>}/>
            <Route path="/reservas" element={<Reservas/>}/>
            <Route path="/salas" element={<Salas/>}/>
            <Route path="/clientes" element={<Clientes/>}/>
            <Route path="/disponibilizar" element={<Disponibilizar/>}/>
            <Route path="/disponibilizadas" element={<Disponibilizadas/>}/>
            <Route path="/editar/:id" element={<EditarSala/>}/>
            <Route path="/editar_cliente/:id" element={<EditarCliente/>}/>
          </Route>
        <Route path="/login" element={<Entrar/>}/>
        <Route path="/cadastrar" element={<Cadastrar/>}/>
        <Route path="/senha" element={<Checar/>}/>
        <Route path="/recuperar_senha" element={<RecuperarSenha/>}/>
      </Routes>
  );
};

export default App;

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, {useState} from 'react';
import styled from "@emotion/styled";
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid gray;
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
height: 1rem;
width: 1rem;
display: block;
background-size: 1rem;
background-image: url('/static/img/lupa.png');
background-repeat: no-repeat;
position: absolute;
right: 1rem;
top: 1rem;
background-color: white;
border: none;
text-indent: -9999px;

&:hover {
    cursor: pointer;
}
`
const Buscar = () => {
    const [busqueda, setBusqueda] = useState('');
    const buscarProducto = e => {
        e.preventDefault();
       if(busqueda.trim() === '') return;
       Router.push({
           pathname: '/buscar',
           query: {'q' : busqueda}
       })
    }
    return (
        <form 
        css={css`
        position: relative;
        `}
        onSubmit={buscarProducto}
        >
            <InputText type="text" placeholder="Buscar Mascotas" onChange={e => setBusqueda(e.target.value)} />
            <InputSubmit type="submit">Buscar</InputSubmit>
        </form>
    )
}

export default Buscar

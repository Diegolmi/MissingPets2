/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Router from 'next/router';
import React, { useState } from 'react';
//import Layout from "../components/layout/Layout";
import swal from 'sweetalert';
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from '../components/ui/Formulario';

import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

import firebase from '../firebase/firebase';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: '',
};
const CrearCuentaAlerta = () => {
  const [userDuplicado, setUserDuplicado] = useState(false);

  const {
    valores,
    error,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;

  async function crearCuenta() {
    try {
        await firebase.registrar(nombre, email, password);
        
        swal({ title: 'Buen trabajo!', text: 'Registro exitoso!', icon:" success", timer: 1000});
  
    } catch (error) {
      console.error('hubo un error al crear el usuario', error.message);
      setUserDuplicado(error.message);
    }
  }

  return (
    <>
      <h1
        css={css`
          margin-top: 5rem;
          text-align: center;
        `}
      >
        Crear Cuenta
      </h1>
      <Formulario onSubmit={handleSubmit} noValidate>
        <Campo>
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            name='nombre'
            id='nombre'
            placeholder='Tu nombre'
            value={nombre}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Campo>
        {error.nombre && <Error>{error.nombre}</Error>}
        <Campo>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Tu  email'
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Campo>
        {error.email && <Error>{error.email}</Error>}

        <Campo>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Tu contraseña'
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Campo>

        {error.password && <Error>{error.password}</Error>}

        <InputSubmit type='submit' value='Crear Cuenta' />
      </Formulario>
      ya tenes una cuenta? <a>ingresa aqui</a>
    </>
  );
};
export default CrearCuentaAlerta;

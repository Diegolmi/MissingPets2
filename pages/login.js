/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Router from 'next/router';
import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
 
} from "../components/ui/Formulario";
import  Boton  from '../components/ui/Boton'
import firebase from "../firebase/firebase";

import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";


 const Login = () => {

  const [userDuplicado, setUserDuplicado] = useState(false)

  const STATE_INICIAL = {
    email: "",
    password: "",
  };
  const {
    valores,
    error,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const {  email, password } = valores;

  async function iniciarSesion() {
    try {
     await firebase.login(email, password);
    
      Router.push('/');
    } catch (error) {
      console.error('hubo un error al autenticar el usuario', error);
      setUserDuplicado(error.message);
    }
  }
  async function authGoogle() {
    try {
      await firebase.loginGoogle()
      Router.push('/');
    } catch (error) {
      console.log(error)
    }
  }
  async function authFacebook() {
    try {
      await firebase.loginFacebook()
      Router.push('/');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              margin-top: 5rem;
              text-align: center;
            `}
          >
            Iniciar Sesíon
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
          
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Tu  email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {error.email && <Error>{error.email}</Error>}

            <Campo>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {error.password && <Error>{error.password}</Error>}


            <InputSubmit type="submit" value="Iniciar Sesion" />
          </Formulario>
          <Boton  onClick={authGoogle}>Google</Boton>
          <Boton onClick={authFacebook}>Facebook</Boton>

        </>
      </Layout>
    </div>
  );
};
export default Login
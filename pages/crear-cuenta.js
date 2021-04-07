/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Router from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from '../components/ui/Formulario';

import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

import firebase from '../firebase/firebase';
import { Card } from 'react-bootstrap';
import ButtonGoogle from '../components/ui/BotonGoogle';
import ButtonFacebook from '../components/ui/BotonFacebook';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: '',
};
const CrearCuenta = () => {
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

      Router.push('/');
    } catch (error) {
      console.error('hubo un error al crear el usuario', error.message);
      setUserDuplicado(error.message);
    } finally {
      await firebase.enviarEmail();
    }
  }
  async function authGoogle() {
    try {
      await firebase.loginGoogle();
      Router.push('/');
    } catch (error) {
      // console.log(error);
    }
  }
  async function authFacebook() {
    try {
      await firebase.loginFacebook();
      Router.push('/');
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <>
      <Layout>
        <div className='contenedorCard'>
          <Card className='cardLogin'>
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
            <div
                className="contenedorLoginRedes"
              >
                <span
                  css={css`
                    margin: 10px;
                  `}
                >
                  {' '}
                  O BIEN{' '}
                </span>
                <ButtonGoogle onClick={authGoogle}>Google</ButtonGoogle>
                <ButtonFacebook onClick={authFacebook}>Facebook</ButtonFacebook>
              </div>
          </Card>
        </div>
      </Layout>
    </>
  );
};
export default CrearCuenta;

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
import firebase from '../firebase/firebase';
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';
import { Card, Container } from 'react-bootstrap';
import ButtonGoogle from '../components/ui/BotonGoogle';
import ButtonFacebook from '../components/ui/BotonFacebook';
import Link from 'next/link';

const Login = () => {
  const [userDuplicado, setUserDuplicado] = useState(false);

  const STATE_INICIAL = {
    email: '',
    password: '',
  };
  const {
    valores,
    error,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

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
        <Container fluid className='containerLogin'>
          <div className='contenedorCard'>
            <Card className='cardLogin'>
              <h1
                css={css`
                  margin-top: 5rem;
                  text-align: center;
                `}
              >
                Iniciar Sesión
              </h1>
              <Formulario onSubmit={handleSubmit} noValidate>
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

                <InputSubmit type='submit' value='Iniciar Sesion' />
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
              <hr />
              <Link href='/recupero'>¿No recordas la contraseña?</Link>
            </Card>
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default Login;

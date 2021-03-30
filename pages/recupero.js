/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from '../components/ui/Formulario';
import useValidacion from '../hooks/useValidacion';

import firebase from '../firebase/firebase';
import { Card } from 'react-bootstrap';

const Recupero = () => {
  
  const {email} = valor 
  
  async function resetPass(emailAddress) {
    
    await firebase.forgot(emailAddress);
  }

  return (
    <>
      <Layout>
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Card
            css={css`
              box-shadow: 10px 10px 49px -23px rgba(0, 0, 0, 0.75);
              width: 30%;
              height: 800px;
            `}
          >
            <h1
              css={css`
                margin-top: 5rem;
                text-align: center;
              `}
            >
              Recuperar la contraseña
            </h1>
            <Formulario onSubmit={resetPass}>
              <Campo>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Tu  email'
                
                  value={email}
                />
              </Campo>
              {/* {error.email && <Error>{error.email}</Error>} */}

              <InputSubmit type='submit' value='Enviar Email' />
            </Formulario>
          </Card>
        </div>
      </Layout>
    </>
  );
};
export default Recupero;

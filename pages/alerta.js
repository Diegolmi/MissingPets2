// @ts-nocheck
import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from '../components/ui/Formulario';
import Link from 'next/link';
import Boton from '../components/ui/Boton';
import { FirebaseContext } from '../firebase';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarAlerta from '../validacion/validarAlerta';

const STATE_INICIAL = {
  nombre: '',
  raza: '',
  fecha: '',
  url: '',
  descripcion: '',
};

const Alerta = () => {
  const [error, guardarError] = useState(false);
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarAlerta, crearAlerta);

  const { nombre, raza, fecha, url, descripcion } = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const uploadTask = await firebase.storage
      .ref(`alertas/${image.lastModified}${image.name}`)
      .put(image);
    const downloadURL = await uploadTask.ref.getDownloadURL();
    return downloadURL;
  };

  async function crearAlerta() {
    // si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push('/login');
    }

    // crear el objeto de nuevo producto
    const alerta = {
      nombre,
      raza,
      url,
      urlimagen: await handleUpload(),
      descripcion,
      visitas: 0,
      fecha,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
    };

    // insertarlo en la bd
    await firebase.db
      .collection('alertas')
      .add(alerta)
      .then(() => {
        swal('Buen trabajo!', 'Alerta creada con exito!', 'success');
      });

    return router.push('/');
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              margin-left: 450px;
              text-align: center;
              margin-top: 5rem;
              font-weight: 700;
              text-transform: uppercase;
              padding: 0.8rem 2rem;
              width: 300px;
              background-color: #00bfbf;
              color: white;
            `}
          >
            Nueva Alerta
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend
                css={css`
                  font-size: 25px;
                `}
              >
                Información General{' '}
              </legend>

              <Campo>
                <label htmlFor='nombre'>Nombre</label>
                <input
                  type='text'
                  id='nombre'
                  placeholder='Nombre de la mascota'
                  name='nombre'
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  css={css`
                  font-size:15px;
                  box-shadow: 10px 10px 4px -8px rgba(0,0,0,0.75);
                  `}
                />
              </Campo>

              {error.nombre && <Error>{error.nombre}</Error>}

              <Campo>
                <label htmlFor='raza'>Raza</label>
                <input
                  type='text'
                  id='raza'
                  placeholder='Raza'
                  name='raza'
                  value={raza}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  css={css`
                  font-size:15px;
                  box-shadow: 10px 10px 4px -8px rgba(0,0,0,0.75);
                  `}
                />
              </Campo>

              {error.raza && <Error>{error.raza}</Error>}

              <Campo>
                <label htmlFor='fecha'> Fecha</label>
                 <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> 
              </Campo>

              <Campo>
                <label htmlFor='image'>Imagen</label>
                <input
                  type='file'
                  accept='image/*'
                  id='image'
                  name='image'
                  onInput={(e) => handleFile(e)}
                  css={css`
                  font-size:15px;
                  box-shadow: 10px 10px 4px -8px rgba(0,0,0,0.75);
                  `}
                />
              </Campo>

              {/* <Campo>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  placeholder="URL de tu alerta"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo> */}

              {/* {error.url && <Error>{error.url}</Error>} */}
              <Campo>
                <label htmlFor='descripcion'>Descripcion</label>
                <textarea
                  id='descripcion'
                  name='descripcion'
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  css={css`
                  font-size:15px;
                  box-shadow: 10px 10px 4px -8px rgba(0,0,0,0.75);
                  `}
                />
              </Campo>
              {error.descripcion && <Error>{error.descripcion}</Error>}
            </fieldset>

            {error && <Error>{error} </Error>}

            {usuario ? (
              <InputSubmit type='submit' value='Crear alerta' />
            ) : (
              !usuario && (
                <Link href='/crear-cuenta'>
                  <Boton
                    bgColor='true'
                    css={css`
                      margin-left: 200px;
                      text-align: center;
                      font-weight: 700;
                      text-transform: uppercase;
                      padding: 0.8rem 2rem;
                      width: 300px;
                    `}
                  >
                    Crear Cuenta
                  </Boton>
                </Link>
              )
            )}
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Alerta;

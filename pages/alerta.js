// @ts-nocheck
import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import swal from 'sweetalert';
import moment from 'moment';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from '../components/ui/Formulario';
import Link from 'next/link';
import Boton from '../components/ui/Boton';
import { FirebaseContext } from '../firebase';
import dynamic from 'next/dynamic';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarAlerta from '../validacion/validarAlerta';
import CrearCuenta from './crear-cuenta';
import CrearCuentaAlerta from './crear-cuenta-alerta';
moment.locale('es');

const STATE_INICIAL = {
  nombre: '',
  raza: '',
  date: '',
  url: '',
  descripcion: '',
};

const Alerta = () => {
  const [error, guardarError] = useState(false);
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [fileUrl, setFileUrl] = useState(
    'https://picsum.photos/150/150?random'
  );

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarAlerta, crearAlerta);

  const { nombre, raza, date, url, descripcion } = valores;

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
      date,
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
  function processImage(event) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  }

  const hoy = moment();
  console.log(hoy.format('dddd Do MMMM YYYY'));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Layout>
        <Container
          css={css`
            padding: 20px;
          `}
          fluid
        >
          <h1
            css={css`
              margin-left: 450px;
              text-align: center;
              margin-top: 5rem;
              font-weight: 700;
              text-transform: uppercase;
              padding: 0.8rem 2rem;
              width: 400px;
              background-color: #00bfbf;
              color: white;
            `}
          >
            Nueva Alerta
          </h1>
          <Row>
            <Row>
              <Col>
                <Card
                  css={css`
                    background-color: whitesmoke;
                    margin-top: 100px;
                    margin-left: 50px;
                  `}
                >
                  <img
                    css={css`
                      box-shadow: 10px 10px 4px -8px rgba(0, 0, 0, 0.75);
                      margin-top: 100px;
                      width: 300px;
                      margin-left: 40px;
                      display: flex;
                      justify-content: space-around;
                    `}
                    src={fileUrl}
                    alt=''
                  />
                  <Campo>
                    <div
                      css={css`
                        margin-top: -400px;
                        margin-left: 400px;
                        color: black;
                      `}
                    >
                      <h2>{nombre}</h2>
                      <span>Se perdio el dia {date} en la zona de ....</span>
                    </div>
                  </Campo>
                  <div
                    css={css`
                      margin-left: 50px;
                      color: black;
                    `}
                  >
                    <h4 htmlFor=''>Descripcion:</h4>
                    <span>{descripcion}</span>
                  </div>
                  <div
                    css={css`
                      margin-top: 100px;
                    `}
                  >
                    <hr />
                    <span
                      css={css`
                        display: flex;
                        text-align: center;
                        justify-content: center;
                        padding: 15px;
                      `}
                    >
                      Missing.Pets Lo viste? Contactate a hola@missing.pets
                    </span>
                  </div>
                </Card>
              </Col>
            </Row>
            <Col>
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
                        font-size: 15px;
                        box-shadow: 10px 10px 4px -8px rgba(0, 0, 0, 0.75);
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
                        font-size: 15px;
                        box-shadow: 10px 10px 4px -8px rgba(0, 0, 0, 0.75);
                      `}
                    />
                  </Campo>

                  {error.raza && <Error>{error.raza}</Error>}

                  <Campo>
                    <label htmlFor='date'> Fecha</label>
                    {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} />  */}
                    <input
                      type='date'
                      name='date'
                      value={date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                  </Campo>
                  <Campo>
                    <Form.Control size='sm' as='select'>
                      <option>Small select</option>
                    </Form.Control>
                  </Campo>
                  <Campo>
                    <label htmlFor='image'>Imagen</label>
                    <input
                      type='file'
                      accept='image/*'
                      id='image'
                      name='image'
                      onInput={(e) => handleFile(e)}
                      onChange={processImage}
                      css={css`
                        font-size: 15px;
                        box-shadow: 10px 10px 4px -8px rgba(0, 0, 0, 0.75);
                        margin-top: 20px;
                        width: 100px;
                        margin-left: 20px;
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
                  <Campo>{/* <MapView /> */}</Campo>
                  <Campo>
                    <label htmlFor='descripcion'>Descripcion</label>
                    <textarea
                      id='descripcion'
                      name='descripcion'
                      value={descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      css={css`
                        font-size: 15px;
                        box-shadow: 10px 10px 4px -8px rgba(0, 0, 0, 0.75);
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
                    <Boton
                      variant='primary'
                      css={css`
                        margin-top: 5rem;
                        text-align: center;
                        background-color: red;
                        color: white;
                        margin-left: 250px;
                      `}
                      onClick={handleShow}
                    >
                      Continuar
                    </Boton>
                  )
                )}
              </Formulario>
            </Col>
          </Row>
        </Container>
      </Layout>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Registrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CrearCuentaAlerta />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Alerta;

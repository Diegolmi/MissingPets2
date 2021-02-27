import React, { useState, useContext } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import { FirebaseContext } from "../firebase";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarAlerta from "../validacion/validarAlerta";

const STATE_INICIAL = {
  nombre: "",
  raza: "",
  url: "",
  descripcion: "",
};

const Alerta = () => {
  const [error, guardarError] = useState(false);
  const [image, setImage] = useState(null);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarAlerta, crearAlerta);

  const { nombre, raza, url, descripcion } = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  console.log(usuario);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
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
      return router.push("/login");
    }

    // crear el objeto de nuevo producto
    const alerta = {
      nombre,
      raza,
      url,
      urlimagen: await handleUpload(),
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      //haVotado: [],
    };

    // insertarlo en la bd
    await firebase.db.collection("alertas").add(alerta);

    return router.push("/");
  }
 
  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
            margin-left:450px;
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
                Información General{" "}
              </legend>

              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre de la mascota"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {error.nombre && <Error>{error.nombre}</Error>}

              <Campo>
                <label htmlFor="raza">Raza</label>
                <input
                  type="text"
                  id="raza"
                  placeholder="Raza"
                  name="raza"
                  value={raza}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {error.raza && <Error>{error.raza}</Error>}

              <Campo>
                <label htmlFor="image">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  onInput={(e) => handleFile(e)}
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
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {error.descripcion && <Error>{error.descripcion}</Error>}
            </fieldset>

            {error && <Error>{error} </Error>}

            <InputSubmit type="submit" value="Crear alerta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Alerta;

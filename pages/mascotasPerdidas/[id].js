// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
import swal from 'sweetalert';


const mascotasPerdidas = () => {
  const [dataMascota, setDataMascota] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});
  const [consultarDB, setConsultarDB] = useState(true);

  const ContenedorMascota = styled.div`
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 2fr 1fr;
      column-gap: 2rem;
    }
  `;
  const EsCreador = styled.p`
    padding: 0.5rem 2rem;
    background-color: #da552f;
    color: #ffff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
  `;

  //routing id

  const router = useRouter();
  const {
    query: { id },
  } = router;

  //context firebase

  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerMascota = async () => {
        const mascotaQuery = await firebase.db.collection("alertas").doc(id);
        const dataMascota = await mascotaQuery.get();
        setDataMascota(dataMascota.data());
        if (dataMascota.exists) {
          setDataMascota(dataMascota.data());
          setConsultarDB(false);
        } else {
          setError(true);
        }
      };
      obtenerMascota();
    }
  }, [id]);



  if (Object.keys(dataMascota).length === 0 && !error) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    nombre,
    url,
    urlimagen,
    creador,
    raza,
    imagePath,
    visitas
  } = dataMascota;

 
  //funcion comentario

  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  const creadorComentario = (id) => {
    if (creador.id === id) {
      return true;
    }
  };
  const agregarComentario = (e) => {
    e.preventDefault();
    if (!usuario) {
      return router.push("/login");
    }

    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    //agregar comentario
    const nuevosComentarios = [...comentarios, comentario];

    firebase.db.collection("alertas").doc(id).update({
      comentarios: nuevosComentarios,
    });

    setDataMascota({
      ...dataMascota,
      comentarios: nuevosComentarios,
    });
    setConsultarDB(true);
  };

  const puedeBorrar = () => {
    if (!usuario) return false;
    if (creador.id === usuario.uid) {
      return true;
    }
  };

  const eliminarAlerta = async () => {
    // if (!usuario) {
    //   return router.push("/login");
    // }

    //  if (creador.id === usuario.uid) {
    //    return router.push("/");
    //  }
    try {
      
      await firebase.db.collection("alertas").doc(id).delete().then(() => {
        
        swal({
          title: "Seguro quiere eliminar esta alerta?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Alerta eliminada con exito!!", {
              icon: "success",
            });
          } else {
            swal("Su alerta no fue eliminada");
          }
        });
      })
      // await firebase.storage.ref(`alertas/${imagePath}`).delete();
      
     router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {nombre}
            </h1>
            <ContenedorMascota>
              <div>
                <p>{visitas} personas han visto esta busqueda</p>
                <p>
                  Publicado hace{" "}
                  {formatDistanceToNow(new Date(creado), { locale: es })}
                  <p>Por: {creador.nombre}</p>
                </p>
                <img
                  src={urlimagen}
                  alt=""
                  css={css`
                    max-width: 300px;
                  `}
                />
                <p>{descripcion}</p>
                {usuario && (
                  <>
                    <h2>Agregar Comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input
                          type="text"
                          name="mensaje"
                          onChange={comentarioChange}
                        />
                      </Campo>
                      <InputSubmit type="submit" value="Agregar comentario" />
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {comentarios.length === 0 ? (
                  "Aun no hay comentarios"
                ) : (
                  <ul>
                    {comentarios.map((comentario, i) => {
                      return (
                        <li
                          key={`${comentario.usuarioId}-${i}`}
                          css={css`
                            border: 1px solid #e1e1e1;
                            padding: 1rem;
                          `}
                        >
                          <p>{comentario.mensaje}</p>
                          <p>
                            {" "}
                            Escrito por:
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {" "}
                              {comentario.usuarioNombre}
                            </span>
                          </p>
                          {creadorComentario(comentario.usuarioId) && (
                            <EsCreador>Creador</EsCreador>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <aside></aside>
            </ContenedorMascota>
            {puedeBorrar() && (
              <Boton onClick={eliminarAlerta}>Eliminar Alerta</Boton>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default mascotasPerdidas;

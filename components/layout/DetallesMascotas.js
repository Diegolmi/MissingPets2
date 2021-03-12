import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";
import Boton from "../ui/Boton";

const Mascotas = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;
const DescripcionMascotas = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;
const Titulo = styled.a`
  font-weight: bold;
  font-size: 2rem;
  margin: 0px;
  :hover {
    cursor: pointer;
  }
`;

const TituloMascota = styled.p`
  font-size: 1rem;
  margin: 0px;
`;

const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 1rem;
  }
  img {
    width: 1rem;
    margin-right: 1rem;
  }
  p {
    font-size: 1rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0px;
    }
  }
`;


const Imagen = styled.img`
  width: 200px;
`;


const DetallesMascotas = ({ mascota, numeroVisitas }) => {
  const {
    id,
    comentarios,
    creado,
    descripcion,
    nombre,
    urlimagen,
    raza,
    date,
    visitas
  } = mascota;

  
  return (
    <Mascotas>
      <DescripcionMascotas>
        <div>
          <Imagen src={urlimagen} />
        </div>
        <div>
          <Link href="/mascotasPerdidas/[id]" as={`/mascotasPerdidas/${id}`}>
            <Titulo onClick={() => numeroVisitas(visitas, id)}>{nombre}</Titulo>
          </Link>
          <TituloMascota>{descripcion}</TituloMascota>
          <p>Se perdio el {date} en la zona de Palermo.</p>
          <Comentarios>
            <div>
              <img src="/static/img/comentario.png" alt="" />
              <p>{comentarios.length} Comentarios</p>
            </div>
          </Comentarios>
          <p>
            Publicado hace{" "}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </p>
        </div>
      </DescripcionMascotas>
   
    </Mascotas>
  );
};

export default DetallesMascotas;

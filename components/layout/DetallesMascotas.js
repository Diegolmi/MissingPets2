import React from 'react';
import styled from '@emotion/styled';
import { FaRegEye } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import Boton from '../ui/Boton';
import { Row, Col } from 'react-bootstrap';

const Mascotas = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;
const DescripcionMascotas = styled.div`
  flex: 0 1 300px; 
  display: grid;
  /* grid-template-columns: 1fr 3fr; */
  column-gap: 3rem;
  height: 450px;
`;
const Titulo = styled.a`
  font-weight: bold;
  font-size: 2rem;
  margin: 0px;
  text-decoration: none;
  color: black;
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
  width: 300px;
  height: 250px;
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
    zona,
    visitas,
  } = mascota;

  return (
    <Mascotas>
      <DescripcionMascotas>
      
        <div>
          <Imagen src={urlimagen} />
        </div>
        <div>
          <Link href='/mascotasPerdidas/[id]' as={`/mascotasPerdidas/${id}`}>
            <Titulo onClick={() => numeroVisitas(visitas, id)}>{nombre}</Titulo>
          </Link>
          <TituloMascota>{descripcion}</TituloMascota>
          <p><FaRegEye /> Última vez visto {date}</p>
          <p> <ImLocation2 />En {zona} </p>
          {/* <Comentarios>
            <div>
              <img src='/static/img/comentario.png' alt='' />
              <p>{comentarios.length} Comentarios</p>
            </div>
          </Comentarios> */}
          <p>
            Publicado hace{' '}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </p>
        </div>
       
      </DescripcionMascotas>
    </Mascotas>
  );
};

export default DetallesMascotas;

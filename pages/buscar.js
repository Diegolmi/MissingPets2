import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import DetallesMascotas from '../components/layout/DetallesMascotas';
import Home from '../pages/index';
const Buscar = () => {

  const router = useRouter();
  const { query: { q }} = router;

  const { mascotas } = Home()
  const [ resultado, guardarResultado ] = useState([]);

  console.log(mascotas)

  useEffect(() => {
    const busqueda = q.toLoweCase();
    const filtro =  mascotas.filter(mascota => {
      return (
        mascota.nombre.toLowerCase().includes(busqueda) || 
        mascota.descripcion.toLowerCase().includes(busqueda)
      )
    });
    guardarResultado(filtro);
    
}, [ q, mascotas ]);

return (
    <div>
      <Layout>

      <h1>Buscar</h1>
      </Layout>

     
    </div>
  )
}
export default Buscar
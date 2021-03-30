import { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {FirebaseContext, firebase}  from "../firebase/index";
import DetallesMascotas from "../components/layout/DetallesMascotas";
import firebaseConfig from "../firebase/config";
import dynamic from "next/dynamic";


const Home = () => {
  const [mascotas, setMascotas] = useState([]);

  // const { firebase } = useContext(FirebaseContext);
  console.log(firebase)
  const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false
  });

  useEffect(() => {
    const obtenerMascotas = () => {
      console.log(firebase)
      firebase.db
        .collection("alertas")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapShot);
    };

    obtenerMascotas();
  }, []);

  function manejarSnapShot(snapshot) {
    const mascotas = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setMascotas(mascotas);
  }
  const {
    id
  } = mascotas

  // const agregarVisitas = (e) => {
    
  //   //agregar comentario
  //   const nuevaVisita = [...visitas, visita];

  //   firebase.db.collection("alertas").doc(id).update({
  //     visitas: nuevaVisita,
  //   });

  //   setMascotas({
  //     ...mascotas,
  //     visitas: nuevaVisita,
  //   });
    
  // };
  const numeroVisitas = (visita, id) => {
    if(!id){
      return false
    }
    const totalVisitas = visita + 1;

    firebase.db.collection("alertas").doc(id).update({
      visitas: totalVisitas,
    });
    
  }

  return (
    <div>
      <Layout>
        <div className="listado-mascotas">
          <div className="contenedor">
            <ul className="bg-white">
              {mascotas.map((mascota) => (
                <DetallesMascotas key={mascota.id} mascota={mascota} numeroVisitas={numeroVisitas} />
              ))}
            </ul>
          </div>
        </div>
        <div id="map">
         <MapWithNoSSR />
      </div>
      </Layout>
    </div>
  );
};
export default Home;

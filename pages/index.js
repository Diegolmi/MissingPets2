import { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {FirebaseContext, firebase}  from "../firebase/index";
import DetallesMascotas from "../components/layout/DetallesMascotas";
import firebaseConfig from "../firebase/config";
import dynamic from "next/dynamic";
import { Row, Col, Container, Card } from "react-bootstrap";


const Home = () => {
  const [mascotas, setMascotas] = useState([]);

  // const { firebase } = useContext(FirebaseContext);
  // console.log(firebase)
  const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false
  });

  useEffect(() => {
    const obtenerMascotas = () => {
      // console.log(firebase)
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

   const numeroVisitas = (visita, id) => {
    if(!id){
      return false
    }
    const totalVisitas = visita + 1;

    firebase.db.collection("alertas").doc(id).update({
      visitas: totalVisitas,
    });
    
  }
  // style={{display:"grid", gridTemplateColumns:"repeat( auto-fill, minmax(350px,1fr))", gap: 20}}
  return (
    <>
      <Layout>
        <Container fluid className="listado-mascotas"> 
          <div className="contenedor">
            <ul>
              {mascotas.map((mascota) => (
                <Row>
                  <Col className="detallesMascotas">
                  <DetallesMascotas  key={mascota.id} mascota={mascota} numeroVisitas={numeroVisitas} />
                  </Col>
                  
                </Row>
              ))}
            </ul>
          </div>
         </Container>
        {/* <div id="map">
         <MapWithNoSSR />
      </div> */}
      </Layout>
    </>
  );
};
export default Home;

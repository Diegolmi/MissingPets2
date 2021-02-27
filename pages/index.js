import { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import DetallesMascotas from "../components/layout/DetallesMascotas";
import firebaseConfig from "../firebase/config";

const Home = () => {
  const [mascotas, setMascotas] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerMascotas = () => {
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

  return (
    <div>
      <Layout>
        <div className="listado-mascotas">
          <div className="contenedor">
            <ul className="bg-white">
              {mascotas.map((mascota) => (
                <DetallesMascotas key={mascota.id} mascota={mascota} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Home;

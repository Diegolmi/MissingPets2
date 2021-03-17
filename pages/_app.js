import App from "next/app";
import firebase from "../firebase";
import FirebaseContext from "../firebase/context";
import useAutenticacion from "../hooks/useAutenticacion";
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = (props) => {
  const usuario = useAutenticacion();

  const { Component, pageProps } = props;

  return (
    <FirebaseContext.Provider value={{ firebase, usuario }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;

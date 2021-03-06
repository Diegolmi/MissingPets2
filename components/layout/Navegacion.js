import Link from "next/link";
import React, { useContext } from "react";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase/index";

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: "PT Sans", sans-serif;
    text-decoration: none;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navegacion = () => {
  const { usuario } = useContext(FirebaseContext);
  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/albergues">Albergues</Link>
      <Link href="/alerta">Alerta</Link>
    </Nav>
  );
};

export default Navegacion;

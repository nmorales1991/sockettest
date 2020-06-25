import React, { useState } from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
  const [usuario, setusuario] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Usuario"
        onChange={e => setusuario(e.target.value)}
        name="usuario"
      />
      <Link
        onClick={e => (!usuario ? e.preventDefault() : null)}
        to={{ pathname: "/chat", state: {usuario } }}
      >
        <input type="button" value="Entrar" />
      </Link>
    </div>
  );
};

export default Inicio;

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Mensajes from "../components/Mensajes";
import {withRouter} from 'react-router-dom'

const Chat = (props) => {
  
  
  const [mensaje, setmensaje] = useState("");
  const [chat, setchat] = useState([]);
  const socket = io("http://192.168.0.5:3001");

  useEffect(() => {
    socket.on("enviarMensaje", data => {
      console.log(data)
      setchat([...chat, data]);
    });
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [chat]);

  const enviarMensaje = e => {
    e.preventDefault();
    const data = {
      usuario: props.location.state.usuario,
      mensaje
    };

    socket.emit("enviarMensaje", data);
    setmensaje("");
  };
  return (
    <div>
        <h2>Hola {props.location.state.usuario}</h2>
      <form onSubmit={e => enviarMensaje(e)}>
        <div className="mensajes">
          {chat.length > 0 &&
            chat.map(mensaje => <Mensajes mensaje={mensaje} usuario={props.location.state.usuario}/>)}
        </div>
        <input
          type="text"
          name="mensaje"
          onChange={e => setmensaje(e.target.value)}
          value={mensaje}
          placeholder="Escriba su mensaje"
        />
      </form>
    </div>
  );
};

export default withRouter(Chat);

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Mensajes from "../components/Mensajes";
import {withRouter} from 'react-router-dom'

const Chat = (props) => {
  const socket = io("http://192.168.0.7:3000");
  console.log(socket)
  const [mensaje, setmensaje] = useState("");
  const [chat, setchat] = useState([]);

  useEffect(()=>{
    socket.on('connect', function() {
      console.log('Socket connected!');
      let code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
      console.log(code)
      socket.emit('join',{code: code});
    });
    
  },[])
  /*useEffect(() => {
    console.log("useeffect")
    socket.on("enviarMensaje", data => {
      setchat([...chat, data]);
    });
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [chat]);*/

  const enviarMensaje = e => {
    e.preventDefault();
    /*const data = {
      usuario: props.location.state.usuario,
      mensaje
    };*/

    //socket.emit("enviarMensaje", data);
    socket.emit("sync")
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
        <input type="submit" value="Enviar" />
        <input type="button" value="Arriba" onClick={()=>socket.emit('up')}/>
        <input type="button" value="Abajo" onClick={()=>socket.emit('down')}/>
        <input type="button" value="Izquierda" onClick={()=>socket.emit('left')}/>
        <input type="button" value="Derecha" onClick={()=>socket.emit('right')}/>
        <input type="button" value="Terminar" onClick={()=>socket.emit('end')}/>
      </form>
    </div>
  );
};

export default withRouter(Chat);

import React from 'react'
import ReactEmoji from 'react-emoji';

const Mensajes = ({mensaje,usuario}) => {
    return (
        <div>
            <p className={usuario===mensaje.usuario?'mensajePropio':'mensajeExterno'}>{mensaje.usuario} : {ReactEmoji.emojify(mensaje.mensaje)}</p>
        </div>
    )
}

export default Mensajes

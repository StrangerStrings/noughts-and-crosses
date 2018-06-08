import React from 'react'

const Square = (props) => {
  return (
    <div className="outbox"
      onClick={ (e)=>
        {props.changeSquare(1,props.name.replace(/sq/,''))}}
    >
      {props.squareState==1 && <div className="ball"></div>}
      {props.squareState==2 && <div className="box"></div>}
      {props.squareState==3 && <div className="ball-win"></div>}
      {props.squareState==4 && <div className="box-win"></div>}
      {props.squareState==5 && <div className="ball-draw"></div>}
      {props.squareState==6 && <div className="box-draw"></div>}
    </div>
  );
}


export default Square

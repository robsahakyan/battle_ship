import React, { useEffect, useState } from 'react';
import "./cell.css"

export const Cell = ({shipsCoordinates,firedPlaces,...props}) => {
    let initialState = {
        isThereShip: (shipsCoordinates.find((item) => (item.x === props.x && item.y === props.y))) ? {x: props.x , y: props.y} : false,
        fired: (firedPlaces.find((item) => (item.x === props.x && item.y === props.y))) ? true : false,
        x: props.x,
        y: props.y
    }
    let rowLetters = ["A","B","C","D","E","F","G","H","I","J"];
    const [fireHandler,setFireHandler] = useState(null);
    const [isDisabled,setToDisable] = useState(false);
    const [firedShip,setFiredShip] = useState(null);
    useEffect(() => {
        props.toShootAC(fireHandler);
    },[fireHandler])
    useEffect(()=> {
        props.setFiredShips(firedShip);
    },[firedShip])

    const fireHandlerEv = (e) => {
        let arr = e.target.id.split(",");
        let myFires = {   
            x: arr[0],
            y: +arr[1],
            side: arr[2]
        }
        let opponentsFires = {
            x: rowLetters[Math.floor(Math.random() * 10)],
            y: Math.floor(Math.random() * 10 + 1),
            side: "myCells"
        }
        setFireHandler([myFires,opponentsFires]);
        setFiredShip([opponentsFires,myFires]);
        setToDisable(true)
    }

    return (props.side === "opponentsCells" ?
        initialState.isThereShip ?
            <button className={initialState.fired ? "firedShip" : "opponentsCell"} id = {`${initialState.x},${initialState.y},${props.side}`} onClick={(e) => (fireHandlerEv(e))} disabled={isDisabled}>
            </button> :
            <button className={initialState.fired ? "fired" : "opponentsCell"} id = {`${initialState.x},${initialState.y},${props.side}`}  onClick={(e) => (fireHandlerEv(e))} disabled={isDisabled}>
            </button> :
        initialState.isThereShip ? 
            <button className={initialState.fired ? "firedMyShip" : "unFiredShip"} id = {`${initialState.x},${initialState.y},${props.side}`} disabled>
            </button> :
            <button className={initialState.fired ? "fired" : "myCell"} disabled >
            </button>
    )
}
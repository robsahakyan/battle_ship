import React from 'react';
import { Cell } from './cell.jsx';
import "./myGridArea.css"

export const MyGridArea = (props) => {
    let coordinates = [];
    let myCells = "myCells";
    let shipsCoordinates = props.myShipCoordinates ?? [];
    let firedPlaces = props.firedPlaces ?? [];
    let columnLength =  10;
    let rowLetters = ["A","B","C","D","E","F","G","H","I","J"];
    
    for (let i = 0; i < rowLetters.length; i++) {
        for (let j = 1; j <= columnLength; j++) {
            coordinates.push({x: rowLetters[i] ,y: j })
        }
    }
    return (
        <>
            {
            coordinates.map(cell => {
                return(
                <Cell shipsCoordinates={shipsCoordinates}
                      firedPlaces={firedPlaces} 
                      side={myCells} 
                      x ={cell.x} 
                      y ={cell.y} 
                      key= {`${cell.x} ${cell.y}`}
                      toShootAC = {props.toShootAC}
                      setFiredShips = {props.setFiredShips}
                      />
                ) 
            })      
            }
        </>
    )
    }
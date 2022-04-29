import React from 'react';
import { Cell } from './cell.jsx';
import "./opponentsGridArea.css"

export const OpponentsGridArea = (props) => {
   // console.log(props);
    let coordinates = [];
    let opponentsCells = "opponentsCells";
    let shipsCoordinates = props.opponentsShipsCoordinates ?? [];
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
                <Cell shipsCoordinates = {shipsCoordinates}
                      firedPlaces = {firedPlaces} 
                      side = {opponentsCells} 
                      x = {cell.x} 
                      y = {cell.y} 
                      key = {`${cell.x} ${cell.y}`}
                      toShootAC = {props.toShootOpponentAC}
                      setFiredShips = {props.setFiredShips}
                      />
                ) 
            })      
            }
        </>
    )
    }
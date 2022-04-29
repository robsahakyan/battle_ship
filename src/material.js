let materials = {
    count: 9,
    quatro: 4,
    trio: 3,
    duo: 2,
    uno: 1
}

let materialsArray = ["quatro","trio","trio","duo","duo","duo","uno","uno","uno"];
let rowLetters = ["A","B","C","D","E","F","G","H","I","J"];

export function setMaterial(shipsCount,occupiedCoordinates,shipCoordinates) {
    let count = 9;
        let coordinatesForShip = chooseCoordinate(materialsArray[count - shipsCount],occupiedCoordinates,shipCoordinates);
            if (!shipsCount) {
                return coordinatesForShip
            }       
            if (coordinatesForShip) {
                return setMaterial(shipsCount - 1,coordinatesForShip.occupiedCoordinates,coordinatesForShip.shipCoordinates)
            } else {
                return;
            }
    }
  

function chooseCoordinate(currentMaterial,occupiedCoordinates,shipCoordinates) {
    let subNum = 11;
    let sub = subNum - materials[currentMaterial];
    let shipCoordinate = {
        x: rowLetters[Math.floor(Math.random() * (sub - 1) + 1)],
        y: Math.floor(Math.random() * 10 + 1)
    }
    let newShipCoordinate = [];
   
    for (let i = rowLetters.indexOf(shipCoordinate.x); i < rowLetters.indexOf(shipCoordinate.x) + materials[currentMaterial]; i++) {
        newShipCoordinate.push({x: rowLetters[i] ,y: shipCoordinate.y});
    }
        for (let i = 0; i < newShipCoordinate.length; i++) {
            for (let j = 0; j < occupiedCoordinates.length; j++) {
                if (newShipCoordinate[i].x === occupiedCoordinates[j].x && newShipCoordinate[i].y === occupiedCoordinates[j].y) {
                    return chooseCoordinate(currentMaterial,occupiedCoordinates,shipCoordinates);
                }
            }
        }
   
    for (let i = rowLetters.indexOf(shipCoordinate.x) - 1; i < materials[currentMaterial] + rowLetters.indexOf(shipCoordinate.x) + 1; i++) {
        for (let j = shipCoordinate.y - 1; j < shipCoordinate.y + 2; j++) {
            occupiedCoordinates.push({x: rowLetters[i] ,y: j })
        }
    }
        return {shipCoordinates: [...shipCoordinates, ...newShipCoordinate],occupiedCoordinates}
}
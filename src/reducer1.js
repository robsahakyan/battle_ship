const TO_SHOOT = "TO_SHOOT";
const SET_SHIPS = "SET_SHIPS";
const SET_OCCUPIED_POSITIONS = "SET_OCCUPIED_POSITIONS";
const SET_FIRED_SHIPS = "SET_FIRED_SHIPS";

let initialState = {
    allFires: [],
    myShipCoordinates: [],
    occupiedCoordinates: [],
    myFiredShips: []
}

export const reducer1 = (state = initialState, action) => {
    switch(action.type) {
        case TO_SHOOT: 
            if (action.toFire && action.toFire[1].side === "myCells") {
                return {
                    ...state,
                    allFires: [
                        ...state.allFires,
                        action.toFire[1]
                    ]
                }
            }
        case SET_SHIPS:
            if(action.myShipCoordinates) {
                return {
                    ...state,
                    myShipCoordinates: [
                        ...state.myShipCoordinates,
                        ...action.myShipCoordinates
                    ]
                }
            }
        case SET_OCCUPIED_POSITIONS: 
            if(action.occupiedCoordinates) {
                let filtredObj = [];
                action.occupiedCoordinates.map((item) => {
                    if (item.x && item.y && item.y > 0 && item.y <= 10) {
                        if (action.occupiedCoordinates)
                        filtredObj.push(item);
                    }
                })
                return {
                    ...state,
                    occupiedCoordinates: [
                        ...state.occupiedCoordinates,
                        ...filtredObj
                    ]
                }
            }
        case SET_FIRED_SHIPS:
            if(action.newFiredCoordinate && action.newFiredCoordinate[0].side === "myCells") {
                if(state.myShipCoordinates.find((item) => (item.x === action.newFiredCoordinate[0].x && item.y === action.newFiredCoordinate[0].y)))
                return {
                    ...state,
                        myFiredShips: [
                        ...state.myFiredShips,
                        action.newFiredCoordinate[0]
                ]
            }
        }    
        default: 
            return state
    }
}

export const toShootAC = (toFire) => ({type: TO_SHOOT,toFire})
export const setShipsAC = (myShipCoordinates) => ({type: SET_SHIPS,myShipCoordinates})
export const setOccupiedPositionsAC = (occupiedCoordinates) => ({type: SET_OCCUPIED_POSITIONS,occupiedCoordinates})
export const setMyFiredShipsAC = (newFiredCoordinate) => ({type: SET_FIRED_SHIPS,newFiredCoordinate})
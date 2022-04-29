const TO_SHOOT = "TO_SHOOT";
const SET_OPPONENTS_SHIPS = "SET_OPPONENTS_SHIPS";
const SET_OPPONENTS_OCCUPIED_POSITIONS = "SET_OPPONENTS_OCCUPIED_POSITIONS";
const SET_FIRED_SHIPS = "SET_FIRED_SHIPS";

let initialState = {
    allOpponentsFires: [],
    opponentsShipsCoordinates: [],
    opponentsOccupiedCoordinates: [],
    opponentsFiredShips: []
}


export const reducer2 = (state = initialState, action) => {
    switch(action.type) {
        case TO_SHOOT: 
       // console.log(action.toFire);
            if (action.toFire && action.toFire[0].side === "opponentsCells") {
                return {
                    ...state,
                    allOpponentsFires: [
                        ...state.allOpponentsFires,
                        action.toFire[0]
                    ]
                }
            }
        case SET_OPPONENTS_SHIPS:
      // console.log(action.opponentsShipsCoordinates);
            if(action.opponentsShipsCoordinates) {
                return {
                    ...state,
                    opponentsShipsCoordinates: [
                        ...state.opponentsShipsCoordinates,
                        ...action.opponentsShipsCoordinates
                    ]
                }
            }
        case SET_OPPONENTS_OCCUPIED_POSITIONS: 
            
        //console.log(action.opponentsOccupiedCoordinates)

            if(action.opponentsOccupiedCoordinates) {
                let filtredObj = [];
                action.opponentsOccupiedCoordinates.map((item) => {
                    if (item.x && item.y && item.y > 0 && item.y <= 10) {
                        if (action.opponentsOccupiedCoordinates)
                        filtredObj.push(item);
                    }
                })
                return {
                    ...state,
                    opponentsOccupiedCoordinates: [
                        ...state.opponentsOccupiedCoordinates,
                        ...filtredObj
                    ]
                }
            }
        case SET_FIRED_SHIPS:
            if(action.newFiredCoordinate && action.newFiredCoordinate[1].side === "opponentsCells") {
                if(state.opponentsShipsCoordinates.find((item) => (item.x === action.newFiredCoordinate[1].x && item.y === action.newFiredCoordinate[1].y))) {
                    return {
                        ...state,
                            opponentsFiredShips: [
                                ...state.opponentsFiredShips,
                                action.newFiredCoordinate[1]
                            ]
                    }
                }
            }      
        default: 
            return state
    }
}

export const toShootOpponentAC = (toFire) => ({type: TO_SHOOT,toFire})
export const setOpponentsShipsAC = (opponentsShipsCoordinates) => ({type: SET_OPPONENTS_SHIPS,opponentsShipsCoordinates})
export const setOpponentsOccupiedPositionsAC = (opponentsOccupiedCoordinates) => ({type: SET_OPPONENTS_OCCUPIED_POSITIONS,opponentsOccupiedCoordinates})
export const setOpponentsFiredShipsAC = (newFiredCoordinate) => ({type: SET_FIRED_SHIPS,newFiredCoordinate})
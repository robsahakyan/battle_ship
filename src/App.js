import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { setMaterial } from './material';
import {VscDebugStart} from "react-icons/vsc"
import { MyGridArea } from './myGridArea';
import { OpponentsGridArea } from './opponentsGridArea';
import { setMyFiredShipsAC, setOccupiedPositionsAC, setShipsAC, toShootAC } from './reducer1';
import { setOpponentsFiredShipsAC, setOpponentsOccupiedPositionsAC, setOpponentsShipsAC, toShootOpponentAC } from './reducer2';
import store from './store';

function App(props) {
  let rowLetters = ["A","B","C","D","E","F","G","H","I","J"];
  const [myShips,setMyShips] = useState(null);
  const [myPositions,setMyOccupiedPositions] = useState(null);
  const [opponentsShips,setOpponentsShips] = useState(null);
  const [opponentsPositions,setOpponentsOccupiedPositions] = useState(null);
  const [winner,setWinner] = useState("");
  const overlayDiv = useRef(null);
  const winnerRef = useRef(null);

  useEffect(() => {
    props.setOccupiedPositionsAC(myPositions);
    props.setShipsAC(myShips);
    props.setOpponentsShipsAC(opponentsShips);
    props.setOpponentsOccupiedPositionsAC(opponentsPositions);
  },[myShips,opponentsShips])
  useEffect(() => {
    if(props.opponentsFiredShips.length === 19) {
      winnerRef.current.style.display = "block";
      setWinner("You win")
    }
    if (props.myFiredShips.length === 19) {
      winnerRef.current.style.display = "block";
      setWinner("Opponent wins")
    }
  },[props.opponentsFiredShips,props.myFiredShips])
  
  const startSavedGame = () => {
    console.log(window.localStorage)
    if (JSON.parse(window.localStorage.getItem("persistantState")) === null) {
        setShips();
    } else {
      let startGame = window.confirm("Do you want to continue the saved game?");
        if(startGame) {
          overlayDiv.current.style.display = "none";
        } else {
          window.localStorage.removeItem("persistantState");
          window.location.reload(false);
          if (JSON.parse(window.localStorage.getItem("persistantState")) === null) {
            setShips();
            
        }
        }
    }
  }
  const setShips = () => {
    overlayDiv.current.style.display = "none";
    let shipsCount = 9;
    let myCoordinatesForShip = setMaterial(shipsCount,props.occupiedCoordinates,props.myShipCoordinates);
      if (myCoordinatesForShip) {
          setMyShips(() => {
            return myCoordinatesForShip.shipCoordinates
          })
          setMyOccupiedPositions(() => {
            return myCoordinatesForShip.occupiedCoordinates
          })
    } 
    let opponentsCoordinatesForShip = setMaterial(shipsCount,props.opponentsOccupiedCoordinates,props.opponentsShipsCoordinates);
      if (opponentsCoordinatesForShip) {
          setOpponentsShips(() => {
            return opponentsCoordinatesForShip.shipCoordinates
          })
          setOpponentsOccupiedPositions(() => {
            return opponentsCoordinatesForShip.occupiedCoordinates
          })
    } 
  }
  const exitHandler = () => {
    let exit = window.confirm("Do you want to save current game?");
    if(!exit) {
      window.localStorage.removeItem("persistantState");
    } else {
      window.localStorage.setItem("persistantState",JSON.stringify(store.getState()));
    }
    window.location.reload(false);
  }
  return (
    <div className="App">
      <div className="headerPart">
         <button onClick={exitHandler}>
           EXIT
         </button>
         
      </div>
      <div className="sectionPart">
        <div className="usersSide">
            <div className='whoseGrid'>
                Your Grid
            </div>
            <div className='letterParts'>
              {rowLetters.map((letter) => {
                  return (<div key={letter}>
                    {letter}
                    </div>
                  )
                })}
            </div>
          <div className='gridAndNums'>
            <div className='nums'>
              {
                rowLetters.map((item,index) => {
                  return (<div key={index}>
                    {index + 1}
                   </div> )
                })
              }
            </div>
            <div className='usersGrid'>
                <MyGridArea 
                    myShipCoordinates = {props.myShipCoordinates} 
                    firedPlaces = {props.allFires} 
                    toShootAC = {props.toShootAC}
                    setFiredShips = {props.setMyFiredShipsAC}
                    />
            </div>
          </div>
        </div>
        <div className="opponentsSide">
          <div className='whoseGrid'>
              Opponents Grid
          </div>
          <div className='letterParts'>
              {rowLetters.map((letter) => {
                  return (<div key={letter}>
                    {letter}
                    </div>
                  )
                })}
          </div>
        <div className='gridAndNums'>
            <div className='nums'>
              {
                rowLetters.map((item,index) => {
                  return (<div key={index}>
                    {index + 1}
                   </div> )
                })
              }
            </div>
            <div className='opponentsGrid'>
              <OpponentsGridArea
                  opponentsShipsCoordinates = {props.opponentsShipsCoordinates}
                  firedPlaces = {props.allOpponentsFires}
                  toShootOpponentAC = {props.toShootOpponentAC}
                  setFiredShips = {props.setOpponentsFiredShipsAC}
                  />
            </div>
        </div>
         
        </div>
      </div>
      <div ref={overlayDiv} className="overlay" id='overlayDiv'>
       <div className='wrapParent'>
          <div className="wrapper">
            <h1>START THE GAME</h1>
            <button onClick={startSavedGame} className="startButton">
            <VscDebugStart/> 
            </button>
          </div>
       </div>
      </div>
      <div className="overlay2" ref={winnerRef}>
        <div className="wrapper2">
            {winner}
        </div>
      </div>
     
    </div>
  );
}

let mapStateToProps = (state) => ({
    allFires: state.reducer1.allFires,
    myShipCoordinates: state.reducer1.myShipCoordinates,
    occupiedCoordinates: state.reducer1.occupiedCoordinates,
    myFiredShips: state.reducer1.myFiredShips,
    allOpponentsFires: state.reducer2.allOpponentsFires,
    opponentsShipsCoordinates: state.reducer2.opponentsShipsCoordinates,
    opponentsOccupiedCoordinates: state.reducer2.opponentsOccupiedCoordinates,
    opponentsFiredShips: state.reducer2.opponentsFiredShips

})
export default connect(mapStateToProps,{
  toShootAC,
  setShipsAC,
  setOccupiedPositionsAC,
  setMyFiredShipsAC,
  toShootOpponentAC,
  setOpponentsShipsAC,
  setOpponentsOccupiedPositionsAC,
  setOpponentsFiredShipsAC
})(App)


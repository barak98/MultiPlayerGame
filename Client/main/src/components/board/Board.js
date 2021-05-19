import React from 'react'
import './board.css';
import Tile from "../tile/tile"
import black_checker from '../../assets/images/blackCheker.png'
import white_checker from '../../assets/images/whiteCheker.png'


const gameBoard =[1,2,3,4,5,6,7,8,9,10,11,12,24,23,22,21,20,19,18,17,16,15,14,13];


export default function GameBoard(){
    let boardTiles =[];

    for(let i =0 ;i<gameBoard.length;i++){
        
        boardTiles.push(<Tile number ={gameBoard[i]} black = {black_checker} white = {white_checker}/>);
    }

    return (
        <div  id='gameBoard'>

            {boardTiles}
        </div>
    
    );
}
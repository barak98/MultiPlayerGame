import { InputLabel } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";

import io from "socket.io-client";

const socket = io.connect("http://localhost:4000/");


export default function Dice() {
    var [number1, setNumber1] = useState();
   var [number2, setNumber2] = useState();

    
    function btnClick(){
        try {
            socket.open();
            socket.emit("emitRandom");
            socket.on("randomNumber", (num1, num2) => {
              // we get settings data and can do something with it
              setNumber1(num1) ;
              setNumber2(num2);
            })

          } catch (error) {
            console.log(error);
          }
          return () => {
            socket.close();
          };
    }
  
    useEffect(() => {
      try {
        socket.open();
        socket.emit("emitRandom");
        socket.on("randomNumber", (num1,num2) => {
          // we get settings data and can do something with it
          setNumber1(num1) ;
          setNumber2(num2);
        })

      } catch (error) {
        console.log(error);
      }
      // Return a callback to be run before unmount-ing.
      return () => {
        socket.close();
      };
    }, []); // Pass in an empty array to only run on mount.
  
    return (
        <>
            <p>{number1}  {number2}</p>
            <button onClick= {btnClick} >click</button>
        </>
    );
  }
  
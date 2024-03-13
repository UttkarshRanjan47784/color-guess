import React, { useEffect, useState } from 'react'
import winSong from "../assets/winsong.mp3"

export default function GameArea() {

    let [answer, setAnswer] = useState(null);
    let [options, SetOptions] = useState([]);
    let [showAnswer, setShowAnswer] = useState(false);
    let [winner, setWinner] = useState(false);
    let [audio, setAudio] = useState();   

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generateColorString () {
        let alphabets = [`a`, `b`, `c`, `d`, `e`, `f`];
        let options = [];
        let colorString, optionString;
        let temp;
        for (let i=0; i<4; i++){
            optionString = "#";
            for (let j=0; j<6; j++){
                temp = Math.floor(Math.random()*16);
                if (temp > 9)
                    optionString += alphabets[temp - 10];
                else
                    optionString += `${temp}`;
            }
            options.push(optionString);
            if (i == 0)
                colorString = optionString;
        }
        options = shuffleArray(options)
        setAnswer(colorString);
        SetOptions(options);
    }

    useEffect(()=>{
        generateColorString();
    }, []);

    let handleAnswer = (event) => {
        setShowAnswer(true);
        if (event.target.value == answer){
            setWinner(true);
            setAudio(new Audio(winSong));
        }
            
    }

    useEffect(()=>{
        if (audio) audio.play();
    }, [audio]);

    let handleReset = () => {
        setShowAnswer(false);
        setWinner(false);
        (audio)?audio.pause():null;
        generateColorString();
    }

  return (
    <div className='flex-col size-fit p-5 my-10 border-4 border-slate-900 justify-center items-center'>
        <div className='size-60 border-4 border-slate-900' style={{backgroundColor : answer}}></div>
        <div className='flex justify-between my-5'>
            <button 
            className={`border-4 ${(showAnswer)? null : `hover:bg-yellow-600`} p-5
            ${(showAnswer)?(options[0] == answer)?`border-green-700 bg-green-500`: `border-red-700 bg-red-500`: `border-slate-900`}`}
            onClick={(showAnswer)? null : handleAnswer} value={options[0]}>{options[0]}</button>
            <button 
            className={`border-4 ${(showAnswer)? null : `hover:bg-yellow-600`} p-5 
            ${(showAnswer)?(options[1] == answer)?`border-green-700 bg-green-500`: `border-red-700 bg-red-500`: `border-slate-900`}`}
            onClick={(showAnswer)? null : handleAnswer} value={options[1]}>{options[1]}</button>            
        </div>
        <div className='flex justify-between my-1'>
            <button 
            className={`border-4 ${(showAnswer)? null : `hover:bg-yellow-600`} p-5 
            ${(showAnswer)?(options[2] == answer)?`border-green-700 bg-green-500`: `border-red-700 bg-red-500`: `border-slate-900`}`}
            onClick={(showAnswer)? null : handleAnswer} value={options[2]}>{options[2]}</button>
            <button 
            className={`border-4 ${(showAnswer)? null : `hover:bg-yellow-600`} p-5 
            ${(showAnswer)?(options[3] == answer)?`border-green-700 bg-green-500`: `border-red-700 bg-red-500`: `border-slate-900`}`}
            onClick={(showAnswer)? null : handleAnswer} value={options[3]}>{options[3]}</button>        
        </div>
        {(showAnswer)? <div className='flex items-center my-3 justify-between'>
            <h1 className='text-lg'>{(winner)? `Correct Answer!` : `Incorrect Answer` }</h1>
            <button className='border-4 border-slate-900 p-3 rounded-full hover:bg-yellow-600'
            onClick={handleReset} >Reset</button>
        </div>  : null}
    </div>    
  )
}

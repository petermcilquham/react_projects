import { useState } from 'react';
import { nanoid } from 'nanoid';

import Confetti from 'react-confetti';

import Die from '~/components/tenzies/Die';

export function Tenzies() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const gameWon = dice.every((die) => die.isHeld) && dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({ value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }));
  }
  function rollDice() {
    setDice((prevDice) => prevDice.map((die) => (die.isHeld === true ? die : { ...die, value: Math.ceil(Math.random() * 6) })));
  }
  function holdDie(id: string) {
    setDice((prevDice) => prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)));
  }
  function newGame() {
    setDice(generateAllNewDice);
  }

  return (
    <div className='w-full bg-gray-800'>
      <main className='h-[100vh] flex flex-col justify-center items-center'>
        {gameWon && <Confetti numberOfPieces={600} initialVelocityY={20} />}
        <h1 className='text-[3rem] m-0'>Tenzies</h1>
        <p className='text-[1.5rem] font-400 mt-0 mb-5 text-center'>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        {gameWon && <p className='text-green mb-5'>Congrats! You won! This time...</p>}
        <div className='flex flex-row flex-wrap gap-[20px] mb-[40px] w-[350px]'>
          {dice.map((die, index) => {
            return <Die key={index} value={die.value} isHeld={die.isHeld} id={die.id} holdDie={holdDie} />;
          })}
        </div>
        <button onClick={gameWon ? newGame : rollDice} className='cursor-pointer bg-button-purple text-white text-[1.75rem] font-bold rounded-md px-5'>
          {gameWon ? 'New Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}

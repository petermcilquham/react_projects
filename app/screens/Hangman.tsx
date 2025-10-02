import { useState } from 'react';

import Confetti from 'react-confetti';

import { GameStatus } from '~/components/hangman/GameStatus';
import { Header } from '~/components/hangman/Header';
import { languages } from '~/components/hangman/languages';
import { getRandomWord } from '~/components/hangman/utils';
import Keyboard from '~/components/hangman/Keyboard';
import LanguageChips from '~/components/hangman/LanguageChips';
import Word from '~/components/hangman/Word';
import '~/components/hangman/hangman.css';

export function Hangman() {
  //state variables
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  //derived variables
  const wrongGuessCount = guessedLetters.filter((letter) => !currentWord.includes(letter)).length;
  const isGameWon = currentWord.split('').every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount === languages.length;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessWrong = !currentWord.includes(lastGuessedLetter) && lastGuessedLetter;
  //static variables
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  //functions
  function addGuessedLetter(letter: any) {
    setGuessedLetters((prevGuessedLetters) => {
      return !prevGuessedLetters.includes(letter) ? [...prevGuessedLetters, letter] : prevGuessedLetters;
    });
  }

  function newGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <Header />
      <GameStatus isGameOver={isGameOver} isGameWon={isGameWon} isGameLost={isGameLost} isLastGuessWrong={isLastGuessWrong} wrongGuessCount={wrongGuessCount} />
      <LanguageChips wrongGuessCount={wrongGuessCount} />
      <Word guessedLetters={guessedLetters} currentWord={currentWord} isGameLost={isGameLost} />
      <Keyboard alphabet={alphabet} addGuessedLetter={addGuessedLetter} guessedLetters={guessedLetters} currentWord={currentWord} isGameOver={isGameOver} />
      {isGameOver && (
        <button className='new-game' onClick={newGame}>
          New Game
        </button>
      )}
    </main>
  );
}

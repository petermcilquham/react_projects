import { clsx } from 'clsx';

export default function Keyboard(props: {
  alphabet: string;
  guessedLetters: string | any[];
  currentWord: string | any[];
  addGuessedLetter: (arg0: any) => void;
  isGameOver: boolean | undefined;
}) {
  const keyboardElements = props.alphabet.split('').map((letter, index) => {
    const isGuessed = props.guessedLetters.includes(letter);
    const isCorrect = isGuessed && props.currentWord.includes(letter);
    const isWrong = isGuessed && !props.currentWord.includes(letter);
    return (
      <button key={index} className={clsx({ correct: isCorrect, wrong: isWrong })} onClick={() => props.addGuessedLetter(letter)} disabled={props.isGameOver}>
        {letter.toUpperCase()}
      </button>
    );
  });

  return <section className='keyboard'>{keyboardElements}</section>;
}

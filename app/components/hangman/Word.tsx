import { clsx } from 'clsx';

export default function Word(props: { guessedLetters: string[]; currentWord: string; isGameLost: boolean }) {
  const { guessedLetters, currentWord, isGameLost } = props;

  const letterElements = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(isGameLost && !guessedLetters.includes(letter) && 'missed-letter');
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
      </span>
    );
  });

  return <section className='word'>{letterElements}</section>;
}

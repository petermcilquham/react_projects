import { clsx } from 'clsx';
import { languages } from './languages';
import { getFarewellText } from './utils';

function renderGameStatus(isGameOver: boolean, isGameWon: boolean, isGameLost: boolean, isLastGuessWrong: boolean, wrongGuessCount: number) {
  if (!isGameOver && isLastGuessWrong) {
    return <h2 className='farewell-message'>{getFarewellText(languages[wrongGuessCount - 1].name)}</h2>;
  }
  if (isGameWon) {
    return (
      <>
        <h2>You win!</h2>
        <p>This time...</p>
      </>
    );
  }
  if (isGameLost) {
    return (
      <>
        <h2>Game over!</h2>
        <p>You lose! Better luck next time. Loser.</p>
      </>
    );
  }
  return null;
}

export function GameStatus(props: { isGameWon: any; isGameLost: any; isGameOver: any; isLastGuessWrong: any; wrongGuessCount: number }) {
  return (
    <section className={clsx('game-status', { won: props.isGameWon, lost: props.isGameLost, farewell: !props.isGameOver && props.isLastGuessWrong })}>
      {renderGameStatus(props.isGameOver, props.isGameWon, props.isGameLost, props.isLastGuessWrong, props.wrongGuessCount)}
    </section>
  );
}

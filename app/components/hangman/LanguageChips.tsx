import { clsx } from 'clsx';
import { languages } from './languages';

export default function LanguageChips(props: { wrongGuessCount: number }) {
  const languageElements = languages.map((lang, index) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className={clsx('chip', { lost: index < props.wrongGuessCount })} style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  return <section className='language-chips'>{languageElements}</section>;
}

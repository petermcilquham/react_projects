import { Link } from 'react-router';

export function Home() {
  return (
    <main className='flex flex-col justify-start items-center w-[100vw]'>
      <h1 className='text-[3.5rem] my-10'>My React Projects</h1>
      <div className='flex flex-row flex-wrap gap-10'>
        {reactProjects.map((project, index) => {
          return (
            <Link to={`${project.link}`} key={index}>
              <p className='text-[1rem] cursor-pointer hover:text-sky-700'>{project.title}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

const reactProjects = [
  { title: 'GameHub', link: 'gamehub' },
  { title: 'Hangman', link: 'hangman' },
  { title: 'APOD', link: 'apod' },
  // { title: 'Chef Claude', link: 'chefclaude' },
  { title: 'Tenzies', link: 'tenzies' },
  { title: 'Meme Generator', link: 'memegen' },
  { title: 'Gym App', link: 'gym' },
];

import { Link } from 'react-router';

export function Home() {
  return (
    <main
      className={`flex flex-col justify-start items-center px-10 w-[100vw] h-screen relative bg-gradient-to-t from-slate-700 to-slate-950 font-inter text-white`}
    >
      <h1 className='text-[2.5rem] md:text-[3.5rem] mt-25 mb-15'>My React Projects</h1>
      <div className='flex flex-row flex-wrap justify-center gap-5 sm:gap-10 max-w-[600px] underline sm:no-underline'>
        {reactProjects.map((project, index) => {
          return (
            <Link to={`${project.link}`} key={index}>
              <p className='text-[1rem] cursor-pointer hover:text-sky-700'>{project.title}</p>
            </Link>
          );
        })}
      </div>
      <div className='fixed bottom-2 left-2'>
        <p className='text-[1rem]'>Peter Lyck McIlquham Schmidt</p>
        <p className='text-[0.8rem]'>peter.lm.schmidt@gmail.com</p>
      </div>
    </main>
  );
}

const reactProjects = [
  { title: 'GameHub', link: 'gamehub' },
  { title: 'Hangman', link: 'hangman' },
  // { title: 'APOD', link: 'apod' },
  // { title: 'Chef Claude', link: 'chefclaude' },
  { title: 'Tenzies', link: 'tenzies' },
  { title: 'Meme Generator', link: 'memegen' },
  { title: 'Workout App', link: 'workoutapp' },
  { title: 'Freescribe App', link: 'freescribe' },
];

import React from 'react';

export default function Main() {
  return (
    <main className=''>
      <h1>My React Projects</h1>
      <div className='projects'>
        {reactProjects.map((project, index) => {
          return <div key={index}>{project}</div>;
        })}
      </div>
    </main>
  );
}

const reactProjects = ['GameHub', 'Hangman', 'APOD', 'Chef Claude', 'Tenzies'];

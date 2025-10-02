import { useRef, useState } from 'react';

import Generator from '~/components/workoutapp/Generator';
import Hero from '~/components/workoutapp/Hero';
import Workout from '~/components/workoutapp/Workout';
import '~/components/workoutapp/workoutapp.css';
import { generateWorkout } from '~/components/workoutapp/utils/functions';

export interface Poison {
  poisons: 'individual' | 'bro_split' | 'bodybuilder_split' | 'upper_lower';
}

export interface Goal {
  goals: 'strength_power' | 'growth_hypertrophy' | 'cardiovascular_endurance';
}

export default function WorkoutApp() {
  const [workout, setWorkout] = useState<any>();
  const [poison, setPoison] = useState<Poison['poisons']>('individual');
  const [muscles, setMuscles] = useState<string[]>([]);
  const [goal, setGoal] = useState<Goal['goals']>('strength_power');
  const workoutRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLDivElement>(null);

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout(poison, muscles, goal);
    setWorkout(newWorkout);

    workoutRef.current?.scrollIntoView();
  }
  function scrollFunction() {
    generateRef.current?.scrollIntoView();
  }
  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      <Hero scrollFunc={scrollFunction} />
      <div ref={generateRef}>
        <Generator
          poison={poison}
          setPoison={setPoison}
          muscles={muscles}
          setMuscles={setMuscles}
          goal={goal}
          setGoal={setGoal}
          updateWorkout={updateWorkout}
        />
      </div>
      {workout && (
        <div ref={workoutRef}>
          <Workout workout={workout} />
        </div>
      )}
    </main>
  );
}

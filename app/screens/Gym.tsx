import { useState } from 'react';

import Generator from '~/components/gymapp/Generator';
import Hero from '~/components/gymapp/Hero';
import Workout from '~/components/gymapp/Workout';
import '~/components/gymapp/gymapp.css';
import { generateWorkout } from '~/components/gymapp/utils/functions';

export interface Poison {
  poisons: 'individual' | 'bro_split' | 'bodybuilder_split' | 'upper_lower';
}

export interface Goal {
  goals: 'strength_power' | 'growth_hypertrophy' | 'cardiovascular_endurance';
}

export default function () {
  const [workout, setWorkout] = useState<any>();
  const [poison, setPoison] = useState<Poison['poisons']>('individual');
  const [muscles, setMuscles] = useState<string[]>([]);
  const [goal, setGoal] = useState<Goal['goals']>('strength_power');

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout(poison, muscles, goal);
    setWorkout(newWorkout);

    window.location.href = '#workout';
  }
  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      <Hero />
      <Generator poison={poison} setPoison={setPoison} muscles={muscles} setMuscles={setMuscles} goal={goal} setGoal={setGoal} updateWorkout={updateWorkout} />
      {workout && <Workout workout={workout} />}
    </main>
  );
}

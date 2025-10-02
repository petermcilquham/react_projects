import ExerciseCard from './ExerciseCard';
import SectionWrapper from './SectionWrapper';

export default function Workout(props: { workout: any }) {
  const { workout } = props;
  return (
    <SectionWrapper id={'workout'} header={'welcome to'} title={['The', 'DANGER', 'zone']}>
      <div className='flex flex-col gap-4'>
        {workout.map((exercise: any, exerciseIndex: number) => {
          return <ExerciseCard index={exerciseIndex} exercise={exercise} key={exerciseIndex} />;
        })}
      </div>
    </SectionWrapper>
  );
}

export default function Transcribing(props: { downloading: boolean }) {
  const { downloading } = props;

  return (
    <div className='flex flex-1 items-center flex-col justify-center gap-10 text-center md:gap-13 pb-24 p-4'>
      <div className='flex flex-col gap-2 sm:gap-4'>
        <h1 className='semibold text-4xl sm:text-5xl md:text-6xl'>
          <span className='text-blue-400 bold'>Transcribing</span>
        </h1>
        <p className=''>{!downloading ? 'warming up cylinders' : 'core cylinders engaged'}</p>
      </div>
      <div className='flex flex-col gap-2 sm:gap-3 max-w-[400px] w-full mx-auto'>
        {[0, 1, 2].map((val) => {
          return <div key={val} className={`rounded-full h-2 sm:h-3 bg-slate-400 loading loading${val}`}></div>;
        })}
      </div>
    </div>
  );
}

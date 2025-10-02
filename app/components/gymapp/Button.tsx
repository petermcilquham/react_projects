export default function Button(props: { text: string; func: Function }) {
  const { text, func } = props;
  return (
    <button
      className='px-8 py-4 mx-auto rounded-md cursor-pointer bg-slate-950 border-[2px] border-blue-400 border-solid blueShadow duration-200'
      onClick={() => func()}
    >
      <p>{text}</p>
    </button>
  );
}

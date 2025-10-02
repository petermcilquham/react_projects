export default function Die(props: { value: any; isHeld: any; id: any; holdDie: any }) {
  const { value, isHeld, id, holdDie } = props;
  return (
    <>
      <button className={`w-[50px] h-[50px] text-[1.75rem] text-black font-bold rounded-md ${isHeld ? 'bg-green' : 'bg-white'}`} onClick={() => holdDie(id)}>
        {value}
      </button>
    </>
  );
}

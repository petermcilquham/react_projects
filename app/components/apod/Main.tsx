export default function Main(props: { data: any }) {
  const { data } = props;
  return (
    <div className='flex flex-col h-[100vh] w-[100%]'>
      <img src={data?.hdurl} alt='astronomy picture of the day' className='w-[100%] h-[100%] flex-1 object-cover' />
    </div>
  );
}

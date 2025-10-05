export default function Footer(props: { data: any; toggleModal: any }) {
  const { data, toggleModal } = props;
  return (
    <footer className='flex fixed bottom-0 left-0 w-[100%] justify-between items-end text-white'>
      <div className='absolute inset-0 -z-1 bg-gradient-to-t from-black to-transparent'></div>
      <div className='flex flex-col p-[1rem]'>
        <h2 className='text-[1.4rem]'>{data?.title}</h2>
        <h1 className='text-[0.9rem] font-[200]'>APOD PROJECT</h1>
      </div>
      <button onClick={toggleModal} className='bg-transparent border-none outline-none text-white p-[1rem] cursor-pointer'>
        <i className='fa-solid fa-circle-info text-[1.3rem] hover:opacity-[0.7]'></i>
      </button>
    </footer>
  );
}

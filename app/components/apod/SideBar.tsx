export default function SideBar(props: { data: any; toggleModal: any }) {
  const { data, toggleModal } = props;
  return (
    <div className='fixed inset-0 flex flex-col z-10 text-white'>
      <div className='absolute inset-0 bg-gray-900 opacity-[0.6]' onClick={toggleModal}></div>
      <div className='z-15 relative flex flex-col gap-[1rem] h-[100%] w-[80%] max-w-[600px] ml-auto bg-gray-900 overflow-y-scroll p-[1rem]'>
        <h2 className='text-[1.4rem] font-[200]'>{data?.title}</h2>
        <div className='flex flex-col gap-[1rem]'>
          <p className='text-[1.1rem] font-bold'>{data?.date}</p>
          <p>{data?.explanation}</p>
        </div>
        <button onClick={toggleModal} className='fixed bottom-3 bg-transparent mr-auto cursor-pointer hover:opacity-[0.7]'>
          <i className='fa-solid fa-arrow-right'></i>
        </button>
      </div>
    </div>
  );
}

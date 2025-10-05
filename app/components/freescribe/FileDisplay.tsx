export default function FileDisplay(props: { file: File | null; handleReset: React.MouseEventHandler; handleFormSubmission: React.MouseEventHandler }) {
  const { file, handleReset, handleFormSubmission } = props;
  return (
    <main className='flex flex-1 flex-col justify-center p-4 gap-3 sm:gap-4 text-center pb-20 w-72 sm:w-96 max-w-full mx-auto'>
      <h1 className='semibold text-4xl sm:text-5xl md:text-6xl'>
        Your <span className='text-blue-400 bold'>File</span>
      </h1>
      <div className='flex flex-col text-left my-4'>
        <h3 className='font-semibold'>Name</h3>
        <p className=''>{file ? file.name : 'Custom audio'}</p>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <button className='text-blue-400 hover:text-blue-600 duration-200 cursor-pointer' onClick={handleReset}>
          Reset
        </button>
        <button className='flex items-center gap-2 font-medium specialBtn px-3 py-2 rounded-lg text-blue-400' onClick={handleFormSubmission}>
          <p className=''>Transcribe</p>
          <i className='fa-solid fa-pen-nib'></i>
        </button>
      </div>
    </main>
  );
}

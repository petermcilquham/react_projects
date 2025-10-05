export default function Header(props: { handleReset: React.MouseEventHandler }) {
  const { handleReset } = props;
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
      <h1 className='font-medium'>
        Free<span className='text-blue-400 bold'>Scribe</span>
      </h1>
      <button className='flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-blue-400 text-sm' onClick={handleReset}>
        <p>New</p>
        <i className='fa-solid fa-plus'></i>
      </button>
    </header>
  );
}

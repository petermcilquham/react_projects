import { LANGUAGES } from './utils/presets';

export default function Translation(props: {
  translation: string;
  translating: boolean;
  toLang: string;
  setToLang: Function;
  generateTranslation: React.MouseEventHandler;
}) {
  const { translation, translating, toLang, setToLang, generateTranslation } = props;
  return (
    <div className='flex flex-col max-w-[400px] w-full mx-auto'>
      {!translating && (
        <div className='flex flex-col gap-1 items-start'>
          <p className='text-xs sm:text-sm font-medium text-slate-500 '>To languague</p>
          <div className='flex items-stretch gap-2'>
            <select
              className='flex-1 outline-none bg-white focused:outline-none border border-solid border-transparent hover:border-blue-300 duration-200 p-2 rounded'
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
            >
              <option value='Select languague'>Select languague</option>
              {Object.entries(LANGUAGES).map((value, index) => {
                return (
                  <option key={index} value={value[1]}>
                    {value[0]}
                  </option>
                );
              })}
            </select>
            <button className='specialBtn px-3 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200' onClick={generateTranslation}>
              Translate
            </button>
          </div>
        </div>
      )}
      {translation && !translating && <p className='mt-5'>{translation}</p>}
      {translating && (
        <div className='grid place-items-center '>
          <i className='fa-solid fa-spinner animate-spin'></i>
        </div>
      )}
    </div>
  );
}

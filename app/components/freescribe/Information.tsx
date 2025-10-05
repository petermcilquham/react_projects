import { useEffect, useRef, useState } from 'react';

import Transcription from './Transcription';
import Translation from './Translation';

export default function Information(props: { output: any }) {
  const { output } = props;
  const [tab, setTab] = useState('transcription');
  const [translation, setTranslation] = useState<string>('');
  const [translating, setTranslating] = useState<boolean>(false);
  const [toLang, setToLang] = useState<string>('Select languague');
  const worker = useRef<any>(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/translate.worker.ts', import.meta.url), {
        type: 'module',
      });
    }
    const onMessageReceived = async (event: any) => {
      switch (event.data.status) {
        case 'initiate':
          console.log('INITIATING');
          break;
        case 'progress':
          console.log('IN PROGRESS');
          break;
        case 'update':
          setTranslation(event.data.output);
          console.log(event.data.output);
          break;
        case 'complete':
          console.log('COMPLETE');
          setTranslating(false);
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);

    return () => worker.current.removeEventListener('message', onMessageReceived);
  });

  const outputText = tab === 'transcription' ? output.map((val: { text: string }) => val.text) : translation || 'No translatation';

  function handleCopy() {
    navigator.clipboard.writeText(outputText);
  }

  function handleDownload() {
    const element: any = document.createElement('a');
    const file = new Blob([outputText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Freescribe_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translating || toLang === 'Select languague') {
      return;
    }
    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val: { text: string }) => val.text),
      src_lang: 'eng_Latn',
      tgt_lang: toLang,
    });
  }

  return (
    <main className='flex flex-1 flex-col justify-center p-4 gap-3 sm:gap-4 text-center pb-20 max-w-prose w-full mx-auto'>
      <h1 className='semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>
        Your <span className='text-blue-400 bold'>Transcription</span>
      </h1>
      <div className='grid grid-cols-2 items-center mx-auto bg-white shadow rounded-full overflow-hidden'>
        <button
          className={`px-4 py-1 duration-200 ${tab === 'transcription' ? 'bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-600'}`}
          onClick={() => {
            setTab('transcription');
          }}
        >
          Transcription
        </button>
        <button
          className={`px-4 py-1 duration-200 ${tab === 'translation' ? 'bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-600'}`}
          onClick={() => {
            setTab('translation');
          }}
        >
          Translation
        </button>
      </div>
      <div className='my-8 flex flex-col'>
        {tab === 'transcription' ? (
          <Transcription transcription={outputText} />
        ) : (
          <Translation translation={outputText} translating={translating} toLang={toLang} setToLang={setToLang} generateTranslation={generateTranslation} />
        )}
      </div>
      <div className='flex items-center gap-6 mx-auto'>
        <button title={'Copy'} className='bg-white text-blue-300 hover:text-blue-500 duration-200 py-2 px-2 rounded cursor-pointer' onClick={handleCopy}>
          <i className='fa-solid fa-copy'></i>
        </button>
        <button
          title={'Download'}
          className='bg-white text-blue-300 hover:text-blue-500 duration-200 py-2 px-2 rounded cursor-pointer'
          onClick={handleDownload}
        >
          <i className='fa-solid fa-download'></i>
        </button>
      </div>
    </main>
  );
}

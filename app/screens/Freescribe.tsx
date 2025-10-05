import { useState, useEffect, useRef } from 'react';

import { MessageTypes } from '~/components/freescribe/utils/presets';
import FileDisplay from '~/components/freescribe/FileDisplay';
import Header from '~/components/freescribe/Header';
import Main from '~/components/freescribe/Main';
import Information from '~/components/freescribe/Information';
import Transcribing from '~/components/freescribe/Transcribing';
import '~/components/freescribe/css/index.css';

export default function Freescribe() {
  const [file, setFile] = useState<File | null>(null);
  const [audioStream, setAudioStream] = useState<Blob | null>(null);
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const worker = useRef<any>(null);

  const isAudioAvailable = file || audioStream;

  function handleReset() {
    setFile(null);
    setAudioStream(null);
    setOutput(null);
    setLoading(false);
    setDownloading(false);
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../components/freescribe/utils/whisper.worker.ts', import.meta.url), {
        type: 'module',
      });
    }

    const onMessageReceived = async (event: any) => {
      switch (event.data.type) {
        case 'DOWNLOADING':
          setDownloading(true);
          console.log('DOWNLOADING');
          break;
        case 'LOADING':
          setLoading(true);
          console.log('LOADING');
          break;
        case 'RESULT':
          setOutput(event.data.results);
          console.log(event.data.results);
          break;
        case 'INFERENCE_DONE':
          console.log('DONE');
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);

    return () => worker.current.removeEventListener('message', onMessageReceived);
  });

  async function readAudioFrom(file: File | Blob | null) {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const res = await file!.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(res);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) {
      return;
    }
    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = `openai/whisper-tiny.en`;

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  return (
    <div className='flex flex-col bg-gradient-to-r from-blue-200 to-transparent text-slate-700 mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header handleReset={handleReset} />
        {output ? (
          <Information output={output} />
        ) : loading ? (
          <Transcribing downloading={downloading} />
        ) : isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} file={file} handleReset={handleReset} />
        ) : (
          <Main setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer className=''></footer>
    </div>
  );
}

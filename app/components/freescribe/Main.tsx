import { useState, useEffect, useRef } from 'react';

export default function Main(props: { setFile: Function; setAudioStream: Function }) {
  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState<string>('inactive');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const mediaRecorder = useRef<MediaRecorder>(null);
  const mimeType = 'audio/webm';

  async function startRecording() {
    let tempStream;
    console.log('Start recording');
    // access users microphone
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err: any) {
      console.log(err.message);
      return;
    }
    setRecordingStatus('recording');

    // create new Media recorder instance using the stream
    const media = new MediaRecorder(tempStream, { mimeType: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus('inactive');
    console.log('Stop recording');

    mediaRecorder.current!.stop();
    mediaRecorder.current!.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') {
      return;
    }
    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <main className='flex flex-1 flex-col justify-center p-4 gap-3 sm:gap-4 text-center pb-20'>
      <h1 className='semibold text-5xl sm:text-6xl md:text-7xl'>
        Free<span className='text-blue-400 bold'>Scribe</span>
      </h1>
      <h3 className='font-medium md:text-lg'>
        Record <span className='text-blue-400'>&rarr;</span> Transcribe <span className='text-blue-400'>&rarr;</span> Translate
      </h3>
      <button
        className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl'
        onClick={recordingStatus === 'recording' ? stopRecording : startRecording}
      >
        <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : 'Stop recording'}</p>
        <div className='flex items-center gap-2'>
          {duration > 0 && <p className='text-sm'>{duration} s</p>}
          <i className={`fa-solid fa-microphone duration-200 ${recordingStatus === 'recording' ? 'text-rose-300' : ''}`}></i>
        </div>
      </button>
      <p className='text-base'>
        Or{' '}
        <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>
          upload{' '}
          <input
            type='file'
            className='hidden'
            accept='.mp3,.wave'
            onChange={(e) => {
              const tempFile = e.target.files![0];
              setFile(tempFile);
            }}
          />
        </label>
        a mp3 file
      </p>
      <p className='italic text-slate-500'>Free now, free forever</p>
    </main>
  );
}

import { useState, useEffect } from 'react';

import Footer from '~/components/apod/Footer';
import Main from '~/components/apod/Main';
import SideBar from '~/components/apod/SideBar';

export function Apod() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      // const today = new Date().toDateString();
      // const localKey = `NASA-${today}`;
      // if (localStorage.getItem(localKey)) {
      //   const apiData = JSON.parse(localStorage.getItem(localKey)!);
      //   setData(apiData);
      //   console.log('Fetched from cache');
      //   return;
      // }

      localStorage.clear();
      try {
        const response = await fetch(url);
        const apiData = await response.json();
        setData(apiData);
        // localStorage.setItem(localKey, JSON.stringify(apiData));
        // console.log('Fetched from API');
      } catch (err: any) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);
  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className='flex flex-1 items-center justify-center h-[100vh]'>
          <i className='fa-solid fa-gear opacity-[0.2] text-[3rem] animate-spin'></i>
        </div>
      )}
      {showModal && <SideBar data={data} toggleModal={handleToggleModal} />}
      {data && <Footer data={data} toggleModal={handleToggleModal} />}
    </>
  );
}

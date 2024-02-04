"use client"

import React, { useEffect, useState } from 'react';


async function getQuote() {
  const res = await fetch('https://stoic.tekloon.net/stoic-quote')
  const quote = res.json();
  return quote;
}


export default function Home() {

  const [quote, setQuote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getQuote().then(quote => setQuote(quote));
  }, []);

  async function generateNewQuote() {
    const quote: any = await getQuote();
    setQuote(quote);
  }

  return (
    <main className={`${darkMode ? 'bg-black' : 'bg-white'} w-screen sm:min-h-screen md:h-screen flex flex-wrap justify-center content-center`}>
      <button
        className={`${darkMode ? 'text-black bg-red-600' : 'bg-sky-600'} p-2 font-bold rounded fixed right-3 top-3`}
        onClick={() => setDarkMode(prevState => !prevState)}
      >
        {darkMode ? 'LightMode' : 'DarkMode'}
      </button>
      {quote ? (
        <div className={`${darkMode ? 'text-yellow-600' : 'text-black'} sm:w-2/3 md:w-1/3`}>
          <h1 className={`text-3xl my-4`}>{quote.quote}</h1>
          <p className={`text-right`}>- {quote.author}</p>
          <button
            className={`${darkMode ? 'text-white bg-blue-600' : 'bg-sky-600'} p-2 mx-auto rounded text-center`}
            onClick={generateNewQuote}
          >
            NewQuote
          </button>
        </div>
      ) : (
        <div className={`${darkMode ? 'text-yellow-600' : 'text-black'}`}>
          "Loading..."
        </div>
      )}
    </main>
  )
}

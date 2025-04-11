import React, { useCallback, useEffect, useRef, useState } from 'react'

function Quote() {
    const [quote , setQuote] = useState();
    const [author , setAuthor] = useState();
    const quoteRef = useRef(null)
    const getQuote = async () => {
        try{
            const res = await fetch("http://localhost:5000/quote");
            const data = await res.json();
            setQuote(data.quote)
            setAuthor(data.author)
            window.getSelection()?.removeAllRanges();

        }catch(error){
            console.log("Error getting quote: ", error);
        }
    }
    useEffect(() => {
        getQuote();
    },[])
    const copyToClipBoard = useCallback(() => {
        if (quoteRef.current) {
          const range = document.createRange();
          range.selectNodeContents(quoteRef.current);
      
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
      
          // Now copy to clipboard
          navigator.clipboard.writeText(quote)
            .then(() => {
              console.log("Quote copied!");
            })
            .catch(err => {
              console.error("Failed to copy: ", err);
            });
        }
      }, [quote]);
    const speakQuote = () => {
        const utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
        speechSynthesis.speak(utterance);
    }
    const tweetQuote = () => {
        const tweetText = encodeURIComponent(`${quote} -${author}`);
        const tweetUrl = `https://x.com/intent/tweet?tweet-${tweetText}`;
        window.open(tweetUrl , '_blank');
    }
  return (
    <div className=' flex flex-col justify-center items-center bg-gray-100 p-4'>
        <div className='bg-white shadow-lg rounded-2xl p-6 max-w-xl text-center transition-all duration-300'
            style={{minHeight: '200px'}}
        >
            <p className='text-xl font-bold text-gray-700 italic mb-4' ref={quoteRef}>"{quote}"</p>
            <p className='text-sm font-semibold text-gray-500'>- {author}</p>
        </div>
        <div className='mt-6 flex flex-col items-center gap-4'>
            <div className='flex gap-4'>
                <button
                    onClick={copyToClipBoard}
                    className='bg-gray-200 text-gray-700 px-4 rounded-full hover:bg-gray-300 transition'
                    title='copy to clipboard'
                >📋</button>
                <button
                    onClick={speakQuote}
                    className='bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition'
                    title='Speak the quote'
                >🔊</button>
                <button
                    onClick={tweetQuote}
                    className='bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition'
                    title='Tweet this quote'
                >🐦</button>
            </div>
            <div>
                <button className='bg-blue-500 text-white px-6 py-2 text-lg rounded-full hover:bg-blue-600 transition' onClick={getQuote}>New Quote</button>
            </div>
        </div>
    </div>
  )
}

export default Quote
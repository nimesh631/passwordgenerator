import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState<number>(6);
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false) ;
  const [charAllowed, setCharAllowed] = useState<boolean>(false) ;
  const [password, setPassword] = useState<string>("") ;
  const passwordRef = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!#$%&()*+,-./:;<=>?@[\]^_`{|}~';

    // Generate password based on length
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(()=>{
    passwordGenerator();

  },[length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 101);
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);


  return (
    <>
    <div className='bg-gray-700 max-w-md mx-auto shadow-lg rounded-lg h-[150px] '>
      <h1 className='text-blue-400 m-2 py-2.5'> Password Generator</h1>
    <div className='flex overflow-hidden m-1'>
    <input 
    type="text"
    value={password}
    className='w-full py-1 px-3 mb-5  rounded-lg'
    placeholder='Password'
    ref={passwordRef}
    readOnly />
    <button className='bg-blue-600 rounded-lg px-3 mx-1 mb-4 text-white hover:bg-blue-900'
    onClick={copyPasswordToClipboard}>
      copy
    </button>
    </div>

    <div className='flex text-sm gap-x-1 text-white'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={50}
        value={length}
        onChange={(e)=>setLength(Number(e.target.value))}
         />
         <label htmlFor="length">length :{length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
         checked={numberAllowed}
          id='numberInput'
        onChange={()=>{
          setNumberAllowed((prev)=> !prev)
        }}

         />
         <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
         checked={charAllowed}
         id='charInput'
       onChange={()=>{
         setCharAllowed((prev)=> !prev)
       }} />
        <label htmlFor="charInput">Characters</label>
      </div>
    </div>
    </div>
     

    </>
  )
}

export default App

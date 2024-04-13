import React, { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [passwordAllowed, setpasswordAll] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~@#$%^&*?{}_+)(){}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setpasswordAll(pass)

  }, [length, numberAllowed, charAllowed, setpasswordAll])

  const passwordClipBoard = useCallback(() => {

    passwordRef.current?.select()

    window.navigator.clipboard.writeText(passwordAllowed)
  }, [passwordAllowed])

  useEffect(() => {
    passwordGenerator()

  }, [length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <div className='bg-slate-900 w-[100vw] h-[100vh]  '>
      <h1 className='text-4xl  text-slate-50 mx-auto items-center justify-center flex'> password genertor  </h1>

      <div className='w-full h-40   max-w-md  mx-auto shadow-sm rounded-lg px-4 my-8  text-orange-500  bg-slate-800 flex '>
        <div className=' flex flex-col mx-auto mt-3 shadow-sm rounded-lg overflow-hidden mb-5'>
          <div className='flex  gap-2 mx-auto mb-2'>

            <input type="text" value={passwordAllowed}

              className='outline-none w-full py-1 px-3'

              placeholder='password'
              readOnly
              ref={passwordRef}

            />

            <button className=' px-2 px-y rounded-sm bg-slate-500' onClick={passwordClipBoard}> copy</button>


          </div>

       <div className='flex gap-3'>
       <input type="range" min={8} max={100} value={length} onChange={(e) => {
            setlength(e.target.value)
          }} />


          <label >{length}</label>

          <input type="checkbox"

            value={setnumberAllowed}
            id='numberinput '

            onChange={() => setnumberAllowed((pre) => !pre)}

          />

          <label> number</label>


          <input type="checkbox"

            value={setcharAllowed}
            id='numberinput '

            onChange={() => setcharAllowed((pre) => !pre)}

          />

          <label> characters</label>
       </div>

        </div>
      </div>

    </div>
  )
}

export default App

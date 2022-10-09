import {Input, InputRef} from 'antd';
import {LegacyRef, useEffect, useRef} from 'react';

export const FormLogin = () => {
  const inputRef: LegacyRef<InputRef> = useRef(null);

  const onKeyPress = (e: KeyboardEvent) => {
    if (!inputRef.current) return;
    if(['Tab', 'Space', 'Enter'].includes(e.code))
      inputRef.current.focus()
  }

  useEffect(() => {
    window.addEventListener('keyup', onKeyPress)
    return () => window.removeEventListener('keyup', onKeyPress)
  })

  return (
    <div className="flex justify-center items-center absolute w-1/3 h-80 z-[2]">
      <div className='w-[200]'>
        <Input
          ref={inputRef}
          type="password"
          size="large"
          className="rounded-full"
          placeholder="Enter password" 
        />
      </div>
    </div>
  )
}

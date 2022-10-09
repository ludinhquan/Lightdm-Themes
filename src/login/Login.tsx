import {LegacyRef, useEffect, useRef} from "react";
import {FormLogin} from "../common";
import classes from "./login.module.css";

const TOTAL_ROW = 20;
const TOTAL_COL = 30;

export const Login = () => {
  const cursorRef: LegacyRef<HTMLDivElement> = useRef(null)

  const onMouseOver = (event: MouseEvent) => {
    if(!cursorRef.current) return
    cursorRef.current.style.left = event.clientX + 'px'
    cursorRef.current.style.top = event.clientY + 'px'
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseOver);
    return () => document.removeEventListener('mousemove', onMouseOver)
  }, [])

  return (
    <div className="flex flex-wrap justify-center items-center flex-col w-full min-h-screen bg-black">
      <div className="relative z-[2] h-screen">
        {Array(TOTAL_ROW).fill(null).map((_, rowIdx) =>
          <div key={rowIdx} className="inline-flex -mt-[32px] -ml-[50px] even:ml-[1px]">
            {Array(TOTAL_COL).fill(null).map((_, colIdx) =>
              <div 
                key={`${rowIdx}_${colIdx}`}
                className={`
                relative w-[100px] h-[110px] bg-[#111] m-[1px] 
                before:content-[''] before:mt-0 before:ml-0 before:absolute before:w-1/2 before:h-full before:bg-[rgba(255,255,255,0.02)] ${classes.hexagon}`}
              />
            )}
          </div>
        )}
      </div>
      <FormLogin />
      <div className={`absolute rounded-full w-[500px] h-[500px] bg-[#0f0] z-0 -translate-x-1/2 -translate-y-1/2 ${classes.cursor}`} ref={cursorRef}></div>
    </div>
  )
}


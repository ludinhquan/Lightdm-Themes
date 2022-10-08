import {LegacyRef, useEffect, useRef} from "react";
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
    <div className="flex flex-wrap flex-col min-h-screen bg-black">
      <div className={classes.container}>
        {Array(TOTAL_ROW).fill(null).map((_, rowIdx) =>
          <div key={rowIdx} className={classes.row}>
            {Array(TOTAL_COL).fill(null).map((_, colIdx) =>
              <div key={`${rowIdx}_${colIdx}`}className={classes.hexagon}></div>
            )}
          </div>
        )}
      </div>
      <div id={classes.cursor} ref={cursorRef}></div>
    </div>
  )
}


import React, { useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import style from "./titleAdnSearch.module.scss"
import arrow from "./arrow.svg"
const TitleAndSearch = ({ array, input, showCartSearched, title }) => {
  let [location, setLocation] = React.useState('');
  const navigate = useNavigate();

  const pathname = useLocation().pathname

  useEffect(() => {
    setLocation(pathname)
  })
  return (
    <div className={style.top}>
      <div className='content__top-left'>
        <h1 className={style.title}        >
          {location === "/test-react-snikers" || location === "/" ? null : <div className={style.backButton} onClick={() => navigate(-1)} ><img src={arrow} /></div>}
          {title}
        </h1>
      </div>
      <div className='content__top-right'>
        <input value={input} onChange={(e) => showCartSearched(e, array)} className={style.topInput} type="text" placeholder='Поиск...' />
      </div>
    </div>
  )
}
export default TitleAndSearch
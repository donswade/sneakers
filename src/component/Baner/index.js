import style from "./banner.module.scss"
//Підгрузка фоток
import adidas from "./adidasLogo.png"
import banner from "./bannerImg.jpg"

const Baner = ({ changeDrawerStatus }) => {
  return (
    <div className={style.banner}>
      <div className={style.before} style={{ "backgroundImage": `url(${adidas})` }}></div>
      <div className={style.after} style={{ "backgroundImage": `url(${banner})` }}></div>
      <h2 className={style.title}><span className={style.span}>Stan Smith</span>,<br />
        Forever!</h2>
      <button onClick={changeDrawerStatus} className={style.button}>Купить</button>
    </div>
  )
}
export default Baner;
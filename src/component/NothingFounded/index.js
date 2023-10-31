import style from "./style.module.scss";
import { Link } from "react-router-dom";

const NothingFounded = ({ title, description }) => {
  return (
    <div className={style.notFound}>
      <div className={style.img}>
        <img src="img/smalik.png" alt="smalik" />
      </div>
      <h2 className={style.title}>{title}</h2>
      <p className={style.description}>{description}</p>
      <Link to="/">
        <div className={style.button}>Вернуться назад <img src="img/button-arrow-left.svg" alt="arrow back" /> </div>
      </Link>
    </div>

  )
}
export default NothingFounded


import style from "./style.module.scss";
import { Link } from "react-router-dom";

const NothingFounded = ({ title, description }) => {
  return (
    <div className={style.notFound}>
      <div className={style.img}>
        <img src="/sneakers/img/smalik.png" alt="smalik" />
      </div>
      <h2 className={style.title}>{title}</h2>
      <p className={style.description}>{description}</p>
      <Link to="/sneakers">
        <button className={style.button}>Вернуться назад <img src="sneakers/img/button-arrow-left.svg" /> </button>
      </Link>
    </div>

  )
}
export default NothingFounded


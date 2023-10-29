import React from "react"
import style from './notLoadedCard.module.scss'
const NoLoadedCard = () => {
  return (
    <div className={style.cart}>
      <div className={style.cartImg}></div>
      <div className={style.cartText}></div>
      <div className={style.cartText}></div>
      <div className={style.cartPrice}></div>
      <div className={style.cartButton}></div>
    </div>
  )
}
const NoLoadedCards = () => {
  return (
    [
      <NoLoadedCard key={1} />,
      <NoLoadedCard key={2} />,
      <NoLoadedCard key={3} />,
      <NoLoadedCard key={4} />,
      <NoLoadedCard key={5} />,
      <NoLoadedCard key={6} />,
      <NoLoadedCard key={7} />,
      <NoLoadedCard key={8} />,
      <NoLoadedCard key={9} />,
      <NoLoadedCard key={10} />,
      <NoLoadedCard key={11} />
    ].map((card) => card)
  )

}
export default NoLoadedCards
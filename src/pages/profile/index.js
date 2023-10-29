import NothingFounded from "../../component/NothingFounded";
import TitleAndSearch from "../../component/TitleAndSearch";
import React, { useState } from "react";
import style from "./style.module.scss"
import arrow from "./arrow.svg"

const ProfilePage = ({ setBoughtCards, items, input, showCartSearched, searchedCards, renderCards }) => {
  const [sameCart, setSameCart] = useState([
    {
      "orderNumber": "0001",
      "orderTime": "01.01.2023, 13:02",
      "orderStatus": "complete",
      "orderPrice": "13 044",
      "isOpen": false,
      "carts": [
        {
          "id": 1,
          "img": "img/sneakers/1.jpg",
          "isAdded": false,
          "isLike": false,
          "name": "Мужские Кроссовки Nike csafBlazer Mid Suede",
          "price": "12 999",
        },
        {
          "id": 1,
          "img": "img/sneakers/1.jpg",
          "isAdded": false,
          "isLike": false,
          "name": "Мужские Кроссовки Nike csafBlazer Mid Suede",
          "price": "12 999",
        }
      ]
    },
    {
      "orderNumber": "00012",
      "orderTime": "02.01.2023, 13:02",
      "orderStatus": "Завершено",
      "orderPrice": "13 044",
      "isOpen": false,
      "carts": [
        {
          "id": 1,
          "img": "img/sneakers/1.jpg",
          "isAdded": false,
          "isLike": false,
          "name": "Мужские Кроссовки Nike csafBlazer Mid Suede",
          "price": "12 999",
        },
        {
          "id": 1,
          "img": "img/sneakers/1.jpg",
          "isAdded": false,
          "isLike": false,
          "name": "Мужские Кроссовки Nike csafBlazer Mid Suede",
          "price": "13 999",
        }
      ]
    }
  ])
  const ShowOrders = ({ data }) => {
    return data.map((element, index) => {
      return <div className={style.order} key={index}>
        <div className={style.top}>
          <div className={style.top__left}>
            <h2 className={style.top__leftTitle}>Замовлення: {element.orderNumber}</h2>
            <p className={style.top__leftDescription}>Статус: <span className={`${style.top__leftSpan} ${style.completed}`}>{element.orderStatus}</span></p>
          </div>
          <div onClick={() => setOpen(index)} className={element.isOpen ? `${style.top__button} ${style.top__buttonOpen}` : `${style.top__button} ${style.top__buttonClose}`}><img src={arrow} /></div>
          <div className={style.top__right}>
            <p className={style.top__rightDescription}>Сума Замовлення:</p>
            <p className={style.top__rightPrice}>{element.orderPrice}</p>
            <p className={style.top__rightDescription}>{element.orderTime}</p>
          </div>
        </div>
        {!element.isOpen ? null : <div className={`content__main ${style.bottom}`}>
          {input.length > 0 ? searchedCards.length > 0 ? renderCards(searchedCards) : <h2 className='nothingFound'>Нічого не знайдено</h2> : renderCards(element.carts)}
        </div>}
      </div>

    })
  }
  const setOpen = (index) => {
    const copyArray = JSON.parse(JSON.stringify(items))
    console.log(copyArray)
    copyArray[index].isOpen = !copyArray[index].isOpen
    setBoughtCards(copyArray)
    // console.log("ld;afj")
    // order.isOpen = !order.isOpen
    // console.log(order.isOpen)
  }
  return (
    <>
      <TitleAndSearch array={items} input={input} showCartSearched={showCartSearched} title="Замовлення" />
      <div className={style.main}>
        {/* <div className={style.order}>
          <div className={style.top}>
            <div className={style.top__left}>
              <h2 className={style.top__leftTitle}>Замовлення: 0001</h2>
              <p className={style.top__leftDescription}>Статус: <span className={`${style.top__leftSpan} ${style.completed}`}>Завершено</span></p>
            </div>
            <div className={style.top__button}><img src={arrow} /></div>
            <div className={style.top__right}>
              <p className={style.top__rightDescription}>Сума Замовлення:</p>
              <p className={style.top__rightPrice}>10 799 руб.</p>
              <p className={style.top__rightDescription}>01.02.2003, 20:40</p>
            </div>
          </div>
          <div className={`content__main ${style.bottom}`}>
            {input.length > 0 ? searchedCards.length > 0 ? renderCards(searchedCards) : <h2 className='nothingFound'>Нічого не знайдено</h2> : items.length > 0 ? renderCards(items) : <NothingFounded title="У вас нет заказов" description={`Вы нищеброд?   Оформите хотя бы один заказ.`} />}

          </div>
        </div> */}
        {items.length > 0 ? <ShowOrders data={items} /> : <NothingFounded title="У вас нет заказов" description={`Вы нищеброд?   Оформите хотя бы один заказ.`} />}

      </div>
    </>
  )
}


export default ProfilePage
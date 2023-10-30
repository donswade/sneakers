import axios from "axios"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
//файли, компоненти

import style from "./drawer.module.scss"
import drawerBox from "./drawerBox.svg"
//фотки
import completed from "./image 8.svg"


const Drawer = (
  { onClickAdd,
    setBoughtCards,
    removeAdded,
    setAddedCarts,
    isDrawerOpen,
    changeDrawerStatus,
    addedCarts,
    priceAddedCards = 0 }
) => {
  // форма
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur"
  })

  const [opened, setOpen] = React.useState(false);
  const [isShowComplete, setShowComplete] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false)
  const [isConection, setConection] = React.useState(false)

  //сховати модалку
  const closeModal = (e) => e.target.className === `${style.drawer} ${style.modalWindowActive}` ? setOpen(false) : null
  //ховає статус 'замовлено'
  const closeCompleted = () => {
    changeDrawerStatus();
    setShowComplete(false)
  }
  //Закритя цілого драйвера різними способами 
  const closeDrawer = (e) => (e.target.className === style.exit || e.target.className === style.drawerBox || e.target.className === `${style.nothingButton} ${style.button}`) ? isShowComplete ? closeCompleted(false) : changeDrawerStatus() : null;

  const taxCounter = (someNumber) => {
    return Math.floor(+someNumber / 100 * 5);
  }
  //submit форми, відправка данних на сервер
  const showData = async (data) => {
    setLoading(true)
    //видалення добавленних карточок після submit
    try {
      await addedCarts.forEach(card => {
        console.log(card)
        axios.delete(`https://630a790132499100328636f0.mockapi.io/addedCards/${card.element}`)
          .then((data) => {
            setLoading(false)
            setConection(true)
          })
      })

    } catch {
      setConection(false)
    }
    //очистка форми
    reset()
    //показ що замовленя прийнято
    setShowComplete(true)
    setOpen(false)
    //створення обєкта з замовленням для подального показу в сторінці профіль
    const newArray = {}
    newArray.orderNumber = "0001"
    newArray.orderTime = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`
    newArray.orderStatus = "Завершено"
    newArray.orderPrice = priceAddedCards()
    newArray.isOpen = false
    newArray.carts = addedCarts
    // добавлення данних в історії замовлень
    setBoughtCards((array) => [...array, newArray])
    //очистка кошика
    setAddedCarts([])
    // оновлення кнопок на карточці 
    removeAdded()


  }
  // Карточки 
  const Carts = addedCarts.map((cart, index) => {
    return (
      <div className={style.card} key={index} >
        <img className={style.cardImg} src={"sneakers/" + cart.img} alt="image sneaker" />
        <div className={style.cardText}>
          <h2 className={style.cardTitle}>{cart.name}</h2>
          <p className={style.cardDescription}><span className={style.cardPrice}>{cart.price} руб.</span></p>
        </div>
        <div className={style.cardButton} onClick={() => onClickAdd("add", cart)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6653 5.13122H7.20214V1.66821C7.20214 0.332846 5.13114 0.332846 5.13114 1.66821V5.13122H1.668C0.332935 5.13122 0.332935 7.20215 1.668 7.20215H5.13114V10.6652C5.13114 12.0005 7.20214 12.0005 7.20214 10.6652V7.20215H10.6653C12.0005 7.20215 12.0005 5.13122 10.6653 5.13122Z" fill="#D3D3D3" />
          </svg>
        </div>
      </div>
    )
  })
  //рендер карточок з загальною сумою і податком
  const RenderCart = () => {
    return (
      <>
        <div className={style.sideBarContainer}>
          {Carts}
        </div>
        <div className={`${style.sideBarText} ${style.first}`}>Итого <span className={style.sideBarTextSpan}>{priceAddedCards()} руб.</span></div>
        <div className={`${style.sideBarText} ${style.second}`}>Налог 5%:  <span className={style.sideBarTextSpan}>{taxCounter(priceAddedCards())} руб. </span></div>
        <button onClick={() => { setOpen(true) }} className={style.button}>Оформить заказ</button>
      </>
    )

  }
  //Нічого не знайдено 
  const NothingAdded = () => {
    return (
      <div className={style.nothingBox}>
        <img className={style.nothingImg} src={drawerBox} />
        <h2 className={style.nothingTitle}>Корзина пустая</h2>
        <p className={style.nothingDescription}> Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
        <div onClick={(e) => closeDrawer(e)} className={`${style.nothingButton} ${style.button}`}>Вернуться назад</div>
      </div>
    )
  }
  // Замовлення оформлено 
  const Completed = () => {
    return (
      <div className={style.completed}>
        <img className={style.completedImg} src={completed} />
        <h2 className={style.completedTitle}>Заказ оформлен!</h2>
        <p className={style.completedDescription}>Ваш заказ #18 скоро будет передан курьерской доставке</p>
        <div onClick={(e) => closeDrawer(e)} className={`${style.nothingButton} ${style.button}`}>Вернуться назад</div>
      </div>
    )
  }
  // Форма
  const Modal = () => {
    return (
      <div onClick={(e) => closeModal(e)} className={opened ? `${style.drawer} ${style.modalWindowActive}` : `${style.drawer} ${style.modalWindow}`}>
        <form className={style.modal} onSubmit={handleSubmit(showData)}>
          <h2 className={style.modalTitle} >Оформити заказ</h2>
          <div className={style.inputsBlock}>
            <label className={style.label}>
              <input {...register("firstName", {
                required: "Поле обовязкове до заповнення",
              })}
                className={style.input}
                type="text"
                placeholder="Прізвище"
              />
              {errors.firstName ? <p className={style.requiredMessage}>{errors.firstName.message}</p> : null}
            </label>
            <label className={style.label}>
              <input {...register("name", {
                required: "Поле обовязкове до заповнення",
              })}
                className={style.input}
                type="text"
                placeholder="Ім’я"
              />
              {errors.name ? <p className={style.requiredMessage}>{errors.name.message}</p> : null}

            </label>
            <label className={style.label}>
              <input {...register("lastName", {
                required: "Поле обовязкове до заповнення",
              })}
                className={style.input}
                type="text"
                placeholder="По-батькові"
              />
              {errors.lastName ? <p className={style.requiredMessage}>{errors.lastName.message}</p> : null}

            </label>
            <label className={style.label}>
              <input
                {...register("number", {
                  required: "Поле обовязкове до заповнення",
                })}
                className={style.input}
                type="number"
                placeholder="Номер телефону"
              />
              {errors.number ? <p className={style.requiredMessage}>{errors.number.message}</p> : null}

            </label>
            <label className={style.label}>
              <input {...register("address", {
                required: "Поле обовязкове до заповнення",
              })}
                className={style.input}
                type="text"
                placeholder="Адрес доставки: місто, вулиця, номер квартири,"

              />
              {errors.address ? <p className={style.requiredMessage}>{errors.address.message}</p> : null}

            </label>

          </div>
          <input
            type="submit"
            placeholder="Order"
            className={style.button}
          />
        </form >
      </div >
    )
  }
  // Статус відправки данних 
  const Texts = (statuss) => {
    return (
      <>
        {statuss ? <h1>Данні відправляються </h1> : <h1>Помилка</h1>}
      </>

    )
  }
  return (
    <div className={isDrawerOpen ? `${style.drawer} ${style.drawerOpen}` : `${style.drawer} ${style.drawerClosed}`} onClick={(e) => closeDrawer(e)}>
      <div className={style.exit} onClick={(e) => closeDrawer(e)}></div>
      <div className={style.drawerBox}>
        <div className={isDrawerOpen ? `${style.sideBar} ${style.sideBarOpened}` : `${style.sideBar} ${style.sideBarClosed}`}>
          <h2 className={style.title}>Корзина</h2>
          {isLoading ? <Texts status={isConection} /> : isShowComplete ? <Completed /> : addedCarts.length > 0 ? <RenderCart /> : <NothingAdded />}
        </div>
        <Modal />
      </div>
    </div>
  )
}
export default Drawer;
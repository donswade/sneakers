import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import Card from './component/Card';
import Main from './pages/main';
import LikedPage from './pages/liked';
import ProfilePage from './pages/profile';
import Drawer from './component/Drawer';
import Header from './component/Header';



function App() {
  const [items, setItems] = useState([]);
  const [addedCarts, setAddedCarts] = useState([]);
  const [likedCarts, setLikedCarts] = useState([]);
  const [searchedCards, setSearchedCards] = useState([]);
  const [boughtCards, setBoughtCards] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(true)
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    axios.get("https://630a790132499100328636f0.mockapi.io/items")
      .then((res) => {
        setLoading(false)
        setItems(res.data)
        return res.data
      })
      .then((cards) => {
        axios.get("https://630a790132499100328636f0.mockapi.io/addedCards")
          .then((res) => {
            setAddedCarts(res.data)
            return res.data

          })
          .then(res => {
            const newItemss = JSON.parse(JSON.stringify(cards));

            newItemss.forEach((card, index) => {
              res.forEach((cart) => {
                if (+card.id === +cart.id) {
                  newItemss[index].isAdded = true;
                }
              });
            });
            setItems(newItemss)
          })
      })
  }, []);

  const changeDrawerStatus = () => {
    setDrawerOpen(!isDrawerOpen)
    isDrawerOpen ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden ";
  }
  const onClick = (nameButton, card) => {
    const newCard = JSON.parse(JSON.stringify(card));
    const newItems = JSON.parse(JSON.stringify(items));
    const newAddedCarts = JSON.parse(JSON.stringify(addedCarts));
    const indexOfCard = newItems.findIndex(cart => cart.id === newCard.id);

    if (nameButton === "like") {
      newCard.isLike = !newCard.isLike;
      newItems[indexOfCard] = newCard;

      setItems(newItems);

    } else if (nameButton === "add") {

      newCard.isAdded = !newCard.isAdded;

      if (newCard.isAdded) {
        console.log(newCard)
        newAddedCarts.push(newCard);
        newAddedCarts[newAddedCarts.length - 1].element = newAddedCarts.length
        newItems[indexOfCard] = newCard;
        setItems(newItems);
        setAddedCarts(newAddedCarts)
        axios.post('https://630a790132499100328636f0.mockapi.io/addedCards', newCard)
        console.log(addedCarts)

      } else {
        const index = newItems[indexOfCard].element
        console.log(newAddedCarts)
        axios.delete(`https://630a790132499100328636f0.mockapi.io/addedCards/${index}`)

        const indexOfDeletedCard = newAddedCarts.findIndex(cart => cart.name === newCard.name);
        newItems[indexOfCard] = newCard;
        newAddedCarts.splice(indexOfDeletedCard, 1);

        setItems(newItems);
        setAddedCarts(newAddedCarts)
      }
    }
    const newLikedCarts = newItems.filter(element => element.isLike);
    setLikedCarts(newLikedCarts)
  }

  const removeAdded = () => {
    const newItems = JSON.parse(JSON.stringify(items)).map(element => {
      element.isAdded = false
      return element
    })
    setItems(newItems)
  }

  const priceAddedCards = () => {
    const sumAddedCards = addedCarts.map(element => +element.price.replaceAll(' ', '')).reduce((accumulation, currentValue) => accumulation + currentValue, 0)
    return addedCarts.length ? sumAddedCards : 0;
  }

  const renderCards = (cards) => {
    return cards.map((card, index) => {
      return <Card obj={card} key={index} index={index} onClick={(nameButton, card) => onClick(nameButton, card)} />
    });
  }

  const showCartSearched = (event, array) => {
    const newCardsList = array.filter(element => element.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setInput(event.target.value);
    setSearchedCards(newCardsList);
  }


  //   [
  //   {
  //     "id": 1,
  //     "img": "img/sneakers/1.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Nike csafBlazer Mid Suede",
  //     "price": "12 999"
  //   },
  //   {
  //     "id": 2,
  //     "img": "img/sneakers/2.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Nike Air Max 270",
  //     "price": "12 999"
  //   },
  //   {
  //     "id": 3,
  //     "img": "img/sneakers/3.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Nike Blazer Mid Suede",
  //     "price": "8 499"
  //   },
  //   {
  //     "id": 4,
  //     "img": "img/sneakers/4.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Кроссовки Puma X Aka Boku Future Rider",
  //     "price": "8 499"
  //   },
  //   {
  //     "id": 5,
  //     "img": "img/sneakers/5.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Under Armour Curry 8",
  //     "price": "12 999"
  //   },
  //   {
  //     "id": 6,
  //     "img": "img/sneakers/6.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Nike Kyrie 7",
  //     "price": "12 999"
  //   },
  //   {
  //     "id": 7,
  //     "img": "img/sneakers/7.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Nike LeBron XVIII",
  //     "price": "12 999"
  //   },
  //   {
  //     "id": 8,
  //     "img": "img/sneakers/8.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Nike Lebron XVIII Low",
  //     "price": "12 999"
  //   },
  //   {
  //     "id": 9,
  //     "img": "img/sneakers/9.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Кроссовки Puma X Aka Boku Future Rider",
  //     "price": "12 499"
  //   },
  //   {
  //     "id": 10,
  //     "img": "img/sneakers/10.jpg",
  //     "isAdded": false,
  //     "isLike": false,
  //     "name": "Мужские Кроссовки Nike Air Max 270",
  //     "price": "12 999"
  //   }
  // ]

  return (
    <div className='app' style={isDrawerOpen ? { overflow: "hidden" } : { overflow: "auto" }}>
      <Drawer setBoughtCards={setBoughtCards} removeAdded={removeAdded} setAddedCarts={setAddedCarts} isDrawerOpen={isDrawerOpen} priceAddedCards={priceAddedCards} changeDrawerStatus={changeDrawerStatus} addedCarts={addedCarts} removeCart={(nameButton, card) => onClick(nameButton, card)} />
      <div className='wrapper'>
        <Header setInput={setInput} priceAddedCards={priceAddedCards} changeDrawerStatus={changeDrawerStatus} />
        <div className='content'>
          <Routes>
            <Route path="/test-react-snikers" element={
              <Main setAddedCarts={setAddedCarts} isLoading={isLoading} items={items} isDrawerOpen={isDrawerOpen} priceAddedCards={priceAddedCards} changeDrawerStatus={changeDrawerStatus} addedCarts={addedCarts} input={input} showCartSearched={showCartSearched} searchedCards={searchedCards} renderCards={(items) => renderCards(items)} onClick={(nameButton, card) => onClick(nameButton, card)} />
            }>
            </Route>
            <Route path="/test-react-snikers/liked" element={
              <LikedPage items={likedCarts} input={input} showCartSearched={showCartSearched} searchedCards={searchedCards} renderCards={(addedCarts) => renderCards(addedCarts)} />
            }></Route>
            <Route path="/test-react-snikers/profile" element={
              <ProfilePage setBoughtCards={setBoughtCards} items={boughtCards} isDrawerOpen={isDrawerOpen} priceAddedCards={priceAddedCards} changeDrawerStatus={changeDrawerStatus} addedCarts={addedCarts} input={input} showCartSearched={showCartSearched} searchedCards={searchedCards} renderCards={(addedCarts) => renderCards(addedCarts)} onClick={(nameButton, card) => onClick(nameButton, card)} />
            }></Route>
          </Routes >
        </div>
      </div>
    </div>
  );

}

export default App;

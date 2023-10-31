import NothingFounded from "../../component/NothingFounded";
import TitleAndSearch from "../../component/TitleAndSearch";

const LikedPage = ({ items, input, showCartSearched, searchedCards, renderCards }) => {
  return (
    <>
      <TitleAndSearch array={items} input={input} showCartSearched={showCartSearched} title="Вподобане" />
      <div className='content__main'>
        {input.length > 0 ? searchedCards.length > 0 ? renderCards(searchedCards) : <h2 className='nothingFound'>Нічого не знайдено</h2> : items.length > 0 ? renderCards(items) : <NothingFounded title="Пусто :(" description="Ти ще нічого не вподобав" />}
      </div>
    </>

  )
}

export default LikedPage
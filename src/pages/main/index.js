
import Baner from "../../component/Baner"
import NoLoadedCard from "../../component/notLoadedCard"
import TitleAndSearch from "../../component/TitleAndSearch"
const Main = ({ isLoading, items, changeDrawerStatus, input, showCartSearched, searchedCards, renderCards }) => {
  return (
    <>
      <Baner changeDrawerStatus={changeDrawerStatus} />
      <TitleAndSearch array={items} input={input} showCartSearched={showCartSearched} title="Кроссівки" />
      <div className='content__main'>
        {isLoading ? <NoLoadedCard /> : input.length > 0 ? searchedCards.length > 0 ? renderCards(searchedCards) : <h2 className='nothingFound'>Нічого не знайдено</h2> : renderCards(items)}
      </div>
    </>
  )
}
export default Main
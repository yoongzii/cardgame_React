//SingleCard.js

function SingleCard({card, handleChoice, flipped}) {
   const onclick = () => handleChoice(card)
   return(

      <div className='card'>
         {/* <div onClick={() => handleChoice()}> */}
         <div className={flipped ? 'flipped' : ''}>
            <img className= 'front' src={card.src} alt="앞면" />
            <img className= 'back' src= "img/card-back.png" alt="뒷면" onClick={onclick} />
         </div>
      </div>

   )
}

export default SingleCard;
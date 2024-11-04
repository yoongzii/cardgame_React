
import './style.css'
import {useState, useEffect} from 'react'
import SingleCard from './SingleCard'



const cardImg = [//index.html 위치 기준
      {  src: 'img/card1.png',
         matched: false
      },
      {  src: 'img/card2.png',
         matched: false
      },
      {  src: 'img/card3.png',
         matched: false
      },
      {  src: 'img/card4.png',
         matched: false
      },
      {  src: 'img/card5.png',
         matched: false
      },
      {  src: 'img/card6.png',
         matched: false
      },
      {  src: 'img/card7.png',
         matched: false
      },
      {  src: 'img/card8.png',
         matched: false
      },
   ]

function App() {
   const [cards, setCards] = useState([]) //shuffleCard 배열
   const [turns, setTurns] = useState(0)
   const [choiceOne, setChoiceOne] = useState(null)
   const [choiceTwo, setChoiceTwo] = useState(null)

   const shuffleCard = () => {
      //카드를 2세트로
      const pairCard = [...cardImg, ...cardImg]

      //.sort() → 오름차순
      //무작위로 섞기.sort(() => Math.random() - 0.5)

      const shuffle = pairCard.sort(() => Math.random() - 0.5)
      // console.log(shuffle);


      // id 생성(추가)한 배열 필요
      // id 추가하기 위해서 map()

      const shuffledCard = shuffle.map(card => (
         { ...card, id: Math.random()}
          // console.log(shuffledCard);
      ))

      setCards(shuffledCard)// 다시하기 누르면 다시 섞인다.
      setTurns(0) //다시하기 → 초기화

   }//shuffleCard

   const handleChoice = card => {
      // click 한 카드 정보 => card (매개변수)
      // 처음 클릭한 값은 choiceOne,
      // 두번째 클릭한 값은 choiceTwo]
      // choiceOne의 값이 null 이면 choiceOne
      // choiceOne의 값이 아니면 choiceTwo
      //choiceOne === null ? choiceOne : choiceTwo
      choiceOne === null ? setChoiceOne(card): setChoiceTwo(card)

   }


   // 컴포넌트가 마운트 되자마자 한번만 화면에 카드 보여지게
   useEffect(()=> {
      shuffleCard()
   },[])

      //선택된 2개의 카드의 src 비교하여 같으면 matched: 'true'로 변경
   //choiceOne, choiceTwo 값을 리셋
   useEffect(()=> {
      if(choiceOne && choiceTwo){//2개를 클릭했는지
         if(choiceOne.src === choiceTwo.src){
            //2개의 카드가 동일하면
            //console.log('match');
            //matched 속성값 'true' 변경
            const updateCards = cards.map(card =>
               card.src == choiceOne.src ? {...card, matched: true} : card)
            setCards(updateCards)
            resetTurn()
         }else{
            //2개의 카드가 동일하지 않을때
            }
         // resetTurn()
         setTimeout(resetTurn,500)
   }
   }, [ choiceOne, choiceTwo ])

   //값 초기화 리셋
   const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(turns + 1)
   }

   //turns가 12번 이상되면, alert 경고창 => 강제 초기화
   if(turns >= 12) {
      alert()
      shuffleCard()
      resetTurn()
    }
   //시간제한 (setTimeout)

   return (
      <div className='board'>
         <header>
            <h1>카드게임</h1>
            <div>
               <p>Turns : {turns} </p>
               <button onClick={shuffleCard}>다시하기</button>
            </div>
         </header>

         <div className="card_wrap">
            {cards.map(card => (
               /*
               <div className='card' key={card.id}>
                  <img className= 'front' src={card.src} alt="앞면" />
                  <img className= 'back' src= "img/card-back.png" alt="뒷면" />
               </div> → SingleCard로 이동
                */
               <SingleCard
               key={card.id}
               card={card}
               handleChoice={handleChoice}
               flipped={card === choiceOne || card === choiceTwo || card.matched ===true}
               // flipped={card === choiceOne || card === choiceTwo || card.matched}

               />
            ))}
         </div>
      </div>
   )
}

export default App;


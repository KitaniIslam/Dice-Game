import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allowDisplayBonus } from "../Store/Game"

const Dice = () => {
  const diceFaceNames =['one', 'two', 'three', 'four', 'five', 'six']
  const { lastAddedScore } = useSelector(state => state.game)
  const dispatch = useDispatch()
  const [dice, setDice] = useState(1)

  
  useEffect(() => {
    const animation = (target) => {
      for (let i = 1; i < 7; i++) {
        if (i === target) {
          return setTimeout(() => {
            setDice(i)
            dispatch(allowDisplayBonus())
          }, 200 * (i + 1))
        }
        setTimeout(() => {
          setDice(i)
        }, 200 * i)
      }
    }
    animation(lastAddedScore)
    return
  }, [dispatch, lastAddedScore],);

  return (
    <div style={style.diceWrapper}>
      <i className={`fas fa-dice-${diceFaceNames[dice-1]}`} style={{ fontSize: '3rem', color: '#F00D5F' }}></i>
    </div>
  )
}

const style = {
  diceWrapper: {
    backgroundColor: '#ffffff',
    padding: '0.1rem'
  }
}

export default Dice

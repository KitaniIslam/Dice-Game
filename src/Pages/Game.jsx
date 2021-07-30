import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

const Game = () => {
  const { gameConfigObject, isTheGameCreated } = useSelector(state => state.game)
  const history = useHistory()

  useEffect(() => {
    if (!isTheGameCreated) {
      // if user try to jump directly to the game before setting up names and score
      history.replace('/')
    }
  })
  return (
    <div>
      <p>{gameConfigObject.firstPlayerName}</p>
      <p>{gameConfigObject.secondPlayerName}</p>
      <p>{gameConfigObject.maxScore}</p>
    </div>
  )
}

export default Game

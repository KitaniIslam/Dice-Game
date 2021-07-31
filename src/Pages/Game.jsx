import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import Player from "../Components/Player"
import ResetRestartModal from "../Components/modal/ResetRestartModal"
import { selectPlayerToStart, setRandomBonus, switchPlayer } from '../Store/Game'
import Dice from "../Components/Dice"

const Game = () => {
  const { gameConfigObject, isTheGameCreated, firstPlayer, secondPlayer, lastAddedScore, allowedToPlay } = useSelector(state => state.game)
  const displayBonusFirstPlayer = useSelector(state => state.game.firstPlayer.showLastAddedScore)
  const displayBonusSecondPlayer = useSelector(state => state.game.secondPlayer.showLastAddedScore)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isTheGameCreated) {
      // if user try to jump directly to the game before setting up names and score
      history.replace('/')
      return
    }

    dispatch(selectPlayerToStart())
    return
    // eslint-disable-next-line
  }, [isTheGameCreated])

  useEffect(() => {
    if (displayBonusFirstPlayer || displayBonusSecondPlayer) {
      setTimeout(() => {
        dispatch(switchPlayer())
      }, 1000)
    }
    // eslint-disable-next-line
  }, [displayBonusFirstPlayer, displayBonusSecondPlayer])


  const play = (payload) => {
    dispatch(setRandomBonus({ player: payload }))
  }
  return (
    <div style={style.gameWrapper}>
      <div style={style.players}>
        <Player
          playerName={gameConfigObject.firstPlayerName}
          playerId={1}
          action={play}
          myTurn={firstPlayer.myTurn}
          totalScore={firstPlayer.totalScore}
          gainedScore={lastAddedScore}
          showLastAddedScore={firstPlayer.showLastAddedScore}
          allowedToPlay={allowedToPlay}
        />
        <div style={style.box}><Dice /></div>
        <Player
          playerName={gameConfigObject.secondPlayerName}
          playerId={2}
          action={play}
          myTurn={secondPlayer.myTurn}
          totalScore={secondPlayer.totalScore}
          gainedScore={lastAddedScore}
          showLastAddedScore={secondPlayer.showLastAddedScore}
          allowedToPlay={allowedToPlay}
        />
      </div>
      <ResetRestartModal />
    </div>
  )
}

const style = {
  gameWrapper: {
    'width': '100vw',
    'height': '100vh',
    'display': 'flex',
    'flex': 1,
    'alignItems': 'center',
    'justifyContent': 'center',
  },
  players: {
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'justifyContent': 'center',
    'border': 'solid 1px #2b2b2b',
    'width': 'fit-content',
    'position': 'relative'
  },
  box: {
    'position': 'absolute',
    'top': '30%'
  }
}

export default Game

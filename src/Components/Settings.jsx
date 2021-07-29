import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Settings = () => {

  const [firstPlayerName, setFirstPlayerName] = useState(null)
  const [secondPlayerName, setSecondPlayerName] = useState(null)
  const [maxScore, setMaxScore] = useState(15)
  const [formHaveError, setErrors] = useState({ haveError: false, messages: [] })
  const history = useHistory()

  const changeFirstUserName = (payload) => {
    setFirstPlayerName(payload.currentTarget.value)
  };

  const changeSecondUserName = (payload) => {
    setSecondPlayerName(payload.currentTarget.value)
  };

  const setScore = (payload) => {
    const score = payload.currentTarget.value
    checkForScoreErrors(score)
    setMaxScore(score)
  }


  const checkForScoreErrors = (payload) => {
    const errorMessages = []
    let haveErrors = false

    if (!payload) {
      haveErrors = true
      errorMessages.push('Numbers only')
    }

    if (payload < 15) {
      haveErrors = true
      errorMessages.push('Please set a value Greater than or equal 15')
    }

    setErrors({ ...formHaveError, messages: errorMessages, haveError: haveErrors })
    return haveErrors
  }

  const createGame = (payload) => {
    payload.preventDefault()
    if (checkForScoreErrors(maxScore)) return
    const gameConfigObject = {
      firstPlayerName: firstPlayerName?.length > 0 ? firstPlayerName : 'Player 1',
      secondPlayerName: secondPlayerName?.length > 0 ? secondPlayerName : 'Player 2',
      maxScore
    }
    // TODO: submite gameConfigObject to Store
    history.push('/game')
  }

  return (
    <form onSubmit={createGame}>
      <label>
        Player 1:
        <input type="text" name="player1" placeholder="Player 1" onChange={changeFirstUserName} />
      </label>
      <label>
        Player 2:
        <input type="text" name="player2" placeholder="Player 2" onChange={changeSecondUserName} />
      </label>
      <label>
        Max Score:
        <input type="number" name="score" value={maxScore} placeholder="Numbers only" onChange={setScore} />
      </label>
      {formHaveError.haveError && formHaveError.messages.map((errorMessage, index) => (<p key={index}>{errorMessage}</p>))}
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Settings

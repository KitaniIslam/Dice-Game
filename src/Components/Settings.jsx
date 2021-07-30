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
    <div style={style.settingsContainer}>
      <h1 style={style.formTitle}>Game Setting</h1>
      <form onSubmit={createGame} style={style.formContainer}>
        <label style={style.label}>
          Player 1
          <input type="text" name="player1" placeholder="Player 1" onChange={changeFirstUserName} />
        </label>
        <label style={style.label}>
          Player 2
          <input type="text" name="player2" placeholder="Player 2" onChange={changeSecondUserName} />
        </label>
        <label style={style.label}>
          Max Score
          <input type="number" name="score" value={maxScore} placeholder="Numbers only" onChange={setScore} />
        </label>
        {formHaveError.haveError && formHaveError.messages.map((errorMessage, index) => (<li key={index} style={style.errorMessage}>{errorMessage}</li>))}
        <input type="submit" value="Submit" style={style.submitBtn} />
      </form>
    </div>
  )
}

const style = {
  settingsContainer: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'padding': '2rem',
    'boxShadow': '0px 10px 40px rgba(0, 0, 0, 0.25)',
    'borderRadius': '7px'

  },
  formContainer: {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'minWidth': '280px'
  },
  formTitle: {
    'margin': '0 0 3rem 0'
  },
  label: {
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'space-between',
    'margin': '0 0 2rem 0'
  },
  submitBtn: {
    'backgroundColor': '#F00D5F',
    'color': '#ffffff',
    'borderRadius': '3px',
    'border': 'none',
    'width': 'fit-content',
    'padding': '6px 24px',
    'alignSelf': 'center',
    'margin': '1rem 0 0 0'
  },
  errorMessage: {
    'color': '#F00D5F',
    'fontSize': '0.8rem'
  }
}

export default Settings

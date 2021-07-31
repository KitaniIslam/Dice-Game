import Button from "./Button"

const Player = ({ playerName,playerId, action, totalScore, gainedScore, myTurn,showLastAddedScore, allowedToPlay }) => {

  return (
    <div className="player" style={style.player}>
      <div style={style.centerElements}>
        <p>{playerName}</p>
        <div style={{ ...style.activeIndicator, 'backgroundColor': myTurn ? '#F00D5F' : '#7c7a7a' }} />
      </div>
      <div style={style.centerElements}>
        <div style={myTurn ? style.scoreIndicatorActive : style.scoreIndicatorInactive}>
          <p>{totalScore}</p>
          {showLastAddedScore && <div style={style.addToScore}>+{gainedScore}</div>}
        </div>
        <Button text="Run" active={myTurn} action={action} playerId={playerId} allowedToClick={allowedToPlay}/>
      </div>
    </div>
  )
}

const style = {
  player: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'space-between',
    'width': 'fit-content',
    'padding': '2rem 4rem',
    'height': '280px',
    'backgroundColor': '#FBFBFB'
  },
  activeIndicator: {
    'width': '8px',
    'height': '8px',
    'borderRadius': '50%',
    'margin': '0.5rem 0 0 0'
  },
  scoreIndicatorActive: {
    'width': '60px',
    'height': '60px',
    'borderRadius': '50%',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'position': 'relative',
    'backgroundColor': '#F00D5F',
    'color': '#ffffff',
  },
  scoreIndicatorInactive: {
    'width': '60px',
    'height': '60px',
    'borderRadius': '50%',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'position': 'relative',
    'border': 'solid 0.5px #000000',
  },
  centerElements: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
  },
  addToScore: {
    'position': 'absolute',
    'top': '-50%',
    'right': '0',
    'backgroundColor': '#F00D5F',
    'borderRadius': '50%',
    'fontSize': '0.8rem',
    'padding': '0.3rem'

  }
}

export default Player
import { useSelector } from "react-redux"
import './style.css'
import Button from '../Button'



const ResetRestartModal = () => {
  const { gameEnded, winnerName } = useSelector(state => state.game.winner)

  const handleClose = () => {}
  return (
    <div className={gameEnded ? 'modal display-block' : 'modal display-none'}>
      <section className='modal-main'>
        <p>{winnerName} win</p>
        <Button active={true} action={handleClose} text="New Game" playerId={0} allowedToClick={true} ></Button>
        <Button active={true} action={handleClose} text="Exit" playerId={0} customStyle={style.exitButton} allowedToClick={true}></Button>
      </section>
    </div>
  );
};

const style = {
  exitButton: {
    'borderRadius': '3px',
    'border': 'none',
    'width': 'fit-content',
    'padding': '6px 24px',
    'alignSelf': 'center',
    'margin': '1rem 0 0 0',
    'backgroundColor': '#CCCCCC',
    'color': '#7f8c8d',
    'cursor': 'pointer'
  }
}

export default ResetRestartModal

import { useDispatch, useSelector } from "react-redux"
import { freezeTheGame } from '../../Store/Game'
import './style.css'
import Button from '../Button'



const ResetRestartModal = () => {
  const { gameEnded, winnerName } = useSelector(state => state.game.winner)
  const dispatch = useDispatch()
  const handleClose = () => { }
  const closeModal = () => {
    dispatch(freezeTheGame())
  }
  return (
    <div className={gameEnded ? 'modal display-block' : 'modal display-none'}>
      <section className='modal-main'>
        <i className="close-icon fas fa-times-circle" onClick={() => closeModal()}></i>
        <p className="winner-title">{winnerName} win</p>
        <div>
          <Button active={true} action={handleClose} text="New Game" playerId={0} allowedToClick={true} ></Button>
          <Button active={true} action={closeModal} text="Exit" playerId={0} customStyle={style.exitButton} allowedToClick={true}></Button>
        </div>
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
    'margin': '1rem 0 0 1rem',
    'backgroundColor': '#CCCCCC',
    'color': '#7f8c8d',
    'cursor': 'pointer',
  }
}

export default ResetRestartModal

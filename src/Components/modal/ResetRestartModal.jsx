import { useState } from 'react';
import './style.css'
import Button from '../Button'



const ResetRestartModal = () => {
  
  const [show, setModalVisible] = useState(true)
  const handleClose = () => {
    setModalVisible(false)
  }
  return (
    <div className={show ? 'modal display-block' : 'modal display-none'}>
      <section className='modal-main'>
        <p>Player X win</p>
        <Button active={true} action={handleClose} text="New Game" playerId={0}></Button>
        <Button active={true} action={handleClose} text="Exit" playerId={0} customStyle= {style.exitButton}></Button>
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

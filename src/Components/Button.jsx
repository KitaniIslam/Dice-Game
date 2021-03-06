import PropTypes from 'prop-types'

const Button = ({ text, active, action, playerId, customStyle, allowedToClick }) => {
  return (
    <button
      style={customStyle || {
        ...style.submitBtn,
        'backgroundColor': active ? '#F00D5F' : '#CCCCCC',
        'color': active ? '#ffffff' :'#7f8c8d',
        'cursor': active && allowedToClick ? 'pointer' : 'not-allowed'
      }}
      disabled={!active || !allowedToClick}
      onClick={() => action(playerId)}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  playerId: PropTypes.number.isRequired,
  customStyle: PropTypes.object,
  allowedToClick: PropTypes.bool.isRequired
}

const style = {
  submitBtn: {
    'borderRadius': '3px',
    'border': 'none',
    'width': 'fit-content',
    'padding': '6px 24px',
    'alignSelf': 'center',
    'margin': '1rem 0 0 0',
  }
}

export default Button

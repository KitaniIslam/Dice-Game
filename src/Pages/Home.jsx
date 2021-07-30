import Settings from "../Components/Settings"

const Home = () => {
  return (
    <div style={style.homeContainer}>
      <Settings />
    </div>
  )
}

const style = {
  homeContainer: {
    'width': '100vw',
    'height': '100vh',
    'display': 'flex',
    'flex': 1,
    'alignItems': 'center',
    'justifyContent': 'center'
  }
}

export default Home

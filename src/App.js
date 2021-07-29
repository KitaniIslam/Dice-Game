import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Game from './Pages/Game'
import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Switch>
        {/* <Redirect exact from="/" to="/game" /> */}
        <Router exact path="/" >
          <Home />
        </Router>
        <Route exact path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

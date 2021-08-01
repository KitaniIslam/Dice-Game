import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Game from './Pages/Game'
import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

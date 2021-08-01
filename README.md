# Dice Game

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

----

**Note: the only thing wasn't clear is when you mentioned `game start` at route `/game` ! means after setting up the game should i redirect player to `/game` ( that's what i did ) or you're looking for nested routes ( means both settings component and the game component should be switched at the `/game` level )**

### Settings and The Game should start at `/game`

at first redirect user to /game directly

```html
  # insted of :
  <Route exact path="/" >
    <Home />
  </Route>

  # use Redirect from the react-router-dom
  <Redirect exact from="/" to="/game" />
```

then create a switch between setting and the game component after moving the game page content to new gameComponent at `/src/components`.

and it's going to looks like that :

```html
<Switch>
  <Route exact path="/">
    <Settings />
  </Route>
  <Route path="/topics">
    <Game />
  </Route>
</Switch>
```

folowing the same logic i'm using to show/hide different elements

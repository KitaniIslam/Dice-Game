import { configureStore } from "@reduxjs/toolkit";

import Game from './Game'

export default configureStore({
  reducer: {
    game: Game
  }
})
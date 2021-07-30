import { createSlice } from '@reduxjs/toolkit'

export const game = createSlice({
  name: 'game',
  initialState: {
    isTheGameCreated: false,
    gameConfigObject: {
      firstPlayerName: 'Player 1',
      secondPlayerName: 'Player 2',
      maxScore: 15,
    },
  },
  reducers: {
    setGameConfiguration: (state, action) => {
      const { firstPlayerName, secondPlayerName, maxScore } = action.payload
      state.gameConfigObject = {
        ...state.gameConfigObject,
        firstPlayerName,
        secondPlayerName,
        maxScore
      }
      state.isTheGameCreated = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGameConfiguration } = game.actions

export default game.reducer
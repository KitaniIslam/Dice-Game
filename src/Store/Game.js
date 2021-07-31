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
    firstPlayer: {
      totalScore: 0,
      showLastAddedScore: false,
      myTurn: false
    },
    secondPlayer: {
      totalScore: 0,
      showLastAddedScore: false,
      myTurn: false
    },
    lastAddedScore: 0,
    mostResentPlayer:0,
    winner: null
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
    selectPlayerToStart(state) {
      const randomPlayerId = Math.floor(Math.random() * 2) + 1
      switch (randomPlayerId) {
        case 1:
          state.firstPlayer = {...state.firstPlayer, myTurn: true}
          break;
        default:
          state.secondPlayer = {...state.secondPlayer, myTurn: true}
          break;
      }
      state.mostResentPlayer = randomPlayerId
    },
    setRandomBonus(state, action) {
      const randomScore = Math.floor(Math.random() * 6) + 1
      state.lastAddedScore = randomScore
      state.mostResentPlayer= action.payload.player
    },
    allowDisplayBonus(state) {
      const lastAddedScore = state.lastAddedScore
      switch (state.mostResentPlayer) {
        case(1):
          state.firstPlayer = {...state.firstPlayer, showLastAddedScore: true, totalScore: state.firstPlayer.totalScore + lastAddedScore}
          break;
        default:
          state.secondPlayer = {...state.secondPlayer, showLastAddedScore: true, totalScore: state.secondPlayer.totalScore + lastAddedScore}
          break;
      }
    },
    switchPlayer(state, action) {
      switch (state.mostResentPlayer) {
        case 1:
          state.firstPlayer = {...state.firstPlayer, myTurn: false, showLastAddedScore: false}
          state.secondPlayer = {...state.secondPlayer, myTurn: true, showLastAddedScore: false}
          break;
        default:
          state.secondPlayer = {...state.secondPlayer, myTurn: false, showLastAddedScore: false}
          state.firstPlayer = {...state.firstPlayer, myTurn: true, showLastAddedScore: false}
          break;
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { setGameConfiguration, selectPlayerToStart, switchPlayer, setRandomBonus, allowDisplayBonus } = game.actions

export default game.reducer
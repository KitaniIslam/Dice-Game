import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setRandomBonus = createAsyncThunk(
  'game/setRandomBonus',
  async (payload) => {
    const randomScore = await Math.floor(Math.random() * 6) + 1
    return {...payload, randomScore: randomScore}
  }
)

export const game = createSlice({
  name: 'game',
  initialState: {
    isTheGameCreated: false,
    allowedToPlay: false,
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
    winner: {
      gameEnded: false,
      winnerName: null
    }
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
      state.allowedToPlay = true
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
      game.caseReducers.checkWinner(state)
    },
    switchPlayer(state) {
      switch (state.mostResentPlayer) {
        case 1:
          state.firstPlayer = {...state.firstPlayer, myTurn: state.lastAddedScore === 6, showLastAddedScore: false}
          state.secondPlayer = {...state.secondPlayer, myTurn: state.lastAddedScore !== 6, showLastAddedScore: false}
          break;
        default:
          state.secondPlayer = {...state.secondPlayer, myTurn: state.lastAddedScore === 6, showLastAddedScore: false}
          state.firstPlayer = {...state.firstPlayer, myTurn: state.lastAddedScore !== 6, showLastAddedScore: false}
          break;
      }
      state.allowedToPlay = true
    },
    checkWinner(state) {
      if (state.firstPlayer.totalScore >= state.gameConfigObject.maxScore) {
        state.winner = {...state.winner, gameEnded: true, winnerName: state.gameConfigObject.firstPlayerName}
      }
      if (state.secondPlayer.totalScore >= state.gameConfigObject.maxScore) {
        state.winner = {...state.winner, gameEnded: true, winnerName: state.gameConfigObject.secondPlayerName}
      }
    },
  },
  extraReducers: {
    [setRandomBonus.fulfilled] : (state, action) => {
      state.allowedToPlay = false
      state.lastAddedScore = action.payload.randomScore
      state.mostResentPlayer= action.payload.player
    }
  }
})

// Action creators are generated for each case reducer function
export const { setGameConfiguration, selectPlayerToStart, switchPlayer, allowDisplayBonus, checkWinner } = game.actions

export default game.reducer
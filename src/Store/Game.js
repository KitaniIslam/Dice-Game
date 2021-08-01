import { createSlice } from '@reduxjs/toolkit'


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
    setRandomBonus(state, action) {
      state.allowedToPlay = false
      let newScore = Math.floor(Math.random() * 6) + 1
      
      if (newScore === state.lastAddedScore) {
        newScore += (Math.floor(Math.random() * 5) + 1)

        if (newScore > 6) {
          newScore = newScore % 6
        }
      }

      state.lastAddedScore = newScore
      state.mostResentPlayer = action.payload.player
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
    freezeTheGame(state) {
      state.allowedToPlay = false
      state.winner = {...state.winner, gameEnded: false, winnerName: null }
    },
    restartTheGame(state, action) {
      state.firstPlayer = {...state.firstPlayer, totalScore: 0, showLastAddedScore: false, myTurn: false}
      state.secondPlayer = {...state.secondPlayer, totalScore: 0, showLastAddedScore: false, myTurn: false}
      state.winner = {...state.winner, gameEnded: false, winnerName: null }
      state.lastAddedScore = 
      state.winner = {...state.winner, gameEnded: false, winnerName: null }

      if (action.payload.exit) {
        state.isTheGameCreated = false
      } else {
        game.caseReducers.selectPlayerToStart(state)
      }
    },
    exitTheGame(state, action) {
      // call restartTheGame() to clean the store for the next game and exit
      game.caseReducers.restartTheGame(state, {payload: { exit: action.payload.exit }})
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGameConfiguration, selectPlayerToStart, switchPlayer, allowDisplayBonus, checkWinner, setRandomBonus, freezeTheGame, restartTheGame, exitTheGame } = game.actions

export default game.reducer
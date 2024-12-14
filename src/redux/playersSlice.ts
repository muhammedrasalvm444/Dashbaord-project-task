import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerDataTypes } from "../components/Types/Types";
import { playersList } from "../utils/constants";
import { RootState } from "./store";

type InitalValueType = {
  players: PlayerDataTypes[];
  mode: "add" | "modify" | "view";
  singleSelctedItem: null | PlayerDataTypes;
};
// Initial state with nested players
const initialState: InitalValueType = {
  players: playersList,
  mode: "view",
  singleSelctedItem: null,
};

// Redux slice
const playerSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    editPlayer: (state, action: PayloadAction<PlayerDataTypes>) => {
      const index = state.players?.findIndex(
        (player) => player.id === action.payload.id
      );
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    addPlayer: (state, action) => {
      state.players.unshift(action.payload); // Appends the new player to the players array
    },
    deletePlayer: (state, action: PayloadAction<number>) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload
      );
    },
    setMode: (state, action: PayloadAction<any>) => {
      state.mode = action?.payload;
    },
    setSingleItemData: (
      state,
      action: PayloadAction<PlayerDataTypes | null>
    ) => {
      state.singleSelctedItem = action?.payload;
    },
  },
});

export const {
  editPlayer,
  deletePlayer,
  setMode,
  setSingleItemData,
  addPlayer,
} = playerSlice.actions;
export default playerSlice.reducer;

export const getPlayersList = (state: RootState) => state.players.players;
export const getActiveMode = (state: RootState) => state.players.mode;
export const getSingleSelctedItem = (state: RootState) =>
  state.players.singleSelctedItem;

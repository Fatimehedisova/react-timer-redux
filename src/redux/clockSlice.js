import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    time: 0,
    isRunning: false,
    startTime: null,
    elapsedBeforePause: 0,
    stopTimes: [],
};

export const clockSlice = createSlice({
    name: "clock",
    initialState,
    reducers: {
        startTimer: (state) => {
            if (!state.isRunning) {
                state.isRunning = true;
                state.startTime = Date.now();
            }
        },
        stopTimer: (state) => {
            if (state.isRunning) {
                state.isRunning = false;
                state.elapsedBeforePause = state.time * 1000;
            }
        },
        resetTimer: (state) => {
            state.time = 0;
            state.isRunning = false;
            state.startTime = null;
            state.elapsedBeforePause = 0;
            state.stopTimes = [];
        },
        updateTime: (state) => {
            if (state.isRunning && state.startTime) {
                const now = Date.now();
                const elapsedMs = state.elapsedBeforePause + (now - state.startTime);
                state.time = Math.floor(elapsedMs / 1000);
            }
        },
        lap: (state) => {
            const hours = Math.floor(state.time / 3600);
            const minutes = Math.floor((state.time % 3600) / 60);
            const seconds = state.time % 60;
            const formatted = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""
                }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            state.stopTimes.push(formatted);
        }
    },
});

export const {
    startTimer,
    stopTimer,
    resetTimer,
    updateTime,
    lap
} = clockSlice.actions;

export default clockSlice.reducer;

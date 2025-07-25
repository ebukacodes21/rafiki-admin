import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Firm, InitialFirmState } from "@/types/types";

export const initializeFirmFromLocalStorage = () => (dispatch: Dispatch) => {
    if (typeof window === "undefined") return;
    const storedData = window.localStorage.getItem("admin_firm");
    let firmInLocalStorage = null;
    try {
        firmInLocalStorage = storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
    }
    if (firmInLocalStorage) {
        dispatch(setFirm(firmInLocalStorage));
    }
};

const initialState = {
    firm: null
} as InitialFirmState;

const firmSlice = createSlice({
    name: 'Firm Slice',
    initialState,
    reducers: {
        setFirm(state, payload: PayloadAction<Firm>) {
            state.firm = payload.payload;
            localStorage.setItem('admin_firm', JSON.stringify(payload.payload));
        },
    },
});

export const firmReducer = firmSlice.reducer;
export const { setFirm } = firmSlice.actions;
export const selectCurrentFirm = (state: RootState) => state.firmReducer.firm;
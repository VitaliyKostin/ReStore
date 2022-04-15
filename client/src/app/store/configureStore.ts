import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BasketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { counterSlice } from "../../features/contact/counterSlice";

// export function configureStore() {
//     return createStore(counterReducer)
// }

export const store = configureStore({
    reducer: {
         counter: counterSlice.reducer,
         basket: BasketSlice.reducer,
         catalog: catalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDipatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDipatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
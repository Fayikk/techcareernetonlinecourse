import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "../features/courseSlice";

export const store = configureStore({
    reducer:{
        course:courseSlice
    },

    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



//useDispatch => useAppDispatch
//useSelector => useAppSelector
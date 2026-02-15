import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseDTO } from "../type";
import { api } from "../services/api";



interface CourseState {
    courses:CourseDTO[] | null,
    isLoading:boolean,
    error:string | null,
    course:CourseDTO | null
}


const initialState : CourseState = {
    courses:null,
    isLoading:false,
    error:null,
    course:null
}

export const fetchCourses = createAsyncThunk(
    'courses/fetchcourses',
    async (_,{rejectWithValue}) => {
        try{
            const response = await api.get<CourseDTO[]>("/Course");
            return response.data;
        }
        catch(err){
            return rejectWithValue("Failed fetch to courses")
        }
    }
)


export const fetchCourse = createAsyncThunk(
    'courses/fetchCourse',
    async (id:string,{rejectWithValue}) => {
        try{
            const response = await api.get<CourseDTO>(`/Course/${id}`);
            return response.data;
        }
        catch(err){
            return rejectWithValue("Failed fetch to courses")
        }
    }
)



const courseSlice = createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchCourses.pending,(state) => {
            state.isLoading = true;
        }).addCase(fetchCourses.fulfilled,(state,action) => {
            state.isLoading = false;
            state.courses = action.payload
        }).addCase(fetchCourses.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload as string
        })
        .addCase(fetchCourse.pending,(state) => {
            state.isLoading = true;
        }).addCase(fetchCourse.fulfilled,(state,action) => {
            state.isLoading = false;
            state.course = action.payload
        }).addCase(fetchCourse.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload as string
        })
    }
})


export default courseSlice.reducer;
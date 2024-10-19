import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios  from "axios";


export const signupUser=createAsyncThunk(  //  user signup action

    'auth/signupUser',

    async(userData,thunkAPI)=>{

        try {

            console.log("userData for api call:",userData)

            const response=await axios.post("http://localhost:4000/signup",userData)

            console.log("Response made:",response)
            console.log("responseData:",response.data)

            return response.data
            
        } catch (error) {


            console.log("error made in api call")

            return thunkAPI.rejectWithValue(error.response.data);
            
        }
    }
)


export const loginUser=createAsyncThunk(  // user login action
    'auth/loginUser',
    async(userData,thunkAPI)=>{

        try {

            console.log("Api call for login with user:",userData)

            const response=await axios.post("http://localhost:4000/login",userData)

            console.log("Response made:",response)
            console.log("response.data:",response.data)

            return response.data
            
        } catch (error) {

            console.log("error made in API call")
            return thunkAPI.rejectWithValue(error.response.data)
            
        }
    }
)


export const loginAdmin=createAsyncThunk(  // admin login action
  'auth/loginAdmin',
  async(userData,thunkAPI)=>{

      try {

          console.log("Api call for login with user:",userData)

          const response=await axios.post("http://localhost:4000/admin/",userData)

          console.log("Response made:",response)
          console.log("response.data:",response.data)


          return response.data
          
      } catch (error) {

          console.log("error made in API call")
          return thunkAPI.rejectWithValue(error.response.data)
          
      }
  }
)


export const updateProfilePicture = createAsyncThunk(
  'auth/updateProfilePicture',
  async (formData, thunkAPI) => {
 
    try {
      const token = thunkAPI.getState().auth.token; 
      console.log("token got for DP:",token)
        const response = await axios.post("http://localhost:4000/update-profile", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}
);




const authSlice=createSlice({
    name:"auth",
    initialState:{
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    },

    reducers:{
        reset:(state)=>{
            state.isLoading=false,
            state.isSuccess=false,
            state.isError=false,
            state.message=""

        },
        logout: (state) => {
            state.user = null;
            state.token = null;
           
          },
          updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }; // Update user with new data
        },
          
    },


    extraReducers:(builder) => {
         // Signup reducers
        builder
          .addCase(signupUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload; // Store the user data in the state
          })
          .addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload; // Store the error message
          });

          // Login reducers
      builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.data; // Assuming the response includes a user object
      state.token = action.payload.token; // Store the JWT token
      

    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload; // Store the error message
    });


     // Admin Login reducers
     builder
     .addCase(loginAdmin.pending, (state) => {
       state.isLoading = true;
     })
     .addCase(loginAdmin.fulfilled, (state, action) => {
       state.isLoading = false;
       state.isSuccess = true;
       state.user = action.payload.data; // Assuming the response includes a user object for admin
       state.token = action.payload.token; // Storing the JWT token for admin
       localStorage.setItem('token', action.payload.token);// Storing the JWT token for admin in the local storage
     })
     .addCase(loginAdmin.rejected, (state, action) => {
       state.isLoading = false;
       state.isError = true;
       state.message = action.payload; // Store the error message
     });


      // Profile Picture Update
    builder
    .addCase(updateProfilePicture.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload.data; 
        state.user = { ...state.user, ...action.payload.user };
    })
    .addCase(updateProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Store the error message
    });
}


      






})


export const { reset,logout } = authSlice.actions;
export default authSlice.reducer;





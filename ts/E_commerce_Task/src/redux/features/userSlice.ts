import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { getUsers } from "../../services/UserServices";

// ✅ User Type
// interface UserType {
//   id: number;
  // add more fields if you have (name, email, etc.)
//   [key: string]: any;
// }

// ✅ State Type
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// ✅ fetch users (API)
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const data = await getUsers();
    return data;
  }
);

// ✅ Initial State
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
	name: "admin",
	initialState: {
		id: 0,
		email: "",
		username: "",
		fullname: "",
		url_image: process.env.DEFAULT_PROFILE,
		address: "",
		telephone: "",
		gender: "",
		is_super_admin: false,
	},
	reducers: {
		storeAdmin: (state, action) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.fullname = action.payload.fullname;
			state.url_image = action.payload.url_image;
			state.telephone = action.payload.telephone;
			state.address = action.payload.address;
			state.gender = action.payload.gender;
			state.is_super_admin = action.payload.is_super_admin;
		},
		clearAdmin: (state) => {
			state.id = 0;
			state.email = "";
			state.username = "";
			state.fullname = "";
			state.url_image = process.env.DEFAULT_PROFILE;
			state.address = "";
			state.telephone = "";
			state.gender = "";
			state.is_super_admin = false;
		},
	},
});

export const { storeAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;

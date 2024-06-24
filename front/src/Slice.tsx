import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { data } from "./interfaces";
import { filter_parametrs } from "./interfaces";

interface initial_state {
    filter: Array<filter_parametrs>
    page: number
    user_id: string
    db: Array<data>
    isAuthorizate: boolean
    user: string
}


const initialState: initial_state = {
    filter: [{
        filter_param: 'CUSTOMER NAME',
        key: 'none',
        filter_type: 'contains',
        filter_body: '',
        filter_id: 0
    }],
    page: 1,
    user_id: '',
    db: [],
    isAuthorizate: false,
    user: ''
}

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        change_page(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        add_filter(state, action: PayloadAction<filter_parametrs>) {
            state.filter.push(action.payload)
        },
        change_filter_type(state, action: PayloadAction<filter_parametrs>) {
            state.filter[action.payload.filter_id].filter_type = action.payload.filter_type
        },
        change_filter_body(state, action: PayloadAction<filter_parametrs>) {
            state.filter[action.payload.filter_id].filter_body = action.payload.filter_body
        },
        edit_user(state, action: PayloadAction<string>) {
            state.user_id = action.payload
        },
        delete_filter(state, action: PayloadAction<number>) {
            state.filter.splice(action.payload, 1)
        },
        set_db(state, action: PayloadAction<data[]>) {
            state.db = action.payload
        },
        set_auth(state, action: PayloadAction<boolean>) {
            state.isAuthorizate = action.payload
        },
        user_login(state, action: PayloadAction<string>) {
            state.user = action.payload
        }
    }

})
export const redusers = slice.reducer
export const {
    change_page, add_filter,
    change_filter_body,
    change_filter_type,
    edit_user,
    delete_filter,
    set_db,
    set_auth,
    user_login } = slice.actions
import { Navigate } from "react-router-dom"
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from './redux'
import React from 'react'

interface Child {
    children: React.ReactNode
}

export const IsAuth = ({ children }: Child) => {
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    if (!typedSelector(state => state.global_store.isAuthorizate)) {
        return <Navigate to="authorization" />
    }
    else {
        return <>{children}</>
    }
}
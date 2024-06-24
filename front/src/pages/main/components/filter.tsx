import { data } from "../../../interfaces";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from '../../../redux'
import { filter_parametrs } from "../../../interfaces";


export const filtrate = (db: Array<data>): Array<data> => {
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const f = typedSelector(state => state.global_store.filter)

    const second_sort = (body: string, filt: filter_parametrs) => {
        let filter=Object.assign({}, filt)
        filter.filter_body=filter.filter_body.toLowerCase()
        switch (filter.filter_type) {
            case 'contains': 
                 { return (body.includes(filter.filter_body)) }
            case 'not contains': 
                 { return !(body.includes(filter.filter_body)) }
            case 'equals': 
                 { return (body === filter.filter_body) }
            case 'not equal': 
                 { return (body !== filter.filter_body) }
            case 'empty': 
                 { return (body == null) }
            case 'bol': 
                 { return (body === filter.filter_body) }
            default: return false
        }
    }
    const first_sort = (body: string): string => {
        switch (body) {
            case 'CUSTOMER NAME': 
                 { return 'username' }
            case 'EMAIL': 
                 { return 'email' }
            case 'COUNTRY': 
                 { return 'country' }
            case 'CITY': 
                 { return 'city' }
            case 'VERIFIED': 
                 { return 'verified' }
            case 'CARD VERIFIED': 
                 { return 'card_verified' }
            case 'ACTIVATED': 
                 { return 'activated' }
            case 'BLOCKED': 
                 { return 'blocked' }
            default: return ''
        }
    }
    f.forEach((filter) => { 
        db = db.filter((user) => { 
            return second_sort(
                   user[first_sort(filter.filter_param) as keyof typeof user].toString().toLowerCase(), 
                   filter) }) })
    return db

}
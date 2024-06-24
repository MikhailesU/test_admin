import { useState } from "react";
import { add_filter, change_filter_body, change_filter_type, delete_filter, change_page } from "../../../Slice";
import { TypedUseSelectorHook } from "react-redux";
import type { RootState, TypedDispatch } from '../../../redux'
import { useSelector, useDispatch } from "react-redux";
import type { filter_parametrs } from "../../../interfaces";
import { props } from '../../../interfaces'


const Filters = () => {
   const useTypedDispatch = () => useDispatch<TypedDispatch>()
   const dispatch = useTypedDispatch()
   const typedSelector: TypedUseSelectorHook<RootState> = useSelector
   const filters = typedSelector(state => state.global_store.filter.slice(1))
   return (
      <ul>{filters.map((flag: filter_parametrs, i) => {
         return (
            <li key={flag.filter_param + flag.key} className="filter">
               <div>
                  <div key={flag.filter_param + flag.key + 'div'} className="filter_head">
                     <p onClick={() => {
                        dispatch(delete_filter(i + 1));
                        dispatch(change_page(1))
                     }}>{'\u2573'}</p>
                     {flag.filter_param}
                  </div>
               </div>
               {flag.filter_type === 'bol' ?
                  (
                     <select key={flag.filter_param + flag.key + 'select1'} onChange={(e) => {
                        dispatch(change_filter_body(
                           {
                              filter_param: flag.filter_param,
                              key: flag.key,
                              filter_type: 'bol',
                              filter_body: e.target.value === 'Yes' ? 'true' : 'false',
                              filter_id: i + 1
                           })); dispatch(change_page(1))
                     }} style={{ boxShadow: '#0000' }}>{['Yes', 'No'].map((opt) =>
                        <option key={flag.filter_param + flag.key + opt + '1'} value={opt}>
                           {opt}
                        </option>)}
                     </select>) :
                  (<>
                     <select key={flag.filter_param + flag.key + 'select'} onChange={(e) => {
                        dispatch(change_filter_type(
                           {
                              filter_param: flag.filter_param,
                              key: flag.key,
                              filter_type: e.target.value,
                              filter_body: '',
                              filter_id: i + 1
                           })); dispatch(change_page(1))
                     }} style={{ marginRight: '15px' }}>
                        {['contains',
                           'not contains',
                           'equals',
                           'not equal',
                           'empty'].map((opt) =>
                              <option key={flag.filter_param + flag.key + opt} value={opt}>
                                 {opt}
                              </option>)}
                     </select>
                     <input type="text" name="filter_param" key={flag.filter_param + flag.key + 'input'} onChange={(e) => {
                        dispatch(change_filter_body(
                           {
                              filter_param: flag.filter_param,
                              key: flag.key,
                              filter_type: '',
                              filter_body: e.target.value,
                              filter_id: i + 1
                           })); dispatch(change_page(1))
                     }} /></>)}
            </li>)
      })}</ul>)

}

export const Search = (props: props) => {
   const useTypedDispatch = () => useDispatch<TypedDispatch>()
   const dispatch = useTypedDispatch()
   const typedSelector: TypedUseSelectorHook<RootState> = useSelector
   const filt = typedSelector(state => state.global_store.filter)
   const [click, setClick] = useState(false)

   const Drop = <div className="dropdown">
      <ul>{['CUSTOMER NAME',
         'EMAIL',
         'COUNTRY',
         'CITY',
         'VERIFIED',
         'CARD VERIFIED',
         'ACTIVATED',
         'BLOCKED',].map((li: string) => <li className="drop_filter" key={li} onClick={() => {
            dispatch(add_filter(
               {
                  filter_param: li,
                  key: (new Date).toLocaleString() + (new Date).getMilliseconds().toString(),
                  filter_type: ['VERIFIED', 'CARD VERIFIED', 'ACTIVATED', 'BLOCKED'].some(x => x === li) ? 'bol' : 'contains',
                  filter_body: ['VERIFIED', 'CARD VERIFIED', 'ACTIVATED', 'BLOCKED'].some(x => x === li) ? 'true' : '',
                  filter_id: filt.length
               })); dispatch(change_page(1))
         }}><a key={li + 'a'}>{li}</a></li>)}</ul></div>

   return <div>
      <div className="container">
         <div className="dropers">
            <p>List {'(' + props.count + ')'}</p>
         </div>
         <div onClick={() => setClick(!click)} className={click ? 'dropers_active' : 'dropers2'}>
            <p>{'ADD FILTER\u25BC'}</p>
            {click && Drop}
         </div>
      </div>
      <div className="container_for_filters">
         <Filters />
      </div>
   </div>

}
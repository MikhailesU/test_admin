import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, TypedDispatch } from '../../../redux'
import { change_page } from "../../../Slice";
import { props } from '../../../interfaces'
import { useRef, useEffect } from "react";


const Button = function (props: props) {
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const page = typedSelector(state => state.global_store.page)
    const sliced = typedSelector(state => state.global_store.db)
    const ref = useRef<HTMLLIElement>(null)
    const useTypedDispatch = () => useDispatch<TypedDispatch>()
    const dispatch = useTypedDispatch()
    useEffect(() => {
        if (page === 1&&props.count===1 || page === Math.ceil(sliced.length / 20)-1&&props.count===Math.ceil(sliced.length / 20)-1) {
            if (ref.current) {
                ref.current.focus();
            }
        }
    }, []);
    function handleClick() {
        dispatch(change_page(props.count)); 
        if (ref.current) {ref.current.focus()}
      }
    return (
        <li key={props.count} ref={ref} onClick={handleClick} tabIndex={0}>{props.count}</li>
    )
}

export const Buttons = (props: props) => {
    const typedSelector: TypedUseSelectorHook<RootState> = useSelector
    const page = typedSelector(state => state.global_store.page)
    const sliced = Math.ceil(props.count / 20)
    const buttons = function* (end: number) {
        for (let i = 1; i <= end + 1; i++) yield <Button count={i} key={(i+i^2)+'li'}></Button>;
    };
    const slide = () => {
        const slide_view = () => {
            if (page <= 5) {
                return (<div>{[...buttons(9)]}</div>)
            }
            else if (page >= sliced - 6) {
                return <div>{[...buttons(sliced - 1)].slice(sliced - 11, sliced - 1)}</div>
            }
            else {
                return <div>{[...buttons(sliced - 1)].slice(page - 5, page + 4)}</div>
            }
        }
        return (
            <div className="buttons">
                {page > 5 && <>
                    <div>
                        <Button count={1}key={'1li1'}></Button>
                    </div>
                    <p className="tripledot">...</p></>}
                {slide_view()}
                {page < sliced - 6 && <><p>...</p>
                    <div>
                        <Button count={sliced - 1} key={'lastlyli'}></Button>
                    </div></>}
            </div>)
    }
    return (
        (props.count < 201) ?
            <div className="buttons">{[...buttons(sliced - 1)]}</div> : slide()
    )
}
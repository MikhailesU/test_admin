import { Search } from "./components/search"
import { Table } from "./components/table"
import { Buttons } from "./components/page"
import { data } from "../../interfaces"
import { Await, useLoaderData } from "react-router-dom"
import { useDispatch } from "react-redux";
import type { TypedDispatch } from '../../redux'
import { set_db } from "../../Slice"
import { filtrate } from "./components/filter"

interface props {
    database: Promise<data[]>
}

export const Body = () => {
    const useTypedDispatch = () => useDispatch<TypedDispatch>()
    const dispatch = useTypedDispatch()
    const { database } = useLoaderData() as props;
    return (
        <Await resolve={database}>
            {(database) => {
                dispatch(set_db(database));
                const filterdatabase = filtrate(database);
                return (<>
                    <div className="body">
                        <Search count={filterdatabase.length} />
                        <div className="table_container">
                            <Table data={filterdatabase} />
                        </div>
                    </div>
                    <Buttons count={filterdatabase.length} /></>)
            }}
        </Await>)
}
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import {useEffect, useState} from 'react'
import * as qs from 'qs'

import { cleanObject, useDebounce, useMount } from "../../utils"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = ()=>{



    const [param, setParam] = useState({
        name: '', 
        personId: ''
    })

    
    const [list, setList] = useState([])

    const [users, setUsers] = useState([])
    const deBouncedParam = useDebounce(param, 2000); 


    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(deBouncedParam))}`).then(async (response)=>{
            if(response.ok){
                setList(await response.json())
            }
        })
    }, [deBouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (response)=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })

    return <div>
        <SearchPanel param = {param} setParam = {setParam} users = {users}/>
        <List list = {list} users = {users}/>
    </div>
}
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Formcomponent from './Form'
function Bill({match}){
    const alldata= useSelector(s=>s)
    const data = alldata.filter(d=>d.id===parseInt(match.params.id))[0]
    const [id,setid] = useState();
    const [obj,setobj] = useState({});
    useEffect(()=>{
        setid(data.id)
        setobj(data)
    },[data])
    return <Formcomponent bill={obj}/>
}
export default Bill
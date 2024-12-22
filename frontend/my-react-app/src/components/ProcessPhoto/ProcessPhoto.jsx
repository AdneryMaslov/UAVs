import Filters from './Filters/Filters'
import Result from './Result/Result'
import './ProcessPhoto.css'
import { useState } from 'react'

export default function ProcessPhoto() {
    const [params, setParams] = useState({"results": 0})

    const renderResponse = (params) => {
        if (params.results == 0) {
            return ""
        } else if (params.results == 'load') {
            return "Подождите, идет загрузка..."
        } else {
            return <Result params = {params}/>
        }
    }

    return(
    <>
        <Filters setParams = {setParams} />
        {renderResponse(params)}
    </>
    )
}
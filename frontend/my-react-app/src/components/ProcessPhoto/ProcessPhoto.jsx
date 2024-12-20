import Filters from './Filters/Filters'
import Result from './Result/Result'
import './ProcessPhoto.css'
import { useState } from 'react'

export default function ProcessPhoto() {
    const [photoUrl, setPhotoUrl] = useState(1)

    const renderResponse = (url) => {
        if (url == 1) {
            return ""
        } else {
            return <Result url = {photoUrl}/>
        }
    }

    return(
    <>
        <Filters setPhoto = {setPhotoUrl} />
        {renderResponse(photoUrl)}
    </>
    )
}
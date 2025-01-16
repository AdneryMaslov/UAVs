import { useState } from 'react'
import './result.css'

export default function Result(params) {
    const [showResult, setShowResult] = useState('none')
    const [photoInformation, setPhotoInformation] = useState('')
    const class_list = {
        'seal': 'Тюлени'
    }

    const showModal = (item) => {
        setShowResult('show')
        setPhotoInformation(item.img)
    }

    console.log(params)

    return(
    <>
        <div className="table">
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Дата обработки</th>
                        <th>Животные на снимке</th>
                        <th>Количество объектов</th>
                        <th>Размер животных</th>
                        <th>Уверенность</th>
                    </tr>
                </thead>
                <tbody>
                    {params.params.results.map((item, index) => {
                        if (item == null) {
                            return null
                        }
                        const currentDate = new Date();
                        const year = currentDate.getFullYear(); // Получаем год
                        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Получаем месяц (0-11) и добавляем 1
                        const day = currentDate.getDate().toString().padStart(2, '0'); // Получаем число
                        const formattedDate = `${year}-${month}-${day}`;

                        return (
                        <tr onClick={() => showModal(item)} key={index}>
                            <th>{formattedDate}</th>
                            <th>{class_list[item.results[0]["class_name"]]}</th>
                            <th>{item.results.length}</th>
                            <th>{item.results[0].size}</th>
                            <th>{item.results[0].confidence}</th>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>

        <div onClick={() => setShowResult('none')} className={"result-container" + " " + showResult}>
            <div className="results">
                <div className="photo-result-container">
                    <img src={'http://178.20.208.159:8001/get_image/' + photoInformation} alt=""/>
                </div>
            </div>
        </div>
    </>
    )
}
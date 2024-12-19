import { useState } from 'react'
import './filters.css'

export default function Filters() {
    const [maxObjects, setMaxObjects] = useState(1);
    const [minСonfidence, setMinСonfidence] = useState(0.01);
    const [minSize, setMinSize] = useState(1);
    const [baran, setBaran] = useState(false)
    const [pig, setPig] = useState(false)
    const [horse, setHorse] = useState(false)
    const [sheep, setSheep] = useState(false)
    const [seacat, setSeacat] = useState(false)
    const [cow, setCow] = useState(false)

    const processCheckbox = (e) => {
        const el_id = e.target.id
        switch (el_id) {
            case 'baran':
                setBaran(!baran)
                break
            case 'pig':
                setPig(!pig)
                break
            case 'horse':
                setHorse(!horse)
                break
            case 'sheep':
                setSheep(!sheep)
                break
            case 'seacat':
                setSeacat(!seacat)
                break
            case 'cow':
                setCow(!cow)
                break
        }  
    }

    const sendData = async (e) => {
        const input = e.target
        const file = input.files[0]; 
        const formData = new FormData(); 
  
        formData.append('file', file);

        async function fetchData() {
            try {
                const response = await fetch('http://62.60.247.132:8000/upload', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();

                return res;
            } catch (error) {
                console.error('Fetching data failed:', error);

                return null;
            }
        }

        let res = null;
        let i = 0
        while (res === null && i < 10) {
            res = await fetchData();
            i ++
        }
        console.log(res)
    }    

    
    return (
    <>
        <div className="filters-container">
            <div className="params-container">
                Выберите параметры для обработки
                <div className="params">
                    <div className="param">
                        <div className="input-for">Максимальное количество объектов</div>
                        <div className="input-data">
                            <input type="range" value={maxObjects} min="1" max="100" onInput={(e) => setMaxObjects(e.target.value)}/>
                            <output id="rangevalue">{maxObjects}</output>
                        </div>
                    </div>
                    <div className="param">
                        <div className="input-for">Минимальный порог уверенности</div>
                        <div className="input-data">
                            <input type="range" value={minСonfidence} min="0.01" max="0.95" step="0.01" onInput={(e) => setMinСonfidence(e.target.value)}/>
                            <output id="rangevalue">{minСonfidence}</output>
                        </div>
                    </div>
                    <div className="param">
                        <div className="input-for">Минимальный размер объекта, cм</div>
                        <div className="input-data">
                            <input type="range" value={minSize} min="0" max="300" onInput={(e) => setMinSize(e.target.value)}/>
                            <output id="rangevalue">{minSize}</output>
                        </div>
                    </div>
                    <div className="param">
                        <div className="input-for">Виды животных</div>
                        <div className="animals-select">
                            <div className="animal-select-item">
                                <label htmlFor="baran">Бараны</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="baran" id="baran" />
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="horse">Лошади</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="horse" id="horse"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="baran">Овцы</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="sheep" id="sheep"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="seacat">Моржи</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="seacat" id="seacat"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="cow">Коровы</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="cow" id="cow"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="pig">Свиньи</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="pig" id="pig"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-photo">
                    <label className="input-file">
                        <input onInput={(e) => sendData(e)} type="file" name="file" className="input_file"/>                        
                        <span>Выберите файл</span>
                    </label>                    
                    <div className="instructions">
                        <p>Загрузите снимок (.jpeg), серию снимков/видео в формате (.zip) или видео (.mp4)</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
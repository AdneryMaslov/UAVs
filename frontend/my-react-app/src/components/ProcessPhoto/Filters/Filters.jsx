import { useState } from 'react'
import './filters.css'
import PropTypes from 'prop-types';

export default function Filters({ setParams }) {
    const [maxObjects, setMaxObjects] = useState(1);
    const [minСonfidence, setMinСonfidence] = useState(0.01);
    const [minSize, setMinSize] = useState(1);
    const [animals, setAnimals] = useState(
        {
            sheep: false,
            cattle: false,
            seal: false,
            camelus: false,
            kiang: false,
            zebra: false,
            horse: false
        }
    )

    const processCheckbox = (e) => {
        const animalId = e.target.id; 
    
        if (animalId in animals) {
            setAnimals((prevAnimals) => ({
                ...prevAnimals, 
                [animalId]: !prevAnimals[animalId] 
            }));
        }
    }

    const sendData = async (e) => {
        setParams({'results': 'load'})

        const input = e.target
        const file = input.files[0]; 
        const formData = new FormData(); 
  
        formData.append('file', file);
        formData.append('minConfidence', minСonfidence + 0.0)
        formData.append('minSize', minSize)
        formData.append('maxObjects', maxObjects)
        formData.append('animals', JSON.stringify(animals))

        async function fetchData() {
            try {
                const response = await fetch('http://178.20.208.159:8001/upload', {
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
            setParams({"results": 0})
            i ++
        }

        if (res !== null) {
            setParams(res)
        }
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
                        <div className="input-for">Минимальный размер объекта в пикселях</div>
                        <div className="input-data">
                            <input type="range" value={minSize} min="0" max="300" onInput={(e) => setMinSize(e.target.value)}/>
                            <output id="rangevalue">{minSize} px</output>
                        </div>
                    </div>
                    <div className="param">
                        <div className="input-for">Виды животных</div>
                        <div className="animals-select">
                            <div className="animal-select-item">
                                <label htmlFor="baran">Овцы</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="sheep" id="sheep" />
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="horse">Коровы</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="cattle" id="cattle"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="baran">Тюлень</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="seal" id="seal"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="seacat">Верблюды</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="camelus" id="camelus"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="cow">Кианг</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="kiang" id="kiang"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="pig">Зебра</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="zebra" id="zebra"/>
                            </div>
                            <div className="animal-select-item">
                                <label htmlFor="pig">Лошади</label>
                                <input onInput={(e) => (processCheckbox(e))} type="checkbox" name="horse" id="horse"/>
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
                        <p>Загрузите снимок (.jpeg, .png, .jpg) или серию снимков в формате (.zip)</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

Filters.propTypes = {
    setParams: PropTypes.func.isRequired,
};
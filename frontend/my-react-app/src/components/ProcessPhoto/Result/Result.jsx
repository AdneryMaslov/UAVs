import './result.css'

export default function Result(url) {
    console.log(url)
    return(
    <>
        <div className="result-container">
            <div className="results">
                <div className="photo-result-container">
                    <img src={'http://localhost:8000/get_image/' + url.url} alt=""/>
                </div>
                <div className="text-results-container">
                    <h2>Результаты обработки</h2>
                    <div className="text-result-item">
                        <div className="text-result-name">
                            Вид: <label>Тюлени</label>
                        </div>
                    </div>
                    <div className="text-result-item">
                        <div className="text-result-name">
                            Количество: <label>3</label>
                        </div>
                    </div>
                    <div className="text-result-item">
                        <div className="text-result-name">
                            Дополнительная информация: <label>Тюлени — это морские млекопитающие, которые обитают в холодных водах и известны своей игривостью и социальной природой. Они прекрасно ныряют и охотятся на рыбу, полагаясь на свои чувствительные усы.</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
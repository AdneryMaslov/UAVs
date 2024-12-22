import './result.css'

export default function Result(url) {
    console.log(url)
    return(
    <>
        <div className="table">
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Столбец 1</th>
                        <th>Столбец 2</th>
                        <th>Столбец 3</th>
                        <th>Столбец 4</th>
                        <th>Столбец 5</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Данные 1.1</td>
                        <td>Данные 1.2</td>
                        <td>Данные 1.3</td>
                        <td>Данные 1.4</td>
                        <td>Данные 1.5</td>
                    </tr>
                </tbody>
            </table>
        </div>


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
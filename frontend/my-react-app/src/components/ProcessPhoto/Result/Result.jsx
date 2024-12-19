import './result.css'

export default function Result() {
    return(
    <>
        <div className="result-container">
            <div className="results">
                <div className="photo-result-container">
                    <img src="/src/components/ProcessPhoto/Result/MA263063-142_png.rf.a94fe65c14fa0bdc80018fd01582aa95.jpg" alt=""/>
                </div>
                <div className="text-results-container">
                    <h2>Результаты обработки</h2>
                    <div className="text-result-item">
                        <div className="text-result-name">
                            Вид: <label>Моржи</label>
                        </div>
                    </div>
                    <div className="text-result-item">
                        <div className="text-result-name">
                            Количество: <label>3</label>
                        </div>
                    </div>
                    <div className="text-result-item">
                        <div className="text-result-name">
                            Дополнительная информация: <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quisquam placeat veritatis ea illo quidem sunt aliquid unde beatae, iure maiores, voluptatum tenetur voluptatem architecto blanditiis itaque repellat, quaerat aperiam?</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
const input = document.querySelector('.input_file');
const results = document.querySelector('.results-container');
const instructions = document.querySelector('.instructions');

input.addEventListener('change', async function() {
  const file = input.files[0]; 
  const formData = new FormData(); 
  results.innerHTML = 
  `<div style='color: black; font-size: 20px; text-align: center;' class="claster-wrapper">
      Подождите, анализ файла займет примерно 30 секунд
   </div>`;
  instructions.innerHTML = `<p>Подождите, анализ файла займет примерно 30 секунд</p>`;
  formData.append('file', file);

  async function fetchData() {
    try {
      const response = await fetch('http://62.60.247.132:8000/upload', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        results.innerHTML = 
          `<div style='color: black; font-size: 20px; text-align: center;' class="claster-wrapper">
            При анализе произошла ошибка
          </div>`;
        instructions.innerHTML = `<p>При анализе произошла ошибка</p>`;
        throw new Error('Network response was not ok');
        
      }
      const res = await response.json();
      return res;
    } catch (error) {
      console.error('Fetching data failed:', error);
      results.innerHTML = 
        `<div style='color: black; font-size: 20px; text-align: center;' class="claster-wrapper">
          При анализе произошла ошибка
        </div>`;
      instructions.innerHTML = `<p>При анализе произошла ошибка</p>`;
      return null;
    }
  }

  let res = null;
  while (res === null) {
    res = await fetchData();
  }

  // let path = res.json();
  path = res.filename

  results.innerHTML = `
  <div class="claster-wrapper">
      Ваш <br>
      результат
  </div>
  <div class="results">
      <div class="result">
          <img src="${'http://62.60.247.132:8000/get_image/' + path}" alt="" srcset="">
      </div>
      <div class="description">
        <p>Вид: <span>Тюлень</span></p>
        <p>Количество: <span>4</span></p>
      </div>
  </div>`;
  
});
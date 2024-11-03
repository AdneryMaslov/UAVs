FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt
# Копируем все файлы приложения в контейнер
COPY . .
# Создаем директории для загрузок и обработанных изображений
RUN mkdir -p uploads processed
# Устанавливаем переменные окружения
ENV PYTHONUNBUFFERED=1
# Указываем команду для запуска приложения
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

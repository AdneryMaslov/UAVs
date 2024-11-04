FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
# Устанавливаем зависимости
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0
RUN pip install --no-cache-dir -r requirements.txt
# Копируем все файлы приложения в контейнер
COPY . .
RUN mkdir -p /app/uploads && chmod -R 777 /app/uploads
RUN mkdir -p /app/processed && chmod -R 777 /app/processed
# Создаем директории для загрузок и обработанных изображений
# Устанавливаем переменные окружения
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend/app
# Указываем команду для запуска приложения
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

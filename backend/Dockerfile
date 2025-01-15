# Используем Python 3.10 slim образ
FROM python:3.10-slim

# Устанавливаем необходимые системные зависимости
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6

# Устанавливаем рабочую директорию для приложения
WORKDIR /app

# Копируем requirements.txt в контейнер
COPY requirements.txt /app/

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальное содержимое приложения
COPY . /app/

# Создаем необходимые директории для загрузок и обработанных файлов
RUN mkdir -p /app/uploads && chmod -R 777 /app/uploads
RUN mkdir -p /app/processed && chmod -R 777 /app/processed

# Устанавливаем переменную окружения
ENV PYTHONUNBUFFERED=1

# Указываем рабочую директорию для FastAPI
WORKDIR /app/backend/app

# Указываем команду для запуска FastAPI через uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]


# FROM python:3.10-slim
#
# RUN apt-get update && apt-get install -y \
#     libgl1-mesa-glx \
#     libglib2.0-0 \
#     libsm6 \
#     libxrender1 \
#     libxext6
#
# WORKDIR /app
#
# # Сначала копируем файл requirements.txt
# COPY requirements.txt /app/
#
# # Устанавливаем зависимости
# RUN pip install --no-cache-dir -r requirements.txt
#
# # Затем копируем остальное содержимое приложения
# COPY ./app /app/
#
# CMD ["python", "app/main.py"]
#
#
#
# FROM python:3.10-slim
#
# WORKDIR /app
#
# COPY requirements.txt .
# # Устанавливаем зависимости
# RUN apt-get update && apt-get install -y libgl1 libglib2.0-0
# RUN pip install --no-cache-dir -r requirements.txt
# # Копируем все файлы приложения в контейнер
# COPY . .
# RUN mkdir -p /app/uploads && chmod -R 777 /app/uploads
# RUN mkdir -p /app/processed && chmod -R 777 /app/processed
# # Создаем директории для загрузок и обработанных изображений
# # Устанавливаем переменные окружения
# ENV PYTHONUNBUFFERED=1
#
# WORKDIR /app/backend/app
# # Указываем команду для запуска приложения
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
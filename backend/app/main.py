from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from zip_processing import process_zip
from image_processing import process_image
from pathlib import Path
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
PROCESSED_DIR = Path("processed")
UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Обработка zip-файлов
    if file.filename.endswith('.zip'):
        result_zip_path = await process_zip(file)
        if result_zip_path and os.path.exists(result_zip_path):
            return {"filename": result_zip_path.name}
        else:
            raise HTTPException(status_code=200, detail="На изображении в архиве ничего не найдено")
    else:
        # Обработка изображений
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as f:
            f.write(await file.read())

        processed_image_path = process_image(file_path)

        if processed_image_path and os.path.exists(processed_image_path):
            return {"filename": processed_image_path.name}
        else:
            raise HTTPException(status_code=200, detail="На изображении ничего не найдено")


@app.get("/get_image/{image_name}")
async def get_image(image_name: str):
    return FileResponse(PROCESSED_DIR / image_name)


# Запуск через Dockerfile

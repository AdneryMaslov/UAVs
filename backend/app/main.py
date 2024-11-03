from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from zip_processing import process_zip
from image_processing import process_image
from pathlib import Path

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
    if file.filename.endswith('.zip'):
        result_zip_path = await process_zip(file)
        return FileResponse(result_zip_path)
    else:
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as f:
            f.write(await file.read())

        processed_image_path = process_image(file_path)
        return FileResponse(processed_image_path)


@app.get("/get_image/{image_name}")
async def get_image(image_name: str):
    return FileResponse(PROCESSED_DIR / image_name)


# Запуск через Dockerfile

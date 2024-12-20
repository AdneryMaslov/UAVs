from zipfile import ZipFile
from pathlib import Path
from image_processing import process_image

async def process_zip(file):
    zip_path = Path("uploads") / file.filename
    with open(zip_path, "wb") as buffer:
        buffer.write(await file.read())

    output_zip_path = Path("processed") / f"processed_{file.filename}"
    with ZipFile(output_zip_path, "w") as output_zip:
        with ZipFile(zip_path, "r") as input_zip:
            for image_path in input_zip.namelist():
                input_zip.extract(image_path, "uploads")
                processed_image_path = process_image(Path("uploads") / image_path)

                if processed_image_path is not None and Path(processed_image_path).exists():
                    output_zip.write(processed_image_path, Path(processed_image_path).name)
                else:
                    print(f"Processing failed for {image_path}, skipping.")

    return output_zip_path if output_zip_path.exists() else None

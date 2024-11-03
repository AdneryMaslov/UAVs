import zipfile
from pathlib import Path
from image_processing import process_image

async def process_zip(zip_file) -> str:
    zip_path = Path("uploads") / zip_file.filename
    with open(zip_path, "wb") as f:
        f.write(await zip_file.read())

    output_zip_path = Path("processed") / f"processed_{zip_file.filename}"
    with zipfile.ZipFile(output_zip_path, 'w') as output_zip:
        with zipfile.ZipFile(zip_path, 'r') as input_zip:
            for image_name in input_zip.namelist():
                if image_name.endswith(('.png', '.jpg', '.jpeg')):
                    with input_zip.open(image_name) as image_file:
                        image_path = Path("uploads") / image_name
                        with open(image_path, "wb") as img_file:
                            img_file.write(image_file.read())
                        processed_image_path = process_image(image_path)
                        output_zip.write(processed_image_path, Path(processed_image_path).name)

    return str(output_zip_path)

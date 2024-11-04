from ultralytics import YOLO
import cv2
import uuid
from pathlib import Path

model = YOLO('UAVs_ml.pt')

def process_image(image_path: Path) -> str:
    image = cv2.imread(str(image_path))
    results = model(str(image_path))

    # Флаг для выявления изображений без детекций
    has_detections = False
    for result in results:
        for box in result.boxes:
            has_detections = True
            class_id = int(box.cls)
            confidence = float(box.conf)
            label = model.names[class_id]

            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(image, f'{label} {confidence:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)

    # Если не было детекций, возвращаем None, чтобы не сохранять изображение
    if not has_detections:
        return None

    file_extension = image_path.suffix
    unique_name = f"{uuid.uuid4()}{file_extension}"
    result_file_path = Path("processed") / unique_name
    cv2.imwrite(str(result_file_path), image)

    return str(result_file_path)

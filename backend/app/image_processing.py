from pathlib import Path
import cv2
import uuid
from ultralytics import YOLO


def process_image(image_path: Path) -> Path:
    model = YOLO("best.pt")
    results = model(image_path)

    # Проверка детекций
    if not results[0].boxes:
        print("No detections found.")
        return None

    # Загрузка изображения для рисования результатов
    image = cv2.imread(str(image_path))
    for box in results[0].boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        confidence = box.conf[0]
        class_id = int(box.cls[0])
        label = f"{model.names[class_id]} {confidence:.2f}"

        # Рисуем рамки и метки на изображении
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Генерация уникального имени для файла и сохранение
    processed_dir = Path("processed")
    processed_dir.mkdir(exist_ok=True)
    processed_image_path = processed_dir / f"processed_{uuid.uuid4().hex}.jpg"

    # Сохраняем изображение
    cv2.imwrite(str(processed_image_path), image)
    print(f"Saved processed image to: {processed_image_path}")

    return processed_image_path


import csv
from PIL import Image
import torch
import json
from transformers import CLIPProcessor, CLIPModel
import sys

if len(sys.argv) < 2:
    print(json.dumps({"error": "No image path provided"}))
    print(f"Script received arguments: {sys.argv}", file=sys.stderr)
    sys.exit(1)

    

imagePath = sys.argv[1]

# Load model and processor
try:
    # Load model and processor
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)

    # Load image
    image = Image.open(imagePath)

    # Load Open Images labels
    def load_openimages_labels(csv_path, limit=601):
        labels = []
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            for _, label in reader:
                labels.append(label)
                if len(labels) >= limit:
                    break
        return labels

    labels = load_openimages_labels('C:/Users/dyash/OneDrive/Desktop/pinterest-clone/BACKEND/ML/class-descriptions-boxable.csv', limit=601)

    # Process input
    inputs = processor(text=labels, images=image, return_tensors="pt", padding=True).to(device)

    # Get logits and probs
    with torch.no_grad():
        outputs = model(**inputs)
        probs = outputs.logits_per_image.softmax(dim=1)[0]

    # Get top K tags
    topk = 4
    top_probs, top_idxs = probs.topk(topk)

    tags = []
    for i in range(topk):
        label = labels[top_idxs[i].item()]
        confidence = top_probs[i].item() * 100
        tags.append({
            "label": label,
            "confidence": round(confidence, 2) 
        })
   
    print(json.dumps(tags))
    sys.stdout.flush()
    
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
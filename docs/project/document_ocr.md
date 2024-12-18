# Document OCR

**GitHub Repository:** [https://github.com/junwai7159/Document-OCR](https://github.com/junwai7159/Document-OCR)

## About this Project

This project is part of the SJTU ICE4309 - Image Processing & Content Analysis course.

We implemeted an 3-stage Optical Character Recognition (OCR) framework for converting in-the-wild documents to digitally readable and recognizable text.

## Architecture of Document OCR

![document_ocr](./media/document_ocr/model_architecture.jpg)

### First Stage: Preprocessing

- The images undergo preprocessing, including edge detection, contour detection, perspective transformation and binarization to further enhance the image.

### Second Stage: Text Detection

- The text detection module uses the DBNet model with MobileNetV3 as the backbone network.

### Third Stage: Text Recognition

- The text recognition module uses the CRNN model with MobileNetV3 as the backbone network.

## Results Visualization

### Edge Detection

| Input Image | Grayscale Conversion | Gaussian Blur | Closing | Canny |
| --- | --- | --- | --- | --- |
| ![input_image](./media/document_ocr/input_image.png) | ![grayscale_conversion](.//media/document_ocr/grayscale_conversion.png) | ![gaussian_blur](./media/document_ocr/gaussian_blur.png) | ![closing](./media/document_ocr/closing.png) | ![canny](./media/document_ocr/closing.png) |

### Contour Detection

| LSD | Horizontal Line Segments | Vertical Line Segments | Final Contour |
| --- | --- | --- | --- |
| ![lsd](./media/document_ocr/lsd.png) | ![horizontal_line_segments](./media/document_ocr/horizontal_line_segments.png) | ![vertical_line_segments](./media/document_ocr/vertical_line_segments.png) | ![final_contour](./media/document_ocr/final_contour.png) |

### Perspective Transformation & Binarization

| Perspective Transformation | Binarization |
| --- | --- |
| ![perspective_transformation](./media/document_ocr/perspective_transformation.png) | ![binarization](./media/document_ocr/binarization.png) |

### Text Detection & Recognition

| Text Detection | Text Recognition |
| --- | --- |
| ![text_detection](./media/document_ocr/text_detection.png) | ![text_recognition](./media/document_ocr/text_recognition.png) |

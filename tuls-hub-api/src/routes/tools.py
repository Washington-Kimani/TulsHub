from flask import Blueprint, request, jsonify, send_file
import io
import logging
from src.constants.http_status_codes import HTTP_400_BAD_REQUEST
from src.services.html_to_docx import create_docx_zip_from_urls


tools = Blueprint("tools", __name__, url_prefix="/api/v1/tools")

# routes
# html to docx
@tools.post("/html-to-docx")
def html_to_docx():
    payload = request.get_json(silent=True) or {}
    urls = []

    url = payload.get("url")
    if isinstance(url, str) and url.strip():
        urls.append(url.strip())

    urls_list = payload.get("urls") or payload.get("links")
    if isinstance(urls_list, list):
        urls.extend([str(item).strip() for item in urls_list if isinstance(item, str) and item.strip()])

    if not urls:
        return jsonify({"error": "Provide a single url or a urls list."}), HTTP_400_BAD_REQUEST

    try:
        zip_bytes, zip_name = create_docx_zip_from_urls(urls)
        return send_file(
            io.BytesIO(zip_bytes),
            mimetype="application/zip",
            as_attachment=True,
            download_name=zip_name,
        )
    except ValueError as error:
        return jsonify({"error": str(error)}), HTTP_400_BAD_REQUEST
    except Exception as error:
        logging.exception("Failed to generate docx archive")
        return jsonify({"error": "Failed to generate docx archive."}), HTTP_400_BAD_REQUEST

from flask import Flask, request
from flask_cors import CORS
from src.routes.tools import tools
import os

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    origins = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]

    frontend_url = os.getenv("FRONTEND_URL")
    if frontend_url:
        origins.append(frontend_url)

    CORS(app, resources={r"/api/v1/*": {"origins": origins}})

    app.register_blueprint(tools, url_prefix="/api/v1")

    @app.route("/")
    def index():
        return "Welcome to the TULS Hub API!"

    return app
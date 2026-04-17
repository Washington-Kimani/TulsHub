from flask import Flask, request
from flask_cors import CORS
from src.routes.tools import tools
import os

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, resources={r"/api/v1/*": {"origins": ["http://localhost:3000", "http://localhost:3001", os.getenv("FRONTEND_URL", "http://localhost:3000")]}})
    app.register_blueprint(tools)

    @app.before_request
    def check_for_options():
        if request.method == "OPTIONS":
            return "", 200
        return None
    
    if __name__ == "__main__":
        app.run(debug=True, use_reloader=True)

    return app
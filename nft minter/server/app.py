import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Ensure Python can find the models folder
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Flask app setup
app = Flask(__name__, static_folder="static")
CORS(app)  # Enable CORS so React frontend can communicate

# Route to serve static files (generated images)
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)

# Run server
if __name__ == "__main__":
    app.run(debug=True)

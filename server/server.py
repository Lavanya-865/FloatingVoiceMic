from flask import Flask, request, jsonify
from flask_cors import CORS  # to allow Chrome Extension access

app = Flask(__name__)
CORS(app)  # Allow requests from any origin (adjust for production)
@app.route('/greet', methods=['POST'])
def greet():
    data = request.get_json()
    name = data.get("name", "Guest")
    return jsonify({"message": f"Hello, {name}! From Python 🐍"})

if __name__ == "__main__":
    app.run(port=5000)

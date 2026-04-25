from flask import Flask, jsonify
from routes.describe import describe_bp
from routes.recommend import recommend_bp
from routes.report import report_bp
from routes.health import health_bp


app = Flask(__name__)
app.register_blueprint(describe_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(report_bp)
app.register_blueprint(health_bp)

# 🔥 Hardcode (just to verify system works)
GROQ_API_KEY = "test123"

@app.route('/')
def home():
    return jsonify({
        "message": "AI Service Running",
        "groq_key_loaded": GROQ_API_KEY is not None,
        "value": GROQ_API_KEY
    })

if __name__ == '__main__':
   app.run(port=5000)
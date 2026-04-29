from flask import Blueprint, jsonify
import time

health_bp = Blueprint("health", __name__)

start_time = time.time()

@health_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "AI Compliance Service",
        "uptime": round(time.time() - start_time, 2)
    })
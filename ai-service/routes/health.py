import time
from flask import Blueprint, jsonify

health_bp = Blueprint('health', __name__)

# 🔹 Track when server started
start_time = time.time()

@health_bp.route('/health', methods=['GET'])
def health():

    # 🔹 Measure response time correctly
    start = time.perf_counter()

    uptime = time.time() - start_time

    response_time = time.perf_counter() - start

    return jsonify({
        "status": "ok",
        "uptime_seconds": round(uptime, 2),
        "response_time_ms": round(response_time * 1000, 2),
        "model": "llama-3.3-70b-versatile"
    })
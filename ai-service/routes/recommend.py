from flask import Blueprint, request, jsonify
from services.groq_test import get_client

recommend_bp = Blueprint("recommend", __name__)

@recommend_bp.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_input = data.get("input", "")

    if not user_input:
        return jsonify({"error": "Input is required"}), 400

    try:
        client = get_client()

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": user_input}]
        )

        output = response.choices[0].message.content

        return jsonify({
            "result": output,
            "is_fallback": False
        })

    except Exception:
        return jsonify({
            "result": "AI service temporarily unavailable.",
            "is_fallback": True
        })
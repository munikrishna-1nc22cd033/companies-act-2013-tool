from flask import Blueprint, request, jsonify
from groq import Groq
import json

# 🔹 Create Blueprint
recommend_bp = Blueprint('recommend', __name__)

# 🔹 Initialize Groq client (use your real API key here)
client = Groq(api_key="REMOVEDppAOM1MDSftJ7Su9zg2tWGdyb3FYfABtlGY04M15l5HHBlcZ7sod")

# 🔹 Route
@recommend_bp.route('/recommend', methods=['POST'])
def recommend():

    data = request.get_json()

    # 🔹 Validate input
    if not data or "input" not in data:
        return jsonify({"error": "Input is required"}), 400

    user_input = data["input"]

    # 🔹 Prompt
    prompt = f"""
You are a compliance expert.

Based on the issue:
{user_input}

Provide EXACTLY 3 recommendations in VALID JSON format like:
[
  {{
    "action_type": "string",
    "description": "string",
    "priority": "High/Medium/Low"
  }}
]

IMPORTANT:
- Output ONLY JSON
- Do NOT add explanation
- Do NOT add text before/after JSON
"""

    try:
        # 🔹 Call Groq
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        output = response.choices[0].message.content

        # 🔥 Convert string → JSON
        try:
            parsed = json.loads(output)
        except:
            parsed = output  # fallback if AI gives invalid JSON

        return jsonify({
            "recommendations": parsed
        })

    except Exception as e:
        return jsonify({
            "error": "AI failed",
            "details": str(e)
        }), 500
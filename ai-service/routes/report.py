from flask import Blueprint, request, jsonify
from groq import Groq
import json
import os
report_bp = Blueprint('report', __name__)

# 🔹 Put your API key here
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@report_bp.route('/generate-report', methods=['POST'])
def generate_report():

    data = request.get_json()

    # 🔹 Validate input
    if not data or "input" not in data:
        return jsonify({"error": "Input is required"}), 400

    user_input = data["input"]

    # 🔹 Prompt
    prompt = f"""
You are a compliance AI assistant.

Given the issue:
{user_input}

Generate a structured JSON report:

{{
  "title": "string",
  "summary": "string",
  "overview": "string",
  "key_items": ["item1", "item2"],
  "recommendations": ["rec1", "rec2"]
}}

IMPORTANT:
- Output ONLY JSON
- No extra text
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        output = response.choices[0].message.content

        # 🔥 Convert string → JSON
        try:
            parsed = json.loads(output)
        except:
            parsed = output

        return jsonify(parsed)

    except Exception as e:
        return jsonify({
            "error": "AI failed",
            "details": str(e)
        }), 500
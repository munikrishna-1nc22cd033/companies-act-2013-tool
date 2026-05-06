from flask import Blueprint, request, jsonify
from groq import Groq
import os

describe_bp = Blueprint('describe', __name__)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@describe_bp.route('/describe', methods=['POST'])
def describe():

    data = request.get_json()

    if not data or "input" not in data:
        return jsonify({"error": "Input is required"}), 400

    user_input = data["input"]

    prompt = f"""
You are a compliance AI assistant.

Given the company data:
{user_input}

Generate:
- Summary
- Risk Level (Low/Medium/High)
- Key Issues
- Suggestions
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        output = response.choices[0].message.content

        return jsonify({
            "result": output,
            "generated_at": "now"
        })

    except Exception as e:
        return jsonify({
            "error": "AI failed",
            "details": str(e)
        }), 500
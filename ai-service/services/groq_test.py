from groq import Groq

client = Groq(api_key="REMOVEDppAOM1MDSftJ7Su9zg2tWGdyb3FYfABtlGY04M15l5HHBlcZ7sod")

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "user", "content": "Explain Companies Act compliance in simple terms"}
    ]
)

print(response.choices[0].message.content)
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('editor.html')

@app.route('/api/complete', methods=['POST'])
def complete_code():
    # Mock AI completion for now
    code = request.json.get('code', '')
    cursor_position = request.json.get('position', 0)
    
    # Simple mock suggestion
    suggestions = ['def', 'class', 'import', 'return']
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run(debug=True)

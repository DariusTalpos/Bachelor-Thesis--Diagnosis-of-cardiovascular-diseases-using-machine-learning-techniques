from flask import Flask, request, jsonify
from flask_cors import CORS
from pickle import load

from validation.form_validation import form_validation
from validation.language_file_validation import language_file_validation
from validation.login_validation import login_validation, token_is_valid
from validation.model_validation import model_validation

filename = './resources/models/model.pkl'
model = load(open(filename, 'rb'))

app = Flask(__name__)
cors = CORS(app)


@app.route('/api/language/form', methods=['GET'])
def get_form_language():
    language = request.args.get('language')
    content = language_file_validation(language, "form")
    if content is None:
        return jsonify({'error': 'Invalid language'}), 400
    return jsonify({'content': content}), 200


@app.route('/api/language/result', methods=['GET'])
def get_result_language():
    language = request.args.get('language')
    content = language_file_validation(language, "result")
    if content is None:
        return jsonify({'error': 'Invalid language'}), 400
    return jsonify({'content': content}), 200


@app.route('/api/language/login', methods=['GET'])
def get_login_language():
    language = request.args.get('language')
    content = language_file_validation(language, "login")
    if content is None:
        return jsonify({'error': 'Invalid language'}), 400
    return jsonify({'content': content}), 200


@app.route('/api/language/admin', methods=['GET'])
def get_admin_language():
    language = request.args.get('language')
    content = language_file_validation(language, "admin")
    if content is None:
        return jsonify({'error': 'Invalid language'}), 400
    return jsonify({'content': content}), 200


@app.route('/api/login', methods=['POST'])
def login():
    token = login_validation(request.json)
    if token is None:
        return jsonify({'error': 'Date invalide'}), 400
    return jsonify({'token': token}), 200


@app.route('/api/result', methods=['GET'])
def get_prediction():
    form_data = form_validation(request.args)
    if form_data is None:
        return jsonify({'error': 'Date invalide'}), 400
    prediction = model.predict(form_data)[0]
    return jsonify({'result': prediction}), 200


@app.route('/api/token', methods=['POST'])
def check_token():
    ok = token_is_valid(request.json)
    if not ok:
        return jsonify({'error': 'Invalid token'}), 400
    return jsonify({'ok': ok}), 200

@app.route('/api/set', methods=['GET'])
def set_model():
    try:
        global model
        model = load(open('./resources/models/model_testing.pkl', 'rb'))
        return jsonify({'error': 'error'}), 200
    except:
        return jsonify({'error': 'error'}), 400

@app.route('/api/reset', methods=['GET'])
def reset_model():
    try:
        global model
        model = load(open('./resources/models/model.pkl', 'rb'))
        return jsonify({'error': 'error'}), 200
    except:
        return jsonify({'error': 'error'}), 400

@app.route('/api/train', methods=['POST'])
def train_model():
    stats = model_validation(request.json)
    if stats is None:
        return jsonify({'error': 'Date invalide'}), 400
    [accuracy, log_loss, roc_auc, conf_matrix] = stats
    return jsonify({'accuracy': accuracy, 'log_loss': log_loss, 'roc_auc': roc_auc, 'conf_matrix': conf_matrix}), 200

if __name__ == '__main__':
    app.run()

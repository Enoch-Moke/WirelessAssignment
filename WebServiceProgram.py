import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'db.sqlite'


def users_get_row_as_dict(row):
    row_dict = {
        'user_id': row[0],
        'name': row[1],
        'email': row[2],
        'password': row[3],
        'age': row[4],
        'gender': row[5],
    }

    return row_dict

def meals_get_row_as_dict(row):
    row_dict = {
        'meal_id': row[0],
        'user_email': row[1],
        'meal_name': row[2],
        'meal_cal': row[3],
        'record_date': row[4],
    }

    return row_dict
    
def plans_get_row_as_dict(row):
    row_dict = {
        'plan_id': row[0],
        'plan_name': row[1],
        'plan_name_photo': row[2],
    }

    return row_dict

def plan_details_get_row_as_dict(row):
    row_dict = {
        'plan_details_id': row[0],
        'plan_id': row[1],
        'plan_days': row[2],
        'breakfast': row[3],
        'lunch': row[4],
        'dinner': row[5],
        'plan_photo': row[6],
    }

    return row_dict

def recipes_get_row_as_dict(row):
    row_dict = {
        'recipe_id': row[0],
        'recipe_name': row[1],
        'recipe_photo': row[2],
    }

    return row_dict

def ingredients_get_row_as_dict(row):
    row_dict = {
        'ingredient_id': row[0],
        'recipe_id': row[1],
        'ingredient_name': row[2],
    }

    return row_dict


app = Flask(__name__)

@app.route('/api/users/<email>', methods=['GET'])
def get_user(email):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email=?', (email,))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = users_get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/users', methods=['POST'])
def store_user():
    if not request.json:
        abort(404)

    new_user = (
        request.json['name'],
        request.json['email'],
        request.json['password'],
        request.json['age'],
        request.json['gender'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO users(name,email,password,age,gender)
        VALUES(?,?,?,?,?)
    ''', new_user)

    user_id = cursor.lastrowid

    db.commit()

    response = {
        'user_id': user_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/users/<email>', methods=['PUT'])
def update_user(email):
    if not request.json:
        abort(400)

    if 'email' not in request.json:
        abort(400)

    if request.json['email'] != email:
        abort(400)

    update_user = (
        request.json['password'],
        email,
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE users SET password=? WHERE email=?
    ''', update_user)

    db.commit()

    response = {
        'user_email': email,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/meals/<user_email>', methods=['GET'])
def get_all_meals(user_email):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM meals WHERE user_email=?', (user_email,))
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = meals_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/meals/<user_email>/<int:meal_id>', methods=['GET'])
def get_meal(user_email,meal_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM meals WHERE user_email=? AND meal_id=?', (user_email,str(meal_id),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = meals_get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/meals/<user_email>', methods=['POST'])
def store_meal(user_email):
    if not request.json:
        abort(404)
        
    new_meal = (
        user_email,
        request.json['meal_name'],
        request.json['meal_cal'],
        request.json['record_date'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO meals(user_email,meal_name,meal_cal,record_date)
        VALUES(?,?,?,?)
    ''', new_meal)

    meal_id = cursor.lastrowid

    db.commit()

    response = {
        'meal_id': meal_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/meals/<int:meal>', methods=['DELETE'])
def delete(meal):
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM meals WHERE meal_id=?', (str(meal),))

    db.commit()

    response = {
        'meal_id': meal,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201
    
    
@app.route('/api/plans', methods=['GET'])
def get_all_plans():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM plans')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = plans_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/plans/<int:plan_id>', methods=['GET'])
def get_plan(plan_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM plan_details WHERE plan_id=?', (str(plan_id),))
    rows = cursor.fetchall()

    print(rows)
    
    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = plan_details_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT recipe_id, recipe_name, recipe_photo FROM recipes')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = recipes_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/recipes/<int:recipe_id>', methods=['GET'])
def get_recipes(recipe_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM ingredients WHERE recipe_id=?', (str(recipe_id),))
    rows = cursor.fetchall()

    print(rows)
    
    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = ingredients_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/instruction/<int:recipe_id>', methods=['GET'])
def get_instruction(recipe_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT recipe_instructions FROM recipes WHERE recipe_id=?', (str(recipe_id),))
    row = cursor.fetchone()

    print(row)

    db.close()

    return jsonify(row), 200


@app.route('/api/recipeImage/<int:recipe_id>', methods=['GET'])
def get_image(recipe_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT recipe_photo FROM recipes WHERE recipe_id=?', (str(recipe_id),))
    row = cursor.fetchone()

    print(row)

    db.close()

    return jsonify(row), 200
    

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port, debug=True)
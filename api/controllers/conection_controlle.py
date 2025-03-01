from flask import jsonify
from models.conections_model import *
  
def create_conection(data):
    user_id = data.get("user_id")
    vacation_id = data.get("vct_id")
    if not user_id or not vacation_id:
        return jsonify({"error": "user id and vacation id is required"}), 400

    add_conection(vacation_id, user_id)
    return jsonify({"message": "Like added successfully!"}), 201

def fetch_people(vacation_id):
    people = get_people_on_vacation(vacation_id)
    return jsonify([{"User ID":person[0]} for person in people]), 200

def fetch_vacations(user_id):
    vacations = get_vacations_on_person(user_id)
    return jsonify([{"vacation ID":vacation[0]}for vacation in vacations]), 200

def disconect_vacation(data):
    user_id = data.get("user_id")
    vacation_id = data.get("vct_id")
    delete_conection(vacation_id, user_id)
    return jsonify({"success": "deleted"}), 200

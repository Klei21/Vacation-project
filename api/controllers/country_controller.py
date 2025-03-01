from flask import jsonify
from models.country_model import *
  
def create_country(data):
    name = data.get("name")
    if not name:
        return jsonify({"error": "City name is required"}), 400

    city_id = add_country(name)
    return jsonify({"message": "City added successfully!", "city_id": city_id}), 201

def fetch_all_countries():
    cities = get_all_countries()
    return jsonify([{"id": city[0], "name": city[1]} for city in cities]), 200


def fetch_country_by_id(id):
    city = get_country_by_id(id)
    if not city:
        return jsonify({"error":"City not found"}), 404
    return jsonify({"id": city[0], "name": city[1]}), 200


def del_country_by_id(id):
    city_id = delete_country_by_id(id)
    if not city_id:
        return jsonify({"error":"City not found"}), 404 
    return jsonify({"id": id, "success": "deleted"}), 200

def update_country(id, data):
    name = data.get("name")
    if not name:
        return jsonify({"error":"City name is require"}), 400 
    city_id = update_country_by_id(id, name)
    if city_id is None:
        return jsonify({"error":"City not found"})
    return jsonify({"message":"City update successfully", "city_id":city_id}), 200

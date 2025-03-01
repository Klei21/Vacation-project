from flask import Blueprint, request
from controllers.country_controller import *

country_bp = Blueprint("country_routes", __name__)

@country_bp.route("/country", methods=["POST"])
def add_city_route():
    return create_country(request.json)

@country_bp.route("/countries", methods=["GET"])
def get_all_cities_route():
    return fetch_all_countries()

@country_bp.route("/country/<int:id>", methods=["GET"])
def get_city_by_id(id):
    return fetch_country_by_id(id)

@country_bp.route("/country/<int:id>", methods=["DELETE"])
def delete_city_by_id(id):
    return del_country_by_id(id)

@country_bp.route("/country/<int:id>", methods=["PATCH"])
def update_city_by_id(id):
    return update_country(id, request.json)

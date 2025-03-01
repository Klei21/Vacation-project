from flask import Blueprint, request
from controllers.conection_controlle import *

conection_bp = Blueprint("conection_routes", __name__)

@conection_bp.route("/conection", methods=["POST"])
def add_conection_route():
    return create_conection(request.json)

@conection_bp.route("/conection/<int:id>", methods=["GET"])
def get_all_conections_route(id):
    return fetch_vacations(id)

@conection_bp.route("/delconection", methods=["DELETE"])
def delete_conection_by_id():
    return disconect_vacation(request.json)

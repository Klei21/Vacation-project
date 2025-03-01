from flask import Blueprint, request
from controllers.vacation_controller import *

vacation_bp = Blueprint("vacation_routes", __name__)

@vacation_bp.route("/add-vacation", methods=["POST"])
def add_vacation_route():
    return create_vacation(request.json)

@vacation_bp.route("/get-vacations", methods=["GET"])
def get_vacations_route():
    return fetch_all_vacations()

@vacation_bp.route("/vacation/<int:id>", methods=["GET"])
def get_vacation_route(id):
    return fetch_vacation_by_id(id)

@vacation_bp.route("/del-vacation/<int:id>", methods=["DELETE"])
def delte_vacation_route(id):
    return remove_vacation_by_id(id)

@vacation_bp.route("/upd-vacation/<int:id>", methods=["PATCH"])
def update_vacation_route(id):
    return update_vacation(id,request.json)

@vacation_bp.route("/my-vacations/<int:user_id>", methods=["GET"])
def get_my_vacations(user_id):
    return fetch_my_vacations(user_id)

@vacation_bp.route("/vacationstatus", methods=["GET"])
def getVacationStatus():
    return fetch_vacations_status()
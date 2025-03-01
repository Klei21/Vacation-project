from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.user_controller import *

user_bp = Blueprint("user_routes", __name__)

@user_bp.route("/register", methods=["POST"])
def register_user_route():
    return create_user(request.json)

@user_bp.route("/login", methods=["POST"])
def login_user_route():
    return login_user(request.json)

@user_bp.route("/users", methods=["GET"])
# @jwt_required()
def get_all_users_route():
    return fetch_all_users()

@user_bp.route("/mail_update", methods=["PATCH"])
def update_mail_route():
    return login_user(request.json)

@user_bp.route("/password_update", methods=["PATCH"])
def update_password_route():
    return patch_user_password(request.json)

@user_bp.route("/delete", methods=["DELETE"])
def delete_user_route():
    return delete_user(request.json)

@user_bp.route("/password", methods=["GET"])
def get_my_password():
    return password(request.json)

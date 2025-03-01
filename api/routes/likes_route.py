from flask import Blueprint, request
from controllers.likes_controller import *

likes_bp = Blueprint("likes_routes", __name__)

@likes_bp.route("/like", methods=["POST"])
def add_city_route():
    post_like(request.json)
    return fetch_likes()

@likes_bp.route("/likes", methods=["GET"])
def get_likes_route():
    return fetch_likes()

@likes_bp.route("/like", methods=["DELETE"])
def delete_city_by_id():
    return erase_like(request.json)

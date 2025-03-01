from flask import jsonify
from models.likes_model import *
  
def post_like(data):
    user_id = data.get("user_id")
    vacation_id = data.get("vacation_id")
    if not user_id or not vacation_id:
        return jsonify({"error": "user id and vacation id is required"}), 400

    add_like(vacation_id, user_id)

def fetch_likes():
    likes = get_likes()
    return jsonify({"likes":likes}), 200

def erase_like(data):
    user_id = data.get("user_id")
    vacation_id = data.get("vacation_id")
    delete_like(vacation_id, user_id)
    return jsonify({"success": "deleted"}), 200


from flask import jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from models.user_model import *

bcrypt = Bcrypt()
 
def create_user(data):
    mail = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    if not mail or not password:
        return jsonify({"error": "Email and password are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user_id = register_user(first_name,last_name,mail, hashed_password)
    return jsonify({"message": "User registered successfully!", "user_id": user_id}), 201

def login_user(data):
    mail = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")

    if not mail or not password:
        return jsonify({"error": "mail and password are required"}), 400

    user = get_user_by_email(mail)
    if not user:
        return jsonify({"error": "Invalid mail or password"}), 401

    user_id,first_name,last_name,email,hashed_password,role_id  = user
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=user_id)
    return jsonify({"token": token},{"user":{"id": user_id,"email": email,"lastname": last_name,"firstname": first_name, "role_id": role_id}}), 200

def fetch_all_users():
    users = get_all_users()
    return jsonify([{
        "id": user[0],
        "email": user[1],
        "lastname": user[2],
        "firstname": user[3],
    } for user in users]), 200

def patch_user_mail(data):
    mail = data.get("email")
    password = data.get("password")

    user = get_user_by_email(mail)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    user_id, hashed_password = user
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid email or password"}), 401
    return update_usermail(mail,user_id)

def patch_user_password(data):
    mail = data.get("email")
    password = data.get("password")

    user = get_user_by_email(mail)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    user_id, hashed_password = user
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid email or password"}), 401
    return update_user_password(password,user_id)

def delete_user(data):
    mail = data.get("email")
    password = data.get("password")
    user = get_user_by_email(mail)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401
    user_id, hashed_password,role_id = user
    if role_id == 1:
        return jsonify({"error":"Only an Admin can delete a user"}), 401
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid email or password"}), 401
    return delete_user(user_id)

def password(data):
    password = data.get("password")
    mail = data.get("email")
    user = get_user_by_email(mail)
    userid, hashed_password, roleid = user
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid password"}), 401
    return jsonify({"message": password}), 200
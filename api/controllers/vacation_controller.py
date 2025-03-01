from sqlite3 import Date
from flask import jsonify
from models.vacation_model import *
from datetime import datetime

  
def create_vacation(data):
    country_id = data.get("country_id")
    description = data.get("description")
    since = data.get("since")
    exit_date = datetime.strptime(since, "%m-%d-%Y")
    till = data.get("till")
    returning_date = datetime.strptime(till, "%m-%d-%Y")
    price = data.get("price")
    foldername = data.get("foldername")
    img=data.get("img")
    if datetime.now() > exit_date or datetime.now() > returning_date:
        return jsonify({"error": "one of the dates is invalid"}), 400.
    if exit_date > returning_date:
        return jsonify({"error": "exit date is later than returning date"}), 400
    if not country_id:
        return jsonify({"error": "country_id is required"}), 400
    if not description:
        return jsonify({"error": "description is required"}), 400
    if not exit_date:
        return jsonify({"error": "exit date is required"}), 400
    if not returning_date:
        return jsonify({"error": "returning date is required"}), 400
    if not foldername:
        return jsonify({"error": "foldername is required"}), 400
    if not price:
        return jsonify({"error": "price is required"}), 400
        
    product_id = add_vacation(country_id, description, exit_date, returning_date, price, foldername,img)
    return jsonify({"message": "Vacation added successfully!", "vacation_id": product_id}), 201

def fetch_all_vacations():
    vacations= get_all_vacations()
    return jsonify([{"vacation_id": vacation[0],"country":vacation[1], "description": vacation[2] , "since": vacation[3] ,"till": vacation[4] , "price":vacation[5],"foldername":vacation[6],"likes":vacation[7],"ids":vacation[8],"img":vacation[9],} for vacation in vacations]), 200

def fetch_vacation_by_id(id):
    vacation = get_vacation_by_id(id)
    if not vacation:
        return jsonify({"error":"vacation not found"}), 404
    if len(vacation)==9:
        return jsonify({"vacation_id": vacation[0], "country_id": vacation[1],"description":vacation[2],"since":vacation[3],"till": vacation[4],"price": vacation[5],"foldername":vacation[6],"country_name":vacation[7],"img":vacation[8]}), 200
    else:
        return jsonify({"vacation_id": vacation[0], "country_id": vacation[1],"description":vacation[2],"since":vacation[3],"till": vacation[4],"price": vacation[5],"foldername":vacation[6],"country_name":vacation[7]}), 200

def remove_vacation_by_id(id):
    vacation_id = delete_vacation_by_id(id)
    if not vacation_id:
        return jsonify({"error":"vacation not found"}), 404 
    return jsonify({"vacation id": id, "success": "deleted"}), 200

def update_vacation(id, data):
    country_id = data.get("country_id")
    description = data.get("description")
    since = data.get("since")
    datesince = datetime.strptime(since, "%m-%d-%Y")
    till = data.get("till")
    datetill = datetime.strptime(till, "%m-%d-%Y")
    img = data.get("img")

    price = data.get("price")
    foldername = data.get("foldername")
    if not country_id:
        return jsonify({"error": "country_id is required"}), 400
    if not description:
        return jsonify({"error": "description is required"}), 400
    if not since:
        return jsonify({"error": "exit date is required"}), 400
    if not till:
        return jsonify({"error": "returning date is required"}), 400
    if not foldername:
        return jsonify({"error": "foldername is required"}), 400
    if not price:
        return jsonify({"error": "price is required"}), 400
    if datetime.now() > datesince or datetime.now() > datetill:
        return jsonify({"error": "one of the dates is invalid"}), 400.
    if since > till:
        return jsonify({"error": "exit date is later than returning date"}), 400
     
    vacation_id = update_vacation_by_id(id, country_id, description, since, till, price, foldername,img)
    if vacation_id is None:
        return jsonify({"error":"vacation not found"})
    return jsonify({"message":"vacation successfully", "vacation_id":vacation_id}), 200

def fetch_my_vacations(id):
    vid = get_vacationId(id)
    if not vid:
        return jsonify("You have no vacations yet"), 200
    vacations = []
    for id in vid:
        vacation = get_vacation_by_id(id) 
        vacations.append(vacation)
    return jsonify([{
    "vacation_id": vacation[0], 
    "country_id": vacation[1], 
    "description": vacation[2], 
    "since": vacation[3], 
    "till": vacation[4], 
    "price": vacation[5], 
    "foldername": vacation[6],
    "country_name": vacation[7],
    "img": vacation[8] if len(vacation) > 8 else None
} for vacation in vacations if len(vacation) >= 7]), 200

def fetch_vacations_status():
    vacations= getVacationStatus()
    separation = [{"vacation_id": vacation[0],"country":vacation[1], "since": vacation[2] ,"till": vacation[3] , "price":vacation[4],"likes":vacation[5],"status":vacation[6],} for vacation in vacations]
    past = []
    future = []
    ongoing = []
    for vacation in separation:
        if vacation["status"]=="Past":
            past.append(vacation)
        elif vacation["status"] == "Future":
            future.append(vacation)
        else:
            ongoing.append(vacation)
    return jsonify([{"past":past,"ongoing":ongoing,"future":future}]), 200

from flask import jsonify
from models.db_config import get_db_connection

def register_user(first_name,last_name,mail, password):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO "Final Project".users (first_name,last_name,email, password,role_id) VALUES (%s, %s, %s,%s, 1) RETURNING user_id', (first_name,last_name,mail, password,))
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return user_id

def get_user_by_email(mail):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT user_id,first_name,last_name,email,password,role_id FROM "Final Project".users WHERE email = %s', (mail,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user
 
def get_all_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT user_id, email, last_name, first_name
        FROM "Final Project".users ORDER BY user_id ASC
    """)
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users

def update_usermail(mail,id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('update "Final Project".users email=%s where user_id=%s RETURNING user_id,first_name,last_name,email', (mail,id))
    user_new = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return user_new

def update_user_password(password,id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('update "Final Project".users password=%s where user_id=%s', (password,id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Password updated successfully!"}), 200

def delete_user(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('delete from "Final Project".users where user_id=%s', (id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "User deleted successfully!"}), 200
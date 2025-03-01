from models.db_config import get_db_connection
 
def add_country(country_name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO "Final Project".countries (name) VALUES (%s) RETURNING country_id', (country_name,))
    country_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return country_id

def get_all_countries():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM "Final Project".countries')
    countries = cur.fetchall()
    cur.close()
    conn.close()
    return countries

def get_country_by_id(country_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM "Final Project".countries where (%s) = country_id', (country_id,))
    country = cur.fetchone()
    cur.close()
    conn.close()
    return country

def delete_country_by_id(country_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('delete FROM "Final Project".countries where (%s) = country_id RETURNING country_id', (country_id,))
    delete_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return delete_id

def update_country_by_id(id, new_country):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE "Final Project".countries SET name = (%s) where country_id = (%s) RETURNING country_id', (new_country, id))
    update_row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return update_row




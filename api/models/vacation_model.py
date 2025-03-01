from models.db_config import get_db_connection

def add_vacation(country_id,description,since,till, price,foldername, img):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO "Final Project".vacations (country_id,description,since,till, price,foldername,img) VALUES (%s,%s,%s,%s,%s,%s,%s) RETURNING vacation_id', (country_id,description,since,till, price,foldername,img))
    vacation_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return vacation_id

def get_vacation_by_id(vid):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT v.vacation_id, v.country_id, v.description, v.since, v.till, v.price, v.foldername, c.name as country_name, v.img FROM "Final Project".vacations v JOIN "Final Project".countries c ON v.country_id = c.country_id WHERE v.vacation_id = %s', (vid,))
    vacation = cur.fetchall()
    cur.close()
    conn.close()
    if vacation:
        return vacation[0]
    return None

def get_vacationId(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT vct_id FROM "Final Project".connection WHERE user_id = %s', (user_id,))
    vacations = cur.fetchall()
    cur.close()
    conn.close()
    if not vacations:
        return None
    return vacations
 
def get_all_vacations():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT v.vacation_id, c.name AS country_name, v.description, v.since, v.till, v.price, v.foldername,
        COUNT(l.user_id) AS like_count,
                STRING_AGG(CAST(l.user_id AS TEXT), ', ' ORDER BY l.user_id) AS ids_who_liked, v.img
                        FROM "Final Project".vacations v
                                JOIN "Final Project".countries c ON v.country_id = c.country_id
                                        LEFT JOIN "Final Project".likes l ON v.vacation_id = l.vacation_id
                                                GROUP BY v.vacation_id, c.name, v.description, v.since, v.till, v.price, v.foldername, v.img
                                                        ORDER BY v.since
    """)
    vacations = cur.fetchall()
    cur.close()
    conn.close()
    return vacations

def delete_vacation_by_id(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('delete FROM "Final Project".vacations where  vacation_id = (%s) RETURNING vacation_id', (id,))
    delete_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return delete_id

def update_vacation_by_id(vacation_id,country_id,description,since,till, price,foldername,img):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE "Final Project".vacations SET country_id = (%s) , description=(%s) , since=(%s), till=(%s),price=(%s),foldername=(%s),img=(%s) where vacation_id = (%s) RETURNING vacation_id', (country_id,description,since,till, price,foldername,img,vacation_id))
    update_row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return update_row

def getVacationStatus():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""SELECT v.vacation_id,c.name AS country, v.since AS departure_date, 
        v.till AS return_date, v.price, COUNT(l.user_id) AS likes,
        CASE WHEN v.till < CURRENT_DATE THEN 'Past'
        WHEN v.since <= CURRENT_DATE AND v.till >= CURRENT_DATE THEN 'Ongoing'
        ELSE 'Future' END AS vacation_status FROM "Final Project".vacations v
        JOIN "Final Project".countries c ON v.country_id = c.country_id
        LEFT JOIN "Final Project".likes l ON v.vacation_id = l.vacation_id
        GROUP BY v.vacation_id, c.name, v.since, v.till, v.price
        ORDER BY vacation_status, v.since""")
    vctsStatus = cur.fetchall()
    cur.close()
    conn.close()
    return vctsStatus

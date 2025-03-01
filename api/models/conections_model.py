from models.db_config import get_db_connection
 
def add_conection(vacation_id, user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO "Final Project".connection (vct_id, user_id) VALUES (%s,%s)', (vacation_id, user_id,))
    conn.commit()
    cur.close()
    conn.close()

def get_people_on_vacation(vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT user_id FROM "Final Project".connection WHERE vct_id = %s', (vacation_id,))
    people = cur.fetchall()
    cur.close()
    conn.close()
    return people

def get_vacations_on_person(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT vct_id FROM "Final Project".connection WHERE user_id = %s', (user_id,))
    vcts = cur.fetchall()
    cur.close()
    conn.close()
    return vcts

def delete_conection(vacation_id, user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('delete FROM "Final Project".connection where (%s)=vct_id and (%s)= user_id', (vacation_id, user_id,))
    conn.commit()
    cur.close()
    conn.close()

from models.db_config import get_db_connection
 
def add_like(vacation_id, user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO "Final Project".likes (vacation_id, user_id) VALUES (%s,%s)', (vacation_id, user_id,))
    conn.commit()
    cur.close()
    conn.close()

def get_likes():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT COUNT(*) as like_count FROM "Final Project".likes')
    likes = cur.fetchone()
    if likes is None:
        likes = (0)
    cur.close()
    conn.close()
    return likes

def delete_like(vacation_id, user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('delete FROM "Final Project".likes where (%s)=vacation_id and (%s)= user_id', (vacation_id, user_id,))
    conn.commit()
    cur.close()
    conn.close()


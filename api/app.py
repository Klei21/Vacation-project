from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routes.country_routes import country_bp
from routes.user_routes import user_bp
from routes.vacation_routes import vacation_bp
from routes.likes_route import likes_bp
from routes.conecction_route import conection_bp

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
jwt = JWTManager(app)

CORS(app)

app.register_blueprint(country_bp)
app.register_blueprint(user_bp)
app.register_blueprint(vacation_bp)
app.register_blueprint(likes_bp)
app.register_blueprint(conection_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

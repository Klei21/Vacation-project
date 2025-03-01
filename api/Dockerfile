FROM python:3-alpine3.19 

WORKDIR /app 

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev

# Install dependencies
RUN apk add --no-cache gcc musl-dev postgresql-dev && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Set Flask environment variables
EXPOSE 5000

# Run Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
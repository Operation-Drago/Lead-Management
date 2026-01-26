# Lead Management Application - Setup Guide

## Quick Start

### 1. Install Python
Download and install Python 3.8+ from https://www.python.org/downloads/
**Important:** Check "Add Python to PATH" during installation

### 2. Install PostgreSQL
Download and install PostgreSQL from https://www.postgresql.org/download/
Remember the password you set during installation.

### 3. Create Database
Open pgAdmin or psql and run:
```sql
CREATE DATABASE lead_management_db;
```

### 4. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

Edit `lead_management/settings.py` and update PostgreSQL password:
```python
'PASSWORD': 'your_postgres_password',  # Line 94
```

Then run:
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 5. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

### 6. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin

Login with the superuser credentials you created!

## Default Configuration

- **Database Name:** lead_management_db
- **Database User:** postgres
- **Database Host:** localhost
- **Database Port:** 5432
- **Backend Port:** 8000
- **Frontend Port:** 5173

## Need Help?

Check the main README.md for detailed documentation and troubleshooting.

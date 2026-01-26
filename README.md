# Lead Management Application

A full-stack web application for managing leads with JWT-based authentication.

## Tech Stack

### Backend
- **Python 3.x**
- **Django 5.0.1** - Web framework
- **Django REST Framework** - API development
- **Simple JWT** - JWT authentication
- **PostgreSQL** - Database
- **CORS Headers** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client

## Features

- ✅ JWT-based authentication
- ✅ User login/logout
- ✅ Create, read, update, delete leads
- ✅ Protected routes
- ✅ Modern, responsive UI with premium design
- ✅ Form validation
- ✅ Error handling

## Project Structure

```
lead-management-app/
├── backend/
│   ├── lead_management/      # Django project settings
│   ├── leads/                # Leads app
│   ├── users/                # Users app
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── context/          # Auth context
    │   ├── services/         # API services
    │   └── App.jsx
    ├── index.html
    └── package.json
```

## Setup Instructions

### Prerequisites

1. **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download Node.js](https://nodejs.org/)
3. **PostgreSQL** - [Download PostgreSQL](https://www.postgresql.org/download/)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE lead_management_db;
   ```

5. **Update database credentials in `lead_management/settings.py`:**
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'lead_management_db',
           'USER': 'your_postgres_username',
           'PASSWORD': 'your_postgres_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

6. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

7. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start development server:**
   ```bash
   python manage.py runserver
   ```

   Backend will run at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend will run at `http://localhost:5173`

## Usage

1. **Access the application:**
   - Open browser and navigate to `http://localhost:5173`

2. **Login:**
   - Use the superuser credentials you created
   - Or create a new user via Django admin at `http://localhost:8000/admin`

3. **Manage Leads:**
   - View all leads in the table
   - Click "Add New Lead" to create a lead
   - Click "Edit" to update a lead
   - Click "Delete" to remove a lead

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login (get JWT tokens)
- `POST /api/auth/refresh/` - Refresh access token

### Leads (JWT Protected)
- `GET /api/leads/` - List all leads
- `POST /api/leads/` - Create new lead
- `GET /api/leads/{id}/` - Get lead details
- `PATCH /api/leads/{id}/` - Update lead
- `DELETE /api/leads/{id}/` - Delete lead

## Lead Model Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Auto | Primary key |
| name | String | Lead name |
| email | Email | Email address |
| phone | String | Phone number |
| source | String | Lead source (e.g., Website, Referral) |
| status | Boolean | Active/Inactive status |
| created_at | DateTime | Creation timestamp |
| created_by | ForeignKey | User who created the lead |

## Development Notes

- Backend runs on port 8000
- Frontend runs on port 5173
- CORS is configured to allow requests from `http://localhost:3000` and `http://localhost:5173`
- JWT access tokens expire after 1 hour
- JWT refresh tokens expire after 1 day
- All lead endpoints require authentication

## Troubleshooting

### Python not found
- Install Python from [python.org](https://www.python.org/downloads/)
- Make sure to check "Add Python to PATH" during installation

### PostgreSQL connection error
- Verify PostgreSQL is running
- Check database credentials in `settings.py`
- Ensure database `lead_management_db` exists

### CORS errors
- Verify backend is running on port 8000
- Check CORS settings in `settings.py`

## Future Enhancements

- [ ] User registration
- [ ] Email notifications
- [ ] Lead assignment to users
- [ ] Advanced filtering and search
- [ ] Export leads to CSV
- [ ] Dashboard with analytics

## License

This project is created for educational purposes.

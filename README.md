# Used Car Dealership

A used car dealership web application built using Node.js, Express, PostgreSQL, and EJS. The application demonstrates secure authentication, role-based authorization, CRUD operations, relational database design, server-side rendering, and backend validation through a realistic dealership management system.

---

## Features

### Customer Features

- Browse vehicle inventory
- View vehicle details and images
- Submit, edit, and delete reviews
- Submit service requests
- View personal service request history
- Submit contact messages
- Register and log in securely

### Employee Features

- Manage vehicle inventory
- Manage service requests
- Add service notes
- Update service request status
- View and manage customer contact messages
- View dealership dashboard statistics
- Administrative dashboard access

### Owner Features

Includes all employee permissions plus:

- Manage vehicle categories

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pgAdmin 4
- EJS
- express-session
- connect-pg-simple
- bcrypt
- express-validator
- dotenv

---

## Project Structure

```
src/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utilities/
├── database/
├── public/
│   └── images/
└── views/
```

The project follows the MVC (Model-View-Controller) architecture to separate business logic, database access, routing, and presentation.

---

## Database

The application uses PostgreSQL with a normalized relational database.

Main tables include:

- Users
- Vehicles
- Categories
- Vehicle Images
- Reviews
- Service Requests
- Service Notes
- Contact Messages

### Entity Relationship Diagram

```
public/images/ERD.png
```

---

## User Roles

### Customer

- Browse inventory
- Leave reviews
- Submit service requests
- View service history
- Contact dealership

### Employee

- Manage vehicles
- Manage service requests
- Update request status
- Add technician notes
- View customer messages

### Owner

- All employee permissions
- Manage categories

---

## Test Accounts

### Customer

Email

```
user@test.com
P@$$w0rd!
```

---

### Employee

Email

```
employee@test.com
P@$$w0rd!
```

---

### Owner

Email

```
admin@test.com
P@$$w0rd!
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
pnpm install
```

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
PORT=3000
```

Replace these placeholder values with your own PostgreSQL connection string and a secure session secret.

Run the application

```bash
pnpm run dev
```

---

## Validation & Security

- Password hashing using bcrypt
- Session authentication
- PostgreSQL session store
- Role-based authorization
- Server-side validation using express-validator
- Parameterized SQL queries
- Protected employee and owner routes

---

## Major Features Demonstrated

- MVC architecture
- Authentication
- Authorization
- CRUD operations
- Relational database design
- Session management
- Dynamic server-side rendering
- Image management
- Dashboard reporting
- Form validation
- Error handling

---

## Future Improvements

Potential enhancements include:

- Vehicle search and filtering
- Vehicle availability tracking
- Email notifications
- Appointment scheduling
- Vehicle image uploads through the admin dashboard
- Sales and purchase tracking
- Analytics dashboard

---

## Author

Nathan Escujuri

BYU–Idaho

CSE 340 Backend Web Development Final Project
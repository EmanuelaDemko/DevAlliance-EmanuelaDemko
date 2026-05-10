# DevAlliance - Emanuela Demko

## My Everywhere Library

A personal book tracking application built as part of the DevAlliance training program. The project consists of two parts: a frontend website and a backend REST API.

---

## Detyra 1 - Frontend

A 4-page responsive website for tracking your personal book collection.

### Technologies

- HTML5
- CSS3 (Custom styling)
- JavaScript (Vanilla)
- Bootstrap 5
- jQuery DataTables

### Pages

| Page | Description |
|------|-------------|
| **Home** (`index.html`) | Dashboard with stats cards, featured books |
| **Books** (`books.html`) | Book list with DataTable, filtering, add/edit/delete via modals |
| **About** (`about.html`) | About the app, features, and usage guide |
| **Contact** (`contact.html`) | Contact form with JavaScript validation |

### Features

- Responsive design (mobile + desktop)
- Dark mode toggle
- Book CRUD operations with localStorage persistence
- Filter books by status (TBR, Reading, Read, DNF)
- Form validation with error messages
- DataTables integration for book listing
- Custom color scheme (bookish theme)

### How to Run

Open `frontend/index.html` in any web browser.

---

## Detyra 2 - Backend

A REST API for managing books, users, and ratings built with Spring Boot.

### Technologies

- Java 17
- Spring Boot 3.2.0
- MySQL
- Maven
- Jakarta Validation

### Project Structure

```
My Everywhere Library [backend]/
├── src/main/java/com/myeverywherelibrary/
│   ├── MyEverywhereLibraryApplication.java
│   ├── controller/
│   │   ├── UserController.java
│   │   ├── BookController.java
│   │   └── RatingController.java
│   ├── service/
│   │   ├── UserService.java
│   │   ├── BookService.java
│   │   └── RatingService.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── BookRepository.java
│   │   └── RatingRepository.java
│   └── model/
│       ├── User.java
│       ├── Book.java
│       ├── BookStatus.java
│       └── Rating.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

### Database

3 tables with relationships:

- **User** - id, username, email, createdAt
- **Book** - id, title, author, status, targetDate, dnfReason, createdAt, userId (Many-to-One with User)
- **Rating** - id, overallRating (1-5), userNotes, createdAt, bookId (Many-to-One with Book)

### API Endpoints

#### Users (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/{id}` | Update a user |
| DELETE | `/api/users/{id}` | Delete a user |

#### Books (`/api/books`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get book by ID |
| GET | `/api/books/user/{userId}` | Get books by user |
| GET | `/api/books/status/{status}` | Get books by status |
| POST | `/api/books?userId={id}` | Create a new book |
| PUT | `/api/books/{id}` | Update a book |
| DELETE | `/api/books/{id}` | Delete a book |

#### Ratings (`/api/ratings`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ratings` | Get all ratings |
| GET | `/api/ratings/{id}` | Get rating by ID |
| GET | `/api/ratings/book/{bookId}` | Get rating by book |
| POST | `/api/ratings?bookId={id}` | Create a new rating |
| PUT | `/api/ratings/{id}` | Update a rating |
| DELETE | `/api/ratings/{id}` | Delete a rating |

### Book Statuses

- **TBR** - To Be Read
- **READING** - Currently Reading
- **READ** - Finished Reading
- **DNF** - Did Not Finish

### How to Run

1. Make sure you have Java 17 and MySQL installed

2. Create the database:
   ```sql
   CREATE DATABASE myeverywherelibrary;
   ```

3. Update `src/main/resources/application.properties` with your MySQL password:
   ```properties
   spring.datasource.password=your_password
   ```

4. Run the application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

5. The API will be available at `http://localhost:8080`

### Testing with Postman

Import the API endpoints listed above into Postman. Example request bodies:

**Create User (POST /api/users):**
```json
{
  "username": "emanuela",
  "email": "emanuela@example.com"
}
```

**Create Book (POST /api/books?userId=1):**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "status": "TBR",
  "targetDate": "2026-06-01"
}
```

**Create Rating (POST /api/ratings?bookId=1):**
```json
{
  "overallRating": 5,
  "userNotes": "Amazing book, loved every page!"
}
```

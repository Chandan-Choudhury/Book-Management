# Book Management RESTful API

This is a RESTful API for managing books.

## API Endpoints

-   **POST** `/api/books`: Create a new book.
-   **GET** `/api/books`: Get a list of all books.
-   **GET** `/api/books/:id`: Get details of a specific book by ID.
-   **PUT** `/api/books/:id`: Update a book's details.
-   **DELETE** `/api/books/:id`: Delete a particular book.

### Request and Response Formats

-   Create a new book (POST /api/books):

    -   Request Body: { "title": "Book Title", "author": "Book Author", "summary": "Book Summary" }
    -   Response: The created book object.

-   Get a list of all books (GET /api/books):

    -   Response: An array of book objects.

-   Get details of a specific book (GET /api/books/:id):

    -   Response: The book object with the given ID.

-   Update a book's details (PUT /api/books/:id):

    -   Request Body: { "title": "Updated Title", "author": "Updated Author", "summary": "Updated Summary" }
    -   Response: The updated book object.

-   Delete a book (DELETE /api/books/:id):
    -   Response: No content (HTTP status 204).

## Setup and Run Locally

1. Clone this repository.
2. Install dependencies: `npm install`.
3. Add MongoDB Atlas connection User, Password, Database name to `.env`, take reference from `.env.sample`
4. Start the server on local: `npm run dev`.
5. The API will be available at `http://localhost:5003`.

## Decisions and Assumptions

-   This API assumes a simple book model with title, author, and summary fields.
-   The API runs on port 5003 by default in local. You can change this in `index.js`.
-   Error handling is minimal and should be improved for a production application with various features.

# Express.js With PostgreSQL

## Description
This code repository is an example of an Express.js application using PostgreSQL for database operations.

## Installation
Before running the code, make sure you have the following prerequisites installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/)

Once you have the prerequisites installed, follow these steps:

1. Clone the Repository: https://github.com/hendikaSatria/rakamin_hw_8.git
2. Install Dependencies:
```npm install dotenv express fs pg pg-pool ```
3. Set Environment Variables: Create a .env file in the project directory and configure the following environment variables with your PostgreSQL connection details:
```env
  USER=your_postgresql_user
  HOST=your_postgresql_host
  DATABASE=your_postgresql_database
  PASSWORD=your_postgresql_password
  PORT=your_postgresql_port
```
4. Run the Application: ```npm start```

### SOAL 1
**Seeding 5 Actors**

- Endpoint: `/seedActors`
- Method: POST
- Description: Inserts 5 actor records into the PostgreSQL database.
- How to Run: Make a POST request to `/seedActors`. The actors' data is hard-coded in the code, and this endpoint will insert them into the database.

**Fetching Actor Data**

- Endpoint: `/fetchActorsData`
- Method: GET
- Description: Retrieves all actors from the actor table.
- How to Run: Make a GET request to `/fetchActorsData` to retrieve all actor data.

### SOAL 2
**Fetching Film Data**

- Endpoint: `/fetchFilmData`
- Method: GET
- Description: Retrieves all film data from the database.
- How to Run: Make a GET request to `/fetchFilmData` to retrieve all film data.

**Fetching a Film by ID**

- Endpoint: `/fetchFilmById/:id`
- Method: GET
- Description: Retrieves a specific film by its ID.
- How to Run: Make a GET request to `/fetchFilmById/:id` with the film ID as a parameter to retrieve a specific film.

**Fetching Categories**

- Endpoint: `/fetchCategories`
- Method: GET
- Description: Retrieves all available film categories.
- How to Run: Make a GET request to `/fetchCategories` to retrieve all film categories.

**Fetching Films by Category**

- Endpoint: `/fetchFilmData/:category`
- Method: GET
- Description: Retrieves films belonging to a specific category.
- How to Run: Make a GET request to `/fetchFilmData/:category` with the category name as a parameter to retrieve films in that category.

### SOAL 3
**Migrate Age Column**

- Endpoint: `/migrateAgeColumn`
- Method: GET
- Description: Adds an 'age' column to the 'actor' table in the PostgreSQL database.
- How to Run: Make a GET request to `/migrateAgeColumn` to add the 'age' column to the actor table.

**Note:** Make sure to replace `your_postgresql_user`, `your_postgresql_host`, `your_postgresql_database`, `your_postgresql_password`, and `your_postgresql_port` in the `.env` file with your PostgreSQL connection details.

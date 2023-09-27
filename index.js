const express = require('express');
require('dotenv');
const app = express();
const { Client } = require('pg');

// Create a new PostgreSQL client with connection configuration from environment variables.
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.POT, 
});

// Connect to the PostgreSQL database and handle any errors.
client.connect().then(() => {
    console.log('Connected to PostgreSQL');
}).catch(err => {
    console.error('Error connecting to PostgreSQL', err);
});



// --------------------------------- SOAL 1 ----------------------------------------------------------
// Seeding 5 actor
app.post('/seedActors', (req, res) => {
    const actorsData = [
      { first_name: 'Marcus', last_name: 'Aurelius', last_update: new Date() },
      { first_name: 'Lucius', last_name: 'Seneca', last_update: new Date() },
      { first_name: 'Zeno', last_name: 'Citium', last_update: new Date() },
      { first_name: 'Musonius', last_name: 'Ruffus', last_update: new Date() },
      { first_name: 'Alexander', last_name: 'Macedon', last_update: new Date() },
    ]; 
    const query = {
      text: 'INSERT INTO actor (first_name, last_name, last_update) VALUES ($1, $2, $3)',
    };  
    // Loop through the data and execute the INSERT INTO statement for each actor
    actorsData.forEach(async (actor) => {
      try {
        await client.query(query, [actor.first_name, actor.last_name, actor.last_update]);
      } catch (error) {
        console.error('Error inserting actor:', error);
        res.status(500).send('Error inserting actors');
        return;
      }
});
  
    res.status(200).send('Seed data inserted successfully');
});

// Fetch all actors from the actor table for checking
app.get('/fetchActorsData', async (req, res) => {
    try {
      const query = 'SELECT * FROM actor';
      const result = await client.query(query);
      const actors = result.rows;
      res.status(200).json(actors);
    } catch (error) {
      console.error('Error retrieving actors:', error);
      res.status(500).send('Error retrieving actors');
    }
});




// --------------------------------- SOAL 2 ----------------------------------------------------------
// Fetch all film data, fetch film by id, fetch categories, fetch film data by categories

// Fetch all film data from the database
app.get('/fetchFilmData', (req, res) => {
    client.query('SELECT * FROM film_list', (err, result) => {
        if (err) {
            console.error('Error executing SQL query', err);
            res.status(500).send('Server Error');
            return;
        }
        const films = result.rows;
        res.status(200).json(films); 
    });
});

// Fetch a specific film by its ID
app.get('/fetchFilmById/:id', (req, res) => {
    const filmId = req.params.id;
    const query = {
        text: 'SELECT * FROM film_list WHERE fid = $1',
        values: [filmId],
    };
    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing SQL query', err);
            res.status(500).send('Server Error');
            return;
        }
        const film = result.rows[0];
        if (!film) {
            res.status(404).json({ error: 'Film not found for the given ID' });
        } else {
            res.status(200).json(film);
        }
    });
});

// Fetch all available film categories
app.get('/fetchCategories', (req, res) => {
    const query = {
      text: 'SELECT name FROM public.category',
    };
    client.query(query, (err, result) => {
      if (err) {
        console.error('Error executing SQL query', err);
        res.status(500).send('Server Error');
        return;
      }
      const categories = result.rows.map(row => row.name);
      res.status(200).json(categories);
    });
});

// Fetch films belonging to a specific category
app.get('/fetchFilmData/:category', (req, res) => {
    const category = req.params.category; 
    const query = {
        text: 'SELECT * FROM film_list film INNER JOIN public.category cat ON film.category = cat.name WHERE cat.name = $1',
        values: [category],
    };
    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing SQL query', err);
            res.status(500).send('Server Error');
            return;
        }
        const films = result.rows;
        if (films.length === 0) {
            res.status(404).json({ error: 'No films found for the given category' });
        } else {
            res.status(200).json(films);
        }
    });
});





// --------------------------------- SOAL 3 ----------------------------------------------------------
// Migrate age coloumn
app.get('/migrateAgeColumn', async (req, res) => {
    try {
      // Add the age column
      await client.query('ALTER TABLE actor ADD COLUMN age integer');
      res.status(200).send('Age column migration successful');
    } catch (error) {
      console.error('Error migrating age column:', error);
      res.status(500).send('Error migrating age column');
    }
});
  

// Listen on port 3000
app.listen(3000, () => {
  console.log('I love you 3000', process.env.PASSWORD);
});


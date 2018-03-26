INSERT INTO users (auth0_id, email, pictureUrl) VALUES ($1, $2, $3)
RETURNING *;
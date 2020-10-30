CREATE TABLE IF NOT EXISTS users (
    id                  SERIAL PRIMARY KEY,
    email               VARCHAR(100) UNIQUE NOT NULL,
    githubId            INTEGER UNIQUE,
    githubAccessToken   VARCHAR(100),
    created_on          DATE NOT NULL
)
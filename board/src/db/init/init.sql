CREATE TABLE IF NOT EXISTS board (
    id SERIAL PRIMARY KEY,
    title varchar(100),
    content varchar(100),
    thumbsUp int DEFAULT 0,
    thumbsDown int DEFAULT 0,
    userId varchar(100),
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp DEFAULT CURRENT_TIMESTAMP
);
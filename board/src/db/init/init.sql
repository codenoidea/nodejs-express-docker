CREATE TABLE IF NOT EXISTS board (
    id SERIAL PRIMARY KEY,
    title varchar(100),
    content varchar(100),
    thumbs_up int DEFAULT 0,
    thumbs_down int DEFAULT 0,
    userid varchar(100),
    created_at date DEFAULT CURRENT_TIMESTAMP,
    updated_at date
);
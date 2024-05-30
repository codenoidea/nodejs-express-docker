docker-compose up -d --build

docker-compose down

docker-compose logs -f

docker run -d -p 27017:27017 mongo:latest
# docspace

# Maven

    mvn compile

# Docker

    docker network create docspace-network
    docker build . -t docspace/backend:v0
    docker run --net docspace-network docspace/backend:v0

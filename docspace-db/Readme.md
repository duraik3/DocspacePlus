## Docker

    docker network create docspace-network
    docker build . -t docspace/database:v0
    docker run --net docspace-network -e POSTGRES_PASSWORD=admin docspace/database:v0

## Dump table user drom database in docker

    docker exec -it docspace-compose_database_1 pg_dump --username=admin --host=172.23.0.3 --password --column-inserts --table=users --table=speaker --table=video --table=channel --table=video_channel --data-only docspace > /home/brahim/code/docspace-compose/docspace-db/scripts/populate.sql
    psql -h172.26.0.4 --username=admin --file=script/populate.sql --password docspace

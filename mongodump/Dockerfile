FROM mongo:bionic

COPY init-data.json /init-data.json

CMD mongoimport                                 \
    # Host (docker-compose service name)
    --host mongogodb                        \
    # user and pass from .env file
    --username mmdadmin      \
    --password mmdadmin123      \
    --authenticationDatabase admin              \
    # initial db and collection from .env file
    --db test                 \
    --collection user       \
    --type json                                 \
    --file /init-data.json                      \
    --jsonArray                                 \
    # WARNING! drop collection before run import
    --drop                                      \
    # verbose
    -v         

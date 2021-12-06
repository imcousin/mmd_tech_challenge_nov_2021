FROM mongo:bionic

COPY init-data2.json /init-data2.json

CMD mongoimport                                 \
    # Host (docker-compose service name)
    --host mongogodb                        \
    # user and pass from .env file
    --username mmdadmin      \
    --password mmdadmin123      \
    --authenticationDatabase admin              \
    # initial db and collection from .env file
    --db test                 \
    --collection assignments       \
    --type json                                 \
    --file /init-data2.json                      \
    --jsonArray                                 \
    # WARNING! drop collection before run import
    --drop                                      \
    # verbose
    -v         


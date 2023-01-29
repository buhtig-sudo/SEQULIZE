curl -L https://fly.io/install.sh | sh
export FLYCTL_INSTALL="/project/home/buhtig-sudo/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
fly auth login


(https://fullstackopen.com/en/part13/using_relational_databases_with_sequelize#advantages-and-disadvantages-of-document-databases)



flyctl postgres connect -a dbappa-db
flyctl proxy 5432 -a dbappa-db
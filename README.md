curl -L https://fly.io/install.sh | sh
export FLYCTL_INSTALL="/project/home/buhtig-sudo/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
fly auth login

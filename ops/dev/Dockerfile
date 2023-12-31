FROM ubuntu:latest
MAINTAINER The Blue Alliance

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Get apt dependencies
RUN apt-get update && apt-get install -y \
  git \
  wget \
  curl \
  unzip \
  sudo \
  python2.7 \
  python2.7-dev \
  build-essential \
  jq \
  checkinstall \
  libssl-dev \
  tmux \
  vim \
  openssh-server \
  libmysqlclient-dev

RUN ls /usr/bin/python*
RUN update-alternatives --install /usr/bin/python python /usr/bin/python2.7 1 && \
    update-alternatives --install /usr/bin/python python /usr/bin/python3 2
RUN echo 1 | update-alternatives --config python
RUN curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip.py && python get-pip.py

# Configure ssh server
RUN mkdir /var/run/sshd
RUN echo 'root:tba' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile
EXPOSE 22

# Get appengine environment
ENV GAE_VERSION 1.9.66
RUN wget https://storage.googleapis.com/appengine-sdks/featured/google_appengine_$GAE_VERSION.zip -nv
RUN unzip -q google_appengine_$GAE_VERSION.zip

# Set up nvm and nodejs
ENV NVM_DIR /nvm
ENV NODE_VERSION 10.16.0
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION --silent \
    && nvm alias default $NODE_VERSION \
    && nvm use default --silent

# Expose ports for TBA
EXPOSE 8000
EXPOSE 8080-8089

# Start SSH server
CMD ["/usr/sbin/sshd", "-D"]

# Add vars to SSH automatically
RUN echo source /tba/ops/dev/vars.sh >> /root/.bashrc

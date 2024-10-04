FROM --platform=linux/amd64 ubuntu:20.04

SHELL ["/bin/bash", "--login", "-c"]

# RUN ulimit -n 1024000 && apt ... if DOCKER_BUILDKIT=1 or buldx is slow
RUN apt-get update --fix-missing && \
    apt-get install -y sudo net-tools apt-utils curl git zip unzip neovim zsh htop

RUN useradd -ms /bin/bash developer
RUN adduser developer sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER developer

WORKDIR /home/developer

# Node version manager, NodeJS, NPM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install v12.14.0

ENV NODE_PATH /home/developer/.nvm/versions/node/v12.14.0/lib/node_modules
ENV PATH      /home/developer/.nvm/versions/node/v12.14.0/bin:$PATH

RUN . ~/.nvm/nvm.sh && nvm use 12.14.0

RUN echo "source /usr/share/bash-completion/completions/git" >> /home/developer/.bashrc
RUN mkdir -p \
    /home/developer/.vscode-server/extensions \
    /home/developer/.vscode-server-insiders/extensions

RUN sudo chsh -s $(which zsh) developer

# RUN sudo apt-get update --fix-missing && \
#     sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nginx

RUN curl -SLO https://github.com/cortesi/devd/releases/download/v0.9/devd-0.9-linux64.tgz && \
    tar -vxf devd-0.9-linux64.tgz && \
    sudo mv devd-0.9-linux64/devd /usr/local/bin/ && \
    rm -r devd-0.9-linux64 && \
    rm devd-0.9-linux64.tgz

WORKDIR /protocol

CMD /bin/sh -i

FROM androidsdk/android-29

RUN curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh -o install_nvm.sh && \
    bash && \
    bash install_nvm.sh && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && \
    nvm install 14 && \
    npm install -g yarn  && \
    yarn config set registry https://registry.npm.taobao.org && \
    yarn global add @angular/cli && \
    node -v
WORKDIR /opt/www

CMD bash


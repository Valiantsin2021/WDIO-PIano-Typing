FROM ianwalter/puppeteer:latest
WORKDIR /app
ADD . /app
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 4EB27DB2A3B88B8B
RUN apt-get update && apt-get -y install software-properties-common apt-transport-https wget
RUN wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main"
RUN apt-get update && apt-get -y install microsoft-edge-stable


RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install ./google-chrome-stable_current_amd64.deb

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys A6DCF7707EBC211F
RUN apt-add-repository "deb http://ppa.launchpad.net/ubuntu-mozilla-security/ppa/ubuntu bionic main"
RUN apt-get update && apt-get install -y --no-install-recommends firefox

RUN apt-get -y install openjdk-11-jre-headless
RUN npm ci
RUN npx selenium-standalone install
RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install n -g && \
    n latest
RUN npm -v
RUN node -v

RUN npm install

ENTRYPOINT [ "npm", "run" ]

# The main purpose of a CMD is to provide default commands to an executing container
CMD ["test"]

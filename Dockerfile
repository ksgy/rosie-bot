FROM node:boron

# Copy server code
RUN mkdir -p /usr/src/app /usr/src/app/node_modules /usr/src/app/lib /usr/src/app/bin

COPY ./bin/bot.js /usr/src/app/bin
COPY ./lib/helpers.js /usr/src/app/lib
COPY ./lib/rosiebot.js /usr/src/app/lib
COPY ./node_modules /usr/src/app/node_modules

# Create worker user
RUN useradd -ms /bin/bash rosie-slackbot
RUN chown -R rosie-slackbot /usr/src/app

# Set up log files
RUN touch /var/log/rosie-slackbot.log
RUN chown rosie-slackbot /var/log/rosie-slackbot.log

# Start the server
USER rosie-slackbot
WORKDIR /usr/src/app
EXPOSE 8080
CMD [ "node", "./bin/bot.js" ]
#CMD [ "sleep", "50000000" ]

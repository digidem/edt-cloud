FROM webrecorder/browsertrix-crawler:0.8.1
# TODO: add app crawling
RUN npm i -g edt-app-crawler
COPY ./crawl-config.yml /app/crawl-config.yml
COPY ./crawl.sh /app/crawl.sh
COPY ./start.sh /app/start.sh
ENTRYPOINT ["sh", "/app/start.sh"]

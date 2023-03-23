#!/usr/bin/env bash

echo "--------- Starting FileBrowser -----------"
echo "Initiating config"
filebrowser config init
echo "Loading config file"
echo "LOCALE: $LOCALE"
sed -i -r "s/#LOCALE/$LOCALE/g" /config/custom/filebrowser.json
echo "TITLE: $TITLE"
sed -i -r "s/#TITLE/$TITLE/g" /config/custom/filebrowser.json
filebrowser config import /config/custom/filebrowser.json
filebrowser config set --branding.files "/config/custom/branding"
filebrowser
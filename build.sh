#!/bin/bash
npm install
rm -rf dist
npm run build
rm -rf node_modules
npm install --only=prod
# docker build -Edgar-Watcher-Prod .
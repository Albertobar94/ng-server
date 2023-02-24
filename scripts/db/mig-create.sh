#!/usr/bin/env sh

./node_modules/.bin/typeorm migration:create ./src/database/migration/"$1";
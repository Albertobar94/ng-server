#!/usr/bin/env sh

./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run -d src/database/db.config.ts;
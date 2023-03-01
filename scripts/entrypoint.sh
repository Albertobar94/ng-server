echo "-------------------> Waiting for db to start"
sleep 5;
echo "-------------------> Running migrations"
./node_modules/.bin/typeorm migration:run -d dist/database/db.config.js;
echo "-------------------> Finished migrations"
node --perf_basic_prof_only_functions ./dist/main.js
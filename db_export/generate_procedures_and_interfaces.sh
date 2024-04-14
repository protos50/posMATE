#!/bin/sh

echo "-- Instalando dependencias"
npm i
echo "-- Generando interfaces"
node database_to_typescript.js
echo "-- Generando procedimientos"
set -a && . ../backend/.env &&  DB_CONNECTION_STRING=mssql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME && set +a &&  echo "Generando procedimientos $DB_CONNECTION_STRING" && npx yo mssql-types 
echo "-- Moviendo procedimientos"
rm -rf ../backend/src/procedures
mv generated ../backend/src/procedures
echo "-- Listo"
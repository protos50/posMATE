- Instalar dependencias con `npm install`
- Ejecutar `node database_to_typescript.js` para generar los tipos de datos de la base de datos
- La salida se guarda en `../backend/src/models/DBInterfaces.ts`

# Generar procedimientos almacenados

`set -a && . ../backend/.env &&  DB_CONNECTION_STRING=mssql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME && set +a &&  echo "Generando procedimientos $DB_CONNECTION_STRING" && yo mssql-types `

 
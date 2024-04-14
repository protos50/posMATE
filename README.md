
Para importar bacpac en linux:

- Instalar [sqlpackage](https://docs.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage-download?view=sql-server-ver15)
- Importar `sqlpackage /a:Import /tec:Optional /sf:/home/ubuntu/posMATE/aplicacion_escritorio/DB_posnet.bacpac /tsn:localhost /tdn:POSMATE /tu:sa /tp:Password12345`

# Levantar DB
- Configurar las variables de entorno en `backend/.env`
- Si hay cambios en la base de datos, ejecutar primero `db_export/generate_procedures_and_interfaces.sh`
- Ejecutar `docker compose up -d` en el directorio db

Para importar bacpac en linux:

- Instalar [sqlpackage](https://docs.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage-download?view=sql-server-ver15)
- Importar `sqlpackage /a:Import /tec:Optional /sf:/home/ubuntu/posMATE/aplicacion_escritorio/DB_posnet.bacpac /tsn:localhost /tdn:DB_posnet /tu:sa /tp:Password12345`

# Levantar DB y API

- Ejecutar `docker compose up -d` en el directorio db
- Importar bacpac usando sqlpackage o similar
- Reiniciar el contenedor de la api con `docker restart posmate-api`

El servidor SQL estará disponible en `localhost:1433` y la API en `http://localhost:3000`
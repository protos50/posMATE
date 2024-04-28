Ejecutar `generate_procedures_and_interfaces.sh`

# Nota

Hay que parchear `node_modules/generator-mssql-types/src/generators/app/impl/mssql
/parameters-mapper.ts`
en el procedimiento `makeParameter`

```typescript
const inputOrOutput = record.IsOutput ? "output" : "input";
return { name, type, optional, inputOrOutput };
```

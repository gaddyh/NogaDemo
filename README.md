<h1>.Net Core, Angular Demo for Noga ltd</h1>

The _SYSMCLTD_ folder is a .net core restfull API project.

The _sysmc-ltd-app_ folder is the Angular client.

<h2>Technical Details</h2>
To get things working you need to configure the DB connection string and API endpoints and also run the migration scripts.

1. The DB connection string is in the .net core project folder inside the <b>appsettings.json</b> file.

   Adjust the <b>_DefaultConnection_</b> property.
2. The migrations are in the **_Migrations_** folder. There are two migrations to apply. Once applied they will update your local DB with the project tables.

3. The Endpoints you configure in .net must match the ones in angular. There are three endpoints, for customers, contacts and addresses.
   These endpoints are defined in <b>app/customer.service.ts</b>

<h2>Images</h2>

![image](https://github.com/gaddyh/NogaDemo/assets/16175616/9810b767-784e-4c69-b460-bf31f8031e35)

![image](https://github.com/gaddyh/NogaDemo/assets/16175616/6675f138-5e03-4bb3-adb9-50aae41c6c7c)


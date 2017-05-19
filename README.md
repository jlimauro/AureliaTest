# Testing out Aurelia and MongoDB with ASP.NET Core.

This repository is to test out an ASP.NET Core Single Page Application with an Aurelia frontend and a MongoDB database for the backend. The application has an Aurelia component for a Todo List. Todos can be added to a list, checked off if completed and also be removed from the list. The todos are persisted on a MongoDB database.

## Prerequisites

* Install the .NET CLI from https://www.microsoft.com/net/core
* Use the .NET CLI to install the ASP.NET SPA Templates. 
  * `dotnet new --install "Microsoft.AspNetCore.SpaTemplates::*"`
* Install Node.js from https://nodejs.org
* Install MongoDB from https://www.mongodb.com/download-center

## Restoring Project Dependencies

* `dotnet restore` - This restores the .NET packages for the ASP.NET Core part of the application, as well as the MongoDb
* `npm install` - This restores the JavaScript packages that include Aurelia along with the other frontend build and development tooling, such as Webpack, TypeScript and Toastr for toast notifications. 

For more on Toastr go here: https://github.com/CodeSeven/toastr

### Start MongoDB
* Windows: Using Command Prompt navigate to your MongoDB install folder and run `mongod.exe`.
* Mac or Linux: Using terminal go to your MongoDB install /bin directory and run the command `./mongod`

No need to  create a database the AureliaTest application will create a TaskDb when new Tasks are added.

### Configure Your Environment

Set your system environment to run in development mode. This will enable the auto-rebuild feature of the Aurelia client and Hot Module Reload. See the list below for your specific platform:

* If you are using PowerShell on Windows, execute `$Env:ASPNETCORE_ENVIRONMENT = "Development"`
* If you are using cmd.exe on Windows, execute `setx ASPNETCORE_ENVIRONMENT "Development"`, and then restart your command prompt to make the change take effect.
* If your are on Mac or Linux, execute `export ASPNETCORE_ENVIRONMENT=Development`

## Starting the Application

To start application from command line, simply type `dotnet run`. Be sure to restore .NET Core packages and NodeJS packages before running application.  

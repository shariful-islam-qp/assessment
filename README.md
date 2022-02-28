# Steps to run this project

## Dependency for this project

    -   NodeJs. Version should be 12.0 or upper
    -   npm. In some cases, npm will install automatically with nodeJs
    -   MongoDB. Minimum 4.0 or Latest

-   Clone the project. Project location can be anywhere in your system. It's not mandatory to clone under /var/www.
-   Before running this project you have to create a **.env** file under the project root directory. You can just copy the **example.env** file and rename it to **.env** and make the necessary changes.

-   Type `npm install` to install all dependencies. Try `npm audit fix` if needed.
-   Type `npm run dev` to run this project
-   Type `npm run test` to run tests. Though I couldn't make unit tests. It's just a basic test setup with **JEST** .

## My Approachregarding unit test

-   Main barrier of unit testing are project configuration, projects structure and dependencies.
-   I tried to make project structure as much testable as possible.
-   Tried to maintain **SOLID Principles** to make ensure functions are doing single thing and **Dependency Inversion Principle** to solve dependency issue.
-   For load test I used **Apache benchmark**
-   No UI for this project. 

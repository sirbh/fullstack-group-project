# Web Development 1 group work repository for a web shop

# WebDev1 group work assignment, rounds 8-11

This is a project for the course Web Development 1 in Tampere University. The project is an implementation of a simple web shop. 

# Group 

Member1:  Saurabh Chauhan, saurabh.chauhan@tuni.fi, 150917632, 
resposible for: 
- Tasks: `8.5`, `9.2`, `9.6`, `10.3`, `10.4`, `11.1`
- Moreover worked on both API and Frontend related tasks
- Fixed bugs,created issues,created PRs,reviewed PRs.

Member2:  Julia Varjamo, julia.varjamo@tuni.fi, 150287553, 
resposible for: 
- Tasks: `8.2`, `8.4`, `9.4`, `10.2`, `11.6`
- Worked on tasks such as user registration and connecting to the URL
- as well as tasks relating to other project matters, for example setting up
- the repository and managing issues. 

Member2:  Laura Karjalainen, email, student ID, 
resposible for: TODO, short description of duties

# Instructions 

## Installation

### Prerequisites

For running this project, make sure you have Node and Git installed locally.

### Cloning the project

Clone the project with the command (using SSH key): 
```
git clone git@course-gitlab.tuni.fi:webdev1-fall-2023-groupwork/webdev1-fall2023-group053.git
```

## Running the project

When the project is installed locally, open your terminal in the root directory of the project. 

Then run the following commands: 
```
npm install
```
```
npm run nodemon
```
```
npm run 
```

## Running the tests

Tests can be ran with the command: 
```
npm test
``` 

## Node project structure

Below is a simplified UML diagram of the projects structure and components.

## Pages and navigation

Below is a diagram showing the pages and navigation paths with them. 

## Data models

Data models in this project represent users, orders and products. 

- User
    - Name: User
    - Attributes and types: 
        - Name, string
        - Email, string
        - Password, string
        - Role, String
    - Description of the model:
        - Model represents a user of the web shop.
        - User has either 'admin' or 'customer' as a role. 
        - User can perform tasks on the web shop. 
    - Connections to other models: 
        - None.
- Order
    - Name: Order
    - Attributes and types: 
        - CustomerId, userId
        - Items
            - Product, productId
            - Quantity, number
    - Description of the model:
        - Model represents an order made by a specific user in the web shop. 
        - Order can consist multiple products and quantities of products. 
    - Connections to other models: 
        - Order is connected to the user model that made the order.
        - Order is also connected to the product model. The products that are included in the order. 
- Product  
    - Name: Product
    - Attributes and types: 
        - Name, string
        - Price, number
        - Image, string
        - Description, string 
    - Description of the model:
        - Model represents a product of the web shop.
        - Product includes a name, price, image and a description. 
        - Products can be placed in an order. 
    - Connections to other models:
        - None.

## Security concerns

Listed below are the common vulnerabilities of a web application and how this application protects against them.

- Cross-Site Scripting
    - User input is validated and sanitized. 
- Information Leakage
    - 
- Authentication and Authorization
    - Authentication is done with checking user in put and password.
    - After the user is authenticated, the user gets authorized based on its role. 
- Session Management
    - 
- SQL Injection
    - Project uses MongoDB, a NoSQL database, but is still vulnerable to injection attacks. 
    - Input is sanitized. 
- Cross-Site Request Forgery

## Testing

Below shown in the table are the links to our GitLab issues, with their associated Mocha tests and test files. 

| Issues      | Test          |
| ------------- |:-------------:|
| [save user to database](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/17)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blame/main/test/own/dbUtils.test.js#L42) |
| [remove user from database](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/14)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blame/main/test/own/dbUtils.test.js#L71)|
| [update user from database](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/15)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blame/main/test/own/dbUtils.test.js#L89)|
| [find user by id](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/13)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blame/main/test/own/dbUtils.test.js#L26)|
| [add route /api/products/{id}](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/21)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blob/main/test/routes.test.js#L877)|
| [add route POST /api/products](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/22)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blob/main/test/routes.test.js#L1272)|
| [add route GET /api/orders](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/23)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blob/main/test/routes.test.js#L1420)|
| [add route GET api/orders/{id}](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/24)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blob/main/test/routes.test.js#L1543)|
| [add route POST /api/orders](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/25)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/blob/main/test/routes.test.js#L1659)|
| [Add user controllers to simplfy routes.js](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/issues/9)      | [Test](https://course-gitlab.tuni.fi/webdev1-fall-2023-groupwork/webdev1-fall2023-group053/-/tree/main/test/controllers)|
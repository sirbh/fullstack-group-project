# Web Development 1 group work repository for a web shop

This is a project for the course Web Development 1 in Tampere University. The project is an implementation of a simple web shop. 

# Instructions 

## Installation

### Prerequisites

For running this project, make sure you have Node and Git installed locally.


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

![A simple sequence diagram of the project structure](/documentation/project_structure.png)

## Pages and navigation

Below is a diagram showing the pages and navigation paths with them. Also, the user is always shown the navigation bar with links to each page, so the user can alternatively navigate through that to which page ever. For a clearer diagram, the navigation bar paths are not shown on the diagram.

![A diagram of the pages in the project and their navigation paths](/documentation/pages_and_navigation.png)

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
- Authentication and Authorization
    - Authentication is done with checking user in put and password.
    - After the user is authenticated, the user gets authorized based on its role. 
- Session Management
- SQL Injection
    - Project uses MongoDB, a NoSQL database, but is still vulnerable to injection attacks. 
    - Input is sanitized. 
- Cross-Site Request Forgery


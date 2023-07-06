# PF-services

PF-services is a project that allows you to set roles and permissions for a salary model. It also provides functionality to note the check-in and checkout time of employees. After 5 PM, the total hours worked remotely and onsite are calculated, and attendance is marked based on this. The distinction between onsite and remote work is determined by IP address.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Set roles and permissions for the salary model.
- Track check-in and checkout time of employees.
- Calculate total hours worked remotely and onsite after 5 PM.
- Mark attendance based on onsite and remote work using IP addresses.

## Installation

To install and run the PF-services project, follow these steps:

1. Clone the repository:

   ```shell
   git clone <repository-url>
2. cd PF-Service
3. npm install
4. npm start

## Usage
After following the installation steps, you can start using the PF-services project. Here are the available API endpoints:

Login: POST http://localhost:8800/api/login
Use this endpoint to log in to the application.

Register: POST http://localhost:8800/api/register
Use this endpoint to register a new user.

Logout: POST http://localhost:8800/api/logout
Use this endpoint to log out from the application.

Add Salary: POST http://localhost:8800/api/addSalary
Use this endpoint to add salary information.

Get Salary: GET http://localhost:8800/api/getSalary
Use this endpoint to retrieve salary information.

Feel free to explore other endpoints based on your project requirements.

## Contributing
Contributions to PF-services are welcome! If you would like to contribute, please follow these guidelines:

Fork the repository and create a new branch.
Make your changes and test them thoroughly.
Submit a pull request describing your changes.
Please ensure that you adhere to the code of conduct during the contribution process.

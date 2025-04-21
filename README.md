# Pixl Technical Test
This project is a web application for event management, with user authentication and payment integration through Mercado Pago. Admin users can create, edit, and delete events, while regular users can participate in events by making a payment.

## Technologies Used

Frontend:

React

Next.js

TailwindCSS

Zustand (for state management)

SweetAlert2 (for notifications)

## Backend / Database:

Prisma (ORM for interacting with the database)

Mercado Pago (for event payment integration)

bcryptjs and jsonwebtoken (for authentication and JWT token management)

## Other:

PostgreSQL (relational database)

## Requirements

Node.js: Ensure you have Node.js (v16 or higher) installed.

PostgreSQL Database: PostgreSQL is used to store data. You can install it locally or use a cloud service.

## Initial Setup

### Clone the repository:

git clone https://github.com/SantiFP/Pixl-technical-assessment
cd pixl-test

### Install dependencies:

Run the following command to install the dependencies:

npm install

### Configure the .env file:

Create a .env file at the root of the project with the following content:

DATABASE_URL="postgresql://postgres:S.f031097@localhost:5432/mydb"
JWT_SECRET="SecureJwtKeyForApp12345!"
MERCADO_PAGO_TOKEN='APP_USR-6702006718764553-042004-447e35c954b0cac9b439be6cb30d5264-2400812394'

DATABASE_URL: The URL of your PostgreSQL database. Change postgres and mydb to match your configuration.

JWT_SECRET: A secret key used for generating JWT tokens.

MERCADO_PAGO_TOKEN: Your Mercado Pago access token for integration with Mercado Pago.

## Buyer Credentials for Testing:

To complete the payment flow and test, please use the following credentials to log in to Mercado Pago:

Buyer User: TESTUSER2036808165

Buyer Password: BtjEdO24KF

## Generate the database with Prisma:

If you haven’t set up Prisma yet, run:

npx prisma migrate dev

## Running the Project

Start the development server:

To start the application in development mode, run:

npm run dev
The server will be available at http://localhost:3000.

## Database Development:

If you make changes to the Prisma schema, you can run the migrations with:

npx prisma migrate dev

## Features

Authentication: Users can log in with their email and password. During the authentication process, users can choose their role:

Admin: Can create, edit, and delete events.

Regular User: Can view available events and participate in them by making a payment.

Event Management: Admins can manage events with attributes like title, description, date, price, and an optional image.

Payment Integration: Regular users can make payments via Mercado Pago to participate in events. To complete the payment, you must log in with the provided Mercado Pago credentials for testing.

## How to Test the Project

To test the project:

Access the application: Go to http://localhost:3000 and create an account or log in.

Choose the role: During login, you can choose your role (Admin or Regular User).

Log in as Admin: If you select the Admin role, you will be able to manage events.

Participate in an event: Users can make a payment to participate in events by integrating with Mercado Pago. To complete the payment, use the buyer credentials provided earlier (TESTUSER2036808165 and BtjEdO24KF).

Authors
Santiago Fuentes - Developer
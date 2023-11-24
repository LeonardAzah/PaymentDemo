﻿# PaymentDemo

- Open the command line in your desired folder and run `https://github.com/LeonardAzah/PaymentDemo.git` to clone the repo.
- Run `npm i` to install all dependencies.k.

# Available Scripts

In the project directory, you can run:

# `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser and the documentation will open.

Inorder to make payment a user most register.

- user `/api/v1/auth/register` end point to register. You will need to provide `name, email, dateOfBirth, phone, password`.
- After registration an email will be send to you account on the url, get the `token and email`
- and make a post reques to the `/api/v1/auth/verify-email` endpoint. Without a verified email, user won't be allowed to login.
- login with `/api/v1/auth/login` using your `email and password`.
- A logged in user can make transfer using `/api/v1/transfers` and get their transaction history using `/api/v1/transfers/history`
# Link to a live demo
https://flutterwave-payment-demo.onrender.com/

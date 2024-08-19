# EP-backend
To host this server locally, first navigate into the ep-server directory of your cloned repository. Run the command npm install to install all dependancies.
Create a .env file in the directory ep-server.

To connect your own database, you must first sign up to a mongodb developer account. Follow their documentation for setting up a cluster and then to setup mongo atlas.
Once you have obtained a connection string for mongoose, paste this secret key to your .env file and assign it to DATABASE.

You will need to sign up for a stripe developer account and assign their provided test secret key to a value of STRIPE_SECRET_KEY in your .env file.

Create a SESSION_SECRET key in the .env file. This should be any random selection of letters and numbers.
Add ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET to your .env file. Again these are a random collection of letters and numbers.

To recap, your .env file should look as follows:

To create your own admin account for you local machine follow these steps:
- Navigate to ep-server
- Run the command "npm run createAdmin <your username> <your password>
- You can then login with your admin account

Finally, to run the application, run the command "npm run dev".

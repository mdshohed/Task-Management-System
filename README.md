## To open Client side. 
- First we have clone this project using this command `git clone`
- After the repository is cloned, we have to go project directory using this command `cd <repo-name>`
- Next, we have to install npm package using this command `npm install`
- Finaly, to start project we have to use this command `npm start`

## To open server site. 
- First we have to go server project directory, that exist in client directory. then install npm package using this command `npm install`
- next we have to connect mongodb cluster and copy uri from mongodb website and update uri variale that has index.js file. 
- Also, we have to update in uri variable `process.env.DB_USER` and `process.env.DB_PASS`. To update this we have to create `.env` file and store `DB_USER=<user>` and `DB_PASS=<password>`.
- After completed all setup we have to use this command to run server site `npm run dev`. 

## Used react library to build client site. 
- React
- React hooks
- Tailwind
- ReactRouter 
- SweetAlert
- axios

## Used library to build server site.
- express
- mongodb
- jsonwebtoken
- cors
- dotenv
- bcryptjs
- cookie-parser
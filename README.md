# OAuth 2.0 REST API Example
Example project for Node.js REST API based on express.js with OAuth 2.0


<br />
<br />


Database: **MongoDB**
<br /> Framework: **Express.js**

<br />
<br />


This sample REST API includes 2 areas. The first area is the OAuth process which includes:
1. An OAuth dialog (HTML window) that asks the user to authorize the client app by enter Client ID & Client Secret.
2. A route that generates an auth code and redirects to the client app.
3. A route to exchange an auth code for an Access Token.
4. A "secure" example endpoint that only responds if it is given a valid access token via the Authorization HTTP header, Client ID & Client Secret. This endpoint will be automatically called after the Access Token was generated to test that everything is working.


The second area contains some sample Endpoints for POST, DELETE & PUT requests which will only work if it is given a valid access token via the Authorization HTTP header, Client ID & Client Secret.
<br />
<br />


## Features
- LIMIT requests
- OAuth 2.0
- Check if Client ID, Client Secret, Access Token or POST data already exist in database to avoid duplicated data.
- Prevent CSRF attacks (cross-site request forgery attacks) by using CSRF token (https://www.npmjs.com/package/csurf).
- Secure express app by using Helmet (https://www.npmjs.com/package/helmet).



<br />
<br />


_______________________________________

<br />
<br />

# How to use?

## Create Access Token
First you must create your Database and define the name at the file **./admin/config.json** at element **"MongoDB_DB_NAME":"oauth-restapi-example"**.

<br /><br />Next you must create a Collection called **access** and insert your Client ID and Client Secret as example:
```javascript
{
    "client_id": "a",
    "client_secret": "b"
}
```

<br />**IMPORTANT** - Please notice that those Client ID and Client Secret values from above are currently hardcoded inside of the file:
<br />./website/js/auth.js
```javascript
const res = await axios.post(  window.location.origin + '/secure', { client_id: 'a', client_secret: 'b'  }, {
      headers: { authorization: accessToken.data['access_token'] }
}); 
```
<br /> This POST request was only created for sample reasons to verify that the OAuth process was working after we created the Access Token. If you use this for production you should remove this POST request.

<br /> <br /> Next you visit the Client APP, insert your Client ID and Client Secret and then press Submit:
- http://localhost:1337

<br /> <br /> That´s it! When everything was successfully your generated Access Token should be display in the Client APP and should be stored in your Access Collection. You can test if everything is working by use the example POST, DELETE, PUT request endpoints. Please check below..








<br /><br />

## Sample POST request
```bash
curl --location --request PUT 'http://localhost:1337/pizza?id=12345678&title=bbbb2&client_id=a&client_secret=b' \
--header 'Authorization: 50745173361995655525573263226081540815903524556943' \
--data-raw ''
```
```

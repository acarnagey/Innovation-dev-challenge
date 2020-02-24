# Frontend Challenge

### Challenge

Your task is to create document locker that stores important documents such as a drivers license and passport for users.

Here is an example of what it should look like:

<img src="/docs/image.png" align="middle" width="900" >

Note: You don't have to make it look pixel perfect to this image (but you can if you want). Use your own creativity and expertise.

Here's example user stories that may help guide what you develop:

> As a citizen of austin, I would like to have a digial locker for my important documents.

> I would like to be able to login

> I would like to be able to see my documents at a glance.

> I would like to be able to view a document in more details.

> I want to have a clean, reactive, easy to use interface.

### Resources

#### POST - /api/login/

This will return the user's information including accountId, name, and profile image url

#### GET - /api/account/{accountId}/documents/

This will return an accounts document urls, document types, and if the document has shared users. Note: You should replace {accountId} with an actual accountId returned by the login response.

#### GET - /api/documenttypes/

This will return a list of all the document types

### Some Hints & Guidelines

- You are welcome to use any React or styling frameworks you want.
- Write clean code.
- You must work on this alone. Do not share the code challenge with others.

#### The major points are

- logging in screen and logging in
- displaying documents at a glace
- viewing document details

#### BONUS points for

- displaying profile information when profile image is clicked.
- implementing an upload screen when upload button is clicked.
- search bar functionality
- filter button functionality
- make it responsive this should display well on mobile too.

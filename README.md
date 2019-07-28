<p align="center">
    <img src="./backend.png" height="130"/>
</p>
<p>
   <h1 align="center">Backend-diff</h1>
<p/>
    
<br/>

## Backend-diff JS and TS
  
  Backend-diff uses a stack full `JS/TS` on the backend, I'm making this project to improve
  my skills in the backend.
  
## Initing in the your PC

- For clone the project `git clone https://github.com/Wellers0n/Backend-diff.git`
- Enter in the folder `cd Backend-diff/`
- To install project dependency: `yarn install`
- After the installation of the dependencies `yarn start` in the default directory

## Routes

#### Login and create user
- `POST` => `/api/login` return -> `TOKEN`
- `POST` => `/api/createUser` return -> `status 200`

#### Articles
- `GET` => `/api/articles` return -> `json articles`
- `GET` => `/api/article/:id` return -> `json one article`
- `POST` => `/api/article` return -> `status 200 = create one article`
- `DELETE` => `/api/article/:id` return -> `status 200 = delete one article`
- `PUT` => `/api/article/:id` return -> `status 200 = update one article`

#### Comments
- `GET` => `/api/comment/:idArticle` return -> `json comments of an article`
- `POST` => `/api/comment` return -> `status 200 = create one comments`
- `DELETE` => `/api/comment/:id` return -> `status 200 = delete one article`
- `PUT` => `/api/comment` return -> `status 200 = update one article`

## Stack used

[NodeJS](https://nodejs.org/en/)<br/>
[KoaJS](https://koajs.com/)<br/>
[MongoDB](https://www.mongodb.com/)<br/>
[GraphQL](https://graphql.org/)<br/>
[Yarn](https://yarnpkg.com/en/)<br/>
[WorkSpaces](https://yarnpkg.com/lang/en/docs/workspaces/)<br/>

## Profile
@nandosangenetto

<h1>💻 MOVIES COLLECTION - BACK-END</h1>

<br>

<p style="text-align:justify">O Movies Collection é uma aplicação para quem precisa organizar seu histórico de filmes. Para utilizar o site é preciso se cadastar, o processo é bem rápido. Na aplicação é possível criar, editar e excluir um filme. Todos os filmes criados são automaticamente listados na dashboard e o usuário ainda pode filtrar os filmes de acordo com a categoria que ele mesmo criou quando cadastrou um filme. A Aplicação é Full Stack, com front-end desenvolvido em React e back-end em Node.</p><br>

<h1>🔗 LINKS</h1>

<a href="https://project-movie-collection-frontend.vercel.app/" target="_blank">SITE DA MOVIE COLLECTION</a>

<a href="https://github.com/elizeu-vasconcelos1992/project-movie-collection-frontend" target="_blank">REPOSITÓRIO DA MOVIE COLLECTION</a>

<a href="https://movies-collection-test.herokuapp.com/" target="_blank">DEPLOY DO BACK-END DA MOVIE COLLECTION</a>

<a href="https://github.com/elizeu-vasconcelos1992/project-movie-collection-backend" target="_blank">REPOSITÓRIO DO BACK-END DA MOVIE COLLECTION</a>

<br>

<h1>🔨 ROTAS</h1>

### ▪️ Criação de Usuário - Não necessita de autenticação

<br>

> POST /users - FORMATO DA REQUISIÇÃO

<br>

```JSON
{
    "name": "Maria",
    "email": "maria@gmail.com",
    "password": "123456",
}
```

<br>

Caso tudo dê certo, a resposta será assim:

<br>

> POST /users - FORMATO DA RESPOSTA - STATUS 201

<br>

```JSON
{
  "data":
  {
   "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
   "name": "Maria",
   "email": "maria@gmail.com",
   "createdAt": "2020-11-27T00:01:13.789Z",
  }
}
```

<br>

### ⚠️ Possíveis Erros

<br>

> POST /users - FORMATO DA RESPOSTA - STATUS 400

<br>

Caso o email já esteja sendo utilziado por outro usuário, a resposta de erro será assim:

<br>

```JSON
{
  "message": "This email is already registered"
}
```

<br>

### ▪️ Login - Não necessita de autenticação

<br>

> POST /login - FORMATO DA REQUISIÇÃO

<br>

```JSON
{
    "email": "maria@gmail.com",
    "password": "123456",
}
```

<br>

Caso tudo dê certo, a resposta será assim:

<br>

> POST /users - FORMATO DA RESPOSTA - STATUS 201

<br>

```JSON
{
  "data":
  {
   "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg0MzQ2MDcsImV4cCI6MTY2ODUyMTAwNywic3ViIjoiZTMzOGVlYTAtMDkxMi00ZDAwLWFiNTctOThkNmNiZjI3MzE1In0.6EOZXuCEzyG5uJNKoeBdAMsxDEILlilAokMCN6Fi3LQ"
  }
}
```

<br>

### ⚠️ Possíveis Erros

<br>

> POST /login - FORMATO DA RESPOSTA - STATUS 403

<br>

Caso a senha ou email esteja errada(o), a resposta de erro será assim:

<br>

```JSON
{
  "message": "Invalid user or password"
}
```

<br>

### ▪️ Criação de filme - Necessita de autenticação via token

<br>

> POST /users/movies/:userId - FORMATO DA REQUISIÇÃO

<br>

```JSON
{
    "name": "Harry Porter e a ordem da Fenix",
	"image": "https://upload.wikimedia.org/wikipedia/pt/9/98/Harry_Potter_Order_Phoenix_2007",
	"release": "2007-07-07",
	"sinopse": "Após um verão desastroso, Harry volta para o seu quinto ano em Hogwarts, um dos mais difíceis que terá de encarar. Pouquíssimos alunos e pais acreditam nele ou em Dumbledore sobre a volta de Voldemort, e uma série interminável de artigos circula dizendo que eles estão completamente malucos.",
	"category": "Aventura"
}
```

<br>

Caso tudo dê certo, a resposta será assim:

<br>

> POST /users/movies/:userId - FORMATO DA RESPOSTA - STATUS 201

<br>

```JSON
{
	"data": {
        "id": "abe42940-b912-4b54-b66b-0eb94e2efcf4",
		"name": "Harry Porter e a ordem da Fenix",
		"image": "https://upload.wikimedia.org/wikipedia/pt/9/98/Harry_Potter_Order_Phoenix_2007.jpeg",
		"release": "2007-07-07T00:00:00.000Z",
		"sinopse": "Após um verão desastroso, Harry volta para o seu quinto ano em Hogwarts, um dos mais difíceis que terá de encarar. Pouquíssimos alunos e pais acreditam nele ou em Dumbledore sobre a volta de Voldemort, e uma série interminável de artigos circula dizendo que eles estão completamente malucos.",
        "createdAt": "2022-11-14T18:56:17.824Z",
		"updatedAt": "2022-11-14T18:56:17.824Z",
		"category": {
			"id": "e542abbf-bcc4-40b2-bb71-e60d920a9b93",
			"name": "Aventura",
		}
	}
}
```

<br>

### ⚠️ Possíveis Erros

<br>

> POST /users/movies/:userId - FORMATO DA RESPOSTA - STATUS 400

<br>

Caso a url da image não contenha as extensões .jpeg, .png ou .jpg, a resposta de erro será assim:

<br>

```JSON
{
  "message": "Invalid url image"
}
```

<br>

> POST /users/movies/:userId- FORMATO DA RESPOSTA - STATUS 404

<br>

Caso o usuário não seja encontrado, a resposta de erro será assim:

<br>

```JSON
{
  "message": "User not found"
}
```

<br>

> POST /users/movies/:userId- FORMATO DA RESPOSTA - STATUS 400

<br>

Caso o usuário já tenha cadastrado o filme com nome e sinopse igual, a resposta de erro será assim:

<br>

```JSON
{
  "message": "This movie is already registered"
}
```

<br>

### ▪️ Listar filmes do usuário - Necessita de autenticação via token

<br>

> GET /users/movies/:userId - FORMATO DA REQUISIÇÃO

<br>

Não é necessário corpo da requisição

<br>

Caso tudo dê certo, a resposta será assim:

<br>

> GET /users/movies/:userId - FORMATO DA RESPOSTA - STATUS 200

<br>

```JSON
{
	"data": [
		[
			{
				"id": "abe42940-b912-4b54-b66b-0eb94e2efcf4",
				"name": "Harry Porter e a ordem da Fenix",
				"image": "https://upload.wikimedia.org/wikipedia/pt/9/98/Harry_Potter_Order_Phoenix_2007.jpeg",
				"release": "2007-07-07",
				"sinopse": "Após um verão desastroso, Harry volta para o seu quinto ano em Hogwarts, um dos mais difíceis que terá de encarar. Pouquíssimos alunos e pais acreditam nele ou em Dumbledore sobre a volta de Voldemort, e uma série interminável de artigos circula dizendo que eles estão completamente malucos.",
				"createdAt": "2022-11-14T18:56:17.824Z",
				"updatedAt": "2022-11-14T18:56:17.824Z",
				"category": {
					"id": "e542abbf-bcc4-40b2-bb71-e60d920a9b93",
					"name": "Aventura"
				}
			}
		]
	]
}
```

<br>

### ⚠️ Possíveis Erros

<br>

> GET /users/movies/:userId - FORMATO DA RESPOSTA - STATUS 404

<br>

Caso o usuário não seja enconrtado, a resposta de erro será assim:

<br>

```JSON
{
  "message": "User not found"
}
```

<br>

> GET /users/movies/:userId - FORMATO DA RESPOSTA - STATUS 404

<br>

Caso nenhum filme seja encontrado, a resposta de erro será assim:

<br>

```JSON
{
  "message": "Movie not found"
}
```

<br>

### ▪️ Listar filmes do usuário por categoria - Necessita de autenticação via token

<br>

> GET /users/movies/categories/:categoryId - FORMATO DA REQUISIÇÃO

<br>

Não é necessário corpo da requisição

<br>

Caso tudo dê certo, a resposta será assim:

<br>

> GET /users/movies/:userId - FORMATO DA RESPOSTA - STATUS 200

<br>

```JSON
{
	"data": [
		{
			"id": "e542abbf-bcc4-40b2-bb71-e60d920a9b93",
			"name": "Aventura",
			"categoryMovies": [
				{
					"id": "abe42940-b912-4b54-b66b-0eb94e2efcf4",
					"name": "Harry Porter e a ordem da Fenix",
					"image": "https://upload.wikimedia.org/wikipedia/pt/9/98/Harry_Potter_Order_Phoenix_2007.jpeg",
					"release": "2007-07-07",
					"sinopse": "Após um verão desastroso, Harry volta para o seu quinto ano em Hogwarts, um dos mais difíceis que terá de encarar. Pouquíssimos alunos e pais acreditam nele ou em Dumbledore sobre a volta de Voldemort, e uma série interminável de artigos circula dizendo que eles estão completamente malucos.",
					"createdAt": "2022-11-14T18:56:17.824Z",
					"updatedAt": "2022-11-14T18:56:17.824Z",
				}
			]
		}
	]
}
```

<br>

### ⚠️ Possíveis Erros

<br>

> GET /users/movies/:userId - FORMATO DA RESPOSTA - STATUS 404

<br>

Caso a categoria não contenha nenhum filme cadastrado, a resposta de erro será assim:

<br>

```JSON
{
  "message": "Movie not found on category"
}
```

<br>

### ▪️ Editar filme - Necessita de autenticação via token

<br>

> PACTH /users/movies/:movieId - FORMATO DA REQUISIÇÃO

<br>

Apenas os campos name, url image, release e sinopse podem ser editados.

<br>

```JSON
{
    "name": "Harry Porter e a ordem da Fenix 2",

}
```

<br>

Caso tudo dê certo, a resposta será assim:

<br>

> PACTH /users/movies/:movieId - FORMATO DA RESPOSTA - STATUS 200

<br>

```JSON
{
	"message": "Movie successfully updated"
}
```

<br>

### ⚠️ Possíveis Erros

<br>

> PACTH /users/movies/:movieId - FORMATO DA RESPOSTA - STATUS 400

<br>

Caso a url da image não contenha as extensões .jpeg, .png ou .jpg, a resposta de erro será assim:

<br>

```JSON
{
  "message": "Invalid url image"
}
```

<br>

> PACTH /users/movies/:movieId - FORMATO DA RESPOSTA - STATUS 404

<br>

Caso o filme não seja encontrado, a resposta de erro será assim:

<br>

```JSON
{
  "message": "Movie not found"
}
```

<br>

### ▪️ Deletar filme - Necessita de autenticação via token

<br>

> DELETE /users/movies/:movieId - FORMATO DA REQUISIÇÃO

<br>

Não é necessário corpo da requisição.

<br>

Caso tudo dê certo, a resposta será assim:

<br>

> DELETE /users/movies/:movieId - FORMATO DA RESPOSTA - STATUS 204

<br>

### ⚠️ Possíveis Erros

<br>

> DELETE /users/movies/:movieId - FORMATO DA RESPOSTA - STATUS 404

<br>

Caso o filme não seja encontrado, a resposta de erro será assim:

<br>

```JSON
{
  "message": "Movie not found"
}
```

<br>

### ⚠️ Erro comum a todas as rotas que precisam de autenticação

<br>

```JSON
{
  "message": "Invalid token"
}
```

<br>

<h1>🚀 TECNOLOGIAS</h1>

<br>

<ul>
<li>TYPESCRIPT</li>
<li>NODE</li>
<li>EXPRESS</li>
<li>TYPE-ORM</li>
<li>POSTGRESQL</li>
<li>BCRYPT</li>
<li>JSONWEBTOKEN</li>
<li>CORS</li>
<li>CLASS-TRANSFORMER</li>
<li>DEPLOY HEROKU</li>
</ul>

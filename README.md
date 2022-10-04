# delivery-api

## 🚀 Descrição
Essa api foi desenvolvida em Node.js e tem como objetivo controlar os pedidos de um delivery de comida.

## 📋 Pré-requisitos

- [Postman](https://www.postman.com/downloads/)

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/pt-br/starter/installing.html)


Instale as dependencias do projeto

```
npm install
```


## ⚙️ Consultando os endpoints

A aplicação consiste em quatro operações básicas na bases de dados, um [CRUD](https://developer.mozilla.org/pt-BR/docs/Glossary/CRUD)


Com o Postman instalado, você pode executar as requisições a seguir.
## Create
```
POST: localhost:3000/
```
O modelo em JSON a ser enviado no body da requisição é esse: 
```
{
  "client": "Victor Nathanael",
  "product": "Pizza",
  "value": 40,
  "delivered": true,
}
```
- Os valores client, product e value são obrigatórios.
- Se nenhum valor for passado para delivered, ele assumirá ___false___ por padrão.
## Read

```
GET: localhost:3000/orders
```

```
GET: localhost:3000/orders/id
```
---
retorna o valor total dos pedidos de um determinado ___cliente___ passado dentro dos params da seguinte forma:
```
{
client: 'Victor Nathanael'
}
```
```
GET: localhost:3000/client
```
---
retorna o valor total dos pedidos de um determinado ___produto___ passado dentro dos params da seguinte forma:
```
{
product: 'Pizza'
}
```
```
GET: localhost:3000/products
```
---
retorna um array com ___o nome dos pedidos e a quantidade de pedidos feitos e entregues___.
```
GET: localhost:3000/moreOrders
```
---
## Update

```
PUT: localhost:3000/id
```
O modelo em JSON a ser enviado no body da requisição é esse: 
```
{
  "client": "Victor Nathanael",
  "product": "Pizza",
  "value": 40,
}

```

---

```
PUT: localhost:3000/delivered/id
```

O modelo em JSON a ser enviado no body da requisição é esse: 
```
{
  "delivered": true,
}
```

## Delete
```
DELETE: localhost:3000/id

```
Feito por [Victor](https://www.linkedin.com/in/victornathanael/)

```graphql
query {
  article(id: "12345678") {
    id,content,title
  }
}
```

```graphql
query {
  articles {
    id,content,title
  }
}
```

```graphql
mutation {
  add(title:"hello", content:"world") {
    ... on Article {
      title,
      content,
      id
    }
  }
}
```

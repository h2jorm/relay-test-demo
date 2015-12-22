# Graphql-Demo

## Run
```bash
npm install -g pm2
git clone git@git.coding.net:leeching/graphql-demo.git
cd graphql-demo
# development
pm2 start app_dev.json
pm2 logs graphql-demo-dev
# production
pm2 start app.json
```

## Schema
See in [schema.json](schema/schema.graphql)

## Query and Mutation
```graphql
fragment archive on Archive {
  id
  articles {
    edges {
      node {id,title,content}
    }
  }  
}
```
```graphql
query {
  archive {
    ...archive
  }
}
```

```graphql
mutation ($input:AddArticleInput!){
  addArticle(input:$input) {
    clientMutationId
    newArticle{
      cursor,
      node {id,content,title}
    }
    archive {
      ...archive
    }
  }
}
```

```graphql
mutation ($input:UpdateArticleInput!){
  updateArticle(input:$input) {
    clientMutationId
    updatedArticle {
      id,content,title
    }
    archive {
      ...archive
    }
  }
}
```

```graphql
mutation ($input:RemoveArticleInput!) {
  removeArticle(input:$input) {
    clientMutationId
    removedArticleId
    archive {
      ...archive
    }
  }
}
```

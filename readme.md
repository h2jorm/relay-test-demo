# Graphql-Demo

## Run
```bash
git clone git@git.coding.net:leeching/graphql-demo.git
cd graphql-demo
npm install -g pm2
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
query {
  archive {
    id
    articles {
      edges {
        node {id,title,content}
      }
    }
  }
}
```

```graphql
mutation ($input:AddArticleInput!){
  addArticle(input:$input){
    clientMutationId
    newArticle{
      id,content,title
    }
    archive {
      id
      articles {
      	edges {
          node {id,title,content}
        }
      }
    }
  }
}
```

```graphql
mutation ($input:UpdateArticleInput!){
  updateArticle(input:$input){
    clientMutationId
    updatedArticle{
      id,content,title
    }
    archive {
      id
      articles {
      	edges {
          node {id,title,content}
        }
      }
    }
  }
}
```

```graphql
mutation ($input:RemoveArticleInput!){
  removeArticle(input:$input){
    clientMutationId
    removedArticle{
      id,content,title
    }
    archive {
      id
      articles {
      	edges {
          node {id,title,content}
        }
      }
    }
  }
}
```

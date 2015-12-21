const fs = require('fs');
const path = require('path');
const Schema = require('../schema/index');
const { graphql }  = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(Schema, introspectionQuery).then(result => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../schema/schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
});

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../schema/schema.graphql'),
  printSchema(Schema)
);

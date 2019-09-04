//for use of component for blog-post:
const path = require(`path`)

//gatsby source file system
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  //actions from gatsby to make a new filed to node via destructuring process
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    //creation of a slug/ obtaining node/edge via getNode
    const slug = createFilePath({ node, getNode })
    //creation of nodeField, upon creation of new node, append new property of slug
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  //pulling actions via method of create page
  const { createPage } = actions
  //return of function, graphql query giving back markdownremarks and iterate it via template literal:
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      //calling createPage to createPage via actions
      createPage({
        path: node.fields.slug,
        //passing the component for the template to populate out final blog post via templates folder
        component: path.resolve(`./src/templates/blog-post.js`),
        //for slug value:
        context: {
          slug: node.fields.slug,
        },
      })
    })
    //to obtain the edges array via iteration
  })
}

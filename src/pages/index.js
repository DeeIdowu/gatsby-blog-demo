import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

//styling for blog link and title clickability:
const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: purple;
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1> My Emergence As A Web Developer</h1>
      <h4>Number of Blog Posts: {data.allMarkdownRemark.totalCount}</h4>
    </div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <BlogLink to={node.fields.slug}>
          <BlogTitle>
            <b>
              {node.frontmatter.title} - {node.frontmatter.date}
            </b>
          </BlogTitle>
        </BlogLink>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

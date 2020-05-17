import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { SectionHeader } from "../components/ui"

const now = {
  '1': {name: 'Freelance', job: 'Front-end developer', description: 'Currently looking for offers on front-end development, UI design, UX engineering and digital product consultancy.'},
  '2': {name: 'Devtime', job: 'Front-end developer', description: 'A web and mobile focused development studio.'},
  '3': {name: 'B.Eng,', job: 'Enginyeria de Sistemes Audiovisuals', description: 'Class of 2020. Featured courses include machine learning, computer vision, DSP and NLP.'}
};

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Recent posts" />
        <Bio />
        <div className="home-grid">
          <div className="home-posts">
            <SectionHeader title="Posts"/>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
              <article className="home-article" key={node.fields.slug}>
                <div className="post-header">
                  <h3>
                    <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                </div>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
              </article>
              )
            })}
          </div>
          <div className="home-now">
            <SectionHeader title="Now"/>
            {Object.values(now).map((item) => {
              return(
              <article className="home-article">
                <div className="post-header">
                  <h3>
                    <span class="red">{item.name}</span>
                    {` `}{item.job}
                  </h3>
                </div>
                <section>
                  <p>{item.description}</p>
                </section>
              </article>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

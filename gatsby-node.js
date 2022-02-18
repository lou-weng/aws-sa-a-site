exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const layout = require.resolve("./src/templates/pageTemplate.js")

    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            slug
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

        return result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.slug,
                component: layout,
                context: {
                    slug: node.frontmatter.slug,
                }
            })
        })
    })
}
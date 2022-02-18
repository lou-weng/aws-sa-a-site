import { StaticQuery, graphql, Link } from 'gatsby';
import * as React from 'react';
import * as Styles from '../../styles/modules/nav.module.css'

const NavComponent = () => {
    return (
        <>
            <div className={Styles.navContainer}>
                <Link to="/"><h1>AWS Solutions Architect</h1></Link>

                <StaticQuery
                    query={graphql`
                        query MyQuery {
                            allMarkdownRemark {
                                edges {
                                    node {
                                        id
                                        frontmatter {
                                            slug
                                            title
                                        }
                                    }
                                }
                            }
                        }
                    `}
                    render={data => (
                        <div>
                            {data.allMarkdownRemark.edges.map((edge, i) => (
                                <Link className={Styles.navButton} key={i} to={`/${edge.node.frontmatter.slug}`}>{edge.node.frontmatter.title}</Link>
                            ))}
                        </div>
                    )}
                />

            </div>
        </>
    )
}

export default NavComponent

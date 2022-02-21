import * as React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import LayoutComponent from '../components/layout/LayoutComponent'

export default function PageTemplate({ data, props }) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark

    return (
        <>
            <LayoutComponent id="top">
                <img class="image" alt={frontmatter.slug} src={`https://d252snfiy3jjfc.cloudfront.net/${frontmatter.image}`}></img>
                <h1>{frontmatter.title}</h1> 
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
                <br></br>
                <a href="#top" class="topButton amazonButton">☝️ Back to top</a>
            </LayoutComponent>
        </>
    )
}

export const pageQuery = graphql`
    query PageQuery($slug: String!) {
        markdownRemark (frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                image
                title
                slug
            }
            html
        }
    }
`
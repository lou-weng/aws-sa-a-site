import * as React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import LayoutComponent from '../components/layout/LayoutComponent'

export default function PageTemplate({ data, props }) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark

    return (
        <>
            <LayoutComponent>
                <h1>{frontmatter.title}</h1>
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </LayoutComponent>
        </>
    )
}

export const pageQuery = graphql`
    query PageQuery($slug: String!) {
        markdownRemark (frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                title
            }
            html
        }
    }
`
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import Example from "../components/example";
import Note from "../components/note";
import Warning from "../components/warning";
import * as meta from "../../meta.json";

const shortcodes = { Example, Note, Warning };

export default (props) => {
    const { mdx } = props.data;
    const { title } = mdx.frontmatter;

    const slugifiedTitle = mdx.fields.slug.split("/")[1];

    const prevIndex = meta.chapters.indexOf(slugifiedTitle) - 1;
    const nextIndex = meta.chapters.indexOf(slugifiedTitle) + 1;

    const prev = prevIndex >= 0 ? meta.chapters[prevIndex] : undefined;
    const next =
        nextIndex < meta.chapters.length ? meta.chapters[nextIndex] : undefined;

    let prevItem = <></>;
    let nextItem = <></>;

    if (prev !== undefined) {
        prevItem = (
            <li>
                <a href={`/chapters/${prev}`}>Previous</a>
            </li>
        );
    }

    if (next !== undefined) {
        nextItem = (
            <li>
                <a href={`/chapters/${next}`}>Next</a>
            </li>
        );
    }

    return (
        <main>
            <h1>{title}</h1>

            <MDXProvider components={shortcodes}>
                <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>

            <nav>
                <ul>
                    {prevItem} {nextItem}
                </ul>
            </nav>
        </main>
    );
};

export const query = graphql`
    query($id: String!) {
        mdx(fields: { id: { eq: $id } }) {
            frontmatter {
                title
            }
            body
            id
            fields {
                slug
            }
        }
    }
`;
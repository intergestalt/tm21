import { gql } from '@apollo/client';

export default gql`
  query Text( $slug: [String] ) {
    Text: entry(section: "text", slug: $slug) {
      title
      id
      slug
      typeHandle
      ... on text_text_Entry {
        id
        body {
          ... on body_textBlock_BlockType {
            id
            textBlock
          }
          ... on body_imageBlock_BlockType {
            id
            imageBlock {
              url
            }
          }
          ... on body_videoBlock_BlockType {
            id
            vimeoUrl
          }
        }
        relatedEvents {
          title
          slug
        }
      relatedWidgets {
          ... on widget_staticWidget_Entry {
            id
            widgetText
            typeHandle
            slug
            backgroundImage {
              url
            }
          }
          ... on widget_mediaWidget_Entry {
            id
            title
            slug
            widgetText
            linkedMedia {
              ... on media_video_Entry {
                id
                slug
                title
              }
              ... on media_audio_Entry {
                id
                title
                slug
              }
            }
          }
        }
        relatedArtworks {
          title
          slug
          ... on artwork_artwork_Entry {
            id
            relatedPeople {
              ... on relatedPeople_group_BlockType {
                id
                members {
                  ... on people_people_Entry {
                    id
                  }
                  title
                  typeHandle
                }
              }
            }
          }
        }
        relatedText(textType: "news") {
          title
          dateCreated
        }
      }
      dateCreated
      dateUpdated
    }
  }
`
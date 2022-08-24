import { gql } from '@apollo/client'

export const GET_ME = gql`
    query user($username: String){
        user(username: $username){
            _id
            username
            email
            bookCount
            books {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
    `;

    export const QUERY_BOOKS = gql`
        query books($bookId: ID){
            books(username: $username){
                bookId
                authors
                title
                description
                image
                link
            }
        }
    `;

    export const QUERY_BOOK = gql`
        query book($bookId: ID) {
            book(bookId: $bookId){
                bookId
                [authors]
                title
                description
                image
                link
            }
        }
    `;
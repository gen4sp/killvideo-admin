import gql from 'graphql-tag'

const update = gql`mutation ($id:ID!, $input: ItemInput!) {
        updateItem(id:$id, input: $input) {
          id
        }
      }`
const create = gql`mutation ($input: ItemInput!) {
        createItem(input: $input) {
          id
        }
      }`

const all = gql`query ($query:ItemQuery, $offset: Int, $limit: Int, $sort: SortInput, $filter:[FilterInput]) {
      allItems (query: $query, sort: $sort, filter: $filter, offset: $offset, limit: $limit){
        items{
          id
          status
          owner{
            id
            username
          }
          name
          createdAt
          updatedAt
        }
        count
      }
    }`

export default {
  all,
  update,
  create
}

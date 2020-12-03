import gql from 'graphql-tag'

const update = gql`mutation ($userId:ID!, $input: UserInput!) {
        updateUser(userId:$userId, input: $input) {
          id
        }
      }`
const create = gql`mutation ($input: UserInput!) {
        createUser(input: $input) {
          id
        }
      }`

const all = gql`query ($query:UserQuery, $offset: Int, $limit: Int) {
      allUsers (query: $query, offset: $offset, limit: $limit){
        items{
          id
          username
          roles
          createdAt
        }
        count
      }
    }`

export default {
  all,
  update,
  create
}

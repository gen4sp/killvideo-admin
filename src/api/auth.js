import gql from 'graphql-tag'

const login = gql`query ($password: String!, $username: String!){
  login(password:$password, username: $username)
}`

const me = gql`query{
  me{
    username
    id
    roles
  }
}`

const signUp = gql`mutation ($input: UserInput){
  signup(input:$input)
}`


export default {
    login,
    me,
    signUp
}

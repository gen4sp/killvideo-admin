import _ from 'lodash'
import {HttpLink} from "apollo-link-http/lib/index";
import auth from './auth'
// import items from './items'
import store from '../store'
import users from './users'
import items from './items'
import {execute, makePromise} from "apollo-link/lib/index";
import { Message } from 'element-ui'


const uri = 'http://localhost:6789/graphql';
const link = new HttpLink({ uri });
const apis = {
  users,
  items,
  auth
}

function stringifyObjects(obj){
  console.log(obj)
  _.each(obj, (o, k) => {
    console.log('.', o, _.isArray(o) , _.isObject(o))
    if(_.isArray(o) || _.isObject(o)){
      obj[k] = JSON.stringify(o)
    }
  })
  return obj;
}

function standardQuery(query){
  return (variables) => {
    const operation = {
      query,
      variables: variables, //optional
      operationName: null, //optional
      // context: {}, //optional
      // extensions: {} //optional
    }

    if(store.state.user && store.state.user.token){
      operation.context = {
        headers: {
          Authorization: `Bearer ${store.state.user.token}`
        }
      }
    }
    return makePromise(execute(link, operation))
      .then(data => {
        if (data.errors){
          _.each(data.errors, (error) => {
            Message.error(error.message);
          })
          return Promise.reject(data.errors)
        }
        return  _.values(data.data)[0];
      })
      .catch(data => {
        console.log(`received error `,data)
        _.each(data.errors, (error) => {
          Message.error(error.message);
        })
        return Promise.reject(data.errors)
      })
  }
}

export default _.transform(apis, (total, api, apiname) => {
  total[apiname] = _.transform(api, (t, q, key) => {
    t[key] = standardQuery(q);
    return t;
  }, {});
  return total;
})

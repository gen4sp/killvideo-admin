export default function({ store, redirect }) {
  // If the user is not authenticated
  console.log('qq - ', store.state.user.token)
  if (!store.state.user.token) {
    return redirect('/auth')
  }
}

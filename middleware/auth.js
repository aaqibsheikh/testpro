export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if (!Object.keys(store.state.user.user).length) {
    if (route.name === 'dashboard-promotions-listing-id') {
      return redirect(`/account?tab=login&redirect=promotions&id=${route.params.id}`)
    }

    return redirect('/account')
  }

}

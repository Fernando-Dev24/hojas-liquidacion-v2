export const onSignOut = (reset: () => void) => {
  localStorage.removeItem('username')
  localStorage.removeItem('password')
  reset()
}

// Handle GitHub Pages SPA redirect
export default defineNuxtPlugin(() => {
  const redirect = sessionStorage.getItem('redirect')
  if (redirect && redirect !== '/') {
    sessionStorage.removeItem('redirect')
    const router = useRouter()
    router.push(redirect)
  }
})

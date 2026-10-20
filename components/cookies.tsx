import Cookies from "universal-cookie";

const cookies = new Cookies();

export function getCookie(key: string) {
  return cookies.get<string | undefined>(key)
}

export function subscribeToCookies(onChange: () => void) {
  cookies.addChangeListener(onChange)
  return () => cookies.removeChangeListener(onChange)
}

export function setCookie(key: string, val: string, options = {}) {
  cookies.set(key, val, {
      path: '/',
      ...options
    })
}

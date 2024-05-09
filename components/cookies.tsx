import Cookies from "universal-cookie";

const cookies = new Cookies();

export function getCookie(key: string) {
  return cookies.get(key)
}

export function setCookie(key: string, val: string, options = {}) {
  cookies.set(key, val, {
      path: '/',
      ...options
    })
}

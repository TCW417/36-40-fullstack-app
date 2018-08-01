
const createCookie = (name, value, days, makeSecure = false) => {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  } else {
    expires = '';
  }
  const secure = makeSecure ? '; Secure' : '';
  console.log('createCookie:', `${name}=${value}${expires}${secure}; path=/`);
  document.cookie = `${name}=${value}${expires}${secure}; path=/`;
};

const readCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const eraseCookie = (name) => {
  console.log('eraseCookie', name);
  createCookie(name, '', -1);
};

export { createCookie, readCookie, eraseCookie };

export function imageFormat(url, size) {
  return 'https://arcadium.cluster24.libnamic.eu' + url.replace('&size=small', `&size=${size}`)
}

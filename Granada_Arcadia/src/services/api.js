const BASE_URL = 'https://arcadium.cluster24.libnamic.eu/api/glam'

async function getCollections() {
  const respuesta = await fetch(BASE_URL + '/collection')
  const datos = await respuesta.json()
  return datos.items
}

async function getRecord() {
  const respuesta = await fetch(BASE_URL + '/record')
  const datos = await respuesta.json()
  return datos.items
}

export { getCollections, getRecord }

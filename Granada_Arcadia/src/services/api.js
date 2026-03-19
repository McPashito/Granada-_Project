const BASE_URL = '/api/glam'

async function getCollections() {
  const respuesta = await fetch(BASE_URL + '/collection')
  const datos = await respuesta.json()
  return datos.items
}

async function getRecords() {
  const respuesta = await fetch(BASE_URL + '/record')
  const datos = await respuesta.json()
  return datos.items
}

export { getCollections, getRecords }

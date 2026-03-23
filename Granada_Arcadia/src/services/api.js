const BASE_URL = '/api/glam'

async function getCollections() {
  const respuesta = await fetch(BASE_URL + '/collection')
  const datos = await respuesta.json()
  return datos.items
}

async function getRecords(offset) {
  const respuesta = await fetch(BASE_URL + `/record?limit=16&offset=${offset}`)
  const datos = await respuesta.json()
  return datos.items
}
async function getRecordsFromCollection(params) {
  const domain = JSON.stringify({
    op: 'and',
    children: [
      {
        op: 'and',
        children: [
          {
            type: 'condition',
            field: 'collections',
            operator: 'in',
            value: [Number(params.collectionId)],
          },
        ],
      },
    ],
  })
  const respuesta = await fetch(
    BASE_URL + `/record?limit=24&offset=0&domain=${encodeURIComponent(domain)}`,
  )
  const datos = await respuesta.json()
  return datos.items
}
async function getRecordById(id) {
  const respuesta = await fetch(BASE_URL + `/record/${id}`)
  const datos = await respuesta.json()
  return datos
}
async function getCollectionById(id) {
  const respuesta = await fetch(BASE_URL + `/collection/${id}`)
  const datos = await respuesta.json()
  return datos
}

export { getCollections, getRecords, getRecordById, getCollectionById, getRecordsFromCollection }

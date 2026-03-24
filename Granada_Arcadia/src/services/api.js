const BASE_URL = '/api/glam'

async function getCollections() {
  const respuesta = await fetch(
    BASE_URL + '/collection?with_labels=1&fields=id,thumbnail,title,description',
  )
  const datos = await respuesta.json()
  return datos.items
}

async function getRecords(offset) {
  const respuesta = await fetch(
    BASE_URL + `/record?limit=16&offset=${offset}&with_labels=1&fields=id,thumbnail,title`,
  )
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
async function searchRecords(search) {
  const domain = JSON.stringify({
    op: 'and',
    children: [
      {
        op: 'and',
        children: [
          {
            type: 'text',
            mode: 'fulltext',
            value: search,
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
async function searchCollections(search) {
  const domain = JSON.stringify({
    op: 'and',
    children: [
      {
        op: 'and',
        children: [
          {
            type: 'text',
            mode: 'fulltext',
            value: search,
          },
        ],
      },
    ],
  })
  const respuesta = await fetch(
    BASE_URL +
      `/collection?with_labels=1&fields=id,thumbnail,title,description&domain=${encodeURIComponent(domain)}`,
  )
  const datos = await respuesta.json()
  return datos.items
}
export async function searchAdvanced(scope, searchText, filters) {
  const children = []

  if (searchText) {
    children.push({
      op: 'or',
      children: [
        { type: 'condition', field: 'title', operator: 'ilike', value: `%${searchText}%` },
        { type: 'condition', field: 'author', operator: 'ilike', value: `%${searchText}%` },
      ],
    })
  }

  for (const filter of filters) {
    if (filter.field && filter.value) {
      children.push({
        op: 'and',
        children: [
          { type: 'condition', field: filter.field, operator: 'ilike', value: `%${filter.value}%` },
        ],
      })
    }
  }

  const domain = { op: 'and', children }
  const endpoint = scope === 'collections' ? '/collection' : '/record'
  const url = `${BASE_URL}${endpoint}?with_labels=1&fields=id,thumbnail,title&domain=${encodeURIComponent(JSON.stringify(domain))}`
  const res = await fetch(url)
  const data = await res.json()
  return data.items
}

export {
  getCollections,
  getRecords,
  getRecordById,
  getCollectionById,
  getRecordsFromCollection,
  searchCollections,
  searchRecords,
}

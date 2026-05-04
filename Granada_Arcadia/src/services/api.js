const BASE_URL = '/api/glam'

async function getItem(offset = 0, entity, limit = 16) {
  const respuesta = await fetch(
    BASE_URL +
      `/${entity}?limit=${limit}&offset=${offset}&with_labels=1&fields=id,thumbnail,title,author`,
  )
  const datos = await respuesta.json()
  return datos.items
}
async function getItemById(id, entity) {
  const respuesta = await fetch(
    BASE_URL +
      `/${entity}/${id}?with_labels=1&fields=thumbnail,canonical_joined_metadata,joined_metadata`,
  )
  const datos = await respuesta.json()
  return datos
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
    BASE_URL +
      `/record?limit=24&offset=0&with_labels=1&fields=id,thumbnail,title&domain=${encodeURIComponent(domain)}`,
  )
  const datos = await respuesta.json()
  return datos.items
}
async function searchQuick(search, offset = 0, entity, limit = 16) {
  const children =
    entity === 'record'
      ? [
          { type: 'condition', field: 'title', operator: 'ilike', value: `%${search}%` },
          { type: 'condition', field: 'author', operator: 'ilike', value: `%${search}%` },
        ]
      : [{ type: 'condition', field: 'title', operator: 'ilike', value: `%${search}%` }]

  const domain = JSON.stringify({
    op: 'or',
    children,
  })

  const respuesta = await fetch(
    `${BASE_URL}/${entity}?limit=${limit}&offset=${offset}&domain=${encodeURIComponent(domain)}`,
  )

  const datos = await respuesta.json()
  return datos.items
}

export async function searchAdvanced(scope, searchText, filters, selectedOperator) {
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

  const domain = { op: selectedOperator, children }
  const endpoint = scope === 'collections' ? '/collection' : '/record'
  const url = `${BASE_URL}${endpoint}?with_labels=1&fields=id,thumbnail,title&domain=${encodeURIComponent(JSON.stringify(domain))}`
  const res = await fetch(url)
  const data = await res.json()
  return data.items
}

export { getItem, getItemById, getRecordsFromCollection, searchQuick }

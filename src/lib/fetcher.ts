interface Options {
  path: string
  sort?: Record<string, 1 | -1>
  query?: Record<string, unknown>
  signal?: AbortSignal
}

const getBaseUrl = (key?: string): string => {
  switch (key) {
    case 'base':
    default:
      return process.env.REACT_APP_API_BASE ?? ''
  }
}

const fetcher = (opts: Options, key?: string) => {
  const { path, sort, query: q, signal } = opts
  const query = {
    ...q,
    site: 'default',
  }

  const hint = {
    $orderby: sort,
  }

  return fetch(
    `${getBaseUrl(key)}/${path}?q=${JSON.stringify(query)}&h=${JSON.stringify(
      hint
    )}&metafields=true`,
    {
      method: 'GET',
      headers: {
        'x-api-key': process.env.REACT_APP_API_BASE_KEY ?? '',
      },
      signal,
    }
  )
    .then((res) => res.json())
    .catch((err) => [])
}

export default fetcher

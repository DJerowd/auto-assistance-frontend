export function buildVehicleQuery(page, filters) {
  const params = new URLSearchParams()
  params.append('page', page)
  if (filters.limit) params.append('limit', filters.limit)
  if (filters.brand) params.append('brand', filters.brand)
  if (filters.color) params.append('color', filters.color)
  if (filters.search) params.append('search', filters.search)
  return `/vehicles?${params.toString()}`
}

export function buildMaintenacesQuery(page, filters) {
  const params = new URLSearchParams()
  params.append('page', page)
  if (filters.limit) params.append('limit', filters.limit)
  if (filters.vehicleId) params.append('vehicleId', filters.vehicleId)
  if (filters.search) params.append('search', filters.search)
  return `/maintenances?${params.toString()}`
}
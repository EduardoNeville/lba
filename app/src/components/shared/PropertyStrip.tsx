import { useEffect, useState } from 'react'
import { ResidencesStrip } from './ResidencesStrip'
import { cachedProperties, loadPublishedProperties, type Property } from '../../lib/properties'
import { featuredResidences } from '../../lib/propertyFilters'

// The four-up strip on the property page, loaded after paint from PropertyPage: it
// is below the fold, and it is what pulls the residences model, the filter logic and
// three languages of copy into the bundle — none of which the hero needs.
export function PropertyStrip({ limit = 4 }: { limit?: number }) {
  const [items, setItems] = useState<Property[]>(() => featuredResidences(cachedProperties(), limit))

  useEffect(() => {
    let cancelled = false
    loadPublishedProperties()
      .then((all) => {
        if (!cancelled) setItems(featuredResidences(all, limit))
      })
      .catch(() => {
        /* no data, no strip */
      })
    return () => {
      cancelled = true
    }
  }, [limit])

  return <ResidencesStrip properties={items} showLink allLink="/property/residences" />
}

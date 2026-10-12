import { Icon } from '../ui/icons'
import { useLang } from '../../lib/lang'
import type { Property } from '../../lib/properties'
import { formatArea } from '../../lib/propertyFilters'
import { useResidencesCopy } from '../../lib/residencesCopy'

// The headline figures of a residence. Cells are separated by the page's hairline
// colour showing through a one-pixel grid gap, so there are no double borders.
export function SpecRow({ property }: { property: Property }) {
  const copy = useResidencesCopy()
  const { lang } = useLang()

  const specs: { icon: string; label: string; value: string }[] = []
  if (property.beds) specs.push({ icon: 'bed', label: copy.detail.beds, value: String(property.beds) })
  if (property.baths) specs.push({ icon: 'bath', label: copy.detail.baths, value: String(property.baths) })
  const build = formatArea(property.buildArea, lang)
  if (build) specs.push({ icon: 'area', label: copy.detail.buildArea, value: build })
  const plot = formatArea(property.plotArea, lang)
  if (plot) specs.push({ icon: 'area', label: copy.detail.plotArea, value: plot })
  const terrace = formatArea(property.terraceArea, lang)
  if (terrace) specs.push({ icon: 'area', label: copy.detail.terraceArea, value: terrace })
  if (property.yearBuilt) specs.push({ icon: 'building', label: copy.detail.yearBuilt, value: String(property.yearBuilt) })
  if (property.energyRating) specs.push({ icon: 'shield', label: copy.detail.energyRating, value: property.energyRating })

  if (specs.length === 0) return null

  return (
    <dl className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-3 lg:grid-cols-4">
      {specs.map((spec) => (
        <div key={spec.label} className="bg-cream p-4">
          <dt className="micro flex items-center gap-2 text-[10px] text-taupe">
            <Icon name={spec.icon} className="h-4 w-4 !text-taupe" />
            {spec.label}
          </dt>
          <dd className="font-display mt-2 text-lg leading-none text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}

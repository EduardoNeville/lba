// Classes shared by the admin panels (journal, residences). Deliberately tiny: the
// two panels are the only consumers, and the site's own primitives live in
// components/ui.
export const controlCls =
  'w-full border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-taupe/60 focus:border-oxblood focus:outline-none transition-colors'

export const labelCls = 'micro mb-2 block text-ink'

export const hintCls = 'mt-1 text-[11px] text-taupe'

export const rowCls = 'flex items-center justify-between gap-4 py-4'

export const btnCls = 'micro border border-hairline px-3 py-2 hover:bg-parchment'

export const ghostBtnCls = 'micro border border-hairline px-4 py-2 hover:bg-parchment'

export const primaryBtnCls =
  'micro bg-oxblood px-6 py-3 text-cream transition-colors hover:bg-ink disabled:opacity-50'

export const panelCls = 'border border-hairline bg-white p-6'

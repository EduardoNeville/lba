export function MosaicGrid({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
      {images.map((img) => (
        <div key={img.src} className="aspect-[4/3] overflow-hidden">
          <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

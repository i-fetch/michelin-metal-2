
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutSection() {

  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className=" wrap px-0">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="tag mb-4">About The Company</p>
            <h2 className="mb-5 leading-none tracking tracking-wider" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: 'var(--tx-primary)' }}>
              NIGERIA&apos;S FOREMOST INTEGRATED METAL RECYCLER
            </h2>
            <p className="mb-4 leading-relaxed text-[15px]" style={{ color: 'var(--tx-secondary)' }}>
              Mechelin Metals Nigeria LTD leverages captive resources and advanced capabilities to source, sort and bale aluminium waste, distributing it as raw material to manufacturers. We handle all types of ferrous and non-ferrous metals for sale, scrapping, conversion and foundry purposes.
            </p>
            <p className="mb-8 leading-relaxed text-[15px]" style={{ color: 'var(--tx-muted)' }}>
              Formally incorporated in 2023, our team has been active in the industry for over a decade — building infrastructure and global distribution networks that benefit both industry and environment.
            </p>
            <Link href="/about" className="btn btn-green">Read Full Story <ArrowRight size={15} /></Link>
          </div>

          <div>
            <div className="relative">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                  alt="Scrap metal processing"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* floating stat card */}
              <div className="absolute -bottom-5 -left-5 rounded-xl p-5 shadow-xl"
                style={{ background: 'var(--clr-green)', minWidth: 150 }}>
                <p className="text-white text-3xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>10+</p>
                <p className="text-green-100 text-xs mt-1 uppercase tracking-widest">Years of Industry Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
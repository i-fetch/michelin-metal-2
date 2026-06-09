import { ArrowRight, Package } from 'lucide-react'
import Link from 'next/link'

const CallToAction = () => {
  return (
        <section className="section" style={{ background: 'var(--bg-2)' }}>
            <div className="wrap px-3 text-center max-w-xl mx-auto">
               <Package size={40} style={{ color: 'var(--clr-green)', margin: '0 auto 1.5rem' }} />
               <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,2.8rem)', color: 'var(--tx-primary)' }}>
                  READY TO PARTNER WITH US?
               </h2>
               <p className="mb-8 text-[15px]" style={{ color: 'var(--tx-muted)' }}>
                  Whether you need reliable raw material supply or have scrap metal to move — our team is ready.
               </p>
               <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact" className="btn btn-green">Contact Us <ArrowRight size={15} /></Link>
                  <Link href="/services" className="btn btn-outline">Our Services <ArrowRight size={15} /></Link>
               </div>
            </div>
         </section>
  )
}

export default CallToAction
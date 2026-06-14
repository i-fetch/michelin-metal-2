
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className=" wrap px-0">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="tag mb-4">{t("tag")}</p>
            <h2 className="mb-5 leading-none tracking tracking-wider" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: 'var(--tx-primary)' }}>
              {t("title")}
            </h2>
            <p className="mb-4 leading-relaxed text-[15px]" style={{ color: 'var(--tx-secondary)' }}>
              {t("description1")}
            </p>
            <p className="mb-8 leading-relaxed text-[15px]" style={{ color: 'var(--tx-muted)' }}>
              {t("description2")}
            </p>
            <Link href="/about" className="btn btn-green">{t("button")}<ArrowRight size={15} /></Link>
          </div>

          <div>
            <div className="relative">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                  alt={t("imageAlt")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* floating stat card */}
              <div className="absolute -bottom-5 -left-5 rounded-xl p-5 shadow-xl"
                style={{ background: 'var(--clr-green)', minWidth: 150 }}>
                <p className="text-white text-3xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>{t("experienceValue")}</p>
                <p className="text-green-100 text-xs mt-1 uppercase tracking-widest">{t("experienceLabel")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
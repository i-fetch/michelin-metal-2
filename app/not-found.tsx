"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Recycle, TriangleAlert, Package, Globe, Headphones } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b]">

      {/* Background image */}
      <div className="absolute inset-0 nf-bg-zoom">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
          alt="Industrial metal recycling"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(9,9,11,0.95) 35%, rgba(9,9,11,0.70) 65%, rgba(9,9,11,0.97) 100%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl nf-orb-green" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl nf-orb-yellow" />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="wrap py-5 px-5 w-full">
          <div className="max-w-3xl">
<<<<<<< HEAD
            {/* TAG */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 mb-8"
=======

            {/* Tag */}
            <div
              className="nf-fade-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
              }}
>>>>>>> 7ef21dc694fba76255b9941494ec1bbebc6c853b
            >
              <Recycle size={14} className="text-green-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                Metal Recycling Industry · West Africa
              </span>
            </div>

            {/* 404 + floating icon */}
            <div className="relative mb-4 nf-fade-2">
              <h1
                className="leading-none font-black text-transparent bg-clip-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(7rem, 22vw, 16rem)",
                  letterSpacing: "-0.08em",
                  backgroundImage:
                    "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.85), rgba(255,255,255,0.08))",
                }}
              >
                404
              </h1>

              <div className="absolute top-5 right-0 md:right-10 nf-float">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{
                    border: "1px solid rgba(22,163,74,0.20)",
                    background: "rgba(22,163,74,0.10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <TriangleAlert size={28} className="text-green-400" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2
              className="text-white mb-5 leading-none nf-fade-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                letterSpacing: "0.03em",
              }}
            >
              PAGE NOT FOUND
            </h2>

            {/* Body */}
            <p
              className="text-white/65 text-lg leading-relaxed max-w-xl mb-10 nf-fade-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
              Continue exploring Mechelin Metals Nigeria&apos;s industrial recycling solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16 nf-fade-5">
              <Link href="/products" className="btn btn-green">
                Explore Products <ArrowRight size={15} />
              </Link>
              <Link
                href="/"
                className="btn"
                style={{
                  border: "1px solid rgba(255,255,255,0.20)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                Back Home <Home size={15} />
              </Link>
            </div>

<<<<<<< HEAD
            {/* CARDS */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hidden  sm:grid-cols-3 gap-5"
            >
=======
            {/* Cards */}
            <div className="grid sm:grid-cols-3 gap-5 nf-fade-6">
>>>>>>> 7ef21dc694fba76255b9941494ec1bbebc6c853b
              {[
                { icon: Package,    title: "Industrial Recycling", body: "Premium ferrous and non-ferrous metal recovery." },
                { icon: Globe,      title: "Global Distribution",  body: "Supplying manufacturers across Africa and globally." },
                { icon: Headphones, title: "Need Assistance?",     body: "Reach our support team for quick help and guidance." },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 nf-card"
                  style={{
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(22,163,74,0.10)" }}
                  >
                    <Icon size={18} className="text-green-400" />
                  </div>
                  <h3 className="text-white mb-2 text-lg" style={{ fontFamily: "var(--font-display)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">{body}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes nf-zoom {
          0%, 100% { transform: scale(1.05); }
          50%       { transform: scale(1.15); }
        }
        .nf-bg-zoom { animation: nf-zoom 14s ease-in-out infinite; }

        @keyframes nf-orb-g {
          0%, 100% { opacity: 0.25; transform: scale(1);    }
          50%       { opacity: 0.45; transform: scale(1.18); }
        }
        @keyframes nf-orb-y {
          0%, 100% { opacity: 0.12; transform: scale(1.08); }
          50%       { opacity: 0.28; transform: scale(1);    }
        }
        .nf-orb-green  { background: rgba(22,163,74,0.20);  animation: nf-orb-g 6s ease-in-out infinite; }
        .nf-orb-yellow { background: rgba(234,179,8,0.10);  animation: nf-orb-y 7s ease-in-out infinite; }

        @keyframes nf-float {
          0%, 100% { transform: translateY(0);     }
          50%       { transform: translateY(-14px); }
        }
        .nf-float { animation: nf-float 4s ease-in-out infinite; }

        @keyframes nf-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .nf-fade-1 { animation: nf-up 0.7s cubic-bezier(.25,1,.5,1) 0.10s both; }
        .nf-fade-2 { animation: nf-up 0.7s cubic-bezier(.25,1,.5,1) 0.25s both; }
        .nf-fade-3 { animation: nf-up 0.7s cubic-bezier(.25,1,.5,1) 0.40s both; }
        .nf-fade-4 { animation: nf-up 0.7s cubic-bezier(.25,1,.5,1) 0.55s both; }
        .nf-fade-5 { animation: nf-up 0.7s cubic-bezier(.25,1,.5,1) 0.70s both; }
        .nf-fade-6 { animation: nf-up 0.7s cubic-bezier(.25,1,.5,1) 0.85s both; }

        .nf-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .nf-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 48px rgba(0,0,0,0.45);
        }
      `}</style>
    </main>
  );
}
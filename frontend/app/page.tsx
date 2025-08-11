import { NavAvant } from "@/components/nav-avant"
import { HeroConstellation } from "@/components/hero-constellation"
import { MatchCabinet } from "@/components/match-cabinet"
import { DuoSynth } from "@/components/duo-synth"
import { FundingOrbit } from "@/components/funding-orbit"
import { FooterAvant } from "@/components/footer-avant"

export default function Page() {
  return (

    

    // Move To Next Page 



    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <div>
        <a href="/investor">lmao</a>
      </div>

      

      {/* Nothing */}


      
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-30 opacity-40"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 20%, rgba(234,191,95,0.06), transparent 65%), radial-gradient(900px 600px at 90% 15%, rgba(248,113,113,0.06), transparent 60%), radial-gradient(600px 600px at 50% 100%, rgba(52,211,153,0.07), transparent 60%)",
        }}
      />

      <div
        aria-hidden="true"
        className="fixed inset-0 -z-40"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.02) 0deg 15deg, rgba(0,0,0,0.02) 15deg 30deg)",
          mixBlendMode: "overlay",
        }}
      />



      {/* Menu */}



      <NavAvant />



      {/*Main Header
      Contains Animation
      Provide your mail */}



      <HeroConstellation />



      {/*Middle Body*/}



      <section className="mx-auto max-w-6xl px-6 sm:px-8 py-10 sm:py-16">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            MutinyTask connects people with aligned conviction. Community funding with milestone-based releases. Job
            seekers find frontier startups. Founders find the complementary team. Your ideas are protected by mutual NDA
            flows and on-chain idea hashes to prove provenance.
          </p>
        </div>
      </section>



      {/* Filters */}



      <section className="mx-auto max-w-6xl px-6 sm:px-8 py-10 sm:py-16">
        <MatchCabinet />
      </section>



      {/*AI*/}



      <section className="mx-auto max-w-6xl px-6 sm:px-8 py-10 sm:py-16">
        <DuoSynth />
      </section>



      {/* Community Funding */}



      <section className="mx-auto max-w-6xl px-6 sm:px-8 py-10 sm:py-16">
        <FundingOrbit />
      </section>



      {/* Footer */}



      <FooterAvant />
    </main>
  )
}

//       <div>
//        <a href="/investor">uff</a>
//      </div>

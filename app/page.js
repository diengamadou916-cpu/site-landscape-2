'use client'
import { useEffect, useState, useRef } from 'react'

const PHOTOS = {
  hero:       'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1400&q=80',
  pillars:    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&q=80',
  commercial: 'https://images.unsplash.com/photo-1599685315640-4a9ba2613f46?w=1200&q=80',
  process:    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1000&q=80',
  areas:      'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1100&q=80',
  g1:         'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=1200&q=80',
  g2:         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  g3:         'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=900&q=80',
  g4:         'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80',
  g5:         'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  g6:         'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
}

const FAQS = [
  {
    q: 'Do you offer free estimates?',
    a: 'Yes. Every project starts with a free on-site consultation. We walk your property, talk through your goals and budget, and follow up with a detailed, line-item quote — with no obligation to move forward.',
  },
  {
    q: 'Are you licensed and insured?',
    a: "Absolutely. We're a fully licensed Florida landscape contractor carrying general liability and workers' comp coverage. We're glad to provide a certificate of insurance for any residential or commercial project.",
  },
  {
    q: 'How long does a typical project take?',
    a: "It depends on scope. A planting refresh might take a few days; a full design-build with hardscaping and outdoor living can run a few weeks. We give you a clear timeline with your quote and keep you updated daily on site.",
  },
  {
    q: 'Do you handle ongoing maintenance?',
    a: 'We do. Many clients add a year-round maintenance plan — mowing, trimming, fertilization, irrigation checks, and seasonal cleanups — so the landscape we build keeps looking its best long after install day.',
  },
  {
    q: "What's your guarantee?",
    a: "Every installation is backed by a written workmanship warranty, and we offer a plant establishment guarantee on material we install and maintain. If something isn't right, we make it right.",
  },
]

// Reusable arrow SVG
function Arr() {
  return (
    <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function PhoneIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const faqRefs = useRef([])

  // Sticky nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const errs = {}
    if (!fd.get('name')?.trim()) errs.name = true
    if (!fd.get('phone')?.trim()) errs.phone = true
    if (!fd.get('email')?.trim()) errs.email = true
    if (Object.keys(errs).length) { setErrors(errs); return }
    setFormSubmitted(true)
  }

  function toggleFaq(i) {
    setOpenFaq((prev) => (prev === i ? -1 : i))
  }

  // Derive FAQ panel heights
  function faqHeight(i) {
    if (openFaq !== i) return '0px'
    const el = faqRefs.current[i]
    return el ? el.scrollHeight + 'px' : '1000px'
  }

  return (
    <>
      {/* ===== TOP UTILITY BAR ===== */}
      <div className="util">
        <div className="container">
          <div className="row">
            <div className="left">
              <a href="tel:+18135550142">
                <PhoneIcon size={14} /> (813) 555-0142
              </a>
              <a href="mailto:hello@cypressandstone.com" className="hide-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>{' '}
                hello@cypressandstone.com
              </a>
              <span className="hide-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span className="pulse"></span> Now booking spring &amp; summer installs
              </span>
            </div>
            <div className="right">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>{' '}
                Licensed &amp; insured · FL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NAV ===== */}
      <div className={`nav-wrap${scrolled ? ' scrolled' : ''}`} id="navWrap">
        <div className="container">
          <nav className="nav">
            <a href="#top" className="brand">
              <span className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C9 6 7 9 7 13a5 5 0 0 0 10 0c0-4-2-7-5-11z" />
                  <path d="M12 22V12" />
                </svg>
              </span>
              <span className="brand-name">
                Cypress <em>&amp;</em> Stone<small>Landscape Co.</small>
              </span>
            </a>
            <div className="nav-links">
              <a href="#services">Services</a>
              <a href="#work">Our Work</a>
              <a href="#process">Process</a>
              <a href="#areas">Service Areas</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="nav-right">
              <a href="tel:+18135550142" className="nav-phone">
                <PhoneIcon size={15} /> (813) 555-0142
              </a>
              <a href="#contact" className="nav-cta">Get a free quote</a>
            </div>
            <button className="hamburger" aria-label="Menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      <a id="top"></a>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow reveal"><span className="sq"></span> Tampa Bay · Design &amp; build landscaping</span>
              <h1 className="hero-title reveal reveal-delay-1">
                Outdoor spaces,<br />
                designed to be<br />
                <span className="stroke">lived in.</span>
              </h1>
              <p className="hero-lede reveal reveal-delay-2">
                From full landscape design to hardscaping, planting, and year-round care — we build the kind of yards Tampa Bay homeowners never want to leave. Thoughtful design, real craftsmanship, and a crew that treats your property like our own.
              </p>
              <div className="hero-ctas reveal reveal-delay-3">
                <a href="#contact" className="btn btn-primary">Get your free quote <Arr /></a>
                <a href="tel:+18135550142" className="btn btn-ghost">
                  <PhoneIcon size={16} /> Call (813) 555-0142
                </a>
              </div>
              <div className="hero-meta reveal reveal-delay-3">
                <div className="avatars">
                  <div className="av a1"></div>
                  <div className="av a2"></div>
                  <div className="av a3"></div>
                  <div className="av a4">+450</div>
                </div>
                <div className="meta-text">
                  <span className="stars">★★★★★</span> <strong>4.9 / 5</strong> · 450+ Tampa Bay properties transformed
                </div>
              </div>
            </div>

            <div className="hero-media reveal reveal-delay-2">
              <div className="hero-photo" style={{ backgroundImage: `url('${PHOTOS.hero}')` }}></div>
              <span className="hero-tag"><span className="live"></span> Free on-site design consultation</span>
              <div className="award">
                <div className="wreath">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="award-text"><strong>Best of Tampa Bay 2025</strong>Residential landscape design</div>
              </div>
              <div className="booking-card">
                <div className="icn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="txt">
                  <strong>Free on-site consultation</strong>
                  We walk your property, no obligation.
                </div>
                <a href="#contact" className="go" aria-label="Book a consultation">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {['Landscape design', 'Hardscaping', 'Outdoor living', 'Planting', 'Irrigation & lighting', 'Grounds care',
            'Landscape design', 'Hardscaping', 'Outdoor living', 'Planting', 'Irrigation & lighting', 'Grounds care'].map((item, i) => (
            <span key={i} className="marquee-item">
              {i % 2 === 1 ? <em className="italic">{item}</em> : item} <span className="d"></span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== WHY US ===== */}
      <section className="pillars">
        <div className="container">
          <div className="pillars-grid">
            <div className="pillars-img reveal" style={{ backgroundImage: `url('${PHOTOS.pillars}')` }}>
              <div className="pillars-img-tag"><strong>18 years</strong>shaping Tampa Bay landscapes</div>
            </div>
            <div>
              <span className="section-eyebrow reveal"><span className="ln"></span> Why homeowners choose us</span>
              <h2 className="section-title reveal reveal-delay-1">Craftsmanship you can<br />stand on, <span className="stroke">season after season.</span></h2>
              <p className="section-lede reveal reveal-delay-2">We're not a mow-and-go crew. We're designers, masons, and horticulturists who build outdoor spaces meant to mature beautifully in Florida's climate — and we stand behind every one.</p>

              <div className="why-points reveal reveal-delay-3">
                <div className="why-point">
                  <div className="wp-ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div>
                    <h4>Licensed, insured &amp; guaranteed</h4>
                    <p>Fully licensed Florida contractor. Every install backed by our written workmanship warranty.</p>
                  </div>
                </div>
                <div className="why-point">
                  <div className="wp-ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4>Florida-native plant expertise</h4>
                    <p>We design with the heat, sand, and storms in mind, so your landscape thrives instead of just surviving.</p>
                  </div>
                </div>
                <div className="why-point">
                  <div className="wp-ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 11l-4 4-2-2" /><circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <div>
                    <h4>One crew, start to finish</h4>
                    <p>The same dedicated team designs, builds, and maintains your project. No subcontractor roulette.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat reveal"><div className="n">450<em>+</em></div><div className="l">properties designed &amp; built since 2008</div></div>
            <div className="stat reveal reveal-delay-1"><div className="n">4.9<em>/5</em></div><div className="l">average rating across 300+ reviews</div></div>
            <div className="stat reveal reveal-delay-2"><div className="n">18<em>yrs</em></div><div className="l">serving Tampa Bay homeowners &amp; businesses</div></div>
            <div className="stat reveal reveal-delay-3"><div className="n">100<em>%</em></div><div className="l">workmanship-guaranteed installations</div></div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services" id="services">
        <div className="container">
          <div className="services-head">
            <div className="left">
              <span className="section-eyebrow reveal"><span className="ln"></span> What we do</span>
              <h2 className="section-title reveal reveal-delay-1">Everything your property<br />needs to <span className="stroke">look its best.</span></h2>
            </div>
            <a href="#contact" className="btn btn-ghost reveal reveal-delay-2">Get a free quote <Arr /></a>
          </div>

          <div className="services-grid">
            {[
              { num: '01', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" /><path d="M9 21v-6h6v6" /></svg>, title: 'Landscape design', desc: 'Full-property master plans and 3D renderings, so you see exactly how your space will look before we break ground.', meta: 'Design & plan', delay: '' },
              { num: '02', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="7" height="7" rx="1" /><rect x="14" y="4" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="6" rx="1" /><rect x="14" y="14" width="7" height="6" rx="1" /></svg>, title: 'Hardscaping', desc: 'Paver patios, walkways, retaining walls, and driveways built to last decades in Florida sun and rain.', meta: 'Patios & walls', delay: ' reveal-delay-1' },
              { num: '03', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v6" /><path d="M12 9c-3 0-5 2-5 5a5 5 0 0 0 10 0c0-3-2-5-5-5z" /><path d="M8 21h8" /></svg>, title: 'Outdoor living', desc: 'Outdoor kitchens, fire features, pergolas, and pool surrounds that turn your backyard into a destination.', meta: 'Kitchens & firepits', delay: ' reveal-delay-2' },
              { num: '04', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20c0-5 2.5-9 5-13 2.5 4 5 8 5 13" /><path d="M12 7C9 9 7 13 7 20" /><path d="M12 7c3 2 5 6 5 13" /></svg>, title: 'Planting & softscape', desc: 'Trees, palms, garden beds, and sod — selected for your soil and light, installed to establish fast and look full.', meta: 'Plants & sod', delay: '' },
              { num: '05', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s5 5 5 9a5 5 0 0 1-10 0c0-4 5-9 5-9z" /><path d="M19 14v6M16 17h6" /></svg>, title: 'Irrigation & lighting', desc: 'Smart irrigation that saves water and low-voltage landscape lighting that makes your home glow after dark.', meta: 'Sprinklers & lights', delay: ' reveal-delay-1' },
              { num: '06', icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>, title: 'Lawn & garden care', desc: 'Year-round maintenance programs — mowing, trimming, fertilization, and seasonal cleanups — to protect your investment.', meta: 'Ongoing maintenance', delay: ' reveal-delay-2' },
            ].map((s) => (
              <article key={s.num} className={`svc-card reveal${s.delay}`}>
                <span className="svc-num">/ {s.num}</span>
                <div>
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                </div>
                <div className="svc-foot">
                  <span className="svc-meta">{s.meta}</span>
                  <span className="svc-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMERCIAL BAND ===== */}
      <section className="commercial">
        <div className="container">
          <div className="commercial-inner reveal">
            <div className="commercial-copy">
              <span className="section-eyebrow"><span className="ln"></span> For property managers &amp; businesses</span>
              <h3>Commercial grounds care that protects your <em>curb appeal.</em></h3>
              <p>HOAs, office parks, retail centers, and multi-family communities across Tampa Bay trust us to keep their grounds pristine — with one point of contact and dependable, scheduled service.</p>
              <ul className="commercial-list">
                {['Scheduled maintenance contracts', 'Storm cleanup & response', 'Seasonal color & mulch programs', 'Fully insured, COI on file'].map((item) => (
                  <li key={item}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-primary">Request a commercial bid <Arr /></a>
            </div>
            <div className="commercial-photo" style={{ backgroundImage: `url('${PHOTOS.commercial}')` }}></div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="gallery" id="work">
        <div className="container">
          <div className="gallery-head">
            <div className="left">
              <span className="section-eyebrow reveal"><span className="ln"></span> Selected work</span>
              <h2 className="section-title reveal reveal-delay-1">Recent projects across<br /><span className="stroke">Tampa Bay.</span></h2>
            </div>
            <p className="section-lede reveal reveal-delay-2" style={{ marginBottom: 6 }}>Every photo is our own work — no stock, no AI. A small sample of the residential and commercial spaces we've designed and built.</p>
          </div>

          <div className="gallery-grid">
            {[
              { cls: 'g-a', key: 'g1', k: 'South Tampa · Residential', t: 'Poolside outdoor living & kitchen', delay: '' },
              { cls: 'g-b', key: 'g2', k: 'Hyde Park', t: 'Paver patio & fire feature', delay: ' reveal-delay-1' },
              { cls: 'g-c', key: 'g3', k: 'Davis Islands', t: 'Native garden & softscape', delay: ' reveal-delay-2' },
              { cls: 'g-d', key: 'g4', k: 'Westchase', t: 'Front walkway & lighting', delay: '' },
              { cls: 'g-e', key: 'g5', k: 'Carrollwood', t: 'Full landscape renovation', delay: ' reveal-delay-1' },
              { cls: 'g-f', key: 'g6', k: 'Clearwater · Commercial', t: 'Office park grounds', delay: ' reveal-delay-2' },
            ].map((g) => (
              <div key={g.key} className={`gphoto ${g.cls} reveal${g.delay}`}>
                <div className="gimg" style={{ backgroundImage: `url('${PHOTOS[g.key]}')` }}></div>
                <div className="cap">
                  <div className="k">{g.k}</div>
                  <div className="t">{g.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="process" id="process">
        <div className="container">
          <div className="process-grid">
            <div>
              <span className="section-eyebrow reveal"><span className="ln"></span> How we work</span>
              <h2 className="section-title reveal reveal-delay-1">Four steps,<br />zero <span className="stroke">guesswork.</span></h2>
              <p className="section-lede reveal reveal-delay-2">A clear process, a fixed quote, and one project lead from your first call to the final walkthrough — so you always know what's happening and what comes next.</p>

              <div className="steps">
                {[
                  { n: '01', ttl: 'Free consultation', desc: "We walk your property, listen to how you want to use the space, and talk budget — honestly.", delay: '' },
                  { n: '02', ttl: 'Design & fixed quote', desc: 'You get a detailed plan, plant & material selections, and a line-item quote with no surprises.', delay: ' reveal-delay-1' },
                  { n: '03', ttl: 'Build & install', desc: "Our own crew builds it — clean job site, daily updates, and respect for your home throughout.", delay: ' reveal-delay-2' },
                  { n: '04', ttl: 'Care & guarantee', desc: 'A final walkthrough, your workmanship warranty, and an optional maintenance plan to keep it perfect.', delay: ' reveal-delay-3' },
                ].map((s) => (
                  <div key={s.n} className={`step reveal${s.delay}`}>
                    <span className="num">{s.n}</span>
                    <div>
                      <div className="ttl">{s.ttl}</div>
                      <div className="desc">{s.desc}</div>
                    </div>
                    <span className="chev">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="9 18 15 12 9 6" /></svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="process-img reveal reveal-delay-1" style={{ backgroundImage: `url('${PHOTOS.process}')` }}>
              <div className="process-img-card">
                <div className="t">
                  <strong>Booking spring &amp; summer 2026</strong>
                  Free consultations available this month
                </div>
                <a href="#contact" className="btn-mini">Book now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonial">
        <div className="container">
          <div className="t-head">
            <div>
              <span className="section-eyebrow reveal"><span className="ln"></span> What clients say</span>
              <h2 className="section-title reveal reveal-delay-1" style={{ color: 'var(--cream)', maxWidth: 680, marginBottom: 0 }}>
                Loved by homeowners<br />across <span className="stroke">the Bay.</span>
              </h2>
            </div>
            <div className="meta-text reveal reveal-delay-2" style={{ color: '#cfc7bf' }}>
              <span className="stars" style={{ color: 'var(--accent-soft)' }}>★★★★★</span>{' '}
              <strong style={{ color: '#fff' }}>4.9 / 5</strong> · 300+ verified reviews
            </div>
          </div>

          <div className="t-grid">
            {[
              { av: 't1', name: 'Diane & Robert Hale', loc: 'South Tampa', q: "They redesigned our entire backyard — pavers, lighting, an outdoor kitchen — and it came in on the quote, on schedule. We use the space every single evening now.", delay: '' },
              { av: 't2', name: 'Marcus Reyes', loc: 'Westchase', q: "After three other companies ghosted us, Cypress & Stone showed up, listened, and delivered a plan that actually fit our budget. The crew was respectful and spotless.", delay: ' reveal-delay-1' },
              { av: 't3', name: 'Karen Whitfield', loc: 'Property Manager · Clearwater', q: "We manage four properties and they handle all of them. Reliable, insured, and the grounds have never looked better. They make us look good to our residents.", delay: ' reveal-delay-2' },
            ].map((t) => (
              <div key={t.name} className={`t-card reveal${t.delay}`}>
                <div className="q">"</div>
                <div className="t-quote">{t.q}</div>
                <div className="t-foot">
                  <div className={`t-av ${t.av}`}></div>
                  <div><div className="t-name">{t.name}</div><div className="t-meta">{t.loc}</div></div>
                  <div className="t-stars">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREAS ===== */}
      <section className="areas" id="areas">
        <div className="container">
          <div className="areas-grid">
            <div>
              <span className="section-eyebrow reveal"><span className="ln"></span> Where we work</span>
              <h2 className="section-title reveal reveal-delay-1">Proudly serving<br />all of <span className="stroke">Tampa Bay.</span></h2>
              <p className="section-lede reveal reveal-delay-2">Based in Tampa, we design, build, and maintain landscapes across Hillsborough and Pinellas counties. Not sure if you're in our area? Just ask.</p>
              <div className="areas-list reveal reveal-delay-3">
                {['South Tampa', 'Hyde Park', 'Davis Islands', 'Westchase', 'Carrollwood', 'St. Petersburg', 'Clearwater', 'Brandon'].map((area) => (
                  <span key={area} className="area-chip">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {area}
                  </span>
                ))}
              </div>
              <p className="areas-note reveal reveal-delay-3">Also serving Riverview, Lutz, Wesley Chapel, Safety Harbor &amp; surrounding communities.</p>
            </div>
            <div className="areas-map reveal reveal-delay-1" style={{ backgroundImage: `url('${PHOTOS.areas}')` }}>
              <div className="pin"><span className="dot"></span><span className="lbl">Tampa Bay</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="faq-grid">
            <div>
              <span className="section-eyebrow reveal"><span className="ln"></span> Good to know</span>
              <h2 className="section-title reveal reveal-delay-1">Questions,<br /><span className="stroke">answered.</span></h2>
              <p className="section-lede reveal reveal-delay-2">
                Don't see yours here? Call us at{' '}
                <a href="tel:+18135550142" style={{ fontWeight: 600 }}>(813) 555-0142</a> — we're happy to talk it through.
              </p>
            </div>
            <div className="faq-list reveal reveal-delay-1">
              {FAQS.map((faq, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="faq-q" onClick={() => toggleFaq(i)}>
                    {faq.q}
                    <span className="ic">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: faqHeight(i) }}>
                    <div className="inner" ref={(el) => { faqRefs.current[i] = el }}>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-aside">
              <span className="section-eyebrow reveal"><span className="ln"></span> Get started</span>
              <h2 className="section-title reveal reveal-delay-1">Let's design your<br /><span className="stroke">dream yard.</span></h2>
              <p className="section-lede reveal reveal-delay-2">Tell us a little about your property and what you have in mind. We'll reach out within one business day to schedule your free, no-obligation consultation.</p>
              <div className="contact-cards reveal reveal-delay-3">
                <a href="tel:+18135550142" className="cc">
                  <div className="cc-ic"><PhoneIcon size={22} /></div>
                  <div><div className="cc-k">Call or text</div><div className="cc-v">(813) 555-0142</div></div>
                </a>
                <a href="mailto:hello@cypressandstone.com" className="cc">
                  <div className="cc-ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div><div className="cc-k">Email</div><div className="cc-v small">hello@cypressandstone.com</div></div>
                </a>
                <div className="cc">
                  <div className="cc-ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                    </svg>
                  </div>
                  <div><div className="cc-k">Hours</div><div className="cc-v small">Mon–Sat · 7am – 6pm</div></div>
                </div>
              </div>
            </div>

            <div className="contact-form reveal reveal-delay-1">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-title">Request your free quote</div>
                  <div className="form-sub">No obligation. We reply within one business day.</div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="name">Full name</label>
                      <input type="text" id="name" name="name" placeholder="Jane Doe" required
                        style={errors.name ? { borderColor: 'var(--color-error)' } : {}}
                        onChange={() => setErrors((e) => ({ ...e, name: false }))} />
                    </div>
                    <div className="field">
                      <label htmlFor="phone">Phone</label>
                      <input type="tel" id="phone" name="phone" placeholder="(813) 555-0142" required
                        style={errors.phone ? { borderColor: 'var(--color-error)' } : {}}
                        onChange={() => setErrors((e) => ({ ...e, phone: false }))} />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="jane@email.com" required
                      style={errors.email ? { borderColor: 'var(--color-error)' } : {}}
                      onChange={() => setErrors((e) => ({ ...e, email: false }))} />
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="service">Service needed</label>
                      <select id="service" name="service">
                        <option value="">Select a service…</option>
                        <option>Landscape design</option>
                        <option>Hardscaping</option>
                        <option>Outdoor living</option>
                        <option>Planting &amp; softscape</option>
                        <option>Irrigation &amp; lighting</option>
                        <option>Lawn &amp; garden care</option>
                        <option>Commercial grounds</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="zip">Property ZIP</label>
                      <input type="text" id="zip" name="zip" placeholder="33606" />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="message">Tell us about your project</label>
                    <textarea id="message" name="message" placeholder="A few sentences about your property and what you're hoping to do…"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary form-submit">
                    Get my free quote <Arr />
                  </button>
                  <div className="form-fine">By submitting, you agree to be contacted about your project. We never share your information.</div>
                </form>
              ) : (
                <div className="form-success show">
                  <div className="ic">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Thank you!</h3>
                  <p>Your request is in. We'll reach out within one business day to schedule your free consultation. Need us sooner? Call <strong>(813) 555-0142</strong>.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="container">
          <div className="f-grid">
            <div>
              <div className="f-brand">
                <span className="brand-mark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M12 2C9 6 7 9 7 13a5 5 0 0 0 10 0c0-4-2-7-5-11z" /><path d="M12 22V12" />
                  </svg>
                </span>
                Cypress <em>&amp;</em> Stone
              </div>
              <p className="f-about">Premium landscape design, hardscaping, and grounds care for Tampa Bay's finest homes and properties. Licensed, insured, and built on craftsmanship since 2008.</p>
              <div className="f-badges">
                <span className="f-badge">Licensed &amp; Insured</span>
                <span className="f-badge">Best of Tampa Bay 2025</span>
                <span className="f-badge">★ 4.9 / 5</span>
              </div>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                {['Landscape design', 'Hardscaping', 'Outdoor living', 'Planting & softscape', 'Irrigation & lighting', 'Lawn & garden care'].map((s) => (
                  <li key={s}><a href="#services">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#work">Our work</a></li>
                <li><a href="#process">Process</a></li>
                <li><a href="#areas">Service areas</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Get a quote</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Tampa, Florida</li>
                <li><a href="tel:+18135550142">(813) 555-0142</a></li>
                <li><a href="mailto:hello@cypressandstone.com">hello@cypressandstone.com</a></li>
                <li>Mon–Sat · 7am – 6pm</li>
              </ul>
            </div>
          </div>
          <div className="f-bot">
            <span>© 2026 Cypress &amp; Stone Landscape Co. · Tampa, FL</span>
            <span style={{ display: 'flex', gap: 18 }}><a href="#">Privacy</a><a href="#">Terms</a></span>
          </div>
        </div>
      </footer>
    </>
  )
}

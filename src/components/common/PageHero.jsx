import { BookOpen } from 'lucide-react'

export default function PageHero({ badge = 'Lộ trình học tập 1 kèm 1', title, description }) {
  return (
    <section className="page-hero">
      <div className="hero-badge-pill">
        <BookOpen size={14} />
        <span>{badge}</span>
      </div>
      <h1 className="hero-heading">{title}</h1>
      <p className="hero-description">{description}</p>
    </section>
  )
}

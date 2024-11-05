import './section-title.css'

export default function SectionTitle({ title }) {
    return (
      <div className="section-title-div text-center mb-3 mt-2">
        <p className="section-text">{title}</p>
      </div>
    )
  }
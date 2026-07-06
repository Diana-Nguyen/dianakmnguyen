import { site } from '../data/site'
import './sections.css'

export function Contact() {
  const { links } = site

  return (
    <footer id="contact" className="section--deep grid-bg grid-bg--forest grid-bg--dark">
      <div className="contact__bar">
        <ul className="contact__links">
          <li>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          {'resume' in links && links.resume ? (
            <li>
              <a href={links.resume}>Resume</a>
            </li>
          ) : null}
        </ul>
        <p className="mono-label contact__copyright">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}

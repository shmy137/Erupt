import { useState } from 'react'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { pageMeta, site } from '../data/site'
import { services } from '../data/services'

const initialForm = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = `Project enquiry from ${form.name || 'the ERUPT website'}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || '—'}`,
      `Service: ${form.service || 'Not sure yet'}`,
      '',
      form.message,
    ].join('\n')
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setStatus('Your email app should open with the brief ready to send.')
  }

  return (
    <>
      <PageMeta {...pageMeta.contact} />

      <PageHero
        eyebrow="Contact"
        title="Got an interesting project?"
        lead="Send the brief, the problem or the half-formed idea. We will reply with the next step."
      >
        <div className="hero__actions">
          <Button to={site.whatsapp} variant="primary" icon="whatsapp">
            WhatsApp
          </Button>
          <Button href={`mailto:${site.email}`} variant="ghost" icon="mail">
            Email us
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <p className="eyebrow">Direct lines</p>
              <h2 className="h2">Talk to a person, not a form.</h2>

              <ul className="contact-list">
                <li>
                  <span className="contact-list__icon">
                    <Icon name="mail" size={20} />
                  </span>
                  <div>
                    <span className="contact-list__label">Email</span>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </li>
                <li>
                  <span className="contact-list__icon">
                    <Icon name="phone" size={20} />
                  </span>
                  <div>
                    <span className="contact-list__label">Phone</span>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </div>
                </li>
                <li>
                  <span className="contact-list__icon">
                    <Icon name="whatsapp" size={20} />
                  </span>
                  <div>
                    <span className="contact-list__label">WhatsApp</span>
                    <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                      Message the team
                    </a>
                  </div>
                </li>
                <li>
                  <span className="contact-list__icon">
                    <Icon name="pin" size={20} />
                  </span>
                  <div>
                    <span className="contact-list__label">Studio</span>
                    <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                    </a>
                    <span className="contact-list__sub">{site.address.landmark}</span>
                  </div>
                </li>
              </ul>

              <div className="contact-info__actions">
                <Button href={site.whatsapp} variant="primary" icon="whatsapp">
                  WhatsApp us
                </Button>
                <Button href={site.mapUrl} variant="ghost" icon="pin">
                  Open in Maps
                </Button>
              </div>

              <div className="contact-next">
                <p className="eyebrow">What happens next</p>
                <ol>
                  <li>We read the brief and look at the brand.</li>
                  <li>We reply with questions or a first plan.</li>
                  <li>We meet in person or online and set the scope.</li>
                </ol>
              </div>
            </div>

            <div className="contact-form-wrap">
              <p className="eyebrow">Project brief</p>
              <h2 className="h2">Start here.</h2>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={update}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={update}
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="company">Company / brand</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={update}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="service">What do you need?</label>
                    <select id="service" name="service" value={form.service} onChange={update}>
                      <option value="">Not sure yet</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message">Tell us about the project</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={form.message}
                    onChange={update}
                    placeholder="What are you building, who is it for and what needs to change?"
                  />
                </div>

                <div className="contact-form__foot">
                  <Button type="submit" variant="primary" icon="arrow">
                    Send the brief
                  </Button>
                  <p className="contact-form__note">
                    This opens your email app. Prefer WhatsApp?{' '}
                    <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                      Message us directly
                    </a>
                    .
                  </p>
                </div>

                {status ? (
                  <p className="contact-form__status" role="status">
                    {status}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

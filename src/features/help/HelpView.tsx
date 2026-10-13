import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiHelpCircle,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiSend,
} from 'react-icons/fi'

type FaqItem = {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I access Procurement, Executive Intelligence, or Incident & Service?',
    answer:
      'All three systems are accessible directly from the "My Workspace" dashboard using your unified Greenhill single sign-on account. If a system is locked or displays "Pending activation", contact ICT Support to assign you the required role.',
  },
  {
    question: 'How do I change or reset my account password?',
    answer:
      'Your Greenhill account is powered by Google Workspace. You can change your password by heading to your Google Account security settings (https://myaccount.google.com/security) or contacting the ICT help desk if you are locked out.',
  },
  {
    question: 'Can I access the Greenhill workspace on my mobile phone or tablet?',
    answer:
      'Yes! The Greenhill digital workspace is fully responsive and optimized for mobile devices, tablets, and desktops. Simply open your browser on your phone and log in with your work email.',
  },
  {
    question: 'What should I do if I get a connection or login error?',
    answer:
      'Ensure you are using your official @greenhillschools.ug or @greenhillacademy.ac.ug work email. If the problem persists, try clearing your browser cache, refreshing the page, or submitting a ticket below.',
  },
  {
    question: 'How are profile and settings updates synchronized?',
    answer:
      'Updates made in the Profile and Settings sections are automatically synchronized across all three Greenhill platforms (Procurement, Executive Intelligence, and Incident & Service Management).',
  },
]

export function HelpView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [category, setCategory] = useState('Login & Authentication')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function toggleFaq(index: number) {
    setOpenFaq(openFaq === index ? null : index)
  }

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate sending message to ICT support desk
    setTimeout(() => {
      setIsSubmitting(false)
      setSubject('')
      setMessage('')
      showToast('Support ticket submitted successfully! The ICT team will respond via your work email.')
    }, 600)
  }

  return (
    <div className="mx-auto w-full max-w-[980px] pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-8 z-50 flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-xs font-semibold text-emerald-800 shadow-lg animate-in fade-in slide-in-from-top-3">
          <span className="grid size-5 place-items-center rounded-full bg-emerald-600 text-white text-[11px]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-[34px] leading-tight font-bold tracking-[-.5px] text-navy">Help & Support</h1>
        <p className="mt-1 text-sm text-muted">
          Get assistance, browse guidance, or reach out to the Greenhill ICT Support Team.
        </p>
      </header>

      {/* Info Banner */}
      <div className="mb-7 flex items-center gap-3.5 rounded-xl border border-[#e8e2f4] bg-[#fbf9fe]/90 px-5 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#692fa5]">
          ONE ACCOUNT · THREE SYSTEMS
        </span>
        <span className="text-xs text-slate-500 font-medium">
          Procurement / Executive Intelligence / Incident & Service
        </span>
      </div>

      {/* Quick Contact Cards */}
      <div className="mb-8 grid grid-cols-3 gap-5 max-md:grid-cols-1">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div>
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-[#e8eef8] text-[#193a6f]">
              <FiMail className="size-5" />
            </div>
            <h2 className="text-base font-bold text-navy">Email Support</h2>
            <p className="mt-1 text-xs text-muted">Send inquiries directly to the ICT helpdesk.</p>
          </div>
          <a
            href="mailto:ictsupport@greenhillacademy.ac.ug"
            className="mt-4 block font-semibold text-xs text-[#204a8e] hover:underline"
          >
          </a>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div>
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-[#f1eaf8] text-[#6d2ea2]">
              <FiClock className="size-5" />
            </div>
            <h2 className="text-base font-bold text-navy">Operating Hours</h2>
            <p className="mt-1 text-xs text-muted">Support staff on-site availability.</p>
          </div>
          <p className="mt-4 text-xs font-semibold text-slate-700">
            Mon – Fri: 8:00 AM – 5:00 PM EAT
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Form + FAQs */}
      <div className="grid grid-cols-[1fr_1.1fr] gap-8 max-lg:grid-cols-1">
        {/* Contact Form */}
        <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-[#eef3fb] text-navy">
              <FiMessageSquare className="size-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Contact ICT Support</h2>
              <p className="text-xs text-muted">Submit an assistance request to our technical team.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="category" className="mb-1.5 block text-xs font-bold text-navy">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-navy outline-none transition focus:border-navy focus:ring-1 focus:ring-navy"
              >
                <option value="Login & Authentication">Login & Authentication</option>
                <option value="System Permissions">System Permissions & Roles</option>
                <option value="Procurement System">Procurement Management</option>
                <option value="Executive Dashboard">Executive Intelligence Dashboard</option>
                <option value="Incident & Service">Incident & Service Management</option>
                <option value="General Inquiry">General Technical Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-xs font-bold text-navy">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Brief summary of your inquiry"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-navy outline-none transition focus:border-navy focus:ring-1 focus:ring-navy"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-bold text-navy">
                Message details
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Please describe the issue or question in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-navy outline-none transition focus:border-navy focus:ring-1 focus:ring-navy resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#152d56] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1f3f77] active:scale-[0.98] transition-all disabled:opacity-70"
              >
                <FiSend className="size-3.5" />
                {isSubmitting ? 'Submitting request...' : 'Submit Support Request'}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Responses are delivered to your authenticated Greenhill work email address.
            </p>
          </form>
        </div>

        {/* FAQs Accordion */}
        <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-[#fcf5e5] text-[#b6820b]">
              <FiHelpCircle className="size-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Frequently Asked Questions</h2>
              <p className="text-xs text-muted">Common answers regarding accounts and systems.</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={index} className="py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-3 text-left transition-colors hover:text-[#1e3f76]"
                  >
                    <span className="text-xs font-bold text-navy">{faq.question}</span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? <FiChevronUp className="size-4" /> : <FiChevronDown className="size-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 pr-4 text-xs leading-relaxed text-slate-600 animate-in fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {/* System Status notice */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 text-xs text-emerald-800">
            <FiCheckCircle className="size-4 shrink-0 text-emerald-600" />
            <div>
              <span className="font-bold">All Greenhill Systems Operational:</span>{' '}
              <span>Procurement, Executive Intelligence, and Incident & Service are running normally.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

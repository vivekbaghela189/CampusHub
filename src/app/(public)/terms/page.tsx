import LegalPage from "@/components/legal/LegalPage"

const sections = [
  {
    title: "Platform use",
    points: [
      "CampusHub helps students explore, register for, and track campus events. By using the platform, you agree to use it only for lawful academic and campus-community purposes.",
      "You are responsible for keeping your account details accurate and for ensuring that the information you submit during registration or event applications is correct and up to date.",
    ],
  },
  {
    title: "Accounts and eligibility",
    points: [
      "Accounts are intended for students, organizers, and approved administrators connected to the campus community. We may suspend or remove access if an account is used in a misleading, abusive, or unauthorized manner.",
      "You are responsible for maintaining the confidentiality of your password and for activity that happens under your account until you log out or report misuse.",
    ],
  },
  {
    title: "Event registration rules",
    points: [
      "Submitting an application or registration does not guarantee approval. Event organizers may apply eligibility requirements, deadlines, seat limits, or document checks before confirming participation.",
      "Paid event fees, deadlines, venue details, and event-specific rules shown on the platform should be reviewed carefully before you register.",
    ],
  },
  {
    title: "Acceptable conduct",
    points: [
      "You must not attempt to disrupt the platform, access another user's account, upload false information, interfere with event operations, or use the service to harass or mislead others.",
      "We reserve the right to remove content, reject applications, or restrict access when activity threatens platform safety, fairness, or campus policy compliance.",
    ],
  },
  {
    title: "Changes and limitations",
    points: [
      "Event details may change, including dates, venues, fees, and participation limits. CampusHub and event organizers may update listings when required.",
      "We may revise these Terms and Conditions from time to time. Continued use of the platform after updates means you accept the revised terms.",
    ],
  },
] as const

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These Terms & Conditions explain the basic rules for using CampusHub to discover events, submit registrations, and manage your participation across campus activities."
      effectiveDate="March 26, 2026"
      sections={[...sections]}
    />
  )
}

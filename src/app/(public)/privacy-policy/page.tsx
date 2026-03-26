import LegalPage from "@/components/legal/LegalPage"

const sections = [
  {
    title: "Information we collect",
    points: [
      "CampusHub may collect information you provide directly, including your name, email address, branch, year, login credentials, and event registration details.",
      "We may also store account activity such as applications submitted, approval status, and basic usage data required to keep the platform secure and functional.",
    ],
  },
  {
    title: "How we use your information",
    points: [
      "Your information is used to authenticate your account, display relevant event content, process registrations, support organizers and administrators, and improve the reliability of the platform.",
      "We may use your contact details to send important updates related to your account, event applications, approvals, rejections, deadlines, or operational notices.",
    ],
  },
  {
    title: "Sharing and access",
    points: [
      "Your information may be visible to authorized event organizers or administrators only when needed to review participation requests, manage events, or support campus operations.",
      "We do not share personal data for unrelated commercial purposes through this platform. Access is limited to service functionality, campus coordination, and safety or policy requirements.",
    ],
  },
  {
    title: "Data security and retention",
    points: [
      "We take reasonable steps to protect your information through authentication, access control, and secure platform management practices. No system can guarantee absolute security, but we work to reduce risk.",
      "We retain data for as long as it is needed to operate the service, maintain records of event participation, resolve disputes, or comply with institutional or legal obligations.",
    ],
  },
  {
    title: "Your choices",
    points: [
      "You may request correction of inaccurate account information and should log out from shared devices after using the platform.",
      "By continuing to use CampusHub, you acknowledge this Privacy Policy and understand that updates may be posted when platform practices change.",
    ],
  },
] as const

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This Privacy Policy describes what information CampusHub collects, how it is used, and how it supports event participation and account management across the platform."
      effectiveDate="March 26, 2026"
      sections={[...sections]}
    />
  )
}

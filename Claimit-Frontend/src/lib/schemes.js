import {
  LayoutGrid,
  GraduationCap,
  Wheat,
  UserRound,
  HeartHandshake,
  ShieldPlus,
  Home as HomeIcon,
  Briefcase,
  ClipboardCheck,
  Accessibility,
  Users,
  BookOpen,
} from "lucide-react";

/**
 * Single source of truth for scheme data. Discover and Scheme Details both
 * read from here so the two pages never drift out of sync. This will be
 * swapped for a real /api/schemes call once the Node/Express backend
 * exists — every field here already matches what that response should
 * look like.
 */

const CATEGORIES = [
  { label: "All Schemes", icon: LayoutGrid },
  { label: "Education", icon: GraduationCap },
  { label: "Farmers", icon: Wheat },
  { label: "Women", icon: UserRound },
  { label: "Senior Citizens", icon: HeartHandshake },
  { label: "Healthcare", icon: ShieldPlus },
  { label: "Housing", icon: HomeIcon },
  { label: "Business", icon: Briefcase },
  { label: "Employment", icon: ClipboardCheck },
  { label: "Disability", icon: Accessibility },
  { label: "Minorities", icon: Users },
  { label: "Students", icon: BookOpen },
];

const SCHEMES = [
  {
    slug: "pm-kisan-samman-nidhi",
    icon: Wheat,
    title: "PM Kisan Samman Nidhi",
    category: "Farmers",
    description:
      "Direct income support of ₹6,000 per year for small and marginal farmer families across India.",
    overview:
      "PM Kisan Samman Nidhi gives eligible farmer families a fixed income top-up, paid directly into their bank account in three equal instalments through the year. It's designed to help cover routine input costs — seeds, fertiliser, labour — without any loan or repayment involved.",
    benefit: "₹6,000/yr",
    matchPercent: 98,
    processingTime: "7–10 days",
    documentsCount: 3,
    department: "Ministry of Agriculture & Farmers Welfare",
    lastUpdated: "Jun 2026",
    eligibility: [
      "Small or marginal farmer family with cultivable landholding",
      "Land records registered in the applicant's name",
      "Not a serving or retired government employee",
      "Did not pay income tax in the last assessment year",
    ],
    requiredDocuments: ["Aadhaar card", "Land ownership records", "Bank account passbook"],
    applySteps: [
      "Register on the PM-KISAN portal with your Aadhaar and land details.",
      "Get your land records verified by the local revenue officer.",
      "Receive instalments directly in your linked bank account.",
    ],
    faqs: [
      {
        question: "Can I apply if my land is jointly owned by my family?",
        answer:
          "Yes — jointly held land still qualifies, but the benefit is generally credited to one registered applicant per landholding, not per family member.",
      },
      {
        question: "What happens if my bank account details change?",
        answer:
          "Update your bank details on the PM-KISAN portal as soon as possible; instalments are only credited to the account currently on file.",
      },
    ],
  },
  {
    slug: "ayushman-bharat-pm-jay",
    icon: ShieldPlus,
    title: "Ayushman Bharat (PM-JAY)",
    category: "Healthcare",
    description:
      "Free health cover up to ₹5 lakh per family per year for secondary and tertiary care hospitalisation.",
    overview:
      "Ayushman Bharat is a cashless hospitalisation scheme that covers most secondary and tertiary procedures at empanelled public and private hospitals. Coverage resets every year and applies per family rather than per individual, so multiple members can draw on the same ₹5 lakh cover.",
    benefit: "₹5,00,000",
    matchPercent: 95,
    processingTime: "3–5 days",
    documentsCount: 4,
    department: "National Health Authority",
    lastUpdated: "May 2026",
    eligibility: [
      "Family listed in the SECC deprivation and occupational criteria",
      "No existing health insurance from a formal-sector employer",
      "Indian resident with a valid Aadhaar-linked family ID",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Ration card or family ID",
      "Income certificate",
      "PM-JAY e-card (if previously issued)",
    ],
    applySteps: [
      "Check eligibility on the PM-JAY portal using your family ID or ration card.",
      "Visit the nearest Ayushman Mitra help desk or empanelled hospital to verify documents.",
      "Get your e-card issued and use it for cashless treatment at any empanelled hospital.",
    ],
    faqs: [
      {
        question: "Does this cover pre-existing conditions?",
        answer:
          "Most pre-existing conditions are covered from day one, unlike typical private insurance waiting periods — check the specific procedure's coverage on the portal.",
      },
      {
        question: "Can I use this outside my home state?",
        answer:
          "Yes, PM-JAY is portable nationwide — you can get cashless treatment at any empanelled hospital in any state.",
      },
    ],
  },
  {
    slug: "national-scholarship-portal",
    icon: GraduationCap,
    title: "National Scholarship Portal",
    category: "Education",
    description: "Merit and means-based scholarships for school and college students from eligible income groups.",
    overview:
      "The National Scholarship Portal centralises dozens of central and state scholarship schemes into one application. Depending on your academic level and family income, you may qualify for pre-matric, post-matric, or merit-cum-means scholarships that cover tuition, fees and a maintenance allowance.",
    benefit: "₹82,000/yr",
    matchPercent: 89,
    processingTime: "15–20 days",
    documentsCount: 5,
    department: "Ministry of Education",
    lastUpdated: "Apr 2026",
    eligibility: [
      "Enrolled in a recognised school, college or university",
      "Family income below the scheme's specified threshold",
      "Minimum qualifying marks in the previous academic year",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Previous year mark sheet",
      "Income certificate",
      "Bank account passbook",
      "Bonafide student certificate",
    ],
    applySteps: [
      "Register on the National Scholarship Portal with your academic and bank details.",
      "Upload supporting documents and submit through your institution for verification.",
      "Track disbursal status online once your institute and state nodal office approve it.",
    ],
    faqs: [
      {
        question: "Can I apply for more than one scholarship at once?",
        answer:
          "You can only hold one scholarship per academic year through the portal, so pick the one that matches your profile best.",
      },
      {
        question: "What if my institution hasn't registered on the portal yet?",
        answer:
          "Ask your institution's nodal officer to complete registration first — student applications can't be verified without it.",
      },
    ],
  },
  {
    slug: "sukanya-samriddhi-yojana",
    icon: UserRound,
    title: "Sukanya Samriddhi Yojana",
    category: "Women",
    description:
      "A long-term savings scheme for a girl child's education and marriage, with guaranteed government interest.",
    overview:
      "Sukanya Samriddhi Yojana lets parents or guardians open a savings account for a girl child under 10, with a government-fixed interest rate that's typically higher than regular savings accounts. The account matures when she turns 21, and partial withdrawal is allowed for higher education from age 18.",
    benefit: "₹1,000+/mo",
    matchPercent: 91,
    processingTime: "2–3 days",
    documentsCount: 3,
    department: "Ministry of Finance",
    lastUpdated: "Jun 2026",
    eligibility: [
      "Girl child under 10 years of age at account opening",
      "Only one account per girl child, up to two per family",
      "Account opened by a parent or legal guardian",
    ],
    requiredDocuments: [
      "Girl child's birth certificate",
      "Guardian's identity proof",
      "Address proof",
    ],
    applySteps: [
      "Visit any authorised bank or post office branch with the required documents.",
      "Open the account with a minimum deposit and set up a recurring contribution plan.",
      "Continue deposits for 15 years; the account matures 21 years after opening.",
    ],
    faqs: [
      {
        question: "What's the minimum yearly deposit?",
        answer:
          "You need to deposit at least a small minimum amount each financial year to keep the account active — it can be paid in a lump sum or instalments.",
      },
      {
        question: "Can the account be transferred if we relocate?",
        answer:
          "Yes, the account can be transferred between any authorised bank or post office branch anywhere in India free of cost.",
      },
    ],
  },
  {
    slug: "atal-pension-yojana",
    icon: HeartHandshake,
    title: "Atal Pension Yojana",
    category: "Senior Citizens",
    description: "Guaranteed monthly pension for unorganised sector workers after the age of 60.",
    overview:
      "Atal Pension Yojana is a contribution-based pension scheme aimed at workers without formal employer-backed retirement savings. You choose a target monthly pension, contribute a fixed amount until age 60, and the government guarantees the payout for life thereafter.",
    benefit: "₹5,000/mo",
    matchPercent: 84,
    processingTime: "5–7 days",
    documentsCount: 3,
    department: "Pension Fund Regulatory and Development Authority",
    lastUpdated: "Mar 2026",
    eligibility: [
      "Indian citizen between 18 and 40 years of age",
      "Holds a savings bank account or post office account",
      "Not covered by any statutory social security scheme",
    ],
    requiredDocuments: ["Aadhaar card", "Bank account passbook", "Mobile number linked to Aadhaar"],
    applySteps: [
      "Fill out the APY subscription form at your bank or post office branch.",
      "Choose your target pension amount and confirm the auto-debit contribution.",
      "Contributions are deducted automatically until you turn 60, when the pension begins.",
    ],
    faqs: [
      {
        question: "What happens to the contributions if the subscriber dies early?",
        answer:
          "The spouse can continue the account or receive the accumulated corpus, depending on the option chosen at enrolment.",
      },
      {
        question: "Can I change my target pension amount later?",
        answer:
          "Yes, you can revise it once a year, and your contribution amount adjusts accordingly.",
      },
    ],
  },
  {
    slug: "pm-awas-yojana",
    icon: HomeIcon,
    title: "PM Awas Yojana",
    category: "Housing",
    description: "Interest subsidy and financial assistance to help eligible families build or buy their first home.",
    overview:
      "PM Awas Yojana reduces the effective interest rate on home loans for eligible first-time buyers and offers direct construction assistance for rural applicants. The subsidy is credited upfront against your loan principal, lowering your EMI for the full loan tenure.",
    benefit: "₹2,67,000",
    matchPercent: 79,
    processingTime: "20–30 days",
    documentsCount: 6,
    department: "Ministry of Housing & Urban Affairs",
    lastUpdated: "Feb 2026",
    eligibility: [
      "Household does not already own a pucca house anywhere in India",
      "Family income within the scheme's defined slab",
      "Applicant or spouse has not availed a central housing subsidy before",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Income certificate",
      "Land or property documents",
      "Bank account passbook",
      "Passport-size photograph",
      "Caste certificate (if applicable)",
    ],
    applySteps: [
      "Apply online through the PMAY portal or your nearest Common Service Centre.",
      "Submit income and property documents for eligibility verification.",
      "On approval, the subsidy is credited directly against your home loan account.",
    ],
    faqs: [
      {
        question: "Can I apply if I'm building on inherited land?",
        answer:
          "Yes, as long as the land is legally registered and you can provide clear ownership or inheritance documentation.",
      },
      {
        question: "Does this cover home renovation?",
        answer:
          "The subsidy is intended for construction or purchase of a new home, not renovation of an existing one.",
      },
    ],
  },
  {
    slug: "pm-mudra-yojana",
    icon: Briefcase,
    title: "PM Mudra Yojana",
    category: "Business",
    description: "Collateral-free loans up to ₹10 lakh for small and micro business owners to start or expand.",
    overview:
      "PM Mudra Yojana offers three tiers of collateral-free business loans — Shishu, Kishor and Tarun — scaled to how established your business already is. Loans are routed through banks, NBFCs and microfinance institutions and can be used for working capital or equipment purchase.",
    benefit: "Up to ₹10,00,000",
    matchPercent: 74,
    processingTime: "10–15 days",
    documentsCount: 5,
    department: "Ministry of Finance",
    lastUpdated: "Jun 2026",
    eligibility: [
      "Runs or plans to start a non-farm micro or small business",
      "Not currently in default with any bank or financial institution",
      "Indian citizen with a viable business plan",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Business registration proof",
      "Bank statements (6 months)",
      "Project or business plan",
      "PAN card",
    ],
    applySteps: [
      "Choose a loan tier based on your funding need and prepare a brief business plan.",
      "Apply through any participating bank, NBFC or microfinance institution.",
      "On approval, funds are disbursed directly to your business bank account.",
    ],
    faqs: [
      {
        question: "Is any collateral required?",
        answer: "No — Mudra loans are specifically collateral-free across all three loan tiers.",
      },
      {
        question: "Can I use this to refinance an existing business loan?",
        answer:
          "Some lenders allow refinancing existing eligible business debt under Mudra — check directly with your bank's Mudra desk.",
      },
    ],
  },
  {
    slug: "national-career-service",
    icon: ClipboardCheck,
    title: "National Career Service",
    category: "Employment",
    description: "Free job-matching, career counselling and skill-training referrals for job seekers nationwide.",
    overview:
      "National Career Service is a free platform connecting job seekers with employers, apprenticeships and skill-development programs. It also runs career counselling sessions and job fairs through local employment exchanges, at no cost to the applicant.",
    benefit: "Free service",
    matchPercent: 88,
    processingTime: "Instant",
    documentsCount: 2,
    department: "Ministry of Labour & Employment",
    lastUpdated: "Jun 2026",
    eligibility: [
      "Indian citizen actively seeking employment or apprenticeship",
      "Minimum age of 18",
    ],
    requiredDocuments: ["Aadhaar card", "Educational qualification certificates"],
    applySteps: [
      "Create a profile on the NCS portal with your skills and experience.",
      "Browse and apply to job or apprenticeship listings matched to your profile.",
      "Optionally book a free career counselling session through your local employment exchange.",
    ],
    faqs: [
      {
        question: "Is there a fee to use this service?",
        answer: "No, registration, job matching and counselling are all completely free.",
      },
      {
        question: "Can employers also use this platform?",
        answer: "Yes, employers can register separately to post openings and search verified candidate profiles.",
      },
    ],
  },
  {
    slug: "disability-pension-scheme",
    icon: Accessibility,
    title: "Disability Pension Scheme",
    category: "Disability",
    description: "Monthly financial assistance for individuals with 80% or more certified disability.",
    overview:
      "This scheme provides a guaranteed monthly pension to individuals with severe, certified disabilities who have limited or no independent income. Payments are made directly to the beneficiary's bank account and continue for life, subject to periodic re-verification.",
    benefit: "₹1,000/mo",
    matchPercent: 81,
    processingTime: "10–12 days",
    documentsCount: 4,
    department: "Ministry of Social Justice & Empowerment",
    lastUpdated: "May 2026",
    eligibility: [
      "Certified disability of 80% or more (UDID registered)",
      "Family income below the state-specified threshold",
      "Not already receiving a comparable pension from another scheme",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Disability certificate (UDID)",
      "Income certificate",
      "Bank account passbook",
    ],
    applySteps: [
      "Apply at your local social welfare office or through the state portal with your UDID card.",
      "Attend a verification appointment if required by your state's welfare department.",
      "Once approved, the pension is credited monthly to your bank account.",
    ],
    faqs: [
      {
        question: "Do I need to renew my disability certificate periodically?",
        answer:
          "Some states require periodic re-certification for non-permanent conditions — permanent disabilities are usually exempt after initial verification.",
      },
      {
        question: "Can this be combined with other disability benefits?",
        answer:
          "In most states, yes — but combined caps may apply, so confirm with your local welfare office.",
      },
    ],
  },
  {
    slug: "pre-matric-scholarship-minorities",
    icon: Users,
    title: "Pre-Matric Scholarship for Minorities",
    category: "Minorities",
    description:
      "Financial assistance for students from notified minority communities studying in classes 1 to 10.",
    overview:
      "This scholarship helps offset school fees, books and maintenance costs for students from notified minority communities in classes 1 through 10, provided their family income falls within the eligible range. Funds are disbursed directly to the student's or guardian's bank account each academic year.",
    benefit: "₹6,000/yr",
    matchPercent: 86,
    processingTime: "15–18 days",
    documentsCount: 4,
    department: "Ministry of Minority Affairs",
    lastUpdated: "Apr 2026",
    eligibility: [
      "Belongs to a notified minority community",
      "Enrolled in classes 1 to 10 at a recognised school",
      "Family income below the scheme's specified threshold",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Minority community certificate",
      "School bonafide certificate",
      "Income certificate",
    ],
    applySteps: [
      "Apply through the National Scholarship Portal under the minority scholarship category.",
      "Get the application verified by your school's nodal officer.",
      "Funds are disbursed to the registered bank account after state-level approval.",
    ],
    faqs: [
      {
        question: "Can siblings in the same family both apply?",
        answer:
          "Yes, each eligible child can apply individually as long as they meet the class and income criteria.",
      },
      {
        question: "What if my community isn't on the notified list?",
        answer:
          "Only communities notified under this specific scheme qualify — check the current list on the portal before applying.",
      },
    ],
  },
  {
    slug: "pm-vidyalakshmi-scheme",
    icon: BookOpen,
    title: "PM Vidyalakshmi Scheme",
    category: "Students",
    description: "Collateral-free education loans for meritorious students admitted to top-ranked institutions.",
    overview:
      "PM Vidyalakshmi offers collateral-free, low-interest education loans to students admitted to India's top-ranked higher education institutions. The scheme also includes an interest subsidy during the moratorium period for students from lower-income families.",
    benefit: "Up to ₹7,50,000",
    matchPercent: 77,
    processingTime: "12–15 days",
    documentsCount: 5,
    department: "Ministry of Education",
    lastUpdated: "Mar 2026",
    eligibility: [
      "Admitted to a listed top-ranked institution",
      "Indian citizen with confirmed admission for the current academic year",
      "Family income within the interest-subsidy threshold (for subsidy component)",
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Admission letter from institution",
      "Fee structure document",
      "Co-applicant's income proof",
      "PAN card",
    ],
    applySteps: [
      "Apply through the PM Vidyalakshmi portal with your admission and institution details.",
      "Select a partner bank and complete the loan application with a co-applicant.",
      "On sanction, funds are disbursed directly to your institution per the fee schedule.",
    ],
    faqs: [
      {
        question: "Do I need a guarantor?",
        answer:
          "No separate guarantor is required for eligible loan amounts — a co-applicant (usually a parent) is sufficient.",
      },
      {
        question: "When does repayment start?",
        answer:
          "Repayment typically begins after a moratorium period covering your course duration plus a grace period, per your loan agreement.",
      },
    ],
  },
  {
    slug: "pm-fasal-bima-yojana",
    icon: Wheat,
    title: "PM Fasal Bima Yojana",
    category: "Farmers",
    description:
      "Insurance cover for crop loss due to natural calamities, pests or diseases, at heavily subsidised premiums.",
    overview:
      "PM Fasal Bima Yojana protects farmers against yield loss from natural calamities, pests and diseases, with the government subsidising the bulk of the premium. Claims are assessed using localised crop-cutting experiments, and payouts are credited directly to the farmer's bank account.",
    benefit: "Up to ₹2,00,000",
    matchPercent: 72,
    processingTime: "20–25 days",
    documentsCount: 4,
    department: "Ministry of Agriculture & Farmers Welfare",
    lastUpdated: "Jun 2026",
    eligibility: [
      "Farmer growing a notified crop in a notified area",
      "Both loanee and non-loanee farmers can enrol",
      "Enrolment completed before the cut-off date for the relevant season",
    ],
    requiredDocuments: ["Aadhaar card", "Land records", "Sowing certificate", "Bank account passbook"],
    applySteps: [
      "Enrol before the seasonal cut-off date through your bank, CSC, or the insurance portal.",
      "Pay your subsidised premium share for the notified crop and area.",
      "File a claim through your bank or the portal if crop loss occurs; payouts follow the official yield assessment.",
    ],
    faqs: [
      {
        question: "Is enrolment automatic if I have a crop loan?",
        answer:
          "Loanee farmers were previously enrolled by default, but enrolment is now optional for all farmers — you need to actively opt in.",
      },
      {
        question: "How is crop loss assessed?",
        answer:
          "Loss is estimated using localised crop-cutting experiments conducted by state agriculture officials, not individual field inspections.",
      },
    ],
  },
];

function getSchemeBySlug(slug) {
  return SCHEMES.find((scheme) => scheme.slug === slug);
}

function getRelatedSchemes(slug, limit = 3) {
  const current = getSchemeBySlug(slug);
  if (!current) return [];

  const sameCategory = SCHEMES.filter((s) => s.slug !== slug && s.category === current.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const others = SCHEMES.filter((s) => s.slug !== slug && s.category !== current.category).sort(
    (a, b) => b.matchPercent - a.matchPercent
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export { CATEGORIES, SCHEMES, getSchemeBySlug, getRelatedSchemes };

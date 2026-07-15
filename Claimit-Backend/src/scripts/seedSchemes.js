const dotenv = require("dotenv");
const Scheme = require("../models/Scheme");
const connectDB = require("../config/db");
const mongoose = require("mongoose");
dotenv.config(); // Load environment variables from .env file

async function seedDatabase() {
  try {
    await connectDB();

    await Scheme.deleteMany(); // Delete old schemes

    const schemes = [
      {
        name: "PM Kisan Samman Nidhi",
        estimatedBenefit:
          "₹6,000 per year in three equal installments of ₹2,000",
        category: ["Farmers"],
        eligibility: {
          minAge: 18,
          maxAge: 100,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: ["Farmer", "Landholding Farmer"],
          maxAnnualIncome: 0,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Land Ownership Records",
          "Bank Account Passbook",
          "Passport Size Photograph",
        ],
        application: {
          startDate: new Date("2019-02-24"),
          endDate: new Date("2027-03-31"),
          processingTime: "30-45 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "Income support scheme providing direct cash transfers to small and marginal farmer families across India.",
          fullDescription:
            "Pradhan Mantri Kisan Samman Nidhi is a central sector scheme that provides income support to all landholding farmer families to supplement their financial needs for procuring inputs related to agriculture and allied activities. Under the scheme, an amount of ₹6,000 per year is transferred directly into the bank accounts of eligible farmers in three equal installments of ₹2,000 every four months.",
        },
        department: "Ministry of Agriculture and Farmers Welfare",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://pmkisan.gov.in",
        },
        tags: [
          "farmers",
          "agriculture",
          "income support",
          "direct benefit transfer",
          "cash assistance",
        ],
        featured: true,
      },
      {
        name: "Ayushman Bharat (PM-JAY)",
        estimatedBenefit: "Health cover of up to ₹5,00,000 per family per year",
        category: ["Healthcare"],
        eligibility: {
          minAge: 0,
          maxAge: 100,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: ["Any"],
          maxAnnualIncome: 250000,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Ration Card",
          "Income Certificate",
          "SECC Database Verification",
        ],
        application: {
          startDate: new Date("2018-09-23"),
          endDate: new Date("2027-12-31"),
          processingTime: "7-15 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "World's largest health assurance scheme offering free secondary and tertiary care hospitalization coverage.",
          fullDescription:
            "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana provides a health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 10 crore poor and vulnerable families identified based on deprivation criteria in the Socio-Economic Caste Census. The scheme aims to reduce catastrophic health expenditure and provide cashless access to healthcare services at empaneled hospitals across the country.",
        },
        department: "Ministry of Health and Family Welfare",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://pmjay.gov.in",
        },
        tags: [
          "healthcare",
          "health insurance",
          "hospitalization",
          "cashless treatment",
          "medical coverage",
        ],
        featured: true,
      },
      {
        name: "Pradhan Mantri Awas Yojana (PMAY)",
        estimatedBenefit: "Interest subsidy up to ₹2,67,000 on home loans",
        category: ["Housing"],
        eligibility: {
          minAge: 18,
          maxAge: 70,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: ["Any"],
          maxAnnualIncome: 1800000,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Income Certificate",
          "Property Documents",
          "Bank Statement",
          "Passport Size Photograph",
        ],
        application: {
          startDate: new Date("2015-06-25"),
          endDate: new Date("2026-12-31"),
          processingTime: "60-90 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "Housing scheme aimed at providing affordable pucca houses to eligible urban and rural families.",
          fullDescription:
            "Pradhan Mantri Awas Yojana aims to provide affordable housing to the urban and rural poor with a target of building affordable pucca houses with basic amenities. The scheme offers credit-linked subsidy on home loans for beneficiaries belonging to economically weaker sections, low income groups, and middle income groups, thereby helping them own a home for the first time.",
        },
        department: "Ministry of Housing and Urban Affairs",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://pmaymis.gov.in",
        },
        tags: [
          "housing",
          "home loan subsidy",
          "affordable housing",
          "urban poor",
          "rural housing",
        ],
        featured: true,
      },
      {
        name: "Sukanya Samriddhi Yojana",
        estimatedBenefit: "High interest savings with tax-free maturity amount",
        category: ["Women", "Students"],
        eligibility: {
          minAge: 0,
          maxAge: 10,
          gender: ["Female"],
          states: ["All States"],
          occupations: ["Any"],
          maxAnnualIncome: 0,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Birth Certificate of Girl Child",
          "Aadhaar Card of Parent/Guardian",
          "Address Proof",
          "Passport Size Photograph",
        ],
        application: {
          startDate: new Date("2015-01-22"),
          endDate: new Date("2027-06-30"),
          processingTime: "1-3 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "Small savings scheme designed to secure the financial future of the girl child through guaranteed returns.",
          fullDescription:
            "Sukanya Samriddhi Yojana is a government-backed small savings scheme specifically designed for the parents of girl children, encouraging them to build a fund for future education and marriage expenses. Accounts can be opened for a girl child below the age of 10 years at any post office or authorized bank branch, and the scheme offers one of the highest interest rates among small savings instruments along with complete tax exemption on the maturity amount.",
        },
        department: "Ministry of Finance, Department of Economic Affairs",
        officialLinks: {
          officialWebsite: "https://www.nsiindia.gov.in",
          applicationPortal: "https://www.nsiindia.gov.in",
        },
        tags: [
          "girl child",
          "savings scheme",
          "women empowerment",
          "education fund",
          "financial security",
        ],
        featured: false,
      },
      {
        name: "National Scholarship Scheme",
        estimatedBenefit:
          "Scholarship amount ranging from ₹10,000 to ₹1,25,000 per annum",
        category: ["Education", "Students", "Minorities"],
        eligibility: {
          minAge: 5,
          maxAge: 35,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: ["Student"],
          maxAnnualIncome: 800000,
          casteCategories: ["General", "OBC", "SC", "ST", "Minority"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Income Certificate",
          "Previous Year Mark Sheet",
          "Bonafide Certificate",
          "Bank Account Passbook",
          "Caste Certificate",
        ],
        application: {
          startDate: new Date("2026-08-01"),
          endDate: new Date("2026-11-30"),
          processingTime: "45-60 days",
          status: "Upcoming",
        },
        description: {
          shortDescription:
            "Unified scholarship portal offering financial assistance to meritorious students from economically weaker backgrounds.",
          fullDescription:
            "The National Scholarship Scheme, managed through the National Scholarship Portal, is a one-stop solution through which various scholarship schemes of central ministries, state governments, and union territories are disbursed to students. It covers pre-matric, post-matric, merit-based, and minority scholarships aimed at reducing dropout rates and encouraging higher education among students from disadvantaged sections of society.",
        },
        department: "Ministry of Education",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://scholarships.gov.in",
        },
        tags: [
          "scholarship",
          "education",
          "students",
          "financial aid",
          "merit based",
        ],
        featured: false,
      },
      {
        name: "Atal Pension Yojana",
        estimatedBenefit:
          "Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60",
        category: ["Senior Citizens", "Employment"],
        eligibility: {
          minAge: 18,
          maxAge: 40,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: ["Unorganized Sector Worker", "Self Employed"],
          maxAnnualIncome: 0,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Bank Account Passbook",
          "Mobile Number",
          "Passport Size Photograph",
        ],
        application: {
          startDate: new Date("2015-06-01"),
          endDate: new Date("2027-03-31"),
          processingTime: "15-30 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "Pension scheme targeted at workers in the unorganized sector to ensure financial security in old age.",
          fullDescription:
            "Atal Pension Yojana is a government-backed pension scheme primarily targeted at workers in the unorganized sector who do not have any formal social security cover. Subscribers can choose a guaranteed monthly pension amount between ₹1,000 and ₹5,000 depending on their contribution amount and the age of joining, with the pension becoming payable after the subscriber attains the age of 60 years.",
        },
        department: "Ministry of Finance, Department of Financial Services",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://npscra.nsdl.co.in",
        },
        tags: [
          "pension",
          "senior citizens",
          "unorganized sector",
          "retirement savings",
          "social security",
        ],
        featured: false,
      },
      {
        name: "PM Ujjwala Yojana",
        estimatedBenefit:
          "Free LPG connection with financial support of ₹1,600",
        category: ["Women", "Healthcare"],
        eligibility: {
          minAge: 18,
          maxAge: 100,
          gender: ["Female"],
          states: ["All States"],
          occupations: ["Homemaker", "Any"],
          maxAnnualIncome: 200000,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "BPL Ration Card",
          "Bank Account Passbook",
          "Passport Size Photograph",
          "Address Proof",
        ],
        application: {
          startDate: new Date("2016-05-01"),
          endDate: new Date("2026-08-31"),
          processingTime: "20-30 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "Scheme providing free LPG gas connections to women from below poverty line households.",
          fullDescription:
            "Pradhan Mantri Ujjwala Yojana aims to safeguard the health of women and children by providing them with a clean cooking fuel, LPG, so that they do not have to compromise their health in smoky kitchens or wait in long queues to fetch firewood. The scheme provides a financial support for a deposit-free LPG connection to women belonging to below poverty line households across the country.",
        },
        department: "Ministry of Petroleum and Natural Gas",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://www.pmuy.gov.in",
        },
        tags: [
          "lpg connection",
          "women",
          "clean cooking fuel",
          "bpl households",
          "health",
        ],
        featured: false,
      },
      {
        name: "PM SVANidhi",
        estimatedBenefit: "Collateral-free working capital loan up to ₹50,000",
        category: ["Business", "Employment"],
        eligibility: {
          minAge: 18,
          maxAge: 100,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: ["Street Vendor"],
          maxAnnualIncome: 0,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Vending Certificate or Letter of Recommendation",
          "Bank Account Passbook",
          "Passport Size Photograph",
        ],
        application: {
          startDate: new Date("2020-06-01"),
          endDate: new Date("2027-03-31"),
          processingTime: "20-30 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "Micro-credit scheme offering affordable working capital loans to urban street vendors affected by the pandemic.",
          fullDescription:
            "PM Street Vendor's AtmaNirbhar Nidhi is a micro-credit facility designed to provide affordable working capital loans to street vendors to resume their livelihoods that had been adversely affected due to the COVID-19 lockdown. Vendors can avail an initial working capital loan of up to ₹10,000, repayable in monthly installments, with subsequent higher loan eligibility of up to ₹20,000 and ₹50,000 on timely repayment along with interest subsidy benefits.",
        },
        department: "Ministry of Housing and Urban Affairs",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://pmsvanidhi.mohua.gov.in",
        },
        tags: [
          "street vendors",
          "micro credit",
          "working capital loan",
          "urban livelihood",
          "small business",
        ],
        featured: false,
      },
      {
        name: "Pradhan Mantri Mudra Yojana",
        estimatedBenefit:
          "Collateral-free loans up to ₹20,00,000 under Shishu, Kishor, and Tarun categories",
        category: ["Business", "Employment"],
        eligibility: {
          minAge: 18,
          maxAge: 65,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: [
            "Small Business Owner",
            "Entrepreneur",
            "Self Employed",
          ],
          maxAnnualIncome: 0,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "PAN Card",
          "Business Plan",
          "Address Proof",
          "Bank Statement",
          "Passport Size Photograph",
        ],
        application: {
          startDate: new Date("2015-04-08"),
          endDate: new Date("2027-03-31"),
          processingTime: "15-30 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "Loan scheme supporting non-corporate, non-farm micro and small enterprises with collateral-free credit.",
          fullDescription:
            "Pradhan Mantri Mudra Yojana provides loans up to ₹20 lakh to non-corporate, non-farm small and micro enterprises through three categories namely Shishu, Kishor, and Tarun, representing the stage of growth and funding needs of the beneficiary. These loans, classified as MUDRA loans, are extended by member lending institutions including banks, non-banking financial companies, and microfinance institutions without requiring any collateral security.",
        },
        department: "Ministry of Finance, Department of Financial Services",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://www.mudra.org.in",
        },
        tags: [
          "business loan",
          "entrepreneurship",
          "mudra loan",
          "small enterprises",
          "collateral free",
        ],
        featured: true,
      },
      {
        name: "Skill India Mission",
        estimatedBenefit:
          "Free skill training with certification and placement assistance",
        category: ["Education", "Employment", "Students"],
        eligibility: {
          minAge: 15,
          maxAge: 45,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: ["Unemployed Youth", "Student"],
          maxAnnualIncome: 0,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Educational Qualification Certificate",
          "Address Proof",
          "Passport Size Photograph",
        ],
        application: {
          startDate: new Date("2026-09-01"),
          endDate: new Date("2027-02-28"),
          processingTime: "10-20 days",
          status: "Upcoming",
        },
        description: {
          shortDescription:
            "National initiative to train youth in industry-relevant skills to enhance their employability.",
          fullDescription:
            "Skill India Mission, implemented largely through the Pradhan Mantri Kaushal Vikas Yojana, aims to train crores of Indian youth in industry-relevant skills to make them employable and enhance their productivity. The mission offers short-term training, recognition of prior learning, and special projects covering a wide range of sectors, along with monetary rewards and certification to candidates who successfully clear skill assessments conducted by accredited training partners.",
        },
        department: "Ministry of Skill Development and Entrepreneurship",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://www.pmkvyofficial.org",
        },
        tags: [
          "skill development",
          "youth employment",
          "vocational training",
          "certification",
          "placement assistance",
        ],
        featured: false,
      },
      {
        name: "e-Shram",
        estimatedBenefit:
          "Accidental insurance cover of ₹2,00,000 and access to social security schemes",
        category: ["Employment"],
        eligibility: {
          minAge: 16,
          maxAge: 59,
          gender: ["Male", "Female", "Other"],
          states: ["All States"],
          occupations: [
            "Unorganized Sector Worker",
            "Migrant Worker",
            "Gig Worker",
          ],
          maxAnnualIncome: 0,
          casteCategories: ["General", "OBC", "SC", "ST"],
        },
        requiredDocuments: [
          "Aadhaar Card",
          "Bank Account Passbook",
          "Mobile Number",
          "Address Proof",
        ],
        application: {
          startDate: new Date("2021-08-26"),
          endDate: new Date("2027-12-31"),
          processingTime: "1-5 days",
          status: "Active",
        },
        description: {
          shortDescription:
            "National database of unorganized workers enabling access to social security and welfare schemes.",
          fullDescription:
            "The e-Shram portal is a national database of unorganized workers created to enable the government to deliver social security and welfare benefits directly to workers who otherwise lack formal registration. Registered workers receive an e-Shram card containing a unique twelve-digit Universal Account Number, which provides free accidental insurance coverage and serves as a gateway for enrollment into various central and state government welfare schemes.",
        },
        department: "Ministry of Labour and Employment",
        officialLinks: {
          officialWebsite: "https://www.myscheme.gov.in",
          applicationPortal: "https://eshram.gov.in",
        },
        tags: [
          "unorganized workers",
          "labour registration",
          "social security",
          "accidental insurance",
          "migrant workers",
        ],
        featured: false,
      },
    ];

    await Scheme.insertMany(schemes);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close(); // ----Important: Close DB connection----
  }
}

seedDatabase();

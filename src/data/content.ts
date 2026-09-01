export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface GroundsPlace {
  id: string;
  title: string;
  description: string;
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface Ministry {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EventItem {
  title: string;
  date: string;
  summary: string;
  category: "Parish" | "Devotion" | "Formation" | "Archdiocese";
  href?: string;
}

export interface GivingOption {
  title: string;
  description: string;
  icon: string;
}

export interface Priest {
  name: string;
  role: string;
  email?: string;
  bio: string;
}

export interface PpcMember {
  name: string;
  role: string;
}

export const priests: Priest[] = [
  {
    name: "Fr Johan Wongso, SS.CC.",
    role: "Parish Priest",
    email: "secretariat@bsc.org.sg",
    bio: "Serving the parish with the charism of the Congregation of the Sacred Hearts of Jesus and Mary.",
  },
  {
    name: "Fr William van Soest, SS.CC.",
    role: "Founding Parish Priest (1958–1970)",
    bio: "Arrived from Holland in 1958 to establish the new parish in Queenstown. Laid the foundations of our community.",
  },
  {
    name: "Fr Odo Tiggeloven, SS.CC.",
    role: "Co-Founder (1958–)",
    bio: "Joined Fr van Soest in 1958 to build the parish from the ground up, serving the growing Catholic community.",
  },
];

export const ppcMembers: PpcMember[] = [
  { name: "Fr Johan Wongso, SS.CC.", role: "Parish Priest (Ex-officio)" },
  { name: "Chairperson", role: "Chairperson, PPC" },
  { name: "Vice Chairperson", role: "Vice Chairperson, PPC" },
  { name: "Secretary", role: "Secretary, PPC" },
  { name: "Treasurer", role: "Treasurer, PPC" },
  { name: "Member", role: "Member, PPC" },
];

export const lifeTimeline: TimelineEntry[] = [
  {
    year: "1954",
    title: "A Church for Queenstown",
    description:
      "Archbishop Michel Olçomendy applies for a site to serve Catholics in Queenstown, Alexandra, and Redhill as Singapore's first satellite town takes shape.",
  },
  {
    year: "1958",
    title: "The SS.CC. Arrives",
    description:
      "Fathers William van Soest and Odo Tiggeloven arrive from Holland to establish the new parish, staying temporarily at the Cathedral of the Good Shepherd.",
  },
  {
    year: "1963",
    title: "Damien Hall Opens",
    description:
      "The first building is completed and named after Saint Damien of Molokai. It serves as a temporary place of worship and lodging for the priests.",
  },
  {
    year: "1965",
    title: "Church Consecrated",
    description:
      "The main church building is officially opened and blessed by Archbishop Olçomendy on 8 May. Its distinctive tent-shaped roof becomes a Queenstown landmark.",
  },
  {
    year: "1970s–80s",
    title: "A Growing Community",
    description:
      "The congregation swells to over 7,000 parishioners. Catechism classes and community groups flourish as the housing estate matures.",
  },
  {
    year: "2005",
    title: "Conservation Status",
    description:
      "The Urban Redevelopment Authority grants the church conservation status, recognising its architectural significance and iconic blue roof.",
  },
  {
    year: "Today",
    title: "A Household of Faith",
    description:
      "Some 1,900 parishioners and over 40 ministries continue the legacy of worship and service in the heart of Queenstown.",
  },
];

export const grounds: GroundsPlace[] = [
  {
    id: "main-church",
    title: "Main Church",
    description:
      "The iconic tent-shaped church designed by Gordon Dowsett, seating 1,500. Its folded blue roof is a beloved Queenstown landmark.",
    image: "/images/hero-church.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "The Church of the Blessed Sacrament with its distinctive blue tent-shaped roof",
  },
  {
    id: "damien-hall",
    title: "Damien Hall",
    description:
      "Named after Saint Damien of Molokai, our parish hall hosts community gatherings, catechism classes, and parish events.",
    image: "/images/damien-hall.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Damien Hall, the parish hall of Blessed Sacrament Church",
  },
  {
    id: "garden",
    title: "Parish Grounds",
    description:
      "A peaceful green space for quiet prayer and community fellowship in the heart of Queenstown.",
    image: "/images/garden.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "The parish gardens at Blessed Sacrament Church",
  },
];

export const ministries: Ministry[] = [
  {
    id: "liturgical",
    title: "Liturgical Ministries",
    summary: "Altar servers, lectors, Eucharistic ministers, choir, and hospitality.",
    description:
      "Our liturgical ministries serve at the heart of parish worship. Altar servers assist at Mass, lectors proclaim the Word, Eucharistic ministers share the Body of Christ, our choirs lead the assembly in song, and the hospitality team welcomes all who come through our doors.",
    image: "/images/liturgical.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Liturgical ministers serving during Mass",
  },
  {
    id: "faith-formation",
    title: "Faith Formation",
    summary: "Catechism, RCIA, adult faith programmes, and scripture study.",
    description:
      "From children's catechism to the Rite of Christian Initiation of Adults (RCIA), our faith formation programmes nurture disciples of all ages. Adult scripture study, Lenten retreats, and parish missions deepen our understanding of the Catholic faith.",
    image: "/images/faith-formation.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Children and adults in faith formation sessions",
  },
  {
    id: "pastoral-care",
    title: "Pastoral Care",
    summary: "Befriending, bereavement support, and outreach to the needy.",
    description:
      "Our pastoral care teams visit the sick and homebound, support the bereaved, and reach out to the poor and needy in our community. We believe that every person is a beloved child of God deserving of dignity and compassion.",
    image: "/images/pastoral-care.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Pastoral care team visiting parishioners",
  },
  {
    id: "family-life",
    title: "Family Life",
    summary: "Marriage preparation, baptism, and family enrichment.",
    description:
      "We accompany couples preparing for marriage, celebrate the sacrament of baptism with families, and offer programmes that strengthen family bonds in faith. The family is the domestic church — the first place where love of God is learned.",
    image: "/images/family-life.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Families gathered at a parish event",
  },
  {
    id: "youth",
    title: "Youth & Young Adults",
    summary: "Youth ministry, young adult groups, and campus outreach.",
    description:
      "Our youth and young adult ministries create spaces for friendship, faith sharing, and service. From confirmation preparation to young adult retreats, we journey with the next generation as they discover God's call in their lives.",
    image: "/images/youth.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Youth group at a parish activity",
  },
  {
    id: "community",
    title: "Community & Outreach",
    summary: "Language communities, cultural groups, and social outreach.",
    description:
      "Blessed Sacrament is a multilingual parish. Our Mandarin, Tamil, Indonesian, and Tagalog communities gather for Mass and fellowship in their own languages. We also run food drives, fund-raising events, and outreach to the marginalised.",
    image: "/images/community.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Multicultural parish community gathering",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What are the Mass times?",
    answer:
      "Weekday Masses are at 8:30 AM, 12:30 PM, and 6:30 PM (Mon–Fri). Saturday Masses are at 8:30 AM and 6:00 PM (English). Sunday Masses are at 7:30 AM (Mandarin), 9:00 AM (English), 11:00 AM (English), 1:00 PM (Indonesian — last Sunday only), 3:15 PM (Tagalog — except 3rd Sunday), and 5:30 PM (English). On public holidays, there is only 8:30 AM Mass.",
  },
  {
    question: "When is confession available?",
    answer:
      "Confession is available on weekdays after the 8:30 AM Mass and before the 12:30 PM and 6:30 PM Masses. On Saturdays, it is available after the 8:30 AM Mass and before the 5:45 PM Mass. On Sundays, confession is available before all Masses.",
  },
  {
    question: "How do I get to the church?",
    answer:
      "The church is located at 1 Commonwealth Drive, Singapore 149603. The nearest MRT stations are Queenstown (EW19) and Commonwealth (EW20). Buses 32, 51, 111, 122, 145, 195, and 855 serve Commonwealth Drive.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, parking is available within the church compound on a first-come, first-served basis. Please arrive early on weekends and for major feast days.",
  },
  {
    question: "How do I arrange a baptism or wedding?",
    answer:
      "Please contact the parish office at +65 6474 0582 or email secretariat@bsc.org.sg. Baptism preparation classes and marriage preparation (Pre-Cana) programmes are offered regularly. Please contact us at least six months in advance for weddings.",
  },
  {
    question: "How can I join a ministry or volunteer?",
    answer:
      "We welcome your gifts! Visit our Serve page to learn about liturgical, pastoral, and community ministries. You may also speak with any ministry leader after Mass or contact the parish office.",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    title: "First Friday Eucharistic Adoration",
    date: "First Friday of every month",
    summary:
      "Eucharistic Adoration and Devotion to the Sacred Heart of Jesus at 7:00 PM, following the 6:30 PM Mass. Vigil from 10:00 PM to 5:00 AM with Masses at 10:00 PM and 4:30 AM.",
    category: "Devotion",
  },
  {
    title: "First Saturday Adoration & Tamil Vigil",
    date: "First Saturday of every month",
    summary:
      "Eucharistic Adoration and Devotion to the Immaculate Heart of Mary at 9:00 AM after the 8:30 AM Mass. Tamil vigil from 9:00 PM to 5:00 AM with Mass at 9:30 PM.",
    category: "Devotion",
  },
  {
    title: "Divine Mercy Prayers",
    date: "Every Friday at 8:00 PM",
    summary:
      "Join us for the Chaplet of Divine Mercy every Friday evening in the church.",
    category: "Devotion",
  },
  {
    title: "Novena to Our Lady",
    date: "Every Saturday at 5:00 PM",
    summary:
      "Weekly novena prayers to Our Lady before the Saturday evening Mass.",
    category: "Devotion",
  },
  {
    title: "Intercessory Prayers",
    date: "Second Friday of every month at 7:45 PM",
    summary:
      "A time of communal prayer for the needs of the parish and the world.",
    category: "Parish",
  },
  {
    title: "Parish Feast Day — Corpus Christi",
    date: "Sunday after Trinity Sunday",
    summary:
      "Our parish feast day celebrating the Most Holy Body and Blood of Christ. Join us for a solemn Mass and parish fellowship.",
    category: "Parish",
  },
];

export const givingOptions: GivingOption[] = [
  {
    title: "PayNow",
    description: "UEN T08CC1234A",
    icon: "globe",
  },
  {
    title: "Weekend Collection",
    description: "Tap & Give using your credit card at our giving terminals.",
    icon: "church",
  },
  {
    title: "Cheque",
    description: "Payable to 'Church of the Blessed Sacrament'",
    icon: "book",
  },
  {
    title: "Cash",
    description: "Drop off at the parish office during office hours.",
    icon: "heart",
  },
  {
    title: "General Church Offering",
    description: "Support the day-to-day running of the parish.",
    icon: "flame",
  },
  {
    title: "Mass Offerings",
    description: "Request a Mass intention for your loved ones.",
    icon: "sprout",
  },
];

export const serveRoles = [
  {
    title: "Liturgical Ministers",
    summary:
      "Serve at the altar, proclaim the Word, or share the Eucharist as a minister of Holy Communion.",
  },
  {
    title: "Catechists & Facilitators",
    summary:
      "Share your faith with children, youth, and adults in our catechism and formation programmes.",
  },
  {
    title: "Pastoral Care",
    summary:
      "Visit the sick and homebound, support the bereaved, and reach out to those in need.",
  },
  {
    title: "Hospitality & Grounds",
    summary:
      "Welcome visitors, assist at events, and help maintain our beautiful parish grounds.",
  },
];

export const devotions = [
  {
    title: "Divine Mercy Prayers",
    when: "Every Friday at 8:00 PM",
    where: "Main Church",
  },
  {
    title: "Novena to Our Lady",
    when: "Every Saturday at 5:00 PM",
    where: "Main Church",
  },
  {
    title: "First Friday Adoration",
    when: "First Friday, 7:00 PM – 5:00 AM",
    where: "Main Church",
  },
  {
    title: "First Saturday Adoration",
    when: "First Saturday, 9:00 AM",
    where: "Main Church",
  },
  {
    title: "Intercessory Prayers",
    when: "Second Friday at 7:45 PM",
    where: "Main Church",
  },
  {
    title: "Eucharistic Adoration",
    when: "Daily 9:00 AM – 9:00 PM",
    where: "Main Church",
  },
];

export const images = {
  hero: "/images/hero-church.jpg",
  heroFallback: "/images/hero-church.jpg",
  chapel: "/images/damien-hall.jpg",
  sanctuary: "/images/hero-church.jpg",
  garden: "/images/garden.jpg",
  hall: "/images/damien-hall.jpg",
  feast: "/images/hero-church.jpg",
} as const;

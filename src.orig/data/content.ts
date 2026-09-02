export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface GroundsPlace {
  id: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface Ministry {
  id: string;
  title: string;
  summary: string;
  details: string[];
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
  name: string;
  description: string;
  icon: "flame" | "church" | "sprout" | "heart" | "book" | "hand-heart" | "landmark" | "globe";
}

export interface Priest {
  name: string;
  role: string;
  email?: string;
}

export interface PpcMember {
  role: string;
  name: string;
}

export const images = {
  hero: "/images/hero-church.jpg",
  heroFallback: "/images/hero-church.jpg",
  chapel: "/images/chapel-interior.jpg",
  sanctuary: "/images/sanctuary.jpg",
  garden: "/images/rosary-garden.jpg",
  glass: "/images/stained-glass.jpg",
  hall: "/images/parish-hall.jpg",
  cemetery: "/images/cemetery.jpg",
  feast: "/images/feast.jpg",
  naveCdn: "/images/sanctuary.jpg",
  courtyardCdn: "/images/rosary-garden.jpg",
} as const;

export const priests: Priest[] = [
  {
    name: "Fr Johan Wongso, SS.CC",
    role: "Parish Priest",
  },
  {
    name: "Fr Rusdi Santoso, SS.CC",
    role: "Assistant Parish Priest",
  },
  {
    name: "Fr Karolus Kapolok Huar, SS.CC",
    role: "Assistant Parish Priest",
  },
  {
    name: "Fr Sambodo Sru Ujianto, SS.CC",
    role: "Assistant Parish Priest · Chaplain of KKIS",
  },
  {
    name: "Fr Anthony Hutjes, SS.CC",
    role: "Priest in Residence",
  },
];

export const ppcMembers: PpcMember[] = [
  { role: "Parish Priest (ex-officio)", name: "Fr Johan Wongso, SS.CC" },
  { role: "Pastoral Associate", name: "Mr Victor Leong" },
  { role: "Chinese Pastoral Associate", name: "Ms Catherine Wong" },
  { role: "Youth Pastoral Associate", name: "Ms Mendoza Alyzza Miclat" },
  { role: "Parish mission", name: "An evangelising church with a Eucharistic spirituality" },
  { role: "Congregation", name: "Sacred Hearts of Jesus and Mary (SS.CC)" },
];

export const lifeTimeline: TimelineEntry[] = [
  {
    year: "1958",
    title: "The Sacred Hearts arrive",
    description:
      "Archbishop Michel Olçomendy applies for a Queenstown site to serve Alexandra and Redhill. Fathers William van Soest and Odo Tiggeloven of the Congregation of the Sacred Hearts of Jesus and Mary (SS.CC) come from the Dutch province to found a parish among Singapore’s first public housing estate.",
  },
  {
    year: "1963",
    title: "Damien Hall",
    description:
      "The first building is completed and opened on 7 November as a temporary church and lodging. It is named for St Damien of Molokai, the SS.CC priest who gave his life among the people of Kalaupapa. Variety shows, film nights, and even circus proceeds help raise the rest.",
  },
  {
    year: "1965",
    title: "A tent of meeting",
    description:
      "On 8 May Archbishop Olçomendy blesses the main church, designed by Y. Gordon Dowsett of Van Sitteren and Partners. The folded blue roof — inverted pleats of a biblical tent — gathers some 1,500 worshippers on a cruciform plan, with glass at the roof joints lighting the sanctuary.",
  },
  {
    year: "1970–1984",
    title: "Queenstown fills the pews",
    description:
      "Under Fr Albert Renckens the congregation swells toward 6,000, then nearly 7,000 by the 1980s. Sunday Mass is followed by breakfast in Damien Hall. The Parish Renewal Experience begins in 1984; Life in the Spirit seminars and a Youth Lenten campaign for the poor take root.",
  },
  {
    year: "1982",
    title: "Damien Centre",
    description:
      "A new centre opens to hold the expanding life of the parish — formation, fellowship, and the kindergarten that will become Little Shepherds’ Schoolhouse.",
  },
  {
    year: "2005–2007",
    title: "A conserved house of prayer",
    description:
      "The Urban Redevelopment Authority grants conservation status in 2005, protecting the iconic tent roof. Father Damien Centre is rebuilt and opened on 22 September 2007 by Monsignor Eugene Vaz, still home to Little Shepherds’ Schoolhouse.",
  },
  {
    year: "2019–2023",
    title: "Tent of Meeting Restoration",
    description:
      "Fr Johan Wongso launches TOMR in March 2019 — not only a $9.4 million restoration of roof, pews, sacristy, air and sound, but a spiritual restoration of the parish. Masses move to Damien Hall. The church reopens in October–November 2023 with an eight-day Threefold Celebration.",
  },
  {
    year: "2023–2026",
    title: "A Eucharistic spirituality",
    description:
      "On Corpus Christi 2023 the parish receives its mission: to be an evangelising church with a Eucharistic spirituality. Oliver Wihardja’s Stations of the Cross keep watch on the walls. English, Mandarin, Tamil, Indonesian and Tagalog still gather under the blue tent.",
  },
];

export const grounds: GroundsPlace[] = [
  {
    id: "main-church",
    title: "Main Church",
    summary:
      "The Tent of Meeting — a conserved modernist nave under a folded blue roof, where glass at the roof joints lights the crucifix and tabernacle.",
    details: [
      "Cruciform plan by Y. Gordon Dowsett, Van Sitteren and Partners",
      "Celtic cross on the exterior brick wall behind the altar",
      "Stations of the Cross by Oliver Wihardja (2023 restoration)",
      "Weekend Masses from Saturday 6.00 p.m. through Sunday 5.30 p.m.",
    ],
    image: images.naveCdn,
    imageFallback: images.sanctuary,
    imageAlt: "Sanctuary of Blessed Sacrament Church looking toward the altar and crucifix",
  },
  {
    id: "chapel",
    title: "Adoration Chapel",
    summary:
      "A quieter house beside the nave. Come and spend some time before the Blessed Sacrament — the parish’s name is also its centre of gravity.",
    details: [
      "Open daily, 9.00 a.m. to 9.00 p.m.",
      "First Friday Sacred Heart devotion at 7.00 p.m.",
      "First Saturday Immaculate Heart devotion at 9.00 a.m.",
      "No appointment needed for a visit of prayer",
    ],
    image: images.chapel,
    imageFallback: images.chapel,
    imageAlt: "Quiet adoration chapel with a golden monstrance and votive candles",
  },
  {
    id: "rosary-garden",
    title: "Father Damien Centre",
    summary:
      "Named for St Damien of Molokai. The hall that first held Mass in 1963 still gathers catechesis, Little Shepherds’ Schoolhouse, and the life of the parish.",
    details: [
      "Opened 7 November 1963 as the first house of worship",
      "Rebuilt and blessed 22 September 2007 by Monsignor Eugene Vaz",
      "Home to Little Shepherds’ Schoolhouse",
      "Formation rooms, hospitality, and weekday parish life",
    ],
    image: images.courtyardCdn,
    imageFallback: images.garden,
    imageAlt: "Tropical courtyard and grounds beside Blessed Sacrament Church",
  },
];

export const ministries: Ministry[] = [
  {
    id: "liturgical",
    title: "Liturgical",
    summary:
      "Servers, singers, readers, and hospitality ministers who help the assembly pray the Mass with dignity — not merely performing functions, but keeping a sense of the sacred.",
    details: [
      "Altar servers assisting the SS.CC fathers",
      "Choirs across the weekend Masses, including Mandarin, Tamil, Indonesian and Tagalog",
      "Readers, extraordinary ministers, and sacristans",
      "Hospitality: no visitor should leave unnoticed",
    ],
    image: images.sanctuary,
    imageFallback: images.sanctuary,
    imageAlt: "Church sanctuary prepared for the celebration of Mass",
  },
  {
    id: "faith-formation",
    title: "Faith Formation",
    summary:
      "Catechesis that begins in childhood and does not stop at confirmation — forming disciples whose centre is the Eucharist.",
    details: [
      "Parish catechism for children and confirmation",
      "RCIA for adults seeking baptism and full communion",
      "Little Shepherds’ Schoolhouse on the Damien Centre grounds",
      "Adult formation, Scripture, and Life in the Spirit",
    ],
    image: images.hall,
    imageFallback: images.hall,
    imageAlt: "Parish hall prepared for catechesis and formation",
  },
  {
    id: "pastoral-care",
    title: "Pastoral Care",
    summary:
      "Outreach that meets Christ in the poor, the sick, and the grieving — the same charity St Damien practised on Molokai.",
    details: [
      "Home and hospital visitation",
      "Bereavement ministry and funeral support",
      "Care for the poor and needy of Queenstown",
      "Write bsc.pastoral@catholic.org.sg",
    ],
    image: images.cemetery,
    imageFallback: images.cemetery,
    imageAlt: "Quiet memorial garden on the church grounds at dawn",
  },
  {
    id: "family-life",
    title: "Family Life",
    summary:
      "Accompanying households from the font to the altar — baptism, marriage preparation, and the slow work of domestic church.",
    details: [
      "Infant baptism enquiry through the parish office",
      "Marriage preparation and Nuptial Mass",
      "Family catechesis and parenting formation",
      "Enquire at bsc.secretariat@catholic.org.sg",
    ],
    image: images.garden,
    imageFallback: images.garden,
    imageAlt: "Marian courtyard garden beside the church",
  },
  {
    id: "youth",
    title: "Youth",
    summary:
      "Young people of Queenstown gathering around the Eucharist — not a programme to occupy them, but a place to belong and be sent.",
    details: [
      "Youth pastoral associate: Ms Mendoza Alyzza Miclat",
      "Confirmation journey and youth Mass involvement",
      "Service, retreats, and peer formation",
      "Write bsc.youthpastoral@catholic.org.sg",
    ],
    image: images.feast,
    imageFallback: images.feast,
    imageAlt: "Parishioners processing with the Blessed Sacrament on the feast of Corpus Christi",
  },
  {
    id: "mandarin",
    title: "Language Communities",
    summary:
      "A parish that prays in five tongues under one tent — Mandarin at dawn, English through the day, Tamil, Indonesian and Tagalog around the table.",
    details: [
      "Mandarin Mass every Sunday at 7.30 a.m.",
      "Tamil Mass on the 3rd Saturday at 7.30 p.m.",
      "Indonesian Mass on the last Sunday at 1.00 p.m. (KKIS)",
      "Tagalog Mass at 3.15 p.m. (English on the 3rd Sunday)",
    ],
    image: images.glass,
    imageFallback: images.glass,
    imageAlt: "Coloured stained glass throwing light across the nave",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What are the Mass times?",
    answer:
      "Weekdays 8.30 a.m., 12.30 p.m. and 6.30 p.m. Saturday 8.30 a.m. and 6.00 p.m. English sunset (Tamil 7.30 p.m. on the 3rd Saturday). Sunday 7.30 a.m. Mandarin, 9.00 a.m. and 11.00 a.m. English, 1.00 p.m. Indonesian on the last Sunday, 3.15 p.m. Tagalog (English on the 3rd Sunday), and 5.30 p.m. English. Public holidays: 8.30 a.m. only.",
  },
  {
    question: "When can I go to confession?",
    answer:
      "Weekdays after the 8.30 a.m. Mass and 15 minutes before the 12.30 p.m. and 6.30 p.m. Masses. Saturday after 8.30 a.m. Mass and from 5.45 p.m. Sunday at 7.15 a.m., 8.45 a.m., 10.45 a.m. and 5.15 p.m.",
  },
  {
    question: "How do I get there?",
    answer:
      "The nearest MRT is Commonwealth (EW20), about a 15-minute walk. Buses stop at Aft C’wealth Drive (11041) and Opp Blessed Sacrament Ch (11049). The church is at 1 Commonwealth Drive, Singapore 149603, along Queensway facing Commonwealth Drive.",
  },
  {
    question: "Is there parking?",
    answer:
      "Parking within the compound is limited. Public car parks are a short walk away. Allow extra time on weekends, especially around the 9.00 a.m. and 11.00 a.m. English Masses.",
  },
  {
    question: "How do I enquire about baptism, marriage, or a Mass intention?",
    answer:
      "Write to the parish office at bsc.secretariat@catholic.org.sg or call +65 6474 0582 during office hours. WhatsApp messaging is available on +65 9170 9133 during office hours only.",
  },
  {
    question: "When is the parish office open?",
    answer:
      "Monday to Friday 10.00 a.m. to 6.00 p.m.; Saturday and Sunday 9.00 a.m. to 6.00 p.m. Closed for lunch from 1.00 p.m. to 2.00 p.m.",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    title: "Corpus Christi",
    date: "Thursday after Trinity",
    summary:
      "The parish feast — Most Holy Body and Blood of Christ. Mass and procession under the tent of meeting, the day our mission was named.",
    category: "Devotion",
  },
  {
    title: "First Friday · Sacred Heart",
    date: "First Friday of each month",
    summary:
      "Eucharistic Adoration and devotion to the Sacred Heart of Jesus at 7.00 p.m. after the 6.30 p.m. Mass. Overnight vigil from 10.00 p.m. to 5.00 a.m.",
    category: "Devotion",
  },
  {
    title: "RCIA enquiry",
    date: "Year-round",
    summary:
      "Adults seeking baptism or full communion with the Catholic Church. Begin with the parish office — formation walks toward the Easter Vigil.",
    category: "Formation",
  },
  {
    title: "Parish catechism",
    date: "Sundays in term",
    summary:
      "Faith formation for children and the confirmation journey. Enquire through the parish office or the pastoral associate.",
    category: "Formation",
  },
  {
    title: "KKIS Indonesian community",
    date: "Last Sunday of each month",
    summary:
      "Indonesian Mass at 1.00 p.m. Fr Sambodo Sru Ujianto, SS.CC, is chaplain of KKIS — the Indonesian Catholic Community in Singapore.",
    category: "Parish",
  },
  {
    title: "Archdiocesan news",
    date: "Ongoing",
    summary:
      "Feasts, formation, and the life of the local Church. Follow Catholic.sg and the parish Facebook page for the weekly touchpoint.",
    category: "Archdiocese",
    href: "https://www.catholic.sg/",
  },
];

export const givingOptions: GivingOption[] = [
  {
    name: "PayNow",
    description:
      "Give via PayNow at the parish office. The UEN is issued there so the gift is receipted to Blessed Sacrament Church.",
    icon: "globe",
  },
  {
    name: "General Church Offering",
    description:
      "The Sunday collection that keeps the Tent of Meeting — liturgy, lights, and the daily life of Queenstown’s parish.",
    icon: "flame",
  },
  {
    name: "Poor & Needy",
    description:
      "Alms that meet Christ in Queenstown’s poor. Ask the office to direct a gift to pastoral care.",
    icon: "hand-heart",
  },
  {
    name: "Church Maintenance",
    description:
      "The conserved 1965 tent still needs its keepers — roof, pews, air, and sound after the 2023 restoration.",
    icon: "landmark",
  },
  {
    name: "Cheque",
    description: "Payable to Blessed Sacrament Church, posted or handed in at the parish office.",
    icon: "book",
  },
  {
    name: "Cash at the office",
    description:
      "Offerings received during office hours at 1 Commonwealth Drive. A receipt is issued on request.",
    icon: "heart",
  },
  {
    name: "Mass offerings",
    description:
      "Intentions for the living and the dead. Enquire at the parish office before the intended date.",
    icon: "sprout",
  },
  {
    name: "Thanksgiving for restoration",
    description:
      "Gifts in thanksgiving for the Tent of Meeting Restoration — the $9.4 million work that reopened the church in 2023.",
    icon: "church",
  },
];

export const serveRoles = [
  {
    title: "Liturgical ministers",
    summary:
      "Serve at the altar, in the choir, as a reader or hospitality minister. The Mass is the parish’s first work.",
  },
  {
    title: "Catechists & facilitators",
    summary:
      "Walk with children, confirmation candidates, and RCIA enquirers. Formation is how a Eucharistic people grows.",
  },
  {
    title: "Pastoral care",
    summary:
      "Visit the sick, sit with the bereaved, and meet the poor of Queenstown. St Damien’s charity is still the pattern.",
  },
  {
    title: "Hospitality & grounds",
    summary:
      "Keep the tent ready — ushers, cleaners, gardeners, and those who notice the stranger at the door.",
  },
] as const;

export const devotions = [
  {
    title: "Divine Mercy",
    when: "Friday, 8.00 p.m.",
    where: "Main Church",
  },
  {
    title: "Novena to Our Lady",
    when: "Saturday, 5.00 p.m.",
    where: "Main Church, before sunset Mass",
  },
  {
    title: "Sacred Heart of Jesus",
    when: "First Friday, 7.00 p.m. after the 6.30 p.m. Mass",
    where: "Eucharistic Adoration · vigil 10.00 p.m.–5.00 a.m.",
  },
  {
    title: "Immaculate Heart of Mary",
    when: "First Saturday, 9.00 a.m. after the 8.30 a.m. Mass",
    where: "Eucharistic Adoration · Tamil vigil 9.00 p.m.–5.00 a.m.",
  },
  {
    title: "Intercessory prayers",
    when: "Second Friday, 7.45 p.m.",
    where: "Main Church",
  },
  {
    title: "Daily Adoration",
    when: "Daily, 9.00 a.m.–9.00 p.m.",
    where: "Adoration Chapel",
  },
] as const;

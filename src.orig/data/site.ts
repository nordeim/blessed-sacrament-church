/**
 * Canonical site constants — single source for address, contact, and
 * map URLs so Footer + Worship + any future page cannot drift.
 * Verified against bsc.org.sg (2026).
 */
export const site = {
  name: "Blessed Sacrament Church",
  shortName: "BSC Queenstown",
  chineseName: "圣体堂",
  tagline: "To be an evangelising church with a Eucharistic spirituality.",
  vision: "A tent of meeting in Queenstown.",
  congregation: "Congregation of the Sacred Hearts of Jesus and Mary (SS.CC)",
  address: {
    street: "1 Commonwealth Drive",
    city: "Singapore",
    zip: "149603",
    get full() {
      return `${this.street}, ${this.city} ${this.zip}`;
    },
    get query() {
      return encodeURIComponent(this.full);
    },
  },
  hours: {
    gates: "Daily, 9.00 a.m.–9.00 p.m.",
    mainChurch:
      "Saturday 5.00–7.30 p.m.; Sunday 8.30 a.m.–12.30 p.m. and 5.00–7.00 p.m.; open for weekday Mass.",
    chapel: "Adoration Chapel, daily 9.00 a.m.–9.00 p.m.",
    reception:
      "Mon–Fri 10.00 a.m.–6.00 p.m.; Sat–Sun 9.00 a.m.–6.00 p.m. Closed for lunch 1.00–2.00 p.m.",
    parishOffice:
      "Mon–Fri 10.00 a.m.–6.00 p.m.; Sat–Sun 9.00 a.m.–6.00 p.m. Closed for lunch 1.00–2.00 p.m.",
    adorationRoom: "Daily, 9.00 a.m.–9.00 p.m.",
  },
  mass: {
    weekdayMorning: "Mon–Fri, 8.30 a.m. and 12.30 p.m. — Main Church",
    weekdayEvening: "Mon–Fri, 6.30 p.m. — Main Church",
    saturday: "8.30 a.m. English · 6.00 p.m. English sunset · 7.30 p.m. Tamil (3rd Saturday only)",
    sunday: [
      "7.30 a.m. Mandarin",
      "9.00 a.m. English",
      "11.00 a.m. English",
      "1.00 p.m. Indonesian (last Sunday only)",
      "3.15 p.m. Tagalog (English on the 3rd Sunday)",
      "5.30 p.m. English",
    ],
    confession:
      "Weekdays: after the 8.30 a.m. Mass (until 9.00 a.m.) and 15 minutes before the 12.30 p.m. and 6.30 p.m. Masses. Saturday: after the 8.30 a.m. Mass and from 5.45 p.m. Sunday: 7.15 a.m., 8.45 a.m., 10.45 a.m. and 5.15 p.m.",
    adoration: "Adoration Chapel, daily 9.00 a.m.–9.00 p.m.",
    secondCollection: "Announced in the parish bulletin",
    note: "On public holidays there is only the 8.30 a.m. Mass. All Masses are held in the Main Church unless otherwise indicated.",
  },
  contact: {
    parishPriestPhone: "+65 6474 0582",
    officePhone: "+65 6474 0582",
    emergencyPhone: "+65 9170 9133",
    email: "bsc.secretariat@catholic.org.sg",
    connectEmail: "bsc.comms@catholic.org.sg",
    pastoralEmail: "bsc.pastoral@catholic.org.sg",
    chinesePastoralEmail: "cathy.bsc@catholic.org.sg",
    youthEmail: "bsc.youthpastoral@catholic.org.sg",
    whatsappHotline: "+65 9170 9133",
  },
  transport: {
    mrt: "Commonwealth (EW20), about a 15-minute walk",
    buses:
      "Aft C’wealth Drive (11041): 51, 93, 100, 123, 147, 153, 196, 198, 855, 961, 961M · Opp Blessed Sacrament Ch (11049): 51, 61, 93, 100, 123, 147, 153, 196, 198, 855, 961, 961M",
  },
  feast: {
    name: "Corpus Christi · Most Holy Body and Blood of Christ",
    date: "Thursday after Trinity",
  },
  chequePayee: "Blessed Sacrament Church",
  facebook: "https://www.facebook.com/mybsc.sg/",
  instagram: "https://www.instagram.com/mybsc.sg/",
  whatsapp: "https://wa.me/6591709133",
  parishUpdates: "https://www.bsc.org.sg/",
  archdiocese: "https://www.catholic.sg/",
  sacredHearts: "https://www.ssccpicpus.com/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=1+Commonwealth+Drive+Singapore+149603",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=1+Commonwealth+Drive,+Singapore+149603&output=embed",
  origin: "https://www.bsc.org.sg",
  get url() {
    return `${this.origin}/`;
  },
  get ogImage() {
    return `${this.origin}/images/hero-church.jpg`;
  },
} as const;

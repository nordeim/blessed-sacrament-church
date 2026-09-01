export const site = {
  name: "Church of the Blessed Sacrament",
  shortName: "Blessed Sacrament Church",
  tagline: "A Household of Faith, Hope & Love.",
  vision:
    "To be a vibrant Eucharistic community, drawing all to Christ through worship, formation, and service.",
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
    church: "Daily 9:00 AM – 9:00 PM",
    office: "Mon–Fri 9:00 AM – 5:30 PM",
    reception: "Mon–Fri 9:00 AM – 5:30 PM",
    adoration: "Daily 9:00 AM – 9:00 PM",
    confessionWeekday: "Mon–Fri after 8:30 AM Mass & before 12:30 PM / 6:30 PM Mass",
    confessionWeekend: "Sat after 8:30 AM Mass & before 5:45 PM Mass; Sun before all Masses",
  },
  mass: {
    weekdayMorning: "Mon–Fri 8:30 AM",
    weekdayNoon: "Mon–Fri 12:30 PM",
    weekdayEvening: "Mon–Fri 6:30 PM",
    saturday: "8:30 AM & 6:00 PM (English)",
    sunday: [
      { time: "7:30 AM", language: "Mandarin" },
      { time: "9:00 AM", language: "English" },
      { time: "11:00 AM", language: "English" },
      { time: "1:00 PM", language: "Indonesian (Last Sunday only)" },
      { time: "3:15 PM", language: "Tagalog (except 3rd Sunday — English)" },
      { time: "5:30 PM", language: "English" },
    ],
    saturdayTamil: "7:30 PM (Tamil — 3rd Saturday only)",
    confession: "Weekdays after 8:30 AM & before 12:30 PM / 6:30 PM; Sat after 8:30 AM & before 5:45 PM; Sun before all Masses",
    adoration: "Daily 9:00 AM – 9:00 PM",
    note: "On public holidays, there will only be 8:30 AM Mass.",
  },
  contact: {
    officePhone: "+65 6474 0582",
    fax: "+65 6472 6545",
    email: "secretariat@bsc.org.sg",
    connectEmail: "secretariat@bsc.org.sg",
  },
  transport: {
    mrt: "Queenstown (EW19) · Commonwealth (EW20)",
    buses: "Commonwealth Drive: 32, 51, 111, 122, 145, 195, 855",
  },
  feast: {
    name: "The Most Holy Body and Blood of Christ (Corpus Christi)",
    date: "Sunday after Trinity Sunday",
  },
  uen: "T08CC1234A",
  chequePayee: "Church of the Blessed Sacrament",
  facebook: "https://www.facebook.com/blessedsacramentsg",
  instagram: "https://www.instagram.com/blessedsacramentsg",
  youtube: "https://www.youtube.com/@blessedsacramentsg",
  archdiocese: "https://www.catholic.sg",
  mapsUrl: "https://www.google.com/maps?q=1+Commonwealth+Drive,+Singapore+149603",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=1+Commonwealth+Drive,+Singapore+149603&output=embed",
  url: "https://bsc.org.sg/",
  ogImage: "https://bsc.org.sg/images/hero-church.jpg",
} as const;

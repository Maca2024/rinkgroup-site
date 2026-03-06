export type Locale = 'en' | 'nl' | 'fi' | 'ar';

export interface Translations {
  nav: {
    vision: string;
    ventures: string;
    heritage: string;
    philanthropy: string;
    contact: string;
  };
  hero: {
    tagline: string;
    established: string;
    scroll: string;
  };
  vision: {
    label: string;
    headline: string;
    accentWord: string;
    body1: string;
    body2: string;
  };
  marquee1: string;
  marquee2: string;
  pillars: {
    label: string;
    title: string;
    titleAccent: string;
    items: {
      number: string;
      title: string;
      subtitle: string;
      body: string;
      stat: string;
      statLabel: string;
    }[];
  };
  heritage: {
    label: string;
    motto: string;
    mottoTranslation: string;
    values: {
      latin: string;
      english: string;
      icon: string;
      text: string;
    }[];
  };
  philanthropy: {
    label: string;
    title: string;
    titleAccent: string;
    intro: string;
    dogTitle: string;
    dogBody: string;
    dogStat: string;
    dogStatLabel: string;
    quote: string;
  };
  contact: {
    label: string;
    title: string;
    titleAccent: string;
    body: string;
  };
  footer: {
    copyright: string;
  };
  langSwitch: {
    en: string;
    nl: string;
    fi: string;
    ar: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      vision: 'Vision',
      ventures: 'Ventures',
      heritage: 'Heritage',
      philanthropy: 'Foundation',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Strategic Ventures · Nordic Heritage · Global Ambition',
      established: 'Est. Finland — Netherlands',
      scroll: 'Scroll',
    },
    vision: {
      label: 'Our Philosophy',
      headline: 'Crafting legacies that outlast generations',
      accentWord: 'outlast',
      body1:
        'Rink Group moves at the intersection of Nordic resolve and time-honoured principle. We do not chase trends — we erect structures that compound value across decades, jurisdictions, and bloodlines. Guided by a deep command of autonomous systems and systems thinking, we architect solutions that are self-sustaining, adaptive, and built to endure.',
      body2:
        'From the ancient taiga forests of Finland to the trading floors of Amsterdam, our portfolio embodies a single conviction: that the greatest returns are born of patience, integrity, and the rare courage to think in centuries rather than cycles. We implement. We do not merely theorize.',
    },
    marquee1: 'LUMEN FELICIS',
    marquee2: 'FAMILY · NATURE · ADVENTURE · CREATIVITY · TAIGASCHOOL · AETHERLINK',
    pillars: {
      label: 'Portfolio',
      title: 'Our',
      titleAccent: 'Ventures',
      items: [
        {
          number: 'I',
          title: 'Family',
          subtitle: 'The Foundation of Everything',
          body: 'Family is the origin and the destination. Every structure we build, every venture we pursue, exists to serve the people we love. Generational thinking begins at the dinner table — in loyalty, in presence, and in the courage to protect what matters most across every border and every season.',
          stat: '∞',
          statLabel: 'unconditional',
        },
        {
          number: 'II',
          title: 'Nature',
          subtitle: 'TaigaSchool Wilderness',
          body: 'Regenerative eco-hospitality set within the Kuusamo wilderness. Boutique cabins, Northern Lights ceremonies, and profound forest immersion. Where primeval taiga meets contemporary sanctuary.',
          stat: '180 ha',
          statLabel: 'pristine forest',
        },
        {
          number: 'III',
          title: 'Adventure',
          subtitle: 'Global Exploration',
          body: 'Venturing across borders, cultures, and continents to discover what lies beyond the familiar. From the fjords of Scandinavia to distant shores — we believe the most transformative growth is born from relentless curiosity, creative risk-taking, and the courage to explore uncharted territory.',
          stat: '30+',
          statLabel: 'countries explored',
        },
        {
          number: 'IV',
          title: 'Creativity',
          subtitle: 'Design & Expression',
          body: 'The creative impulse runs through everything we build. From visual identity and brand architecture to spatial design and digital artistry — we believe that beauty, craft, and originality are not luxuries but foundations. Every venture carries a signature aesthetic born of intention.',
          stat: '∞',
          statLabel: 'infinite expression',
        },
        {
          number: 'V',
          title: 'TaigaSchool',
          subtitle: 'The Canvas · The Focus',
          body: 'A 2.5-hectare creative campus nestled within the 180-hectare wilderness estate. TaigaSchool is where nature, education, and entrepreneurship converge — a living laboratory for regenerative hospitality, creative retreats, and transformative learning experiences.',
          stat: '2.5 ha',
          statLabel: 'creative campus',
        },
        {
          number: 'VI',
          title: 'AetherLink',
          subtitle: 'AI · Systems Thinking',
          body: 'AI consulting and intelligent automation at the highest level. We architect the systems that transform enterprises into adaptive, self-optimizing organisms. From agent ecosystems to strategic digital transformation — guided by a deep mastery of autonomous systems and systems thinking.',
          stat: 'AI-First',
          statLabel: 'systems thinking',
        },
      ],
    },
    heritage: {
      label: 'Our Heritage',
      motto: '\u201CLumen Felicis\u201D',
      mottoTranslation: 'The Light of Blessed Fortune',
      values: [
        { latin: 'Prudentia', english: 'Prudence', icon: '◈', text: 'We measure twice and act with unwavering conviction. Strategic patience is our deepest competitive advantage.' },
        { latin: 'Integritas', english: 'Integrity', icon: '◇', text: 'Our word is our bond. In every jurisdiction, every partnership, every handshake across every border.' },
        { latin: 'Fortitudo', english: 'Fortitude', icon: '△', text: 'We build for decades, not quarters. True wealth compounds through resilience across long cycles of time.' },
        { latin: 'Humanitas', english: 'Humanity', icon: '○', text: 'Technology serves people. Nature nurtures people. Every living being, without exception, deserves dignity.' },
      ],
    },
    philanthropy: {
      label: 'Foundation',
      title: 'The Lives That',
      titleAccent: 'Matter Most',
      intro: 'Beyond commerce, Rink Group holds a foundational commitment to the welfare of those who cannot speak for themselves. Our philanthropic mission is deeply personal, non-negotiable, and woven into the very fabric of who we are.',
      dogTitle: 'Canine Welfare Initiative',
      dogBody: 'The life, wellness, and dignity of dogs stands as one of our core foundational commitments. We believe a civilization is measured by how it treats its most loyal companions. From rescue operations to sanctuary funding, from veterinary access to advocacy — we invest in a world where every dog knows safety, warmth, and love.',
      dogStat: '∞',
      dogStatLabel: 'unconditional',
      quote: '"The greatness of a nation can be judged by the way its animals are treated." — Mahatma Gandhi',
    },
    contact: {
      label: 'Connect',
      title: 'Begin the',
      titleAccent: 'conversation',
      body: 'For partnership inquiries, investment opportunities, or strategic collaboration at the highest level.',
    },
    footer: {
      copyright: 'Rink Group OY',
    },
    langSwitch: {
      en: 'EN',
      nl: 'NL',
      fi: 'FI',
      ar: 'عربي',
    },
  },

  nl: {
    nav: {
      vision: 'Visie',
      ventures: 'Ondernemingen',
      heritage: 'Erfgoed',
      philanthropy: 'Stichting',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Strategische ondernemingen · Noords erfgoed · Wereldwijde ambitie',
      established: 'Opgericht in Finland — Nederland',
      scroll: 'Scroll',
    },
    vision: {
      label: 'Onze Filosofie',
      headline: 'Nalatenschappen bouwen die generaties overleven',
      accentWord: 'overleven',
      body1:
        'Rink Group beweegt op het snijvlak van Noordse vastberadenheid en beproefde principes. Wij jagen geen trends na — wij bouwen structuren die waarde vermenigvuldigen over decennia, jurisdicties en generaties heen. Met een diepgaand begrip van autonome systemen en systeemdenken ontwerpen wij oplossingen die duurzaam, adaptief en gebouwd zijn om te blijven bestaan.',
      body2:
        'Van de oeroude taigawouden van Finland tot de handelsvloeren van Amsterdam weerspiegelt ons portfolio één overtuiging: dat het grootste rendement voortkomt uit geduld, integriteit en de zeldzame moed om in eeuwen te denken in plaats van kwartalen. Wij implementeren. Wij theoretiseren niet.',
    },
    marquee1: 'LUMEN FELICIS',
    marquee2: 'FAMILIE · NATUUR · AVONTUUR · CREATIVITEIT · TAIGASCHOOL · AETHERLINK',
    pillars: {
      label: 'Portfolio',
      title: 'Onze',
      titleAccent: 'Ondernemingen',
      items: [
        {
          number: 'I',
          title: 'Familie',
          subtitle: 'De Basis van Alles',
          body: 'Familie is de oorsprong en de bestemming. Elke structuur die wij bouwen, elke onderneming die wij nastreven, bestaat om de mensen te dienen van wie wij houden. Generatiedenken begint aan de eettafel — in loyaliteit, in aanwezigheid, en in de moed om te beschermen wat het meest telt, over elke grens en elk seizoen heen.',
          stat: '∞',
          statLabel: 'onvoorwaardelijk',
        },
        {
          number: 'II',
          title: 'Natuur',
          subtitle: 'TaigaSchool Wildernis',
          body: 'Regeneratieve eco-gastvrijheid in de wildernis van Kuusamo. Boutique-cabins, noorderlicht-ervaringen en diepe onderdompeling in het woud. Waar de oeroude taiga het hedendaagse toevluchtsoord ontmoet.',
          stat: '180 ha',
          statLabel: 'ongerept bos',
        },
        {
          number: 'III',
          title: 'Avontuur',
          subtitle: 'Wereldverkenning',
          body: 'Grenzen, culturen en continenten verkennen om te ontdekken wat voorbij het bekende ligt. Van de fjorden van Scandinavië tot verre kusten — wij geloven dat de meest transformerende groei voortkomt uit onophoudelijke nieuwsgierigheid, creatief lef en de moed om onontgonnen terrein te betreden.',
          stat: '30+',
          statLabel: 'landen verkend',
        },
        {
          number: 'IV',
          title: 'Creativiteit',
          subtitle: 'Ontwerp & Expressie',
          body: 'De creatieve impuls doorloopt alles wat wij bouwen. Van visuele identiteit en merkarchitectuur tot ruimtelijk ontwerp en digitale artistry — wij geloven dat schoonheid, vakmanschap en originaliteit geen luxe zijn maar fundamenten. Elke onderneming draagt een kenmerkende esthetiek geboren uit intentie.',
          stat: 'Oneindig',
          statLabel: 'oneindige expressie',
        },
        {
          number: 'V',
          title: 'TaigaSchool',
          subtitle: 'Het Canvas · De Focus',
          body: 'Een creatieve campus van 2,5 hectare genesteld in het 180 hectare grote wildernisdomein. TaigaSchool is waar natuur, educatie en ondernemerschap samenkomen — een levend laboratorium voor regeneratieve gastvrijheid, creatieve retraites en transformerende leerervaringen.',
          stat: '2,5 ha',
          statLabel: 'creatieve campus',
        },
        {
          number: 'VI',
          title: 'AetherLink',
          subtitle: 'AI · Systeemdenken',
          body: 'AI-consulting en intelligente automatisering op het hoogste niveau. Wij ontwerpen systemen die ondernemingen transformeren tot adaptieve, zelfoptimaliserende organismen. Van agent-ecosystemen tot strategische digitale transformatie — gedragen door een diepgaande beheersing van autonome systemen en systeemdenken.',
          stat: 'AI-First',
          statLabel: 'systeemdenken',
        },
      ],
    },
    heritage: {
      label: 'Ons Erfgoed',
      motto: '\u201CLumen Felicis\u201D',
      mottoTranslation: 'Het Licht van het Gezegende Fortuin',
      values: [
        { latin: 'Prudentia', english: 'Bezonnenheid', icon: '◈', text: 'Wij meten tweemaal en handelen met onwrikbare overtuiging. Strategisch geduld is ons diepste concurrentievoordeel.' },
        { latin: 'Integritas', english: 'Integriteit', icon: '◇', text: 'Ons woord is onze bond. In elke jurisdictie, elk partnerschap, elke handdruk over elke grens heen.' },
        { latin: 'Fortitudo', english: 'Standvastigheid', icon: '△', text: 'Wij bouwen voor decennia, niet voor kwartalen. Ware welvaart groeit door veerkracht over lange tijdsspannes.' },
        { latin: 'Humanitas', english: 'Menselijkheid', icon: '○', text: 'Technologie dient mensen. Natuur koestert mensen. Elk levend wezen verdient, zonder uitzondering, waardigheid.' },
      ],
    },
    philanthropy: {
      label: 'Stichting',
      title: 'De Levens Die',
      titleAccent: 'Er Werkelijk Toe Doen',
      intro: 'Voorbij de handel draagt Rink Group een fundamentele toewijding aan het welzijn van hen die niet voor zichzelf kunnen spreken. Onze filantropische missie is diep persoonlijk, niet-onderhandelbaar en verweven in het weefsel van wie wij zijn.',
      dogTitle: 'Hondenwelzijn Initiatief',
      dogBody: 'Het leven, welzijn en de waardigheid van honden is een van onze kernfundamentele verplichtingen. Wij geloven dat een beschaving wordt gemeten aan hoe zij haar meest loyale metgezellen behandelt. Van reddingsoperaties tot asielfinanciering, van toegang tot dierenartsen tot belangenbehartiging — wij investeren in een wereld waarin elke hond veiligheid, warmte en liefde kent.',
      dogStat: '∞',
      dogStatLabel: 'onvoorwaardelijk',
      quote: '"De grootheid van een natie kan worden afgemeten aan de manier waarop haar dieren worden behandeld." — Mahatma Gandhi',
    },
    contact: {
      label: 'Contact',
      title: 'Begin het',
      titleAccent: 'gesprek',
      body: 'Voor samenwerkingsvragen, investeringskansen of strategische samenwerking op het hoogste niveau.',
    },
    footer: {
      copyright: 'Rink Group OY',
    },
    langSwitch: {
      en: 'EN',
      nl: 'NL',
      fi: 'FI',
      ar: 'عربي',
    },
  },

  fi: {
    nav: {
      vision: 'Visio',
      ventures: 'Hankkeet',
      heritage: 'Perintö',
      philanthropy: 'Säätiö',
      contact: 'Yhteystiedot',
    },
    hero: {
      tagline: 'Strategiset hankkeet · Pohjoismainen perintö · Globaali kunnianhimo',
      established: 'Perustettu Suomessa — Alankomaissa',
      scroll: 'Vieritä',
    },
    vision: {
      label: 'Filosofiamme',
      headline: 'Rakennamme perinnön joka kestää sukupolvet',
      accentWord: 'kestää',
      body1:
        'Rink Group toimii pohjoismaisen sitkeyyden ja ajassa koettelemattomien periaatteiden leikkauspisteessä. Emme jahtaa trendejä — rakennamme rakenteita, jotka kasvattavat arvoa vuosikymmenten, oikeusjärjestelmien ja sukupolvien yli. Syvä ymmärrys autonomisista järjestelmistä ja systeemiajattelusta ohjaa työtämme: luomme ratkaisuja, jotka ovat itsekantavia, mukautuvia ja tehty kestämään.',
      body2:
        'Suomen ikuisten taigametsien reunamilta Amsterdamin kauppahalleihin — portfoliomme kiteyttää yhden vakaumuksen: suurimmat tuotot syntyvät kärsivällisyydestä, rehellisyydestä ja harvinaisesta rohkeudesta ajatella vuosisatojen mittakaavassa. Me toteutamme. Emme pelkästään teorisoi.',
    },
    marquee1: 'LUMEN FELICIS',
    marquee2: 'PERHE · LUONTO · SEIKKAILU · LUOVUUS · TAIGASCHOOL · AETHERLINK',
    pillars: {
      label: 'Portfolio',
      title: 'Meidän',
      titleAccent: 'Hankkeemme',
      items: [
        {
          number: 'I',
          title: 'Perhe',
          subtitle: 'Kaiken Perusta',
          body: 'Perhe on alku ja päämäärä. Jokainen rakenne jonka pystytämme, jokainen hanke jota tavoittelemme, on olemassa palvellakseen niitä ihmisiä joita rakastamme. Sukupolvien ajattelu alkaa ruokapöydästä — uskollisuudessa, läsnäolossa ja rohkeudessa suojella sitä mikä merkitsee eniten, yli rajojen ja vuodenaikojen.',
          stat: '∞',
          statLabel: 'ehdoton',
        },
        {
          number: 'II',
          title: 'Luonto',
          subtitle: 'TaigaSchool Erämaa',
          body: 'Uudistava ekomajoitus Kuusamon erämaan sydämessä. Boutique-mökit, revontulikokemukset ja syvä metsäelämys. Siellä missä ikivanha taiga kohtaa nykyaikaisen turvapaikan.',
          stat: '180 ha',
          statLabel: 'koskematonta metsää',
        },
        {
          number: 'III',
          title: 'Seikkailu',
          subtitle: 'Maailman tutkiminen',
          body: 'Rajojen, kulttuurien ja mantereiden tutkimista löytääksemme sen, mikä odottaa tutun tuolla puolen. Skandinavian vuonoilta kaukaisille rannoille — uskomme, että muuttavin kasvu syntyy lakkaamattomasta uteliaisuudesta, luovasta riskinotosta ja rohkeudesta tutkia kartoittamattomia alueita.',
          stat: '30+',
          statLabel: 'tutkittua maata',
        },
        {
          number: 'IV',
          title: 'Luovuus',
          subtitle: 'Muotoilu & Ilmaisu',
          body: 'Luova impulssi kulkee läpi kaiken mitä rakennamme. Visuaalisesta identiteetistä ja brändi-arkkitehtuurista tilasuunnitteluun ja digitaaliseen taiteeseen — uskomme, että kauneus, käsityötaito ja omaperäisyys eivät ole ylellisyyttä vaan perustuksia. Jokaisella hankkeella on intentioista syntynyt erottuva estetiikka.',
          stat: '∞',
          statLabel: 'rajaton ilmaisu',
        },
        {
          number: 'V',
          title: 'TaigaSchool',
          subtitle: 'Kanvaasi · Fokus',
          body: '2,5 hehtaarin luova kampus 180 hehtaarin erämaatilan sydämessä. TaigaSchool on paikka, jossa luonto, koulutus ja yrittäjyys kohtaavat — elävä laboratorio uudistavalle vieraanvaraisuudelle, luoville retriiteille ja muuttaville oppimiskokemuksille.',
          stat: '2,5 ha',
          statLabel: 'luova kampus',
        },
        {
          number: 'VI',
          title: 'AetherLink',
          subtitle: 'AI · Systeemiajattelu',
          body: 'Tekoälykonsultointi ja älykäs automaatio huipputasolla. Arkkitehtuurimme muuttaa yritykset mukautuviksi, itseään optimoiviksi organismeiksi. Agenttiekosysteemeistä strategiseen digitaaliseen transformaatioon — syvä hallinta autonomisista järjestelmistä ja systeemiajattelusta.',
          stat: 'AI-First',
          statLabel: 'systeemiajattelu',
        },
      ],
    },
    heritage: {
      label: 'Perintömme',
      motto: '\u201CLumen Felicis\u201D',
      mottoTranslation: 'Autuaan Onnen Valo',
      values: [
        { latin: 'Prudentia', english: 'Harkitsevuus', icon: '◈', text: 'Mittaamme kahdesti ja toimimme horjumattomalla vakaumuksella. Strateginen kärsivällisyys on syvin kilpailuetumme.' },
        { latin: 'Integritas', english: 'Rehellisyys', icon: '◇', text: 'Sanamme on sitoumuksemme. Jokaisessa oikeusjärjestelmässä, kumppanuudessa ja kädenpuristuksessa rajojen yli.' },
        { latin: 'Fortitudo', english: 'Lujuus', icon: '△', text: 'Rakennamme vuosikymmeniksi, emme neljännesvuosiksi. Todellinen varallisuus kertyy pitkän aikavälin sitkeydestä.' },
        { latin: 'Humanitas', english: 'Ihmisyys', icon: '○', text: 'Teknologia palvelee ihmisiä. Luonto hoivaa ihmisiä. Jokainen elävä olento ansaitsee ilman poikkeusta arvonsa.' },
      ],
    },
    philanthropy: {
      label: 'Säätiö',
      title: 'Elämät Jotka',
      titleAccent: 'Todella Merkitsevät',
      intro: 'Liiketoiminnan tuolla puolen Rink Groupilla on perustavanlaatuinen sitoumus niiden hyvinvointiin, jotka eivät voi puhua puolestaan. Hyväntekeväisyystehtävämme on syvästi henkilökohtainen, ehdoton ja kudottu sisään siihen, mitä me olemme.',
      dogTitle: 'Koirien Hyvinvointihanke',
      dogBody: 'Koirien elämä, hyvinvointi ja arvokkuus on yksi keskeisimmistä sitoumuksistamme. Uskomme, että sivilisaatiota mitataan sillä, miten se kohtelee uskollisimpia kumppaneitaan. Pelastusoperaatioista turvakotirahoitukseen, eläinlääkäripalveluista edunvalvontaan — investoimme maailmaan, jossa jokainen koira tuntee turvan, lämmön ja rakkauden.',
      dogStat: '∞',
      dogStatLabel: 'ehdoton',
      quote: '"Kansakunnan suuruus voidaan arvioida siitä, miten sen eläimiä kohdellaan." — Mahatma Gandhi',
    },
    contact: {
      label: 'Ota yhteyttä',
      title: 'Aloita',
      titleAccent: 'keskustelu',
      body: 'Kumppanuustiedusteluihin, sijoitusmahdollisuuksiin tai strategiseen yhteistyöhön korkeimmalla tasolla.',
    },
    footer: {
      copyright: 'Rink Group OY',
    },
    langSwitch: {
      en: 'EN',
      nl: 'NL',
      fi: 'FI',
      ar: 'عربي',
    },
  },

  ar: {
    nav: {
      vision: 'الرؤية',
      ventures: 'المشاريع',
      heritage: 'التراث',
      philanthropy: 'المؤسسة',
      contact: 'تواصل',
    },
    hero: {
      tagline: 'مشاريع استراتيجية · تراث شمالي · طموح عالمي',
      established: 'تأسست في فنلندا — هولندا',
      scroll: 'مرّر',
    },
    vision: {
      label: 'فلسفتنا',
      headline: 'نصنع إرثاً يتخطى الأجيال',
      accentWord: 'يتخطى',
      body1:
        'تسير مجموعة رينك عند تقاطع الصمود الشمالي والمبادئ التي أثبتت الأزمنة صلاحيتها. لا نلاحق الاتجاهات العابرة — بل نشيّد هياكل تضاعف قيمتها عبر العقود والولايات القضائية والأجيال. يرشدنا فهم عميق للأنظمة المستقلة والتفكير المنظومي في تصميم حلول ذاتية الاستدامة، متكيفة، وقابلة للديمومة.',
      body2:
        'من غابات التايغا الأزلية في فنلندا إلى قاعات التداول في أمستردام، تجسّد محفظتنا قناعة راسخة واحدة: أن أعظم العوائد تولد من رحم الصبر والنزاهة والشجاعة النادرة للتفكير بمقياس القرون لا الدورات. نحن ننفّذ. لا نكتفي بالتنظير.',
    },
    marquee1: 'لومين فيليسيس',
    marquee2: 'العائلة · الطبيعة · المغامرة · الإبداع · TAIGASCHOOL · AETHERLINK',
    pillars: {
      label: 'المحفظة',
      title: '',
      titleAccent: 'مشاريعنا',
      items: [
        {
          number: 'I',
          title: 'العائلة',
          subtitle: 'أساس كل شيء',
          body: 'العائلة هي البداية والغاية. كل بنية نشيّدها، وكل مشروع نسعى إليه، موجود لخدمة من نحب. التفكير عبر الأجيال يبدأ على مائدة العشاء — في الولاء، في الحضور، وفي الشجاعة لحماية ما يهمّ أكثر من أي شيء، عبر كل حدود وكل فصل.',
          stat: '∞',
          statLabel: 'بلا حدود',
        },
        {
          number: 'II',
          title: 'الطبيعة',
          subtitle: 'برية TaigaSchool',
          body: 'ضيافة بيئية تجديدية في قلب برية كوسامو. أكواخ فاخرة، وتجارب الشفق القطبي، وانغمار عميق في صميم الغابة. حيث تلتقي غابة التايغا الأزلية بالملاذ المعاصر.',
          stat: '١٨٠ هكتار',
          statLabel: 'غابة بكر',
        },
        {
          number: 'III',
          title: 'المغامرة',
          subtitle: 'استكشاف العالم',
          body: 'عبور الحدود والثقافات والقارات لاكتشاف ما يكمن وراء المألوف. من مضايق إسكندنافيا إلى الشواطئ البعيدة — نؤمن أن النمو الأكثر تحولاً يولد من الفضول الذي لا يتوقف، والجرأة الإبداعية، والشجاعة لاستكشاف أراضٍ مجهولة.',
          stat: '+٣٠',
          statLabel: 'دولة مُستكشَفة',
        },
        {
          number: 'IV',
          title: 'الإبداع',
          subtitle: 'التصميم والتعبير',
          body: 'النبض الإبداعي يسري في كل ما نبنيه. من الهوية البصرية وهندسة العلامة التجارية إلى التصميم المكاني والفن الرقمي — نؤمن أن الجمال والحرفية والأصالة ليست رفاهيات بل أسس. كل مشروع يحمل بصمة جمالية مميزة وُلدت من قصد.',
          stat: '∞',
          statLabel: 'تعبير لا محدود',
        },
        {
          number: 'V',
          title: 'TaigaSchool',
          subtitle: 'اللوحة · التركيز',
          body: 'حرم إبداعي بمساحة ٢٫٥ هكتار يقع ضمن عقار البرية الممتد على ١٨٠ هكتار. TaigaSchool هو حيث تلتقي الطبيعة والتعليم وريادة الأعمال — مختبر حيّ للضيافة التجديدية والخلوات الإبداعية وتجارب التعلّم التحويلية.',
          stat: '٢٫٥ هكتار',
          statLabel: 'حرم إبداعي',
        },
        {
          number: 'VI',
          title: 'AetherLink',
          subtitle: 'AI · التفكير المنظومي',
          body: 'استشارات الذكاء الاصطناعي والأتمتة الذكية على أرفع المستويات. نصمم الأنظمة التي تحوّل المؤسسات إلى كائنات متكيفة ذاتية التطوير. من منظومات الوكلاء إلى التحول الرقمي الاستراتيجي — بموجّه من إتقان عميق للأنظمة المستقلة والتفكير المنظومي.',
          stat: 'AI-First',
          statLabel: 'التفكير المنظومي',
        },
      ],
    },
    heritage: {
      label: 'تراثنا',
      motto: '\u201Cلومين فيليسيس\u201D',
      mottoTranslation: 'نور الحظ المبارك',
      values: [
        { latin: 'Prudentia', english: 'الحكمة', icon: '◈', text: 'نقيس مرتين ونتصرف بقناعة راسخة. الصبر الاستراتيجي هو أعمق ميزة تنافسية نملكها.' },
        { latin: 'Integritas', english: 'النزاهة', icon: '◇', text: 'كلمتنا هي عهدنا الثابت. في كل ولاية قضائية، وكل شراكة، وكل مصافحة عبر كل حدود.' },
        { latin: 'Fortitudo', english: 'الصمود', icon: '△', text: 'نبني لعقود لا لأرباع سنوية. الثروة الحقيقية تتراكم من خلال المرونة عبر دورات الزمن الطويلة.' },
        { latin: 'Humanitas', english: 'الإنسانية', icon: '○', text: 'التكنولوجيا تخدم الإنسان. الطبيعة ترعى الإنسان. كل كائن حي يستحق الكرامة دون استثناء.' },
      ],
    },
    philanthropy: {
      label: 'المؤسسة',
      title: 'الأرواح التي',
      titleAccent: 'تهمّنا حقاً',
      intro: 'وراء عالم الأعمال، تحمل مجموعة رينك التزاماً تأسيسياً عميقاً برفاهية من لا يملكون صوتاً يعبّر عنهم. مهمتنا الخيرية بالغة الخصوصية، غير قابلة للتفاوض، ومنسوجة في صميم هويتنا.',
      dogTitle: 'مبادرة رعاية الكلاب',
      dogBody: 'تقف حياة الكلاب وعافيتها وكرامتها في مقدمة التزاماتنا التأسيسية الجوهرية. نؤمن أن الحضارة تُقاس بمدى رقيّها في التعامل مع أوفى رفاقها. من عمليات الإنقاذ إلى تمويل الملاجئ، ومن برامج الرعاية البيطرية إلى المناصرة الفاعلة — نستثمر في عالم يعرف فيه كل كلب الأمان والدفء والحب.',
      dogStat: '∞',
      dogStatLabel: 'بلا حدود',
      quote: '"يمكن الحكم على عظمة أمة من خلال الطريقة التي تُعامَل بها حيواناتها." — المهاتما غاندي',
    },
    contact: {
      label: 'تواصل',
      title: 'ابدأ',
      titleAccent: 'الحوار',
      body: 'لاستفسارات الشراكة وفرص الاستثمار أو التعاون الاستراتيجي على أرفع المستويات.',
    },
    footer: {
      copyright: 'Rink Group OY',
    },
    langSwitch: {
      en: 'EN',
      nl: 'NL',
      fi: 'FI',
      ar: 'عربي',
    },
  },
};

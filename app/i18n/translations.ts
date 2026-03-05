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
    marquee2: 'TECHNOLOGY · NATURE · ADVENTURE · CONSULTING · PHILANTHROPY',
    pillars: {
      label: 'Portfolio',
      title: 'Our',
      titleAccent: 'Ventures',
      items: [
        {
          number: 'I',
          title: 'Technology',
          subtitle: 'AetherLink B.V.',
          body: 'AI consulting and intelligent automation at the highest level. We architect the systems that transform enterprises into adaptive, self-optimizing organisms. From agent ecosystems to strategic digital transformation — guided by a deep mastery of autonomous systems and systems thinking.',
          stat: 'EUR 225/hr',
          statLabel: 'consulting rate',
        },
        {
          number: 'II',
          title: 'Nature',
          subtitle: 'TaigaSchool',
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
          title: 'Consulting',
          subtitle: 'WorldLine · Senior AI',
          body: 'Senior AI consulting for WorldLine, one of Europe\'s foremost payment technology companies. Systems architecture, autonomous agent design, and enterprise-grade AI implementation delivered at the highest level of craft.',
          stat: '2026',
          statLabel: 'active engagement',
        },
        {
          number: 'V',
          title: 'AetherBot',
          subtitle: 'AetherLink AI Automations',
          body: 'Enterprise-level AI automation platform that transforms businesses into self-optimizing ecosystems. Intelligent agent orchestration, autonomous workflows, and adaptive decision engines — purpose-built to eliminate complexity and amplify human potential at scale.',
          stat: '24/7',
          statLabel: 'autonomous operations',
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
    marquee2: 'TECHNOLOGIE · NATUUR · AVONTUUR · CONSULTING · FILANTROPIE',
    pillars: {
      label: 'Portfolio',
      title: 'Onze',
      titleAccent: 'Ondernemingen',
      items: [
        {
          number: 'I',
          title: 'Technologie',
          subtitle: 'AetherLink B.V.',
          body: 'AI-consulting en intelligente automatisering op het hoogste niveau. Wij ontwerpen systemen die ondernemingen transformeren tot adaptieve, zelfoptimaliserende organismen. Van agent-ecosystemen tot strategische digitale transformatie — gedragen door een diepgaande beheersing van autonome systemen en systeemdenken.',
          stat: '€225/uur',
          statLabel: 'consultingtarief',
        },
        {
          number: 'II',
          title: 'Natuur',
          subtitle: 'TaigaSchool',
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
          title: 'Consulting',
          subtitle: 'WorldLine · Senior AI',
          body: 'Senior AI-consulting voor WorldLine, een van Europa\'s vooraanstaande betaaltechnologiebedrijven. Systeemarchitectuur, autonoom agent-design en enterprise-grade AI-implementatie — uitgevoerd met het hoogste vakmanschap.',
          stat: '2026',
          statLabel: 'actieve opdracht',
        },
        {
          number: 'V',
          title: 'AetherBot',
          subtitle: 'AetherLink AI Automations',
          body: 'Enterprise-level AI-automatiseringsplatform dat bedrijven transformeert tot zelfoptimaliserende ecosystemen. Intelligente agent-orkestratie, autonome workflows en adaptieve beslissingsengines — doelgericht gebouwd om complexiteit te elimineren en menselijk potentieel op schaal te versterken.',
          stat: '24/7',
          statLabel: 'autonome operaties',
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
    marquee2: 'TEKNOLOGIA · LUONTO · SEIKKAILU · KONSULTOINTI · HYVÄNTEKEVÄISYYS',
    pillars: {
      label: 'Portfolio',
      title: 'Meidän',
      titleAccent: 'Hankkeemme',
      items: [
        {
          number: 'I',
          title: 'Teknologia',
          subtitle: 'AetherLink B.V.',
          body: 'Tekoälykonsultointi ja älykäs automaatio huipputasolla. Arkkitehtuurimme muuttaa yritykset mukautuviksi, itseään optimoiviksi organismeiksi. Agenttiekosysteemeistä strategiseen digitaaliseen transformaatioon — syvä hallinta autonomisista järjestelmistä ja systeemiajattelusta.',
          stat: '225 €/h',
          statLabel: 'konsultointihinta',
        },
        {
          number: 'II',
          title: 'Luonto',
          subtitle: 'TaigaSchool',
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
          title: 'Konsultointi',
          subtitle: 'WorldLine · Senior AI',
          body: 'Senior-tason tekoälykonsultointi WorldLinelle, yhdelle Euroopan johtavista maksujärjestelmäyrityksistä. Järjestelmäarkkitehtuuri, autonominen agenttisuunnittelu ja yritystasoinen tekoälyn käyttöönotto korkeimmalla tasolla.',
          stat: '2026',
          statLabel: 'aktiivinen toimeksianto',
        },
        {
          number: 'V',
          title: 'AetherBot',
          subtitle: 'AetherLink AI Automations',
          body: 'Yritystason tekoälyautomaatioalusta, joka muuttaa yritykset itseään optimoiviksi ekosysteemeiksi. Älykkäät agenttien orkestroinnit, autonomiset työnkulut ja mukautuvat päätösmoottorit — rakennettu poistamaan monimutkaisuutta ja vahvistamaan inhimillistä potentiaalia skaalassa.',
          stat: '24/7',
          statLabel: 'autonomiset toiminnot',
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
    marquee2: 'التكنولوجيا · الطبيعة · المغامرة · الاستشارات · العمل الخيري',
    pillars: {
      label: 'المحفظة',
      title: '',
      titleAccent: 'مشاريعنا',
      items: [
        {
          number: 'I',
          title: 'التكنولوجيا',
          subtitle: 'AetherLink B.V.',
          body: 'استشارات الذكاء الاصطناعي والأتمتة الذكية على أرفع المستويات. نصمم الأنظمة التي تحوّل المؤسسات إلى كائنات متكيفة ذاتية التطوير. من منظومات الوكلاء إلى التحول الرقمي الاستراتيجي — بموجّه من إتقان عميق للأنظمة المستقلة والتفكير المنظومي.',
          stat: '٢٢٥ يورو/س',
          statLabel: 'سعر الاستشارة',
        },
        {
          number: 'II',
          title: 'الطبيعة',
          subtitle: 'TaigaSchool',
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
          title: 'الاستشارات',
          subtitle: 'WorldLine · كبير مستشاري الذكاء الاصطناعي',
          body: 'استشارات ذكاء اصطناعي رفيعة المستوى لـ WorldLine، إحدى الشركات الأبرز في أوروبا في تكنولوجيا المدفوعات. هندسة الأنظمة، تصميم الوكلاء المستقلين، وتطبيق الذكاء الاصطناعي على مستوى المؤسسات بأعلى معايير الإتقان.',
          stat: '٢٠٢٦',
          statLabel: 'مشروع نشط',
        },
        {
          number: 'V',
          title: 'AetherBot',
          subtitle: 'AetherLink AI Automations',
          body: 'منصة أتمتة ذكاء اصطناعي على مستوى المؤسسات تحوّل الشركات إلى أنظمة بيئية ذاتية التحسين. تنسيق ذكي للوكلاء، وسير عمل مستقل، ومحركات قرار تكيّفية — مصممة لإزالة التعقيد وتعزيز الإمكانات البشرية على نطاق واسع.',
          stat: '٢٤/٧',
          statLabel: 'عمليات مستقلة',
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

/**
 * Every piece of home-page copy, per language. English is the source; Turkish mirrors
 * its shape exactly (the `Dictionary` type enforces it), so a missing string is a type
 * error, not a blank on the page.
 *
 * Wording follows the app's own Turkish: "takas", "takas teklifi", "kitaplık",
 * "istek listesi".
 */

export type Locale = "en" | "tr";

/** Home page path per locale; anchors are appended to it ("/tr#faq"). */
export const HOME_PATH: Record<Locale, string> = { en: "/", tr: "/tr" };

const en = {
  meta: {
    // Leads with what people search for ("book swap app"), like the Turkish title.
    title: "BookSwap — Book swap app | Swap books with readers near you",
    description:
      "BookSwap is a free book swap app for iPhone and Android. Swap the books you've finished with readers near you and discover your next read from real shelves nearby.",
  },
  nav: {
    links: {
      showcase: "App tour",
      "how-it-works": "How it works",
      features: "Features",
      about: "About",
      faq: "FAQ",
    },
    support: "Support",
    backToTop: "BookSwap — back to the top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    /** The link to the other language. */
    switchLanguage: { ariaLabel: "Türkçe" },
  },
  stores: {
    appStore: { top: "Download on the", bottom: "App Store", ariaLabel: "Download BookSwap on the App Store" },
    googlePlay: { top: "Get it on", bottom: "Google Play", ariaLabel: "Get BookSwap on Google Play" },
  },
  hero: {
    titleBefore: "Your finished book is",
    titleEmphasis: "someone else's",
    titleAfter: "next story.",
    subtitleLine1: "Discover books nearby, connect with local readers,",
    subtitleLine2: "and offer a swap.",
    free: "Free to download",
    howItWorksLink: "See how swapping works",
    tagline: "28M+ titles · offer · match · swap",
  },
  showcase: {
    eyebrow: "Product Tour",
    title: "See BookSwap in action",
    subtitle: "From discovering a book to chatting with your swap partner.",
    features: {
      scan: {
        title: "Instant Barcode Scan",
        description: "Scan any book's barcode to add it to your shelf in seconds no manual entry needed.",
        alt: "Barcode scanning screen showing instant book detail recognition",
      },
      search: {
        title: "Find Books to Swap",
        description: "Explore books, see how many readers own the ones you want, and send a swap request.",
        alt: "Search results screen displaying available book owners nearby",
      },
      library: {
        title: "Wishlist & Library",
        description: "Organize your library and keep track of the books you'd like to receive in a swap.",
        alt: "Personal library and wishlist management screen",
      },
      chat: {
        title: "Chat & Swap Offers",
        description: "Send quick exchange requests and coordinate easy handovers via built-in messaging.",
        alt: "Dual screen layout showing real-time chat and swap offer modal",
      },
    },
  },
  howItWorks: {
    eyebrow: "How the Story Goes",
    title: "Three steps, one new book",
    steps: [
      {
        title: "List your book",
        copy: "Search the catalog, find your book, and add it to your library in just a few taps.",
      },
      { title: "Receive swap offers", copy: "Other readers can request your book and make an offer in return." },
      { title: "Chat & exchange", copy: "Accept an offer, chat with your swap partner, and arrange the exchange." },
    ],
  },
  features: {
    eyebrow: "Inside BookSwap",
    title: "A shorter journey between two bookshelves.",
    subtitle: "Add what you’ve finished, find what you want to read next, and arrange the swap in one place.",
    items: [
      {
        title: "Scan to add",
        copy: "Point your camera at any barcode and add a book to your shelf in seconds no typing required.",
      },
      { title: "Find a swap", copy: "See how many readers own a book before you send a swap request." },
      {
        title: "Chat inside the app",
        copy: "Agree on the details and arrange your handoff without ever leaving BookSwap.",
      },
    ],
  },
  about: {
    eyebrow: "About BookSwap",
    quote:
      "Books are meant to be read, shared, and discovered again. BookSwap helps every story find its next reader.",
    body: "BookSwap is a simple way for readers to exchange books they've finished and discover new ones from other readers. Search the catalog, add books to your library, send and receive swap requests, and chat with your swap partner to arrange the exchange.",
  },
  safety: {
    eyebrow: "Trust & Safety",
    title: "Swapping is easy when it's safe",
    subtitle:
      "BookSwap connects readers who want to exchange books they've finished with books they want to read next.",
    tips: [
      {
        title: "Chat before you meet",
        copy: "Once a swap is accepted, chat with your swap partner to agree on the details of your exchange.",
      },
      {
        title: "Meet in public",
        copy: "Choose a public place for your handoff, such as a café, library, or other familiar spot.",
      },
      { title: "Trust your instincts", copy: "You can decline or cancel a swap at any point no explanation needed." },
    ],
    reportBefore: "Something felt off?",
    reportLink: "Tell us",
    reportAfter: "and we'll look into it.",
  },
  faq: {
    eyebrow: "Questions, Answered",
    title: "Before you ask",
    items: [
      { q: "Is BookSwap free?", a: "Yes. Browsing books, listing your own, and swapping with other readers is free." },
      {
        q: "How do I get access?",
        a: "Download BookSwap for free from the App Store or Google Play, sign in with your phone number, and start swapping right away.",
      },
      {
        q: "Which platforms does it run on?",
        a: "BookSwap runs on iPhone and Android phones.",
      },
      {
        q: "How does a swap actually happen?",
        a: "Send a swap request for a book you want. Once the swap is accepted, chat with the other reader and arrange a handoff that works for both of you.",
      },
      {
        q: "Can I exchange books with readers in other countries?",
        a: "Yes. BookSwap isn't limited to your city: you can discover books, send swap offers and chat with readers in other countries too. Shipping, costs and delivery are arranged directly between you and the other reader through chat, so it's a good idea to agree on these details before confirming a swap.",
      },
      {
        q: "Can I donate or gift books on BookSwap?",
        a: "BookSwap is built around book exchanges, so there's no dedicated gifting or donation feature yet. We're always listening to our community, so feel free to share your ideas with us!",
      },
    ],
    privacy: {
      q: "What data do you collect?",
      before:
        "We collect the information needed to create your account, manage your library and wishlist, facilitate book swaps, and provide in-app messaging. See our",
      link: "Privacy Policy",
      after: "for details about what data we collect and how we use it.",
    },
  },
  download: {
    eyebrow: "Out now",
    title: "Keep stories moving",
    body: "BookSwap is now available on the App Store and Google Play. Download it, add the books you've finished, and start swapping with readers near you.",
    platforms: "Free · iPhone · Android",
  },
  footer: {
    tagline: "Give finished books a new journey. Discover, exchange, and keep stories moving.",
    support: "Support",
    faq: "FAQ",
    safety: "Trust & Safety",
    privacy: "Privacy Policy",
    deleteAccount: "Delete Account",
    engineering: "Engineering",
    city: "Istanbul",
  },
};

export type Dictionary = typeof en;

const tr: Dictionary = {
  meta: {
    title: "BookSwap — Kitap takas uygulaması | Yakınındaki okurlarla kitap takas et",
    description:
      "BookSwap ile okuduğun kitapları takas et, yakınındaki okurların kitaplıklarından yeni kitaplar keşfet. Ücretsiz kitap takas uygulaması; iPhone ve Android'de.",
  },
  nav: {
    links: {
      showcase: "Uygulama turu",
      "how-it-works": "Nasıl çalışır",
      features: "Özellikler",
      about: "Hakkında",
      faq: "SSS",
    },
    support: "Destek",
    backToTop: "BookSwap — sayfanın başına dön",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    switchLanguage: { ariaLabel: "English" },
  },
  stores: {
    appStore: { top: "Hemen indir", bottom: "App Store", ariaLabel: "BookSwap'ı App Store'dan indir" },
    googlePlay: { top: "Hemen indir", bottom: "Google Play", ariaLabel: "BookSwap'ı Google Play'den indir" },
  },
  hero: {
    titleBefore: "Bitirdiğin kitap,",
    titleEmphasis: "bir başkasının",
    titleAfter: "yeni hikâyesi.",
    subtitleLine1: "Yakınındaki kitapları keşfet, okurlarla tanış",
    subtitleLine2: "ve takas teklif et.",
    free: "Ücretsiz indir",
    howItWorksLink: "Takas nasıl yapılır, gör",
    tagline: "28M+ kitap · teklif · eşleş · takas",
  },
  showcase: {
    eyebrow: "Uygulama turu",
    title: "BookSwap'ı yakından tanı",
    subtitle: "Bir kitabı keşfetmekten takas ortağınla sohbet etmeye kadar.",
    features: {
      scan: {
        title: "Barkodla anında ekle",
        description: "Kitabın barkodunu tara, saniyeler içinde kitaplığına ekle; hiçbir şey yazmana gerek yok.",
        alt: "Barkod tarama ekranı, kitap bilgilerini anında tanıyor",
      },
      search: {
        title: "Takaslık kitap bul",
        description: "Kitapları keşfet, istediğin kitaba kaç okurun sahip olduğunu gör ve takas teklifi gönder.",
        alt: "Arama sonuçları ekranı, yakındaki kitap sahiplerini gösteriyor",
      },
      library: {
        title: "Kitaplık ve istek listesi",
        description: "Kitaplığını düzenle, takasta almak istediğin kitapları istek listende takip et.",
        alt: "Kişisel kitaplık ve istek listesi ekranı",
      },
      chat: {
        title: "Sohbet ve takas teklifleri",
        description: "Hızlıca takas teklifi gönder, buluşmayı uygulama içi mesajlaşmayla kolayca ayarla.",
        alt: "Sohbet ve takas teklifi ekranları yan yana",
      },
    },
  },
  howItWorks: {
    eyebrow: "Hikâye nasıl ilerler",
    title: "Üç adım, bir yeni kitap",
    steps: [
      {
        title: "Kitabını ekle",
        copy: "Katalogda kitabını bul ve birkaç dokunuşla kitaplığına ekle.",
      },
      { title: "Takas teklifleri al", copy: "Diğer okurlar kitabını isteyebilir ve karşılığında kendi kitabını teklif eder." },
      { title: "Sohbet et ve takasla", copy: "Bir teklifi kabul et, takas ortağınla sohbet et ve buluşmayı ayarla." },
    ],
  },
  features: {
    eyebrow: "BookSwap'ın içinden",
    title: "İki kitaplık arasındaki yolu kısaltır.",
    subtitle: "Bitirdiğin kitabı ekle, sıradaki okumanı bul ve takası tek yerden ayarla.",
    items: [
      {
        title: "Tara ve ekle",
        copy: "Kamerayı barkoda tut, kitabı saniyeler içinde kitaplığına ekle; yazmana gerek yok.",
      },
      { title: "Takas bul", copy: "Takas teklifi göndermeden önce bir kitaba kaç okurun sahip olduğunu gör." },
      {
        title: "Uygulama içinde sohbet",
        copy: "Ayrıntılarda anlaş ve buluşmayı BookSwap'tan çıkmadan ayarla.",
      },
    ],
  },
  about: {
    eyebrow: "BookSwap hakkında",
    quote:
      "Kitaplar okunmak, paylaşılmak ve yeniden keşfedilmek için var. BookSwap her hikâyenin bir sonraki okurunu bulmasına yardım eder.",
    body: "BookSwap, okurların bitirdikleri kitapları takas etmesinin ve başka okurlardan yeni kitaplar keşfetmesinin kolay yolu. Katalogda ara, kitaplığına kitap ekle, takas teklifi gönder ve al, takası ayarlamak için takas ortağınla sohbet et.",
  },
  safety: {
    eyebrow: "Güven ve güvenlik",
    title: "Güvenli olunca takas kolay",
    subtitle:
      "BookSwap, bitirdiği kitapları okumak istediği kitaplarla takas etmek isteyen okurları buluşturur.",
    tips: [
      {
        title: "Buluşmadan önce sohbet et",
        copy: "Takas kabul edildiğinde, ayrıntılarda anlaşmak için takas ortağınla sohbet et.",
      },
      {
        title: "Herkese açık bir yerde buluş",
        copy: "Takas için kafe, kütüphane gibi kalabalık ve bildiğin bir yer seç.",
      },
      { title: "İçgüdülerine güven", copy: "Bir takası istediğin an reddedebilir ya da iptal edebilirsin; açıklama yapman gerekmez." },
    ],
    reportBefore: "Bir şey ters mi geldi?",
    reportLink: "Bize yaz",
    reportAfter: ", inceleyelim.",
  },
  faq: {
    eyebrow: "Sorular ve cevaplar",
    title: "Sormadan önce",
    items: [
      {
        q: "BookSwap ücretsiz mi?",
        a: "Evet. Kitaplara göz atmak, kendi kitaplarını eklemek ve diğer okurlarla takas etmek ücretsiz.",
      },
      {
        q: "Nasıl başlarım?",
        a: "BookSwap'ı App Store'dan ya da Google Play'den ücretsiz indir, telefon numaranla giriş yap ve hemen takasa başla.",
      },
      {
        q: "Hangi cihazlarda çalışıyor?",
        a: "BookSwap iPhone ve Android telefonlarda çalışıyor.",
      },
      {
        q: "Takas nasıl gerçekleşiyor?",
        a: "İstediğin kitap için takas teklifi gönder. Teklif kabul edilince diğer okurla sohbet et ve ikinize de uyan bir buluşma ayarla.",
      },
      {
        q: "Başka ülkelerdeki okurlarla kitap takas edebilir miyim?",
        a: "Evet. BookSwap yalnızca bulunduğun şehirle sınırlı değil: başka ülkelerdeki okurların kitaplarını keşfedebilir, onlara takas teklifi gönderebilir ve sohbet edebilirsin. Kargo, masraflar ve teslimat doğrudan sen ve diğer okur arasında sohbet üzerinden ayarlanır; bu yüzden takası onaylamadan önce bu detaylarda anlaşmanı öneririz.",
      },
      {
        q: "BookSwap'ta kitap bağışlayabilir ya da hediye edebilir miyim?",
        a: "BookSwap kitap takası üzerine kurulu; bu yüzden şu an hediye ya da bağış için ayrı bir özellik yok. Topluluğumuzu her zaman dinliyoruz, fikirlerini bizimle paylaşmaktan çekinme!",
      },
    ],
    privacy: {
      q: "Hangi verileri topluyorsunuz?",
      before:
        "Hesabını oluşturmak, kitaplığını ve istek listeni yönetmek, takasları gerçekleştirmek ve uygulama içi mesajlaşmayı sağlamak için gereken bilgileri topluyoruz. Hangi verileri toplayıp nasıl kullandığımızın ayrıntıları için",
      link: "Gizlilik Politikası'na",
      after: "göz at.",
    },
  },
  download: {
    eyebrow: "Şimdi yayında",
    title: "Hikâyeler yolculuğuna devam etsin",
    body: "BookSwap artık App Store'da ve Google Play'de. İndir, bitirdiğin kitapları ekle ve yakınındaki okurlarla takasa başla.",
    platforms: "Ücretsiz · iPhone · Android",
  },
  footer: {
    tagline: "Bitirdiğin kitaplara yeni bir yolculuk ver. Keşfet, takas et, hikâyeler dolaşsın.",
    support: "Destek",
    faq: "SSS",
    safety: "Güven ve güvenlik",
    privacy: "Gizlilik Politikası",
    deleteAccount: "Hesap silme",
    engineering: "Mühendislik",
    city: "İstanbul",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, tr };

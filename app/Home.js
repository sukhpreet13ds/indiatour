"use client";

import React, { useState, useEffect, useMemo } from "react";

// ================= ICONS (Clean modern inline SVGs, NO emojis) =================
const Icons = {
  Location: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Star: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  Clock: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Check: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Plane: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
    </svg>
  ),
  Compass: () => (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
  ),
  TiltedArrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.77.78 2.791.78h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.769-5.766zm3.377 8.203c-.145.405-.712.744-1.02.779-.287.033-.66.05-1.928-.475-1.62-.67-2.65-2.316-2.73-2.423-.081-.107-.655-.872-.655-1.663 0-.791.413-1.18.56-1.34.145-.16.317-.2.423-.2.106 0 .211.002.304.006.1.005.234-.038.366.279.136.327.464 1.132.505 1.215.04.083.067.18.013.288-.053.107-.08.174-.16.267-.08.093-.169.208-.241.279-.08.08-.163.167-.07.327.093.16.413.682.887 1.103.61.543 1.124.711 1.284.791.16.08.253.067.347-.04.093-.107.4-.467.507-.627.107-.16.213-.133.36-.08.147.053.933.44 1.093.52.16.08.267.12.307.187.04.067.04.387-.105.792z"/>
    </svg>
  ),
  SuccessSparkle: () => (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#BD6249" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>
  ),
};

// Translations dictionary
const translations = {
  en: {
    nav: {
      explore: "Explore journeys",
      transfers: "Airport Transfers",
      approach: "Our approach",
      tailorMade: "Tailor-made travel",
      bookTrip: "Book Trip",
      loginRegister: "Sign In / Join",
    },
    hero: {
      tag: "Authentic & Thoughtful India Journeys",
      title: "Discover India’s Soul & Timeless Wonders",
      desc: "Tailored private itineraries, serene luxury heritage stays, and mindful travel crafted specifically for your pace and comfort.",
      findJourney: "Find Your Journey",
      contactUs: "Contact Us",
    },
    philosophy: {
      tag: "THOUGHTFULLY CRAFTED, PERSONALLY YOURS",
      titleLine1: "Your first visit.",
      titleLine2: "Or your next discovery.",
      subLine1: "The places you dream of. The moments that matter.",
      subLine2: "We shape your journey around what matters to you.",
      pillars: [
        {
          num: "01 / LANGUAGE",
          title: "Thoughtful Japanese support",
          desc: "Talk through your wishes and questions before your journey begins.",
        },
        {
          num: "02 / YOUR PACE",
          title: "Travel at a comfortable pace",
          desc: "With time for transfers, rest and the unexpected discoveries.",
        },
        {
          num: "03 / CLARITY",
          title: "Clear, considered quotations",
          desc: "Know what is included and excluded before you commit to a booking.",
        },
      ],
    },
    filter: {
      filterTitle: "Filters",
      clearAll: "Reset all",
      tag: "FIND YOUR TRIP",
      title: "Explore Tailored Journeys",
      subtitle: "Filter curated journeys by destination, duration, comfort style, or budget.",
      searchPlaceholder: "Search destination, tour, keyword...",
      searchLabel: "Search",
      dateLabel: "Travel Date",
      travellersLabel: "Travellers",
      destLabel: "Destinations",
      priceLabel: "Max Budget",
      durationLabel: "Duration",
      categoryLabel: "Category",
      ratingLabel: "Rating",
      groupSizeLabel: "Group Size",
      difficultyLabel: "Difficulty",
      inclusionsLabel: "Inclusions",
      openSeatsOnly: "Only open seats",
      resultsFound: "journeys available",
      filterBtn: "Filters",
      noResultsTitle: "No Journeys Found",
      noResultsDesc: "We couldn't find any tours matching all your selected criteria. Try adjusting your filters.",
      viewAlternatives: "Show all featured journeys",
    },
    card: {
      days: "Days",
      from: "From",
      seatsLeft: "seats left",
      bookNow: "Book Trip",
      viewDetails: "View Details",
    },
    transfers: {
      tag: "AIRPORT CONCIERGE & TRANSFERS",
      title: "Airport transfers across India",
      subtitle: "Airport → Hotel or Hotel → Airport. Choose a city to explore both private car services.",
      filterCity: "Filter by City:",
      filterDirection: "Direction:",
      allCities: "All Cities",
      allDirections: "All Transfers",
      arrivalOnly: "Airport → Hotel (Arrival)",
      departureOnly: "Hotel → Airport (Departure)",
      requestQuote: "Request a quotation",
    },
    modal: {
      bookTitle: "Book Your Journey",
      bookSubtitle: "Complete this quick form to reserve your custom India itinerary or private airport transfer.",
      transferTitle: "Request Airport Transfer Quotation",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone / WhatsApp",
      dates: "Preferred Travel Date",
      guests: "Number of Travellers",
      requests: "Special Requests, Flight Numbers or Hotel Details",
      confirmBooking: "Confirm Booking Request",
      bookingSuccess: "Thank you! Your request has been submitted. Our concierge will contact you within 24 hours.",
      loginTab: "Sign In",
      registerTab: "Create Account",
      password: "Password",
      confirmPassword: "Confirm Password",
      rememberMe: "Remember me",
      submitLogin: "Sign In",
      submitRegister: "Create Account",
    },
  },
  ja: {
    nav: {
      explore: "ツアーを探す",
      transfers: "空港送迎",
      approach: "こだわり・想い",
      tailorMade: "オーダーメイド旅",
      bookTrip: "旅を予約する",
      loginRegister: "ログイン / 会員登録",
    },
    hero: {
      tag: "本物のインドと出会う 心地よい旅",
      title: "インドの魂と悠久の美を巡る旅へ",
      desc: "お客様の好みに合わせたオーダーメイド日程、厳選された安心のホテル、日本語対応で無理のない快適な旅をお届けします。",
      findJourney: "旅を検索する",
      contactUs: "お問い合わせ",
    },
    philosophy: {
      tag: "THOUGHTFULLY CRAFTED, PERSONALLY YOURS",
      titleLine1: "はじめてのインドも。",
      titleLine2: "久しぶりの再訪も。",
      subLine1: "憧れの風景と、心に残る特別な瞬間。",
      subLine2: "あなたの大切にしたい想いに寄り添い、丁寧な旅を形にします。",
      pillars: [
        {
          num: "01 / LANGUAGE",
          title: "安心の日本語サポート",
          desc: "ご出発前のご要望やご質問も、日本語でじっくりとお伺いします。",
        },
        {
          num: "02 / YOUR PACE",
          title: "無理のない快適なペース",
          desc: "移動や休息の時間、そして旅先での思わぬ発見をゆったり楽しめます。",
        },
        {
          num: "03 / CLARITY",
          title: "透明でわかりやすいお見積もり",
          desc: "含まれるもの・含まれないものを明確にし、安心してご予約いただけます。",
        },
      ],
    },
    filter: {
      filterTitle: "条件で絞り込む",
      clearAll: "条件クリア",
      tag: "旅を探す",
      title: "あなたにぴったりのインド旅行",
      subtitle: "目的地、日数、旅のスタイル、ご予算に合わせて最適なツアーを絞り込めます。",
      searchPlaceholder: "目的地、ツアー名、キーワード...",
      searchLabel: "検索",
      dateLabel: "出発予定日",
      travellersLabel: "旅行人数",
      destLabel: "目的地",
      priceLabel: "予算上限",
      durationLabel: "日数",
      categoryLabel: "カテゴリー",
      ratingLabel: "評価",
      groupSizeLabel: "グループ形式",
      difficultyLabel: "歩行難易度",
      inclusionsLabel: "含まれるもの",
      openSeatsOnly: "空席ありのみ",
      resultsFound: "件のツアー",
      filterBtn: "絞り込み",
      noResultsTitle: "該当するツアーが見つかりませんでした",
      noResultsDesc: "選択された条件に一致する旅がありませんでした。条件を変更してみてください。",
      viewAlternatives: "全ツアーを表示する",
    },
    card: {
      days: "日間",
      from: "料金",
      seatsLeft: "残席",
      bookNow: "予約する",
      viewDetails: "詳細を見る",
    },
    transfers: {
      tag: "インド全土 専用車空港送迎",
      title: "インド主要都市の空港送迎サービス",
      subtitle: "空港 → ホテル または ホテル → 空港。都市を選択して専用車送迎をご確認いただけます。",
      filterCity: "都市を選択:",
      filterDirection: "送迎タイプ:",
      allCities: "すべての都市",
      allDirections: "全送迎",
      arrivalOnly: "空港 → ホテル（到着便）",
      departureOnly: "ホテル → 空港（出発便）",
      requestQuote: "お見積もり依頼",
    },
    modal: {
      bookTitle: "ツアー・送迎のご予約・ご相談",
      bookSubtitle: "以下のフォームにご入力ください。専任コンシェルジュよりご連絡差し上げます。",
      transferTitle: "空港専用車送迎のお見積もり依頼",
      fullName: "お名前",
      email: "メールアドレス",
      phone: "電話番号 / WhatsApp",
      dates: "ご希望の日時",
      guests: "参加人数",
      requests: "便名（フライト番号）、ホテル名、その他ご要望",
      confirmBooking: "見積もり・予約リクエストを送信",
      bookingSuccess: "ありがとうございます！リクエストを受け付けました。24時間以内にご連絡いたします。",
      loginTab: "ログイン",
      registerTab: "新規会員登録",
      password: "パスワード",
      confirmPassword: "パスワード（確認）",
      rememberMe: "ログイン状態を保持する",
      submitLogin: "ログイン",
      submitRegister: "会員登録する",
    },
  },
};

// Initial Sample Tour Data
const initialTours = [
  {
    id: 1,
    titleEn: "Golden Triangle & Taj Mahal Heritage",
    titleJa: "黄金の三角地帯とタージマハル珠玉の旅",
    destinations: ["Delhi", "Agra", "Jaipur"],
    durationDays: 6,
    durationCategory: "4-7",
    category: "luxury",
    price: 950,
    priceJpy: "¥145,000",
    rating: 4.9,
    groupSize: "couple",
    difficulty: "easy",
    inclusions: ["meals", "hotel", "guide"],
    seatsOpen: 4,
    image: "/assets/slide1.jpg",
    descEn: "Marvel at the marble poetry of Taj Mahal, the pink palace of Jaipur, and Delhi's timeless monuments with luxury private chauffeur.",
    descJa: "大理石の至宝タージ・マハル、ピンクシティ・ジャイプール、そしてデリーの歴史遺産を専用車と快適ホテルで巡る贅沢旅。",
  },
  {
    id: 2,
    titleEn: "Serene Kerala Backwaters & Spice Hills",
    titleJa: "静寂のケララ 水郷ハウスボートと香辛料の丘",
    destinations: ["Kerala", "Kochi", "Munnar", "Alleppey"],
    durationDays: 7,
    durationCategory: "4-7",
    category: "honeymoon",
    price: 820,
    priceJpy: "¥125,000",
    rating: 4.85,
    groupSize: "couple",
    difficulty: "easy",
    inclusions: ["meals", "hotel", "guide"],
    seatsOpen: 2,
    image: "/assets/slide5.jpg",
    descEn: "Drift along the emerald lagoons on a private luxury houseboat and breathe the crisp aromatic air of lush tea and spice plantations.",
    descJa: "専用の豪華ハウスボートでエメラルドグリーンの水郷をのんびり漂い、紅茶とスパイスが香る涼やかな高原で心身を癒す旅。",
  },
  {
    id: 3,
    titleEn: "Royal Rajasthan Forts & Desert Palaces",
    titleJa: "王侯貴族のラジャスタン 宮殿ホテルと砂漠の夢",
    destinations: ["Udaipur", "Jodhpur", "Jaisalmer", "Jaipur"],
    durationDays: 10,
    durationCategory: "8-14",
    category: "luxury",
    price: 1550,
    priceJpy: "¥235,000",
    rating: 4.95,
    groupSize: "family",
    difficulty: "moderate",
    inclusions: ["meals", "hotel", "flights", "guide"],
    seatsOpen: 6,
    image: "/assets/slide2.jpg",
    descEn: "Step into fairy-tale living inside authentic palace hotels, witness the blue city of Jodhpur and sleep under starlit dunes.",
    descJa: "湖に浮かぶ白亜の宮殿ホテルに滞在し、青の街ジョードプルと黄金のタール砂漠の星空を堪能する究極の宮廷浪漫旅。",
  },
  {
    id: 4,
    titleEn: "Sacred Ganges & Himalayan Foothills",
    titleJa: "母なるガンジスと聖地リシケシ 心の巡礼旅",
    destinations: ["Varanasi", "Rishikesh", "Haridwar", "Delhi"],
    durationDays: 8,
    durationCategory: "8-14",
    category: "pilgrimage",
    price: 760,
    priceJpy: "¥115,000",
    rating: 4.75,
    groupSize: "solo",
    difficulty: "moderate",
    inclusions: ["meals", "hotel", "guide"],
    seatsOpen: 5,
    image: "/assets/slide6.jpg",
    descEn: "Experience the mesmerizing Ganga Aarti ceremonies in Varanasi and rejuvenation yoga along the serene crystal waters of Rishikesh.",
    descJa: "悠久のガンジス川で祈りの灯籠流しを体感し、ヒマラヤの麓リシケシで本場ヨガと瞑想に触れる心洗われる旅。",
  },
  {
    id: 5,
    titleEn: "Ladakh High Mountain & Nubra Valley Safari",
    titleJa: "ラダック天空のチベット世界とパンゴン湖探訪",
    destinations: ["Ladakh", "Leh", "Nubra Valley"],
    durationDays: 12,
    durationCategory: "8-14",
    category: "adventure",
    price: 1380,
    priceJpy: "¥210,000",
    rating: 4.92,
    groupSize: "group",
    difficulty: "hard",
    inclusions: ["meals", "hotel", "guide"],
    seatsOpen: 3,
    image: "/assets/slide7.png",
    descEn: "Cross high-altitude mountain passes, visit ancient Tibetan Buddhist monasteries, and witness the crystal turquoise colors of Pangong Lake.",
    descJa: "標高3,500mを超える天空の楽園。古代ゴンパと息を呑むほど青いパンゴン湖を巡る一生に一度の絶景大冒険。",
  },
  {
    id: 6,
    titleEn: "Golden Sunsets of Coastal Goa & Ancient Hampi",
    titleJa: "ポルトガル情緒のゴア海岸と古代都市ハンピの巨石",
    destinations: ["Goa", "Hampi"],
    durationDays: 5,
    durationCategory: "4-7",
    category: "family",
    price: 590,
    priceJpy: "¥89,000",
    rating: 4.65,
    groupSize: "family",
    difficulty: "easy",
    inclusions: ["meals", "hotel", "guide"],
    seatsOpen: 8,
    image: "/assets/slide8.png",
    descEn: "Combine sun-kissed Arabian sea beaches with the dramatic UNESCO ruins and giant granite boulder landscapes of Vijayanagara empire.",
    descJa: "アラビア海を望むリゾートビーチでの休息と、巨石が連なる世界遺産ハンピ遺跡の神秘的な歴史散策を楽しむコース。",
  },
  {
    id: 7,
    titleEn: "Kashmir Valley of Meadows & Alpine Dal Lake",
    titleJa: "カシミール渓谷とダル湖のハウスボート悠々旅",
    destinations: ["Kashmir", "Srinagar", "Gulmarg", "Pahalgam"],
    durationDays: 6,
    durationCategory: "4-7",
    category: "honeymoon",
    price: 890,
    priceJpy: "¥135,000",
    rating: 4.88,
    groupSize: "couple",
    difficulty: "easy",
    inclusions: ["meals", "hotel", "guide"],
    seatsOpen: 4,
    image: "/assets/slide9.png",
    descEn: "Wake up to misty morning shikara rides on Dal Lake, pine forests of Pahalgam, and snow-capped Himalayan panoramas in Gulmarg.",
    descJa: "ダル湖のシカラ小舟から眺める幻想的な朝霧、パハルガムの清流、そしてヒマラヤの雪山を望む絵画のようなカシミール旅。",
  },
  {
    id: 8,
    titleEn: "Mystic Temple Architecture of Tamil Nadu",
    titleJa: "南インド・タミルナードゥ珠玉の寺院彫刻巡礼",
    destinations: ["Chennai", "Madurai", "Thanjavur"],
    durationDays: 7,
    durationCategory: "4-7",
    category: "pilgrimage",
    price: 720,
    priceJpy: "¥108,000",
    rating: 4.78,
    groupSize: "solo",
    difficulty: "easy",
    inclusions: ["meals", "hotel", "guide"],
    seatsOpen: 6,
    image: "/assets/slide10.png",
    descEn: "Marvel at the soaring, vividly sculptured gopurams of Meenakshi Temple and the UNESCO Chola bronze heritage temples in South India.",
    descJa: "極彩色の彫刻が天に伸びるミーナークシー寺院や世界遺産タンジャーヴール寺院を巡る、南インドの深い精神と美に浸る旅。",
  },
];

// Airport Transfers Data - Using car1.jpg and car2.jpg for all cards as requested
const airportTransfers = [
  {
    id: "tr-1",
    city: "Mumbai",
    direction: "arrival",
    image: "/assets/car1.jpg",
    tagEn: "Airport transfer / Arrival",
    tagJa: "空港送迎 / 空港到着",
    titleEn: "Mumbai: Airport to hotel",
    titleJa: "ムンバイ：空港からホテルへ",
    routeEn: "Mumbai · Private car · One way",
    routeJa: "ムンバイ · 専用車 · 片道",
    descEn: "Chhatrapati Shivaji Maharaj Intl (BOM) Terminal 2/1 greeting with name board. Direct private AC sedan or SUV to South Mumbai, Bandra, or BKC hotels.",
    descJa: "ムンバイ国際空港（BOM）到着口にてネームボードでお出迎え。南ムンバイやバンドラ等のホテルまでエアコン完備の専用車で直行。",
  },
  {
    id: "tr-2",
    city: "Mumbai",
    direction: "departure",
    image: "/assets/car2.jpg",
    tagEn: "Airport transfer / Departure",
    tagJa: "空港送迎 / 空港出発",
    titleEn: "Mumbai: Hotel to airport",
    titleJa: "ムンバイ：ホテルから空港へ",
    routeEn: "Mumbai · Private car · One way",
    routeJa: "ムンバイ · 専用車 · 片道",
    descEn: "Punctual hotel lobby pick-up with luggage assistance. Stress-free private transfer directly to Mumbai International Airport departure gate.",
    descJa: "ご宿泊ホテルロビーまで専用車がお迎え。荷物をお運びし、フライト時間に合わせてスムーズにムンバイ国際空港へ送迎。",
  },
  {
    id: "tr-3",
    city: "Delhi",
    direction: "arrival",
    image: "/assets/car1.jpg",
    tagEn: "Airport transfer / Arrival",
    tagJa: "空港送迎 / 空港到着",
    titleEn: "Delhi: Airport to hotel / Gurgaon",
    titleJa: "デリー：空港からホテル / グルガオンへ",
    routeEn: "Delhi NCR · Private car · One way",
    routeJa: "デリー首都圏 · 専用車 · 片道",
    descEn: "Meet & greet at Indira Gandhi Intl (DEL) Terminal 3. Reliable sanitized private car to Central Delhi, Connaught Place, Aerocity, or Gurgaon.",
    descJa: "インディラ・ガンディー国際空港（DEL）第3ターミナル出口にて日本語または英語ボードでお迎え。デリー市内各ホテルへ快適送迎。",
  },
  {
    id: "tr-4",
    city: "Delhi",
    direction: "departure",
    image: "/assets/car2.jpg",
    tagEn: "Airport transfer / Departure",
    tagJa: "空港送迎 / 空港出発",
    titleEn: "Delhi: Hotel to airport transfer",
    titleJa: "デリー：ホテルから空港へ",
    routeEn: "Delhi NCR · Private car · One way",
    routeJa: "デリー首都圏 · 専用車 · 片道",
    descEn: "Dependable departure service from any hotel or residence across Delhi NCR to IGI Airport with ample time before international flight check-in.",
    descJa: "デリーやグルガオンのホテルからIGI国際空港への出発専用車送迎。渋滞を考慮した安全・安心のスケジュール管理。",
  },
  {
    id: "tr-5",
    city: "Bengaluru",
    direction: "arrival",
    image: "/assets/car1.jpg",
    tagEn: "Airport transfer / Arrival",
    tagJa: "空港送迎 / 空港到着",
    titleEn: "Bengaluru: Airport to city center",
    titleJa: "ベンガルール：空港から市内ホテルへ",
    routeEn: "Bengaluru · Private car · One way",
    routeJa: "ベンガルール · 専用車 · 片道",
    descEn: "Kempegowda International Airport (BLR) arrival paging service with fast expressway private transfer to Central Bengaluru, Indiranagar, or Whitefield.",
    descJa: "ケンペゴウダ国際空港（BLR）到着後のネームボードお出迎え。高速道路を利用して中心街やITエリアへスムーズにお送りします。",
  },
  {
    id: "tr-6",
    city: "Kochi",
    direction: "arrival",
    image: "/assets/car2.jpg",
    tagEn: "Airport transfer / Arrival",
    tagJa: "空港送迎 / 空港到着",
    titleEn: "Kochi: Airport to Fort Kochi / Marari",
    titleJa: "コチ：空港からフォートコチ / マラリへ",
    routeEn: "Kerala · Private car · One way",
    routeJa: "ケララ · 専用車 · 片道",
    descEn: "Warm Kerala welcome at Cochin Intl (COK). Scenic private air-conditioned vehicle to historic Fort Kochi colonial heritage stays or backwater resorts.",
    descJa: "コーチン国際空港（COK）からフォートコチのコロニアルホテルや水郷リゾートへ、緑豊かな景色を楽しみながら専用車で移動。",
  },
  {
    id: "tr-7",
    city: "Jaipur",
    direction: "arrival",
    image: "/assets/car1.jpg",
    tagEn: "Airport transfer / Arrival",
    tagJa: "空港送迎 / 空港到着",
    titleEn: "Jaipur: Airport to palace hotel",
    titleJa: "ジャイプール：空港から宮殿ホテルへ",
    routeEn: "Jaipur · Private car · One way",
    routeJa: "ジャイプール · 専用車 · 片道",
    descEn: "Jaipur Intl (JAI) arrival transfer directly to Old Pink City heritage havelis and luxury palace resorts with polite private driver.",
    descJa: "ジャイプール空港（JAI）到着後、旧市街のヘリテージホテルや宮殿リゾートまで安心の専属ドライバーがご案内します。",
  },
  {
    id: "tr-8",
    city: "Goa",
    direction: "arrival",
    image: "/assets/car2.jpg",
    tagEn: "Airport transfer / Arrival",
    tagJa: "空港送迎 / 空港到着",
    titleEn: "Goa: Airport to beach resort",
    titleJa: "ゴア：空港からビーチリゾートへ",
    routeEn: "Goa · Private car · One way",
    routeJa: "ゴア · 専用車 · 片道",
    descEn: "Pick-up from Dabolim (GOI) or Manohar Mopa (GOX) airport straight to North or South Goa seaside resorts and private villas.",
    descJa: "ダボリム空港（GOI）またはモパ空港（GOX）から、南北ゴアの海沿いリゾートホテルやヴィラまで快適な専用車で送迎。",
  },
];

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: "/assets/slide1.jpg", caption: "Taj Mahal, Agra" },
    { img: "/assets/slide2.jpg", caption: "Kerala Backwaters & Houseboats" },
    { img: "/assets/slide3.jpg", caption: "Royal Rajasthan Palaces" },
    { img: "/assets/slide4.jpg", caption: "Holy Varanasi & River Ganga" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);
  const [bookingType, setBookingType] = useState("tour");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  // Filter States for Journeys
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const [travellersCount, setTravellersCount] = useState("2");
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedGroupSize, setSelectedGroupSize] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [onlyOpenSeats, setOnlyOpenSeats] = useState(false);

  const destinationOptions = [
    "Delhi",
    "Agra",
    "Jaipur",
    "Kerala",
    "Udaipur",
    "Varanasi",
    "Ladakh",
    "Goa",
    "Hampi",
    "Kashmir",
    "Chennai",
  ];

  // Airport Transfer Filter States
  const [transferCityFilter, setTransferCityFilter] = useState("all");
  const [transferDirectionFilter, setTransferDirectionFilter] = useState("all");

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const suggestions = [];

    destinationOptions.forEach((dest) => {
      if (dest.toLowerCase().includes(q)) {
        suggestions.push({ type: "Destination", text: dest });
      }
    });

    initialTours.forEach((tour) => {
      const matchEn = tour.titleEn.toLowerCase().includes(q);
      const matchJa = tour.titleJa.toLowerCase().includes(q);
      if (matchEn || matchJa) {
        suggestions.push({
          type: "Tour",
          text: lang === "ja" ? tour.titleJa : tour.titleEn,
        });
      }
    });

    ["luxury", "honeymoon", "family", "adventure", "pilgrimage"].forEach((cat) => {
      if (cat.includes(q)) {
        suggestions.push({
          type: "Category",
          text: cat.charAt(0).toUpperCase() + cat.slice(1),
        });
      }
    });

    return suggestions.slice(0, 6);
  }, [searchQuery, lang]);

  const toggleDestination = (dest) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const toggleInclusion = (inc) => {
    setSelectedInclusions((prev) =>
      prev.includes(inc) ? prev.filter((i) => i !== inc) : [...prev, inc]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setTravelDate("");
    setTravellersCount("2");
    setSelectedDestinations([]);
    setMaxPrice(2000);
    setSelectedDuration("all");
    setSelectedCategory("all");
    setSelectedRating("all");
    setSelectedGroupSize("all");
    setSelectedDifficulty("all");
    setSelectedInclusions([]);
    setOnlyOpenSeats(false);
  };

  const filteredTours = useMemo(() => {
    return initialTours.filter((tour) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitleEn = tour.titleEn.toLowerCase().includes(q);
        const matchesTitleJa = tour.titleJa.toLowerCase().includes(q);
        const matchesDesc = tour.descEn.toLowerCase().includes(q) || tour.descJa.toLowerCase().includes(q);
        const matchesDest = tour.destinations.some((d) => d.toLowerCase().includes(q));
        const matchesCat = tour.category.toLowerCase().includes(q);
        if (!matchesTitleEn && !matchesTitleJa && !matchesDesc && !matchesDest && !matchesCat) {
          return false;
        }
      }

      if (selectedDestinations.length > 0) {
        const hasDest = selectedDestinations.some((sd) =>
          tour.destinations.map((d) => d.toLowerCase()).includes(sd.toLowerCase())
        );
        if (!hasDest) return false;
      }

      if (tour.price > maxPrice) return false;

      if (selectedDuration !== "all") {
        if (selectedDuration === "1-3" && (tour.durationDays < 1 || tour.durationDays > 3)) return false;
        if (selectedDuration === "4-7" && (tour.durationDays < 4 || tour.durationDays > 7)) return false;
        if (selectedDuration === "8-14" && (tour.durationDays < 8 || tour.durationDays > 14)) return false;
        if (selectedDuration === "15+" && tour.durationDays < 15) return false;
      }

      if (selectedCategory !== "all" && tour.category !== selectedCategory) return false;

      if (selectedRating !== "all") {
        const minRating = parseFloat(selectedRating);
        if (tour.rating < minRating) return false;
      }

      if (selectedGroupSize !== "all" && tour.groupSize !== selectedGroupSize) return false;
      if (selectedDifficulty !== "all" && tour.difficulty !== selectedDifficulty) return false;

      if (selectedInclusions.length > 0) {
        const hasAllInclusions = selectedInclusions.every((inc) =>
          tour.inclusions.includes(inc)
        );
        if (!hasAllInclusions) return false;
      }

      if (onlyOpenSeats && tour.seatsOpen <= 0) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedDestinations,
    maxPrice,
    selectedDuration,
    selectedCategory,
    selectedRating,
    selectedGroupSize,
    selectedDifficulty,
    selectedInclusions,
    onlyOpenSeats,
  ]);

  const filteredTransfers = useMemo(() => {
    return airportTransfers.filter((item) => {
      if (transferCityFilter !== "all" && item.city.toLowerCase() !== transferCityFilter.toLowerCase()) {
        return false;
      }
      if (transferDirectionFilter !== "all" && item.direction !== transferDirectionFilter) {
        return false;
      }
      return true;
    });
  }, [transferCityFilter, transferDirectionFilter]);

  const handleOpenBooking = (tour = null, type = "tour") => {
    setSelectedTourForBooking(tour);
    setBookingType(type);
    setBookingSubmitted(false);
    setBookingModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleOpenAuth = (tab = "login") => {
    setAuthTab(tab);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderFilterControls = (isMobile = false) => (
    <>
      {/* Autocomplete Search */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.searchLabel}</label>
        <div className="search-input-group">
          <input
            type="text"
            className="sidebar-input"
            placeholder={t.filter.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAutocomplete(true);
            }}
            onFocus={() => setShowAutocomplete(true)}
            onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
          />
          {showAutocomplete && autocompleteSuggestions.length > 0 && (
            <div className="autocomplete-box">
              {autocompleteSuggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="autocomplete-item"
                  onMouseDown={() => {
                    setSearchQuery(item.text);
                    setShowAutocomplete(false);
                  }}
                >
                  <span>{item.text}</span>
                  <span className="autocomplete-badge">{item.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date & Travellers */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.dateLabel}</label>
        <input
          type="date"
          className="sidebar-input"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.travellersLabel}</label>
        <select
          className="sidebar-input"
          value={travellersCount}
          onChange={(e) => setTravellersCount(e.target.value)}
        >
          <option value="1">1 Person (Solo)</option>
          <option value="2">2 Persons (Couple)</option>
          <option value="3-4">3-4 Persons (Small Group)</option>
          <option value="5+">5+ Persons (Family / Group)</option>
        </select>
      </div>

      {/* Destination Multi-Select Pills */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.destLabel}</label>
        <div className="sidebar-pill-wrap">
          {destinationOptions.map((dest) => (
            <button
              key={dest}
              type="button"
              className={`sidebar-pill ${selectedDestinations.includes(dest) ? "active" : ""}`}
              onClick={() => toggleDestination(dest)}
            >
              {selectedDestinations.includes(dest) ? <Icons.Check /> : "+"}
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="sidebar-group">
        <label className="sidebar-label">
          <span>{t.filter.priceLabel}</span>
          <span style={{ color: "var(--accent)" }}>${maxPrice}</span>
        </label>
        <input
          type="range"
          min="400"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="sidebar-slider"
        />
        <div className="slider-values">
          <span>$400</span>
          <span>$2,000+</span>
        </div>
      </div>

      {/* Duration */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.durationLabel}</label>
        <select
          className="sidebar-input"
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
        >
          <option value="all">All Durations</option>
          <option value="1-3">1 - 3 Days</option>
          <option value="4-7">4 - 7 Days</option>
          <option value="8-14">8 - 14 Days</option>
          <option value="15+">15+ Days</option>
        </select>
      </div>

      {/* Category */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.categoryLabel}</label>
        <select
          className="sidebar-input"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="luxury">Luxury</option>
          <option value="honeymoon">Honeymoon</option>
          <option value="family">Family</option>
          <option value="adventure">Adventure</option>
          <option value="pilgrimage">Pilgrimage</option>
        </select>
      </div>

      {/* Rating */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.ratingLabel}</label>
        <select
          className="sidebar-input"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="all">Any Rating</option>
          <option value="4.8">4.8+ Stars</option>
          <option value="4.0">4.0+ Stars</option>
          <option value="3.0">3.0+ Stars</option>
        </select>
      </div>

      {/* Group Size */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.groupSizeLabel}</label>
        <select
          className="sidebar-input"
          value={selectedGroupSize}
          onChange={(e) => setSelectedGroupSize(e.target.value)}
        >
          <option value="all">All Group Sizes</option>
          <option value="solo">Solo</option>
          <option value="couple">Couple</option>
          <option value="family">Family</option>
          <option value="group">Group</option>
        </select>
      </div>

      {/* Difficulty */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.difficultyLabel}</label>
        <select
          className="sidebar-input"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy (Relaxed)</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard (Expedition)</option>
        </select>
      </div>

      {/* Inclusions */}
      <div className="sidebar-group">
        <label className="sidebar-label">{t.filter.inclusionsLabel}</label>
        <div className="inclusions-grid">
          {["meals", "hotel", "flights", "guide"].map((inc) => (
            <label key={inc} className="check-label">
              <input
                type="checkbox"
                checked={selectedInclusions.includes(inc)}
                onChange={() => toggleInclusion(inc)}
              />
              <span>{inc.charAt(0).toUpperCase() + inc.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Open Seats Toggle */}
      <div className="sidebar-group" style={{ marginTop: "4px" }}>
        <label className="check-label" style={{ fontWeight: "600", fontSize: "12px" }}>
          <input
            type="checkbox"
            checked={onlyOpenSeats}
            onChange={(e) => setOnlyOpenSeats(e.target.checked)}
          />
          <span>{t.filter.openSeatsOnly}</span>
        </label>
      </div>

      {isMobile && (
        <button
          className="btn-primary"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={() => setMobileFilterOpen(false)}
        >
          Apply Filters ({filteredTours.length})
        </button>
      )}
    </>
  );

  return (
    <div className="home-wrapper">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#" className="nav-brand">
            <img
              src="/assets/logo.png"
              alt="India Tour Logo"
              className="nav-logo-img"
              width={160}
              height={44}
            />
          </a>

          <nav>
            <ul className="nav-links">
              <li>
                <a
                  href="#journeys"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("journeys");
                  }}
                >
                  {t.nav.explore}
                </a>
              </li>
              <li>
                <a
                  href="#transfers"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("transfers");
                  }}
                >
                  {t.nav.transfers}
                </a>
              </li>
              <li>
                <a
                  href="#approach"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("approach");
                  }}
                >
                  {t.nav.approach}
                </a>
              </li>
              <li>
                <a
                  href="#journeys"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("journeys");
                  }}
                >
                  {t.nav.tailorMade}
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            {/* Language Switcher */}
            <div className="lang-switch" title="Language">
              <button
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${lang === "ja" ? "active" : ""}`}
                onClick={() => setLang("ja")}
              >
                日本語
              </button>
            </div>

            {/* Login / Register */}
            <button
              className="btn-outline"
              onClick={() => handleOpenAuth("login")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {t.nav.loginRegister}
            </button>

            {/* Book Trip */}
            <button
              className="btn-primary"
              onClick={() => handleOpenBooking(null, "tour")}
            >
              {t.nav.bookTrip}
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              className={`burger-btn ${mobileMenuOpen ? "burger-open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE ZOOM-IN MENU PANEL ================= */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`mobile-menu-panel ${mobileMenuOpen ? "open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-header">
          <img
            src="/assets/logo.png"
            alt="India Tour Logo"
            className="nav-logo-img"
            style={{ height: "36px" }}
          />
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* User requirement: items arrow tilted (not straight) */}
        <ul className="mobile-nav-links">
          <li>
            <a
              href="#journeys"
              className="mobile-nav-link"
              onClick={() => scrollTo("journeys")}
            >
              <span>{t.nav.explore}</span>
              <span className="tilted-arrow"><Icons.TiltedArrow /></span>
            </a>
          </li>
          <li>
            <a
              href="#transfers"
              className="mobile-nav-link"
              onClick={() => scrollTo("transfers")}
            >
              <span>{t.nav.transfers}</span>
              <span className="tilted-arrow"><Icons.TiltedArrow /></span>
            </a>
          </li>
          <li>
            <a
              href="#approach"
              className="mobile-nav-link"
              onClick={() => scrollTo("approach")}
            >
              <span>{t.nav.approach}</span>
              <span className="tilted-arrow"><Icons.TiltedArrow /></span>
            </a>
          </li>
          <li>
            <a
              href="#journeys"
              className="mobile-nav-link"
              onClick={() => scrollTo("journeys")}
            >
              <span>{t.nav.tailorMade}</span>
              <span className="tilted-arrow"><Icons.TiltedArrow /></span>
            </a>
          </li>
        </ul>

        {/* User requirement: "in mobile the menu panel bottom has buttons should them up after items" */}
        <div className="mobile-actions">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--primary)" }}>Language / 言語</span>
            <div className="lang-switch">
              <button
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${lang === "ja" ? "active" : ""}`}
                onClick={() => setLang("ja")}
              >
                日本語
              </button>
            </div>
          </div>

          <button
            className="btn-outline"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => handleOpenAuth("login")}
          >
            {t.nav.loginRegister}
          </button>

          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => handleOpenBooking(null, "tour")}
          >
            {t.nav.bookTrip}
          </button>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.img})` }}
            />
          ))}
        </div>

        <div className="hero-overlay" />

        <div className="container hero-content">
          <span className="hero-tag">{t.hero.tag}</span>
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-desc">{t.hero.desc}</p>

          <div className="hero-buttons">
            <button
              className="hero-btn-find"
              onClick={() => scrollTo("journeys")}
            >
              {t.hero.findJourney}
            </button>
            <button
              className="hero-btn-contact"
              onClick={() => handleOpenBooking(null, "tour")}
            >
              {t.hero.contactUs}
            </button>
          </div>
        </div>

        <div className="hero-controls">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* ================= EXPLORE JOURNEYS SECTION: STICKY SIDEBAR + CARDS ================= */}
      <section id="journeys" className="journeys-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t.filter.tag}</span>
            <h2 className="section-title">{t.filter.title}</h2>
            <p className="section-subtitle">{t.filter.subtitle}</p>
          </div>

          <div className="journeys-layout">
            {/* Desktop Left Sidebar (Sticky throughout section without scrollbar) */}
            <aside className="filter-sidebar">
              <div className="sidebar-header">
                <span className="sidebar-title">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  {t.filter.filterTitle}
                </span>
                <span className="sidebar-clear-link" onClick={resetFilters}>
                  {t.filter.clearAll}
                </span>
              </div>
              {renderFilterControls(false)}
            </aside>

            {/* Right Side: Header + Cards Grid */}
            <main className="journeys-content">
              <div className="journeys-topbar">
                <span className="results-count">
                  <strong>{filteredTours.length}</strong> {t.filter.resultsFound}
                </span>

                {/* Mobile Filter Button with 3 lines (long, medium, short) */}
                <button
                  className="mobile-filter-btn"
                  onClick={() => setMobileFilterOpen(true)}
                  aria-label="Open filter menu"
                >
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 20 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <line x1="2" y1="3" x2="18" y2="3" />
                    <line x1="2" y1="9" x2="13" y2="9" />
                    <line x1="2" y1="15" x2="8" y2="15" />
                  </svg>
                  <span>{t.filter.filterBtn}</span>
                </button>
              </div>

              {/* Tours Grid (Desktop 3/2 cols, Mobile 2x2 grid) */}
              <div className="tours-grid">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => (
                    <div key={tour.id} className="tour-card">
                      <div className="tour-card-image-box">
                        <img
                          src={tour.image}
                          alt={tour.titleEn}
                          className="tour-card-img"
                          onError={(e) => {
                            if (e.currentTarget.src.includes(".png")) {
                              e.currentTarget.src = e.currentTarget.src.replace(".png", ".jpg");
                            } else if (e.currentTarget.src.includes(".jpg")) {
                              e.currentTarget.src = e.currentTarget.src.replace(".jpg", ".png");
                            }
                          }}
                        />
                        <span className="tour-badge">
                          {tour.category.toUpperCase()}
                        </span>
                        {tour.seatsOpen > 0 ? (
                          <span className="tour-seats-badge">
                            {tour.seatsOpen} {t.card.seatsLeft}
                          </span>
                        ) : (
                          <span
                            className="tour-seats-badge"
                            style={{ background: "#6b7280" }}
                          >
                            Sold Out
                          </span>
                        )}
                      </div>

                      <div className="tour-card-body">
                        <div className="tour-meta-row">
                          <span className="tour-location">
                            <Icons.Location />
                            {tour.destinations[0]}
                            {tour.destinations.length > 1
                              ? ` +${tour.destinations.length - 1}`
                              : ""}
                          </span>
                          <span className="tour-rating">
                            <Icons.Star />
                            {tour.rating}
                          </span>
                        </div>

                        <h3 className="tour-card-title">
                          {lang === "ja" ? tour.titleJa : tour.titleEn}
                        </h3>

                        <p className="tour-card-desc">
                          {lang === "ja" ? tour.descJa : tour.descEn}
                        </p>

                        <div className="tour-inclusions-list">
                          <span className="tour-inc-pill">
                            <Icons.Clock />
                            {tour.durationDays} {t.card.days}
                          </span>
                          {tour.inclusions.map((inc, i) => (
                            <span key={i} className="tour-inc-pill">
                              <Icons.Check />
                              {inc}
                            </span>
                          ))}
                        </div>

                        <div className="tour-card-footer">
                          <div className="tour-price-box">
                            <span className="tour-price-label">{t.card.from}</span>
                            <span className="tour-price-amount">
                              {lang === "ja" ? tour.priceJpy : `$${tour.price}`}
                            </span>
                          </div>

                          <button
                            className="btn-primary"
                            onClick={() => handleOpenBooking(tour, "tour")}
                          >
                            {t.card.bookNow}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results-box">
                    <span className="no-results-icon"><Icons.Compass /></span>
                    <h3 className="no-results-title">{t.filter.noResultsTitle}</h3>
                    <p className="no-results-desc">{t.filter.noResultsDesc}</p>
                    <button className="btn-primary" onClick={resetFilters}>
                      {t.filter.viewAlternatives}
                    </button>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* ================= MOBILE FILTER SLIDE-OUT DRAWER ================= */}
      <div
        className={`mobile-filter-backdrop ${mobileFilterOpen ? "open" : ""}`}
        onClick={() => setMobileFilterOpen(false)}
      />
      <div
        className={`mobile-filter-drawer ${mobileFilterOpen ? "open" : ""}`}
        aria-hidden={!mobileFilterOpen}
      >
        <div className="drawer-header">
          <span className="drawer-title">{t.filter.filterTitle}</span>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileFilterOpen(false)}
          >
            ✕
          </button>
        </div>
        {renderFilterControls(true)}
      </div>

      {/* ================= AIRPORT TRANSFERS ACROSS INDIA SECTION (WITH CAR IMAGES) ================= */}
      <section id="transfers" className="transfers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t.transfers.tag}</span>
            <h2 className="section-title">{t.transfers.title}</h2>
            <p className="section-subtitle">{t.transfers.subtitle}</p>
          </div>

          {/* Simple City-based Filter Dropdowns */}
          <div className="transfer-filter-bar">
            <div className="transfer-select-wrap">
              <span className="transfer-select-label">{t.transfers.filterCity}</span>
              <select
                className="transfer-select"
                value={transferCityFilter}
                onChange={(e) => setTransferCityFilter(e.target.value)}
              >
                <option value="all">{t.transfers.allCities}</option>
                <option value="Mumbai">Mumbai (BOM)</option>
                <option value="Delhi">Delhi (DEL)</option>
                <option value="Bengaluru">Bengaluru (BLR)</option>
                <option value="Kochi">Kochi (COK)</option>
                <option value="Jaipur">Jaipur (JAI)</option>
                <option value="Goa">Goa (GOI/GOX)</option>
              </select>
            </div>

            <div className="transfer-select-wrap">
              <span className="transfer-select-label">{t.transfers.filterDirection}</span>
              <select
                className="transfer-select"
                value={transferDirectionFilter}
                onChange={(e) => setTransferDirectionFilter(e.target.value)}
              >
                <option value="all">{t.transfers.allDirections}</option>
                <option value="arrival">{t.transfers.arrivalOnly}</option>
                <option value="departure">{t.transfers.departureOnly}</option>
              </select>
            </div>
          </div>

          {/* Airport Transfers Grid - with car images and 2x2 responsive mobile */}
          <div className="transfers-grid">
            {filteredTransfers.map((item) => (
              <div key={item.id} className="transfer-card">
                <div className="transfer-card-image-box">
                  <img
                    src={item.image}
                    alt={item.titleEn}
                    className="transfer-card-img"
                  />
                </div>

                <div className="transfer-card-body">
                  <span className="transfer-card-tag">
                    <Icons.Plane />
                    {lang === "ja" ? item.tagJa : item.tagEn}
                  </span>

                  <h3 className="transfer-card-title">
                    {lang === "ja" ? item.titleJa : item.titleEn}
                  </h3>

                  <div className="transfer-card-route">
                    {lang === "ja" ? item.routeJa : item.routeEn}
                  </div>

                  <p className="transfer-card-desc">
                    {lang === "ja" ? item.descJa : item.descEn}
                  </p>

                  <button
                    className="transfer-card-btn"
                    onClick={() => handleOpenBooking(item, "transfer")}
                  >
                    {t.transfers.requestQuote}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR CORE PROMISE SECTION (EXACT SCREENSHOT STYLE) ================= */}
      <section id="approach" className="sec-philosophy-screenshot">
        <div className="container">
          <div className="promise-top-tag">{t.philosophy.tag}</div>

          <h2 className="promise-main-title">
            {t.philosophy.titleLine1}
            <br />
            {t.philosophy.titleLine2}
          </h2>

          <p className="promise-sub-text">
            {t.philosophy.subLine1}
            <br />
            {t.philosophy.subLine2}
          </p>

          <div className="promise-columns-grid">
            {t.philosophy.pillars.map((pillar, index) => (
              <div key={index} className="promise-col">
                <div className="promise-col-num">{pillar.num}</div>
                <h3 className="promise-col-title">{pillar.title}</h3>
                <p className="promise-col-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <img
                src="/assets/logo.png"
                alt="India Tour Logo"
                style={{ height: "42px", filter: "brightness(0) invert(1)" }}
              />
              <p>
                {lang === "ja"
                  ? "洗練されたインドの旅を、お客様一人ひとりのペースに合わせてお届けします。日本語サポート完備。"
                  : "Curating mindful, bespoke luxury itineraries and chauffeured airport transfers across India with total transparency and Japanese support."}
              </p>
            </div>

            <div className="footer-col">
              <h4>{lang === "ja" ? "ツアー一覧" : "Journeys"}</h4>
              <ul className="footer-links">
                <li><a href="#journeys">Golden Triangle</a></li>
                <li><a href="#journeys">Kerala Backwaters</a></li>
                <li><a href="#journeys">Royal Rajasthan</a></li>
                <li><a href="#journeys">Sacred Varanasi</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{lang === "ja" ? "空港送迎" : "Airport Transfers"}</h4>
              <ul className="footer-links">
                <li><a href="#transfers">Mumbai Airport (BOM)</a></li>
                <li><a href="#transfers">Delhi Airport (DEL)</a></li>
                <li><a href="#transfers">Bengaluru Airport (BLR)</a></li>
                <li><a href="#transfers">Kochi & Goa Transfers</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{lang === "ja" ? "お問い合わせ" : "Contact & Support"}</h4>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: "1.7" }}>
                Tokyo Office & New Delhi Concierge
                <br />
                Email: concierge@indiatour.jp
                <br />
                Support: 24/7 EN & 日本語
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} India Tour Experiences. All rights reserved.</span>
            <span>Thoughtfully Crafted, Personally Yours.</span>
          </div>
        </div>
      </footer>

      {/* ================= FLOATING CONTACT ACTION BUTTONS (CALL, WHATSAPP, LINE) ================= */}
      <div className="floating-contact-bar">
        {/* Call Icon above WhatsApp with different bg color */}
        <a
          href="tel:+919876543210"
          className="floating-icon-btn call"
          aria-label="Call Concierge"
        >
          <Icons.Phone />
          <span className="floating-tooltip">
            {lang === "ja" ? "お電話で相談" : "Call Concierge"}
          </span>
        </a>

        {/* WhatsApp Icon using FontAwesome / Icon class */}
        <a
          href="https://wa.me/?text=Hello!%20I%20would%20like%20to%20inquire%20about%20an%20India%20Tour%20or%20Airport%20Transfer."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-icon-btn whatsapp"
          aria-label="Contact us on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp floating-icon-fa"></i>
          <span className="floating-tooltip">Chat on WhatsApp</span>
        </a>

        {/* LINE Icon using genuine LINE brand icon, not simple text */}
        <a
          href="https://line.me"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-icon-btn line"
          aria-label="Contact us on LINE"
        >
          <i className="fa-brands fa-line floating-icon-fa line-icon-size"></i>
          <span className="floating-tooltip">LINEでお問い合わせ</span>
        </a>
      </div>

      {/* ================= BOOKING & QUOTATION MODAL ================= */}
      {bookingModalOpen && (
        <div className="modal-overlay" onClick={() => setBookingModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setBookingModalOpen(false)}
            >
              ✕
            </button>

            <div className="modal-header">
              <h3 className="modal-title">
                {bookingType === "transfer" ? t.modal.transferTitle : t.modal.bookTitle}
              </h3>
              <p className="modal-subtitle">
                {selectedTourForBooking
                  ? (lang === "ja" ? selectedTourForBooking.titleJa : selectedTourForBooking.titleEn)
                  : t.modal.bookSubtitle}
              </p>
            </div>

            {bookingSubmitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                  <Icons.SuccessSparkle />
                </div>
                <h4 style={{ fontSize: "17px", color: "var(--primary)", marginTop: "8px", marginBottom: "8px" }}>
                  {t.modal.bookingSuccess}
                </h4>
                <button
                  className="btn-primary"
                  style={{ marginTop: "16px" }}
                  onClick={() => setBookingModalOpen(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                className="modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingSubmitted(true);
                }}
              >
                <div className="form-field">
                  <label className="form-label">{t.modal.fullName} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kenji Tanaka / Sarah Jenkins"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">{t.modal.email} *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">{t.modal.phone}</label>
                  <input
                    type="tel"
                    placeholder="+81 90-1234-5678 / +1 ..."
                    className="form-input"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-field">
                    <label className="form-label">{t.modal.dates}</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">{t.modal.guests}</label>
                    <select className="form-input" defaultValue="2">
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4+">4+ Persons</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">{t.modal.requests}</label>
                  <textarea
                    rows={3}
                    placeholder={
                      lang === "ja"
                        ? "フライト便名、ホテル名、専用車のご希望など自由にご記入ください。"
                        : "Flight number, hotel name, private vehicle preference, or special requests..."
                    }
                    className="form-input"
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", padding: "12px", marginTop: "6px" }}
                >
                  {t.modal.confirmBooking}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= LOGIN / REGISTER MODAL ================= */}
      {authModalOpen && (
        <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setAuthModalOpen(false)}
            >
              ✕
            </button>

            <div className="form-tabs">
              <button
                className={`form-tab-btn ${authTab === "login" ? "active" : ""}`}
                onClick={() => setAuthTab("login")}
              >
                {t.modal.loginTab}
              </button>
              <button
                className={`form-tab-btn ${authTab === "register" ? "active" : ""}`}
                onClick={() => setAuthTab("register")}
              >
                {t.modal.registerTab}
              </button>
            </div>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  lang === "ja"
                    ? "デモモード：ログインに成功しました！"
                    : "Demo Mode: Signed in successfully!"
                );
                setAuthModalOpen(false);
              }}
            >
              {authTab === "register" && (
                <div className="form-field">
                  <label className="form-label">{t.modal.fullName}</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-field">
                <label className="form-label">{t.modal.email}</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">{t.modal.password}</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>

              {authTab === "register" && (
                <div className="form-field">
                  <label className="form-label">{t.modal.confirmPassword}</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="form-input"
                  />
                </div>
              )}

              {authTab === "login" && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked />
                    <span>{t.modal.rememberMe}</span>
                  </label>
                  <a href="#" style={{ color: "var(--accent)", fontWeight: "500" }}>
                    {lang === "ja" ? "パスワード再設定" : "Forgot Password?"}
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", padding: "12px", marginTop: "6px" }}
              >
                {authTab === "login"
                  ? t.modal.submitLogin
                  : t.modal.submitRegister}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

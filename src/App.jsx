import React, { useState, useEffect, useCallback } from 'react';
import {
  Mic, Camera, MapPin, Flag, Zap, BookOpen, Heart, MessageSquare, Upload, X, Shield,
  Search, AlertTriangle, ChevronLeft, Calendar, Sun, Smartphone, Syringe, MessageCircle, Gavel
} from 'lucide-react';
import PhoneMock from './components/PhoneMock.jsx';

// --- TRANSLATION MAP ---
const TRANSLATIONS = {
  // English (en)
  en: {
    hello: "Hello, ", home: "Home", healthScan: "Health Scan (VLM)", vaccineFinder: "Vaccine & Center Finder",
    govtSchemes: "Government Schemes", milestone: "Milestone Tracker", reports: "Reports Analyzer",
    dailyTips: "Daily Tips", nutritionTip: "Nutrition Tip", schemeAlert: "Scheme Alert",
    emergency: "Emergency", legalPrivacy: "Legal & Privacy", chatTitle: "Ask/Chat Shishu",
    snapUnderstandAct: "1. Snap. 2. Understand. 3. Act.",
    uploadTip: "Take a clear photo of the symptom (rash, stool, etc.). Our VLM provides quick triage.",
    uploadImage: "Upload symptom image", runScan: "Run AI Health Scan", scanHistory: "View Smart Health Card history →",
    locationDetected: "Location detected: Bhilai, Chhattisgarh", nextVaccine: "Next vaccine due: DTaP (6 weeks)",
    nearbyCenters: "Nearby centers & slots", getDirections: "Get directions",
    eligibilityCheck: "Personalized eligibility check",
    eligibleSchemes: "Based on your profile (rural/low-income), you're eligible for:",
    eligible: "Eligible", viewBenefits: "View detailed benefits (audio) →",
    chatPrompt: "Tap & speak your question in Hindi, Bengali or English.",
    chatPrompt2: "Ask me about feeding, sleep or schemes!", aiResponse: "AI response (voice-first):",
    listen: "Listen in local language", thinking: "Shishu is thinking...", typeToSpeak: "Type or tap MIC to speak...",
    simulateRash: "Simulate rash", simulateStool: "Simulate stool",
    detectedCondition: "Detected condition:", triageHome: "Home care recommended",
    triageConsult: "Consult Doctor", triageUrgent: "Consult Doctor Now",
    serviceTitle: "Services",
    typeGovt: "Govt (Free)", typePrivate: "Private", typeICDS: "Govt (ICDS)",
    schemeBenefitJSY: "Cash incentive of ₹6,000 for institutional delivery. Your next payment is due.",
    schemeBenefitPOSHAN: "Monthly take-home ration (THR) and micronutrient supplements. Reminder to collect kit.",
    schemeBenefitIndradhanush: "Ensures full immunization. Linked to your child's vaccine tracker.",
    schemeBenefitICDS: "Access to Anganwadi pre-school education and nutrition counselling.",
    consultExpert: "Connect to Human Expert",
  },
  // Hindi (hi)
  hi: {
    hello: "नमस्ते, ", home: "होम", healthScan: "हेल्थ स्कैन (VLM)", vaccineFinder: "टीका केंद्र व स्थान",
    govtSchemes: "सरकारी योजनाएं", milestone: "विकास ट्रैक", reports: "रिपोर्ट विश्लेषक",
    dailyTips: "दैनिक सुझाव", nutritionTip: "पोषण सलाह", schemeAlert: "योजना अलर्ट",
    emergency: "आपातकाल", legalPrivacy: "कानूनी और गोपनीयता", chatTitle: "पूछो/बात करो शिशु",
    snapUnderstandAct: "1. फोटो लो. 2. समझो. 3. कार्रवाई करो.",
    uploadTip: "लक्षणों (दाने, मल, आदि) की स्पष्ट तस्वीर लें। हमारा VLM तुरंत निदान प्रदान करता है।",
    uploadImage: "लक्षण की छवि अपलोड करें", runScan: "एआई हेल्थ स्कैन चलाएं", scanHistory: "स्मार्ट हेल्थ कार्ड इतिहास देखें →",
    locationDetected: "स्वतः पता लगाया गया स्थान: भिलाई, छत्तीसगढ़", nextVaccine: "अगला टीका देय: डीटीएपी (6 सप्ताह)",
    nearbyCenters: "आस-पास के केंद्र और स्लॉट", getDirections: "दिशानिर्देश प्राप्त करें",
    eligibilityCheck: "व्यक्तिगत पात्रता जांच",
    eligibleSchemes: "आपकी प्रोफ़ाइल (ग्रामीण/निम्न-आय) के आधार पर, आप निम्नलिखित प्रमुख योजनाओं के लिए पात्र हैं:",
    eligible: "पात्र", viewBenefits: "विस्तृत लाभ देखें (ऑडियो स्पष्टीकरण) →",
    chatPrompt: "हिंदी, बंगाली या अंग्रेजी में अपना प्रश्न टैप करें और बोलें।",
    chatPrompt2: "मुझसे खिलाने, सोने या योजनाओं के बारे में पूछो!", aiResponse: "एआई प्रतिक्रिया (वॉयस-फर्स्ट उत्तर):",
    listen: "स्थानीय भाषा में सुनें", thinking: "शिशु सोच रहा है...", typeToSpeak: "टाइप करें या बोलने के लिए एमआईसी टैप करें...",
    simulateRash: "दाने का अनुकरण करें", simulateStool: "मल का अनुकरण करें",
    detectedCondition: "पहचाना गया लक्षण:", triageHome: "घरेलू देखभाल की सिफारिश",
    triageConsult: "डॉक्टर से सलाह लें", triageUrgent: "अभी डॉक्टर से सलाह लें",
    serviceTitle: "सेवाएं",
    typeGovt: "सरकारी (मुफ्त)", typePrivate: "निजी", typeICDS: "सरकारी (ICDS)",
    schemeBenefitJSY: "संस्थागत प्रसव के लिए ₹6,000 का नकद प्रोत्साहन। आपका अगला भुगतान देय है।",
    schemeBenefitPOSHAN: "मासिक टेक-होम राशन (THR) और सूक्ष्म पोषक तत्वों की आपूर्ति। किट लेने का अनुस्मारक।",
    schemeBenefitIndradhanush: "पूर्ण टीकाकरण सुनिश्चित करता है। आपके बच्चे के वैक्सीन ट्रैकर से जुड़ा हुआ है।",
    schemeBenefitICDS: "आंगनवाड़ी प्री-स्कूल शिक्षा और पोषण परामर्श तक पहुंच।",
    consultExpert: "मानव विशेषज्ञ से जुड़ें",
  },
  // Bengali (bn)
  bn: { 
    hello: "হ্যালো, ", home: "হোম", healthScan: "স্বাস্থ্য স্ক্যান (VLM)", vaccineFinder: "টিকা কেন্দ্র অনুসন্ধান",
    govtSchemes: "সরকারি স্কিম ও নির্দেশিকা", milestone: "মাইলফলক ট্র্যাকার", reports: "রিপোর্ট বিশ্লেষক",
    dailyTips: "দৈনিক টিপস", nutritionTip: "পুষ্টি টিপ", schemeAlert: "স্কিম সতর্কতা",
    emergency: "জরুরী অবস্থা", legalPrivacy: "আইনগত ও গোপনীয়তা", chatTitle: "জিজ্ঞাসা করুন/কথা বলুন শিশু",
    snapUnderstandAct: "১. স্ন্যাপ করুন। ২. বুঝুন। ৩. কাজ করুন।",
    uploadTip: "উপসর্গের (ফুসকুড়ি, মল, ইত্যাদি) একটি পরিষ্কার ছবি তুলুন। আমাদের VLM তাৎক্ষণিক ট্রিয়াজ প্রদান করে।",
    uploadImage: "উপসর্গের ছবি আপলোড করুন", runScan: "এআই স্বাস্থ্য স্ক্যান চালান", scanHistory: "স্মার্ট হেলথ কার্ডের ইতিহাস দেখুন →",
    locationDetected: "স্বয়ংক্রিয়ভাবে সনাক্ত করা স্থান: ভিলাই, ছত্তিশগড়", nextVaccine: "পরবর্তী টিকা বাকি: DTaP (৬ সপ্তাহ)",
    nearbyCenters: "কাছাকাছি কেন্দ্র ও স্লট", getDirections: "দিকনির্দেশ পান",
    eligibilityCheck: "ব্যক্তিগতকৃত যোগ্যতা যাচাই",
    eligibleSchemes: "আপনার প্রোফাইলের (গ্রামীণ/স্বল্প-আয়) ভিত্তিতে, আপনি নিম্নলিখিত প্রধান স্কিমগুলির জন্য যোগ্য:",
    eligible: "যোগ্য", viewBenefits: "বিস্তারিত সুবিধা দেখুন (অডিও ব্যাখ্যা) →",
    chatPrompt: "বাংলা, হিন্দি বা ইংরেজিতে আপনার প্রশ্নটি ট্যাপ করে বলুন।",
    chatPrompt2: "খাওয়ানো, ঘুম বা স্কিম সম্পর্কে আমাকে জিজ্ঞাসা করুন!", aiResponse: "এআই প্রতিক্রিয়া (ভয়েস-ফার্স্ট উত্তর):",
    listen: "স্থানীয় ভাষায় শুনুন", thinking: "শিশু ভাবছে...", typeToSpeak: "টাইপ করুন বা কথা বলার জন্য এমআইসি ট্যাপ করুন...",
    simulateRash: "ফুসকুড়ি অনুকরণ করুন", simulateStool: "মল অনুকরণ করুন",
    detectedCondition: "সনাক্ত করা অবস্থা:", triageHome: "ঘরেই যত্নের পরামর্শ",
    triageConsult: "ডাক্তারের পরামর্শ নিন", triageUrgent: "এখনই ডাক্তারের পরামর্শ নিন",
    serviceTitle: "পরিষেবা",
    typeGovt: "সরকারি (বিনামূল্যে)", typePrivate: "বেসরকারি", typeICDS: "সরকারি (ICDS)",
    schemeBenefitJSY: "প্রাতিষ্ঠানিক প্রসবের জন্য ₹6,000 নগদ প্রণোদনা। আপনার পরবর্তী অর্থপ্রদানের তারিখ হয়েছে।",
    schemeBenefitPOSHAN: "মাসিক টেক-হোম রেশন (THR) এবং মাইক্রোনিউট্রিয়েন্ট সাপ্লিমেন্টস। কিট সংগ্রহের অনুস্মারক।",
    schemeBenefitIndradhanush: "সম্পূর্ণ টিকা নিশ্চিত করে। আপনার সন্তানের ভ্যাকসিন ট্র্যাকারের সাথে লিঙ্ক করা হয়েছে।",
    schemeBenefitICDS: "আঙ্গনওয়াড়ি প্রাক-স্কুল শিক্ষা এবং পুষ্টি পরামর্শ অ্যাক্সেস।",
    consultExpert: "মানব বিশেষজ্ঞের সাথে সংযোগ করুন",
  },
  // Marathi (mr)
  mr: { 
    hello: "नमस्कार, ", home: "होम", healthScan: "आरोग्य स्कॅन (VLM)", vaccineFinder: "लसीकरण केंद्र शोधा",
    govtSchemes: "सरकारी योजना आणि मार्गदर्शक तत्त्वे", milestone: "माईलस्टोन ट्रॅकर", reports: "चाचणी अहवाल विश्लेषक",
    dailyTips: "दैनंदिन टिप्स", nutritionTip: "पोषण सल्ला", schemeAlert: "योजना अलर्ट",
    emergency: "आपत्कालीन", legalPrivacy: "कायदेशीर आणि गोपनीयता", chatTitle: "शिशूला विचारा/बोला",
    snapUnderstandAct: "१. स्नॅप करा. २. समजावून घ्या. ३. कृती करा.",
    uploadTip: "लक्षणांचा (पुरळ, मल, इ.) स्पष्ट फोटो क्लिक करा. आमचे VLM त्वरित वर्गीकरण प्रदान करते.",
    uploadImage: "लक्षणाची प्रतिमा अपलोड करा", runScan: "एआय आरोग्य स्कॅन चालवा", scanHistory: "स्मार्ट हेल्थ कार्ड इतिहास पहा →",
    locationDetected: "स्वयंचलितपणे शोधलेले स्थान: भिलाई, छत्तीसगड", nextVaccine: "पुढील लसीची देय तारीख: DTaP (६ आठवडे)",
    nearbyCenters: "जवळचे केंद्र आणि स्लॉट", getDirections: "दिशानिर्देश मिळवा",
    eligibilityCheck: "वैयक्तिकृत पात्रता तपासणी",
    eligibleSchemes: "तुमच्या प्रोफाइलनुसार (ग्रामीण/कमी उत्पन्न), तुम्ही खालील प्रमुख योजनांसाठी पात्र आहात:",
    eligible: "पात्र", viewBenefits: "तपशीलवार फायदे पहा (ऑडिओ स्पष्टीकरण) →",
    chatPrompt: "मराठी, हिंदी किंवा इंग्रजीमध्ये तुमचा प्रश्न टॅप करा आणि बोला।",
    chatPrompt2: "मला आहार, झोप किंवा योजनांबद्दल विचारा!", aiResponse: "एआय प्रतिसाद (व्हॉइस-फर्स्ट उत्तर):",
    listen: "स्थानिक भाषेत ऐका", thinking: "शिशु विचार करत आहे...", typeToSpeak: "टाईप करा किंवा बोलण्यासाठी एमआयसी टॅप करा...",
    simulateRash: "पुरळ अनुकरण करा", simulateStool: "मल अनुकरण करा",
    detectedCondition: "ओळखलेली स्थिती:", triageHome: "घरी काळजी घेण्याची शिफारस",
    triageConsult: "डॉक्टरांचा सल्ला घ्या", triageUrgent: "आता डॉक्टरांचा सल्ला घ्या",
    serviceTitle: "सेवा",
    typeGovt: "सरकारी (विनामूल्य)", typePrivate: "खाजगी", typeICDS: "सरकारी (ICDS)",
    schemeBenefitJSY: "संस्थात्मक प्रसूतीसाठी ₹6,000 रोख प्रोत्साहन. तुमचे पुढील पेमेंट देय आहे।",
    schemeBenefitPOSHAN: "मासिक टेक-होम राशन (THR) आणि सूक्ष्म पोषक तत्वांची पूर्तता। किट जमा करण्याची आठवण।",
    schemeBenefitIndradhanush: "संपूर्ण लसीकरण सुनिश्चित करते। तुमच्या मुलाच्या लस ट्रॅकरशी जोडलेले आहे।",
    schemeBenefitICDS: "अंगणवाडी प्री-स्कूल शिक्षण आणि पोषण समुपदेशन प्रवेश।",
    consultExpert: "मानवी तज्ञाशी कनेक्ट करा",
  },
  // Gujarati (gu)
  gu: { 
    hello: "નમસ્કાર, ", home: "હોમ", healthScan: "હેલ્થ સ્કેન (VLM)", vaccineFinder: "રસી અને કેન્દ્ર શોધક",
    govtSchemes: "સરકારી યોજનાઓ અને માર્ગદર્શિકા", milestone: "માઇલસ્ટોન ટ્રેકર", reports: "ટેસ્ટ રિપોર્ટ વિશ્લેષક",
    dailyTips: "દૈનિક ટીપ્સ", nutritionTip: "પોષણ સલાહ", schemeAlert: "યોજના ચેતવણી",
    emergency: "કટોકટી", legalPrivacy: "કાનૂની અને ગોપનીયતા", chatTitle: "પૂછો/વાત કરો શિશુ",
    snapUnderstandAct: "૧. સ્નેપ. ૨. સમજો. ૩. કાર્ય કરો।",
    uploadTip: "લક્ષણો (ફોલ્લીઓ, સ્ટૂલ, વગેરે)નો સ્પષ્ટ ફોટો ક્લિક કરો। અમારું VLM ત્વરિત વર્ગીકરણ પ્રદાન કરે છે।",
    uploadImage: "લક્ષણની છબી અપલોડ કરો", runScan: "AI હેલ્થ સ્કેન ચલાવો", scanHistory: "સ્માર્ટ હેલ્થ કાર્ડ ઇતિહાસ જુઓ →",
    locationDetected: "સ્વતઃ શોધાયેલું સ્થાન: ભિલાઈ, છત્તીસગઢ", nextVaccine: "આગામી રસી બાકી: DTaP (૬ અઠવાડિયા)",
    nearbyCenters: "નજીકના કેન્દ્રો અને સ્લોટ્સ", getDirections: "દિશાઓ મેળવો",
    eligibilityCheck: "વ્યક્તિગત પાત્રતા તપાસ",
    eligibleSchemes: "તમારી પ્રોફાઇલ (ગ્રામીણ/ઓછી આવક)ના આધારે, તમે નીચેની મુખ્ય યોજનાઓ માટે પાત્ર છો:",
    eligible: "પાત્ર", viewBenefits: "વિગતવાર લાભો જુઓ (ઓડિયો સ્પષ્ટીકરણ) →",
    chatPrompt: "ગુજરાતી, હિન્દી અથવા અંગ્રેજીમાં તમારો પ્રશ્ન ટેપ કરો અને બોલો।",
    chatPrompt2: "મને ખોરાક, ઊંઘ અથવા યોજનાઓ વિશે પૂછો!", aiResponse: "AI પ્રતિભાવ (વોઇસ-ફર્સ્ટ જવાબ):",
    listen: "સ્થાનિક ભાષામાં સાંભળો", thinking: "શિશુ વિચારી રહ્યું છે...", typeToSpeak: "ટાઈપ કરો અથવા બોલવા માટે MIC ટેપ કરો...",
    simulateRash: "ફોલ્લીઓનું અનુકરણ કરો", simulateStool: "સ્ટૂલનું અનુકરણ કરો",
    detectedCondition: "ઓળખાયેલી સ્થિતિ:", triageHome: "ઘરે સંભાળની ભલામણ",
    triageConsult: "ડોક્ટરની સલાહ લો", triageUrgent: "હમણાં ડોક્ટરની સલાહ લો",
    serviceTitle: "સેવાઓ",
    typeGovt: "સરકારી (મફત)", typePrivate: "ખાનગી", typeICDS: "સરકારી (ICDS)",
    schemeBenefitJSY: "સંસ્થાકીય ડિલિવરી માટે ₹6,000 રોકડ પ્રોત્સાહન। તમારું આગામી ચુકવણી બાકી છે।",
    schemeBenefitPOSHAN: "માસિક ટેક-હોમ રેશન (THR) અને સૂક્ષ્મ પોષકતત્ત્વોના પૂરક। કીટ એકત્રિત કરવા માટે રીમાઇન્ડર।",
    schemeBenefitIndradhanush: "સંપૂર્ણ રસીકરણ સુનિશ્ચિત કરે છે। તમારા બાળકના રસી ટ્રેકર સાથે લિંક કરેલ છે।",
    schemeBenefitICDS: "આંગણવાડી પ્રી-સ્કૂલ શિક્ષણ અને પોષણ પરામર્શની ઍક્સેસ।",
    consultExpert: "માનવ નિષ્ણાત સાથે જોડો",
  },
  // Tamil (ta)
  ta: { 
    hello: "வணக்கம், ", home: "முகப்பு", healthScan: "உடல்நல ஸ்கேன் (VLM)", vaccineFinder: "தடுப்பூசி மற்றும் மையம் கண்டுபிடிப்பான்",
    govtSchemes: "அரசு திட்டங்கள் மற்றும் வழிகாட்டுதல்கள்", milestone: "மைல்கல் கண்காணிப்பான்", reports: "பரிசோதனை அறிக்கை பகுப்பாய்வி",
    dailyTips: "தினசரி குறிப்புகள்", nutritionTip: "ஊட்டச்சத்து குறிப்பு", schemeAlert: "திட்ட எச்சரிக்கை",
    emergency: "அவசரம்", legalPrivacy: "சட்டம் மற்றும் தனியுரிமை", chatTitle: "கேள்/பேசு சிசு",
    snapUnderstandAct: "1. படம் எடுங்கள். 2. புரிந்து கொள்ளுங்கள். 3. செயல்படுங்கள்।",
    uploadTip: "அறிகுறியின் (சொறி, மலம், போன்றவை) தெளிவான புகைப்படத்தை கிளிக் செய்யவும். எங்கள் VLM உடனடி வகைப்படுத்தலை வழங்குகிறது।",
    uploadImage: "அறிகுறி படத்தை பதிவேற்றவும்", runScan: "AI உடல்நல ஸ்கேன் இயக்கவும்", scanHistory: "ஸ்மார்ட் ஹெல்த் கார்டு வரலாற்றைப் பார்க்கவும் →",
    locationDetected: "தானாக கண்டறியப்பட்ட இடம்: பிலாய், சத்தீஸ்கர்", nextVaccine: "அடுத்த தடுப்பூசி செலுத்த வேண்டியது: DTaP (6 வாரங்கள்)",
    nearbyCenters: "அருகிலுள்ள மையங்கள் மற்றும் இடங்கள்", getDirections: "திசைகளைப் பெறவும்",
    eligibilityCheck: "தனிப்பயனாக்கப்பட்ட தகுதி சரிபார்ப்பு",
    eligibleSchemes: "உங்கள் சுயவிவரத்தின் (கிராமப்புறம்/குறைந்த வருமானம்) அடிப்படையில், பின்வரும் முக்கிய திட்டங்களுக்கு நீங்கள் தகுதியானவர்:",
    eligible: "தகுதியானது", viewBenefits: "விரிவான பலன்களைப் பார்க்கவும் (ஆடியோ விளக்கம்) →",
    chatPrompt: "தமிழ், ஹிந்தி அல்லது ஆங்கிலத்தில் உங்கள் கேள்வியைத் தட்டி பேசவும்।",
    chatPrompt2: "உணவளித்தல், தூக்கம் அல்லது திட்டங்களைப் பற்றி என்னிடம் கேளுங்கள்!", aiResponse: "AI பதில் (குரல்-முதன்மை பதில்):",
    listen: "உள்ளூர் மொழியில் கேளுங்கள்", thinking: "சிசு யோசிக்கிறது...", typeToSpeak: "தட்டச்சு செய்யவும் அல்லது பேச MIC ஐ தட்டவும்...",
    simulateRash: "சொறியை உருவகப்படுத்து", simulateStool: "மலத்தை உருவகப்படுத்து",
    detectedCondition: "கண்டறியப்பட்ட நிலை:", triageHome: "வீட்டு பராமரிப்பு பரிந்துரைக்கப்படுகிறது",
    triageConsult: "மருத்துவரை அணுகவும்", triageUrgent: "இப்போதே மருத்துவரை அணுகவும்",
    serviceTitle: "சேவைகள்",
    typeGovt: "அரசு (இலவசம்)", typePrivate: "தனியார்", typeICDS: "அரசு (ICDS)",
    schemeBenefitJSY: "நிறுவனப் பிரசவத்திற்கு ₹6,000 ரொக்க ஊக்கத்தொகை। உங்கள் அடுத்த கட்டணம் செலுத்த வேண்டியுள்ளது।",
    schemeBenefitPOSHAN: "மாதாந்திர டேக்-ஹோம் ரேஷன் (THR) மற்றும் நுண்ணூட்டச்சத்து சப்ளிமெண்ட்ஸ்। கிட் சேகரிப்பதற்கான நினைவூட்டல்।",
    schemeBenefitIndradhanush: "முழுமையான நோய்த்தடுப்பு மருந்தை உறுதி செய்கிறது। உங்கள் குழந்தையின் தடுப்பூசி கண்காணிப்பாளருடன் இணைக்கப்பட்டுள்ளது।",
    schemeBenefitICDS: "அங்கன்வாடி முன் பள்ளி கல்வி மற்றும் ஊட்டச்சத்து ஆலோசனைக்கான அணுகல்।",
    consultExpert: "மனித நிபுணருடன் இணைக்கவும்",
  },
  // Punjabi (pa)
  pa: { 
    hello: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, ", home: "ਹੋਮ", healthScan: "ਸਿਹਤ ਸਕੈਨ (VLM)", vaccineFinder: "ਟੀਕਾ ਅਤੇ ਕੇਂਦਰ ਖੋਜਕ",
    govtSchemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼", milestone: "ਮਾਈਲਸਟੋਨ ਟ੍ਰੈਕਰ", reports: "ਟੈਸਟ ਰਿਪੋਰਟ ਵਿਸ਼ਲੇਸ਼ਕ",
    dailyTips: "ਰੋਜ਼ਾਨਾ ਸੁਝਾਅ", nutritionTip: "ਪੋਸ਼ਣ ਸੁਝਾਅ", schemeAlert: "ਸਕੀਮ ਅਲਰਟ",
    emergency: "ਐਮਰਜੈਂਸੀ", legalPrivacy: "ਕਾਨੂੰਨੀ ਅਤੇ ਗੋਪਨੀਯਤਾ", chatTitle: "ਪੁੱਛੋ/ਬੋਲੋ ਸ਼ਿਸ਼ੂ",
    snapUnderstandAct: "1. ਸਨੈਪ ਕਰੋ। 2. ਸਮਝੋ। 3. ਕਾਰਵਾਈ ਕਰੋ।",
    uploadTip: "ਲੱਛਣਾਂ (ਧੱਫੜ, ਟੱਟੀ, ਆਦਿ) ਦੀ ਸਾਫ਼ ਫੋਟੋ ਕਲਿੱਕ ਕਰੋ। ਸਾਡਾ VLM ਤੁਰੰਤ ਵਰਗੀਕਰਨ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
    uploadImage: "ਲੱਛਣ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ", runScan: "AI ਸਿਹਤ ਸਕੈਨ ਚਲਾਓ", scanHistory: "ਸਮਾਰਟ ਹੈਲਥ ਕਾਰਡ ਦਾ ਇਤਿਹਾਸ ਦੇਖੋ →",
    locationDetected: "ਸਵੈ-ਖੋਜਿਆ ਸਥਾਨ: ਭਿਲਾਈ, ਛੱਤੀਸਗੜ੍ਹ", nextVaccine: "ਅਗਲਾ ਟੀਕਾ ਬਾਕੀ: DTaP (6 ਹਫ਼ਤੇ)",
    nearbyCenters: "ਨੇੜਲੇ ਕੇਂਦਰ ਅਤੇ ਸਲਾਟ", getDirections: "ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ",
    eligibilityCheck: "ਨਿੱਜੀ ਯੋਗਤਾ ਜਾਂਚ",
    eligibleSchemes: "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ (ਪੇਂਡੂ/ਘੱਟ ਆਮਦਨ) ਦੇ ਆਧਾਰ 'ਤੇ, ਤੁਸੀਂ ਹੇਠ ਲਿਖੀਆਂ ਮੁੱਖ ਸਕੀਮਾਂ ਲਈ ਯੋਗ ਹੋ:",
    eligible: "ਯੋਗ", viewBenefits: "ਵਿਸਤ੍ਰਿਤ ਲਾਭ ਦੇਖੋ (ਆਡੀਓ ਵਿਆਖਿਆ) →",
    chatPrompt: "ਪੰਜਾਬੀ, ਹਿੰਦੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਆਪਣਾ ਸਵਾਲ ਟੈਪ ਕਰੋ ਅਤੇ ਬੋਲੋ।",
    chatPrompt2: "ਮੈਨੂੰ ਖੁਆਉਣਾ, ਸੌਣਾ ਜਾਂ ਸਕੀਮਾਂ ਬਾਰੇ ਪੁੱਛੋ!", aiResponse: "AI ਜਵਾਬ (ਵਾਇਸ-ਫਸਟ ਉੱਤਰ):",
    listen: "ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ ਸੁਣੋ", thinking: "ਸ਼ਿਸ਼ੂ ਸੋਚ ਰਿਹਾ ਹੈ...", typeToSpeak: "ਟਾਈਪ ਕਰੋ ਜਾਂ ਬੋਲਣ ਲਈ MIC ਟੈਪ ਕਰੋ...",
    simulateRash: "ਧੱਫੜ ਦਾ ਅਨੁਕਰਣ ਕਰੋ", simulateStool: "ਟੱਟੀ ਦਾ ਅਨੁਕਰਣ ਕਰੋ",
    detectedCondition: "ਪਛਾਣੀ ਗਈ ਸਥਿਤੀ:", triageHome: "ਘਰ ਵਿੱਚ ਦੇਖਭਾਲ ਦੀ ਸਿਫ਼ਾਰਸ਼",
    triageConsult: "ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਲਓ", triageUrgent: "ਹੁਣੇ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਲਓ",
    serviceTitle: "ਸੇਵਾਵਾਂ",
    typeGovt: "ਸਰਕਾਰੀ (ਮੁਫ਼ਤ)", typePrivate: "ਨਿੱਜੀ", typeICDS: "ਸਰਕਾਰੀ (ICDS)",
    schemeBenefitJSY: "ਸੰਸਥਾਗਤ ਜਣੇਪੇ ਲਈ ₹6,000 ਦਾ ਨਕਦ ਪ੍ਰੋਤਸਾਹਨ। ਤੁਹਾਡਾ ਅਗਲਾ ਭੁਗਤਾਨ ਬਕਾਇਆ ਹੈ।",
    schemeBenefitPOSHAN: "ਮਾਸਿਕ ਟੇਕ-ਹੋਮ ਰਾਸ਼ਨ (THR) ਅਤੇ ਮਾਈਕ੍ਰੋਨਿਊਟ੍ਰੀਐਂਟ ਸਪਲੀਮੈਂਟਸ। ਕਿੱਟ ਇਕੱਠੀ ਕਰਨ ਲਈ ਰੀਮਾਈਂਡਰ।",
    schemeBenefitIndradhanush: "ਪੂਰੀ ਟੀਕਾਕਰਨ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ। ਤੁਹਾਡੇ ਬੱਚੇ ਦੇ ਵੈਕਸੀਨ ਟ੍ਰੈਕਰ ਨਾਲ ਲਿੰਕ ਕੀਤਾ ਗਿਆ ਹੈ।",
    schemeBenefitICDS: "ਆਂਗਣਵਾੜੀ ਪ੍ਰੀ-ਸਕੂਲ ਸਿੱਖਿਆ ਅਤੇ ਪੋਸ਼ਣ ਸਲਾਹ-ਮਸ਼ਵਰੇ ਤੱਕ ਪਹੁੰਚ।",
    consultExpert: "ਮਨੁੱਖੀ ਮਾਹਿਰ ਨਾਲ ਜੁੜੋ",
  },
  // Urdu (ur)
  ur: { 
    hello: "آداب، ", home: "ہوم", healthScan: "صحت سکین (VLM)", vaccineFinder: "ویکسین اور مرکز تلاش کنندہ",
    govtSchemes: "سرکاری اسکیمیں اور ہدایات", milestone: "سنگ میل ٹریکر", reports: "ٹیسٹ رپورٹ تجزیہ کار",
    dailyTips: "روزانہ کے مشورے", nutritionTip: "غذائیت کا مشورہ", schemeAlert: "اسکیم الرٹ",
    emergency: "ایمرجنسی", legalPrivacy: "قانونی اور رازداری", chatTitle: "پوچھیں/بات کریں شیشو",
    snapUnderstandAct: "1. تصویر لیں۔ 2. سمجھیں۔ 3. عمل کریں۔",
    uploadTip: "علامت (دانے، پاخانہ، وغیرہ) کی صاف تصویر پر کلک کریں۔ ہمارا VLM فوری درجہ بندی فراہم کرتا ہے۔",
    uploadImage: "علامت کی تصویر اپ لوڈ کریں", runScan: "AI ہیلتھ سکین چلائیں", scanHistory: "اسمارٹ ہیلتھ کارڈ کی تاریخ دیکھیں →",
    locationDetected: "خودکار طور پر پتہ کردہ مقام: بھلائی، چھتیس گڑھ", nextVaccine: "اگلی ویکسین کی تاریخ: DTaP (6 ہفتے)",
    nearbyCenters: "قریبی مراکز اور سلاٹ", getDirections: "سمتیں حاصل کریں",
    eligibilityCheck: "ذاتی اہلیت کی جانچ",
    eligibleSchemes: "آپ کے پروفائل (دیہی/کم آمدنی) کی بنیاد پر، آپ مندرجہ ذیل اہم اسکیموں کے لیے اہل ہیں:",
    eligible: "اہل", viewBenefits: "تفصیلی فوائد دیکھیں (آڈیو وضاحت) →",
    chatPrompt: "اردو، ہندی یا انگریزی میں اپنا سوال ٹیپ کریں اور بولیں۔",
    chatPrompt2: "مجھ سے خوراک، نیند یا اسکیموں کے بارے میں پوچھیں!", aiResponse: "AI جواب (وائس-فرسٹ جواب):",
    listen: "مقامی زبان میں سنیں", thinking: "شیشو سوچ رہا ہے...", typeToSpeak: "ٹائپ کریں یا بولنے کے لیے MIC کو ٹیپ کریں...",
    simulateRash: "دانے کا تخروپن کریں", simulateStool: "پاخانے کا تخروپن کریں",
    detectedCondition: "پتہ کردہ حالت:", triageHome: "گھر میں دیکھ بھال کی سفارش",
    triageConsult: "ڈاکٹر سے مشورہ کریں", triageUrgent: "ابھی ڈاکٹر سے مشورہ کریں",
    serviceTitle: "خدمات",
    typeGovt: "سرکاری (مفت)", typePrivate: "نجی", typeICDS: "سرکاری (ICDS)",
    schemeBenefitJSY: "اداروں میں زچگی کے لیے ₹6,000 کی نقد ترغیب۔ آپ کی اگلی ادائیگی کی تاریخ ہے۔",
    schemeBenefitPOSHAN: "ماہانہ ٹیک ہوم راشن (THR) اور مائیکرو نیوٹرینٹ سپلیمنٹس۔ کٹ جمع کرنے کی یاد دہانی۔",
    schemeBenefitIndradhanush: "مکمل حفاظتی ٹیکوں کو یقینی بناتا ہے۔ آپ کے بچے کے ویکسین ٹریکر سے منسلک ہے۔",
    schemeBenefitICDS: "آنگن واڑی پری اسکول کی تعلیم اور غذائیت سے متعلق مشاورت تک رسائی۔",
    consultExpert: "انسانی ماہر سے جڑیں",
  },
  // Assamese (as)
  as: { 
    hello: "নমস্কাৰ, ", home: "হোম", healthScan: "স্বাস্থ্য স্কেন (VLM)", vaccineFinder: "ভেকচিন আৰু কেন্দ্ৰ সন্ধানকাৰী",
    govtSchemes: "চৰকাৰী আঁচনি আৰু নিৰ্দেশনাৱলী", milestone: "মাইলষ্ট'ন ট্ৰেকাৰ", reports: "প্ৰতিবেদন বিশ্লেষণ",
    dailyTips: "দৈনিক টিপচ", nutritionTip: "পুষ্টি টিপ", schemeAlert: "আঁচনি সতৰ্কতা",
    emergency: "জৰুৰীকালীন", legalPrivacy: "আইনী আৰু গোপনীয়তা", chatTitle: "শিশুৰ সৈতে কথা পাতক/সোধক",
    snapUnderstandAct: "১. স্নেপ কৰক। ২. বুজি লওক। ৩. কাম কৰক।",
    uploadTip: "উপসৰ্গৰ (ৰাশ, মল, আদি) এটা স্পষ্ট ফটো ক্লিক কৰক। আমাৰ VLM এ তৎক্ষণাত ট্ৰায়েজ প্ৰদান কৰে।",
    uploadImage: "উপসৰ্গৰ ছবি আপলোড কৰক", runScan: "AI স্বাস্থ্য স্কেন চলাওক", scanHistory: "স্মাৰ্ট স্বাস্থ্য কাৰ্ডৰ ইতিহাস চাওক →",
    locationDetected: "স্বয়ংক্রিয়ভাৱে চিনাক্ত কৰা স্থান: ভিলাই, ছত্তীশগড়", nextVaccine: "পৰৱৰ্তী ভেকচিনৰ তাৰিখ: DTaP (৬ সপ্তাহ)",
    nearbyCenters: "ওচৰৰ কেন্দ্ৰ আৰু স্লট", getDirections: "দিশসমূহ পাওক",
    eligibilityCheck: "ব্যক্তিগত যোগ্যতা পৰীক্ষা",
    eligibleSchemes: "আপোনাৰ প্ৰফাইলৰ (গ্ৰাম্য/কম উপাৰ্জন) ভিত্তিত, আপুনি নিম্নলিখিত মুখ্য আঁচনিসমূহৰ বাবে যোগ্য:",
    eligible: "যোগ্য", viewBenefits: "সবিশেষ সুবিধাসমূহ চাওক (অডিঅ' ব্যাখ্যা) →",
    chatPrompt: "অসমীয়া, হিন্দী বা ইংৰাজীত আপোনাৰ প্ৰশ্ন ট্যাপ কৰি কওক।",
    chatPrompt2: "মোক আহাৰ, টোপনি বা আঁচনিসমূহৰ বিষয়ে সোধক!", aiResponse: "AI সঁহাৰি (ভইচ-প্ৰথম উত্তৰ):",
    listen: "স্থানীয় ভাষাত শুনক", thinking: "শিশুৱে চিন্তা কৰি আছে...", typeToSpeak: "টাইপ কৰক বা কথা কোৱাৰ বাবে MIC ট্যাপ কৰক...",
    simulateRash: "ৰাশ অনুকরণ কৰক", simulateStool: "মল অনুকরণ কৰক",
    detectedCondition: "সনাক্ত কৰা স্থিতি:", triageHome: "ঘৰুৱা যত্নৰ পৰামৰ্শ",
    triageConsult: "ডাক্তৰৰ পৰামৰ্শ লওক", triageUrgent: "এতিয়াই ডাক্তৰৰ পৰামৰ্শ লওক",
    serviceTitle: "সেৱাসমূহ",
    typeGovt: "চৰকাৰী (বিনামূলীয়া)", typePrivate: "ব্যক্তিগত", typeICDS: "চৰকাৰী (ICDS)",
    schemeBenefitJSY: "সংস্থাৰ জৰিয়তে প্ৰসৱৰ বাবে ₹6,000 নগদ উৎসাহ। আপোনাৰ পৰৱৰ্তী পৰিশোধৰ তাৰিখ হৈছে।",
    schemeBenefitPOSHAN: "মাহিলী টেক-হোম ৰেচন (THR) আৰু মাইক্ৰ'নিউট্রিয়েণ্ট চাপ্লিমেন্ট। কিট সংগ্ৰহৰ অনুস্মাৰক।",
    schemeBenefitIndradhanush: "সম্পূৰ্ণ টিকাকৰণ নিশ্চিত কৰে। আপোনাৰ শিশুৰ ভেকচিন ট্ৰেকাৰৰ সৈতে সংযুক্ত।",
    schemeBenefitICDS: "আংগনবাড়ী প্ৰি-স্কুল শিক্ষা আৰু পুষ্টি পৰামৰ্শৰ সুবিধা।",
    consultExpert: "মানৱ বিশেষজ্ঞৰ সৈতে সংযোগ কৰক",
  },
};

const getTranslation = (key, code) => {
    return TRANSLATIONS[code]?.[key] || TRANSLATIONS['en'][key];
};
// --- END TRANSLATION MAP ---


// Mock AI/API Functions (Simulating VLM/LLM/Location calls)
const mockVlmDiagnosis = (imageName, langCode) => {
  const t = (key) => getTranslation(key, langCode);
  let result = {};

  // Note: The specific advice is kept static/simplified for prototype brevity, 
  // as in a real app this would be generated dynamically by a multilingual LLM.
  if (imageName.includes('rash')) {
    result = {
      triage: t('triageHome'),
      diagnosis: 'Mild Diaper Rash (Dermatitis)',
      advice: 'The Vision-Language Model (VLM) detected mild redness consistent with a common diaper rash. Keep the area dry and apply a zinc-based cream. Re-scan in 24 hours. **Severity: Low.**',
    };
  } else if (imageName.includes('stool')) {
    result = {
      triage: t('triageConsult'),
      diagnosis: 'Possible Dehydration/Infection',
      advice: 'The VLM detected unusually watery stool color and consistency. This requires further review. Please book an immediate consult via the Smart Chat feature. **Severity: Medium-High.**',
    };
  } else {
    result = {
      triage: t('triageUrgent'),
      diagnosis: 'Uncertain Symptom',
      advice: 'The VLM analysis suggests an unusual or unclear symptom. Please consult a doctor immediately or use the Emergency SOS feature. **Severity: High.**',
    };
  }
  return result;
};

const mockLlmActivity = (query) => {
  if (query.toLowerCase().includes('sleep')) {
    return "The Al Parenting Assistant suggests maintaining a consistent bedtime routine. Gentle rocking and white noise can help your baby fall asleep faster. Always place the baby on their back to sleep.";
  }
  if (query.toLowerCase().includes('poshan')) {
    return "The Al found that you are eligible for the **POSHAN Abhiyaan** scheme based on your profile. The benefits include monthly nutrition kits and educational support. Tap the 'Govt Schemes' icon for registration details in your local language.";
  }
  return "That's a great question! The Al Parenting Assistant is analyzing context (baby's age, region, etc.) to give a personalized, voice-supported answer in Hindi. Common concern: **Feeding, Growth, or Vaccines.**";
};

const mockHealthCenters = (langCode) => {
  const t = (key) => getTranslation(key, langCode);
  return [
    { name: 'Primary Health Center (PHC)', distance: '2.1 km', waitTime: '30 min', service: 'Vaccines, Check-ups', type: t('typeGovt') },
    { name: 'Jivan Pharmacy', distance: '0.8 km', waitTime: 'N/A', service: 'Vaccines (Paid)', type: t('typePrivate') },
    { name: 'Anganwadi Center - Block C', distance: '4.5 km', waitTime: 'N/A', service: 'Nutrition Kits, Counselling', type: t('typeICDS') },
  ];
};

const mockSchemes = (langCode) => {
  const t = (key) => getTranslation(key, langCode);
  return [
    { name: 'Janani Suraksha Yojana (JSY)', eligible: true, benefit: t('schemeBenefitJSY') },
    { name: 'POSHAN Abhiyaan', eligible: true, benefit: t('schemeBenefitPOSHAN') },
    { name: 'Mission Indradhanush', eligible: true, benefit: t('schemeBenefitIndradhanush') },
    { name: 'Integrated Child Dev. Services (ICDS)', eligible: true, benefit: t('schemeBenefitICDS') },
  ];
};

const ScreenEnum = {
  LANGUAGE: 'LANGUAGE', HOME: 'HOME', SCAN: 'SCAN', CHAT: 'CHAT', LOCATION: 'LOCATION', SCHEMES: 'SCHEMES',
};

// --- Custom Components ---

const PhoneFrame = ({ children, chatFab }) => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    <div className="w-full max-w-sm h-[800px] bg-white rounded-[40px] shadow-2xl border-8 border-gray-800 relative overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/5 h-6 bg-gray-800 rounded-b-xl z-20"></div>
      {/* Speaker/Time Bar */}
      <div className="absolute top-2 left-0 w-full h-8 flex justify-between items-center px-6 text-xs text-white z-10 bg-gray-800/50">
        <span className="font-semibold text-white">4G <Sun className="w-3 h-3 inline-block ml-1" /></span>
        <span className="font-semibold text-white">10:45 AM</span>
        <span className="font-semibold text-white">88% <Smartphone className="w-3 h-3 inline-block ml-1" /></span>
      </div>
      {/* App Content */}
      <div className="pt-8 h-full overflow-y-auto">
        {children}
      </div>
    </div>
    {chatFab}
  </div>
);

// Updated IconButton to support background images and correctly position text below icon
const IconButton = ({ icon: Icon, label, onClick, color = 'bg-teal-500', backgroundUrl }) => {
  const isMajorFeature = !!backgroundUrl;
  
  // Base classes for the button container
  const baseClasses = "flex flex-col items-center justify-start p-2 m-1 w-20 h-24 rounded-xl shadow-lg transition-all transform hover:scale-105";
  
  // Style for the container when it's a major feature with a background image
  const majorFeatureStyle = isMajorFeature ? {
    backgroundImage: `url('${backgroundUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Fallback/overlay color
    position: 'relative', 
    padding: 0, 
    height: '96px' 
  } : {
    backgroundColor: color,
    height: '80px' // Standard button height for secondary features (now removed, but kept for consistency)
  };

  if (isMajorFeature) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} p-0`} 
        style={{
          ...majorFeatureStyle,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Visual Container (Icon and Transparent Overlay) */}
        <div className="flex flex-col items-center justify-center w-full h-full p-1 bg-black/40 rounded-xl relative">
          <Icon className="w-7 h-7 text-white mb-1 z-10" />
          {/* Text positioned at the bottom of the visual container */}
          <span className="text-[10px] font-bold text-white text-center leading-tight z-10 [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)] mt-auto pb-1">
            {label}
          </span>
        </div>
      </button>
    );
  }

  // Fallback for Secondary Features (if they were still present)
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} p-3`}
      style={{
        backgroundColor: color,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Icon className="w-8 h-8 text-white mb-1" />
      <span className="text-xs font-semibold text-white text-center leading-tight">{label}</span>
    </button>
  );
};

const TipCard = ({ title, tip, icon: Icon, color }) => (
  <div className={`p-4 mt-4 rounded-xl shadow-lg flex items-start ${color} text-white`}>
    <div className="flex-shrink-0 mr-3 mt-1">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-xs mt-1">{tip}</p>
    </div>
  </div>
);

// Floating Action Button for Chat (Bubble Popup)
const ChatFAB = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-12 left-6 bg-purple-600 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-30"
    title="Ask/Talk Shishu"
    style={{
      boxShadow: '0 10px 15px -3px rgba(147, 51, 234, 0.5), 0 4px 6px -4px rgba(147, 51, 234, 0.5)'
    }}
  >
    <MessageCircle className="w-8 h-8 text-white" />
  </button>
);


// --- Screen Components ---

const LanguageScreen = ({ setLanguageCode, setScreen }) => {
  const languages = [
    { code: 'hi', name: 'हिंदी' },
    { code: 'en', name: 'English' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'মराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'ur', name: 'اردو' },
    { code: 'as', name: 'অসমীয়া' },
  ];

  const handleSelect = (lang) => {
    setLanguageCode(lang.code);
    setTimeout(() => setScreen(ScreenEnum.HOME), 300);
  };

  return (
    <div className="p-8 h-full flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-800">
      <h1 className="text-3xl font-extrabold text-white mb-2">SHISHU</h1>
      <p className="text-white mb-8 text-center text-sm">Simplifying Parenting</p>
      <h2 className="text-xl font-semibold text-white mb-6">Select Language</h2>
      <div className="grid grid-cols-3 gap-4 w-full"> 
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/40 transition-colors shadow-md"
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const HomeScreen = ({ setScreen, languageCode }) => {
  const userName = 'Anita';
  const t = (key) => getTranslation(key, languageCode);
  const langDisplay = languageCode.toUpperCase();
  
  // Placeholder URLs for the three main features
  const healthScanImage = "https://placehold.co/200x200/FF5757/FFFFFF?text=Baby+Scan";
  const vaccineFinderImage = "https://placehold.co/200x200/5C88FF/FFFFFF?text=Vaccine+Map";
  const govtSchemesImage = "https://placehold.co/200x200/22C55E/FFFFFF?text=Govt+Benefit";

  return (
    <div className="p-4 bg-white min-h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-extrabold text-indigo-800">{t('home')}</h1>
        <div className="text-sm font-medium text-gray-500">{langDisplay}</div>
      </div>
      <p className="text-xl font-light text-gray-700 mb-6">{t('hello')}{userName}</p>

      {/* Primary Feature Grid (3 major features only) */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <IconButton
          icon={Camera} // Feature 1: Image-Based Symptom Detection (VLM)
          label={t('healthScan')}
          onClick={() => setScreen(ScreenEnum.SCAN)}
          backgroundUrl={healthScanImage}
        />
        <IconButton
          icon={Syringe} // Feature 2: Smart Location & Vaccine Finder (Syringe)
          label={t('vaccineFinder')}
          onClick={() => setScreen(ScreenEnum.LOCATION)}
          backgroundUrl={vaccineFinderImage}
        />
        <IconButton
          icon={Shield} // Feature 3: Auto-link to Govt Schemes (Shield/Emblem)
          label={t('govtSchemes')}
          onClick={() => setScreen(ScreenEnum.SCHEMES)}
          backgroundUrl={govtSchemesImage}
        />
        
        {/* Removed secondary icons here: Milestone, Reports, LegalPrivacy */}

      </div>

      <h2 className="text-lg font-semibold text-indigo-800 mb-2">{t('dailyTips')}</h2>

      {/* Supporting Features/Tips - Note: Content is intentionally not translated as it simulates dynamic LLM/API data */}
      <TipCard
        title={t('nutritionTip')}
        tip="It's time for complementary feeding! Start with soft, single-ingredient foods like mashed banana or rice cereal."
        icon={BookOpen}
        color="bg-yellow-600"
      />
      <TipCard
        title={t('schemeAlert')}
        tip="**POSHAN Abhiyaan:** Remember to collect your monthly nutrition supplement kit from the Anganwadi center this week."
        icon={Calendar}
        color="bg-green-700"
      />
       <TipCard
        title={t('emergency')}
        tip="One-tap SOS is active. If your baby is choking, tap the **Zap** icon below for voice-guided CPR instructions."
        icon={Zap}
        color="bg-red-700"
      />
    </div>
  );
};

// MAJOR FEATURE 1: Image-Based Symptom Detection (VLM)
const HealthScanScreen = ({ setScreen, languageCode }) => {
  const [imageFile, setImageFile] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = (key) => getTranslation(key, languageCode);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // For simulation, we store the file object, but only use its name for mock logic
      setImageFile(file); 
      setDiagnosis(null);
    }
  };

  const handleScan = () => {
    if (!imageFile) return;
    setLoading(true);
    setDiagnosis(null);

    // Simulate VLM API call, passing language code for mock triage text
    setTimeout(() => {
      const result = mockVlmDiagnosis(imageFile.name.toLowerCase(), languageCode);
      setDiagnosis(result);
      setLoading(false);
    }, 2000);
  };
  
  // Custom file input replacement to allow simulated file names
  const handleSimulatedImage = (name) => {
      // Create a mock file object for display and diagnosis logic
      const mockFile = { name: name };
      setImageFile(mockFile);
      setDiagnosis(null);
  }

  return (
    <div className="p-4 min-h-full bg-gray-50">
      <Header setScreen={setScreen} title={t('healthScan')} />
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 border-t-4 border-red-500">
        <h2 className="text-lg font-bold text-red-500 mb-2">{t('snapUnderstandAct')}</h2>
        <p className="text-sm text-gray-600">{t('uploadTip')}</p>
      </div>

      <div className="mb-6 flex flex-col items-center">
        {/* Real File Input (Hidden) */}
        <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} className="hidden" />
        
        {/* Simulated Image Buttons */}
        <div className="flex space-x-2 mb-4">
            <button
                onClick={() => handleSimulatedImage('mild_diaper_rash.jpg')}
                className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 transition-colors"
                title={t('simulateRash')}
            >
                {t('simulateRash')}
            </button>
            <button
                onClick={() => handleSimulatedImage('watery_stool_sample.png')}
                className="text-xs bg-yellow-500 text-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors"
                title={t('simulateStool')}
            >
                {t('simulateStool')}
            </button>
        </div>
        
        <label
          htmlFor="imageUpload"
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg flex items-center cursor-pointer hover:bg-purple-700 transition-colors"
        >
          <Camera className="w-6 h-6 mr-2" />
          {imageFile ? imageFile.name.substring(0, 25) + '...' : t('uploadImage')}
        </label>
        
        {imageFile && (
          <button
            onClick={handleScan}
            disabled={loading}
            className="mt-4 w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:bg-red-300 hover:bg-red-700"
          >
            {loading ? t('thinking') : t('runScan')}
          </button>
        )}
      </div>

      {diagnosis && (
        <div className={`p-4 rounded-xl shadow-xl ${diagnosis.triage.includes('Home') ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
          <h3 className="text-lg font-bold mb-2 flex items-center">
            {diagnosis.triage.includes('Home') ? <Shield className="w-5 h-5 mr-2 text-green-600" /> : <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />}
            {diagnosis.triage}
          </h3>
          <p className="font-semibold text-sm mb-1">{t('detectedCondition')} {diagnosis.diagnosis}</p>
          <p className="text-gray-700 text-sm">{diagnosis.advice}</p>
          <button className="mt-3 text-xs text-blue-600 font-semibold hover:underline">
            {t('scanHistory')}
          </button>
        </div>
      )}
    </div>
  );
};

// MAJOR FEATURE 2: Smart Location & Vaccine Finder
const LocationScreen = ({ setScreen, languageCode }) => {
    const t = (key) => getTranslation(key, languageCode);
    const centers = mockHealthCenters(languageCode); // Get localized center data

  return (
    <div className="p-4 min-h-full bg-gray-50">
      <Header setScreen={setScreen} title={t('vaccineFinder')} />
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 border-t-4 border-blue-500">
        <p className="text-sm text-gray-600">{t('locationDetected')}</p>
        <p className="text-xs text-blue-600 font-semibold mt-1 flex items-center">
          <Calendar className="w-3 h-3 mr-1" /> {t('nextVaccine')}
        </p>
      </div>

      {/* Map Simulation */}
      <div className="relative h-48 bg-gray-300 rounded-xl mb-4 flex items-center justify-center text-center text-sm text-gray-600 border-4 border-blue-200 overflow-hidden">
        {/* Map Placeholder Image */}
        <span className="absolute text-2xl text-gray-700 font-bold opacity-20">MAP VIEW</span>
        <MapPin className="w-8 h-8 text-blue-600 animate-bounce absolute top-1/2 left-1/4" />
        <MapPin className="w-6 h-6 text-green-600 absolute top-2/3 right-1/4" />
        <MapPin className="w-5 h-5 text-purple-600 absolute top-1/3 left-2/3" />
      </div>

      <h3 className="text-lg font-bold text-indigo-800 mb-3">{t('nearbyCenters')}</h3>
      <div className="space-y-3">
        {centers.map((center, index) => (
          <div key={index} className={`bg-white p-3 rounded-xl shadow-lg flex justify-between items-center ${center.type.includes('Govt') ? 'border-l-4 border-green-500' : 'border-l-4 border-purple-500'}`}>
            <div>
              <p className="font-bold text-sm text-gray-800">{center.name}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <Search className="w-3 h-3 mr-1" /> {t('serviceTitle')}: {center.service}
              </p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">{center.type}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-green-600">{center.distance}</p>
              <button className="text-xs mt-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors">
                {t('getDirections')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MAJOR FEATURE 3: Auto-link to Government Schemes & Health Guidelines
const SchemesScreen = ({ setScreen, languageCode }) => {
    const t = (key) => getTranslation(key, languageCode);
    const schemes = mockSchemes(languageCode); // Get localized scheme data

  return (
    <div className="p-4 min-h-full bg-gray-50">
      <Header setScreen={setScreen} title={t('govtSchemes')} />
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 border-t-4 border-green-600">
        <h2 className="text-lg font-bold text-green-600 mb-2">{t('eligibilityCheck')}</h2>
        <p className="text-sm text-gray-600">{t('eligibleSchemes')}</p>
      </div>

      <div className="space-y-3">
        {schemes.map((scheme, index) => (
          <div key={index} className={`bg-white p-4 rounded-xl shadow-lg border-l-4 ${scheme.eligible ? 'border-teal-500' : 'border-gray-400'}`}>
            <h3 className="font-bold text-base text-gray-800 flex justify-between items-center">
              {scheme.name}
              {scheme.eligible && <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{t('eligible')}</span>}
            </h3>
            <p className="text-sm mt-1 text-gray-700">{scheme.benefit}</p>
            <button className="mt-2 text-xs text-teal-600 font-semibold hover:underline">
              {t('viewBenefits')}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-indigo-800 mb-2">{t('dailyTips')}</h3>
        <TipCard
          title={t('milestone')}
          tip="Did you know: Tummy time helps strengthen your baby's neck and shoulder muscles. Try it for 10 minutes every day!"
          icon={Flag}
          color="bg-indigo-600"
        />
      </div>
    </div>
  );
};

// SUPPORTING FEATURE: Al Parenting Assistant (LLM Chat)
const ChatScreen = ({ setScreen, languageCode }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const t = (key) => getTranslation(key, languageCode);

  const handleSend = () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    const userQuery = query;
    setQuery('');

    // Simulate LLM API call
    setTimeout(() => {
      const llmResponse = mockLlmActivity(userQuery);
      setResponse(llmResponse);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 min-h-full bg-gray-50 flex flex-col">
      <Header setScreen={setScreen} title={t('chatTitle')} />
      
      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto mb-4 p-2 bg-white rounded-xl shadow-inner">
        <div className="text-center text-sm text-gray-500 mb-4">
          <p>{t('chatPrompt')}</p>
          <p className="font-semibold text-indigo-600">{t('chatPrompt2')}</p>
        </div>

        {response && (
          <div className="flex justify-start mb-3">
            <div className="bg-blue-100 p-3 rounded-xl rounded-bl-none max-w-[80%] text-sm shadow-md">
              <p className="font-bold text-blue-800">{t('aiResponse')}</p>
              <p className="text-blue-700">{response}</p>
              <button className="mt-1 text-xs text-purple-600 font-semibold hover:underline">
                 <Mic className="w-3 h-3 inline-block mr-1" /> {t('listen')}
              </button>
            </div>
          </div>
        )}

        {loading && (
            <div className="flex justify-start mb-3">
                <div className="bg-gray-200 p-3 rounded-xl rounded-bl-none max-w-[80%] text-sm shadow-md animate-pulse">
                    <p className="text-gray-600">{t('thinking')}</p>
                </div>
            </div>
        )}
      </div>

      {/* Input / Voice Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('typeToSpeak')}
          className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
        <button
          className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          onClick={() => console.log("Simulating Human Expert Handover: Connecting to a verified ASHA worker.")}
        >
          <Zap className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Generic Header Component for internal screens
const Header = ({ setScreen, title }) => (
  <div className="flex items-center justify-start mb-6 pt-2">
    <button onClick={() => setScreen(ScreenEnum.HOME)} className="p-1 mr-3 rounded-full hover:bg-gray-200 transition-colors">
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
    <h2 className="text-xl font-bold text-indigo-800">{title}</h2>
  </div>
);

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState(ScreenEnum.LANGUAGE);
  const [languageCode, setLanguageCode] = useState('en');

  const setScreen = useCallback((screen) => setCurrentScreen(screen), []);

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenEnum.LANGUAGE:
        return <LanguageScreen setLanguageCode={setLanguageCode} setScreen={setScreen} />;
      case ScreenEnum.HOME:
        return <HomeScreen setScreen={setScreen} languageCode={languageCode} />;
      case ScreenEnum.SCAN:
        return <HealthScanScreen setScreen={setScreen} languageCode={languageCode} />;
      case ScreenEnum.LOCATION:
        return <LocationScreen setScreen={setScreen} languageCode={languageCode} />;
      case ScreenEnum.SCHEMES:
        return <SchemesScreen setScreen={setScreen} languageCode={languageCode} />;
      case ScreenEnum.CHAT:
        return <ChatScreen setScreen={setScreen} languageCode={languageCode} />; // Passing languageCode to ChatScreen
      default:
        return <HomeScreen setScreen={setScreen} languageCode={languageCode} />;
    }
  };
  
  // Render the Floating Action Button for Chat
  const chatFab = currentScreen !== ScreenEnum.LANGUAGE && currentScreen !== ScreenEnum.CHAT && (
      <ChatFAB onClick={() => setCurrentScreen(ScreenEnum.CHAT)} />
  );

  return (
    <PhoneFrame chatFab={chatFab}>
      {renderScreen()}
    </PhoneFrame>
  );
};

export default App;

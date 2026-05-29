import { useState, useEffect } from "react";

/* ─── LANGUAGES ─────────────────────────────────────────────────────────── */
const LANGUAGES = {
  en: { label: "English",    flag: "🇬🇧", dir: "ltr" },
  hi: { label: "हिन्दी",      flag: "🇮🇳", dir: "ltr" },
  bn: { label: "বাংলা",       flag: "🪷",  dir: "ltr" },
  ta: { label: "தமிழ்",       flag: "🌺",  dir: "ltr" },
  te: { label: "తెలుగు",      flag: "🌸",  dir: "ltr" },
  mr: { label: "मराठी",       flag: "🏵️",  dir: "ltr" },
  gu: { label: "ગુજરાતી",     flag: "🦁",  dir: "ltr" },
  pa: { label: "ਪੰਜਾਬੀ",      flag: "🌾",  dir: "ltr" },
  kn: { label: "ಕನ್ನಡ",       flag: "🐘",  dir: "ltr" },
  ml: { label: "മലയാളം",      flag: "🌴",  dir: "ltr" },
  ar: { label: "العربية",     flag: "🌙",  dir: "rtl" },
  es: { label: "Español",    flag: "🇪🇸", dir: "ltr" },
  fr: { label: "Français",   flag: "🇫🇷", dir: "ltr" },
  zh: { label: "中文",         flag: "🇨🇳", dir: "ltr" },
};

/* ─── TRANSLATIONS (key phrases only — AI responds in selected language) ── */
const T = {
  en: {
    appName:"DIGISENTRY", tagline:"India's AI-Powered Digital Guardian",
    tabs:["🔗 Link Scanner","📧 Message Check","📞 Phone Lookup","📚 Scam Guide","🧠 Quiz","🚨 Report"],
    emergency:"HELPLINE", alertBanner:"⚠️  Digital arrest scams up 400% — No government agency ever arrests you online  ⚠️",
    enterUrl:"Paste Suspicious Link or URL", scanBtn:"SCAN NOW", scanning:"Scanning...",
    urlPlaceholder:"e.g. https://sbi-kyc-update.xyz or bit.ly/xxxxx",
    pasteMessage:"Paste Any Message or Email", analyzeBtn:"CHECK NOW", analyzing:"Analyzing...",
    msgPlaceholder:"Paste your message here. For bank SMS, first type the Sender ID shown at the top of the SMS (e.g. JD-KOTAKBK: or VM-SBIINB:) then paste the message body. This helps our AI identify genuine bank messages accurately.",
    phoneTitle:"Phone Number Check", phoneSubtitle:"Check if a number is linked to known scam patterns",
    enterPhone:"Enter Phone Number", checkBtn:"CHECK", checking:"Checking...",
    phonePlaceholder:"+91 XXXXXXXXXX or any number",
    quizTitle:"Fraud Awareness Quiz", quizSubtitle:"Test your knowledge — could save you from losing money!",
    reportTitle:"Report a Fraud Attempt", reportSubtitle:"Help protect others by reporting scam attempts",
    fraudType:"TYPE OF FRAUD *", describe:"WHAT HAPPENED *", contactLabel:"YOUR CONTACT (optional)",
    submitReport:"SUBMIT REPORT", reportDoneTitle:"Report Submitted!", reportDoneSub:"Thank you. Please also report officially at cybercrime.gov.in",
    submitAnother:"Submit Another", emergencyNote:"For financial losses call 1930 immediately",
    selectFraud:"Select type of fraud...", scansToday:"SCANS TODAY",
    quizComplete:"Quiz Complete!", nextQ:"Next Question →", submitQuiz:"See My Score",
    restartQuiz:"Try Again", correct:"✅ Correct!", wrong:"❌ Not quite —",
    explanation:"Here's why:", riskScore:"RISK SCORE", verdictLabel:"VERDICT",
    redFlags:"⚠️ Warning Signs Found", safeIndicators:"✅ Genuine Indicators",
    manipulation:"🧠 Psychological Tactics Used", recommendation:"📋 What You Should Do",
    confidence:"CONFIDENCE", reasoning:"AI REASONING",
    scamLibraryTitle:"Scam Guide", scamLibrarySub:"Learn to recognise India's most common digital frauds",
    linkScannerTitle:"Link & URL Scanner", linkScannerSub:"Paste any link — our AI checks it for fraud in seconds",
    msgAnalyzerTitle:"Message & Email Checker", msgAnalyzerSub:"Works for bank SMS, WhatsApp messages, and emails — genuine or fake",
    analyzeScanning:"Checking link safety and fraud patterns...",
    analyzeMsg:"Reading message carefully for fraud patterns...",
    analyzePhone:"Checking number against known scam patterns...",
    startQuiz:"Start Quiz →", allLevels:"All Questions", beginner:"Beginner",
    intermediate:"Intermediate", advanced:"Advanced",
    emergencyContacts:"Emergency Contacts",
    genuineNote:"💡 HOW TO CHECK A BANK SMS: The Sender ID (like JD-KOTAKBK, VM-SBIINB, AD-HDFCBK) appears at the TOP of the SMS as the sender's name — not inside the message. When pasting here, first TYPE the Sender ID followed by a colon, then paste the message. Example: 'JD-KOTAKBK: Rs.5000 debited from your a/c...' — Our AI will then correctly identify it as genuine. All TRAI registered prefixes: VM, JD, BW, TM, CP, TP (Transactional) • AD, VA, TA (Promotional). ⚠️ Even genuine SMS should NEVER ask for your OTP, PIN or password.",
  },
  hi: {
    appName:"डिजीसेंट्री", tagline:"भारत का AI धोखाधड़ी रक्षक",
    tabs:["🔗 लिंक स्कैनर","📧 संदेश जाँच","📞 फोन जाँच","📚 घोटाला गाइड","🧠 प्रश्नोत्तरी","🚨 रिपोर्ट"],
    emergency:"हेल्पलाइन", alertBanner:"⚠️  डिजिटल गिरफ्तारी घोटाले 400% बढ़े — कोई सरकारी एजेंसी ऑनलाइन गिरफ्तारी नहीं करती  ⚠️",
    enterUrl:"संदिग्ध लिंक यहाँ डालें", scanBtn:"जाँचें", scanning:"जाँच हो रही है...",
    urlPlaceholder:"जैसे https://sbi-kyc-update.xyz या bit.ly/xxxxx",
    pasteMessage:"कोई भी संदेश यहाँ डालें", analyzeBtn:"जाँचें", analyzing:"विश्लेषण हो रहा है...",
    msgPlaceholder:"बैंक SMS के लिए: SMS के ऊपर दिखने वाला Sender ID (जैसे JD-KOTAKBK: या VM-SBIINB:) पहले टाइप करें, फिर संदेश चिपकाएं। उदाहरण: 'JD-KOTAKBK: Rs.5000 आपके खाते से काटे गए...'",
    phoneTitle:"फोन नंबर जाँच", phoneSubtitle:"जाँचें कि नंबर किसी घोटाले से जुड़ा है या नहीं",
    enterPhone:"फोन नंबर डालें", checkBtn:"जाँचें", checking:"जाँच हो रही है...",
    phonePlaceholder:"+91 XXXXXXXXXX",
    quizTitle:"जागरूकता प्रश्नोत्तरी", quizSubtitle:"अपना ज्ञान जाँचें — पैसे बचाने में मदद करेगा!",
    reportTitle:"धोखाधड़ी की रिपोर्ट करें", reportSubtitle:"दूसरों की मदद के लिए घोटालों की रिपोर्ट करें",
    fraudType:"धोखाधड़ी का प्रकार *", describe:"क्या हुआ *", contactLabel:"आपका संपर्क (वैकल्पिक)",
    submitReport:"रिपोर्ट भेजें", reportDoneTitle:"रिपोर्ट भेजी गई!", reportDoneSub:"धन्यवाद। cybercrime.gov.in पर भी रिपोर्ट करें।",
    submitAnother:"और रिपोर्ट करें", emergencyNote:"वित्तीय नुकसान के लिए तुरंत 1930 पर कॉल करें",
    selectFraud:"धोखाधड़ी का प्रकार चुनें...", scansToday:"आज के स्कैन",
    quizComplete:"प्रश्नोत्तरी पूर्ण!", nextQ:"अगला प्रश्न →", submitQuiz:"स्कोर देखें",
    restartQuiz:"फिर से", correct:"✅ सही!", wrong:"❌ गलत —",
    explanation:"कारण:", riskScore:"जोखिम स्कोर", verdictLabel:"निर्णय",
    redFlags:"⚠️ चेतावनी के संकेत", safeIndicators:"✅ असली होने के संकेत",
    manipulation:"🧠 मनोवैज्ञानिक चालें", recommendation:"📋 आपको क्या करना चाहिए",
    confidence:"विश्वास स्तर", reasoning:"AI विश्लेषण",
    scamLibraryTitle:"घोटाला गाइड", scamLibrarySub:"भारत के सबसे आम डिजिटल धोखों को पहचानें",
    linkScannerTitle:"लिंक और URL स्कैनर", linkScannerSub:"कोई भी लिंक डालें — AI तुरंत जाँचेगा",
    msgAnalyzerTitle:"संदेश और ईमेल जाँच", msgAnalyzerSub:"बैंक SMS, WhatsApp, ईमेल — असली या नकली",
    analyzeScanning:"लिंक की सुरक्षा जाँची जा रही है...",
    analyzeMsg:"संदेश को ध्यान से पढ़ा जा रहा है...",
    analyzePhone:"नंबर की जाँच हो रही है...",
    startQuiz:"प्रश्नोत्तरी शुरू करें →", allLevels:"सभी प्रश्न", beginner:"शुरुआती",
    intermediate:"मध्यम", advanced:"उन्नत",
    emergencyContacts:"आपातकालीन संपर्क",
    genuineNote:"💡 TRAI पंजीकृत SMS उपसर्ग — ये आधिकारिक भेजकों से सुरक्षित हैं: VM, JD (Jio), BW, TM, CP, TP (लेनदेन) • AD, VA, TA (प्रचार)। उदाहरण: JD-KOTAKBK, VM-SBIINB, VA-TATACAP। ⚠️ असली SMS भी कभी OTP, PIN या पासवर्ड नहीं मांगते।",
  },
  bn: {
    appName:"ডিজিসেন্ট্রি", tagline:"ভারতের AI জালিয়াতি রক্ষক",
    tabs:["🔗 লিংক স্ক্যান","📧 বার্তা যাচাই","📞 ফোন যাচাই","📚 প্রতারণা গাইড","🧠 কুইজ","🚨 রিপোর্ট"],
    emergency:"হেল্পলাইন", alertBanner:"⚠️  ডিজিটাল গ্রেফতার প্রতারণা 400% বেড়েছে — কোনো সরকারি সংস্থা অনলাইনে গ্রেফতার করে না  ⚠️",
    enterUrl:"সন্দেহজনক লিংক এখানে দিন", scanBtn:"স্ক্যান করুন", scanning:"স্ক্যান হচ্ছে...",
    urlPlaceholder:"যেমন https://sbi-kyc-update.xyz বা bit.ly/xxxxx",
    pasteMessage:"যেকোনো বার্তা এখানে দিন", analyzeBtn:"যাচাই করুন", analyzing:"বিশ্লেষণ হচ্ছে...",
    msgPlaceholder:"ব্যাংক SMS-এর জন্য: SMS-এর উপরে দেখানো Sender ID (যেমন JD-KOTAKBK: বা VM-SBIINB:) আগে টাইপ করুন, তারপর বার্তা পেস্ট করুন। উদাহরণ: 'JD-KOTAKBK: আপনার অ্যাকাউন্ট থেকে Rs.5000 কাটা হয়েছে...'",
    phoneTitle:"ফোন নম্বর যাচাই", phoneSubtitle:"নম্বরটি পরিচিত প্রতারণার সাথে যুক্ত কিনা দেখুন",
    enterPhone:"ফোন নম্বর দিন", checkBtn:"যাচাই করুন", checking:"যাচাই হচ্ছে...",
    phonePlaceholder:"+91 XXXXXXXXXX",
    quizTitle:"সচেতনতা কুইজ", quizSubtitle:"আপনার জ্ঞান পরীক্ষা করুন!",
    reportTitle:"প্রতারণা রিপোর্ট করুন", reportSubtitle:"অন্যদের রক্ষা করতে প্রতারণার রিপোর্ট করুন",
    fraudType:"প্রতারণার ধরন *", describe:"কী হয়েছে *", contactLabel:"আপনার যোগাযোগ (ঐচ্ছিক)",
    submitReport:"রিপোর্ট পাঠান", reportDoneTitle:"রিপোর্ট পাঠানো হয়েছে!", reportDoneSub:"ধন্যবাদ। cybercrime.gov.in-এও রিপোর্ট করুন।",
    submitAnother:"আরেকটি রিপোর্ট", emergencyNote:"আর্থিক ক্ষতির জন্য এখনই 1930 নম্বরে কল করুন",
    selectFraud:"প্রতারণার ধরন বেছে নিন...", scansToday:"আজকের স্ক্যান",
    quizComplete:"কুইজ সম্পন্ন!", nextQ:"পরের প্রশ্ন →", submitQuiz:"স্কোর দেখুন",
    restartQuiz:"আবার চেষ্টা করুন", correct:"✅ সঠিক!", wrong:"❌ ভুল —",
    explanation:"কারণ:", riskScore:"ঝুঁকি স্কোর", verdictLabel:"রায়",
    redFlags:"⚠️ সতর্কতার চিহ্ন", safeIndicators:"✅ আসল হওয়ার চিহ্ন",
    manipulation:"🧠 মনস্তাত্ত্বিক কৌশল", recommendation:"📋 আপনার কী করা উচিত",
    confidence:"আস্থার মাত্রা", reasoning:"AI বিশ্লেষণ",
    scamLibraryTitle:"প্রতারণা গাইড", scamLibrarySub:"ভারতের সবচেয়ে সাধারণ ডিজিটাল প্রতারণা চিনুন",
    linkScannerTitle:"লিংক ও URL স্ক্যানার", linkScannerSub:"যেকোনো লিংক দিন — AI তাৎক্ষণিক যাচাই করবে",
    msgAnalyzerTitle:"বার্তা ও ইমেইল যাচাই", msgAnalyzerSub:"ব্যাংক SMS, WhatsApp, ইমেইল — আসল না নকল",
    analyzeScanning:"লিংকের নিরাপত্তা যাচাই হচ্ছে...",
    analyzeMsg:"বার্তাটি সাবধানে পড়া হচ্ছে...",
    analyzePhone:"নম্বর যাচাই হচ্ছে...",
    startQuiz:"কুইজ শুরু করুন →", allLevels:"সব প্রশ্ন", beginner:"শিক্ষানবিশ",
    intermediate:"মধ্যবর্তী", advanced:"উন্নত",
    emergencyContacts:"জরুরি যোগাযোগ",
    genuineNote:"💡 দ্রষ্টব্য: VM-SBIINB, AD-HDFCBK-এর মতো অফিসিয়াল Sender ID থেকে আসা ব্যাংক SMS সাধারণত আসল।",
  },
  es: {
    appName:"DIGISENTRY", tagline:"Tu Guardián Digital de India",
    tabs:["🔗 Escáner URL","📧 Verificar Mensaje","📞 Verificar Teléfono","📚 Guía de Estafas","🧠 Quiz","🚨 Reportar"],
    emergency:"EMERGENCIA", alertBanner:"⚠️  Las estafas de arresto digital aumentaron 400% — Ninguna agencia gubernamental te arresta en línea  ⚠️",
    enterUrl:"Pega el enlace sospechoso aquí", scanBtn:"ESCANEAR", scanning:"Escaneando...",
    urlPlaceholder:"ej. https://sbi-kyc-update.xyz o bit.ly/xxxxx",
    pasteMessage:"Pega cualquier mensaje aquí", analyzeBtn:"VERIFICAR", analyzing:"Analizando...",
    msgPlaceholder:"Pega cualquier SMS, mensaje de WhatsApp o correo aquí — la IA explicará si es genuino o sospechoso.",
    phoneTitle:"Verificación de Número", phoneSubtitle:"Verifica si un número está vinculado a estafas",
    enterPhone:"Ingresa el número de teléfono", checkBtn:"VERIFICAR", checking:"Verificando...",
    phonePlaceholder:"+91 XXXXXXXXXX o cualquier número",
    quizTitle:"Quiz de Conciencia contra Fraudes", quizSubtitle:"¡Pon a prueba tu conocimiento!",
    reportTitle:"Reportar un Intento de Fraude", reportSubtitle:"Ayuda a proteger a otros reportando estafas",
    fraudType:"TIPO DE FRAUDE *", describe:"QUÉ PASÓ *", contactLabel:"TU CONTACTO (opcional)",
    submitReport:"ENVIAR REPORTE", reportDoneTitle:"¡Reporte Enviado!", reportDoneSub:"Gracias. También reporta en cybercrime.gov.in",
    submitAnother:"Enviar Otro", emergencyNote:"Para pérdidas financieras llama al 1930 inmediatamente",
    selectFraud:"Selecciona tipo de fraude...", scansToday:"ESCANEOS HOY",
    quizComplete:"¡Quiz Completado!", nextQ:"Siguiente →", submitQuiz:"Ver Mi Puntaje",
    restartQuiz:"Intentar de Nuevo", correct:"✅ ¡Correcto!", wrong:"❌ Incorrecto —",
    explanation:"Por qué:", riskScore:"PUNTUACIÓN DE RIESGO", verdictLabel:"VEREDICTO",
    redFlags:"⚠️ Señales de Advertencia", safeIndicators:"✅ Indicadores Genuinos",
    manipulation:"🧠 Tácticas Psicológicas Usadas", recommendation:"📋 Qué Debes Hacer",
    confidence:"CONFIANZA", reasoning:"RAZONAMIENTO IA",
    scamLibraryTitle:"Guía de Estafas", scamLibrarySub:"Aprende a reconocer los fraudes digitales más comunes",
    linkScannerTitle:"Escáner de Enlaces y URL", linkScannerSub:"Pega cualquier enlace — nuestra IA lo verifica en segundos",
    msgAnalyzerTitle:"Verificador de Mensajes", msgAnalyzerSub:"SMS bancarios, WhatsApp, correos — genuino o falso",
    analyzeScanning:"Verificando seguridad del enlace...",
    analyzeMsg:"Leyendo el mensaje cuidadosamente...",
    analyzePhone:"Verificando número contra patrones de estafa...",
    startQuiz:"Comenzar Quiz →", allLevels:"Todas", beginner:"Principiante",
    intermediate:"Intermedio", advanced:"Avanzado",
    emergencyContacts:"Contactos de Emergencia",
    genuineNote:"💡 Nota: Los mensajes bancarios de IDs oficiales como VM-SBIINB, AD-HDFCBK suelen ser genuinos.",
  },
  fr: {
    appName:"DIGISENTRY", tagline:"Votre Gardien Numérique de l'Inde",
    tabs:["🔗 Scanner URL","📧 Vérifier Message","📞 Vérifier Téléphone","📚 Guide Arnaques","🧠 Quiz","🚨 Signaler"],
    emergency:"URGENCE", alertBanner:"⚠️  Les arnaques d'arrestation numérique ont augmenté de 400% — Aucune agence gouvernementale n'arrête en ligne  ⚠️",
    enterUrl:"Collez le lien suspect ici", scanBtn:"ANALYSER", scanning:"Analyse en cours...",
    urlPlaceholder:"ex. https://sbi-kyc-update.xyz ou bit.ly/xxxxx",
    pasteMessage:"Collez n'importe quel message ici", analyzeBtn:"VÉRIFIER", analyzing:"Vérification...",
    msgPlaceholder:"Collez tout SMS, message WhatsApp ou email ici — l'IA expliquera s'il est authentique ou suspect.",
    phoneTitle:"Vérification de Numéro", phoneSubtitle:"Vérifiez si un numéro est lié à des arnaques connues",
    enterPhone:"Entrez le numéro de téléphone", checkBtn:"VÉRIFIER", checking:"Vérification...",
    phonePlaceholder:"+91 XXXXXXXXXX ou tout numéro",
    quizTitle:"Quiz de Sensibilisation", quizSubtitle:"Testez vos connaissances!",
    reportTitle:"Signaler une Tentative de Fraude", reportSubtitle:"Aidez à protéger les autres en signalant les arnaques",
    fraudType:"TYPE DE FRAUDE *", describe:"CE QUI S'EST PASSÉ *", contactLabel:"VOTRE CONTACT (optionnel)",
    submitReport:"ENVOYER LE SIGNALEMENT", reportDoneTitle:"Signalement Envoyé!", reportDoneSub:"Merci. Signalez aussi sur cybercrime.gov.in",
    submitAnother:"Envoyer un Autre", emergencyNote:"Pour des pertes financières appelez le 1930 immédiatement",
    selectFraud:"Sélectionnez le type de fraude...", scansToday:"ANALYSES AUJOURD'HUI",
    quizComplete:"Quiz Terminé!", nextQ:"Question Suivante →", submitQuiz:"Voir Mon Score",
    restartQuiz:"Réessayer", correct:"✅ Correct!", wrong:"❌ Incorrect —",
    explanation:"Pourquoi:", riskScore:"SCORE DE RISQUE", verdictLabel:"VERDICT",
    redFlags:"⚠️ Signaux d'Alarme", safeIndicators:"✅ Indicateurs Authentiques",
    manipulation:"🧠 Tactiques Psychologiques", recommendation:"📋 Que Faire",
    confidence:"CONFIANCE", reasoning:"RAISONNEMENT IA",
    scamLibraryTitle:"Guide des Arnaques", scamLibrarySub:"Apprenez à reconnaître les fraudes numériques les plus courantes",
    linkScannerTitle:"Scanner de Liens et URL", linkScannerSub:"Collez n'importe quel lien — notre IA le vérifie en secondes",
    msgAnalyzerTitle:"Vérificateur de Messages", msgAnalyzerSub:"SMS bancaires, WhatsApp, emails — authentique ou faux",
    analyzeScanning:"Vérification de la sécurité du lien...",
    analyzeMsg:"Lecture attentive du message...",
    analyzePhone:"Vérification du numéro...",
    startQuiz:"Commencer le Quiz →", allLevels:"Toutes", beginner:"Débutant",
    intermediate:"Intermédiaire", advanced:"Avancé",
    emergencyContacts:"Contacts d'Urgence",
    genuineNote:"💡 Note: Les messages bancaires d'IDs officiels comme VM-SBIINB, AD-HDFCBK sont généralement authentiques.",
  },
  zh: {
    appName:"防骗盾", tagline:"印度AI反欺诈保护系统",
    tabs:["🔗 链接扫描","📧 消息检查","📞 电话查询","📚 诈骗指南","🧠 测验","🚨 举报"],
    emergency:"紧急热线", alertBanner:"⚠️  数字逮捕诈骗增加400% — 任何政府机构都不会在网上逮捕你  ⚠️",
    enterUrl:"粘贴可疑链接", scanBtn:"立即扫描", scanning:"扫描中...",
    urlPlaceholder:"例如 https://sbi-kyc-update.xyz 或 bit.ly/xxxxx",
    pasteMessage:"粘贴任何消息", analyzeBtn:"立即检查", analyzing:"分析中...",
    msgPlaceholder:"粘贴任何短信、WhatsApp消息或电子邮件——AI将解释是否真实或可疑。",
    phoneTitle:"电话号码查询", phoneSubtitle:"检查该号码是否与已知诈骗有关",
    enterPhone:"输入电话号码", checkBtn:"查询", checking:"查询中...",
    phonePlaceholder:"+91 XXXXXXXXXX 或任何号码",
    quizTitle:"反诈意识测验", quizSubtitle:"测试您的知识！",
    reportTitle:"举报诈骗尝试", reportSubtitle:"帮助保护他人，举报诈骗",
    fraudType:"诈骗类型 *", describe:"发生了什么 *", contactLabel:"您的联系方式（可选）",
    submitReport:"提交举报", reportDoneTitle:"举报已提交！", reportDoneSub:"感谢您。请也在 cybercrime.gov.in 官方举报。",
    submitAnother:"再次举报", emergencyNote:"如有财务损失请立即拨打1930",
    selectFraud:"选择诈骗类型...", scansToday:"今日扫描",
    quizComplete:"测验完成！", nextQ:"下一题 →", submitQuiz:"查看成绩",
    restartQuiz:"再试一次", correct:"✅ 正确！", wrong:"❌ 错误 —",
    explanation:"原因：", riskScore:"风险评分", verdictLabel:"判定",
    redFlags:"⚠️ 警告信号", safeIndicators:"✅ 真实指标",
    manipulation:"🧠 心理操控手段", recommendation:"📋 您应该怎么做",
    confidence:"置信度", reasoning:"AI分析",
    scamLibraryTitle:"诈骗指南", scamLibrarySub:"学习识别印度最常见的数字诈骗",
    linkScannerTitle:"链接和URL扫描器", linkScannerSub:"粘贴任何链接——我们的AI几秒内检查",
    msgAnalyzerTitle:"消息和电子邮件检查器", msgAnalyzerSub:"银行短信、WhatsApp、电子邮件——真实还是虚假",
    analyzeScanning:"检查链接安全性...",
    analyzeMsg:"仔细阅读消息...",
    analyzePhone:"检查号码是否与诈骗有关...",
    startQuiz:"开始测验 →", allLevels:"全部", beginner:"初级",
    intermediate:"中级", advanced:"高级",
    emergencyContacts:"紧急联系方式",
    genuineNote:"💡 注意：来自官方发件人ID如VM-SBIINB、AD-HDFCBK的银行短信通常是真实的。",
  },
  ar: {
    appName:"درع الاحتيال", tagline:"حامي الهند من الاحتيال الرقمي",
    tabs:["🔗 فحص الروابط","📧 فحص الرسائل","📞 فحص الهاتف","📚 دليل النصب","🧠 اختبار","🚨 إبلاغ"],
    emergency:"خط الطوارئ", alertBanner:"⚠️  عمليات الاحتيال بالاعتقال الرقمي ارتفعت 400% — لا توجد جهة حكومية تعتقل أحداً عبر الإنترنت  ⚠️",
    enterUrl:"الصق الرابط المشبوه هنا", scanBtn:"فحص الآن", scanning:"جاري الفحص...",
    urlPlaceholder:"مثال: https://sbi-kyc-update.xyz أو bit.ly/xxxxx",
    pasteMessage:"الصق أي رسالة هنا", analyzeBtn:"فحص الآن", analyzing:"جاري التحليل...",
    msgPlaceholder:"الصق أي رسالة نصية أو واتساب أو بريد إلكتروني — سيشرح الذكاء الاصطناعي إذا كانت حقيقية أو مشبوهة.",
    phoneTitle:"فحص رقم الهاتف", phoneSubtitle:"تحقق إذا كان الرقم مرتبطاً بعمليات احتيال",
    enterPhone:"أدخل رقم الهاتف", checkBtn:"فحص", checking:"جاري الفحص...",
    phonePlaceholder:"+91 XXXXXXXXXX أو أي رقم",
    quizTitle:"اختبار الوعي بالاحتيال", quizSubtitle:"اختبر معلوماتك!",
    reportTitle:"الإبلاغ عن محاولة احتيال", reportSubtitle:"ساعد في حماية الآخرين بالإبلاغ عن عمليات الاحتيال",
    fraudType:"نوع الاحتيال *", describe:"ماذا حدث *", contactLabel:"معلومات التواصل (اختياري)",
    submitReport:"إرسال البلاغ", reportDoneTitle:"تم إرسال البلاغ!", reportDoneSub:"شكراً. أبلغ أيضاً على cybercrime.gov.in",
    submitAnother:"إرسال بلاغ آخر", emergencyNote:"للخسائر المالية اتصل بـ 1930 فوراً",
    selectFraud:"اختر نوع الاحتيال...", scansToday:"فحوصات اليوم",
    quizComplete:"اكتمل الاختبار!", nextQ:"السؤال التالي →", submitQuiz:"عرض نتيجتي",
    restartQuiz:"حاول مرة أخرى", correct:"✅ صحيح!", wrong:"❌ خطأ —",
    explanation:"السبب:", riskScore:"درجة الخطر", verdictLabel:"الحكم",
    redFlags:"⚠️ علامات التحذير", safeIndicators:"✅ مؤشرات الأصالة",
    manipulation:"🧠 الأساليب النفسية المستخدمة", recommendation:"📋 ماذا يجب أن تفعل",
    confidence:"مستوى الثقة", reasoning:"تحليل الذكاء الاصطناعي",
    scamLibraryTitle:"دليل النصب", scamLibrarySub:"تعلم كيفية التعرف على أكثر عمليات الاحتيال شيوعاً",
    linkScannerTitle:"فاحص الروابط والعناوين", linkScannerSub:"الصق أي رابط — سيفحصه الذكاء الاصطناعي في ثوانٍ",
    msgAnalyzerTitle:"فاحص الرسائل والبريد الإلكتروني", msgAnalyzerSub:"رسائل البنك، واتساب، البريد — حقيقي أم مزيف",
    analyzeScanning:"التحقق من أمان الرابط...",
    analyzeMsg:"قراءة الرسالة بعناية...",
    analyzePhone:"التحقق من الرقم...",
    startQuiz:"بدء الاختبار →", allLevels:"الكل", beginner:"مبتدئ",
    intermediate:"متوسط", advanced:"متقدم",
    emergencyContacts:"جهات الاتصال في حالات الطوارئ",
    genuineNote:"💡 ملاحظة: رسائل البنك من معرفات رسمية مثل VM-SBIINB وAD-HDFCBK عادةً ما تكون حقيقية.",
  },
  ta: { appName:"ஃப்ராட்ஷீல்ட்", tagline:"இந்தியாவின் AI மோசடி பாதுகாப்பாளர்", tabs:["🔗 இணைப்பு சோதனை","📧 செய்தி சோதனை","📞 தொலைபேசி சோதனை","📚 மோசடி வழிகாட்டி","🧠 வினாவிடை","🚨 புகார்"], emergency:"உதவி எண்", alertBanner:"⚠️  டிஜிட்டல் கைது மோசடிகள் 400% அதிகரித்தன — எந்த அரசு நிறுவனமும் ஆன்லைனில் கைது செய்வதில்லை  ⚠️", enterUrl:"சந்தேகமான இணைப்பை இங்கே ஒட்டவும்", scanBtn:"சோதிக்கவும்", scanning:"சோதிக்கிறது...", urlPlaceholder:"எ.கா. https://sbi-kyc-update.xyz", pasteMessage:"எந்த செய்தியையும் இங்கே ஒட்டவும்", analyzeBtn:"சோதிக்கவும்", analyzing:"பகுப்பாய்வு செய்கிறது...", msgPlaceholder:"வங்கி SMS, WhatsApp செய்தி அல்லது மின்னஞ்சலை இங்கே ஒட்டவும்.", phoneTitle:"தொலைபேசி எண் சோதனை", phoneSubtitle:"எண் மோசடியுடன் தொடர்புடையதா என்று சோதிக்கவும்", enterPhone:"தொலைபேசி எண்ணை உள்ளிடவும்", checkBtn:"சோதிக்கவும்", checking:"சோதிக்கிறது...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"விழிப்புணர்வு வினாவிடை", quizSubtitle:"உங்கள் அறிவை சோதியுங்கள்!", reportTitle:"மோசடியை புகாரளிக்கவும்", reportSubtitle:"மற்றவர்களை பாதுகாக்க புகார் அளிக்கவும்", fraudType:"மோசடி வகை *", describe:"என்ன நடந்தது *", contactLabel:"உங்கள் தொடர்பு (விருப்பமானது)", submitReport:"புகார் அனுப்பவும்", reportDoneTitle:"புகார் அனுப்பப்பட்டது!", reportDoneSub:"நன்றி. cybercrime.gov.in-லும் புகார் அளிக்கவும்.", submitAnother:"மேலும் புகார்", emergencyNote:"நிதி இழப்பிற்கு 1930ஐ உடனே அழைக்கவும்", selectFraud:"மோசடி வகையை தேர்ந்தெடுக்கவும்...", scansToday:"இன்றைய சோதனைகள்", quizComplete:"வினாவிடை முடிந்தது!", nextQ:"அடுத்த கேள்வி →", submitQuiz:"மதிப்பெண் காண்க", restartQuiz:"மீண்டும் முயற்சி", correct:"✅ சரி!", wrong:"❌ தவறு —", explanation:"காரணம்:", riskScore:"அபாய மதிப்பெண்", verdictLabel:"தீர்ப்பு", redFlags:"⚠️ எச்சரிக்கை அறிகுறிகள்", safeIndicators:"✅ உண்மையான அறிகுறிகள்", manipulation:"🧠 உளவியல் தந்திரங்கள்", recommendation:"📋 நீங்கள் என்ன செய்ய வேண்டும்", confidence:"நம்பிக்கை அளவு", reasoning:"AI பகுப்பாய்வு", scamLibraryTitle:"மோசடி வழிகாட்டி", scamLibrarySub:"பொதுவான டிஜிட்டல் மோசடிகளை அடையாளம் காணுங்கள்", linkScannerTitle:"இணைப்பு சோதனை", linkScannerSub:"எந்த இணைப்பையும் சோதிக்கவும்", msgAnalyzerTitle:"செய்தி சோதனை", msgAnalyzerSub:"வங்கி SMS, WhatsApp, மின்னஞ்சல் — உண்மையா போலியா", analyzeScanning:"இணைப்பு பாதுகாப்பை சோதிக்கிறது...", analyzeMsg:"செய்தியை கவனமாக படிக்கிறது...", analyzePhone:"எண்ணை சோதிக்கிறது...", startQuiz:"வினாவிடை தொடங்கு →", allLevels:"அனைத்தும்", beginner:"தொடக்கநிலை", intermediate:"இடைநிலை", advanced:"மேம்பட்ட நிலை", emergencyContacts:"அவசர தொடர்புகள்", genuineNote:"💡 குறிப்பு: VM-SBIINB, AD-HDFCBK போன்ற அதிகாரப்பூர்வ Sender ID-யில் இருந்து வரும் வங்கி SMS பொதுவாக உண்மையானவை." },
  te: { appName:"ఫ్రాడ్‌షీల్డ్", tagline:"భారతదేశపు AI మోసాల రక్షకుడు", tabs:["🔗 లింక్ స్కాన్","📧 సందేశ తనిఖీ","📞 ఫోన్ తనిఖీ","📚 మోసం గైడ్","🧠 క్విజ్","🚨 రిపోర్ట్"], emergency:"హెల్ప్‌లైన్", alertBanner:"⚠️  డిజిటల్ అరెస్ట్ మోసాలు 400% పెరిగాయి — ఏ ప్రభుత్వ సంస్థ కూడా ఆన్‌లైన్‌లో అరెస్ట్ చేయదు  ⚠️", enterUrl:"అనుమానాస్పద లింక్ ఇక్కడ పేస్ట్ చేయండి", scanBtn:"స్కాన్ చేయండి", scanning:"స్కాన్ అవుతోంది...", urlPlaceholder:"ఉదా. https://sbi-kyc-update.xyz", pasteMessage:"ఏదైనా సందేశం ఇక్కడ పేస్ట్ చేయండి", analyzeBtn:"తనిఖీ చేయండి", analyzing:"విశ్లేషిస్తోంది...", msgPlaceholder:"బ్యాంక్ SMS, WhatsApp సందేశం లేదా ఇమెయిల్ ఇక్కడ పేస్ట్ చేయండి.", phoneTitle:"ఫోన్ నంబర్ తనిఖీ", phoneSubtitle:"నంబర్ మోసంతో అనుసంధానించబడిందో తనిఖీ చేయండి", enterPhone:"ఫోన్ నంబర్ నమోదు చేయండి", checkBtn:"తనిఖీ చేయి", checking:"తనిఖీ అవుతోంది...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"అవగాహన క్విజ్", quizSubtitle:"మీ జ్ఞానాన్ని పరీక్షించుకోండి!", reportTitle:"మోసాన్ని రిపోర్ట్ చేయండి", reportSubtitle:"ఇతరులను రక్షించడానికి రిపోర్ట్ చేయండి", fraudType:"మోసం రకం *", describe:"ఏం జరిగిందో వివరించండి *", contactLabel:"మీ సంప్రదింపు (ఐచ్ఛికం)", submitReport:"రిపోర్ట్ పంపండి", reportDoneTitle:"రిపోర్ట్ పంపబడింది!", reportDoneSub:"ధన్యవాదాలు. cybercrime.gov.in-లో కూడా రిపోర్ట్ చేయండి.", submitAnother:"మరొక రిపోర్ట్", emergencyNote:"ఆర్థిక నష్టాలకు వెంటనే 1930కి కాల్ చేయండి", selectFraud:"మోసం రకాన్ని ఎంచుకోండి...", scansToday:"నేటి స్కాన్లు", quizComplete:"క్విజ్ పూర్తయింది!", nextQ:"తదుపరి ప్రశ్న →", submitQuiz:"స్కోర్ చూడండి", restartQuiz:"మళ్ళీ ప్రయత్నించు", correct:"✅ సరైనది!", wrong:"❌ తప్పు —", explanation:"కారణం:", riskScore:"రిస్క్ స్కోర్", verdictLabel:"నిర్ణయం", redFlags:"⚠️ హెచ్చరిక సంకేతాలు", safeIndicators:"✅ నిజమైన సంకేతాలు", manipulation:"🧠 మానసిక వ్యూహాలు", recommendation:"📋 మీరు ఏమి చేయాలి", confidence:"నమ్మకం స్థాయి", reasoning:"AI విశ్లేషణ", scamLibraryTitle:"మోసం గైడ్", scamLibrarySub:"సాధారణ డిజిటల్ మోసాలను గుర్తించడం నేర్చుకోండి", linkScannerTitle:"లింక్ స్కానర్", linkScannerSub:"ఏదైనా లింక్ తనిఖీ చేయండి", msgAnalyzerTitle:"సందేశ తనిఖీ", msgAnalyzerSub:"బ్యాంక్ SMS, WhatsApp, ఇమెయిల్ — నిజమా నకలా", analyzeScanning:"లింక్ భద్రతను తనిఖీ చేస్తోంది...", analyzeMsg:"సందేశాన్ని జాగ్రత్తగా చదువుతోంది...", analyzePhone:"నంబర్ తనిఖీ అవుతోంది...", startQuiz:"క్విజ్ ప్రారంభించు →", allLevels:"అన్నీ", beginner:"ప్రారంభ స్థాయి", intermediate:"మధ్యస్థ స్థాయి", advanced:"అధునాతన స్థాయి", emergencyContacts:"అత్యవసర సంప్రదింపులు", genuineNote:"💡 గమనిక: VM-SBIINB, AD-HDFCBK వంటి అధికారిక Sender ID నుండి వచ్చే బ్యాంక్ SMS సాధారణంగా నిజమైనవి." },
  mr: { appName:"डिजीसेंट्री", tagline:"भारताचा AI फसवणूक रक्षक", tabs:["🔗 लिंक तपासणी","📧 संदेश तपासणी","📞 फोन तपासणी","📚 फसवणूक मार्गदर्शिका","🧠 प्रश्नमंजुषा","🚨 तक्रार"], emergency:"हेल्पलाइन", alertBanner:"⚠️  डिजिटल अटक घोटाळे 400% वाढले — कोणतीही सरकारी यंत्रणा ऑनलाइन अटक करत नाही  ⚠️", enterUrl:"संशयास्पद लिंक येथे टाका", scanBtn:"तपासा", scanning:"तपासत आहे...", urlPlaceholder:"उदा. https://sbi-kyc-update.xyz", pasteMessage:"कोणताही संदेश येथे टाका", analyzeBtn:"तपासा", analyzing:"विश्लेषण होत आहे...", msgPlaceholder:"बँक SMS, WhatsApp संदेश किंवा ईमेल येथे टाका.", phoneTitle:"फोन नंबर तपासणी", phoneSubtitle:"नंबर फसवणुकीशी जोडलेला आहे का ते तपासा", enterPhone:"फोन नंबर टाका", checkBtn:"तपासा", checking:"तपासत आहे...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"जागरूकता प्रश्नमंजुषा", quizSubtitle:"तुमचे ज्ञान तपासा!", reportTitle:"फसवणूक तक्रार करा", reportSubtitle:"इतरांना वाचवण्यासाठी तक्रार करा", fraudType:"फसवणुकीचा प्रकार *", describe:"काय झाले *", contactLabel:"तुमचा संपर्क (पर्यायी)", submitReport:"तक्रार पाठवा", reportDoneTitle:"तक्रार पाठवली!", reportDoneSub:"धन्यवाद. cybercrime.gov.in वरही तक्रार करा.", submitAnother:"आणखी तक्रार", emergencyNote:"आर्थिक नुकसानासाठी लगेच 1930 वर कॉल करा", selectFraud:"फसवणुकीचा प्रकार निवडा...", scansToday:"आजच्या तपासण्या", quizComplete:"प्रश्नमंजुषा पूर्ण!", nextQ:"पुढील प्रश्न →", submitQuiz:"स्कोर पहा", restartQuiz:"पुन्हा प्रयत्न", correct:"✅ बरोबर!", wrong:"❌ चुकीचे —", explanation:"कारण:", riskScore:"जोखीम स्कोर", verdictLabel:"निर्णय", redFlags:"⚠️ धोक्याचे संकेत", safeIndicators:"✅ खरे असल्याचे संकेत", manipulation:"🧠 मनोवैज्ञानिक युक्त्या", recommendation:"📋 तुम्ही काय करावे", confidence:"विश्वास पातळी", reasoning:"AI विश्लेषण", scamLibraryTitle:"फसवणूक मार्गदर्शिका", scamLibrarySub:"सामान्य डिजिटल फसवणुका ओळखायला शिका", linkScannerTitle:"लिंक तपासणी", linkScannerSub:"कोणताही लिंक तपासा", msgAnalyzerTitle:"संदेश तपासणी", msgAnalyzerSub:"बँक SMS, WhatsApp, ईमेल — खरे की खोटे", analyzeScanning:"लिंक सुरक्षितता तपासत आहे...", analyzeMsg:"संदेश काळजीपूर्वक वाचत आहे...", analyzePhone:"नंबर तपासत आहे...", startQuiz:"प्रश्नमंजुषा सुरू करा →", allLevels:"सर्व", beginner:"नवशिके", intermediate:"मध्यम", advanced:"प्रगत", emergencyContacts:"आणीबाणी संपर्क", genuineNote:"💡 टीप: VM-SBIINB, AD-HDFCBK सारख्या अधिकृत Sender ID मधून आलेले बँक SMS सहसा खरे असतात." },
  gu: { appName:"ફ્રૉડશીલ્ડ", tagline:"ભારતનો AI છેતરપિંડી રક્ષક", tabs:["🔗 લિંક તપાસ","📧 સંદેશ તપાસ","📞 ફોન તપાસ","📚 છેતરપિંડી માર્ગદર્શિકા","🧠 ક્વિઝ","🚨 ફરિયાદ"], emergency:"હેલ્પલાઇન", alertBanner:"⚠️  ડિજિટલ ધરપકડ છેતરપિંડી 400% વધી — કોઈ સરકારી એજન્સી ઑનલાઇન ધરપકડ કરતી નથી  ⚠️", enterUrl:"શંકાસ્પદ લિંક અહીં નાખો", scanBtn:"તપાસો", scanning:"તપાસ થઈ રહી છે...", urlPlaceholder:"ઉદા. https://sbi-kyc-update.xyz", pasteMessage:"કોઈ પણ સંદેશ અહીં નાખો", analyzeBtn:"તપાસો", analyzing:"વિશ્લેષણ થઈ રહ્યું છે...", msgPlaceholder:"બૅન્ક SMS, WhatsApp સંદેશ અથવા ઈમેઈલ અહીં નાખો.", phoneTitle:"ફોન નંબર તપાસ", phoneSubtitle:"નંબર છેતરપિંડી સાથે જોડાયેલ છે કે નહીં તે તપાસો", enterPhone:"ફોન નંબર નાખો", checkBtn:"તપાસો", checking:"તપાસ થઈ રહી છે...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"જાગૃતિ ક્વિઝ", quizSubtitle:"તમારું જ્ઞાન ચકાસો!", reportTitle:"છેતરપિંડીની ફરિયાદ", reportSubtitle:"બીજાઓને બચાવવા ફરિયાદ કરો", fraudType:"છેતરપિંડીનો પ્રકાર *", describe:"શું થયું *", contactLabel:"તમારો સંપર્ક (વૈકલ્પિક)", submitReport:"ફરિયાદ મોકલો", reportDoneTitle:"ફરિયાદ મોકલાઈ!", reportDoneSub:"આભાર. cybercrime.gov.in પર પણ ફરિયાદ કરો.", submitAnother:"બીજી ફરિયાદ", emergencyNote:"આર્થિક નુકસાન માટે 1930 પર ફોન કરો", selectFraud:"છેતરપિંડીનો પ્રકાર પસંદ કરો...", scansToday:"આજની તપાસ", quizComplete:"ક્વિઝ પૂર્ણ!", nextQ:"આગળ →", submitQuiz:"સ્કોર જુઓ", restartQuiz:"ફરી પ્રયાસ", correct:"✅ સાચું!", wrong:"❌ ખોટું —", explanation:"કારણ:", riskScore:"જોખમ સ્કોર", verdictLabel:"નિર્ણય", redFlags:"⚠️ ચેતવણીના સંકેત", safeIndicators:"✅ વાસ્તવિક સંકેત", manipulation:"🧠 મનોવૈજ્ઞાનિક યુક્તિઓ", recommendation:"📋 તમારે શું કરવું", confidence:"વિશ્વાસ સ્તર", reasoning:"AI વિશ્લેષણ", scamLibraryTitle:"છેતરપિંડી માર્ગદર્શિકા", scamLibrarySub:"સામાન્ય ડિજિટલ છેતરપિંડી ઓળખો", linkScannerTitle:"લિંક તપાસ", linkScannerSub:"કોઈ પણ લિંક તપાસો", msgAnalyzerTitle:"સંદેશ તપાસ", msgAnalyzerSub:"બૅન્ક SMS, WhatsApp, ઈમેઈલ — સાચું કે ખોટું", analyzeScanning:"લિંક સુરક્ષા તપાસ...", analyzeMsg:"સંદેશ ધ્યાનથી વાંચ...", analyzePhone:"નંબર તપાસ...", startQuiz:"ક્વિઝ શરૂ →", allLevels:"બધા", beginner:"શ�ૂ આત", intermediate:"મધ્યમ", advanced:"પ્રગત", emergencyContacts:"કટોકટી સંપર્ક", genuineNote:"💡 નોંધ: VM-SBIINB, AD-HDFCBK જેવા અધિકૃત Sender ID ના બૅન્ક SMS સામાન્ય રીતે સાચા હોય છે." },
  pa: { appName:"ਫ੍ਰਾਡਸ਼ੀਲਡ", tagline:"ਭਾਰਤ ਦਾ AI ਧੋਖਾਧੜੀ ਰੱਖਿਅਕ", tabs:["🔗 ਲਿੰਕ ਜਾਂਚ","📧 ਸੁਨੇਹਾ ਜਾਂਚ","📞 ਫੋਨ ਜਾਂਚ","📚 ਧੋਖਾ ਗਾਈਡ","🧠 ਕੁਇਜ਼","🚨 ਰਿਪੋਰਟ"], emergency:"ਹੈਲਪਲਾਈਨ", alertBanner:"⚠️  ਡਿਜੀਟਲ ਗ੍ਰਿਫਤਾਰੀ ਧੋਖੇ 400% ਵਧੇ — ਕੋਈ ਸਰਕਾਰੀ ਏਜੰਸੀ ਆਨਲਾਈਨ ਗ੍ਰਿਫਤਾਰ ਨਹੀਂ ਕਰਦੀ  ⚠️", enterUrl:"ਸ਼ੱਕੀ ਲਿੰਕ ਇੱਥੇ ਪਾਓ", scanBtn:"ਜਾਂਚ ਕਰੋ", scanning:"ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...", urlPlaceholder:"ਜਿਵੇਂ https://sbi-kyc-update.xyz", pasteMessage:"ਕੋਈ ਵੀ ਸੁਨੇਹਾ ਇੱਥੇ ਪਾਓ", analyzeBtn:"ਜਾਂਚ ਕਰੋ", analyzing:"ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...", msgPlaceholder:"ਬੈਂਕ SMS, WhatsApp ਸੁਨੇਹਾ ਜਾਂ ਈਮੇਲ ਇੱਥੇ ਪਾਓ।", phoneTitle:"ਫੋਨ ਨੰਬਰ ਜਾਂਚ", phoneSubtitle:"ਦੇਖੋ ਕਿ ਨੰਬਰ ਕਿਸੇ ਧੋਖੇ ਨਾਲ ਜੁੜਿਆ ਹੈ", enterPhone:"ਫੋਨ ਨੰਬਰ ਪਾਓ", checkBtn:"ਜਾਂਚ", checking:"ਜਾਂਚ...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"ਜਾਗਰੂਕਤਾ ਕੁਇਜ਼", quizSubtitle:"ਆਪਣਾ ਗਿਆਨ ਜਾਂਚੋ!", reportTitle:"ਧੋਖੇ ਦੀ ਰਿਪੋਰਟ", reportSubtitle:"ਦੂਜਿਆਂ ਨੂੰ ਬਚਾਓ", fraudType:"ਧੋਖੇ ਦੀ ਕਿਸਮ *", describe:"ਕੀ ਹੋਇਆ *", contactLabel:"ਤੁਹਾਡਾ ਸੰਪਰਕ (ਵਿਕਲਪਿਕ)", submitReport:"ਰਿਪੋਰਟ ਭੇਜੋ", reportDoneTitle:"ਰਿਪੋਰਟ ਭੇਜੀ ਗਈ!", reportDoneSub:"ਧੰਨਵਾਦ। cybercrime.gov.in 'ਤੇ ਵੀ ਰਿਪੋਰਟ ਕਰੋ।", submitAnother:"ਹੋਰ ਰਿਪੋਰਟ", emergencyNote:"ਵਿੱਤੀ ਨੁਕਸਾਨ ਲਈ 1930 'ਤੇ ਕਾਲ ਕਰੋ", selectFraud:"ਧੋਖੇ ਦੀ ਕਿਸਮ ਚੁਣੋ...", scansToday:"ਅੱਜ ਦੀਆਂ ਜਾਂਚਾਂ", quizComplete:"ਕੁਇਜ਼ ਪੂਰਾ!", nextQ:"ਅਗਲਾ ਸਵਾਲ →", submitQuiz:"ਸਕੋਰ ਦੇਖੋ", restartQuiz:"ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼", correct:"✅ ਸਹੀ!", wrong:"❌ ਗਲਤ —", explanation:"ਕਾਰਨ:", riskScore:"ਜੋਖਮ ਸਕੋਰ", verdictLabel:"ਫੈਸਲਾ", redFlags:"⚠️ ਚੇਤਾਵਨੀ ਦੇ ਸੰਕੇਤ", safeIndicators:"✅ ਅਸਲੀ ਹੋਣ ਦੇ ਸੰਕੇਤ", manipulation:"🧠 ਮਨੋਵਿਗਿਆਨਕ ਚਾਲਾਂ", recommendation:"📋 ਤੁਹਾਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ", confidence:"ਭਰੋਸੇ ਦਾ ਪੱਧਰ", reasoning:"AI ਵਿਸ਼ਲੇਸ਼ਣ", scamLibraryTitle:"ਧੋਖਾ ਗਾਈਡ", scamLibrarySub:"ਆਮ ਡਿਜੀਟਲ ਧੋਖਿਆਂ ਨੂੰ ਪਛਾਣੋ", linkScannerTitle:"ਲਿੰਕ ਜਾਂਚ", linkScannerSub:"ਕੋਈ ਵੀ ਲਿੰਕ ਜਾਂਚੋ", msgAnalyzerTitle:"ਸੁਨੇਹਾ ਜਾਂਚ", msgAnalyzerSub:"ਬੈਂਕ SMS, WhatsApp, ਈਮੇਲ — ਅਸਲੀ ਜਾਂ ਨਕਲੀ", analyzeScanning:"ਲਿੰਕ ਸੁਰੱਖਿਆ ਜਾਂਚ...", analyzeMsg:"ਸੁਨੇਹਾ ਧਿਆਨ ਨਾਲ ਪੜ੍ਹਿਆ ਜਾ ਰਿਹਾ ਹੈ...", analyzePhone:"ਨੰਬਰ ਜਾਂਚਿਆ ਜਾ ਰਿਹਾ ਹੈ...", startQuiz:"ਕੁਇਜ਼ ਸ਼ੁਰੂ →", allLevels:"ਸਭ", beginner:"ਸ਼ੁਰੂਆਤੀ", intermediate:"ਵਿਚਕਾਰਲਾ", advanced:"ਉੱਨਤ", emergencyContacts:"ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ", genuineNote:"💡 ਨੋਟ: VM-SBIINB, AD-HDFCBK ਵਰਗੇ ਅਧਿਕਾਰਤ Sender ID ਤੋਂ ਬੈਂਕ SMS ਆਮਤੌਰ 'ਤੇ ਅਸਲੀ ਹੁੰਦੇ ਹਨ।" },
  kn: { appName:"ಫ್ರಾಡ್‌ಶೀಲ್ಡ್", tagline:"ಭಾರತದ AI ವಂಚನೆ ರಕ್ಷಕ", tabs:["🔗 ಲಿಂಕ್ ಪರಿಶೀಲನೆ","📧 ಸಂದೇಶ ಪರಿಶೀಲನೆ","📞 ಫೋನ್ ಪರಿಶೀಲನೆ","📚 ವಂಚನೆ ಮಾರ್ಗದರ್ಶಿ","🧠 ರಸಪ್ರಶ್ನೆ","🚨 ವರದಿ"], emergency:"ಸಹಾಯವಾಣಿ", alertBanner:"⚠️  ಡಿಜಿಟಲ್ ಬಂಧನ ವಂಚನೆಗಳು 400% ಹೆಚ್ಚಾಗಿವೆ — ಯಾವ ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಯೂ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬಂಧಿಸುವುದಿಲ್ಲ  ⚠️", enterUrl:"ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್ ಇಲ್ಲಿ ಹಾಕಿ", scanBtn:"ಪರಿಶೀಲಿಸಿ", scanning:"ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", urlPlaceholder:"ಉದಾ. https://sbi-kyc-update.xyz", pasteMessage:"ಯಾವುದೇ ಸಂದೇಶ ಇಲ್ಲಿ ಹಾಕಿ", analyzeBtn:"ಪರಿಶೀಲಿಸಿ", analyzing:"ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...", msgPlaceholder:"ಬ್ಯಾಂಕ್ SMS, WhatsApp ಸಂದೇಶ ಅಥವಾ ಇಮೇಲ್ ಇಲ್ಲಿ ಹಾಕಿ.", phoneTitle:"ಫೋನ್ ಸಂಖ್ಯೆ ಪರಿಶೀಲನೆ", phoneSubtitle:"ಸಂಖ್ಯೆ ವಂಚನೆಗೆ ಸಂಬಂಧಿಸಿದೆಯೇ ಎಂದು ತಿಳಿಯಿರಿ", enterPhone:"ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ", checkBtn:"ಪರಿಶೀಲಿಸಿ", checking:"ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"ಜಾಗೃತಿ ರಸಪ್ರಶ್ನೆ", quizSubtitle:"ನಿಮ್ಮ ಜ್ಞಾನ ಪರೀಕ್ಷಿಸಿ!", reportTitle:"ವಂಚನೆ ವರದಿ ಮಾಡಿ", reportSubtitle:"ಇತರರನ್ನು ರಕ್ಷಿಸಲು ವರದಿ ಮಾಡಿ", fraudType:"ವಂಚನೆ ಪ್ರಕಾರ *", describe:"ಏನಾಯಿತು *", contactLabel:"ನಿಮ್ಮ ಸಂಪರ್ಕ (ಐಚ್ಛಿಕ)", submitReport:"ವರದಿ ಕಳುಹಿಸಿ", reportDoneTitle:"ವರದಿ ಕಳುಹಿಸಲಾಗಿದೆ!", reportDoneSub:"ಧನ್ಯವಾದ. cybercrime.gov.in ನಲ್ಲಿಯೂ ವರದಿ ಮಾಡಿ.", submitAnother:"ಮತ್ತೊಂದು ವರದಿ", emergencyNote:"ಆರ್ಥಿಕ ನಷ್ಟಕ್ಕಾಗಿ ಈಗಲೇ 1930 ಗೆ ಕರೆ ಮಾಡಿ", selectFraud:"ವಂಚನೆ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ...", scansToday:"ಇಂದಿನ ಪರಿಶೀಲನೆಗಳು", quizComplete:"ರಸಪ್ರಶ್ನೆ ಮುಗಿಯಿತು!", nextQ:"ಮುಂದಿನ ಪ್ರಶ್ನೆ →", submitQuiz:"ಅಂಕ ನೋಡಿ", restartQuiz:"ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", correct:"✅ ಸರಿ!", wrong:"❌ ತಪ್ಪು —", explanation:"ಕಾರಣ:", riskScore:"ಅಪಾಯದ ಅಂಕ", verdictLabel:"ತೀರ್ಪು", redFlags:"⚠️ ಎಚ್ಚರಿಕೆ ಸಂಕೇತಗಳು", safeIndicators:"✅ ನಿಜವಾದ ಸಂಕೇತಗಳು", manipulation:"🧠 ಮಾನಸಿಕ ತಂತ್ರಗಳು", recommendation:"📋 ನೀವು ಏನು ಮಾಡಬೇಕು", confidence:"ವಿಶ್ವಾಸ ಮಟ್ಟ", reasoning:"AI ವಿಶ್ಲೇಷಣೆ", scamLibraryTitle:"ವಂಚನೆ ಮಾರ್ಗದರ್ಶಿ", scamLibrarySub:"ಸಾಮಾನ್ಯ ಡಿಜಿಟಲ್ ವಂಚನೆಗಳನ್ನು ಗುರುತಿಸಿ", linkScannerTitle:"ಲಿಂಕ್ ಪರಿಶೀಲಕ", linkScannerSub:"ಯಾವುದೇ ಲಿಂಕ್ ಪರಿಶೀಲಿಸಿ", msgAnalyzerTitle:"ಸಂದೇಶ ಪರಿಶೀಲಕ", msgAnalyzerSub:"ಬ್ಯಾಂಕ್ SMS, WhatsApp, ಇಮೇಲ್ — ನಿಜ ಅಥವಾ ನಕಲಿ", analyzeScanning:"ಲಿಂಕ್ ಸುರಕ್ಷತೆ ಪರಿಶೀಲನೆ...", analyzeMsg:"ಸಂದೇಶ ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಲಾಗುತ್ತಿದೆ...", analyzePhone:"ಸಂಖ್ಯೆ ಪರಿಶೀಲನೆ...", startQuiz:"ರಸಪ್ರಶ್ನೆ ಪ್ರಾರಂಭಿಸಿ →", allLevels:"ಎಲ್ಲಾ", beginner:"ಆರಂಭಿಕ", intermediate:"ಮಧ್ಯಮ", advanced:"ಮುಂದುವರಿದ", emergencyContacts:"ತುರ್ತು ಸಂಪರ್ಕಗಳು", genuineNote:"💡 ಗಮನಿಸಿ: VM-SBIINB, AD-HDFCBK ನಂತಹ ಅಧಿಕೃತ Sender ID ನಿಂದ ಬಂದ ಬ್ಯಾಂಕ್ SMS ಸಾಮಾನ್ಯವಾಗಿ ನಿಜವಾದವು." },
  ml: { appName:"ഫ്രോഡ്‌ഷീൽഡ്", tagline:"ഇന്ത്യയുടെ AI തട്ടിപ്പ് സംരക്ഷകൻ", tabs:["🔗 ലിങ്ക് പരിശോധന","📧 സന്ദേശ പരിശോധന","📞 ഫോൺ പരിശോധന","📚 തട്ടിപ്പ് ഗൈഡ്","🧠 ക്വിസ്","🚨 റിപ്പോർട്ട്"], emergency:"ഹെൽപ്‌ലൈൻ", alertBanner:"⚠️  ഡിജിറ്റൽ അറസ്റ്റ് തട്ടിപ്പുകൾ 400% വർദ്ധിച്ചു — ഒരു സർക്കാർ ഏജൻസിയും ഓൺലൈനിൽ അറസ്റ്റ് ചെയ്യുന്നില്ല  ⚠️", enterUrl:"സംശയാസ്പദ ലിങ്ക് ഇവിടെ ഒട്ടിക്കുക", scanBtn:"പരിശോധിക്കുക", scanning:"പരിശോധിക്കുന്നു...", urlPlaceholder:"ഉദാ. https://sbi-kyc-update.xyz", pasteMessage:"ഏതെങ്കിലും സന്ദേശം ഇവിടെ ഒട്ടിക്കുക", analyzeBtn:"പരിശോധിക്കുക", analyzing:"വിശകലനം ചെയ്യുന്നു...", msgPlaceholder:"ബാങ്ക് SMS, WhatsApp സന്ദേശം അല്ലെങ്കിൽ ഇമെയിൽ ഇവിടെ ഒട്ടിക്കുക.", phoneTitle:"ഫോൺ നമ്പർ പരിശോധന", phoneSubtitle:"നമ്പർ അറിയപ്പെടുന്ന തട്ടിപ്പുമായി ബന്ധപ്പെട്ടിട്ടുണ്ടോ എന്ന് പരിശോധിക്കുക", enterPhone:"ഫോൺ നമ്പർ നൽകുക", checkBtn:"പരിശോധിക്കുക", checking:"പരിശോധിക്കുന്നു...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"ബോധവൽക്കരണ ക്വിസ്", quizSubtitle:"നിങ്ങളുടെ അറിവ് പരീക്ഷിക്കുക!", reportTitle:"തട്ടിപ്പ് റിപ്പോർട്ട് ചെയ്യുക", reportSubtitle:"മറ്റുള്ളവരെ സംരക്ഷിക്കാൻ റിപ്പോർട്ട് ചെയ്യുക", fraudType:"തട്ടിപ്പിന്റെ തരം *", describe:"എന്ത് സംഭവിച്ചു *", contactLabel:"നിങ്ങളുടെ ബന്ധപ്പെടൽ (ഐച്ഛികം)", submitReport:"റിപ്പോർട്ട് അയക്കുക", reportDoneTitle:"റിപ്പോർട്ട് അയച്ചു!", reportDoneSub:"നന്ദി. cybercrime.gov.in-ലും റിപ്പോർട്ട് ചെയ്യുക.", submitAnother:"മറ്റൊരു റിപ്പോർട്ട്", emergencyNote:"സാമ്പത്തിക നഷ്ടത്തിന് ഉടൻ 1930 വിളിക്കുക", selectFraud:"തട്ടിപ്പിന്റെ തരം തിരഞ്ഞെടുക്കുക...", scansToday:"ഇന്നത്തെ പരിശോധനകൾ", quizComplete:"ക്വിസ് പൂർത്തിയായി!", nextQ:"അടുത്ത ചോദ്യം →", submitQuiz:"സ്കോർ കാണുക", restartQuiz:"വീണ്ടും ശ്രമിക്കുക", correct:"✅ ശരി!", wrong:"❌ തെറ്റ് —", explanation:"കാരണം:", riskScore:"റിസ്ക് സ്കോർ", verdictLabel:"വിധി", redFlags:"⚠️ മുന്നറിയിപ്പ് സൂചനകൾ", safeIndicators:"✅ യഥാർത്ഥ സൂചനകൾ", manipulation:"🧠 മനഃശാസ്ത്ര തന്ത്രങ്ങൾ", recommendation:"📋 നിങ്ങൾ എന്ത് ചെയ്യണം", confidence:"ആത്മവിശ്വാസ നില", reasoning:"AI വിശകലനം", scamLibraryTitle:"തട്ടിപ്പ് ഗൈഡ്", scamLibrarySub:"സാധാരണ ഡിജിറ്റൽ തട്ടിപ്പുകൾ തിരിച്ചറിയുക", linkScannerTitle:"ലിങ്ക് പരിശോധക", linkScannerSub:"ഏതെങ്കിലും ലിങ്ക് പരിശോധിക്കുക", msgAnalyzerTitle:"സന്ദേശ പരിശോധക", msgAnalyzerSub:"ബാങ്ക് SMS, WhatsApp, ഇമെയിൽ — യഥാർത്ഥം അതോ വ്യാജം", analyzeScanning:"ലിങ്ക് സുരക്ഷ പരിശോധിക്കുന്നു...", analyzeMsg:"സന്ദേശം ശ്രദ്ധയോടെ വായിക്കുന്നു...", analyzePhone:"നമ്പർ പരിശോധിക്കുന്നു...", startQuiz:"ക്വിസ് ആരംഭിക്കുക →", allLevels:"എല്ലാം", beginner:"തുടക്കക്കാർ", intermediate:"ഇടത്തരം", advanced:"വിദഗ്ധർ", emergencyContacts:"അടിയന്തര ബന്ധപ്പെടൽ", genuineNote:"💡 കുറിപ്പ്: VM-SBIINB, AD-HDFCBK പോലുള്ള ഔദ്യോഗിക Sender ID-ൽ നിന്നുള്ള ബാങ്ക് SMS സാധാരണയായി യഥാർത്ഥമാണ്." },
};

/* ─── QUIZ DATA ─────────────────────────────────────────────────────────── */
const QUIZ = [
  { q:"A video call comes from someone in police uniform saying you are under 'digital arrest'. What do you do?", options:["Stay on the call and cooperate","Pay the fine they demand","Hang up immediately and call 1930","Install the app they suggest"], answer:2, explanation:"No government agency conducts digital arrests. This is always a scam. Hang up and call 1930 immediately.", level:"beginner" },
  { q:"You get this SMS: 'VM-SBIINB: Rs.5000 debited from your account on 12-May. If not done by you call 1800-XXX-XXXX'. This is:", options:["Definitely a phishing SMS","Likely a genuine SBI transaction alert","A digital arrest attempt","A lottery scam"], answer:1, explanation:"VM-SBIINB is an official SBI sender ID. Transaction alerts in this format are typically genuine. However, never call the number in the SMS — always use the number on the back of your bank card.", level:"intermediate" },
  { q:"An unknown WhatsApp number offers ₹500/hr to like YouTube videos but asks ₹2000 registration first. This is:", options:["A legitimate part-time job","A fake job scam — never pay to work","A government scheme","An investment opportunity"], answer:1, explanation:"Legitimate employers never charge you to join. Small initial payments are bait — much larger demands follow.", level:"beginner" },
  { q:"A 'bank representative' asks you to install AnyDesk to fix your KYC. You should:", options:["Install AnyDesk and let them fix it","Give your account number for verification","Hang up and call your bank's official number independently","Share your OTP after they assure confidentiality"], answer:2, explanation:"Banks NEVER ask you to install remote access software. AnyDesk lets scammers see your screen and drain your account in minutes.", level:"intermediate" },
  { q:"Which of these is a GENUINE bank SMS sender ID?", options:["+91 9876543210","LOAN-OFFER","AD-HDFCBK","FREE-GIFT"], answer:2, explanation:"Official Indian bank SMS sender IDs follow formats like AD-HDFCBK (HDFC), VM-SBIINB (SBI), BW-ICICIB (ICICI). Numbers and random words are red flags.", level:"beginner" },
  { q:"You receive: 'Congratulations! Your number won Rs.25 lakh KBC lottery. Pay Rs.5000 processing fee to claim.' This is:", options:["A genuine KBC prize","A lottery scam — you cannot win a lottery you never entered","A government scheme","A bank offer"], answer:1, explanation:"You cannot win a lottery you never entered. Legitimate prizes never require upfront fees. Block and report immediately.", level:"beginner" },
  { q:"An attractive online match never video calls, claims to work abroad, then after 3 weeks asks for ₹50,000 for a 'medical emergency'. This is:", options:["A genuine emergency — help them","A romance/honey trap scam","A legitimate long-distance relationship","An investment partner"], answer:1, explanation:"Refusing video calls, working 'abroad', building trust over weeks then a sudden emergency — these are classic romance scam signals.", level:"intermediate" },
  { q:"You get an OTP on your phone while on a call with someone claiming to be from your bank. They ask for the OTP to 'verify' you. You should:", options:["Give the OTP — they called you so they must be genuine","Give only the last 4 digits","Never give OTP to anyone ever — hang up immediately","Ask them security questions first"], answer:2, explanation:"An OTP authorizes a TRANSACTION from your account. No bank official, police officer, or company representative will ever ask for your OTP.", level:"beginner" },
  { q:"A Telegram group shows screenshots of people earning lakhs from crypto investment. Members say they already withdrew profits. This is:", options:["A legitimate investment opportunity","A pig butchering investment scam","A government digital currency scheme","A safe mutual fund"], answer:1, explanation:"Fake screenshots and fake 'members' are used to build false confidence. You will never be able to withdraw real money — it's designed to take everything you invest.", level:"advanced" },
  { q:"Your phone shows a call from '100' (police). They say your Aadhaar is linked to crime. What is true?", options:["This is a real police call — cooperate fully","Police never call from 100 to ask for money or personal details — this is a scam","Give your Aadhaar to clear your name","Transfer money to avoid arrest"], answer:1, explanation:"Scammers can spoof any number including 100. Real police do not call to demand money or personal details over phone. Visit your nearest police station instead.", level:"advanced" },
];

/* ─── SCAM LIBRARY ─────────────────────────────────────────────────────── */
const SCAMS = [
  { icon:"👮", title:"Digital Arrest Scam", severity:"CRITICAL", desc:"Fraudsters impersonate CBI, ED, Narcotics, or Customs officers claiming you're under 'digital arrest' for money laundering or illegal parcels. They keep you on video call for hours.", flags:["Video calls from fake uniformed 'officers'","Demands to stay on camera during 'investigation'","Urgent transfers to 'secure accounts'","Threats of arrest if you disconnect"], tip:"No agency conducts digital arrests. Hang up and call 1930." },
  { icon:"📱", title:"WhatsApp & Telegram Fraud", severity:"HIGH", desc:"Fake job offers, task-based earning schemes, or investment groups. Small initial payments build trust before large demands.", flags:["Unknown numbers offering jobs or investments","Registration fees to join earning groups","Promises of 200-400% returns","Fake profit screenshots"], tip:"Never pay to join any group. Block and report immediately." },
  { icon:"🎣", title:"Phishing SMS & Emails", severity:"HIGH", desc:"Fake messages mimicking SBI, HDFC, IRCTC, Amazon, or government portals. Designed to steal login credentials and OTPs.", flags:["'Account blocked in 24 hours' urgency","Links with slight misspellings (sbI-bank.com)","Requests for OTP or card details","'Dear Customer' instead of your name"], tip:"Official bank SMS comes from sender IDs like VM-SBIINB. Always visit the official website directly." },
  { icon:"💰", title:"KYC & Remote Access Fraud", severity:"HIGH", desc:"Caller claims your KYC has expired and asks you to install AnyDesk or TeamViewer to 'fix' it.", flags:["Unsolicited KYC expiry calls","Requests to install AnyDesk, TeamViewer, QuickSupport","Opening banking apps during the call","Sending small 'test' amounts"], tip:"Banks never ask for remote access. Visit your branch for KYC." },
  { icon:"💼", title:"Fake Job & Task Scam", severity:"MEDIUM", desc:"Work-from-home jobs paying per 'like' or 'review'. Small initial payments are made, then victims are asked to invest large amounts.", flags:["Jobs paying per like, review, or task","Small initial payments to build trust","WhatsApp/Telegram-only communication","Pressure to upgrade by paying money"], tip:"Legitimate employers never charge you to work for them." },
  { icon:"💘", title:"Romance & Honey Trap", severity:"MEDIUM", desc:"Fake profiles build emotional relationships over weeks, then request money for emergencies or investments.", flags:["Too-perfect profile photos","Never agrees to live video calls","Moves off dating apps to WhatsApp quickly","Asks for money after emotional intimacy"], tip:"Reverse image search their photos. Never send money to someone you've only met online." },
];

const sevColor = s => s==="CRITICAL"?"#ef4444":s==="HIGH"?"#f97316":"#eab308";

/* ─── GOOGLE FONTS ──────────────────────────────────────────────────────── */
const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700;800&family=Noto+Sans+Bengali:wght@400;600;700;800&family=Noto+Sans+Tamil:wght@400;600;700;800&family=Noto+Sans+Telugu:wght@400;600;700;800&family=Noto+Sans+Gujarati:wght@400;600;700;800&family=Noto+Sans+Gurmukhi:wght@400;600;700;800&family=Noto+Sans+Kannada:wght@400;600;700;800&family=Noto+Sans+Malayalam:wght@400;600;700;800&family=Noto+Naskh+Arabic:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans','Noto Sans Devanagari','Noto Sans Bengali','Noto Sans Tamil','Noto Sans Telugu','Noto Sans Gujarati','Noto Sans Gurmukhi','Noto Sans Kannada','Noto Sans Malayalam','Noto Naskh Arabic', sans-serif !important; }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
`;

const FONT = "'Noto Sans','Noto Sans Devanagari','Noto Sans Bengali','Noto Sans Tamil','Noto Sans Telugu','Noto Sans Gujarati','Noto Sans Gurmukhi','Noto Sans Kannada','Noto Sans Malayalam','Noto Naskh Arabic',sans-serif";

/* ─── MAIN APP ──────────────────────────────────────────────────────────── */
export default function DigiSentry() {
  const [lang, setLang] = useState("en");
  const [showLang, setShowLang] = useState(false);
  const [tab, setTab] = useState(0);
  const [scanCount] = useState((Math.floor(Math.random()*8000)+15000).toLocaleString());

  const [url, setUrl] = useState(""); const [urlRes, setUrlRes] = useState(null); const [urlLoad, setUrlLoad] = useState(false);
  const [msg, setMsg] = useState(""); const [msgRes, setMsgRes] = useState(null); const [msgLoad, setMsgLoad] = useState(false);
  const [phone, setPhone] = useState(""); const [phoneRes, setPhoneRes] = useState(null); const [phoneLoad, setPhoneLoad] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [qFilter, setQFilter] = useState("all"); const [qIdx, setQIdx] = useState(0); const [sel, setSel] = useState(null);
  const [answers, setAnswers] = useState([]); const [quizDone, setQuizDone] = useState(false); const [quizStarted, setQuizStarted] = useState(false);
  const [rForm, setRForm] = useState({type:"",desc:"",contact:""}); const [rDone, setRDone] = useState(false);

  const t = T[lang] || T.en;
  const dir = LANGUAGES[lang]?.dir || "ltr";
  const filtQ = qFilter==="all" ? QUIZ : QUIZ.filter(q=>q.level===qFilter);

  function startQuiz() { setQIdx(0); setSel(null); setAnswers([]); setQuizDone(false); setQuizStarted(true); }
  function handleSel(i) { if(sel===null) setSel(i); }
  function nextQ() {
    const na=[...answers,{sel,correct:sel===filtQ[qIdx].answer}];
    setAnswers(na);
    if(qIdx+1>=filtQ.length) setQuizDone(true);
    else { setQIdx(qIdx+1); setSel(null); }
  }

  async function callAI(system, userMsg, setRes, setLoad) {
    setLoad(true); setRes(null);
    try {
      const r = await fetch(/api/claude",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1200,
          system, messages:[{role:"user",content:userMsg}] })
      });
      const d = await r.json();
      const txt = d.content?.[0]?.text||"{}";
      setRes(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    } catch { setRes({verdict:"ERROR",riskScore:0,summary:"Analysis failed. Please try again.",reasoning:"",redFlags:[],safeIndicators:[],recommendation:"Please try again."}); }
    setLoad(false);
  }

  const URL_SYSTEM = `You are DigiSentry, an expert cybersecurity AI for Indian users. Analyze URLs for fraud risk.
IMPORTANT: Be accurate — not everything is dangerous. Legitimate websites (google.com, sbi.co.in, onlinesbi.sbi, hdfcbank.com, amazon.in, irctc.co.in, gov.in domains etc.) should be marked SAFE.
Only flag as DANGEROUS if there are clear fraud indicators like: misspelled domains, suspicious TLDs, URL shorteners leading to unknown sites, fake bank domains, etc.
Respond ONLY in valid JSON (no markdown):
{"verdict":"SAFE"|"SUSPICIOUS"|"DANGEROUS","riskScore":0-100,"summary":"clear one sentence for a general user","reasoning":"2-3 sentences explaining your assessment in simple language","redFlags":["specific red flag if any"],"safeIndicators":["specific safe indicator if any"],"recommendation":"exactly what the user should do"}`;

  const MSG_SYSTEM = `You are DigiSentry, an expert cybersecurity AI for Indian users. Analyze messages for fraud.

IMPORTANT: The Indian SMS Sender ID (prefix) appears separately on the phone as the sender's contact name — NOT inside the message body. Users may or may not include it when pasting. Analyze both cases carefully.

TRAI REGISTERED PREFIXES — Always LEGITIMATE from these senders:
- VM, JD, BW, TM, CP, TP = Transactional (VM-SBIINB, JD-KOTAKBK, BW-ICICIB, TM-AXISBK)
- AD, VA, TA = Promotional/Advertising (AD-HDFCBK, VA-TATACAP, VA-APPLE)

GENUINE BANK MESSAGE PATTERNS — Mark as LEGITIMATE even without prefix if message contains:
- Masked account number (XX1234, XXXX1234) + transaction amount (Rs.XXXX or INR XXXX) + date = GENUINE transaction alert
- OTP from a message that mentions your bank name without asking you to share it = GENUINE OTP
- Balance update with masked account = GENUINE
- Official bank helpline numbers (1800-XXX-XXXX toll free) = genuine indicator
- Loan EMI deduction, credit card payment alerts with masked numbers = GENUINE
- UPI transaction alerts with masked VPA or account = GENUINE

SCAM INDICATORS — Flag as SCAM if:
- Asks recipient to SHARE OTP, PIN, CVV, password or Aadhaar
- Contains suspicious links (not official bank domains like hdfcbank.com, sbi.co.in, icicibank.com)
- Threatens account blocking unless you click a link or call an unofficial number
- Asks you to install any app or software
- Requests money transfer to any account
- Claims you won a prize or lottery
- Message comes from a mobile number (+91 XXXXXXXXXX) claiming to be a bank

SUSPICIOUS = has some unusual elements but not clearly fraud

Write reasoning in simple non-technical language. Always explain WHY you reached your conclusion.
If LEGITIMATE, clearly say the message appears genuine AND remind user never to share OTP with anyone.
If SCAM, clearly explain what the scammer is trying to do.

Respond ONLY in valid JSON (no markdown, no extra text):
{"verdict":"LEGITIMATE"|"SUSPICIOUS"|"SCAM","scamType":"type or null","riskScore":0-100,"summary":"one clear sentence for a general user","reasoning":"3-4 sentences in simple language explaining your assessment","redFlags":["specific red flag found in the message"],"safeIndicators":["specific genuine indicator found"],"recommendation":"exactly what the user should do next"}`;

  const PHONE_SYSTEM = `You are DigiSentry, expert in Indian phone fraud. Analyze phone numbers.
Note: Most +91 mobile numbers are ordinary. Flag as LIKELY_FRAUD only if: international number claiming to be Indian bank/govt, known scam formats, VOIP numbers, spoofed emergency numbers.
Respond ONLY in valid JSON (no markdown):
{"verdict":"LIKELY_SAFE"|"SUSPICIOUS"|"LIKELY_FRAUD","riskScore":0-100,"summary":"one clear sentence","reasoning":"2-3 sentences in simple language","indicators":["specific indicator"],"numberType":"Mobile/Landline/International/VoIP/Unknown","possibleScamType":"type or null","recommendation":"what to do"}`;

  const doUrl = () => url.trim() && callAI(URL_SYSTEM, `Analyze this URL: ${url}`, setUrlRes, setUrlLoad);
  const doMsg = () => msg.trim() && callAI(MSG_SYSTEM, `Analyze this message for fraud:\n\n${msg}`, setMsgRes, setMsgLoad);
  const doPhone = () => phone.trim() && callAI(PHONE_SYSTEM, `Analyze this phone number for Indian fraud risk: ${phone}`, setPhoneRes, setPhoneLoad);

  const vStyle = v => {
    if(v==="SAFE"||v==="LEGITIMATE"||v==="LIKELY_SAFE") return {bg:"#052e16",border:"#16a34a",color:"#4ade80",badge:"SAFE / GENUINE"};
    if(v==="SUSPICIOUS") return {bg:"#431407",border:"#ea580c",color:"#fb923c",badge:"SUSPICIOUS"};
    if(v==="DANGEROUS"||v==="SCAM"||v==="LIKELY_FRAUD") return {bg:"#450a0a",border:"#dc2626",color:"#f87171",badge:"LIKELY FRAUD"};
    return {bg:"#1e1e2e",border:"#4b5563",color:"#9ca3af",badge:"ERROR"};
  };

  const S = {
    app: { minHeight:"100vh", background:"#0f0f14", color:"#f1f5f9", fontFamily:FONT, fontSize:16, direction:dir },
    header: { background:"linear-gradient(135deg,#0f0f14,#1a1a2e)", borderBottom:"2px solid #1e3a5f", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, position:"sticky", top:0, zIndex:50 },
    logo: { fontSize:28, fontWeight:800, letterSpacing:2, color:"#38bdf8" },
    tagline: { fontSize:12, color:"#64748b", marginTop:2, fontWeight:600 },
    alert: { background:"linear-gradient(90deg,rgba(220,38,38,0.2),rgba(234,88,12,0.15),rgba(220,38,38,0.2))", borderBottom:"1px solid rgba(220,38,38,0.4)", padding:"10px 20px", fontSize:13, color:"#fca5a5", textAlign:"center", fontWeight:600 },
    nav: { display:"flex", background:"#0a0a14", borderBottom:"2px solid #1e293b", overflowX:"auto", padding:"0 12px" },
    navBtn: (active) => ({ padding:"14px 16px", background:"none", border:"none", borderBottom:active?"3px solid #38bdf8":"3px solid transparent", color:active?"#38bdf8":"#64748b", fontSize:13, fontFamily:FONT, fontWeight:active?700:500, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" }),
    main: { padding:"24px 20px", maxWidth:860, margin:"0 auto" },
    sHead: { marginBottom:20 },
    sTitle: { fontSize:24, fontWeight:800, color:"#f1f5f9", marginBottom:6 },
    sSub: { fontSize:15, color:"#94a3b8", lineHeight:1.6 },
    card: { background:"#1a1a2e", border:"1px solid #1e3a5f", borderRadius:12, padding:20, marginBottom:16 },
    label: { fontSize:13, fontWeight:700, color:"#38bdf8", letterSpacing:1, marginBottom:10, textTransform:"uppercase" },
    inp: { width:"100%", padding:"14px 16px", background:"#0f0f14", border:"2px solid #1e3a5f", borderRadius:10, color:"#f1f5f9", fontSize:15, fontFamily:FONT, outline:"none", transition:"border 0.2s" },
    btn: (dis) => ({ padding:"14px 24px", background:dis?"#1e293b":"linear-gradient(135deg,#0369a1,#0ea5e9)", border:"none", borderRadius:10, color:dis?"#475569":"#fff", fontSize:15, fontFamily:FONT, fontWeight:700, cursor:dis?"not-allowed":"pointer", transition:"all 0.2s" }),
    bigBtn: { width:"100%", padding:16, background:"linear-gradient(135deg,#0369a1,#0ea5e9)", border:"none", borderRadius:12, color:"#fff", fontSize:17, fontFamily:FONT, fontWeight:800, cursor:"pointer", letterSpacing:1, marginTop:8 },
  };

  return (
    <div style={S.app}>
      <style>{FONT_STYLE}</style>

      {/* HEADER */}
      <header style={S.header}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#0c4a6e,#0369a1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 0 20px rgba(56,189,248,0.3)"}}>🛡️</div>
          <div>
            <div style={S.logo}>{t.appName}</div>
            <div style={S.tagline}>{t.tagline}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:"#475569",fontWeight:700}}>{t.scansToday}</div>
            <div style={{fontSize:18,fontWeight:800,color:"#38bdf8"}}>{scanCount}</div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:"#475569",fontWeight:700}}>{t.emergency}</div>
            <div style={{fontSize:18,fontWeight:800,color:"#ef4444"}}>1930</div>
          </div>
          {/* Language Picker */}
          <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setShowLang(s=>!s)} style={{padding:"10px 14px",background:"rgba(56,189,248,0.1)",border:"2px solid rgba(56,189,248,0.4)",borderRadius:10,color:"#38bdf8",fontSize:14,fontFamily:FONT,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              {LANGUAGES[lang].flag} {LANGUAGES[lang].label} ▾
            </button>
            {showLang && (
              <div style={{position:"absolute",right:0,top:"110%",background:"#1a1a2e",border:"2px solid #1e3a5f",borderRadius:12,zIndex:200,minWidth:180,maxHeight:400,overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.8)"}}>
                {Object.entries(LANGUAGES).map(([code,info])=>(
                  <button key={code} onClick={()=>{setLang(code);setShowLang(false);}} style={{display:"block",width:"100%",padding:"12px 16px",background:lang===code?"rgba(56,189,248,0.15)":"none",border:"none",color:lang===code?"#38bdf8":"#cbd5e1",fontSize:14,fontFamily:FONT,fontWeight:lang===code?700:400,cursor:"pointer",textAlign:"left"}}>
                    {info.flag} {info.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ALERT */}
      <div style={S.alert}>{t.alertBanner}</div>

      {/* TABS */}
      <nav style={S.nav}>
        {t.tabs.map((tb,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={S.navBtn(tab===i)}>{tb}</button>
        ))}
      </nav>

      <main style={S.main} onClick={()=>showLang&&setShowLang(false)}>

        {/* ── TAB 0: LINK SCANNER ── */}
        {tab===0 && (
          <div style={{animation:"slideIn 0.3s ease"}}>
            <div style={S.sHead}>
              <div style={S.sTitle}>🔗 {t.linkScannerTitle}</div>
              <div style={S.sSub}>{t.linkScannerSub}</div>
            </div>
            <div style={S.card}>
              <div style={S.label}>{t.enterUrl}</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doUrl()} placeholder={t.urlPlaceholder} style={{...S.inp,flex:1,minWidth:200}}/>
                <button onClick={doUrl} disabled={urlLoad||!url.trim()} style={S.btn(urlLoad||!url.trim())}>{urlLoad?t.scanning:t.scanBtn}</button>
              </div>
            </div>
            {urlLoad && <Loader text={t.analyzeScanning} font={FONT}/>}
            {urlRes && !urlLoad && <ResultCard r={urlRes} vs={vStyle} t={t} font={FONT}/>}
            <div style={{marginTop:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"#475569",letterSpacing:1,marginBottom:12}}>COMMON FRAUD LINK PATTERNS</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
                {[{label:"Domain Spoofing",ex:"sbi-onlinebank.com",desc:"Looks like SBI but isn't"},{label:"URL Shorteners",ex:"bit.ly/win-prize",desc:"Hides the real destination"},{label:"No HTTPS",ex:"http://login-bank.com",desc:"No encryption — not safe"},{label:"Fake Urgency",ex:"kyc.expire.update.xyz",desc:"Designed to cause panic"}].map((p,i)=>(
                  <div key={i} style={{background:"#1a1a2e",border:"1px solid rgba(249,115,22,0.3)",borderRadius:10,padding:"14px"}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#f97316",marginBottom:4}}>{p.label}</div>
                    <div style={{fontSize:13,color:"#f1f5f9",fontStyle:"italic",marginBottom:4}}>{p.ex}</div>
                    <div style={{fontSize:12,color:"#64748b"}}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 1: MESSAGE CHECKER ── */}
        {tab===1 && (
          <div style={{animation:"slideIn 0.3s ease"}}>
            <div style={S.sHead}>
              <div style={S.sTitle}>📧 {t.msgAnalyzerTitle}</div>
              <div style={S.sSub}>{t.msgAnalyzerSub}</div>
            </div>
            {/* Genuine note */}
            <div style={{background:"rgba(22,163,74,0.1)",border:"1px solid rgba(22,163,74,0.4)",borderRadius:10,padding:"14px 16px",marginBottom:16,fontSize:14,color:"#4ade80",lineHeight:1.7}}>
              {t.genuineNote}
            </div>
            <div style={S.card}>
              <div style={S.label}>{t.pasteMessage}</div>
              <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder={t.msgPlaceholder} rows={7} style={{...S.inp,resize:"vertical",lineHeight:1.7}}/>
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:12}}>
                <button onClick={doMsg} disabled={msgLoad||!msg.trim()} style={S.btn(msgLoad||!msg.trim())}>{msgLoad?t.analyzing:t.analyzeBtn}</button>
              </div>
            </div>
            {msgLoad && <Loader text={t.analyzeMsg} font={FONT}/>}
            {msgRes && !msgLoad && <ResultCard r={msgRes} vs={vStyle} t={t} font={FONT} showScamType/>}
          </div>
        )}

        {/* ── TAB 2: PHONE LOOKUP ── */}
        {tab===2 && (
          <div style={{animation:"slideIn 0.3s ease"}}>
            <div style={S.sHead}>
              <div style={S.sTitle}>📞 {t.phoneTitle}</div>
              <div style={S.sSub}>{t.phoneSubtitle}</div>
            </div>
            <div style={S.card}>
              <div style={S.label}>{t.enterPhone}</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <input value={phone} onChange={e=>setPhone(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doPhone()} placeholder={t.phonePlaceholder} style={{...S.inp,flex:1,minWidth:200}}/>
                <button onClick={doPhone} disabled={phoneLoad||!phone.trim()} style={S.btn(phoneLoad||!phone.trim())}>{phoneLoad?t.checking:t.checkBtn}</button>
              </div>
            </div>
            {phoneLoad && <Loader text={t.analyzePhone} font={FONT}/>}
            {phoneRes && !phoneLoad && (
              <div style={{background:vStyle(phoneRes.verdict).bg,border:`2px solid ${vStyle(phoneRes.verdict).border}`,borderRadius:12,padding:20,animation:"slideIn 0.3s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,color:vStyle(phoneRes.verdict).color,letterSpacing:2,marginBottom:4}}>{t.verdictLabel}</div>
                    <div style={{fontSize:22,fontWeight:800,color:vStyle(phoneRes.verdict).color}}>{vStyle(phoneRes.verdict).badge}</div>
                    {phoneRes.numberType && <div style={{fontSize:13,color:"#94a3b8",marginTop:4}}>Type: {phoneRes.numberType}</div>}
                    {phoneRes.possibleScamType && <div style={{fontSize:13,color:"#f97316",marginTop:2}}>Likely: {phoneRes.possibleScamType}</div>}
                  </div>
                  <ScoreRing score={phoneRes.riskScore||0} label={t.riskScore}/>
                </div>
                {phoneRes.summary && <div style={{fontSize:15,color:"#e2e8f0",marginBottom:14,lineHeight:1.7,fontWeight:600}}>{phoneRes.summary}</div>}
                {phoneRes.reasoning && <div style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"12px 16px",fontSize:14,color:"#cbd5e1",lineHeight:1.8,marginBottom:14}}><span style={{fontWeight:700,color:"#38bdf8"}}>{t.reasoning}: </span>{phoneRes.reasoning}</div>}
                {phoneRes.indicators?.length>0 && <FlagList label="📊 INDICATORS" items={phoneRes.indicators} color="#f97316"/>}
                {phoneRes.recommendation && <div style={{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.3)",borderRadius:8,padding:"12px 16px",fontSize:15,color:"#38bdf8",fontWeight:700}}>{t.recommendation}: {phoneRes.recommendation}</div>}
              </div>
            )}
            <div style={{marginTop:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"#475569",letterSpacing:1,marginBottom:12}}>KNOWN SCAMMER NUMBER PATTERNS</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10}}>
                {[{p:"+92/+880/+44",r:"CRITICAL",d:"Spoofed international numbers pretending to be Indian police or banks"},{p:"+1 (XXX) XXX-XXXX",r:"HIGH",d:"US numbers used for Microsoft support or CBI impersonation scams"},{p:"WhatsApp only",r:"HIGH",d:"Any 'bank' or 'government' that only contacts via WhatsApp"},{p:"+91 700X/900X",r:"MEDIUM",d:"Prepaid SIM series frequently used in fraud"}].map((p,i)=>(
                  <div key={i} style={{background:"#1a1a2e",border:`1px solid ${p.r==="CRITICAL"?"rgba(239,68,68,0.4)":p.r==="HIGH"?"rgba(249,115,22,0.4)":"rgba(234,179,8,0.4)"}`,borderRadius:10,padding:14}}>
                    <div style={{fontSize:13,fontWeight:700,color:p.r==="CRITICAL"?"#f87171":p.r==="HIGH"?"#fb923c":"#fbbf24",marginBottom:4}}>{p.p}</div>
                    <div style={{fontSize:11,fontWeight:700,color:p.r==="CRITICAL"?"#f87171":p.r==="HIGH"?"#fb923c":"#fbbf24",marginBottom:6,letterSpacing:1}}>RISK: {p.r}</div>
                    <div style={{fontSize:12,color:"#64748b",lineHeight:1.6}}>{p.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: SCAM GUIDE ── */}
        {tab===3 && (
          <div style={{animation:"slideIn 0.3s ease"}}>
            <div style={S.sHead}>
              <div style={S.sTitle}>📚 {t.scamLibraryTitle}</div>
              <div style={S.sSub}>{t.scamLibrarySub}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {SCAMS.map((s,i)=>(
                <div key={i} onClick={()=>setExpanded(expanded===i?null:i)} style={{background:expanded===i?"#1a1a2e":"#13131f",border:`2px solid ${expanded===i?sevColor(s.severity)+"66":"#1e293b"}`,borderLeft:`4px solid ${sevColor(s.severity)}`,borderRadius:12,padding:"16px 18px",cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <span style={{fontSize:24}}>{s.icon}</span>
                      <div>
                        <div style={{fontSize:16,fontWeight:700,color:"#f1f5f9"}}>{s.title}</div>
                        {expanded!==i && <div style={{fontSize:13,color:"#64748b",marginTop:3}}>{s.desc.slice(0,70)}...</div>}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:11,fontWeight:700,letterSpacing:1,color:sevColor(s.severity),border:`1px solid ${sevColor(s.severity)}`,padding:"3px 8px",borderRadius:6}}>{s.severity}</span>
                      <span style={{color:"#475569",fontSize:14}}>{expanded===i?"▲":"▼"}</span>
                    </div>
                  </div>
                  {expanded===i && (
                    <div style={{marginTop:16}}>
                      <p style={{fontSize:15,color:"#94a3b8",lineHeight:1.8,marginBottom:16}}>{s.desc}</p>
                      <div style={{fontSize:13,fontWeight:700,color:"#ef4444",letterSpacing:1,marginBottom:10}}>🚩 RED FLAGS</div>
                      {s.flags.map((f,j)=><div key={j} style={{display:"flex",gap:10,fontSize:14,color:"#cbd5e1",marginBottom:8,lineHeight:1.6}}><span style={{color:"#ef4444",flexShrink:0}}>›</span><span>{f}</span></div>)}
                      <div style={{background:"rgba(22,163,74,0.1)",border:"1px solid rgba(22,163,74,0.4)",borderRadius:8,padding:"12px 16px",fontSize:14,color:"#4ade80",lineHeight:1.7,marginTop:14}}>💡 {s.tip}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Emergency contacts */}
            <div style={{marginTop:24,background:"rgba(239,68,68,0.08)",border:"2px solid rgba(239,68,68,0.3)",borderRadius:12,padding:20}}>
              <div style={{fontSize:16,fontWeight:800,color:"#f87171",letterSpacing:1,marginBottom:16}}>📞 {t.emergencyContacts}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
                {[{l:"National Cybercrime Helpline",v:"1930",i:"📞"},{l:"Cyber Crime Portal",v:"cybercrime.gov.in",i:"🌐"},{l:"RBI Helpline",v:"14440",i:"🏦"},{l:"TRAI Spam Report",v:"1909",i:"📱"}].map((c,i)=>(
                  <div key={i} style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"12px 14px",border:"1px solid rgba(239,68,68,0.2)"}}>
                    <div style={{fontSize:13,color:"#64748b",marginBottom:4}}>{c.i} {c.l}</div>
                    <div style={{fontSize:16,color:"#f87171",fontWeight:800}}>{c.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: QUIZ ── */}
        {tab===4 && (
          <div style={{animation:"slideIn 0.3s ease"}}>
            <div style={S.sHead}>
              <div style={S.sTitle}>🧠 {t.quizTitle}</div>
              <div style={S.sSub}>{t.quizSubtitle}</div>
            </div>
            {!quizStarted ? (
              <div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:20}}>
                  {[["all","🎯",t.allLevels,`${QUIZ.length} questions`],["beginner","🟢",t.beginner,"Basic awareness"],["intermediate","🟡",t.intermediate,"Regular users"],["advanced","🔴",t.advanced,"Expert level"]].map(([val,icon,label,desc])=>(
                    <div key={val} onClick={()=>setQFilter(val)} style={{background:qFilter===val?"rgba(56,189,248,0.12)":"#1a1a2e",border:`2px solid ${qFilter===val?"#38bdf8":"#1e293b"}`,borderRadius:12,padding:16,cursor:"pointer",transition:"all 0.2s",textAlign:"center"}}>
                      <div style={{fontSize:28,marginBottom:8}}>{icon}</div>
                      <div style={{fontSize:15,fontWeight:700,color:qFilter===val?"#38bdf8":"#f1f5f9",marginBottom:4}}>{label}</div>
                      <div style={{fontSize:12,color:"#64748b"}}>{desc}</div>
                      <div style={{fontSize:12,color:"#475569",marginTop:6}}>{(val==="all"?QUIZ:QUIZ.filter(q=>q.level===val)).length} Qs</div>
                    </div>
                  ))}
                </div>
                <button onClick={startQuiz} style={S.bigBtn}>{t.startQuiz}</button>
              </div>
            ) : quizDone ? (
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:52,marginBottom:16}}>{answers.filter(a=>a.correct).length>=filtQ.length*0.8?"🏆":answers.filter(a=>a.correct).length>=filtQ.length*0.5?"👍":"📚"}</div>
                <div style={{fontSize:20,color:"#38bdf8",fontWeight:800,marginBottom:8}}>{t.quizComplete}</div>
                <div style={{fontSize:40,fontWeight:900,color:"#fbbf24",marginBottom:8}}>{answers.filter(a=>a.correct).length}/{filtQ.length}</div>
                <div style={{fontSize:15,color:"#64748b",marginBottom:28,lineHeight:1.7}}>{answers.filter(a=>a.correct).length>=filtQ.length*0.8?"Excellent! You are well protected against digital fraud.":answers.filter(a=>a.correct).length>=filtQ.length*0.5?"Good effort! Review the Scam Guide to strengthen your knowledge.":"Keep learning — review the Scam Guide and try again!"}</div>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24,textAlign:"left"}}>
                  {filtQ.map((q,i)=>(
                    <div key={i} style={{background:answers[i]?.correct?"rgba(22,163,74,0.1)":"rgba(239,68,68,0.1)",border:`1px solid ${answers[i]?.correct?"rgba(22,163,74,0.4)":"rgba(239,68,68,0.4)"}`,borderRadius:10,padding:"14px 16px"}}>
                      <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                        <span style={{fontSize:16,flexShrink:0}}>{answers[i]?.correct?"✅":"❌"}</span>
                        <div>
                          <div style={{fontSize:14,color:"#cbd5e1",marginBottom:4,lineHeight:1.6}}>{q.q}</div>
                          {!answers[i]?.correct && <div style={{fontSize:13,color:"#4ade80",marginBottom:4,fontWeight:600}}>✔ {q.options[q.answer]}</div>}
                          <div style={{fontSize:13,color:"#64748b",lineHeight:1.6,fontStyle:"italic"}}>{q.explanation}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={()=>{setQuizStarted(false);setQuizDone(false);}} style={{padding:"14px 32px",background:"none",border:"2px solid #38bdf8",borderRadius:10,color:"#38bdf8",fontSize:15,fontFamily:FONT,fontWeight:700,cursor:"pointer"}}>{t.restartQuiz}</button>
              </div>
            ) : (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{fontSize:14,color:"#475569",fontWeight:700}}>QUESTION {qIdx+1} / {filtQ.length}</div>
                  <div style={{fontSize:13,color:"#fbbf24",fontWeight:700,background:"rgba(234,179,8,0.1)",padding:"4px 10px",borderRadius:6}}>{filtQ[qIdx].level.toUpperCase()}</div>
                </div>
                <div style={{width:"100%",height:6,background:"#1e293b",borderRadius:6,marginBottom:20}}>
                  <div style={{width:`${(qIdx/filtQ.length)*100}%`,height:"100%",background:"linear-gradient(90deg,#0369a1,#0ea5e9)",borderRadius:6,transition:"width 0.3s"}}/>
                </div>
                <div style={{...S.card,fontSize:16,lineHeight:1.8,fontWeight:600,color:"#f1f5f9",marginBottom:16}}>{filtQ[qIdx].q}</div>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                  {filtQ[qIdx].options.map((opt,i)=>{
                    const isSel=sel===i, isCorr=i===filtQ[qIdx].answer, show=sel!==null;
                    let bg="#13131f",bdr="#1e293b",clr="#cbd5e1";
                    if(show&&isCorr){bg="rgba(22,163,74,0.15)";bdr="#16a34a";clr="#4ade80";}
                    else if(show&&isSel&&!isCorr){bg="rgba(239,68,68,0.15)";bdr="#dc2626";clr="#f87171";}
                    else if(isSel){bg="rgba(56,189,248,0.1)";bdr="#38bdf8";clr="#38bdf8";}
                    return (
                      <div key={i} onClick={()=>handleSel(i)} style={{background:bg,border:`2px solid ${bdr}`,borderRadius:10,padding:"14px 16px",cursor:sel===null?"pointer":"default",transition:"all 0.2s",display:"flex",gap:14,alignItems:"center"}}>
                        <span style={{fontSize:13,color:clr,fontWeight:800,flexShrink:0,width:24,height:24,background:"rgba(255,255,255,0.05)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{["A","B","C","D"][i]}</span>
                        <span style={{fontSize:15,color:clr,lineHeight:1.6}}>{opt}</span>
                      </div>
                    );
                  })}
                </div>
                {sel!==null && (
                  <div style={{background:sel===filtQ[qIdx].answer?"rgba(22,163,74,0.1)":"rgba(239,68,68,0.1)",border:`2px solid ${sel===filtQ[qIdx].answer?"rgba(22,163,74,0.4)":"rgba(239,68,68,0.4)"}`,borderRadius:10,padding:"14px 16px",marginBottom:16,fontSize:14,lineHeight:1.8}}>
                    <strong style={{color:sel===filtQ[qIdx].answer?"#4ade80":"#f87171",fontSize:15}}>{sel===filtQ[qIdx].answer?t.correct:t.wrong}</strong>{" "}
                    <span style={{color:"#94a3b8"}}>{t.explanation}</span>{" "}
                    <span style={{color:"#cbd5e1"}}>{filtQ[qIdx].explanation}</span>
                  </div>
                )}
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <button onClick={nextQ} disabled={sel===null} style={S.btn(sel===null)}>{qIdx+1>=filtQ.length?t.submitQuiz:t.nextQ}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 5: REPORT ── */}
        {tab===5 && (
          <div style={{animation:"slideIn 0.3s ease"}}>
            <div style={S.sHead}>
              <div style={S.sTitle}>🚨 {t.reportTitle}</div>
              <div style={S.sSub}>{t.reportSubtitle}</div>
            </div>
            {rDone ? (
              <div style={{textAlign:"center",padding:48,background:"rgba(22,163,74,0.08)",border:"2px solid rgba(22,163,74,0.3)",borderRadius:16}}>
                <div style={{fontSize:52,marginBottom:16}}>✅</div>
                <div style={{fontSize:22,color:"#4ade80",fontWeight:800,marginBottom:10}}>{t.reportDoneTitle}</div>
                <div style={{fontSize:15,color:"#64748b",marginBottom:24,lineHeight:1.8}}>{t.reportDoneSub}</div>
                <button onClick={()=>{setRDone(false);setRForm({type:"",desc:"",contact:""}); }} style={{padding:"12px 28px",background:"none",border:"2px solid #4ade80",borderRadius:10,color:"#4ade80",fontSize:15,fontFamily:FONT,fontWeight:700,cursor:"pointer"}}>{t.submitAnother}</button>
              </div>
            ) : (
              <div style={S.card}>
                <div style={{display:"flex",flexDirection:"column",gap:18}}>
                  <div>
                    <div style={S.label}>{t.fraudType}</div>
                    <select value={rForm.type} onChange={e=>setRForm(f=>({...f,type:e.target.value}))} style={{...S.inp,color:rForm.type?"#f1f5f9":"#475569"}}>
                      <option value="">{t.selectFraud}</option>
                      <option>Digital Arrest Scam</option><option>WhatsApp / Telegram Fraud</option>
                      <option>Phishing Email or SMS</option><option>KYC / Bank Fraud</option>
                      <option>Fake Job / Part-Time Scam</option><option>Romance / Honey Trap Scam</option>
                      <option>Investment / Crypto Scam</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <div style={S.label}>{t.describe}</div>
                    <textarea rows={6} value={rForm.desc} onChange={e=>setRForm(f=>({...f,desc:e.target.value}))} placeholder="Describe what happened, what was said, what numbers or links were used..." style={{...S.inp,resize:"vertical",lineHeight:1.7}}/>
                  </div>
                  <div>
                    <div style={S.label}>{t.contactLabel}</div>
                    <input value={rForm.contact} onChange={e=>setRForm(f=>({...f,contact:e.target.value}))} placeholder="Phone or email for follow-up (optional)" style={S.inp}/>
                  </div>
                  <button disabled={!rForm.type||!rForm.desc} onClick={()=>setRDone(true)} style={{...S.bigBtn,background:(!rForm.type||!rForm.desc)?"#1e293b":"linear-gradient(135deg,#7f1d1d,#dc2626)",color:(!rForm.type||!rForm.desc)?"#475569":"#fff",cursor:(!rForm.type||!rForm.desc)?"not-allowed":"pointer"}}>
                    {t.submitReport}
                  </button>
                </div>
                <div style={{marginTop:16,padding:"14px 16px",background:"rgba(249,115,22,0.08)",border:"1px solid rgba(249,115,22,0.3)",borderRadius:10,fontSize:14,color:"#fb923c",lineHeight:1.7,fontWeight:600}}>
                  ⚠️ {t.emergencyNote}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Support / Donation Banner */}
      <div style={{background:"linear-gradient(135deg,#0c2340,#1a3a5c)",borderTop:"2px solid #1e3a5f",padding:"20px 20px",textAlign:"center"}}>
        <div style={{fontSize:16,fontWeight:800,color:"#38bdf8",marginBottom:6}}>❤️ Support DigiSentry</div>
        <div style={{fontSize:13,color:"#94a3b8",marginBottom:16,lineHeight:1.7}}>
          DigiSentry is free for everyone. If it helped protect you or your family,<br/>
          consider supporting us to keep it running and improving.
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
          <a href="upi://pay?pa=haroldnormanhart@gmail.com&pn=DigiSentry&am=50&cu=INR&tn=Supporting DigiSentry App" style={{padding:"12px 24px",background:"linear-gradient(135deg,#166534,#16a34a)",borderRadius:10,color:"#fff",fontWeight:800,fontSize:14,textDecoration:"none",display:"inline-block"}}>
            💚 ₹50 via UPI
          </a>
          <a href="upi://pay?pa=haroldnormanhart@gmail.com&pn=DigiSentry&am=100&cu=INR&tn=Supporting DigiSentry App" style={{padding:"12px 24px",background:"linear-gradient(135deg,#1d4ed8,#2563eb)",borderRadius:10,color:"#fff",fontWeight:800,fontSize:14,textDecoration:"none",display:"inline-block"}}>
            💙 ₹100 via UPI
          </a>
          <a href="upi://pay?pa=haroldnormanhart@gmail.com&pn=DigiSentry&am=500&cu=INR&tn=Supporting DigiSentry App" style={{padding:"12px 24px",background:"linear-gradient(135deg,#7c3aed,#9333ea)",borderRadius:10,color:"#fff",fontWeight:800,fontSize:14,textDecoration:"none",display:"inline-block"}}>
            💜 ₹500 via UPI
          </a>
        </div>
        <div style={{fontSize:11,color:"#475569",marginTop:12}}>
          UPI ID: haroldnormanhart@gmail.com • All payments go directly to the developer
        </div>
      </div>

      <footer style={{borderTop:"1px solid #1e293b",padding:"14px 20px",textAlign:"center",fontSize:11,color:"#334155",fontWeight:600,letterSpacing:1}}>
        DIGISENTRY v2 • YOUR DIGITAL GUARDIAN • NOT A SUBSTITUTE FOR OFFICIAL CYBERCRIME REPORTING
      </footer>
    </div>
  );
}

/* ─── HELPER COMPONENTS ─────────────────────────────────────────────────── */
function Loader({text,font}) {
  return (
    <div style={{textAlign:"center",padding:32,background:"#13131f",border:"1px solid #1e3a5f",borderRadius:12,marginBottom:16}}>
      <div style={{fontSize:28,marginBottom:10,display:"inline-block",animation:"spin 1s linear infinite"}}>⚙️</div>
      <div style={{fontSize:15,color:"#38bdf8",fontFamily:font,fontWeight:600}}>{text}</div>
    </div>
  );
}

function ScoreRing({score,label}) {
  const color = score<30?"#4ade80":score<60?"#fb923c":"#f87171";
  return (
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:36,fontWeight:900,color}}>{score}</div>
      <div style={{fontSize:11,color:"#475569",fontWeight:700,letterSpacing:1}}>{label}</div>
    </div>
  );
}

function FlagList({label,items,color}) {
  return (
    <div style={{marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color,letterSpacing:1,marginBottom:8}}>{label}</div>
      {items.map((item,i)=>(
        <div key={i} style={{display:"flex",gap:10,fontSize:14,color:"#cbd5e1",marginBottom:8,lineHeight:1.6}}>
          <span style={{color,flexShrink:0}}>›</span><span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ResultCard({r,vs,t,font,showScamType}) {
  const style=vs(r.verdict);
  return (
    <div style={{background:style.bg,border:`2px solid ${style.border}`,borderRadius:12,padding:20,marginBottom:16,animation:"slideIn 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:style.color,letterSpacing:2,marginBottom:4}}>{t.verdictLabel}</div>
          <div style={{fontSize:26,fontWeight:900,color:style.color}}>{style.badge}</div>
          {showScamType && r.scamType && <div style={{fontSize:13,color:"#f97316",marginTop:4,fontWeight:600}}>Scam Type: {r.scamType}</div>}
        </div>
        <ScoreRing score={r.riskScore||0} label={t.riskScore}/>
      </div>
      {r.summary && <div style={{fontSize:16,color:"#e2e8f0",marginBottom:14,lineHeight:1.7,fontWeight:600,fontFamily:font}}>{r.summary}</div>}
      {r.reasoning && (
        <div style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"14px 16px",fontSize:14,color:"#94a3b8",lineHeight:1.9,marginBottom:14,fontFamily:font}}>
          <span style={{fontWeight:700,color:"#38bdf8",fontSize:13,letterSpacing:1}}>{t.reasoning}: </span>{r.reasoning}
        </div>
      )}
      {r.redFlags?.length>0 && <FlagList label={t.redFlags} items={r.redFlags} color="#f87171"/>}
      {r.psychologicalTactics?.length>0 && <FlagList label={t.manipulation} items={r.psychologicalTactics} color="#fb923c"/>}
      {r.safeIndicators?.length>0 && <FlagList label={t.safeIndicators} items={r.safeIndicators} color="#4ade80"/>}
      {r.recommendation && (
        <div style={{background:"rgba(56,189,248,0.08)",border:"1px solid rgba(56,189,248,0.3)",borderRadius:8,padding:"14px 16px",fontSize:15,color:"#38bdf8",fontWeight:700,lineHeight:1.7,fontFamily:font}}>
          {t.recommendation}: {r.recommendation}
        </div>
      )}
    </div>
  );
}

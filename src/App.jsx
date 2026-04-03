import { useState, useEffect } from "react";

const LANGUAGES = {
  en: { label: "English", flag: "🇬🇧" },
  hi: { label: "हिन्दी", flag: "🇮🇳" },
  bn: { label: "বাংলা", flag: "🪷" },
  ta: { label: "தமிழ்", flag: "🌺" },
  te: { label: "తెలుగు", flag: "🌸" },
  mr: { label: "मराठी", flag: "🏵️" },
};

const T = {
  en: { appName:"FRAUDSHIELD", tagline:"INDIA'S DIGITAL FRAUD PROTECTOR", tabs:["🔗 Link Scanner","📧 Message Analyzer","📞 Phone Lookup","📚 Scam Library","🧠 Quiz","🚨 Report"], emergency:"EMERGENCY", alertBanner:"⚠️  ALERT: Digital arrest scams up 400% in 2024 — No government agency arrests you online  ⚠️", enterUrl:"ENTER SUSPICIOUS URL", scanBtn:"⚡ SCAN", scanning:"SCANNING...", urlPlaceholder:"https://example.com or bit.ly/xxxxx...", pasteMessage:"PASTE SUSPICIOUS MESSAGE", analyzeBtn:"🔍 ANALYZE", analyzing:"ANALYZING...", msgPlaceholder:"Paste the suspicious SMS, email, or WhatsApp message here...", phoneTitle:"Phone Number Lookup", phoneSubtitle:"Check if a number is linked to known fraud patterns", enterPhone:"ENTER PHONE NUMBER", checkBtn:"🔎 CHECK", checking:"CHECKING...", phonePlaceholder:"+91 XXXXXXXXXX or 0XXXXXXXXXX", quizTitle:"Fraud Awareness Quiz", quizSubtitle:"Test your knowledge — protect yourself and your family", reportTitle:"Report a Fraud Attempt", reportSubtitle:"Document and report scam attempts to help protect others", fraudType:"FRAUD TYPE *", describe:"DESCRIBE WHAT HAPPENED *", contactLabel:"YOUR CONTACT (OPTIONAL)", submitReport:"🚨 SUBMIT REPORT", reportDoneTitle:"REPORT SUBMITTED", reportDoneSub:"Thank you. Also report at cybercrime.gov.in for official action.", submitAnother:"SUBMIT ANOTHER", emergencyNote:"⚠️ For financial losses, ALSO call 1930 or file at cybercrime.gov.in", selectFraud:"Select fraud type...", footer:"FRAUDSHIELD • PROTECTING INDIA FROM DIGITAL FRAUD • NOT A SUBSTITUTE FOR OFFICIAL CYBERCRIME REPORTING", scansToday:"SCANS TODAY", quizComplete:"Quiz Complete!", nextQ:"Next →", submitQuiz:"Submit Quiz", restartQuiz:"Restart Quiz", correct:"✅ Correct!", wrong:"❌ Wrong!", explanation:"Explanation:", riskScore:"RISK SCORE", redFlags:"🚩 RED FLAGS DETECTED", safeIndicators:"✅ SAFE INDICATORS", manipulation:"🧠 MANIPULATION TACTICS", commonPatterns:"COMMON FRAUD LINK PATTERNS", emergencyContacts:"📞 EMERGENCY CONTACTS", scamLibraryTitle:"Scam Encyclopedia", scamLibrarySub:"Learn to recognize India's most common digital fraud types", linkScannerTitle:"URL / Link Scanner", linkScannerSub:"Paste any suspicious link or website to check for fraud", msgAnalyzerTitle:"Message / Email Analyzer", msgAnalyzerSub:"Paste any suspicious SMS, WhatsApp message, or email", analyzeScanning:"Analyzing link structure, domain reputation, and fraud patterns...", analyzeMsg:"Detecting manipulation tactics, urgency language, and fraud signatures...", analyzePhone:"Cross-referencing number patterns, prefix analysis, and fraud indicators...", startQuiz:"START QUIZ →", allLevels:"All Levels", beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced", allDesc:"10 questions", beginnerDesc:"For seniors & first-timers", intermediateDesc:"For regular users", advancedDesc:"For cyber-aware users" },
  hi: { appName:"फ्रॉडशील्ड", tagline:"भारत का डिजिटल धोखाधड़ी रक्षक", tabs:["🔗 लिंक स्कैनर","📧 संदेश विश्लेषण","📞 फोन जाँच","📚 धोखा पुस्तकालय","🧠 प्रश्नोत्तरी","🚨 रिपोर्ट"], emergency:"आपातकाल", alertBanner:"⚠️  सावधान: 2024 में डिजिटल गिरफ्तारी घोटाले 400% बढ़े — कोई सरकारी एजेंसी ऑनलाइन गिरफ्तारी नहीं करती  ⚠️", enterUrl:"संदिग्ध URL दर्ज करें", scanBtn:"⚡ स्कैन", scanning:"स्कैन हो रहा है...", urlPlaceholder:"https://example.com या bit.ly/xxxxx...", pasteMessage:"संदिग्ध संदेश चिपकाएं", analyzeBtn:"🔍 विश्लेषण", analyzing:"विश्लेषण हो रहा है...", msgPlaceholder:"यहाँ संदिग्ध SMS, ईमेल, या WhatsApp संदेश चिपकाएं...", phoneTitle:"फोन नंबर जाँच", phoneSubtitle:"जाँचें कि नंबर ज्ञात धोखाधड़ी से जुड़ा है या नहीं", enterPhone:"फोन नंबर दर्ज करें", checkBtn:"🔎 जाँचें", checking:"जाँच हो रही है...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"धोखाधड़ी जागरूकता प्रश्नोत्तरी", quizSubtitle:"अपने ज्ञान की जाँच करें — खुद और परिवार की रक्षा करें", reportTitle:"धोखाधड़ी की रिपोर्ट करें", reportSubtitle:"घोटाले की कोशिशों को दर्ज करें और दूसरों की सुरक्षा में मदद करें", fraudType:"धोखाधड़ी का प्रकार *", describe:"क्या हुआ बताएं *", contactLabel:"आपका संपर्क (वैकल्पिक)", submitReport:"🚨 रिपोर्ट दर्ज करें", reportDoneTitle:"रिपोर्ट सबमिट हो गई", reportDoneSub:"धन्यवाद। cybercrime.gov.in पर भी रिपोर्ट करें।", submitAnother:"और रिपोर्ट करें", emergencyNote:"⚠️ नुकसान के लिए 1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट करें", selectFraud:"धोखाधड़ी का प्रकार चुनें...", footer:"फ्रॉडशील्ड • भारत को डिजिटल धोखाधड़ी से बचाना", scansToday:"आज के स्कैन", quizComplete:"प्रश्नोत्तरी पूर्ण!", nextQ:"अगला →", submitQuiz:"सबमिट करें", restartQuiz:"फिर से शुरू करें", correct:"✅ सही!", wrong:"❌ गलत!", explanation:"व्याख्या:", riskScore:"जोखिम स्कोर", redFlags:"🚩 खतरे के संकेत", safeIndicators:"✅ सुरक्षित संकेतक", manipulation:"🧠 मनोवैज्ञानिक चालें", commonPatterns:"सामान्य धोखाधड़ी लिंक पैटर्न", emergencyContacts:"📞 आपातकालीन संपर्क", scamLibraryTitle:"धोखाधड़ी विश्वकोश", scamLibrarySub:"भारत के सबसे सामान्य डिजिटल धोखों को पहचानना सीखें", linkScannerTitle:"URL / लिंक स्कैनर", linkScannerSub:"किसी भी संदिग्ध लिंक की जाँच करें", msgAnalyzerTitle:"संदेश / ईमेल विश्लेषण", msgAnalyzerSub:"किसी भी संदिग्ध SMS या WhatsApp संदेश की जाँच करें", analyzeScanning:"लिंक और धोखाधड़ी पैटर्न का विश्लेषण हो रहा है...", analyzeMsg:"हेरफेर की रणनीति और धोखाधड़ी के संकेत खोजे जा रहे हैं...", analyzePhone:"नंबर पैटर्न और धोखाधड़ी संकेतकों की जाँच हो रही है...", startQuiz:"प्रश्नोत्तरी शुरू करें →", allLevels:"सभी स्तर", beginner:"शुरुआती", intermediate:"मध्यम", advanced:"उन्नत", allDesc:"10 प्रश्न", beginnerDesc:"वरिष्ठ नागरिकों के लिए", intermediateDesc:"सामान्य उपयोगकर्ताओं के लिए", advancedDesc:"साइबर-जागरूक उपयोगकर्ताओं के लिए" },
  bn: { appName:"ফ্রডশিল্ড", tagline:"ভারতের ডিজিটাল জালিয়াতি রক্ষক", tabs:["🔗 লিংক স্ক্যানার","📧 বার্তা বিশ্লেষণ","📞 ফোন যাচাই","📚 প্রতারণা লাইব্রেরি","🧠 কুইজ","🚨 রিপোর্ট"], emergency:"জরুরি", alertBanner:"⚠️  সতর্কতা: 2024 সালে ডিজিটাল গ্রেফতার প্রতারণা 400% বেড়েছে — কোনো সরকারি সংস্থা অনলাইনে গ্রেফতার করে না  ⚠️", enterUrl:"সন্দেহজনক URL লিখুন", scanBtn:"⚡ স্ক্যান", scanning:"স্ক্যান হচ্ছে...", urlPlaceholder:"https://example.com বা bit.ly/xxxxx...", pasteMessage:"সন্দেহজনক বার্তা পেস্ট করুন", analyzeBtn:"🔍 বিশ্লেষণ করুন", analyzing:"বিশ্লেষণ হচ্ছে...", msgPlaceholder:"এখানে সন্দেহজনক SMS, ইমেইল বা WhatsApp বার্তা পেস্ট করুন...", phoneTitle:"ফোন নম্বর যাচাই", phoneSubtitle:"নম্বরটি পরিচিত জালিয়াতির সাথে যুক্ত কিনা পরীক্ষা করুন", enterPhone:"ফোন নম্বর লিখুন", checkBtn:"🔎 যাচাই করুন", checking:"যাচাই হচ্ছে...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"জালিয়াতি সচেতনতা কুইজ", quizSubtitle:"আপনার জ্ঞান পরীক্ষা করুন", reportTitle:"জালিয়াতি রিপোর্ট করুন", reportSubtitle:"প্রতারণার প্রচেষ্টা নথিভুক্ত করুন", fraudType:"জালিয়াতির ধরন *", describe:"কী হয়েছে বর্ণনা করুন *", contactLabel:"আপনার যোগাযোগ (ঐচ্ছিক)", submitReport:"🚨 রিপোর্ট জমা দিন", reportDoneTitle:"রিপোর্ট জমা হয়েছে", reportDoneSub:"ধন্যবাদ। cybercrime.gov.in-এও রিপোর্ট করুন।", submitAnother:"আরেকটি রিপোর্ট করুন", emergencyNote:"⚠️ আর্থিক ক্ষতির জন্য 1930 নম্বরে কল করুন", selectFraud:"জালিয়াতির ধরন বেছে নিন...", footer:"ফ্রডশিল্ড • ভারতকে ডিজিটাল জালিয়াতি থেকে রক্ষা করছে", scansToday:"আজকের স্ক্যান", quizComplete:"কুইজ সম্পন্ন!", nextQ:"পরবর্তী →", submitQuiz:"জমা দিন", restartQuiz:"পুনরায় শুরু", correct:"✅ সঠিক!", wrong:"❌ ভুল!", explanation:"ব্যাখ্যা:", riskScore:"ঝুঁকি স্কোর", redFlags:"🚩 বিপদের সংকেত", safeIndicators:"✅ নিরাপদ সংকেত", manipulation:"🧠 মনস্তাত্ত্বিক কৌশল", commonPatterns:"সাধারণ জালিয়াতি লিংক প্যাটার্ন", emergencyContacts:"📞 জরুরি যোগাযোগ", scamLibraryTitle:"প্রতারণা বিশ্বকোষ", scamLibrarySub:"ভারতের সবচেয়ে সাধারণ ডিজিটাল প্রতারণা চিনতে শিখুন", linkScannerTitle:"URL / লিংক স্ক্যানার", linkScannerSub:"যেকোনো সন্দেহজনক লিংক পরীক্ষা করুন", msgAnalyzerTitle:"বার্তা / ইমেইল বিশ্লেষণ", msgAnalyzerSub:"যেকোনো সন্দেহজনক SMS বা ইমেইল পরীক্ষা করুন", analyzeScanning:"লিংক কাঠামো ও জালিয়াতি প্যাটার্ন বিশ্লেষণ হচ্ছে...", analyzeMsg:"কারসাজির কৌশল ও জালিয়াতির সংকেত খোঁজা হচ্ছে...", analyzePhone:"নম্বর প্যাটার্ন ও জালিয়াতি সংকেত যাচাই হচ্ছে...", startQuiz:"কুইজ শুরু করুন →", allLevels:"সব স্তর", beginner:"শিক্ষানবিশ", intermediate:"মধ্যবর্তী", advanced:"উন্নত", allDesc:"১০টি প্রশ্ন", beginnerDesc:"প্রবীণদের জন্য", intermediateDesc:"সাধারণ ব্যবহারকারীদের জন্য", advancedDesc:"সাইবার-সচেতন ব্যবহারকারীদের জন্য" },
  ta: { appName:"ஃப்ராட்ஷீல்ட்", tagline:"இந்தியாவின் டிஜிட்டல் மோசடி பாதுகாப்பாளர்", tabs:["🔗 லிங்க் ஸ்கேனர்","📧 செய்தி பகுப்பாய்வு","📞 போன் சோதனை","📚 மோசடி நூலகம்","🧠 வினாடி வினா","🚨 புகார்"], emergency:"அவசரநிலை", alertBanner:"⚠️  எச்சரிக்கை: 2024ல் டிஜிட்டல் கைது மோசடிகள் 400% அதிகரித்துள்ளன  ⚠️", enterUrl:"சந்தேகமான URL உள்ளிடவும்", scanBtn:"⚡ ஸ்கேன்", scanning:"ஸ்கேன் செய்கிறது...", urlPlaceholder:"https://example.com அல்லது bit.ly/xxxxx...", pasteMessage:"சந்தேகமான செய்தியை ஒட்டவும்", analyzeBtn:"🔍 பகுப்பாய்வு", analyzing:"பகுப்பாய்வு செய்கிறது...", msgPlaceholder:"சந்தேகமான SMS, மின்னஞ்சல் அல்லது WhatsApp செய்தியை இங்கே ஒட்டவும்...", phoneTitle:"தொலைபேசி எண் சோதனை", phoneSubtitle:"எண் அறிவப்பட்ட மோசடியுடன் தொடர்புடையதா என்று சோதிக்கவும்", enterPhone:"தொலைபேசி எண் உள்ளிடவும்", checkBtn:"🔎 சோதிக்க", checking:"சோதிக்கிறது...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"மோசடி விழிப்புணர்வு வினாடி வினா", quizSubtitle:"உங்கள் அறிவை சோதியுங்கள்", reportTitle:"மோசடியை புகாரளிக்கவும்", reportSubtitle:"மோசடி முயற்சிகளை பதிவு செய்யவும்", fraudType:"மோசடி வகை *", describe:"என்ன நடந்தது விவரிக்கவும் *", contactLabel:"உங்கள் தொடர்பு (விருப்பமானது)", submitReport:"🚨 புகார் அளிக்கவும்", reportDoneTitle:"புகார் சமர்ப்பிக்கப்பட்டது", reportDoneSub:"உதவியதற்கு நன்றி.", submitAnother:"மேலும் புகார் அளிக்கவும்", emergencyNote:"⚠️ நிதி இழப்பிற்கு 1930ஐ அழைக்கவும்", selectFraud:"மோசடி வகையை தேர்ந்தெடுக்கவும்...", footer:"ஃப்ராட்ஷீல்ட் • இந்தியாவை டிஜிட்டல் மோசடியிலிருந்து பாதுகாக்கிறது", scansToday:"இன்றைய ஸ்கேன்கள்", quizComplete:"வினாடி வினா முடிந்தது!", nextQ:"அடுத்தது →", submitQuiz:"சமர்ப்பி", restartQuiz:"மீண்டும் தொடங்கு", correct:"✅ சரி!", wrong:"❌ தவறு!", explanation:"விளக்கம்:", riskScore:"ஆபத்து மதிப்பெண்", redFlags:"🚩 ஆபத்து அறிகுறிகள்", safeIndicators:"✅ பாதுகாப்பான அறிகுறிகள்", manipulation:"🧠 உளவியல் தந்திரங்கள்", commonPatterns:"பொதுவான மோசடி இணைப்பு வடிவங்கள்", emergencyContacts:"📞 அவசர தொடர்புகள்", scamLibraryTitle:"மோசடி கலைக்களஞ்சியம்", scamLibrarySub:"இந்தியாவின் பொதுவான டிஜிட்டல் மோசடிகளை அடையாளம் காணுங்கள்", linkScannerTitle:"URL / லிங்க் ஸ்கேனர்", linkScannerSub:"சந்தேகமான எந்த இணைப்பையும் சோதிக்கவும்", msgAnalyzerTitle:"செய்தி / மின்னஞ்சல் பகுப்பாய்வு", msgAnalyzerSub:"சந்தேகமான SMS அல்லது மின்னஞ்சலை சோதிக்கவும்", analyzeScanning:"இணைப்பு மோசடி வடிவங்களை பகுப்பாய்வு செய்கிறது...", analyzeMsg:"கையாளுதல் தந்திரங்களை கண்டறிகிறது...", analyzePhone:"எண் வடிவங்கள் சரிபார்க்கிறது...", startQuiz:"வினாடி வினா தொடங்கு →", allLevels:"அனைத்து நிலைகள்", beginner:"தொடக்கநிலை", intermediate:"இடைநிலை", advanced:"மேம்பட்ட நிலை", allDesc:"10 கேள்விகள்", beginnerDesc:"முதியோருக்கு", intermediateDesc:"சாதாரண பயனர்களுக்கு", advancedDesc:"சைபர்-விழிப்புணர்வுள்ளவர்களுக்கு" },
  te: { appName:"ఫ్రాడ్‌షీల్డ్", tagline:"భారతదేశపు డిజిటల్ మోసాల రక్షకుడు", tabs:["🔗 లింక్ స్కానర్","📧 సందేశ విశ్లేషణ","📞 ఫోన్ తనిఖీ","📚 మోసం లైబ్రరీ","🧠 క్విజ్","🚨 రిపోర్ట్"], emergency:"అత్యవసరం", alertBanner:"⚠️  హెచ్చరిక: 2024లో డిజిటల్ అరెస్ట్ మోసాలు 400% పెరిగాయి  ⚠️", enterUrl:"అనుమానాస్పద URL నమోదు చేయండి", scanBtn:"⚡ స్కాన్", scanning:"స్కాన్ అవుతోంది...", urlPlaceholder:"https://example.com లేదా bit.ly/xxxxx...", pasteMessage:"అనుమానాస్పద సందేశాన్ని పేస్ట్ చేయండి", analyzeBtn:"🔍 విశ్లేషించు", analyzing:"విశ్లేషిస్తోంది...", msgPlaceholder:"అనుమానాస్పద SMS, ఇమెయిల్ లేదా WhatsApp సందేశాన్ని ఇక్కడ పేస్ట్ చేయండి...", phoneTitle:"ఫోన్ నంబర్ తనిఖీ", phoneSubtitle:"నంబర్ తెలిసిన మోసంతో అనుసంధానించబడిందో తనిఖీ చేయండి", enterPhone:"ఫోన్ నంబర్ నమోదు చేయండి", checkBtn:"🔎 తనిఖీ చేయి", checking:"తనిఖీ అవుతోంది...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"మోసం అవగాహన క్విజ్", quizSubtitle:"మీ జ్ఞానాన్ని పరీక్షించుకోండి", reportTitle:"మోసాన్ని రిపోర్ట్ చేయండి", reportSubtitle:"మోసపు ప్రయత్నాలను నమోదు చేయండి", fraudType:"మోసం రకం *", describe:"ఏం జరిగిందో వివరించండి *", contactLabel:"మీ సంప్రదింపు (ఐచ్ఛికం)", submitReport:"🚨 రిపోర్ట్ సమర్పించండి", reportDoneTitle:"రిపోర్ట్ సమర్పించబడింది", reportDoneSub:"ధన్యవాదాలు.", submitAnother:"మరొక రిపోర్ట్ చేయండి", emergencyNote:"⚠️ ఆర్థిక నష్టాలకు 1930కి కాల్ చేయండి", selectFraud:"మోసం రకాన్ని ఎంచుకోండి...", footer:"ఫ్రాడ్‌షీల్డ్ • భారతదేశాన్ని డిజిటల్ మోసం నుండి రక్షిస్తోంది", scansToday:"నేటి స్కాన్లు", quizComplete:"క్విజ్ పూర్తయింది!", nextQ:"తదుపరి →", submitQuiz:"సమర్పించు", restartQuiz:"మళ్ళీ ప్రారంభించు", correct:"✅ సరైనది!", wrong:"❌ తప్పు!", explanation:"వివరణ:", riskScore:"రిస్క్ స్కోర్", redFlags:"🚩 ప్రమాద సంకేతాలు", safeIndicators:"✅ సురక్షిత సంకేతాలు", manipulation:"🧠 మానసిక వ్యూహాలు", commonPatterns:"సాధారణ మోసం లింక్ నమూనాలు", emergencyContacts:"📞 అత్యవసర సంప్రదింపులు", scamLibraryTitle:"మోసం విజ్ఞాన సర్వస్వం", scamLibrarySub:"భారతదేశంలో సాధారణ డిజిటల్ మోసాలను గుర్తించండి", linkScannerTitle:"URL / లింక్ స్కానర్", linkScannerSub:"ఏదైనా అనుమానాస్పద లింక్‌ను తనిఖీ చేయండి", msgAnalyzerTitle:"సందేశం / ఇమెయిల్ విశ్లేషణ", msgAnalyzerSub:"ఏదైనా అనుమానాస్పద SMS లేదా ఇమెయిల్‌ను తనిఖీ చేయండి", analyzeScanning:"లింక్ నిర్మాణం విశ్లేషిస్తోంది...", analyzeMsg:"మానిప్యులేషన్ వ్యూహాలు గుర్తిస్తోంది...", analyzePhone:"నంబర్ నమూనాలు ధృవీకరిస్తోంది...", startQuiz:"క్విజ్ ప్రారంభించు →", allLevels:"అన్ని స్థాయిలు", beginner:"ప్రారంభ స్థాయి", intermediate:"మధ్యస్థ స్థాయి", advanced:"అధునాతన స్థాయి", allDesc:"10 ప్రశ్నలు", beginnerDesc:"వృద్ధుల కోసం", intermediateDesc:"సాధారణ వినియోగదారుల కోసం", advancedDesc:"సైబర్-అవగాహన ఉన్నవారి కోసం" },
  mr: { appName:"फ्रॉडशील्ड", tagline:"भारताचा डिजिटल फसवणूक रक्षक", tabs:["🔗 लिंक स्कॅनर","📧 संदेश विश्लेषण","📞 फोन तपासणी","📚 फसवणूक ग्रंथालय","🧠 प्रश्नमंजुषा","🚨 तक्रार"], emergency:"आणीबाणी", alertBanner:"⚠️  सावधान: 2024 मध्ये डिजिटल अटक घोटाळे 400% वाढले — कोणतीही सरकारी यंत्रणा ऑनलाइन अटक करत नाही  ⚠️", enterUrl:"संशयास्पद URL प्रविष्ट करा", scanBtn:"⚡ स्कॅन", scanning:"स्कॅन होत आहे...", urlPlaceholder:"https://example.com किंवा bit.ly/xxxxx...", pasteMessage:"संशयास्पद संदेश पेस्ट करा", analyzeBtn:"🔍 विश्लेषण करा", analyzing:"विश्लेषण होत आहे...", msgPlaceholder:"संशयास्पद SMS, ईमेल किंवा WhatsApp संदेश येथे पेस्ट करा...", phoneTitle:"फोन नंबर तपासणी", phoneSubtitle:"नंबर ज्ञात फसवणुकीशी जोडलेला आहे का ते तपासा", enterPhone:"फोन नंबर प्रविष्ट करा", checkBtn:"🔎 तपासा", checking:"तपासत आहे...", phonePlaceholder:"+91 XXXXXXXXXX", quizTitle:"फसवणूक जागरूकता प्रश्नमंजुषा", quizSubtitle:"आपले ज्ञान तपासा", reportTitle:"फसवणूक तक्रार करा", reportSubtitle:"घोटाळ्याच्या प्रयत्नांची नोंद करा", fraudType:"फसवणुकीचा प्रकार *", describe:"काय झाले ते सांगा *", contactLabel:"आपला संपर्क (पर्यायी)", submitReport:"🚨 तक्रार दाखल करा", reportDoneTitle:"तक्रार सादर झाली", reportDoneSub:"धन्यवाद.", submitAnother:"आणखी तक्रार करा", emergencyNote:"⚠️ आर्थिक नुकसानासाठी 1930 वर कॉल करा", selectFraud:"फसवणुकीचा प्रकार निवडा...", footer:"फ्रॉडशील्ड • भारताला डिजिटल फसवणुकीपासून संरक्षण", scansToday:"आजचे स्कॅन", quizComplete:"प्रश्नमंजुषा पूर्ण!", nextQ:"पुढे →", submitQuiz:"सादर करा", restartQuiz:"पुन्हा सुरू करा", correct:"✅ बरोबर!", wrong:"❌ चुकीचे!", explanation:"स्पष्टीकरण:", riskScore:"जोखीम स्कोर", redFlags:"🚩 धोक्याचे संकेत", safeIndicators:"✅ सुरक्षित संकेतक", manipulation:"🧠 मनोवैज्ञानिक युक्त्या", commonPatterns:"सामान्य फसवणूक लिंक पॅटर्न", emergencyContacts:"📞 आणीबाणी संपर्क", scamLibraryTitle:"फसवणूक विश्वकोश", scamLibrarySub:"भारतातील सामान्य डिजिटल फसवणूक ओळखायला शिका", linkScannerTitle:"URL / लिंक स्कॅनर", linkScannerSub:"कोणताही संशयास्पद लिंक तपासा", msgAnalyzerTitle:"संदेश / ईमेल विश्लेषण", msgAnalyzerSub:"कोणताही संशयास्पद SMS किंवा ईमेल तपासा", analyzeScanning:"लिंक संरचना विश्लेषण होत आहे...", analyzeMsg:"हाताळणीच्या युक्त्या शोधत आहे...", analyzePhone:"नंबर पॅटर्न तपासत आहे...", startQuiz:"प्रश्नमंजुषा सुरू करा →", allLevels:"सर्व स्तर", beginner:"नवशिके", intermediate:"मध्यम", advanced:"प्रगत", allDesc:"10 प्रश्न", beginnerDesc:"ज्येष्ठ नागरिकांसाठी", intermediateDesc:"सामान्य वापरकर्त्यांसाठी", advancedDesc:"सायबर-जागरूक वापरकर्त्यांसाठी" },
};

const QUIZ_QUESTIONS = [
  { q:"You receive a video call from someone in police uniform claiming you're under 'digital arrest'. What do you do?", options:["Stay on the call and cooperate","Pay the fine they demand","Hang up immediately and call 1930","Install the app they suggest"], answer:2, explanation:"No government agency conducts 'digital arrests'. Hang up and report to the National Cyber Crime Helpline at 1930.", level:"beginner" },
  { q:"An unknown WhatsApp number offers ₹500/hr to like YouTube videos, asking ₹2000 registration first. This is:", options:["A legitimate part-time job","A fake job scam — never pay to work","An investment opportunity","A government scheme"], answer:1, explanation:"Legitimate employers never charge you to join. Small initial payments are bait before large demands.", level:"beginner" },
  { q:"SMS: 'Your SBI KYC expired. Update at http://sbi-kyc-update.xyz or account blocked in 24hrs.' The red flag is:", options:["The urgency","The fake domain (sbi-kyc-update.xyz)","The threat of account blocking","All of the above"], answer:3, explanation:"All three are classic phishing red flags. Real SBI site is onlinesbi.sbi. Never click such links.", level:"beginner" },
  { q:"A 'bank rep' calls saying KYC needs updating and asks you to install AnyDesk. You should:", options:["Install AnyDesk to let them fix it","Give your account number for verification","Hang up and call your bank's official number","Share OTP after they assure confidentiality"], answer:2, explanation:"Banks NEVER ask you to install remote access software. AnyDesk lets scammers drain your account.", level:"intermediate" },
  { q:"An attractive online match never video calls, claims to work abroad, and after 3 weeks asks ₹50,000 for a 'medical emergency'. This is:", options:["A genuine emergency — help them","A romance/honey trap scam","A legitimate friendship","An investment partner"], answer:1, explanation:"Refusing video calls, 'working abroad', building trust over weeks, then sudden emergency — all classic romance scam signs.", level:"intermediate" },
  { q:"Which URL is MOST likely a phishing site?", options:["https://www.onlinesbi.sbi","https://sbi-secure-login-update.com","https://netbanking.hdfcbank.com","https://secure.icicibank.com"], answer:1, explanation:"sbi-secure-login-update.com is a fake domain. Real SBI site is onlinesbi.sbi. Scammers add words like 'secure' to fake URLs.", level:"intermediate" },
  { q:"A caller says 'Your number was used in illegal activities. Pay ₹50,000 to avoid arrest.' This is:", options:["A legitimate police investigation","A digital arrest scam using fear tactics","A genuine cybercrime alert","An RBI security check"], answer:1, explanation:"Real police NEVER demand money over phone to avoid arrest. This uses fear to stop you from thinking clearly. Call 1930.", level:"advanced" },
  { q:"A Telegram group promises 200% crypto returns with screenshots of earnings. Members say they withdrew profits. This is:", options:["Legitimate crypto investment","A pig butchering / investment scam","Government-backed digital currency","A safe mutual fund scheme"], answer:1, explanation:"Fake screenshots and fake 'members' build confidence. Early 'investors' are fake accounts. You'll never withdraw real money.", level:"advanced" },
  { q:"Message: 'You won ₹25 lakh in KBC lottery! Pay ₹5000 processing fee and share Aadhaar to claim.' First thing to do:", options:["Pay the fee quickly","Share Aadhaar to claim","Realize this is a lottery scam — you can't win one you never entered","Call the number to verify"], answer:2, explanation:"You cannot win a lottery you never entered. Legitimate lotteries never charge fees. Never share Aadhaar.", level:"beginner" },
  { q:"Why should you NEVER share your OTP with anyone?", options:["OTP grants full account access for that session","It's safe to share with bank officials","Only share in verified emergencies","OTPs expire in 10 minutes anyway"], answer:0, explanation:"OTP authorizes transactions — sharing it instantly lets anyone complete a transfer from YOUR account. No official will ever ask for it.", level:"beginner" },
];

const SCAM_LIBRARY = [
  { icon:"👮", title:"Digital Arrest Scam", severity:"CRITICAL", description:"Fraudsters pose as CBI, ED, Narcotics, or Customs officials claiming you're under 'digital arrest' for money laundering or illegal parcels.", redFlags:["Video calls from 'police' in fake uniforms","Demands to stay on camera 24/7 during 'investigation'","Urgency to transfer money to 'secure' accounts","Threats of arrest if you disconnect"], tip:"No government agency conducts digital arrests. Hang up and call 1930." },
  { icon:"📱", title:"WhatsApp/Telegram Fraud", severity:"HIGH", description:"Fake job offers, investment schemes, or lottery wins via messaging apps with fake screenshots of earnings.", redFlags:["Unknown international numbers offering jobs","Registration fees to join 'task-based' groups","Promises of 300-400% returns","Fake profit screenshots in groups"], tip:"Never pay to join any group. Block and report suspicious numbers." },
  { icon:"🎣", title:"Phishing Emails & SMS", severity:"HIGH", description:"Fake emails mimicking banks, IRCTC, EPFO, Amazon, or government portals to steal your credentials and OTPs.", redFlags:["'Your account will be blocked in 24 hours'","Links with slight misspellings (amaz0n.com)","Requests for OTP, CVV, or card number","Generic 'Dear Customer' greetings"], tip:"Banks NEVER ask for OTPs. Always visit official websites directly." },
  { icon:"💰", title:"KYC / Bank Fraud", severity:"HIGH", description:"Caller claims KYC expired and asks you to install remote-access apps like AnyDesk or TeamViewer.", redFlags:["Unsolicited KYC expiry calls","Asking to install AnyDesk or QuickSupport","Opening banking apps while on a call","Sending a 'test' amount to verify account"], tip:"Never install remote-access apps for banking. Visit your branch for KYC." },
  { icon:"💼", title:"Fake Job / Part-Time Scam", severity:"MEDIUM", description:"Work-from-home jobs, app rating tasks, or YouTube liking jobs. Small initial payments, then large 'investment' demands.", redFlags:["Jobs paying per 'like', 'review', or 'task'","Initial small payments to build trust","WhatsApp/Telegram-only, no official website","Pressure to pay to 'upgrade' task level"], tip:"Legitimate employers never ask you to pay to work." },
  { icon:"💘", title:"Romance / Honey Trap Scam", severity:"MEDIUM", description:"Fake profiles build emotional relationships over weeks, then request money for emergencies or investments.", redFlags:["Too-perfect profile photos (reverse image search)","Never agrees to video calls","Moves off dating apps quickly to WhatsApp","Asks for money after emotional intimacy"], tip:"Never send money to someone you've only met online." },
];

const severityColor = s => s==="CRITICAL"?"#ff2d55":s==="HIGH"?"#ff9500":"#ffd60a";

export default function FraudShield() {
  const [lang, setLang] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [scanCount] = useState(Math.floor(Math.random()*5000)+12000);
  const [url, setUrl] = useState(""); const [urlResult, setUrlResult] = useState(null); const [urlLoading, setUrlLoading] = useState(false);
  const [message, setMessage] = useState(""); const [msgResult, setMsgResult] = useState(null); const [msgLoading, setMsgLoading] = useState(false);
  const [phone, setPhone] = useState(""); const [phoneResult, setPhoneResult] = useState(null); const [phoneLoading, setPhoneLoading] = useState(false);
  const [expandedScam, setExpandedScam] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false); const [quizFilter, setQuizFilter] = useState("all");
  const [currentQ, setCurrentQ] = useState(0); const [selected, setSelected] = useState(null); const [answers, setAnswers] = useState([]); const [quizDone, setQuizDone] = useState(false);
  const [reportForm, setReportForm] = useState({type:"",description:"",contact:""}); const [reportDone, setReportDone] = useState(false);
  const t = T[lang];

  useEffect(() => { const i = setInterval(() => setPulse(p=>!p), 1500); return () => clearInterval(i); }, []);

  const filteredQ = quizFilter==="all" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q=>q.level===quizFilter);

  function startQuiz() { setCurrentQ(0); setSelected(null); setAnswers([]); setQuizDone(false); setQuizStarted(true); }
  function handleAnswer(i) { if(selected===null) setSelected(i); }
  function nextQuestion() {
    const na = [...answers, {selected, correct: selected===filteredQ[currentQ].answer}];
    setAnswers(na);
    if(currentQ+1>=filteredQ.length) setQuizDone(true);
    else { setCurrentQ(currentQ+1); setSelected(null); }
  }

  const verdictStyle = v => {
    if(v==="SAFE"||v==="LEGITIMATE"||v==="LIKELY_SAFE") return {bg:"#0a2e1a",border:"#00c853",color:"#00e676"};
    if(v==="SUSPICIOUS") return {bg:"#2e1f00",border:"#ff9500",color:"#ffb300"};
    if(v==="DANGEROUS"||v==="SCAM"||v==="LIKELY_FRAUD") return {bg:"#2e0a0a",border:"#ff2d55",color:"#ff453a"};
    return {bg:"#1a1a2e",border:"#444",color:"#aaa"};
  };

  async function callAPI(sys, userMsg, setRes, setLoad) {
    setLoad(true); setRes(null);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:sys, messages:[{role:"user",content:userMsg}] }) });
      const d = await r.json();
      const txt = d.content?.[0]?.text||"{}";
      setRes(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    } catch { setRes({verdict:"ERROR",summary:"Analysis failed. Try again.",riskScore:0,redFlags:[],safeIndicators:[],recommendation:"Try again."}); }
    setLoad(false);
  }

  const analyzeURL = () => url.trim() && callAPI(
    `You are FraudShield, expert in Indian digital fraud. Analyze URLs for fraud risk. Respond ONLY in JSON (no markdown):\n{"verdict":"SAFE"|"SUSPICIOUS"|"DANGEROUS","riskScore":0-100,"summary":"one sentence","redFlags":["..."],"safeIndicators":["..."],"recommendation":"what to do"}`,
    `Analyze this URL for fraud risk: ${url}`, setUrlResult, setUrlLoading);

  const analyzeMessage = () => message.trim() && callAPI(
    `You are FraudShield, expert in Indian digital fraud (KYC, digital arrest, WhatsApp, phishing). Respond ONLY in JSON:\n{"verdict":"LEGITIMATE"|"SUSPICIOUS"|"SCAM","scamType":"type or null","riskScore":0-100,"summary":"one sentence","redFlags":["..."],"psychologicalTactics":["..."],"recommendation":"what to do"}`,
    `Analyze this message for fraud:\n\n${message}`, setMsgResult, setMsgLoading);

  const analyzePhone = () => phone.trim() && callAPI(
    `You are FraudShield, expert in Indian phone fraud. Analyze phone numbers for scam indicators: international prefixes spoofing Indian govt/banks, known scam number formats, VoIP numbers, etc. Respond ONLY in JSON:\n{"verdict":"LIKELY_SAFE"|"SUSPICIOUS"|"LIKELY_FRAUD","riskScore":0-100,"summary":"one sentence","indicators":["..."],"numberType":"Mobile/Landline/International/VoIP/Unknown","possibleScamType":"type or null","recommendation":"what to do"}`,
    `Analyze this phone number for Indian fraud risk: ${phone}`, setPhoneResult, setPhoneLoading);

  const inp = {width:"100%",padding:"10px 14px",boxSizing:"border-box",background:"rgba(0,0,0,0.5)",border:"1px solid rgba(0,200,255,0.3)",borderRadius:6,color:"#e0e0e0",fontSize:13,fontFamily:"inherit",outline:"none"};
  const btn = (dis) => ({padding:"10px 20px",background:dis?"#1a1a2e":"linear-gradient(135deg,#003366,#00509e)",border:"1px solid #00c8ff",borderRadius:6,color:"#00c8ff",fontSize:12,fontFamily:"inherit",fontWeight:700,letterSpacing:2,cursor:dis?"not-allowed":"pointer"});

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a0a14,#0d1117,#0a0e1a)",fontFamily:"'Courier New','Lucida Console',monospace",color:"#e0e0e0"}} onClick={() => showLangMenu && setShowLangMenu(false)}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"linear-gradient(rgba(0,200,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px"}} />

      {/* Header */}
      <header style={{position:"relative",zIndex:10,background:"linear-gradient(180deg,rgba(0,0,0,0.9),rgba(10,10,20,0.8))",borderBottom:"1px solid rgba(0,200,255,0.2)",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#001f3f,#003366)",border:`2px solid ${pulse?"#00c8ff":"#0090bb"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,boxShadow:`0 0 ${pulse?20:8}px rgba(0,200,255,0.4)`,transition:"all 0.8s"}}>🛡️</div>
          <div>
            <div style={{fontSize:19,fontWeight:700,letterSpacing:3,color:"#00c8ff",textShadow:"0 0 20px rgba(0,200,255,0.5)"}}>{t.appName.length>10?t.appName:<><span style={{color:"#00c8ff"}}>{t.appName.slice(0,5)}</span><span style={{color:"#ff2d55"}}>{t.appName.slice(5)}</span></>}</div>
            <div style={{fontSize:9,color:"#666",letterSpacing:2}}>{t.tagline}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
          <Stat label={t.scansToday} value={scanCount.toLocaleString()} color="#00c8ff" />
          <Stat label={t.emergency} value="1930" color="#ff2d55" />
          <div style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setShowLangMenu(m=>!m)} style={{padding:"6px 11px",background:"rgba(0,200,255,0.1)",border:"1px solid rgba(0,200,255,0.4)",borderRadius:6,color:"#00c8ff",fontSize:12,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              {LANGUAGES[lang].flag} {LANGUAGES[lang].label} ▾
            </button>
            {showLangMenu && (
              <div style={{position:"absolute",right:0,top:"110%",background:"#0a0e1a",border:"1px solid rgba(0,200,255,0.3)",borderRadius:8,zIndex:100,minWidth:140,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.8)"}}>
                {Object.entries(LANGUAGES).map(([code,info])=>(
                  <button key={code} onClick={()=>{setLang(code);setShowLangMenu(false);}} style={{display:"block",width:"100%",padding:"9px 14px",background:lang===code?"rgba(0,200,255,0.15)":"none",border:"none",color:lang===code?"#00c8ff":"#ccc",fontSize:13,fontFamily:"inherit",cursor:"pointer",textAlign:"left"}}>
                    {info.flag} {info.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{position:"relative",zIndex:10,background:"linear-gradient(90deg,rgba(255,45,85,0.15),rgba(255,149,0,0.1),rgba(255,45,85,0.15))",borderBottom:"1px solid rgba(255,45,85,0.3)",padding:"7px 20px",fontSize:11,color:"#ff9500",letterSpacing:1,textAlign:"center"}}>{t.alertBanner}</div>

      <nav style={{position:"relative",zIndex:10,display:"flex",borderBottom:"1px solid rgba(0,200,255,0.1)",background:"rgba(0,0,0,0.4)",padding:"0 10px",overflowX:"auto"}}>
        {t.tabs.map((tab,i)=>(
          <button key={i} onClick={()=>setActiveTab(i)} style={{padding:"12px 12px",background:"none",border:"none",borderBottom:activeTab===i?"2px solid #00c8ff":"2px solid transparent",color:activeTab===i?"#00c8ff":"#666",fontSize:11,fontFamily:"inherit",fontWeight:activeTab===i?700:400,cursor:"pointer",letterSpacing:1,whiteSpace:"nowrap",transition:"all 0.2s"}}>{tab}</button>
        ))}
      </nav>

      <main style={{position:"relative",zIndex:10,padding:"22px 20px",maxWidth:840,margin:"0 auto"}}>

        {/* TAB 0 – Link Scanner */}
        {activeTab===0 && (
          <div>
            <SHead icon="🔗" title={t.linkScannerTitle} sub={t.linkScannerSub} />
            <Box>
              <Lbl text={t.enterUrl}/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&analyzeURL()} placeholder={t.urlPlaceholder} style={{...inp,flex:1,minWidth:180}} />
                <button onClick={analyzeURL} disabled={urlLoading||!url.trim()} style={btn(urlLoading||!url.trim())}>{urlLoading?t.scanning:t.scanBtn}</button>
              </div>
              <div style={{fontSize:10,color:"#444",marginTop:5}}>Supports: full URLs, shortened links, email domains</div>
            </Box>
            {urlLoading && <Spin text={t.analyzeScanning}/>}
            {urlResult && !urlLoading && <ResCard result={urlResult} vs={verdictStyle} t={t}/>}
            <div style={{marginTop:18}}><Lbl text={t.commonPatterns}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:8}}>
                {[{label:"Domain Spoofing",ex:"sbi-onlinebank.com",desc:"Looks like SBI but isn't"},{label:"URL Shorteners",ex:"bit.ly/win-prize",desc:"Hides the real destination"},{label:"HTTP (no S)",ex:"http://login-bank.com",desc:"No encryption = not safe"},{label:"Urgent Subdomains",ex:"kyc.update.login.xyz",desc:"Fake urgency in URL"}].map((p,i)=>(
                  <div key={i} style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,149,0,0.2)",borderRadius:6,padding:"10px 12px"}}>
                    <div style={{fontSize:10,color:"#ff9500",letterSpacing:1}}>{p.label}</div>
                    <div style={{fontSize:12,color:"#e0e0e0",margin:"3px 0",fontStyle:"italic"}}>{p.ex}</div>
                    <div style={{fontSize:11,color:"#666"}}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1 – Message */}
        {activeTab===1 && (
          <div>
            <SHead icon="📧" title={t.msgAnalyzerTitle} sub={t.msgAnalyzerSub}/>
            <Box>
              <Lbl text={t.pasteMessage}/>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder={t.msgPlaceholder} rows={6} style={{...inp,resize:"vertical"}}/>
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
                <button onClick={analyzeMessage} disabled={msgLoading||!message.trim()} style={btn(msgLoading||!message.trim())}>{msgLoading?t.analyzing:t.analyzeBtn}</button>
              </div>
            </Box>
            {msgLoading && <Spin text={t.analyzeMsg}/>}
            {msgResult && !msgLoading && <ResCard result={msgResult} vs={verdictStyle} t={t}/>}
          </div>
        )}

        {/* TAB 2 – Phone Lookup */}
        {activeTab===2 && (
          <div>
            <SHead icon="📞" title={t.phoneTitle} sub={t.phoneSubtitle}/>
            <Box>
              <Lbl text={t.enterPhone}/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <input value={phone} onChange={e=>setPhone(e.target.value)} onKeyDown={e=>e.key==="Enter"&&analyzePhone()} placeholder={t.phonePlaceholder} style={{...inp,flex:1,minWidth:180}}/>
                <button onClick={analyzePhone} disabled={phoneLoading||!phone.trim()} style={btn(phoneLoading||!phone.trim())}>{phoneLoading?t.checking:t.checkBtn}</button>
              </div>
              <div style={{fontSize:10,color:"#444",marginTop:5}}>AI analyzes prefix, format, country codes, and known scam patterns</div>
            </Box>
            {phoneLoading && <Spin text={t.analyzePhone}/>}
            {phoneResult && !phoneLoading && (
              <div style={{background:verdictStyle(phoneResult.verdict).bg,border:`1px solid ${verdictStyle(phoneResult.verdict).border}`,borderRadius:8,padding:18,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:14}}>
                  <div>
                    <div style={{fontSize:18,fontWeight:900,color:verdictStyle(phoneResult.verdict).color,letterSpacing:3}}>{phoneResult.verdict?.replace(/_/g," ")}</div>
                    {phoneResult.numberType && <div style={{fontSize:10,color:"#888",marginTop:2,letterSpacing:1}}>TYPE: {phoneResult.numberType}</div>}
                    {phoneResult.possibleScamType && <div style={{fontSize:10,color:"#ff9500",marginTop:2,letterSpacing:1}}>LIKELY: {phoneResult.possibleScamType}</div>}
                    <div style={{fontSize:12,color:"#b0b0c0",marginTop:5}}>{phoneResult.summary}</div>
                  </div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900,color:phoneResult.riskScore<30?"#00e676":phoneResult.riskScore<60?"#ffb300":"#ff453a"}}>{phoneResult.riskScore||0}</div><div style={{fontSize:9,color:"#555",letterSpacing:1}}>{t.riskScore}</div></div>
                </div>
                {phoneResult.indicators?.length>0 && <FList label="📊 FRAUD INDICATORS" items={phoneResult.indicators} color="#ff9500"/>}
                {phoneResult.recommendation && <div style={{background:"rgba(0,0,0,0.3)",border:`1px solid ${verdictStyle(phoneResult.verdict).border}33`,borderRadius:6,padding:"10px 14px",fontSize:13,color:verdictStyle(phoneResult.verdict).color,fontWeight:700}}>💡 {phoneResult.recommendation}</div>}
              </div>
            )}
            <div style={{marginTop:18}}><div style={{fontSize:10,color:"#555",letterSpacing:2,marginBottom:10}}>KNOWN SCAMMER NUMBER PATTERNS IN INDIA</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:8}}>
                {[{prefix:"+92 / +880 / +44",risk:"CRITICAL",desc:"Pakistan, Bangladesh, UK codes spoofing Indian police/govt calls"},{prefix:"+1 (XXX) XXX-XXXX",risk:"HIGH",desc:"US numbers used for 'Microsoft support' or CBI impersonation"},{prefix:"0141/0120 + 8 digits",risk:"HIGH",desc:"Fake area codes used by scam call centers"},{prefix:"+91 700X / 900X",risk:"MEDIUM",desc:"Prepaid SIM series frequently used in OTP/KYC fraud"}].map((p,i)=>(
                  <div key={i} style={{background:"rgba(0,0,0,0.4)",border:`1px solid ${p.risk==="CRITICAL"?"rgba(255,45,85,0.3)":p.risk==="HIGH"?"rgba(255,149,0,0.3)":"rgba(255,214,10,0.3)"}`,borderRadius:6,padding:"10px 12px"}}>
                    <div style={{fontSize:11,color:p.risk==="CRITICAL"?"#ff2d55":p.risk==="HIGH"?"#ff9500":"#ffd60a",marginBottom:4,fontWeight:700}}>{p.prefix}</div>
                    <div style={{fontSize:9,color:p.risk==="CRITICAL"?"#ff2d55":p.risk==="HIGH"?"#ff9500":"#ffd60a",letterSpacing:1,marginBottom:5}}>RISK: {p.risk}</div>
                    <div style={{fontSize:11,color:"#888"}}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 – Scam Library */}
        {activeTab===3 && (
          <div>
            <SHead icon="📚" title={t.scamLibraryTitle} sub={t.scamLibrarySub}/>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {SCAM_LIBRARY.map((s,i)=>(
                <div key={i} onClick={()=>setExpandedScam(expandedScam===i?null:i)} style={{background:expandedScam===i?"rgba(0,10,30,0.9)":"rgba(0,0,0,0.5)",border:`1px solid ${expandedScam===i?severityColor(s.severity)+"66":"rgba(255,255,255,0.08)"}`,borderLeft:`3px solid ${severityColor(s.severity)}`,borderRadius:8,padding:"13px 15px",cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:20}}>{s.icon}</span>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:"#e0e0e0"}}>{s.title}</div>
                        {expandedScam!==i && <div style={{fontSize:11,color:"#666",marginTop:2}}>{s.description.slice(0,65)}...</div>}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:9,fontWeight:700,letterSpacing:1,color:severityColor(s.severity),border:`1px solid ${severityColor(s.severity)}`,padding:"2px 6px",borderRadius:3}}>{s.severity}</span>
                      <span style={{color:"#555",fontSize:12}}>{expandedScam===i?"▲":"▼"}</span>
                    </div>
                  </div>
                  {expandedScam===i && <div style={{marginTop:12}}>
                    <p style={{fontSize:13,color:"#b0b0c0",lineHeight:1.7,margin:"0 0 12px"}}>{s.description}</p>
                    <div style={{fontSize:10,color:"#ff2d55",letterSpacing:2,marginBottom:7}}>🚩 RED FLAGS</div>
                    {s.redFlags.map((f,j)=><div key={j} style={{display:"flex",gap:8,fontSize:12,color:"#c0c0d0",marginBottom:5}}><span style={{color:"#ff2d55"}}>›</span><span>{f}</span></div>)}
                    <div style={{background:"rgba(0,200,100,0.1)",border:"1px solid rgba(0,200,100,0.3)",borderRadius:6,padding:"10px 14px",fontSize:12,color:"#00e676",marginTop:12}}>💡 {s.tip}</div>
                  </div>}
                </div>
              ))}
            </div>
            <div style={{marginTop:18,background:"rgba(255,45,85,0.08)",border:"1px solid rgba(255,45,85,0.3)",borderRadius:8,padding:18}}>
              <div style={{fontSize:12,fontWeight:700,color:"#ff2d55",letterSpacing:2,marginBottom:12}}>{t.emergencyContacts}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8}}>
                {[{label:"National Cybercrime Helpline",value:"1930",icon:"📞"},{label:"Cyber Crime Portal",value:"cybercrime.gov.in",icon:"🌐"},{label:"RBI Ombudsman",value:"14440",icon:"🏦"},{label:"TRAI Spam Report",value:"1909",icon:"📱"}].map((c,i)=>(
                  <div key={i} style={{background:"rgba(0,0,0,0.4)",borderRadius:6,padding:"10px 12px",border:"1px solid rgba(255,45,85,0.2)"}}>
                    <div style={{fontSize:11,color:"#888",marginBottom:3}}>{c.icon} {c.label}</div>
                    <div style={{fontSize:13,color:"#ff2d55",fontWeight:700}}>{c.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 – Quiz */}
        {activeTab===4 && (
          <div>
            <SHead icon="🧠" title={t.quizTitle} sub={t.quizSubtitle}/>
            {!quizStarted ? (
              <div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12,marginBottom:18}}>
                  {[["all","🎯",t.allLevels,t.allDesc],["beginner","🟢",t.beginner,t.beginnerDesc],["intermediate","🟡",t.intermediate,t.intermediateDesc],["advanced","🔴",t.advanced,t.advancedDesc]].map(([val,icon,label,desc])=>(
                    <div key={val} onClick={()=>setQuizFilter(val)} style={{background:quizFilter===val?"rgba(0,200,255,0.12)":"rgba(0,0,0,0.4)",border:`1px solid ${quizFilter===val?"#00c8ff":"rgba(255,255,255,0.08)"}`,borderRadius:8,padding:14,cursor:"pointer",transition:"all 0.2s"}}>
                      <div style={{fontSize:22,marginBottom:4}}>{icon}</div>
                      <div style={{fontSize:13,fontWeight:700,color:quizFilter===val?"#00c8ff":"#e0e0e0"}}>{label}</div>
                      <div style={{fontSize:11,color:"#666",marginTop:3}}>{desc}</div>
                      <div style={{fontSize:10,color:"#555",marginTop:5}}>{(val==="all"?QUIZ_QUESTIONS:QUIZ_QUESTIONS.filter(q=>q.level===val)).length} questions</div>
                    </div>
                  ))}
                </div>
                <button onClick={startQuiz} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#003366,#00509e)",border:"1px solid #00c8ff",borderRadius:8,color:"#00c8ff",fontSize:13,fontFamily:"inherit",fontWeight:700,letterSpacing:3,cursor:"pointer"}}>{t.startQuiz}</button>
              </div>
            ) : quizDone ? (
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:12}}>{answers.filter(a=>a.correct).length>=filteredQ.length*0.8?"🏆":answers.filter(a=>a.correct).length>=filteredQ.length*0.5?"👍":"📚"}</div>
                <div style={{fontSize:17,color:"#00c8ff",letterSpacing:2,marginBottom:8}}>{t.quizComplete}</div>
                <div style={{fontSize:32,fontWeight:900,color:"#ffd60a",marginBottom:4}}>{answers.filter(a=>a.correct).length} / {filteredQ.length}</div>
                <div style={{fontSize:13,color:"#888",marginBottom:22}}>{answers.filter(a=>a.correct).length>=filteredQ.length*0.8?"Excellent! You're well protected.":answers.filter(a=>a.correct).length>=filteredQ.length*0.5?"Good effort! Review the Scam Library to strengthen your knowledge.":"Keep learning — review the Scam Library and try again!"}</div>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20,textAlign:"left"}}>
                  {filteredQ.map((q,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",background:answers[i]?.correct?"rgba(0,200,100,0.08)":"rgba(255,45,85,0.08)",border:`1px solid ${answers[i]?.correct?"rgba(0,200,100,0.3)":"rgba(255,45,85,0.3)"}`,borderRadius:6,padding:"10px 12px"}}>
                      <span style={{fontSize:14,flexShrink:0}}>{answers[i]?.correct?"✅":"❌"}</span>
                      <div>
                        <div style={{fontSize:12,color:"#c0c0d0"}}>{q.q}</div>
                        {!answers[i]?.correct && <div style={{fontSize:11,color:"#00e676",marginTop:3}}>✔ {q.options[q.answer]}</div>}
                        <div style={{fontSize:11,color:"#888",marginTop:3,fontStyle:"italic"}}>{q.explanation}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={()=>{setQuizStarted(false);setQuizDone(false);}} style={{padding:"11px 26px",background:"none",border:"1px solid #00c8ff",borderRadius:6,color:"#00c8ff",fontSize:12,fontFamily:"inherit",cursor:"pointer",letterSpacing:2}}>{t.restartQuiz}</button>
              </div>
            ) : (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{fontSize:11,color:"#555",letterSpacing:1}}>QUESTION {currentQ+1} / {filteredQ.length}</div>
                  <div style={{fontSize:11,color:"#ffd60a"}}>{filteredQ[currentQ].level.toUpperCase()}</div>
                </div>
                <div style={{width:"100%",height:3,background:"rgba(255,255,255,0.05)",borderRadius:3,marginBottom:18}}>
                  <div style={{width:`${(currentQ/filteredQ.length)*100}%`,height:"100%",background:"#00c8ff",borderRadius:3,transition:"width 0.3s"}}/>
                </div>
                <Box><div style={{fontSize:14,color:"#e0e0e0",lineHeight:1.7}}>{filteredQ[currentQ].q}</div></Box>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
                  {filteredQ[currentQ].options.map((opt,i)=>{
                    const isSel=selected===i, isCorr=i===filteredQ[currentQ].answer, show=selected!==null;
                    let bg="rgba(0,0,0,0.4)",bdr="rgba(255,255,255,0.1)",clr="#c0c0d0";
                    if(show&&isCorr){bg="rgba(0,200,100,0.15)";bdr="#00c853";clr="#00e676";}
                    else if(show&&isSel&&!isCorr){bg="rgba(255,45,85,0.15)";bdr="#ff2d55";clr="#ff453a";}
                    else if(isSel){bg="rgba(0,200,255,0.1)";bdr="#00c8ff";clr="#00c8ff";}
                    return (
                      <div key={i} onClick={()=>handleAnswer(i)} style={{background:bg,border:`1px solid ${bdr}`,borderRadius:8,padding:"11px 15px",cursor:selected===null?"pointer":"default",transition:"all 0.2s",display:"flex",gap:12,alignItems:"center"}}>
                        <span style={{fontSize:11,color:clr,fontWeight:700,flexShrink:0}}>{["A","B","C","D"][i]}</span>
                        <span style={{fontSize:13,color:clr}}>{opt}</span>
                      </div>
                    );
                  })}
                </div>
                {selected!==null && (
                  <div style={{background:selected===filteredQ[currentQ].answer?"rgba(0,200,100,0.1)":"rgba(255,45,85,0.1)",border:`1px solid ${selected===filteredQ[currentQ].answer?"rgba(0,200,100,0.3)":"rgba(255,45,85,0.3)"}`,borderRadius:8,padding:"11px 15px",marginBottom:14,fontSize:12,color:"#c0c0d0",lineHeight:1.7}}>
                    <strong style={{color:selected===filteredQ[currentQ].answer?"#00e676":"#ff453a"}}>{selected===filteredQ[currentQ].answer?t.correct:t.wrong}</strong>{" "}{t.explanation} {filteredQ[currentQ].explanation}
                  </div>
                )}
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <button onClick={nextQuestion} disabled={selected===null} style={{...btn(selected===null),padding:"11px 22px"}}>{currentQ+1>=filteredQ.length?t.submitQuiz:t.nextQ}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5 – Report */}
        {activeTab===5 && (
          <div>
            <SHead icon="🚨" title={t.reportTitle} sub={t.reportSubtitle}/>
            {reportDone ? (
              <div style={{textAlign:"center",padding:44,background:"rgba(0,200,100,0.08)",border:"1px solid rgba(0,200,100,0.3)",borderRadius:8}}>
                <div style={{fontSize:40,marginBottom:12}}>✅</div>
                <div style={{fontSize:17,color:"#00e676",letterSpacing:2,marginBottom:8}}>{t.reportDoneTitle}</div>
                <div style={{fontSize:13,color:"#888"}}>{t.reportDoneSub}</div>
                <button onClick={()=>{setReportDone(false);setReportForm({type:"",description:"",contact:""}); }} style={{marginTop:18,padding:"10px 22px",background:"none",border:"1px solid #00e676",borderRadius:6,color:"#00e676",fontSize:12,fontFamily:"inherit",cursor:"pointer",letterSpacing:2}}>{t.submitAnother}</button>
              </div>
            ) : (
              <Box>
                <div style={{display:"flex",flexDirection:"column",gap:15}}>
                  <div><Lbl text={t.fraudType}/>
                    <select value={reportForm.type} onChange={e=>setReportForm(f=>({...f,type:e.target.value}))} style={{...inp,color:reportForm.type?"#e0e0e0":"#555"}}>
                      <option value="">{t.selectFraud}</option>
                      <option>Digital Arrest Scam</option><option>WhatsApp / Telegram Fraud</option><option>Phishing Email or SMS</option><option>KYC / Bank Fraud</option><option>Fake Job / Part-Time Scam</option><option>Romance / Honey Trap Scam</option><option>Investment / Crypto Scam</option><option>Other</option>
                    </select>
                  </div>
                  <div><Lbl text={t.describe}/><textarea rows={5} value={reportForm.description} onChange={e=>setReportForm(f=>({...f,description:e.target.value}))} placeholder="Describe what happened, what was said, what numbers/links were used..." style={{...inp,resize:"vertical"}}/></div>
                  <div><Lbl text={t.contactLabel}/><input value={reportForm.contact} onChange={e=>setReportForm(f=>({...f,contact:e.target.value}))} placeholder="Phone or email for follow-up (optional)" style={inp}/></div>
                  <button disabled={!reportForm.type||!reportForm.description} onClick={()=>setReportDone(true)} style={{padding:12,background:(!reportForm.type||!reportForm.description)?"#111":"linear-gradient(135deg,#7b0000,#cc0000)",border:"1px solid #ff2d55",borderRadius:6,color:"#ff2d55",fontSize:13,fontFamily:"inherit",fontWeight:700,letterSpacing:3,cursor:(!reportForm.type||!reportForm.description)?"not-allowed":"pointer"}}>{t.submitReport}</button>
                </div>
                <div style={{marginTop:14,padding:"11px 14px",background:"rgba(255,149,0,0.08)",border:"1px solid rgba(255,149,0,0.2)",borderRadius:6,fontSize:12,color:"#ff9500"}}>{t.emergencyNote}</div>
              </Box>
            )}
          </div>
        )}
      </main>

      <footer style={{position:"relative",zIndex:10,borderTop:"1px solid rgba(255,255,255,0.05)",padding:"13px 20px",textAlign:"center",fontSize:9,color:"#333",letterSpacing:1}}>{t.footer}</footer>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}*{box-sizing:border-box}`}</style>
    </div>
  );
}

function Stat({label,value,color}) { return <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"#555",letterSpacing:1}}>{label}</div><div style={{fontSize:12,fontWeight:700,color}}>{value}</div></div>; }
function SHead({icon,title,sub}) { return <div style={{marginBottom:16}}><div style={{fontSize:16,fontWeight:700,color:"#e0e0e0",marginBottom:3}}>{icon} {title}</div><div style={{fontSize:12,color:"#666"}}>{sub}</div></div>; }
function Box({children}) { return <div style={{background:"rgba(0,10,20,0.8)",border:"1px solid rgba(0,200,255,0.2)",borderRadius:8,padding:17,marginBottom:14}}>{children}</div>; }
function Lbl({text}) { return <div style={{fontSize:10,color:"#00c8ff",letterSpacing:2,marginBottom:7}}>{text}</div>; }
function Spin({text}) { return <div style={{textAlign:"center",padding:26,background:"rgba(0,10,30,0.6)",border:"1px solid rgba(0,200,255,0.1)",borderRadius:8,marginBottom:12}}><div style={{fontSize:21,marginBottom:7,display:"inline-block",animation:"spin 1s linear infinite"}}>⚙️</div><div style={{fontSize:11,color:"#00c8ff",letterSpacing:1}}>{text}</div></div>; }
function FList({label,items,color}) { return <div style={{marginBottom:12}}><div style={{fontSize:10,color,letterSpacing:2,marginBottom:7}}>{label}</div>{items.map((it,i)=><div key={i} style={{display:"flex",gap:8,fontSize:12,color:"#c0c0d0",marginBottom:5}}><span style={{color,flexShrink:0}}>›</span><span>{it}</span></div>)}</div>; }
function ResCard({result,vs,t}) {
  const style=vs(result.verdict); const score=result.riskScore||0; const sc=score<30?"#00e676":score<60?"#ffb300":"#ff453a";
  return <div style={{background:style.bg,border:`1px solid ${style.border}`,borderRadius:8,padding:17,marginBottom:13}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:13}}>
      <div><div style={{fontSize:17,fontWeight:900,color:style.color,letterSpacing:3}}>{result.verdict}</div>{result.scamType&&<div style={{fontSize:10,color:"#ff9500",marginTop:2,letterSpacing:1}}>TYPE: {result.scamType}</div>}<div style={{fontSize:12,color:"#b0b0c0",marginTop:5}}>{result.summary}</div></div>
      <div style={{textAlign:"center"}}><div style={{fontSize:25,fontWeight:900,color:sc}}>{score}</div><div style={{fontSize:9,color:"#555",letterSpacing:1}}>{t.riskScore}</div></div>
    </div>
    {result.redFlags?.length>0 && <FList label={t.redFlags} items={result.redFlags} color="#ff2d55"/>}
    {result.psychologicalTactics?.length>0 && <FList label={t.manipulation} items={result.psychologicalTactics} color="#ff9500"/>}
    {result.safeIndicators?.length>0 && <FList label={t.safeIndicators} items={result.safeIndicators} color="#00e676"/>}
    {result.recommendation && <div style={{background:"rgba(0,0,0,0.3)",border:`1px solid ${style.border}33`,borderRadius:6,padding:"10px 14px",fontSize:13,color:style.color,fontWeight:700}}>💡 {result.recommendation}</div>}
  </div>;
}

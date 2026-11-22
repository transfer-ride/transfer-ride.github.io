// © Transfer. Alle Rechte vorbehalten.
// Transfer Team: the employees' app. Sign-in with the same 4-digit PIN as the driver app.
// Every employee sees only their own data (the server checks the session on every call).
// Questions and requests go to the HR agent, which answers itself and passes decisions to the owner.
// "?demo" shows made-up data and never calls the server.
(function () {
  "use strict";
  var API = "https://qdrwssvwlpbloqnnyrzk.supabase.co/rest/v1/rpc/";
  var KEY = "sb_publishable_hLvHm_ujPZSNsEoxoiEdiw_2h7lTKjC";
  var DEMO = /[?&]demo\b/.test(location.search);

  /* ---------------- texts ---------------- */
  var T = {
    de: {
      sec_space: "Mein Bereich", sec_cal: "Kalender", sec_wallet: "Geld", sec_dev: "Entwicklung", sec_docs: "Dokumente", sec_set: "Einstellungen", schedule: "Plan", prefs: "Wünsche", worked: "Gearbeitete Stunden", prefs_sub: "Wann arbeitest du am liebsten? Der Chef sieht das beim Planen.", can: "kann", cannot: "nicht", save: "Speichern", saved: "Gespeichert", movements: "Zahlungen", read_on: "Gelesen am {n}", unread: "Neu", support: "Hilfe", policy: "Nutzungsregeln", policy_text: "Transfer Team ist nur für Mitarbeiter von Transfer. Melde dich nicht auf fremden Geräten an, gib deinen PIN nicht weiter. Was du hier siehst, sind deine persönlichen Daten: bitte nicht weitergeben. Fragen an den HR-Assistenten werden auf dem Rechner der Personalverwaltung beantwortet; Entscheidungen trifft der Chef.", other_docs: "Weitere Dokumente",
      menu: "Menü", search: "Suche", search_ph: "Suchen: Urlaub, Schicht, Regeln …", no_hits: "Nichts gefunden.", c_news: "Neuigkeiten", c_company: "Über Transfer", c_benefits: "Vorteile", c_learning: "Lernen", c_development: "Entwicklung", c_guidelines: "Richtlinien", c_favs: "Favoriten", no_favs: "Tippe bei einem Beitrag auf ☆, um ihn hier zu sammeln.", full_plan: "Ganzer Plan", my_plan: "Mein Plan",
      app: "Team", pin: "PIN eingeben", pin_sub: "Derselbe PIN wie in der Fahrer-App", wrong: "Falscher PIN. Noch {n} Versuche.",
      locked: "Zu viele Versuche. Bitte später noch einmal.", offline: "Keine Verbindung. Bitte später noch einmal.",
      home: "Start", plan: "Plan", requests: "Anträge", chat: "HR-Chat", profile: "Profil",
      hello: "Hallo {n}", next_shift: "Deine nächste Schicht", no_shift: "Keine Schicht geplant", today: "Heute", tomorrow: "Morgen",
      leave_left: "Urlaub übrig", days: "Tage", hours_month: "Stunden diesen Monat", open_req: "Offene Anträge",
      ask_leave: "Urlaub", ask_sick: "Krank melden", ask_swap: "Schicht tauschen", ask_raise: "Gehalt", ask_doc: "Dokument",
      ask_payslip: "Lohnzettel", ask_other: "Sonstiges", ask_chat: "Frag HR",
      news: "Neuigkeiten", no_news: "Noch keine Neuigkeiten.",
      week: "Woche", month: "Monat", free: "frei", total: "Gesamt", h: "Std.", brk: "Pause",
      on_leave: "Urlaub", sick: "Krank", unpaid: "Unbezahlt",
      new_req: "Neuer Antrag", my_req: "Meine Anträge", no_req: "Noch keine Anträge.",
      st_open: "Offen", st_answered: "Beantwortet", st_with_owner: "Beim Chef", st_done: "Erledigt",
      st_requested: "Beantragt", st_approved: "Genehmigt", st_rejected: "Abgelehnt",
      from: "Von", to: "Bis", date: "Datum", msg: "Nachricht", send: "Senden", cancel: "Abbrechen", sent: "Gesendet",
      which_doc: "Welches Dokument?", which_month: "Welcher Monat?", why: "Kurz, worum es geht",
      sick_note: "Ab dem 4. Krankheitstag brauchst du eine AU vom Arzt.",
      chat_title: "HR-Assistent", chat_sub: "Antwortet sofort · Entscheidungen trifft der Chef",
      chat_empty: "Frag alles zu Schichten, Urlaub, Lohn, Dokumenten oder Regeln.",
      typing: "HR-Assistent schreibt …", owner: "Chef", agent: "HR-Assistent", ph: "Nachricht schreiben …",
      q1: "Wie viel Urlaub habe ich noch?", q2: "Wann ist meine nächste Schicht?", q3: "Wann kommt der Lohn?",
      personal: "Persönlich", contract: "Vertrag", documents: "Dokumente", payslips: "Lohnzettel", settings: "Einstellungen",
      type: "Art", start: "Seit", wage: "Stundenlohn", salary: "Monatsgehalt", per_week: "Tage pro Woche", leave_year: "Urlaub pro Jahr",
      role: "Aufgabe", phone: "Telefon", expires: "gültig bis", expired: "abgelaufen", in_days: "noch {n} Tage", signed: "unterschrieben",
      no_docs: "Keine Dokumente eingetragen.", no_payslips: "Noch keine Lohnzettel.", gross: "Brutto", net: "Netto", hours: "Stunden",
      language: "Sprache", signout: "Abmelden", install: "Zum Startbildschirm hinzufügen",
      install_ios: "In Safari: Teilen-Symbol → „Zum Home-Bildschirm“.", demo: "Beispieldaten",
      t_minijob: "Minijob", t_teilzeit: "Teilzeit", t_vollzeit: "Vollzeit", t_kurzfristig: "Kurzfristig", t_freelance: "Freiberuflich", t_inhaber: "Inhaber",
      err: "Das ging nicht. Bitte noch einmal.", too_many: "Zu viele Nachrichten. Bitte etwas später.", signed_out: "Abgemeldet. Bitte PIN eingeben."
    },
    en: {
      sec_space: "My space", sec_cal: "Calendar", sec_wallet: "Money", sec_dev: "Development", sec_docs: "Documents", sec_set: "Settings", schedule: "Schedule", prefs: "Wishes", worked: "Worked hours", prefs_sub: "When do you like to work? The boss sees this when planning.", can: "can", cannot: "no", save: "Save", saved: "Saved", movements: "Payments", read_on: "Read on {n}", unread: "New", support: "Help", policy: "Usage rules", policy_text: "Transfer Team is only for Transfer staff. Do not sign in on other people's devices and do not share your PIN. What you see here is your personal data: please keep it to yourself. HR assistant questions are answered on the HR computer; the boss makes the decisions.", other_docs: "Other documents",
      menu: "Menu", search: "Search", search_ph: "Search: leave, shift, rules …", no_hits: "Nothing found.", c_news: "News", c_company: "About Transfer", c_benefits: "Benefits", c_learning: "Learning", c_development: "Development", c_guidelines: "Guidelines", c_favs: "Favourites", no_favs: "Tap ☆ on a post to keep it here.", full_plan: "Full schedule", my_plan: "My schedule",
      app: "Team", pin: "Enter your PIN", pin_sub: "The same PIN as in the driver app", wrong: "Wrong PIN. {n} tries left.",
      locked: "Too many tries. Please try later.", offline: "No connection. Please try later.",
      home: "Home", plan: "Schedule", requests: "Requests", chat: "HR chat", profile: "Profile",
      hello: "Hi {n}", next_shift: "Your next shift", no_shift: "No shift planned", today: "Today", tomorrow: "Tomorrow",
      leave_left: "Leave left", days: "days", hours_month: "Hours this month", open_req: "Open requests",
      ask_leave: "Leave", ask_sick: "Call in sick", ask_swap: "Swap shift", ask_raise: "Pay", ask_doc: "Document",
      ask_payslip: "Payslip", ask_other: "Other", ask_chat: "Ask HR",
      news: "News", no_news: "No news yet.",
      week: "Week", month: "Month", free: "off", total: "Total", h: "h", brk: "break",
      on_leave: "Leave", sick: "Sick", unpaid: "Unpaid",
      new_req: "New request", my_req: "My requests", no_req: "No requests yet.",
      st_open: "Open", st_answered: "Answered", st_with_owner: "With the boss", st_done: "Done",
      st_requested: "Requested", st_approved: "Approved", st_rejected: "Declined",
      from: "From", to: "To", date: "Date", msg: "Message", send: "Send", cancel: "Cancel", sent: "Sent",
      which_doc: "Which document?", which_month: "Which month?", why: "In short, what it is about",
      sick_note: "From the 4th day of sickness you need a doctor's note (AU).",
      chat_title: "HR assistant", chat_sub: "Answers at once · the boss makes the decisions",
      chat_empty: "Ask anything about shifts, leave, pay, documents or rules.",
      typing: "HR assistant is typing …", owner: "Boss", agent: "HR assistant", ph: "Write a message …",
      q1: "How much leave do I have left?", q2: "When is my next shift?", q3: "When is payday?",
      personal: "Personal", contract: "Contract", documents: "Documents", payslips: "Payslips", settings: "Settings",
      type: "Type", start: "Since", wage: "Hourly wage", salary: "Monthly salary", per_week: "Days a week", leave_year: "Leave a year",
      role: "Role", phone: "Phone", expires: "valid until", expired: "expired", in_days: "{n} days left", signed: "signed",
      no_docs: "No documents entered.", no_payslips: "No payslips yet.", gross: "Gross", net: "Net", hours: "Hours",
      language: "Language", signout: "Sign out", install: "Add to home screen",
      install_ios: "In Safari: Share icon → “Add to Home Screen”.", demo: "Sample data",
      t_minijob: "Minijob", t_teilzeit: "Part-time", t_vollzeit: "Full-time", t_kurzfristig: "Short-term", t_freelance: "Freelance", t_inhaber: "Owner",
      err: "That did not work. Please try again.", too_many: "Too many messages. Please wait a bit.", signed_out: "Signed out. Please enter your PIN."
    },
    el: {
      sec_space: "Ο χώρος μου", sec_cal: "Ημερολόγιο", sec_wallet: "Χρήματα", sec_dev: "Εξέλιξη", sec_docs: "Έγγραφα", sec_set: "Ρυθμίσεις", schedule: "Πρόγραμμα", prefs: "Προτιμήσεις", worked: "Ώρες εργασίας", prefs_sub: "Πότε προτιμάς να δουλεύεις; Το αφεντικό το βλέπει όταν φτιάχνει το πρόγραμμα.", can: "μπορώ", cannot: "όχι", save: "Αποθήκευση", saved: "Αποθηκεύτηκε", movements: "Πληρωμές", read_on: "Διαβάστηκε {n}", unread: "Νέο", support: "Βοήθεια", policy: "Κανόνες χρήσης", policy_text: "Το Transfer Team είναι μόνο για το προσωπικό του Transfer. Μη συνδέεσαι σε ξένες συσκευές και μη δίνεις το PIN σου. Όσα βλέπεις εδώ είναι προσωπικά σου στοιχεία: κράτα τα για σένα. Τις ερωτήσεις στον βοηθό HR τις απαντά ο υπολογιστής του HR· τις αποφάσεις τις παίρνει το αφεντικό.", other_docs: "Άλλα έγγραφα",
      menu: "Μενού", search: "Αναζήτηση", search_ph: "Αναζήτηση: άδεια, βάρδια, κανόνες …", no_hits: "Δεν βρέθηκε τίποτα.", c_news: "Νέα", c_company: "Για το Transfer", c_benefits: "Παροχές", c_learning: "Εκπαίδευση", c_development: "Εξέλιξη", c_guidelines: "Κανόνες", c_favs: "Αγαπημένα", no_favs: "Πάτα ☆ σε μια ανάρτηση για να τη βρίσκεις εδώ.", full_plan: "Όλο το πρόγραμμα", my_plan: "Το πρόγραμμά μου",
      app: "Team", pin: "Βάλε το PIN", pin_sub: "Το ίδιο PIN με την εφαρμογή οδηγού", wrong: "Λάθος PIN. Απομένουν {n} προσπάθειες.",
      locked: "Πολλές προσπάθειες. Δοκίμασε αργότερα.", offline: "Χωρίς σύνδεση. Δοκίμασε αργότερα.",
      home: "Αρχική", plan: "Πρόγραμμα", requests: "Αιτήματα", chat: "Chat HR", profile: "Προφίλ",
      hello: "Γεια σου {n}", next_shift: "Η επόμενη βάρδια σου", no_shift: "Καμία βάρδια", today: "Σήμερα", tomorrow: "Αύριο",
      leave_left: "Άδεια που απομένει", days: "μέρες", hours_month: "Ώρες αυτόν τον μήνα", open_req: "Ανοιχτά αιτήματα",
      ask_leave: "Άδεια", ask_sick: "Ασθένεια", ask_swap: "Αλλαγή βάρδιας", ask_raise: "Μισθός", ask_doc: "Έγγραφο",
      ask_payslip: "Μισθοδοσία", ask_other: "Άλλο", ask_chat: "Ρώτα το HR",
      news: "Νέα", no_news: "Δεν υπάρχουν νέα ακόμα.",
      week: "Εβδομάδα", month: "Μήνας", free: "ρεπό", total: "Σύνολο", h: "ώρ.", brk: "διάλειμμα",
      on_leave: "Άδεια", sick: "Ασθένεια", unpaid: "Άνευ αποδοχών",
      new_req: "Νέο αίτημα", my_req: "Τα αιτήματά μου", no_req: "Κανένα αίτημα ακόμα.",
      st_open: "Ανοιχτό", st_answered: "Απαντήθηκε", st_with_owner: "Στο αφεντικό", st_done: "Έγινε",
      st_requested: "Ζητήθηκε", st_approved: "Εγκρίθηκε", st_rejected: "Απορρίφθηκε",
      from: "Από", to: "Έως", date: "Ημερομηνία", msg: "Μήνυμα", send: "Αποστολή", cancel: "Άκυρο", sent: "Στάλθηκε",
      which_doc: "Ποιο έγγραφο;", which_month: "Ποιος μήνας;", why: "Με λίγα λόγια, για τι πρόκειται",
      sick_note: "Από την 4η μέρα ασθένειας χρειάζεσαι βεβαίωση γιατρού (AU).",
      chat_title: "Βοηθός HR", chat_sub: "Απαντά αμέσως · τις αποφάσεις τις παίρνει το αφεντικό",
      chat_empty: "Ρώτα ό,τι θες για βάρδιες, άδειες, μισθό, έγγραφα ή κανόνες.",
      typing: "Ο βοηθός HR γράφει …", owner: "Αφεντικό", agent: "Βοηθός HR", ph: "Γράψε μήνυμα …",
      q1: "Πόση άδεια μου μένει;", q2: "Πότε είναι η επόμενη βάρδια μου;", q3: "Πότε πληρωνόμαστε;",
      personal: "Προσωπικά", contract: "Σύμβαση", documents: "Έγγραφα", payslips: "Εκκαθαριστικά", settings: "Ρυθμίσεις",
      type: "Είδος", start: "Από", wage: "Ωρομίσθιο", salary: "Μηνιαίος μισθός", per_week: "Μέρες την εβδομάδα", leave_year: "Άδεια τον χρόνο",
      role: "Θέση", phone: "Τηλέφωνο", expires: "ισχύει έως", expired: "έληξε", in_days: "απομένουν {n} μέρες", signed: "υπογράφηκε",
      no_docs: "Δεν έχουν καταχωριστεί έγγραφα.", no_payslips: "Δεν υπάρχουν εκκαθαριστικά ακόμα.", gross: "Μικτά", net: "Καθαρά", hours: "Ώρες",
      language: "Γλώσσα", signout: "Αποσύνδεση", install: "Προσθήκη στην αρχική οθόνη",
      install_ios: "Στο Safari: εικονίδιο κοινοποίησης → «Προσθήκη στην οθόνη αφετηρίας».", demo: "Δείγμα",
      t_minijob: "Minijob", t_teilzeit: "Μερική", t_vollzeit: "Πλήρης", t_kurzfristig: "Βραχυπρόθεσμη", t_freelance: "Ελεύθερος επαγγελματίας", t_inhaber: "Ιδιοκτήτης",
      err: "Δεν έγινε. Δοκίμασε ξανά.", too_many: "Πολλά μηνύματα. Περίμενε λίγο.", signed_out: "Αποσυνδέθηκες. Βάλε το PIN."
    }
  };
  var DOC_NAMES = {
    de: { fuehrerschein: "Führerschein", p_schein: "P-Schein", arbeitsvertrag: "Arbeitsvertrag", ausweis: "Ausweis", aufenthaltstitel: "Aufenthaltstitel",
      sofortmeldung: "Sofortmeldung", gesundheitszeugnis: "Gesundheitszeugnis", fuehrungszeugnis: "Führungszeugnis" },
    en: { fuehrerschein: "Driving licence", p_schein: "Passenger licence (P-Schein)", arbeitsvertrag: "Employment contract", ausweis: "ID card",
      aufenthaltstitel: "Residence permit", sofortmeldung: "Registration (Sofortmeldung)", gesundheitszeugnis: "Health certificate", fuehrungszeugnis: "Police certificate" },
    el: { fuehrerschein: "Δίπλωμα", p_schein: "P-Schein", arbeitsvertrag: "Σύμβαση εργασίας", ausweis: "Ταυτότητα", aufenthaltstitel: "Άδεια παραμονής",
      sofortmeldung: "Δήλωση πρόσληψης", gesundheitszeugnis: "Πιστοποιητικό υγείας", fuehrungszeugnis: "Ποινικό μητρώο" }
  };

  // Starter content for the menu sections until the owner posts his own (node team/bridge.mjs post … --category …).
  var CATS = ["news", "company", "benefits", "learning", "development", "guidelines"]; var profSec = "space", calView = "schedule", calMonth = null;
  var STARTER = [
    { id: "s1", category: "company", title: "Transfer in Stuttgart", body: "Transfer fährt Fahrgäste in und um Stuttgart: Flughafen, Bahnhof, Messe, Termine. Buchungen kommen über die Website, WhatsApp (Tobias) und die Fahrer-App. Unser Anspruch: pünktlich, sauber, freundlich." },
    { id: "s2", category: "company", title: "Wer hilft dir", body: "Fragen zu Schichten, Urlaub, Lohn und Dokumenten: der HR-Assistent im Chat, rund um die Uhr. Entscheidungen über Geld, Urlaub und Verträge trifft der Chef; der Assistent gibt sie weiter. Notfall unterwegs: 112, dann die Zentrale." },
    { id: "s3", category: "guidelines", title: "Im Auto", body: "Pünktlich am Abholort, Auto innen und außen sauber, keine lauten Telefonate mit Fahrgästen im Auto. Gurtpflicht für alle. Kein Alkohol, keine Drogen: 0,0 ‰ im Dienst." },
    { id: "s4", category: "guidelines", title: "Krank? So geht's", body: "Vor Schichtbeginn melden: in der App unter Anträge → Krank melden. Ab dem 4. Krankheitstag brauchst du eine AU vom Arzt. Gründe der Krankheit musst du nicht nennen." },
    { id: "s5", category: "guidelines", title: "Arbeitszeit", body: "Höchstens 10 Stunden am Tag, mindestens 11 Stunden Ruhe zwischen zwei Schichten, nach 6 Stunden 30 Minuten Pause. Trag deine echten Zeiten ein: das ist die gesetzliche Zeiterfassung." },
    { id: "s6", category: "guidelines", title: "Datenschutz", body: "Daten von Fahrgästen (Namen, Nummern, Adressen) nur für die Fahrt nutzen, nie weitergeben, keine Fotos davon. Deine eigenen Daten sieht nur du und die Personalverwaltung." },
    { id: "s7", category: "learning", title: "Die Fahrer-App in 5 Schritten", body: "1. Anfrage kommt mit Ton → wischen zum Annehmen.\n2. „Ich fahre los“ startet Waze oder Google Maps.\n3. Am Abholort öffnet „Angekommen“ (oder automatisch nach 15 s Stillstand).\n4. Fahrgast drin → „Fahrt starten“.\n5. Am Ziel „Fahrt beenden“, bei Barzahlung den Betrag kassieren." },
    { id: "s8", category: "learning", title: "Android Auto", body: "Die Transfer-Karte erscheint neben Waze. Neue Fahrt: ✓ annehmen, ✕ ablehnen. Danach Waze oder Google Maps. Am Abholort ▶ startet die Fahrt, am Ziel die Flagge beendet sie." },
    { id: "s9", category: "learning", title: "Flughafen Stuttgart", body: "Abholung an Terminal 1 und 3: Kurzzeitparken P0/P14 nutzen, Flugnummer in der App prüfen (Live-Link), bei Verspätung kostenlos warten bis 30 Minuten nach Landung." },
    { id: "s10", category: "benefits", title: "Vorteile bei Transfer", body: "Flexible Schichten nach deinen Wünschen, Bezahlung pünktlich zum Monatsanfang, Trinkgeld gehört dir. Weitere Vorteile folgen – Vorschläge gern im HR-Chat." },
    { id: "s11", category: "development", title: "Wachsen mit Transfer", body: "Mehr Schichten, Flughafen- und Geschäftskunden, später Teamleitung: sag im HR-Chat, was du dir wünschst. P-Schein noch nicht? Wir helfen dir bei der Anmeldung." }
  ];
  function posts() { var own = (data && data.posts) || []; return own.concat(STARTER.filter(function (x) { return !own.some(function (o) { return o.category === x.category; }) || x.category === "news"; })); }
  function favs() { try { return JSON.parse(load("team_favs") || "[]"); } catch (e) { return []; } }
  function toggleFav(id) { var f = favs(), i = f.indexOf(String(id)); if (i < 0) f.push(String(id)); else f.splice(i, 1); store("team_favs", JSON.stringify(f)); }

  /* ---------------- state ---------------- */
  function store(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  var lang = load("team_lang") || ((navigator.language || "de").slice(0, 2) in T ? (navigator.language || "de").slice(0, 2) : "de");
  var token = DEMO ? "demo" : load("team_token");
  var data = null, tab = load("team_tab") || "home", chat = [], chatTimer = null, homeTimer = null, sheet = null, planView = "week";
  function t(k, n) { var s = (T[lang] && T[lang][k]) || T.de[k] || k; return n == null ? s : s.replace("{n}", n); }
  var app = document.getElementById("app");
  document.documentElement.lang = lang;

  /* ---------------- server ---------------- */
  function rpc(fn, args) {
    if (DEMO) return Demo.rpc(fn, args);
    return fetch(API + fn, { method: "POST", headers: { "Content-Type": "application/json", apikey: KEY, Authorization: "Bearer " + KEY },
      body: JSON.stringify(args) }).then(function (r) {
      return r.text().then(function (txt) {
        var j = null; try { j = JSON.parse(txt); } catch (e) {}
        if (!r.ok) {
          var code = j && j.code;
          if (code === "28000") { signOut(true); }
          var e2 = new Error(code === "KB429" ? t("too_many") : t("err")); e2.code = code; throw e2;
        }
        return j;
      });
    });
  }

  /* ---------------- helpers ---------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function toast(s) { var x = el('<div class="toast" role="status">' + esc(s) + "</div>"); document.body.appendChild(x); setTimeout(function () { x.remove(); }, 2600); }
  function loc() { return { de: "de-DE", en: "en-GB", el: "el-GR" }[lang]; }
  function ymd(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function parse(s) { var p = String(s).slice(0, 10).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dayName(d, style) { return d.toLocaleDateString(loc(), { weekday: style || "short" }); }
  function dateLabel(s) {
    var d = parse(s), today = ymd(new Date()), tm = new Date(); tm.setDate(tm.getDate() + 1);
    if (s === today) return t("today"); if (s === ymd(tm)) return t("tomorrow");
    return d.toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long" });
  }
  function short(s) { return parse(s).toLocaleDateString(loc(), { day: "numeric", month: "short" }); }
  function money(v) { return v == null || v === "" ? "—" : Number(v).toLocaleString(loc(), { style: "currency", currency: "EUR" }); }
  function mins(a, b, br) {
    var x = a.split(":"), y = b.split(":"), m = (+y[0] * 60 + +y[1]) - (+x[0] * 60 + +x[1]); if (m < 0) m += 1440; return m - (br || 0);
  }
  function hrs(m) { return (Math.round(m / 6) / 10).toLocaleString(loc()) + " " + t("h"); }
  function weekdays(f, to) { var n = 0, d = parse(f), e = parse(to); while (d <= e) { var w = d.getDay(); if (w && w < 6) n++; d.setDate(d.getDate() + 1); } return n; }
  function clock(iso) { var d = new Date(iso); return d.toLocaleTimeString(loc(), { hour: "2-digit", minute: "2-digit" }); }
  function chip(st) { var c = { open: "wait", requested: "wait", with_owner: "info", answered: "ok", approved: "ok", done: "ok", rejected: "bad" }[st] || "";
    return '<span class="chip ' + c + '">' + esc(t("st_" + st)) + "</span>"; }

  var ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    requests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
    profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    leave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    sick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/></svg>',
    raise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 6-6 4 4 8-8M15 7h6v6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
    payslip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>',
    other: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>',
    send: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>'
  };
  var KINDS = [["leave", "ask_leave", "leave"], ["sick", "ask_sick", "sick"], ["shift_swap", "ask_swap", "swap"],
    ["raise", "ask_raise", "raise"], ["document", "ask_doc", "doc"], ["payslip", "ask_payslip", "payslip"], ["other", "ask_other", "other"]];

  /* ---------------- derived numbers ---------------- */
  function profile() { return (data && data.profile) || {}; }
  function leaveLeft() {
    var p = profile(), per = p.vacation_days_per_year; if (per == null) return null;
    var y = String(new Date().getFullYear()), used = 0;
    (data.leave || []).forEach(function (l) {
      if (l.kind === "urlaub" && l.status === "approved" && String(l.from).slice(0, 4) === y) used += l.days != null ? +l.days : weekdays(l.from, l.to);
    });
    return per - used;
  }
  function monthMinutes() {
    var m = ymd(new Date()).slice(0, 7), sum = 0;
    (data.shifts || []).forEach(function (s) { if (String(s.day).slice(0, 7) === m && String(s.day) <= ymd(new Date())) sum += mins(s.start, s.end, s.break_min); });
    return sum;
  }
  function nextShift() {
    var now = new Date(), today = ymd(now), hm = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    return (data.shifts || []).filter(function (s) { return s.day > today || (s.day === today && s.end > hm); })
      .sort(function (a, b) { return (a.day + a.start) < (b.day + b.start) ? -1 : 1; })[0];
  }
  function leaveOn(day) { return (data.leave || []).filter(function (l) { return l.status !== "rejected" && l.from <= day && l.to >= day; })[0]; }

  /* ---------------- PIN ---------------- */
  function pinScreen(msg) {
    stopTimers();
    var pin = "";
    app.innerHTML = '<div class="pin"><div class="wordmark" style="font-size:34px">TRANSFER<i></i></div>' +
      '<div class="muted" style="margin-top:4px">' + esc(t("app")) + '</div>' +
      '<h2 style="margin-top:34px">' + esc(t("pin")) + '</h2><div class="muted small">' + esc(t("pin_sub")) + "</div>" +
      '<div class="dots" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
      '<div class="err" role="alert">' + esc(msg || "") + '</div><div class="keys"></div>' +
      '<div class="langs"></div></div>';
    var keys = app.querySelector(".keys");
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].forEach(function (k) {
      var b = el('<button type="button" ' + (k ? 'aria-label="' + (k === "⌫" ? "Delete" : k) + '"' : 'class="empty" tabindex="-1" aria-hidden="true"') + ">" + k + "</button>");
      if (k) b.onclick = function () { press(k); };
      keys.appendChild(b);
    });
    langButtons(app.querySelector(".langs"), function () { pinScreen(msg); });
    function dots() { app.querySelectorAll(".dots span").forEach(function (s, i) { s.className = i < pin.length ? "on" : ""; }); }
    function press(k) {
      if (k === "⌫") pin = pin.slice(0, -1); else if (pin.length < 4) pin += k;
      dots();
      if (pin.length === 4) submit(pin);
    }
    document.onkeydown = function (e) { if (/^[0-9]$/.test(e.key)) press(e.key); else if (e.key === "Backspace") press("⌫"); };
    function submit(p) {
      rpc("driver_login", { p_pin: p }).then(function (o) {
        if (o && o.error) { pin = ""; dots(); app.querySelector(".err").textContent = o.error === "locked" ? t("locked") : t("wrong", o.left); return; }
        token = o.token; store("team_token", token); document.onkeydown = null; start();
      }).catch(function () { pin = ""; dots(); app.querySelector(".err").textContent = t("offline"); });
    }
  }
  function langButtons(box, redraw) {
    [["de", "DE"], ["en", "EN"], ["el", "EL"]].forEach(function (x) {
      var b = el('<button type="button" aria-pressed="' + (lang === x[0]) + '">' + x[1] + "</button>");
      b.onclick = function () { lang = x[0]; store("team_lang", lang); document.documentElement.lang = lang; redraw(); };
      box.appendChild(b);
    });
  }
  function signOut(expired) {
    store("team_token", null); token = null; data = null; chat = [];
    pinScreen(expired ? t("signed_out") : "");
  }

  /* ---------------- main ---------------- */
  function stopTimers() { clearInterval(chatTimer); clearInterval(homeTimer); chatTimer = homeTimer = null; }
  function start() {
    refresh().then(function () { render(); homeTimer = setInterval(function () { refresh().then(function () { if (tab !== "chat" && !sheet) render(); else tabsBadge(); }); }, 30000); })
      .catch(function () { if (token) { app.innerHTML = '<div class="pin"><p class="err">' + esc(t("offline")) + '</p><button class="btn ghost" style="max-width:240px" id="retry">↻</button></div>'; app.querySelector("#retry").onclick = start; } });
  }
  function refresh() { return rpc("team_home", { p_token: token }).then(function (d) { data = d; }); }

  function render() {
    if (tab === "chat") return chatScreen();
    var body = { home: homeScreen, plan: planScreen, menu: menuScreen, requests: requestsScreen, profile: profileScreen, search: searchScreen }[tab] || homeScreen;
    app.innerHTML = '<main class="screen">' + body() + "</main>" + tabsHtml();
    bind();
  }
  function tabsHtml() {
    return '<nav class="tabs" aria-label="Menu">' + ["home", "menu", "requests", "chat", "profile"].map(function (k) {
      var badge = k === "chat" && data && data.unread > 0 ? '<span class="badge">' + data.unread + "</span>" : "";
      var cur = tab === k || (k === "home" && (tab === "plan" || tab === "search"));
      return '<button type="button" data-tab="' + k + '"' + (cur ? ' aria-current="page"' : "") + ">" + ICON[k] + "<span>" + esc(t(k)) + "</span>" + badge + "</button>";
    }).join("") + "</nav>";
  }
  function tabsBadge() { var n = app.querySelector(".tabs"); if (n) { n.outerHTML = tabsHtml(); bindTabs(); } }
  function bindTabs() { app.querySelectorAll("[data-tab]").forEach(function (b) { b.onclick = function () { go(b.dataset.tab); }; }); }
  function go(k) { tab = k; store("team_tab", k); clearInterval(chatTimer); chatTimer = null; window.scrollTo(0, 0); render(); }
  function bind() {
    bindTabs();
    app.querySelectorAll("[data-ask]").forEach(function (b) { b.onclick = function () { askSheet(b.dataset.ask); }; });
    app.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { go(b.dataset.go); }; });
    app.querySelectorAll("[data-q]").forEach(function (b) { b.onclick = function () { go("chat"); setTimeout(function () { sendChat(b.dataset.q); }, 50); }; });
    app.querySelectorAll("[data-view]").forEach(function (b) { b.onclick = function () { planView = b.dataset.view; render(); }; });
    app.querySelectorAll("[data-slip]").forEach(function (b) { b.onclick = function () { slipSheet(b.dataset.slip); }; });
    app.querySelectorAll("[data-req]").forEach(function (b) { b.onclick = function () { reqSheet(+b.dataset.req); }; });
    var so = app.querySelector("#signout"); if (so) so.onclick = function () { signOut(false); };
    app.querySelectorAll("[data-sec]").forEach(function (b) { b.onclick = function () { profSec = b.dataset.sec; render(); }; });
    app.querySelectorAll("[data-cal]").forEach(function (b) { b.onclick = function () { calView = b.dataset.cal; render(); }; });
    app.querySelectorAll("[data-mon]").forEach(function (b) { b.onclick = function () { var n = new Date(), m = calMonth || new Date(n.getFullYear(), n.getMonth(), 1); calMonth = new Date(m.getFullYear(), m.getMonth() + (+b.dataset.mon), 1); render(); }; });
    app.querySelectorAll("[data-doc]").forEach(function (b) { b.onclick = function () { docSheet(b.dataset.doc); }; });
    var ps = app.querySelector("#psave"); if (ps) ps.onclick = function () {
      var days = {}; app.querySelectorAll("[data-pd]").forEach(function (r) { var i = r.querySelectorAll("input"); days[r.dataset.pd] = { ok: i[0].checked, from: i[1].value, to: i[2].value }; });
      ps.disabled = true;
      rpc("team_prefs", { p_token: token, p_prefs: { days: days, note: app.querySelector("#pnote").value.trim() } }).then(function (home) { data = home; toast(t("saved")); render(); }).catch(function (e) { ps.disabled = false; toast(e.message); });
    };
    app.querySelectorAll("[data-fav]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); toggleFav(b.dataset.fav); render(); }; });
    app.querySelectorAll("[data-cat]").forEach(function (b) { b.onclick = function () { menuCat = b.dataset.cat; render(); window.scrollTo(0, 0); }; });
    app.querySelectorAll("[data-tab=plan]").forEach(function (b) { b.onclick = function () { go("plan"); }; });
    var q = app.querySelector("#q"); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); q.oninput = function () { query = q.value; var r = app.querySelector("#hits"); if (r) r.innerHTML = hits(); bindHits(); }; bindHits(); }
    var lb = app.querySelector(".langs"); if (lb) langButtons(lb, render);
  }

  /* ---------------- Home ---------------- */
  function homeScreen() {
    var p = profile(), first = String((data.me && data.me.name) || "").split(" ")[0];
    var ns = nextShift(), left = leaveLeft(), open = (data.requests || []).filter(function (r) { return r.status === "open" || r.status === "with_owner"; }).length;
    var h = '<div class="top"><div><div class="muted small">' + esc(new Date().toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long" })) + "</div>" +
      "<h1>" + esc(t("hello", first)) + "</h1></div>" + (DEMO ? '<span class="chip info">' + esc(t("demo")) + "</span>" : "") + '<button class="back" aria-label="' + esc(t("search")) + '" data-go="search">' + ICON.search + "</button></div>";
    h += '<section class="hero" data-go="plan" role="button" tabindex="0"><div class="muted">' + esc(t("next_shift")) + "</div>" +
      (ns ? '<div class="big">' + esc(dateLabel(ns.day)) + "</div><div>" + esc(ns.start + " – " + ns.end) + (ns.note ? " · " + esc(ns.note) : "") + "</div>"
          : '<div class="big">' + esc(t("no_shift")) + "</div>") + '<div style="margin-top:12px;color:var(--mint);font-weight:700">' + esc(t("full_plan")) + " ›</div></section>";
    h += '<div class="grid2"><div class="card kpi"><div class="muted small">' + esc(t("leave_left")) + '</div><div class="n">' + (left == null ? "—" : left.toLocaleString(loc())) + '</div><div class="muted small">' + esc(t("days")) + "</div></div>" +
      '<div class="card kpi"><div class="muted small">' + esc(t("hours_month")) + '</div><div class="n">' + (Math.round(monthMinutes() / 6) / 10).toLocaleString(loc()) + '</div><div class="muted small">' + esc(t("h")) + "</div></div></div>";
    if (open) h += '<button class="card row tap" style="width:100%;margin-top:12px;border:0" data-go="requests"><span class="grow t" style="text-align:left">' + esc(t("open_req")) + '</span><span class="chip wait">' + open + "</span></button>";
    h += '<div class="actions">' + [["leave", "ask_leave", "leave"], ["sick", "ask_sick", "sick"], ["shift_swap", "ask_swap", "swap"]].map(function (k) {
      return '<button class="action" data-ask="' + k[0] + '">' + ICON[k[2]] + esc(t(k[1])) + "</button>"; }).join("") +
      '<button class="action" data-ask="payslip">' + ICON.payslip + esc(t("ask_payslip")) + "</button>" +
      '<button class="action" data-ask="document">' + ICON.doc + esc(t("ask_doc")) + "</button>" +
      '<button class="action" data-go="chat">' + ICON.chat + esc(t("ask_chat")) + "</button></div>";
    h += "<h2>" + esc(t("news")) + "</h2>";
    var news = posts().filter(function (p) { return (p.category || "news") === "news"; });
    h += news.length ? news.map(postCard).join("") : '<div class="empty">' + esc(t("no_news")) + "</div>";
    return h;
  }

  function postCard(p) {
    var on = favs().indexOf(String(p.id)) >= 0;
    return '<article class="card post"><div style="display:flex;justify-content:space-between;gap:8px"><div class="muted small">' + (p.at ? esc(new Date(p.at).toLocaleDateString(loc())) : esc(t("c_" + (p.category || "news")))) + (p.pinned ? " · 📌" : "") +
      '</div><button data-fav="' + esc(p.id) + '" aria-label="★" aria-pressed="' + on + '" style="color:' + (on ? "var(--warn)" : "var(--muted)") + '">' + (on ? "★" : "☆") + '</button></div><div class="t">' + esc(p.title) + "</div><p>" + esc(p.body) + "</p></article>";
  }

  /* ---------------- Menu (like the sections of a big employer app) ---------------- */
  var menuCat = null, query = "";
  function menuScreen() {
    if (menuCat) {
      var list = menuCat === "favs" ? posts().filter(function (p) { return favs().indexOf(String(p.id)) >= 0; }) : posts().filter(function (p) { return (p.category || "news") === menuCat; });
      return '<div class="top"><button class="back" aria-label="Back" data-cat="">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("c_" + menuCat)) + "</h1></div>" +
        (list.length ? list.map(postCard).join("") : '<div class="empty">' + esc(menuCat === "favs" ? t("no_favs") : t("no_news")) + "</div>");
    }
    var tiles = [["plan", "my_plan", "plan"]].concat(CATS.map(function (c) { return [c, "c_" + c, c]; })).concat([["favs", "c_favs", "star"]]);
    var icon = { news: ICON.doc, company: ICON.home, benefits: ICON.raise, learning: ICON.requests, development: ICON.swap, guidelines: ICON.sick, plan: ICON.plan, star: ICON.star };
    return '<div class="top"><h1>' + esc(t("menu")) + '</h1><button class="back" aria-label="' + esc(t("search")) + '" data-go="search">' + ICON.search + "</button></div>" +
      '<div class="card" style="padding:4px 14px">' + tiles.map(function (x) {
        var n = x[0] === "plan" || x[0] === "favs" ? "" : posts().filter(function (p) { return (p.category || "news") === x[0]; }).length;
        return '<button class="row tap" style="width:100%;text-align:left" ' + (x[0] === "plan" ? 'data-tab="plan"' : 'data-cat="' + x[0] + '"') + '><span style="width:26px;display:grid;place-items:center">' + (icon[x[2]] || ICON.doc).replace("<svg ", '<svg width="24" height="24" ') +
          '</span><span class="grow t">' + esc(t(x[1])) + '</span><span class="muted small">' + (n || "") + ' ›</span></button>';
      }).join("") + "</div>";
  }

  /* ---------------- Search ---------------- */
  function searchScreen() {
    return '<div class="top"><button class="back" aria-label="Back" data-go="home">' + ICON.back + '</button><input class="in" id="q" type="search" placeholder="' + esc(t("search_ph")) + '" value="' + esc(query) + '" style="flex:1"></div><div id="hits">' + hits() + "</div>";
  }
  function hits() {
    var q = query.trim().toLowerCase(); if (q.length < 2) return "";
    var out = [];
    posts().forEach(function (p) { if ((p.title + " " + p.body).toLowerCase().indexOf(q) >= 0) out.push(postCard(p)); });
    (data.requests || []).forEach(function (r) { if ((r.text + " " + (r.answer || "")).toLowerCase().indexOf(q) >= 0) out.push('<button class="card row tap" style="width:100%;text-align:left;border:0" data-req="' + r.id + '"><span class="grow t">' + esc(r.text) + "</span>" + chip(r.status) + "</button>"); });
    var words = { plan: [t("plan"), t("my_plan"), "schicht", "shift", "βάρδια"], requests: [t("requests"), "urlaub", "leave", "άδεια", "krank", "sick"], chat: [t("chat"), "hr", "frage"], profile: [t("profile"), t("payslips"), "lohn", "pay", "dokument"] };
    Object.keys(words).forEach(function (k) { if (words[k].some(function (w) { return String(w).toLowerCase().indexOf(q) >= 0; })) out.unshift('<button class="card row tap" style="width:100%;text-align:left;border:0" data-tab="' + k + '"><span class="grow t">' + esc(t(k === "plan" ? "my_plan" : k)) + "</span>›</button>"); });
    return out.length ? out.join("") : '<div class="empty">' + esc(t("no_hits")) + "</div>";
  }
  function bindHits() {
    app.querySelectorAll("#hits [data-tab]").forEach(function (b) { b.onclick = function () { go(b.dataset.tab); }; });
    app.querySelectorAll("#hits [data-req]").forEach(function (b) { b.onclick = function () { reqSheet(+b.dataset.req); }; });
    app.querySelectorAll("#hits [data-fav]").forEach(function (b) { b.onclick = function () { toggleFav(b.dataset.fav); var r = app.querySelector("#hits"); r.innerHTML = hits(); bindHits(); }; });
  }

  /* ---------------- Plan ---------------- */
  function planScreen() {
    var h = '<div class="top"><button class="back" aria-label="Back" data-go="home">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("my_plan")) + '</h1></div><div class="seg" role="group"><button data-view="week" aria-pressed="' + (planView === "week") + '">' + esc(t("week")) +
      '</button><button data-view="month" aria-pressed="' + (planView === "month") + '">' + esc(t("month")) + "</button></div>";
    var now = new Date(), start = new Date(now.getFullYear(), now.getMonth(), now.getDate()), days = planView === "week" ? 14 : 35;
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // Monday
    var byDay = {}; (data.shifts || []).forEach(function (s) { (byDay[s.day] = byDay[s.day] || []).push(s); });
    var today = ymd(now);
    for (var w = 0; w < days / 7; w++) {
      var mon = new Date(start); mon.setDate(mon.getDate() + w * 7);
      var sun = new Date(mon); sun.setDate(sun.getDate() + 6); var total = 0, rows = "";
      for (var i = 0; i < 7; i++) {
        var d = new Date(mon); d.setDate(d.getDate() + i); var k = ymd(d), list = byDay[k] || [], lv = leaveOn(k);
        list.forEach(function (s) { total += mins(s.start, s.end, s.break_min); });
        var what = list.length ? list.map(function (s) { return "<div><b>" + esc(s.start + " – " + s.end) + "</b>" + (s.break_min ? ' <span class="muted small">' + esc(s.break_min + " min " + t("brk")) + "</span>" : "") + (s.note ? '<div class="muted small">' + esc(s.note) + "</div>" : "") + "</div>"; }).join("")
          : lv ? '<span class="chip ' + (lv.kind === "krank" ? "bad" : "ok") + '">' + esc(lv.kind === "krank" ? t("sick") : lv.kind === "unbezahlt" ? t("unpaid") : t("on_leave")) + "</span>"
          : '<span class="free">' + esc(t("free")) + "</span>";
        var len = list.reduce(function (a, s) { return a + mins(s.start, s.end, s.break_min); }, 0);
        rows += '<div class="day' + (k === today ? " today" : "") + '"><div class="d"><span class="small">' + esc(dayName(d)) + "</span><b>" + d.getDate() + "</b></div><div>" + what + '</div><div class="muted small">' + (len ? esc(hrs(len)) : "") + "</div></div>";
      }
      h += '<section class="week"><div class="week-head"><b>' + esc(short(ymd(mon)) + " – " + short(ymd(sun))) + '</b><span class="muted small">' + esc(t("total")) + " " + esc(hrs(total)) + "</span></div>" + rows + "</section>";
    }
    return h;
  }

  /* ---------------- Requests ---------------- */
  function requestsScreen() {
    var h = '<div class="top"><h1>' + esc(t("requests")) + "</h1></div><h2 style=\"margin-top:0\">" + esc(t("new_req")) + "</h2>";
    h += '<div class="actions">' + KINDS.map(function (k) { return '<button class="action" data-ask="' + k[0] + '">' + ICON[k[2]] + esc(t(k[1])) + "</button>"; }).join("") +
      '<button class="action" data-go="chat">' + ICON.chat + esc(t("ask_chat")) + "</button></div>";
    h += "<h2>" + esc(t("my_req")) + "</h2>";
    var reqs = data.requests || [];
    h += reqs.length ? '<div class="card" style="padding:4px 14px">' + reqs.map(function (r) {
      var k = KINDS.filter(function (x) { return x[0] === r.kind; })[0];
      return '<button class="row tap" style="width:100%;text-align:left" data-req="' + r.id + '"><div class="grow"><div class="t">' + esc(t(k ? k[1] : "ask_other")) + '</div><div class="muted small" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' +
        esc(new Date(r.at).toLocaleDateString(loc()) + " · " + (r.text || "")) + "</div></div>" + chip(r.status) + "</button>";
    }).join("") + "</div>" : '<div class="empty">' + esc(t("no_req")) + "</div>";
    var lv = (data.leave || []).filter(function (l) { return l.to >= ymd(new Date()); });
    if (lv.length) h += "<h2>" + esc(t("on_leave")) + '</h2><div class="card" style="padding:4px 14px">' + lv.map(function (l) {
      return '<div class="row"><div class="grow"><div class="t">' + esc(short(l.from) + " – " + short(l.to)) + '</div><div class="muted small">' +
        esc(l.kind === "krank" ? t("sick") : l.kind === "unbezahlt" ? t("unpaid") : t("on_leave")) + (l.days != null ? " · " + l.days + " " + t("days") : " · " + weekdays(l.from, l.to) + " " + t("days")) + "</div></div>" + chip(l.status) + "</div>";
    }).join("") + "</div>";
    return h;
  }

  function openSheet(inner, after) {
    closeSheet();
    var s = el('<div><div class="scrim"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>' + inner + "</div></div>");
    document.body.appendChild(s); sheet = s;
    s.querySelector(".scrim").onclick = closeSheet;
    var c = s.querySelector("[data-close]"); if (c) c.onclick = closeSheet;
    if (after) after(s);
  }
  function closeSheet() { if (sheet) { sheet.remove(); sheet = null; } }

  function askSheet(kind) {
    var k = KINDS.filter(function (x) { return x[0] === kind; })[0], today = ymd(new Date()), f = "";
    if (kind === "leave" || kind === "sick") f = '<div class="two"><div><label class="f" for="f1">' + esc(t("from")) + '</label><input class="in" type="date" id="f1" value="' + today + '"></div><div><label class="f" for="f2">' + esc(t("to")) + '</label><input class="in" type="date" id="f2" value="' + today + '"></div></div>' +
      (kind === "sick" ? '<p class="muted small">' + esc(t("sick_note")) + "</p>" : "");
    if (kind === "shift_swap") f = '<label class="f" for="f1">' + esc(t("date")) + '</label><input class="in" type="date" id="f1" value="' + today + '">';
    if (kind === "payslip") f = '<label class="f" for="f1">' + esc(t("which_month")) + '</label><input class="in" type="month" id="f1" value="' + today.slice(0, 7) + '">';
    if (kind === "document") f = '<label class="f" for="f1">' + esc(t("which_doc")) + '</label><input class="in" id="f1" placeholder="Arbeitsbescheinigung, Vertrag, …">';
    openSheet("<h2 style=\"margin-top:0\">" + esc(t(k[1])) + "</h2>" + f + '<label class="f" for="txt">' + esc(kind === "other" || kind === "raise" ? t("why") : t("msg")) + '</label><textarea class="in" id="txt"></textarea>' +
      '<div style="display:grid;gap:10px;margin-top:16px"><button class="btn" id="go">' + esc(t("send")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      s.querySelector("#go").onclick = function () {
        var b = this, txt = s.querySelector("#txt").value.trim(), d = {}, f1 = s.querySelector("#f1"), f2 = s.querySelector("#f2");
        if (kind === "leave" || kind === "sick") { d.from = f1.value; d.to = f2.value || f1.value; if (d.to < d.from) { var x = d.to; d.to = d.from; d.from = x; } }
        if (kind === "shift_swap") d.date = f1.value;
        if (kind === "payslip") d.month = f1.value;
        if (kind === "document") d.document = f1.value.trim();
        if (!txt && !Object.keys(d).length) return;
        b.disabled = true;
        rpc("team_request", { p_token: token, p_kind: kind, p_text: txt, p_details: d }).then(function (home) {
          data = home; closeSheet(); toast(t("sent")); tab = "requests"; render();
        }).catch(function (e) { b.disabled = false; toast(e.message); });
      };
    });
  }
  function reqSheet(id) {
    var r = (data.requests || []).filter(function (x) { return x.id === id; })[0]; if (!r) return;
    var k = KINDS.filter(function (x) { return x[0] === r.kind; })[0];
    var det = r.details && Object.keys(r.details).length ? '<p class="muted small">' + Object.keys(r.details).map(function (x) { return esc(x + ": " + r.details[x]); }).join(" · ") + "</p>" : "";
    openSheet('<h2 style="margin-top:0">' + esc(t(k ? k[1] : "ask_other")) + " " + chip(r.status) + '</h2><p class="muted small">' + esc(new Date(r.at).toLocaleString(loc())) + "</p>" + det +
      '<div class="card"><p style="margin:0;white-space:pre-wrap">' + esc(r.text || "—") + "</p></div>" +
      (r.answer ? '<h2>' + esc(t("agent")) + '</h2><div class="card" style="background:var(--mint-soft)"><p style="margin:0;white-space:pre-wrap">' + esc(r.answer) + "</p></div>" : "") +
      '<div style="margin-top:16px;display:grid;gap:10px"><button class="btn dark" id="tochat">' + esc(t("ask_chat")) + '</button><button class="btn ghost" data-close>OK</button></div>', function (s) {
      s.querySelector("#tochat").onclick = function () { closeSheet(); go("chat"); };
    });
  }

  /* ---------------- Chat ---------------- */
  function chatScreen() {
    app.innerHTML = '<div class="chat"><header class="chat-head"><button class="back" aria-label="Back" data-go="home">' + ICON.back + '</button><div class="avatar" aria-hidden="true"><i></i></div><div class="grow"><b>' + esc(t("chat_title")) +
      '</b><div class="muted small">' + esc(t("chat_sub")) + '</div></div></header><div class="msgs" id="msgs"></div>' +
      '<div class="quick">' + ["q1", "q2", "q3"].map(function (q) { return '<button type="button" data-qq="' + q + '">' + esc(t(q)) + "</button>"; }).join("") + "</div>" +
      '<form class="composer" id="form"><textarea id="box" rows="1" placeholder="' + esc(t("ph")) + '" aria-label="' + esc(t("msg")) + '"></textarea><button type="submit" aria-label="' + esc(t("send")) + '">' + ICON.send + "</button></form></div>";
    app.querySelector("[data-go]").onclick = function () { go("home"); };
    app.querySelectorAll("[data-qq]").forEach(function (b) { b.onclick = function () { sendChat(t(b.dataset.qq)); }; });
    var box = app.querySelector("#box");
    box.oninput = function () { box.style.height = "auto"; box.style.height = Math.min(box.scrollHeight, 120) + "px"; };
    box.onkeydown = function (e) { if (e.key === "Enter" && !e.shiftKey && window.matchMedia("(pointer:fine)").matches) { e.preventDefault(); app.querySelector("#form").requestSubmit(); } };
    app.querySelector("#form").onsubmit = function (e) { e.preventDefault(); var v = box.value.trim(); if (v) { box.value = ""; box.oninput(); sendChat(v); } };
    drawChat(true);
    pullChat();
    chatTimer = setInterval(pullChat, 3000);
  }
  function pullChat() {
    rpc("team_chat", { p_token: token, p_after: 0 }).then(function (list) { var changed = JSON.stringify(list) !== JSON.stringify(chat); chat = list || []; if (data) data.unread = 0; if (changed) drawChat(true); }).catch(function () {});
  }
  function drawChat(scroll) {
    var box = document.getElementById("msgs"); if (!box) return;
    if (!chat.length) { box.innerHTML = '<div class="empty">' + esc(t("chat_empty")) + "</div>"; return; }
    var last = chat[chat.length - 1];
    box.innerHTML = chat.map(function (m) {
      var me = m.sender === "employee";
      return '<div class="msg ' + (me ? "me" : "them" + (m.sender === "owner" ? " owner" : "")) + '">' + (me ? "" : '<span class="who">' + esc(m.sender === "owner" ? t("owner") : t("agent")) + "</span>") +
        esc(m.body) + '<span class="at">' + esc(clock(m.at)) + "</span></div>";
    }).join("") + (last.sender === "employee" ? '<div class="typing">' + esc(t("typing")) + "</div>" : "");
    if (scroll) box.scrollTop = box.scrollHeight;
  }
  function sendChat(text) {
    chat = chat.concat([{ id: -1, at: new Date().toISOString(), sender: "employee", body: text }]); drawChat(true);
    rpc("team_send", { p_token: token, p_body: text }).then(function (list) { chat = list || chat; drawChat(true); })
      .catch(function (e) { toast(e.message); chat = chat.filter(function (m) { return m.id !== -1; }); drawChat(true); });
  }

  /* ---------------- Profile ---------------- */
  function profileScreen() {
    var p = profile(), me = data.me || {};
    var secs = [["space", "sec_space"], ["cal", "sec_cal"], ["wallet", "sec_wallet"], ["dev", "sec_dev"], ["docs", "sec_docs"], ["set", "sec_set"]];
    var h = '<div class="top"><div><h1>' + esc(me.name || "") + '</h1><div class="muted">' + esc(p.role || (p.type ? t("t_" + p.type) : "")) + '</div></div><div class="avatar" aria-hidden="true"><i></i></div></div>' +
      '<div class="quick" style="padding:0;margin:0 0 6px">' + secs.map(function (x) {
        return '<button type="button" data-sec="' + x[0] + '" style="' + (profSec === x[0] ? "background:var(--ink);color:#fff;border-color:var(--ink);font-weight:700" : "") + '">' + esc(t(x[1])) + "</button>"; }).join("") + "</div>";
    return h + ({ space: secSpace, cal: secCal, wallet: secWallet, dev: secDev, docs: secDocs, set: secSet }[profSec] || secSpace)(p);
  }
  function rowsHtml(rows) { return rows.length ? '<div class="card" style="padding:4px 14px">' + rows.join("") + "</div>" : ""; }
  function kv(k, v) { return v == null || v === "" ? null : '<div class="row"><span class="grow muted">' + esc(k) + '</span><b style="text-align:right">' + esc(v) + "</b></div>"; }
  function secSpace(p) {
    var h = "<h2>" + esc(t("personal")) + "</h2>" + rowsHtml([kv(t("phone"), p.phone ? "+" + String(p.phone).replace(/^\+/, "") : ""), kv(t("start"), p.start ? parse(p.start).toLocaleDateString(loc()) : "")].filter(Boolean));
    var left = leaveLeft();
    h += "<h2>" + esc(t("contract")) + "</h2>" + rowsHtml([kv(t("type"), p.type ? t("t_" + p.type) : ""), kv(t("role"), p.role), kv(t("wage"), p.hourly_wage != null ? money(p.hourly_wage) : ""),
      kv(t("salary"), p.monthly_salary != null ? money(p.monthly_salary) : ""), kv(t("per_week"), p.days_per_week),
      kv(t("leave_year"), p.vacation_days_per_year != null ? p.vacation_days_per_year + " " + t("days") : ""), kv(t("leave_left"), left == null ? "" : left + " " + t("days"))].filter(Boolean));
    // Every other field the owner keeps is shown too (owner's choice: employees see all of their data).
    var known = ["name", "phone", "status", "type", "start", "hourly_wage", "monthly_salary", "days_per_week", "vacation_days_per_year", "documents", "role", "account"];
    var extra = Object.keys(p).filter(function (k) { return known.indexOf(k) < 0 && (typeof p[k] !== "object" || p[k] === null); }).map(function (k) { return kv(k.replace(/_/g, " "), String(p[k])); });
    if (extra.length) h += '<div style="margin-top:12px">' + rowsHtml(extra) + "</div>";
    h += "<h2>" + esc(t("documents")) + "</h2>" + docList(p);
    return h;
  }
  function docList(p) {
    var docs = p.documents || {}, names = DOC_NAMES[lang] || DOC_NAMES.de, keys = Object.keys(docs);
    return keys.length ? '<div class="card" style="padding:4px 14px">' + keys.map(function (k) {
      var d = docs[k] || {}, until = d.expires || d.ends, st = "";
      if (until) {
        var n = Math.round((parse(until) - parse(ymd(new Date()))) / 864e5);
        st = n < 0 ? '<span class="chip bad">' + esc(t("expired")) + "</span>" : n <= 60 ? '<span class="chip wait">' + esc(t("in_days", n)) + "</span>" : '<span class="chip ok">' + esc(t("expires") + " " + parse(until).toLocaleDateString(loc())) + "</span>";
      } else if (d.signed || d.done) st = '<span class="chip ok">' + esc((d.signed ? t("signed") : "✓") + " " + parse(d.signed || d.done).toLocaleDateString(loc())) + "</span>";
      return '<div class="row"><span class="grow t">' + esc(names[k] || k.replace(/_/g, " ")) + "</span>" + st + "</div>";
    }).join("") + "</div>" : '<div class="empty">' + esc(t("no_docs")) + "</div>";
  }
  function secCal() {
    var h = '<div class="seg" role="group" style="margin-top:10px">' + [["schedule", "schedule"], ["prefs", "prefs"], ["worked", "worked"]].map(function (x) {
      return '<button data-cal="' + x[0] + '" aria-pressed="' + (calView === x[0]) + '">' + esc(t(x[1])) + "</button>"; }).join("") + "</div>";
    if (calView === "prefs") return h + prefsEditor();
    if (calView === "worked") return h + workedHours();
    // Month grid: shift days in mint, leave in green, sick in red.
    var now = new Date(), m = calMonth || new Date(now.getFullYear(), now.getMonth(), 1), first = new Date(m.getFullYear(), m.getMonth(), 1);
    var byDay = {}; (data.shifts || []).forEach(function (s) { (byDay[s.day] = byDay[s.day] || []).push(s); });
    var cells = "", lead = (first.getDay() + 6) % 7, days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate(), today = ymd(now);
    for (var i = 0; i < lead; i++) cells += "<span></span>";
    for (var d = 1; d <= days; d++) {
      var k = ymd(new Date(m.getFullYear(), m.getMonth(), d)), sh = byDay[k], lv = leaveOn(k);
      var bg = sh ? "var(--mint)" : lv ? (lv.kind === "krank" ? "#fde7e5" : "var(--mint-soft)") : "transparent";
      cells += '<span style="aspect-ratio:1;display:grid;place-items:center;border-radius:12px;background:' + bg + ';' + (k === today ? "outline:2px solid var(--ink);" : "") + 'font-weight:' + (sh ? 800 : 500) + '">' + d + "</span>";
    }
    var wd = []; for (var j = 0; j < 7; j++) wd.push('<span class="muted small" style="text-align:center">' + esc(dayName(new Date(2024, 0, 1 + j), "narrow")) + "</span>");
    h += '<div class="card" style="margin-top:14px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><button class="back" data-mon="-1" aria-label="‹">‹</button><b>' +
      esc(m.toLocaleDateString(loc(), { month: "long", year: "numeric" })) + '</b><button class="back" data-mon="1" aria-label="›">›</button></div>' +
      '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px">' + wd.join("") + cells + "</div>" +
      '<div class="muted small" style="display:flex;gap:14px;margin-top:12px;flex-wrap:wrap"><span><b style="color:var(--deep)">■</b> ' + esc(t("plan")) + '</span><span><b style="color:#bfe9d1">■</b> ' + esc(t("on_leave")) + '</span><span><b style="color:#f6b8b2">■</b> ' + esc(t("sick")) + "</span></div></div>";
    return h + '<button class="btn ghost" style="margin-top:12px" data-tab="plan">' + esc(t("full_plan")) + "</button>";
  }
  function prefsEditor() {
    var pr = (data.prefs && data.prefs.days) || {}, rows = "";
    for (var j = 0; j < 7; j++) {
      var name = dayName(new Date(2024, 0, 1 + j), "short"), v = pr[j] || { ok: true, from: "06:00", to: "22:00" };
      rows += '<div class="row" data-pd="' + j + '"><label class="grow t" style="display:flex;align-items:center;gap:8px;min-width:64px"><input type="checkbox" ' + (v.ok ? "checked" : "") + ' style="width:22px;height:22px;accent-color:#1f8f52">' + esc(name) + "</label>" +
        '<input class="in" type="time" value="' + esc(v.from) + '" style="width:96px;padding:8px 6px"><span class="muted">–</span><input class="in" type="time" value="' + esc(v.to) + '" style="width:96px;padding:8px 6px"></div>';
    }
    return '<p class="muted small" style="margin:14px 2px">' + esc(t("prefs_sub")) + '</p><div class="card" style="padding:4px 12px">' + rows + "</div>" +
      '<label class="f" for="pnote">' + esc(t("msg")) + '</label><textarea class="in" id="pnote">' + esc((data.prefs && data.prefs.note) || "") + '</textarea><button class="btn" id="psave" style="margin-top:12px">' + esc(t("save")) + "</button>";
  }
  function workedHours() {
    var by = {}, today = ymd(new Date());
    (data.shifts || []).forEach(function (s) { if (s.day <= today) { var m = String(s.day).slice(0, 7); by[m] = (by[m] || 0) + mins(s.start, s.end, s.break_min); } });
    var keys = Object.keys(by).sort().reverse();
    return keys.length ? '<div class="card" style="padding:4px 14px;margin-top:14px">' + keys.map(function (k) {
      var m = k.split("-"); return kv(new Date(+m[0], +m[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" }), hrs(by[k]));
    }).join("") + "</div>" : '<div class="empty">—</div>';
  }
  function secWallet() {
    var slips = data.payslips || [];
    return "<h2>" + esc(t("movements")) + "</h2>" + (slips.length ? '<div class="card" style="padding:4px 14px">' + slips.map(function (s) {
      var m = s.month.split("-"), name = new Date(+m[0], +m[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" });
      return '<button class="row tap" style="width:100%;text-align:left" data-slip="' + esc(s.month) + '"><span class="grow"><span class="t">' + esc(name) + '</span><br><span class="muted small">' + esc(s.data && s.data.hours != null ? s.data.hours + " " + t("h") : "") + "</span></span><b>" + esc(money(s.data && (s.data.net != null ? s.data.net : s.data.gross))) + "</b></button>";
    }).join("") + "</div>" : '<div class="empty">' + esc(t("no_payslips")) + "</div>") +
      '<button class="btn ghost" style="margin-top:12px" data-ask="payslip">' + esc(t("ask_payslip")) + "</button>";
  }
  function secDev() {
    var list = posts().filter(function (p) { return p.category === "development" || p.category === "learning"; });
    return '<div style="margin-top:10px">' + list.map(postCard).join("") + "</div>";
  }
  function secDocs(p) {
    var docs = posts().filter(function (x) { return x.category === "documents"; });
    var h = "<h2>" + esc(t("payslips")) + "</h2>" + secWallet().replace(/<h2>.*?<\/h2>/, "").replace(/<button class="btn ghost"[^>]*data-ask="payslip">.*?<\/button>/, "");
    h += "<h2>" + esc(t("other_docs")) + "</h2>" + (docs.length ? '<div class="card" style="padding:4px 14px">' + docs.map(function (d) {
      return '<button class="row tap" style="width:100%;text-align:left" data-doc="' + esc(d.id) + '"><span class="grow"><span class="muted small">' + (d.read_at ? esc(t("read_on", new Date(d.read_at).toLocaleDateString(loc()))) : '<span class="chip info">' + esc(t("unread")) + "</span>") +
        '</span><br><span class="t">' + esc(d.title) + "</span></span>›</button>";
    }).join("") + "</div>" : '<div class="empty">' + esc(t("no_docs")) + "</div>");
    return h + "<h2>" + esc(t("documents")) + "</h2>" + docList(p);
  }
  function secSet() {
    var h = '<h2>' + esc(t("language")) + '</h2><div class="card"><div class="langs" style="margin-top:0"></div></div>';
    h += "<h2>" + esc(t("support")) + '</h2><div class="card" style="padding:4px 14px"><button class="row tap" style="width:100%;text-align:left" data-tab="chat"><span class="grow t">' + esc(t("chat_title")) + "</span>›</button>" +
      '<a class="row tap" style="color:inherit;text-decoration:none" href="https://wa.me/4915777104912" target="_blank" rel="noopener"><span class="grow t">WhatsApp</span>›</a></div>';
    h += "<h2>" + esc(t("policy")) + '</h2><div class="card"><p style="margin:0;line-height:1.45">' + esc(t("policy_text")) + "</p></div>";
    if (/iPhone|iPad/.test(navigator.userAgent) && !navigator.standalone) h += '<div class="card"><b>' + esc(t("install")) + '</b><div class="muted small">' + esc(t("install_ios")) + "</div></div>";
    return h + '<div style="margin-top:18px"><button class="btn ghost" id="signout">' + esc(t("signout")) + '</button></div><p class="muted small" style="text-align:center;margin-top:18px">© Transfer</p>';
  }
  function docSheet(id) {
    var d = posts().filter(function (x) { return String(x.id) === String(id); })[0]; if (!d) return;
    if (!d.read_at && !/^s/.test(String(d.id))) rpc("team_read", { p_token: token, p_post: +d.id }).then(function () { d.read_at = new Date().toISOString(); }).catch(function () {});
    openSheet('<h2 style="margin-top:0">' + esc(d.title) + '</h2><p class="muted small">' + esc(new Date(d.at).toLocaleDateString(loc())) + '</p><div class="card"><p style="margin:0;white-space:pre-wrap;line-height:1.45">' + esc(d.body) + '</p></div><button class="btn ghost" style="margin-top:16px" data-close>OK</button>');
  }
  function slipSheet(month) {
    var s = (data.payslips || []).filter(function (x) { return x.month === month; })[0]; if (!s) return;
    var d = s.data || {}, rows = "", m = month.split("-"), name = new Date(+m[0], +m[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" });
    Object.keys(d).forEach(function (k) {
      if (k === "month") return;
      var v = d[k], label = { hours: t("hours"), gross: t("gross"), net: t("net") }[k] || k.replace(/_/g, " ");
      rows += '<div class="row"><span class="grow muted">' + esc(label) + "</span><b>" + esc(typeof v === "number" && k !== "hours" ? money(v) : v) + "</b></div>";
    });
    openSheet('<h2 style="margin-top:0">' + esc(t("payslips") + " · " + name) + '</h2><div class="card" style="padding:4px 14px">' + rows + '</div><button class="btn ghost" style="margin-top:16px" data-close>OK</button>');
  }

  /* ---------------- demo data (never sent anywhere) ---------------- */
  var Demo = (function () {
    function d(n) { var x = new Date(); x.setDate(x.getDate() + n); return ymd(x); }
    var msgs = [], reqs = [{ id: 1, at: new Date(Date.now() - 2 * 864e5).toISOString(), kind: "leave", text: "Urlaub für Familienbesuch", details: { from: d(20), to: d(24) }, status: "with_owner", answer: "Danke, ich habe deinen Urlaub an den Chef weitergegeben. Du bekommst Bescheid, sobald er entschieden hat." }];
    var home = {
      me: { id: "demo", name: "Max Testfahrer" },
      profile: { phone: "4915100000000", type: "minijob", start: "2026-09-01", hourly_wage: 13.9, days_per_week: 2, vacation_days_per_year: 10, role: "Fahrer",
        documents: { fuehrerschein: { expires: "2031-04-30" }, p_schein: { expires: d(40) }, arbeitsvertrag: { signed: "2026-08-28" }, sofortmeldung: { done: "2026-08-31" } } },
      shifts: [-6, -5, -1, 0, 2, 3, 9, 10].map(function (n, i) { return { id: i, day: d(n), start: n % 2 ? "06:00" : "15:00", end: n % 2 ? "12:00" : "21:30", break_min: n % 2 ? 0 : 30, note: n === 2 ? "Flughafen" : null }; }),
      leave: [{ id: 1, from: d(20), to: d(24), kind: "urlaub", status: "requested" }, { id: 2, from: "2026-08-10", to: "2026-08-12", kind: "urlaub", status: "approved" }],
      requests: reqs,
      payslips: [{ month: "2026-10", data: { hours: 38.5, gross: 535.15, net: 535.15, hinweis: "Minijob, keine Abzüge" } }],
      prefs: {},
      posts: [{ id: 2, at: new Date().toISOString(), category: "documents", title: "Information Urlaubskonto 2026", body: "Dein Urlaubsanspruch 2026: 10 Tage. Genommen: 3. Resturlaub verfällt am 31.03.2027.", read_at: null },
        { id: 1, at: new Date().toISOString(), title: "Willkommen bei Transfer Team", body: "Hier siehst du deinen Plan, deinen Urlaub und deine Anträge. Fragen? Schreib dem HR-Assistenten.", pinned: true }],
      unread: 0
    };
    return { rpc: function (fn, a) {
      return new Promise(function (ok) { setTimeout(function () {
        if (fn === "driver_login") return ok({ token: "demo", driver: home.me });
        if (fn === "team_home") return ok(JSON.parse(JSON.stringify(home)));
        if (fn === "team_chat") return ok(msgs.slice());
        if (fn === "team_send") {
          msgs.push({ id: msgs.length + 1, at: new Date().toISOString(), sender: "employee", body: a.p_body });
          setTimeout(function () { msgs.push({ id: msgs.length + 1, at: new Date().toISOString(), sender: "agent",
            body: "(Beispiel) Du hast noch 7 Urlaubstage in diesem Jahr. Deine nächste Schicht: " + dateLabel(d(0)) + " 15:00 – 21:30." }); }, 2500);
          return ok(msgs.slice());
        }
        if (fn === "team_prefs") { home.prefs = a.p_prefs; return ok(JSON.parse(JSON.stringify(home))); }
        if (fn === "team_read") { home.posts.forEach(function (p) { if (p.id === a.p_post) p.read_at = new Date().toISOString(); }); return ok({ ok: true }); }
        if (fn === "team_request") { reqs.unshift({ id: reqs.length + 1, at: new Date().toISOString(), kind: a.p_kind, text: a.p_text, details: a.p_details, status: "open" }); return ok(JSON.parse(JSON.stringify(home))); }
        ok(null);
      }, 250); });
    } };
  })();

  if (token) start(); else pinScreen();
})();

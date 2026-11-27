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
      dup_hint: "Schon einmal gesendet – zählt nicht doppelt.", owed2: "Bekommst du zurück",
      up_tab: "Hochladen", up_title: "Belege & Dokumente", up_intro: "Beleg, Krankmeldung, TÜV-Bericht, Werkstattrechnung, Führerschein, Brief – einfach fotografieren. Der Assistent erkennt, was es ist, und gibt es an die richtige Person.", up_list: "Meine Uploads", up_what: "Was ist es?", up_receipt: "Beleg (Geld ausgegeben)", up_doc: "Anderes Dokument", up_doc_hint: "Krankmeldung, TÜV, Brief, Führerschein … Der Assistent erkennt es selbst.", rs_filed: "Abgelegt", goes_to: "Geht an {n}", to_hr: "Lisa (HR)", to_fleet: "Daniel (Fahrzeuge)", to_owner: "den Chef", photo_gone: "Foto aus Datenschutzgründen gelöscht", reading_doc: "Der Assistent erkennt, was es ist, und gibt es weiter – etwa 30 Sekunden.", sick_from_to: "Krank {n}", valid_until: "Gültig bis {n}", hu_next: "Nächste HU {n}", deadline: "Frist {n}", signed_on: "Unterschrieben {n}", paid_none: "Nichts bezahlt", cat_inspection: "TÜV / HU", leave_this_year: "Urlaub {n} (gesetzlich)", leave_calc: "{d} Tage/Woche × 4 = {f} Tage im Jahr", leave_part: "{m} volle Monate → {n} Tage in diesem Jahr",
      dk_receipt: "Beleg", dk_car_invoice: "Werkstattrechnung", dk_hu_report: "TÜV-/HU-Bericht", dk_sick_note: "Krankmeldung", dk_licence: "Führerschein", dk_p_schein: "P-Schein", dk_id_card: "Ausweis", dk_work_permit: "Aufenthaltstitel", dk_contract: "Arbeitsvertrag", dk_insurance: "Versicherungsbrief", dk_fine: "Bußgeld / Anhörung", dk_car_letter: "Fahrzeug-Schreiben", dk_hr_letter: "Brief (Krankenkasse/Behörde)", dk_other: "Dokument",
      my_receipts: "Meine Belege", receipts_intro: "Auch alte Fotos aus der Galerie, mehrere auf einmal. Der Assistent liest jeden Beleg in etwa 30 Sekunden und zeigt hier, was er gelesen hat.", reading_hint: "Der Assistent liest Geschäft, Datum, Betrag und MwSt. – dauert etwa 30 Sekunden.", uploaded_at: "Gesendet um {n}", sent_on: "Gesendet {n}", yesterday: "Gestern", read_done: "Gelesen", vat: "MwSt.", on_receipt: "Auf dem Beleg", pm_cash: "Barzahlung", pm_card: "Karte", confirm_tap: "Tippe auf den blau markierten Beleg.", cat_fuel: "Tanken", cat_charging: "Laden", cat_wash: "Wäsche", cat_parking: "Parken", cat_toll: "Maut", cat_repair: "Werkstatt", cat_car_care: "Fahrzeugpflege", cat_office: "Büro", cat_phone: "Telefon", cat_food: "Essen", cat_other: "Sonstiges",
      receipt_gallery: "Aus der Galerie", receipt_paid_hint: "Gilt für alle gewählten Fotos. Steht auf dem Beleg etwas anderes, fragt der Assistent nach.", send_n: "{n} Belege senden", receipts_done: "{n} Belege gesendet. Der HR-Assistent liest sie gleich.", receipts_done_dup: "{n} gesendet, {d} waren schon da und zählen nicht doppelt.",
      paid_company: "Firmengeld / Firmenkarte", confirm_q: "Wessen Geld war das?", confirm_own_cash: "Mein eigenes Bargeld", confirm_own_card: "Meine eigene Karte", confirm_company: "Geld der Firma", rs_confirm: "Bitte bestätigen", confirm_home: "{n} Beleg(e) warten auf deine Bestätigung", rs_approve: "Aus E-Mail – zählt?", mail_from: "📧 aus E-Mail", ap_q: "Zählt dieser Beleg für die Firma?", ap_yes: "✓ Passt", ap_no: "✕ Abbrechen", ap_ok: "Zählt jetzt", ap_cancelled: "Abgebrochen – zählt nicht", flags_t: "Hinweis",
      ask_receipt: "Beleg", receipt_title: "Beleg hinzufügen", receipt_take: "Foto aufnehmen", receipt_again: "Anderes Foto", paid_how: "Wie bezahlt?", paid_cash: "Bar (eigenes Geld)", paid_card: "Eigene Karte", paid_fuelcard: "Tankkarte", receipt_note: "Wofür? (optional)", receipt_sent: "Beleg gesendet. Der HR-Assistent liest ihn gleich.", receipt_dup: "Diesen Beleg hast du schon am {n} gesendet. Er wird nicht doppelt gezählt.", receipts: "Belege", owed: "Bar ausgelegt – bekommst du zurück", no_receipts: "Noch keine Belege.", rs_new: "Wird gelesen", rs_read: "Gelesen", rs_duplicate: "Doppelt", rs_approved: "Bestätigt", rs_rejected: "Abgelehnt", rs_settled: "Ausgezahlt", receipt_hint: "Das ganze Blatt flach und gut beleuchtet fotografieren.",
      check: "Für Kontrollen", check_sub: "Zoll · Polizei · Ordnungsamt", check_note: "Zeig diese Seite bei einer Kontrolle. Ausweis oder Pass zusätzlich vorzeigen.", show_contract: "Arbeitsvertrag anzeigen", no_contract: "Der Vertrag ist noch nicht hinterlegt. Frag den Chef.", doc_ph: "Arbeitsbescheinigung, Vertrag, …",
      sec_space: "Mein Bereich", sec_cal: "Kalender", sec_wallet: "Geld", sec_dev: "Entwicklung", sec_docs: "Dokumente", sec_set: "Einstellungen", schedule: "Plan", prefs: "Wünsche", worked: "Gearbeitete Stunden", prefs_sub: "Wann arbeitest du am liebsten? Der Chef sieht das beim Planen.", can: "kann", cannot: "nicht", save: "Speichern", saved: "Gespeichert", movements: "Zahlungen", read_on: "Gelesen am {n}", unread: "Neu", support: "Hilfe", policy: "Nutzungsregeln", policy_text: "Transfer Team ist nur für Mitarbeiter von Transfer. Melde dich nicht auf fremden Geräten an, gib deinen PIN nicht weiter. Was du hier siehst, sind deine persönlichen Daten: bitte nicht weitergeben. Fragen an den HR-Assistenten werden auf dem Rechner der Personalverwaltung beantwortet; Entscheidungen trifft der Chef.", other_docs: "Weitere Dokumente",
      menu: "Menü", search: "Suche", search_ph: "Suchen: Urlaub, Schicht, Regeln …", no_hits: "Nichts gefunden.", c_news: "Neuigkeiten", c_company: "Über Transfer", c_benefits: "Vorteile", c_learning: "Lernen", c_development: "Entwicklung", c_guidelines: "Richtlinien", c_favs: "Favoriten", no_favs: "Tippe bei einem Beitrag auf ☆, um ihn hier zu sammeln.", full_plan: "Ganzer Plan", my_plan: "Mein Plan",
      app: "Team", pin: "PIN eingeben", pin_sub: "Dein 4-stelliger PIN", mobile_no: "Deine Handynummer", phone_bad: "Bitte die Handynummer prüfen.", wrong: "Falscher PIN. Noch {n} Versuche.",
      locked: "Zu viele Versuche. Bitte später noch einmal.", offline: "Keine Verbindung. Bitte später noch einmal.",
      home: "Start", plan: "Plan", requests: "Anträge", chat: "HR-Chat", profile: "Profil",
      tm_title: "Team", tm_owner: "Nur für dich als Inhaber", tm_last: "Zuletzt in der App: {n}", tm_never: "Noch nie angemeldet", tm_newpin: "Neuer PIN", tm_newpin_q: "{n} bekommt einen neuen PIN. Alte Handys werden abgemeldet, alle Daten bleiben. Weiter?", tm_pin_is: "Neuer PIN für {n}: {p}", tm_pin_tell: "Sag ihn persönlich weiter. Er wird nicht noch einmal angezeigt.", tm_phone: "Handynummer ändern", tm_phone_q: "Neue Handynummer für {n}:", tm_kept: "Alle Daten bleiben: Plan, Urlaub, Belege, Dokumente, Chat.", tm_plan: "Nächste Termine", tm_docs: "Dokumente", tm_rcpt: "Belege", tm_req: "Offene Anträge", tm_none: "Nichts", seg_rcpt: "Belege", seg_docs: "Unterlagen", seg_proof: "Nachweise", all_months: "Alle", sum_total: "Summe", sum_vat: "davon MwSt", sum_counted: "zählt", inv_missing: "Rechnung fehlt", inv_missing_top: "Hier fehlt noch die echte Rechnung", seg_empty: "Hier ist noch nichts.", dk_payment_confirmation: "Zahlungsnachweis", dk_order_confirmation: "Bestellbestätigung", hello: "Hallo {n}", duties: "Zu erledigen", due_by: "bis {n}", next_shift: "Deine nächste Schicht", no_shift: "Keine Schicht geplant", today: "Heute", tomorrow: "Morgen",
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
      chat_title: "HR-Assistent", chat_sub: "Versteht jede Sprache · antwortet sofort",
      chat_empty: "Schreib in deiner Sprache – Deutsch, Englisch, Griechisch, Türkisch, Arabisch, Rumänisch oder jede andere. Frag alles zu Schichten, Urlaub, Lohn, Dokumenten oder Regeln. Über Geld, Urlaub und Verträge entscheidet der Chef.",
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
      dup_hint: "Already sent before – not counted twice.", owed2: "You get this back",
      up_tab: "Upload", up_title: "Receipts & documents", up_intro: "Receipt, sick note, TÜV report, workshop invoice, driving licence, letter – just take a photo. The assistant sees what it is and passes it to the right person.", up_list: "My uploads", up_what: "What is it?", up_receipt: "Receipt (money spent)", up_doc: "Other document", up_doc_hint: "Sick note, TÜV, letter, licence … The assistant recognises it.", rs_filed: "Filed", goes_to: "Goes to {n}", to_hr: "Lisa (HR)", to_fleet: "Daniel (vehicles)", to_owner: "the boss", photo_gone: "Photo deleted for data protection", reading_doc: "The assistant sees what it is and passes it on – about 30 seconds.", sick_from_to: "Sick {n}", valid_until: "Valid until {n}", hu_next: "Next TÜV {n}", deadline: "Deadline {n}", signed_on: "Signed {n}", paid_none: "Nothing paid", cat_inspection: "TÜV / HU", leave_this_year: "Leave {n} (by law)", leave_calc: "{d} days/week × 4 = {f} days a year", leave_part: "{m} full months → {n} days this year",
      dk_receipt: "Receipt", dk_car_invoice: "Workshop invoice", dk_hu_report: "TÜV/HU report", dk_sick_note: "Sick note", dk_licence: "Driving licence", dk_p_schein: "P-Schein", dk_id_card: "ID card", dk_work_permit: "Residence permit", dk_contract: "Employment contract", dk_insurance: "Insurance letter", dk_fine: "Fine / hearing", dk_car_letter: "Vehicle letter", dk_hr_letter: "Letter (insurer/authority)", dk_other: "Document",
      my_receipts: "My receipts", receipts_intro: "Old photos from the gallery too, several at once. The assistant reads each receipt in about 30 seconds and shows here what it read.", reading_hint: "The assistant reads shop, date, amount and VAT – takes about 30 seconds.", uploaded_at: "Sent at {n}", sent_on: "Sent {n}", yesterday: "Yesterday", read_done: "Read", vat: "VAT", on_receipt: "On the receipt", pm_cash: "cash", pm_card: "card", confirm_tap: "Tap the receipt marked in blue.", cat_fuel: "Fuel", cat_charging: "Charging", cat_wash: "Car wash", cat_parking: "Parking", cat_toll: "Toll", cat_repair: "Garage", cat_car_care: "Car care", cat_office: "Office", cat_phone: "Phone", cat_food: "Food", cat_other: "Other",
      receipt_gallery: "From the gallery", receipt_paid_hint: "Applies to all chosen photos. If the receipt says otherwise, the assistant asks you.", send_n: "Send {n} receipts", receipts_done: "{n} receipts sent. The HR assistant reads them in a moment.", receipts_done_dup: "{n} sent, {d} were already there and are not counted twice.",
      paid_company: "Company money / card", confirm_q: "Whose money was it?", confirm_own_cash: "My own cash", confirm_own_card: "My own card", confirm_company: "Company money", rs_confirm: "Please confirm", confirm_home: "{n} receipt(s) wait for your confirmation", rs_approve: "From e-mail – counts?", mail_from: "📧 from e-mail", ap_q: "Does this receipt count for the business?", ap_yes: "✓ Passes", ap_no: "✕ Cancel", ap_ok: "Counts now", ap_cancelled: "Cancelled – does not count", flags_t: "Note",
      ask_receipt: "Receipt", receipt_title: "Add a receipt", receipt_take: "Take photo", receipt_again: "Another photo", paid_how: "How was it paid?", paid_cash: "Cash (my own money)", paid_card: "My own card", paid_fuelcard: "Fuel card", receipt_note: "What for? (optional)", receipt_sent: "Receipt sent. The HR assistant reads it in a moment.", receipt_dup: "You already sent this receipt on {n}. It is not counted twice.", receipts: "Receipts", owed: "Paid in cash – you get it back", no_receipts: "No receipts yet.", rs_new: "Being read", rs_read: "Read", rs_duplicate: "Duplicate", rs_approved: "Approved", rs_rejected: "Declined", rs_settled: "Paid back", receipt_hint: "Photograph the whole page, flat and well lit.",
      check: "For checks", check_sub: "Customs · police · public order office", check_note: "Show this page at a check. Also show your ID card or passport.", show_contract: "Show employment contract", no_contract: "The contract is not stored yet. Ask the boss.", doc_ph: "Employment certificate, contract, …",
      sec_space: "My space", sec_cal: "Calendar", sec_wallet: "Money", sec_dev: "Development", sec_docs: "Documents", sec_set: "Settings", schedule: "Schedule", prefs: "Wishes", worked: "Worked hours", prefs_sub: "When do you like to work? The boss sees this when planning.", can: "can", cannot: "no", save: "Save", saved: "Saved", movements: "Payments", read_on: "Read on {n}", unread: "New", support: "Help", policy: "Usage rules", policy_text: "Transfer Team is only for Transfer staff. Do not sign in on other people's devices and do not share your PIN. What you see here is your personal data: please keep it to yourself. HR assistant questions are answered on the HR computer; the boss makes the decisions.", other_docs: "Other documents",
      menu: "Menu", search: "Search", search_ph: "Search: leave, shift, rules …", no_hits: "Nothing found.", c_news: "News", c_company: "About Transfer", c_benefits: "Benefits", c_learning: "Learning", c_development: "Development", c_guidelines: "Guidelines", c_favs: "Favourites", no_favs: "Tap ☆ on a post to keep it here.", full_plan: "Full schedule", my_plan: "My schedule",
      app: "Team", pin: "Enter your PIN", pin_sub: "Your 4-digit PIN", mobile_no: "Your mobile number", phone_bad: "Please check the mobile number.", wrong: "Wrong PIN. {n} tries left.",
      locked: "Too many tries. Please try later.", offline: "No connection. Please try later.",
      home: "Home", plan: "Schedule", requests: "Requests", chat: "HR chat", profile: "Profile",
      tm_title: "Team", tm_owner: "Only for you as the owner", tm_last: "Last in the app: {n}", tm_never: "Never signed in", tm_newpin: "New PIN", tm_newpin_q: "{n} gets a new PIN. Old phones are signed out, all data stays. Continue?", tm_pin_is: "New PIN for {n}: {p}", tm_pin_tell: "Tell it in person. It is not shown again.", tm_phone: "Change mobile number", tm_phone_q: "New mobile number for {n}:", tm_kept: "All data stays: plan, leave, receipts, documents, chat.", tm_plan: "Next dates", tm_docs: "Documents", tm_rcpt: "Receipts", tm_req: "Open requests", tm_none: "Nothing", seg_rcpt: "Receipts", seg_docs: "Documents", seg_proof: "Proofs", all_months: "All", sum_total: "Total", sum_vat: "VAT in it", sum_counted: "counted", inv_missing: "Invoice missing", inv_missing_top: "The real invoice is still missing", seg_empty: "Nothing here yet.", dk_payment_confirmation: "Proof of payment", dk_order_confirmation: "Order confirmation", hello: "Hi {n}", duties: "To do", due_by: "by {n}", next_shift: "Your next shift", no_shift: "No shift planned", today: "Today", tomorrow: "Tomorrow",
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
      chat_title: "HR assistant", chat_sub: "Understands every language · answers at once",
      chat_empty: "Write in your own language – English, German, Greek, Turkish, Arabic, Romanian or any other. Ask anything about shifts, leave, pay, documents or rules. The boss decides about money, leave and contracts.",
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
      dup_hint: "Έχει ξανασταλεί – δεν μετράει δύο φορές.", owed2: "Θα σου επιστραφούν",
      up_tab: "Ανέβασμα", up_title: "Αποδείξεις & έγγραφα", up_intro: "Απόδειξη, αναρρωτική, έκθεση TÜV, τιμολόγιο συνεργείου, δίπλωμα, γράμμα – απλώς βγάλε φωτογραφία. Ο βοηθός καταλαβαίνει τι είναι και το δίνει στον σωστό άνθρωπο.", up_list: "Τι ανέβασα", up_what: "Τι είναι;", up_receipt: "Απόδειξη (ξόδεψα χρήματα)", up_doc: "Άλλο έγγραφο", up_doc_hint: "Αναρρωτική, TÜV, γράμμα, δίπλωμα … Ο βοηθός το αναγνωρίζει μόνος του.", rs_filed: "Αρχειοθετήθηκε", goes_to: "Πηγαίνει {n}", to_hr: "στη Lisa (HR)", to_fleet: "στον Daniel (οχήματα)", to_owner: "στο αφεντικό", photo_gone: "Η φωτογραφία σβήστηκε για προστασία δεδομένων", reading_doc: "Ο βοηθός καταλαβαίνει τι είναι και το προωθεί – περίπου 30 δευτερόλεπτα.", sick_from_to: "Άρρωστος {n}", valid_until: "Ισχύει έως {n}", hu_next: "Επόμενο TÜV {n}", deadline: "Προθεσμία {n}", signed_on: "Υπογράφηκε {n}", paid_none: "Δεν πληρώθηκε τίποτα", cat_inspection: "TÜV / HU", leave_this_year: "Άδεια {n} (κατά τον νόμο)", leave_calc: "{d} μέρες/εβδομάδα × 4 = {f} μέρες τον χρόνο", leave_part: "{m} πλήρεις μήνες → {n} μέρες φέτος",
      dk_receipt: "Απόδειξη", dk_car_invoice: "Τιμολόγιο συνεργείου", dk_hu_report: "Έκθεση TÜV/HU", dk_sick_note: "Αναρρωτική", dk_licence: "Δίπλωμα οδήγησης", dk_p_schein: "P-Schein", dk_id_card: "Ταυτότητα", dk_work_permit: "Άδεια διαμονής", dk_contract: "Σύμβαση εργασίας", dk_insurance: "Επιστολή ασφάλειας", dk_fine: "Πρόστιμο / ακρόαση", dk_car_letter: "Έγγραφο οχήματος", dk_hr_letter: "Επιστολή (ταμείο/αρχή)", dk_other: "Έγγραφο",
      my_receipts: "Οι αποδείξεις μου", receipts_intro: "Και παλιές φωτογραφίες από τη συλλογή, πολλές μαζί. Ο βοηθός διαβάζει κάθε απόδειξη σε περίπου 30 δευτερόλεπτα και σου δείχνει εδώ τι διάβασε.", reading_hint: "Ο βοηθός διαβάζει κατάστημα, ημερομηνία, ποσό και ΦΠΑ – περίπου 30 δευτερόλεπτα.", uploaded_at: "Στάλθηκε {n}", sent_on: "Στάλθηκαν {n}", yesterday: "Χθες", read_done: "Διαβάστηκε", vat: "ΦΠΑ", on_receipt: "Στην απόδειξη", pm_cash: "μετρητά", pm_card: "κάρτα", confirm_tap: "Πάτα την απόδειξη με το μπλε σήμα.", cat_fuel: "Καύσιμα", cat_charging: "Φόρτιση", cat_wash: "Πλύσιμο", cat_parking: "Στάθμευση", cat_toll: "Διόδια", cat_repair: "Συνεργείο", cat_car_care: "Περιποίηση", cat_office: "Γραφείο", cat_phone: "Τηλέφωνο", cat_food: "Φαγητό", cat_other: "Άλλο",
      receipt_gallery: "Από τη συλλογή", receipt_paid_hint: "Ισχύει για όλες τις φωτογραφίες. Αν η απόδειξη γράφει κάτι άλλο, ο βοηθός θα σε ρωτήσει.", send_n: "Αποστολή {n} αποδείξεων", receipts_done: "Στάλθηκαν {n} αποδείξεις. Ο βοηθός HR τις διαβάζει σε λίγο.", receipts_done_dup: "Στάλθηκαν {n}, οι {d} υπήρχαν ήδη και δεν μετράνε δύο φορές.",
      paid_company: "Χρήματα/κάρτα εταιρείας", confirm_q: "Τίνος χρήματα ήταν;", confirm_own_cash: "Δικά μου μετρητά", confirm_own_card: "Δική μου κάρτα", confirm_company: "Χρήματα της εταιρείας", rs_confirm: "Επιβεβαίωσε", confirm_home: "{n} απόδειξη(εις) περιμένουν επιβεβαίωση", rs_approve: "Από email – μετράει;", mail_from: "📧 από email", ap_q: "Μετράει αυτή η απόδειξη για την επιχείρηση;", ap_yes: "✓ Περνάει", ap_no: "✕ Ακύρωση", ap_ok: "Μετράει τώρα", ap_cancelled: "Ακυρώθηκε – δεν μετράει", flags_t: "Σημείωση",
      ask_receipt: "Απόδειξη", receipt_title: "Προσθήκη απόδειξης", receipt_take: "Λήψη φωτογραφίας", receipt_again: "Άλλη φωτογραφία", paid_how: "Πώς πληρώθηκε;", paid_cash: "Μετρητά (δικά μου)", paid_card: "Δική μου κάρτα", paid_fuelcard: "Κάρτα καυσίμων", receipt_note: "Για τι; (προαιρετικά)", receipt_sent: "Η απόδειξη στάλθηκε. Ο βοηθός HR τη διαβάζει σε λίγο.", receipt_dup: "Αυτή την απόδειξη την έστειλες ήδη στις {n}. Δεν μετράει δύο φορές.", receipts: "Αποδείξεις", owed: "Πλήρωσες μετρητά – σου επιστρέφονται", no_receipts: "Καμία απόδειξη ακόμα.", rs_new: "Διαβάζεται", rs_read: "Διαβάστηκε", rs_duplicate: "Διπλή", rs_approved: "Εγκρίθηκε", rs_rejected: "Απορρίφθηκε", rs_settled: "Επιστράφηκε", receipt_hint: "Φωτογράφισε ολόκληρη τη σελίδα, ίσια και με καλό φως.",
      check: "Για ελέγχους", check_sub: "Zoll · Αστυνομία · Ordnungsamt", check_note: "Δείξε αυτή τη σελίδα σε έλεγχο. Δείξε επίσης ταυτότητα ή διαβατήριο.", show_contract: "Εμφάνιση σύμβασης εργασίας", no_contract: "Η σύμβαση δεν έχει καταχωριστεί ακόμα. Ρώτα το αφεντικό.", doc_ph: "Βεβαίωση εργασίας, σύμβαση, …",
      sec_space: "Ο χώρος μου", sec_cal: "Ημερολόγιο", sec_wallet: "Χρήματα", sec_dev: "Εξέλιξη", sec_docs: "Έγγραφα", sec_set: "Ρυθμίσεις", schedule: "Πρόγραμμα", prefs: "Προτιμήσεις", worked: "Ώρες εργασίας", prefs_sub: "Πότε προτιμάς να δουλεύεις; Το αφεντικό το βλέπει όταν φτιάχνει το πρόγραμμα.", can: "μπορώ", cannot: "όχι", save: "Αποθήκευση", saved: "Αποθηκεύτηκε", movements: "Πληρωμές", read_on: "Διαβάστηκε {n}", unread: "Νέο", support: "Βοήθεια", policy: "Κανόνες χρήσης", policy_text: "Το Transfer Team είναι μόνο για το προσωπικό του Transfer. Μη συνδέεσαι σε ξένες συσκευές και μη δίνεις το PIN σου. Όσα βλέπεις εδώ είναι προσωπικά σου στοιχεία: κράτα τα για σένα. Τις ερωτήσεις στον βοηθό HR τις απαντά ο υπολογιστής του HR· τις αποφάσεις τις παίρνει το αφεντικό.", other_docs: "Άλλα έγγραφα",
      menu: "Μενού", search: "Αναζήτηση", search_ph: "Αναζήτηση: άδεια, βάρδια, κανόνες …", no_hits: "Δεν βρέθηκε τίποτα.", c_news: "Νέα", c_company: "Για το Transfer", c_benefits: "Παροχές", c_learning: "Εκπαίδευση", c_development: "Εξέλιξη", c_guidelines: "Κανόνες", c_favs: "Αγαπημένα", no_favs: "Πάτα ☆ σε μια ανάρτηση για να τη βρίσκεις εδώ.", full_plan: "Όλο το πρόγραμμα", my_plan: "Το πρόγραμμά μου",
      app: "Team", pin: "Βάλε το PIN", pin_sub: "Το 4ψήφιο PIN σου", mobile_no: "Το κινητό σου", phone_bad: "Έλεγξε τον αριθμό του κινητού.", wrong: "Λάθος PIN. Απομένουν {n} προσπάθειες.",
      locked: "Πολλές προσπάθειες. Δοκίμασε αργότερα.", offline: "Χωρίς σύνδεση. Δοκίμασε αργότερα.",
      home: "Αρχική", plan: "Πρόγραμμα", requests: "Αιτήματα", chat: "Chat HR", profile: "Προφίλ",
      tm_title: "Ομάδα", tm_owner: "Μόνο για σένα ως ιδιοκτήτη", tm_last: "Τελευταία φορά στην εφαρμογή: {n}", tm_never: "Δεν έχει συνδεθεί ακόμα", tm_newpin: "Νέο PIN", tm_newpin_q: "Ο/Η {n} θα πάρει νέο PIN. Τα παλιά κινητά αποσυνδέονται, όλα τα δεδομένα μένουν. Συνέχεια;", tm_pin_is: "Νέο PIN για {n}: {p}", tm_pin_tell: "Πες το του προσωπικά. Δεν θα ξαναφανεί.", tm_phone: "Αλλαγή κινητού", tm_phone_q: "Νέο κινητό για {n}:", tm_kept: "Όλα τα δεδομένα μένουν: πρόγραμμα, άδειες, αποδείξεις, έγγραφα, chat.", tm_plan: "Επόμενα ραντεβού", tm_docs: "Έγγραφα", tm_rcpt: "Αποδείξεις", tm_req: "Ανοιχτά αιτήματα", tm_none: "Τίποτα", seg_rcpt: "Αποδείξεις", seg_docs: "Δικαιολογητικά", seg_proof: "Αποδεικτικά", all_months: "Όλα", sum_total: "Σύνολο", sum_vat: "από αυτά ΦΠΑ", sum_counted: "μετράνε", inv_missing: "Λείπει τιμολόγιο", inv_missing_top: "Εδώ λείπει ακόμα το κανονικό τιμολόγιο", seg_empty: "Δεν υπάρχει τίποτα εδώ ακόμα.", dk_payment_confirmation: "Αποδεικτικό πληρωμής", dk_order_confirmation: "Επιβεβαίωση παραγγελίας", hello: "Γεια σου {n}", duties: "Υποχρεώσεις", due_by: "έως {n}", next_shift: "Η επόμενη βάρδια σου", no_shift: "Καμία βάρδια", today: "Σήμερα", tomorrow: "Αύριο",
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
      chat_title: "Βοηθός HR", chat_sub: "Καταλαβαίνει κάθε γλώσσα · απαντά αμέσως",
      chat_empty: "Γράψε στη γλώσσα σου – ελληνικά, γερμανικά, αγγλικά, τουρκικά, αραβικά, ρουμανικά ή όποια άλλη. Ρώτα ό,τι θες για βάρδιες, άδειες, μισθό, έγγραφα ή κανόνες. Για χρήματα, άδειες και συμβάσεις αποφασίζει το αφεντικό.",
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

  // Starter content in three languages until the owner posts his own (node team/bridge.mjs post … --category …).
  // Benefits and bonus rules as agreed for the drivers (from the contract drafts); binding is only the signed contract.
  var CATS = ["news", "company", "benefits", "learning", "development", "guidelines"]; var profSec = "space", calView = "schedule", calMonth = null;
  function S(id, category, de, en, el) { return { id: id, category: category, tr: { de: de, en: en, el: el } }; }
  var STARTER = [
    S("s1", "company", ["Transfer in Stuttgart", "Transfer fährt Fahrgäste in und um Stuttgart: Flughafen, Bahnhof, Messe, Termine. Buchungen kommen über die Website, WhatsApp und die Fahrer-App. Unser Anspruch: pünktlich, sauber, freundlich."],
      ["Transfer in Stuttgart", "Transfer drives passengers in and around Stuttgart: airport, station, trade fair, appointments. Bookings come from the website, WhatsApp and the driver app. Our standard: on time, clean, friendly."],
      ["Το Transfer στη Στουτγκάρδη", "Το Transfer μεταφέρει επιβάτες μέσα και γύρω από τη Στουτγκάρδη: αεροδρόμιο, σταθμός, έκθεση, ραντεβού. Οι κρατήσεις έρχονται από τη σελίδα, το WhatsApp και την εφαρμογή οδηγού. Ο στόχος μας: στην ώρα μας, καθαροί, ευγενικοί."]),
    S("s2", "company", ["Wer hilft dir", "Fragen zu Schichten, Urlaub, Lohn und Dokumenten: der HR-Assistent im Chat, rund um die Uhr und in jeder Sprache. Entscheidungen über Geld, Urlaub und Verträge trifft der Chef; der Assistent gibt sie weiter. Notfall unterwegs: 110/112, dann der Chef."],
      ["Who helps you", "Questions about shifts, leave, pay and documents: the HR assistant in the chat, day and night and in any language. Decisions about money, leave and contracts are made by the boss; the assistant passes them on. Emergency on the road: 110/112, then the boss."],
      ["Ποιος σε βοηθά", "Ερωτήσεις για βάρδιες, άδειες, μισθό και έγγραφα: ο βοηθός HR στο chat, μέρα νύχτα και σε όποια γλώσσα θέλεις. Τις αποφάσεις για χρήματα, άδειες και συμβάσεις τις παίρνει το αφεντικό· ο βοηθός τις μεταφέρει. Έκτακτη ανάγκη στον δρόμο: 110/112 και μετά το αφεντικό."]),
    S("b1", "benefits", ["Mindestens Mindestlohn – jede Stunde", "Jede Arbeitsstunde wird mindestens mit dem gesetzlichen Mindestlohn bezahlt, auch Wartezeit, Tanken und Reinigen."],
      ["At least minimum wage – every hour", "Every working hour is paid at least the legal minimum wage, including waiting, refuelling and cleaning."],
      ["Τουλάχιστον κατώτατος μισθός – κάθε ώρα", "Κάθε ώρα εργασίας πληρώνεται τουλάχιστον με τον νόμιμο κατώτατο μισθό, και η αναμονή, ο ανεφοδιασμός και ο καθαρισμός."]),
    S("b2", "benefits", ["Trinkgeld gehört dir – 100 %", "Bar und in der App. App-Trinkgeld kommt mit der nächsten Abrechnung voll zu dir."],
      ["Tips are yours – 100 %", "Cash and in the app. App tips come to you in full with the next payslip."],
      ["Τα φιλοδωρήματα είναι δικά σου – 100 %", "Μετρητά και μέσω εφαρμογής. Τα φιλοδωρήματα της εφαρμογής έρχονται ολόκληρα με την επόμενη μισθοδοσία."]),
    S("b3", "benefits", ["Verbrauchsbonus 30 €", "30 € brutto im Monat, wenn das Auto im Schnitt höchstens 4,5 l/100 km verbraucht (laut Tankkarte und Fahrtenprotokoll). Entfällt in einem Monat mit Bußgeld."],
      ["Fuel-saving bonus €30", "€30 gross a month when the car uses at most 4.5 l/100 km on average (fuel card and trip log). Not in a month with a traffic fine."],
      ["Μπόνους οικονομίας 30 €", "30 € μικτά τον μήνα όταν το αυτοκίνητο καίει κατά μέσο όρο έως 4,5 l/100 km (κάρτα καυσίμων και ημερολόγιο διαδρομών). Όχι σε μήνα με πρόστιμο."]),
    S("b4", "benefits", ["Schadenfrei-Bonus 100 €", "100 € brutto für jedes halbe Jahr ohne selbst verschuldeten Unfall oder Schaden (auch Felgen und Reifen)."],
      ["No-damage bonus €100", "€100 gross for every six months without an accident or damage you caused (rims and tyres included)."],
      ["Μπόνους χωρίς ζημιά 100 €", "100 € μικτά για κάθε εξάμηνο χωρίς ατύχημα ή ζημιά από δική σου υπαιτιότητα (και ζάντες, λάστιχα)."]),
    S("b5", "benefits", ["Tankgutscheine bis 50 € im Monat", "Steuerfrei: 25 € ab 7.200 € Umsatz im Monat, 15 € ohne Schaden, 10 € für den sparsamsten Fahrer."],
      ["Fuel vouchers up to €50 a month", "Tax-free: €25 from €7,200 revenue a month, €15 without damage, €10 for the most economical driver."],
      ["Κουπόνια καυσίμων έως 50 € τον μήνα", "Αφορολόγητα: 25 € από 7.200 € τζίρο τον μήνα, 15 € χωρίς ζημιά, 10 € για τον πιο οικονομικό οδηγό."]),
    S("b6", "benefits", ["Empfehlungsbonus 200 €", "Du bringst einen Fahrer, er bleibt drei Monate: 200 € für dich."],
      ["Referral bonus €200", "Bring a driver who stays three months: €200 for you."],
      ["Μπόνους σύστασης 200 €", "Φέρνεις έναν οδηγό και μένει τρεις μήνες: 200 € για σένα."]),
    S("b7", "benefits", ["Geld jeden Tag", "Bar kassierte Fahrpreise darfst du als Vorschuss auf deinen Lohn behalten; abgerechnet wird monatlich (Bargeldprotokoll führen)."],
      ["Money every day", "You may keep cash fares as an advance on your pay; it is settled monthly (keep the cash log)."],
      ["Χρήματα κάθε μέρα", "Τα μετρητά των διαδρομών μπορείς να τα κρατάς ως προκαταβολή μισθού· η εκκαθάριση γίνεται μηνιαία (κράτα το ημερολόγιο μετρητών)."]),
    S("b8", "benefits", ["Premium-Fahrzeug, alles bezahlt", "Mercedes E-Klasse, Tankkarte, Wäsche und Versicherung zahlt Transfer."],
      ["Premium car, all paid", "Mercedes E-Class; fuel card, car wash and insurance are paid by Transfer."],
      ["Premium αυτοκίνητο, όλα πληρωμένα", "Mercedes E-Klasse· κάρτα καυσίμων, πλύσιμο και ασφάλεια τα πληρώνει το Transfer."]),
    S("b9", "benefits", ["Schichten nach Absprache", "Wir berücksichtigen deine Wünsche (im Profil unter Kalender → Wünsche)."],
      ["Shifts by agreement", "We take your wishes into account (Profile → Calendar → Wishes)."],
      ["Βάρδιες κατόπιν συνεννόησης", "Λαμβάνουμε υπόψη τις προτιμήσεις σου (Προφίλ → Ημερολόγιο → Προτιμήσεις)."]),
    S("d1", "development", ["Perspektive nach 6 Monaten", "Nach sechs Monaten ist ein unbefristeter Vertrag möglich, und nach Absprache darfst du das Auto für den Arbeitsweg mit nach Hause nehmen."],
      ["Prospects after 6 months", "After six months a permanent contract is possible, and by agreement you may take the car home for your commute."],
      ["Προοπτική μετά από 6 μήνες", "Μετά από έξι μήνες γίνεται σύμβαση αορίστου χρόνου, και κατόπιν συνεννόησης μπορείς να παίρνεις το αυτοκίνητο σπίτι για τη μετακίνηση."]),
    S("d2", "development", ["Wachsen mit Transfer", "Mehr Schichten, Flughafen- und Geschäftskunden, später Teamleitung: sag im HR-Chat, was du dir wünschst. Noch kein P-Schein? Wir helfen dir bei der Anmeldung."],
      ["Grow with Transfer", "More shifts, airport and business clients, later team lead: tell the HR chat what you would like. No P-Schein yet? We help you apply."],
      ["Εξέλιξη με το Transfer", "Περισσότερες βάρδιες, αεροδρόμιο και επαγγελματίες πελάτες, αργότερα υπεύθυνος ομάδας: πες στο chat HR τι θέλεις. Δεν έχεις ακόμα P-Schein; Σε βοηθάμε να το βγάλεις."]),
    S("g1", "guidelines", ["Im Auto", "Pünktlich am Abholort, Auto innen und außen sauber, gepflegtes Auftreten. Kein Rauchen, keine E-Zigarette, kein Essen im Auto. 0,0 ‰ Alkohol im Dienst. Gurtpflicht für alle."],
      ["In the car", "On time at the pick-up, car clean inside and out, well-groomed. No smoking, no e-cigarettes, no eating in the car. 0.0 ‰ alcohol on duty. Seat belts for everyone."],
      ["Στο αυτοκίνητο", "Στην ώρα σου στο σημείο παραλαβής, καθαρό αυτοκίνητο μέσα και έξω, περιποιημένη εμφάνιση. Όχι κάπνισμα, ηλεκτρονικό τσιγάρο ή φαγητό στο αυτοκίνητο. 0,0 ‰ αλκοόλ στη βάρδια. Ζώνη για όλους."]),
    S("g2", "guidelines", ["Krank? So geht's", "Vor Schichtbeginn melden: in der App unter Anträge → Krank melden. Dauert es länger als drei Tage, brauchst du am vierten Tag eine AU vom Arzt. Gründe musst du nicht nennen."],
      ["Sick? Here is how", "Report before your shift starts: in the app under Requests → Call in sick. If it lasts longer than three days, you need a doctor's note (AU) on day four. You do not have to say why."],
      ["Άρρωστος; Έτσι γίνεται", "Δήλωσέ το πριν ξεκινήσει η βάρδια: στην εφαρμογή, Αιτήματα → Ασθένεια. Αν κρατήσει πάνω από τρεις μέρες, την τέταρτη μέρα χρειάζεσαι βεβαίωση γιατρού (AU). Δεν χρειάζεται να πεις τον λόγο."]),
    S("g3", "guidelines", ["Arbeitszeit", "Höchstens 10 Stunden am Tag, mindestens 11 Stunden Ruhe zwischen zwei Schichten, 30 Minuten Pause nach 6 Stunden, 45 Minuten nach 9 Stunden. Zeiten bei anderen Arbeitgebern zählen mit. Trag immer deine echten Zeiten ein."],
      ["Working time", "At most 10 hours a day, at least 11 hours rest between two shifts, a 30-minute break after 6 hours, 45 minutes after 9 hours. Hours at other employers count too. Always record your real times."],
      ["Ώρες εργασίας", "Έως 10 ώρες τη μέρα, τουλάχιστον 11 ώρες ξεκούραση ανάμεσα σε δύο βάρδιες, 30 λεπτά διάλειμμα μετά από 6 ώρες, 45 λεπτά μετά από 9. Μετράνε και οι ώρες σε άλλους εργοδότες. Γράφε πάντα τις πραγματικές σου ώρες."]),
    S("g4", "guidelines", ["Kontrolle durch Zoll oder Polizei", "Ruhig und kooperativ bleiben. Ausweis oder Pass immer dabei haben (§ 2a SchwarzArbG). In dieser App: Profil → Für Kontrollen zeigt deine Anmeldung, deinen Vertrag und deine Fahrerlaubnisse. Danach den Chef informieren."],
      ["Check by customs or police", "Stay calm and cooperative. Always carry your ID card or passport (§ 2a SchwarzArbG). In this app: Profile → For checks shows your registration, your contract and your licences. Tell the boss afterwards."],
      ["Έλεγχος από Zoll ή αστυνομία", "Μείνε ήρεμος και συνεργάσιμος. Έχε πάντα μαζί ταυτότητα ή διαβατήριο (§ 2a SchwarzArbG). Σε αυτή την εφαρμογή: Προφίλ → Για ελέγχους δείχνει την ασφάλισή σου, τη σύμβαση και τις άδειες οδήγησης. Μετά ενημέρωσε το αφεντικό."]),
    S("g5", "guidelines", ["Sicherheit und Unfälle", "Bei Bedrohung darfst du die Fahrt ablehnen oder an einem sicheren Ort beenden, ohne Nachteile. Unfall: Stelle sichern, Verletzte versorgen, Polizei bei Personenschaden, Fotos, kein Schuldanerkenntnis, Chef sofort anrufen."],
      ["Safety and accidents", "If threatened you may refuse or end the ride at a safe place, without any penalty. Accident: secure the scene, help the injured, police if anyone is hurt, photos, no admission of fault, call the boss at once."],
      ["Ασφάλεια και ατυχήματα", "Αν απειληθείς, μπορείς να αρνηθείς ή να τελειώσεις τη διαδρομή σε ασφαλές σημείο, χωρίς καμία συνέπεια. Ατύχημα: ασφάλισε το σημείο, βοήθησε τους τραυματίες, αστυνομία αν υπάρχει τραυματισμός, φωτογραφίες, καμία παραδοχή ευθύνης, πάρε αμέσως τηλέφωνο το αφεντικό."]),
    S("g6", "guidelines", ["Datenschutz", "Daten von Fahrgästen (Namen, Nummern, Ziele) nur für die Fahrt nutzen, nie weitergeben, keine Fotos oder Videos aus dem Auto in sozialen Netzwerken."],
      ["Privacy", "Use passengers' data (names, numbers, destinations) only for the ride, never pass it on, no photos or videos from the car on social media."],
      ["Προσωπικά δεδομένα", "Τα στοιχεία των επιβατών (ονόματα, τηλέφωνα, προορισμοί) μόνο για τη διαδρομή, ποτέ σε τρίτους, καμία φωτογραφία ή βίντεο από το αυτοκίνητο στα social."]),
    S("l1", "learning", ["Die Fahrer-App in 5 Schritten", "1. Anfrage kommt mit Ton → wischen zum Annehmen.\n2. „Ich fahre los“ startet Waze oder Google Maps.\n3. Am Abholort „Angekommen“ (oder automatisch nach 15 s Stillstand).\n4. Fahrgast drin → „Fahrt starten“.\n5. Am Ziel „Fahrt beenden“, bei Barzahlung den Betrag kassieren."],
      ["The driver app in 5 steps", "1. A request comes with a sound → swipe to accept.\n2. “I'm on my way” starts Waze or Google Maps.\n3. At the pick-up “Arrived” (or automatically after standing 15 s).\n4. Passenger in → “Start ride”.\n5. At the destination “End ride”; for cash, collect the amount."],
      ["Η εφαρμογή οδηγού σε 5 βήματα", "1. Το αίτημα έρχεται με ήχο → σύρε για αποδοχή.\n2. «Ξεκινάω» ανοίγει Waze ή Google Maps.\n3. Στο σημείο παραλαβής «Έφτασα» (ή αυτόματα μετά από 15 δευτ. στάση).\n4. Επιβάτης μέσα → «Έναρξη διαδρομής».\n5. Στον προορισμό «Τέλος διαδρομής»· για μετρητά, εισπράττεις το ποσό."]),
    S("l2", "learning", ["Android Auto", "Die Transfer-Karte erscheint neben Waze. Neue Fahrt: ✓ annehmen, ✕ ablehnen. Danach Waze oder Google Maps. Am Abholort ▶ startet die Fahrt, am Ziel die Flagge beendet sie."],
      ["Android Auto", "The Transfer card appears next to Waze. New ride: ✓ accept, ✕ decline. Then Waze or Google Maps. At the pick-up ▶ starts the ride, at the destination the flag ends it."],
      ["Android Auto", "Η κάρτα Transfer εμφανίζεται δίπλα στο Waze. Νέα διαδρομή: ✓ αποδοχή, ✕ απόρριψη. Μετά Waze ή Google Maps. Στο σημείο παραλαβής το ▶ ξεκινά τη διαδρομή, στον προορισμό η σημαία την τελειώνει."]),
    S("l3", "learning", ["Bargeld und Belege", "Jede Bareinnahme täglich ins Bargeldprotokoll, Tankbelege und Fahrzeugfotos zu Schichtbeginn und -ende an den Chef. Das schützt dich bei jeder Abrechnung."],
      ["Cash and receipts", "Every cash fare goes into the cash log daily; fuel receipts and car photos at the start and end of each shift to the boss. This protects you at every settlement."],
      ["Μετρητά και αποδείξεις", "Κάθε είσπραξη μετρητών καθημερινά στο ημερολόγιο μετρητών· αποδείξεις καυσίμων και φωτογραφίες του αυτοκινήτου στην αρχή και στο τέλος της βάρδιας στο αφεντικό. Σε προστατεύει σε κάθε εκκαθάριση."])
  ];
  function tr(p) { if (!p.tr) return p; var x = p.tr[lang] || p.tr.de; return { id: p.id, category: p.category, title: x[0], body: x[1] }; }
  function posts() {
    var own = ((data && data.posts) || []).map(function (p) { var x = p.i18n && p.i18n[lang]; return x && x.title ? Object.assign({}, p, { title: x.title, body: x.body || p.body }) : p; });
    return own.concat(STARTER.map(tr));
  }
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
  // One call to the server. Retries twice on a network failure (mobile signal, a sleeping WebView) and
  // keeps the real reason, so "no connection" can say what actually went wrong.
  var lastError = "";
  function rpc(fn, args, tries) {
    if (DEMO) return Demo.rpc(fn, args);
    tries = tries == null ? 2 : tries;
    var ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 20000) : null;
    return fetch(API + fn, { method: "POST", headers: { "Content-Type": "application/json", apikey: KEY },
      body: JSON.stringify(args), signal: ctl ? ctl.signal : undefined, cache: "no-store" }).then(function (r) {
      clearTimeout(timer);
      return r.text().then(function (txt) {
        var j = null; try { j = JSON.parse(txt); } catch (e) {}
        if (!r.ok) {
          var code = j && j.code;
          lastError = fn + " " + r.status + (code ? " " + code : "") + (j && j.message ? " " + j.message : "");
          if (code === "28000") { signOut(true); }
          var e2 = new Error(code === "KB429" ? t("too_many") : t("err")); e2.code = code; e2.http = r.status; throw e2;
        }
        return j;
      });
    }, function (err) {
      clearTimeout(timer);
      lastError = fn + " " + (err && (err.name + ": " + err.message) || "network");
      if (tries > 0) return new Promise(function (ok) { setTimeout(ok, 1200); }).then(function () { return rpc(fn, args, tries - 1); });
      var e3 = new Error(t("offline")); e3.network = true; throw e3;
    });
  }
  function why() { return lastError ? '<div class="muted small" style="margin-top:6px;word-break:break-all">' + esc(lastError) + "</div>" : ""; }

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
    receipts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    requests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>',
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
    var p = profile(), per = p.vacation_days_this_year != null ? p.vacation_days_this_year : p.vacation_days_per_year; if (per == null) return null;
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
      '<label style="display:block;margin-top:28px;text-align:left"><span class="muted small">' + esc(t("mobile_no")) + '</span>' +
      '<input id="ph" type="tel" inputmode="tel" autocomplete="tel" placeholder="0151 2345678" value="' + esc(load("team_phone") || "") + '" style="display:block;width:100%;margin-top:4px;padding:12px 14px;font:inherit;font-size:18px;border:1px solid var(--line,#d6ddd9);border-radius:12px;background:transparent;color:inherit"></label>' +
      '<h2 style="margin-top:22px">' + esc(t("pin")) + '</h2><div class="muted small">' + esc(t("pin_sub")) + "</div>" +
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
    document.onkeydown = function (e) { if (e.target && e.target.id === "ph") return; if (/^[0-9]$/.test(e.key)) press(e.key); else if (e.key === "Backspace") press("⌫"); };
    function submit(p) {
      // Mobile number + PIN (each employee their own). Without a number: the old PIN-only sign-in.
      var ph = (app.querySelector("#ph").value || "").trim();
      store("team_phone", ph || null);
      rpc(ph ? "team_login" : "driver_login", ph ? { p_phone: ph, p_pin: p } : { p_pin: p }).then(function (o) {
        if (o && o.error) { pin = ""; dots(); app.querySelector(".err").textContent = o.error === "locked" ? t("locked") : o.error === "phone" ? t("phone_bad") : t("wrong", o.left); return; }
        token = o.token; store("team_token", token); document.onkeydown = null; start();
      }).catch(function (e) { pin = ""; dots(); var box = app.querySelector(".err"); box.innerHTML = esc(e.network ? t("offline") : (e.message || t("err"))) + why(); });
    }
  }
  function langButtons(box, redraw) {
    [["de", "DE"], ["en", "EN"], ["el", "EL"]].forEach(function (x) {
      var b = el('<button type="button" aria-pressed="' + (lang === x[0]) + '">' + x[1] + "</button>");
      b.onclick = function () {
        lang = x[0]; store("team_lang", lang); document.documentElement.lang = lang; redraw();
        if (token && data) rpc("team_prefs", { p_token: token, p_prefs: Object.assign({}, data.prefs || {}, { lang: lang }) }).then(function (h) { if (h) data = h; }).catch(function () {});
      };
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
    stopTimers();
    refresh().then(function () { render(); loadReceipts().then(function () { if (tab === "home" && !sheet) render(); }); homeTimer = setInterval(function () { refresh().then(function () { if (tab !== "chat" && !sheet) render(); else tabsBadge(); }); }, 30000); })
      .catch(function (e) {
        if (!token) return;
        app.innerHTML = '<div class="pin"><p class="err">' + esc(e.network ? t("offline") : (e.message || t("err"))) + "</p>" + why() +
          '<button class="btn ghost" style="max-width:240px;margin-top:16px" id="retry">↻</button>' +
          '<button class="btn ghost" style="max-width:240px;margin-top:10px" id="relog">' + esc(t("signout")) + "</button></div>";
        app.querySelector("#retry").onclick = start;
        app.querySelector("#relog").onclick = function () { signOut(false); };
      });
  }
  function refresh() { return rpc("team_home", { p_token: token }).then(function (d) {
    data = d;
    if (d && (!d.prefs || d.prefs.lang !== lang)) rpc("team_prefs", { p_token: token, p_prefs: Object.assign({}, d.prefs || {}, { lang: lang }) }).catch(function () {});
  }); }

  function render() {
    if (tab === "chat") return chatScreen();
    var body = { home: homeScreen, plan: planScreen, menu: menuScreen, receipts: receiptsScreen, requests: requestsScreen, profile: profileScreen, search: searchScreen, team: teamScreen }[tab] || homeScreen;
    app.innerHTML = '<main class="screen">' + body() + "</main>" + tabsHtml();
    bind();
  }
  function tabsHtml() {
    return '<nav class="tabs" aria-label="Menu">' + ["home", "receipts", "requests", "chat", "profile"].map(function (k) {
      var n = k === "chat" ? data && data.unread : k === "receipts" ? receipts && receipts.to_confirm : 0;
      var badge = n > 0 ? '<span class="badge">' + n + "</span>" : "";
      var cur = tab === k || (k === "home" && (tab === "plan" || tab === "search" || tab === "menu" || tab === "team"));
      return '<button type="button" data-tab="' + k + '"' + (cur ? ' aria-current="page"' : "") + ">" + ICON[k] + "<span>" + esc(t(k === "receipts" ? "up_tab" : k)) + "</span>" + badge + "</button>";
    }).join("") + "</nav>";
  }
  function tabsBadge() { var n = app.querySelector(".tabs"); if (n) { n.outerHTML = tabsHtml(); bindTabs(); } }
  function bindTabs() { app.querySelectorAll("[data-tab]").forEach(function (b) { b.onclick = function () { go(b.dataset.tab); }; }); }
  function go(k) { if (k === "team") { tmList = null; tmSel = null; tmPerson = null; tmPin = null; } tab = k; store("team_tab", k); clearInterval(chatTimer); chatTimer = null; window.scrollTo(0, 0); render(); if (k === "receipts") loadReceipts(); }
  function bind() {
    bindTabs(); bindTeam();
    app.querySelectorAll("[data-rseg]").forEach(function (b) { b.onclick = function () { rSeg = b.dataset.rseg; rMonth = ""; store("team_rseg", rSeg); render(); }; });
    app.querySelectorAll("[data-rmonth]").forEach(function (b) { b.onclick = function () { rMonth = b.dataset.rmonth; render(); }; });
    app.querySelectorAll("[data-ask]").forEach(function (b) { b.onclick = function () { askSheet(b.dataset.ask); }; });
    app.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { go(b.dataset.go); }; });
    app.querySelectorAll("[data-q]").forEach(function (b) { b.onclick = function () { go("chat"); setTimeout(function () { sendChat(b.dataset.q); }, 50); }; });
    app.querySelectorAll("[data-view]").forEach(function (b) { b.onclick = function () { planView = b.dataset.view; render(); }; });
    app.querySelectorAll("[data-slip]").forEach(function (b) { b.onclick = function () { slipSheet(b.dataset.slip); }; });
    app.querySelectorAll("[data-req]").forEach(function (b) { b.onclick = function () { reqSheet(+b.dataset.req); }; });
    var so = app.querySelector("#signout"); if (so) so.onclick = function () { signOut(false); };
    var ck = app.querySelector("#check"); if (ck) ck.onclick = checkSheet;
    app.querySelectorAll("[data-wallet]").forEach(function (b) { b.onclick = function () { go("receipts"); }; });
    app.querySelectorAll("[data-receipt]").forEach(function (b) { b.onclick = function () { receiptSheet(); }; });
    app.querySelectorAll("[data-rnew]").forEach(function (b) { b.onclick = function () { receiptSheet(b.dataset.rnew); }; });
    app.querySelectorAll("[data-rimg]").forEach(function (b) { b.onclick = function () { receiptView(+b.dataset.rimg); }; });
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
      "<h1>" + esc(t("hello", first)) + "</h1></div>" + (DEMO ? '<span class="chip info">' + esc(t("demo")) + "</span>" : "") + '<span style="display:flex;gap:8px"><button class="back" aria-label="' + esc(t("menu")) + '" data-go="menu">' + ICON.menu + '</button><button class="back" aria-label="' + esc(t("search")) + '" data-go="search">' + ICON.search + "</button></span></div>";
    h += '<section class="hero" data-go="plan" role="button" tabindex="0"><div class="muted">' + esc(t("next_shift")) + "</div>" +
      (ns ? '<div class="big">' + esc(dateLabel(ns.day)) + "</div><div>" + esc(ns.start + " – " + ns.end) + (ns.note ? " · " + esc(ns.note) : "") + "</div>"
          : '<div class="big">' + esc(t("no_shift")) + "</div>") + '<div style="margin-top:12px;color:var(--mint);font-weight:700">' + esc(t("full_plan")) + " ›</div></section>";
    h += '<div class="grid2"><div class="card kpi"><div class="muted small">' + esc(t("leave_left")) + '</div><div class="n">' + (left == null ? "—" : left.toLocaleString(loc())) + '</div><div class="muted small">' + esc(t("days")) + "</div></div>" +
      '<div class="card kpi"><div class="muted small">' + esc(t("hours_month")) + '</div><div class="n">' + (Math.round(monthMinutes() / 6) / 10).toLocaleString(loc()) + '</div><div class="muted small">' + esc(t("h")) + "</div></div></div>";
    // Duties (e.g. monthly receipts): stay here until done. Tap = upload.
    var dut = ((p && p.duties) || []).filter(function (u) { return !u.done; });
    if (dut.length) h += "<h2>" + esc(t("duties")) + "</h2>" + dut.map(function (u) {
      var late = u.due < new Date().toISOString().slice(0, 10), w = (u.title && (u.title[lang] || u.title.de)) || u.id;
      return '<button class="card row tap" style="width:100%;margin-top:8px;border:0;text-align:left' + (late ? ';background:#fdecea' : '') + '" data-receipt="1"><span class="grow t">' + esc(w) +
        '<span class="muted small" style="display:block">' + esc(t("due_by", new Date(u.due + "T12:00:00").toLocaleDateString(loc()))) + "</span></span>›</button>";
    }).join("");
    if (receipts && receipts.to_confirm > 0) h += '<button class="card row tap" style="width:100%;margin-top:12px;border:0;background:#e6f0fd" data-wallet="1"><span class="grow t" style="text-align:left">' + esc(t("confirm_home", receipts.to_confirm)) + '</span><span class="chip info">' + receipts.to_confirm + "</span></button>";
    if (open) h += '<button class="card row tap" style="width:100%;margin-top:12px;border:0" data-go="requests"><span class="grow t" style="text-align:left">' + esc(t("open_req")) + '</span><span class="chip wait">' + open + "</span></button>";
    h += '<div class="actions">' + [["leave", "ask_leave", "leave"], ["sick", "ask_sick", "sick"], ["shift_swap", "ask_swap", "swap"]].map(function (k) {
      return '<button class="action" data-ask="' + k[0] + '">' + ICON[k[2]] + esc(t(k[1])) + "</button>"; }).join("") +
      '<button class="action" data-ask="payslip">' + ICON.payslip + esc(t("ask_payslip")) + "</button>" +
      '<button class="action" data-receipt="1">' + ICON.receipt + esc(t("ask_receipt")) + "</button>" +
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
      (profile().type === "inhaber" ? '<button class="card row tap" style="width:100%;text-align:left;border:0;margin-bottom:12px" data-go="team"><span class="grow t">' + esc(t("tm_title")) +
        '<span class="muted small" style="display:block">' + esc(t("tm_owner")) + "</span></span>›</button>" : "") +
      '<div class="card" style="padding:4px 14px">' + tiles.map(function (x) {
        var n = x[0] === "plan" || x[0] === "favs" ? "" : posts().filter(function (p) { return (p.category || "news") === x[0]; }).length;
        return '<button class="row tap" style="width:100%;text-align:left" ' + (x[0] === "plan" ? 'data-tab="plan"' : 'data-cat="' + x[0] + '"') + '><span style="width:26px;display:grid;place-items:center">' + (icon[x[2]] || ICON.doc).replace("<svg ", '<svg width="24" height="24" ') +
          '</span><span class="grow t">' + esc(t(x[1])) + '</span><span class="muted small">' + (n || "") + ' ›</span></button>';
      }).join("") + "</div>";
  }

  /* ---------------- Team (owner only): everyone's data, new PIN / new phone without losing anything ---------------- */
  var tmList = null, tmSel = null, tmPerson = null, tmPin = null;
  function tmLoad() {
    var p = tmSel ? rpc("team_owner_person", { p_token: token, p_driver: tmSel }).then(function (x) { tmPerson = x; })
                  : rpc("team_owner_people", { p_token: token }).then(function (x) { tmList = x || []; });
    p.then(function () { if (tab === "team") render(); }).catch(function (e) { toast(e.message || t("err")); });
  }
  function fmtDay(s) { return s ? new Date(String(s).slice(0, 10) + "T12:00:00").toLocaleDateString(loc()) : ""; }
  function teamScreen() {
    if (!tmSel) {
      if (!tmList) { tmLoad(); return '<div class="top"><button class="back" aria-label="Back" data-go="menu">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("tm_title")) + '</h1></div><div class="empty">…</div>'; }
      return '<div class="top"><button class="back" aria-label="Back" data-go="menu">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("tm_title")) + "</h1></div>" +
        '<div class="card" style="padding:4px 14px">' + tmList.map(function (x) {
          var badge = (x.receipts_open || 0) + (x.requests_open || 0);
          return '<button class="row tap" style="width:100%;text-align:left" data-tm="' + esc(x.id) + '"><span class="grow t">' + esc(x.name) +
            '<span class="muted small" style="display:block">' + esc([x.role || x.type || "", x.phone ? "+" + x.phone : ""].filter(Boolean).join(" · ")) + "</span></span>" +
            (badge ? '<span class="chip wait">' + badge + "</span>" : "") + " ›</button>";
        }).join("") + "</div>";
    }
    var P = tmPerson;
    var h = '<div class="top"><button class="back" aria-label="Back" data-tm="">' + ICON.back + '</button><h1 style="flex:1">' + esc(P ? P.me.name : "…") + "</h1></div>";
    if (!P) { tmLoad(); return h; }
    var who = tmList && tmList.filter(function (x) { return x.id === tmSel; })[0];
    h += '<div class="card"><div class="t">' + (P.me.phone ? "+" + esc(P.me.phone) : "–") + '</div><div class="muted small">' +
      esc(who && who.last_seen ? t("tm_last", new Date(who.last_seen).toLocaleString(loc(), { dateStyle: "short", timeStyle: "short" })) : t("tm_never")) + "</div>";
    if (tmPin) h += '<div class="card" style="margin-top:10px;background:#e8f6ee"><div class="t" style="font-size:22px">' + esc(t("tm_pin_is", P.me.name.split(" ")[0]).replace("{p}", tmPin)) + '</div><div class="muted small">' + esc(t("tm_pin_tell")) + "</div></div>";
    h += '<div class="grid2" style="margin-top:12px"><button class="btn" data-tm-pin="1">' + esc(t("tm_newpin")) + '</button><button class="btn ghost" data-tm-phone="1">' + esc(t("tm_phone")) + "</button></div>" +
      '<div class="muted small" style="margin-top:8px">' + esc(t("tm_kept")) + "</div></div>";
    var today = new Date().toISOString().slice(0, 10);
    var nexts = (P.shifts || []).filter(function (s) { return s.day >= today; }).slice(0, 6);
    h += "<h2>" + esc(t("tm_plan")) + '</h2><div class="card" style="padding:4px 14px">' + (nexts.length ? nexts.map(function (s) {
      return '<div class="row"><span class="grow t">' + esc(fmtDay(s.day)) + '</span><span class="muted small">' + esc(s.start + (s.end && s.end !== s.start ? " – " + s.end : "") + (s.note ? " · " + s.note : "")) + "</span></div>"; }).join("") : '<div class="row muted">' + esc(t("tm_none")) + "</div>") + "</div>";
    var docs = Object.entries ? Object.entries((P.profile && P.profile.documents) || {}) : [];
    h += "<h2>" + esc(t("tm_docs")) + '</h2><div class="card" style="padding:4px 14px">' + (docs.length ? docs.map(function (d) {
      var v = d[1] || {}, when = v.expires || v.signed || v.done || v.ends || "";
      return '<div class="row"><span class="grow t">' + esc(t("dk_" + d[0]) !== "dk_" + d[0] ? t("dk_" + d[0]) : d[0].replace(/_/g, " ")) + '</span><span class="muted small">' + esc(fmtDay(when)) + "</span></div>"; }).join("") : '<div class="row muted">' + esc(t("tm_none")) + "</div>") + "</div>";
    var rl = (P.receipts && P.receipts.list) || [];
    h += "<h2>" + esc(t("tm_rcpt")) + " (" + rl.length + ')</h2><div class="card" style="padding:4px 14px">' + (rl.length ? rl.slice(0, 40).map(function (r) {
      var d = r.data || {};
      return '<div class="row"><span class="grow t">' + esc(d.merchant || r.note || "…") + '<span class="muted small" style="display:block">' + esc(fmtDay(d.date || r.at)) +
        (d.approve === "pending" ? " · ?" : "") + (r.status === "rejected" ? " · ✕" : "") + '</span></span><span class="t">' + (d.total != null ? esc(Number(d.total).toLocaleString(loc(), { style: "currency", currency: "EUR" })) : "") + "</span></div>"; }).join("") : '<div class="row muted">' + esc(t("tm_none")) + "</div>") + "</div>";
    var rq = (P.requests || []).filter(function (r) { return r.status === "open" || r.status === "with_owner"; });
    if (rq.length) h += "<h2>" + esc(t("tm_req")) + '</h2><div class="card" style="padding:4px 14px">' + rq.map(function (r) {
      return '<div class="row"><span class="grow t">' + esc(r.text || r.kind) + '</span><span class="muted small">' + esc(fmtDay(r.at)) + "</span></div>"; }).join("") + "</div>";
    return h;
  }
  function bindTeam() {
    app.querySelectorAll("[data-tm]").forEach(function (b) { b.onclick = function () { tmSel = b.dataset.tm || null; tmPerson = null; tmPin = null; if (!tmSel) tmList = null; window.scrollTo(0, 0); render(); }; });
    app.querySelectorAll("[data-tm-pin]").forEach(function (b) { b.onclick = function () {
      if (!tmPerson || !window.confirm(t("tm_newpin_q", tmPerson.me.name))) return;
      b.disabled = true;
      rpc("team_owner_reset", { p_token: token, p_driver: tmSel, p_phone: null, p_new_pin: true }).then(function (r) { tmPin = r.pin; render(); }).catch(function (e) { b.disabled = false; toast(e.message); });
    }; });
    app.querySelectorAll("[data-tm-phone]").forEach(function (b) { b.onclick = function () {
      if (!tmPerson) return;
      var v = window.prompt(t("tm_phone_q", tmPerson.me.name), tmPerson.me.phone ? "+" + tmPerson.me.phone : "");
      if (!v) return;
      rpc("team_owner_reset", { p_token: token, p_driver: tmSel, p_phone: v, p_new_pin: false }).then(function (r) { tmPerson.me.phone = r.phone; tmList = null; toast(t("saved")); render(); })
        .catch(function (e) { toast(/phone/.test(e.message) ? t("phone_bad") : e.message); });
    }; });
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
    h += '<div class="actions"><button class="action" data-receipt="1">' + ICON.receipt + esc(t("ask_receipt")) + "</button>" + KINDS.map(function (k) { return '<button class="action" data-ask="' + k[0] + '">' + ICON[k[2]] + esc(t(k[1])) + "</button>"; }).join("") +
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
  // Coming back from the camera or the photo picker, the tap on their "Done" can land on our sheet
  // (on the Fold the picker's Done sits right over "Cancel") and closed the receipt form. Taps that
  // arrive just after returning are ignored.
  var pickedAt = 0;
  function picking() { pickedAt = Date.now() + 600000; }
  function backFromPick() { if (pickedAt > Date.now()) pickedAt = Date.now() + 900; }
  window.addEventListener("focus", backFromPick);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) backFromPick(); });
  function closeSheet(e) {
    if (e && e.type === "click" && Date.now() < pickedAt) { console.log("sheet: tap ignored after picker"); return; }
    if (sheet) { console.log("sheet: closed"); sheet.remove(); sheet = null; }
  }

  function askSheet(kind) {
    var k = KINDS.filter(function (x) { return x[0] === kind; })[0], today = ymd(new Date()), f = "";
    if (kind === "leave" || kind === "sick") f = '<div class="two"><div><label class="f" for="f1">' + esc(t("from")) + '</label><input class="in" type="date" id="f1" value="' + today + '"></div><div><label class="f" for="f2">' + esc(t("to")) + '</label><input class="in" type="date" id="f2" value="' + today + '"></div></div>' +
      (kind === "sick" ? '<p class="muted small">' + esc(t("sick_note")) + "</p>" : "");
    if (kind === "shift_swap") f = '<label class="f" for="f1">' + esc(t("date")) + '</label><input class="in" type="date" id="f1" value="' + today + '">';
    if (kind === "payslip") f = '<label class="f" for="f1">' + esc(t("which_month")) + '</label><input class="in" type="month" id="f1" value="' + today.slice(0, 7) + '">';
    if (kind === "document") f = '<label class="f" for="f1">' + esc(t("which_doc")) + '</label><input class="in" id="f1" placeholder="' + esc(t("doc_ph")) + '">';
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
      '<button class="btn dark" id="check" style="margin:0 0 14px;height:auto;padding:12px 16px;display:flex;flex-direction:column;align-items:center;gap:2px">' +
        '<span>🪪 ' + esc(t("check")) + '</span><span style="font-weight:500;opacity:.7;font-size:13px">' + esc(t("check_sub")) + "</span></button>" +
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
      kv(t("leave_year"), p.vacation_days_per_year != null ? p.vacation_days_per_year + " " + t("days") : ""),
      p.vacation_calc ? kv(t("leave_this_year", p.vacation_calc.year), t("leave_calc").replace("{d}", String(p.vacation_calc.days_per_week).replace(".", lang === "en" ? "." : ",")).replace("{f}", p.vacation_calc.full) +
        (p.vacation_calc.months < 12 ? " · " + t("leave_part").replace("{m}", p.vacation_calc.months).replace("{n}", p.vacation_calc.this_year) : "")) : "",
      kv(t("leave_left"), left == null ? "" : left + " " + t("days"))].filter(Boolean));
    // Every other field the owner keeps is shown too (owner's choice: employees see all of their data).
    var known = ["name", "phone", "status", "type", "start", "hourly_wage", "monthly_salary", "days_per_week", "vacation_days_per_year", "vacation_days_this_year", "vacation_calc", "vacation_contract_days", "documents", "role", "account", "employer", "contract_text", "birthdate"];
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
  var receipts = null;
  // Live: while a receipt is being read, ask every 3 s; when it is done, say what was read.
  var rTimer = null, fresh = {};
  function loadReceipts() {
    clearTimeout(rTimer);
    return rpc("team_receipts", { p_token: token }).then(function (r) {
      var before = {}; ((receipts && receipts.list) || []).forEach(function (x) { before[x.id] = x.status; });
      receipts = r;
      (r.list || []).forEach(function (x) {
        if (before[x.id] === "new" && x.status !== "new") {
          fresh[x.id] = true;
          var d = x.data || {};
          toast(x.status === "read" ? "✓ " + t("read_done") + ": " + (d.merchant || "") + " · " + money(d.total) : t("rs_" + x.status));
        }
      });
      if (!sheet && (tab === "receipts" || tab === "home" || (tab === "profile" && profSec === "docs"))) render(); else tabsBadge();
      if ((r.list || []).some(function (x) { return x.status === "new"; }) && tab === "receipts") rTimer = setTimeout(loadReceipts, 3000);
    }).catch(function () { if (tab === "receipts") rTimer = setTimeout(loadReceipts, 6000); });
  }
  function dayLabel(dt) {
    var a = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()), n = new Date(), b = new Date(n.getFullYear(), n.getMonth(), n.getDate()), diff = Math.round((b - a) / 864e5);
    return diff === 0 ? t("today") : diff === 1 ? t("yesterday") : a.toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long", year: a.getFullYear() === n.getFullYear() ? undefined : "numeric" });
  }
  function receiptRow(r) {
    var d = r.data || {}, st = r.settled_at ? "settled" : d.approve === "pending" && r.status !== "rejected" ? "approve" : d.confirm === "pending" ? "confirm" : r.status;
    var cls = { new: "wait", approve: "info", confirm: "info", read: "ok", approved: "ok", settled: "ok", filed: "ok", duplicate: "bad", rejected: "bad" }[st] || "";
    if (d.invoice_missing && r.status !== "rejected") cls = "wait";
    var up = new Date(r.at), time = up.toLocaleTimeString(loc(), { hour: "2-digit", minute: "2-digit" });
    if (r.status === "new") return '<div class="row" style="align-items:flex-start"><span class="spin" aria-hidden="true"></span><span class="grow"><span class="t">' + esc(t("rs_new")) + '…</span><br><span class="muted small">' +
      esc(t(r.hint === "doc" ? "reading_doc" : "reading_hint")) + '</span><br><span class="muted small">' + esc(t("uploaded_at", time)) + "</span></span></div>";
    if (r.status === "duplicate") {
      var o = (receipts.list || []).filter(function (x) { return x.id === r.dup_of; })[0], od = (o && o.data) || {};
      d = Object.assign({}, od, d); 
    }
    var dt = function (x) { return x ? parse(x).toLocaleDateString(loc()) : ""; }, kind = d.kind || "receipt", isDoc = kind !== "receipt";
    var facts = r.status === "filed" ? [d.sick && d.sick.from ? t("sick_from_to", dt(d.sick.from) + " – " + dt(d.sick.to || d.sick.from)) : "", d.expires ? t("valid_until", dt(d.expires)) : "",
        d.hu_next ? t("hu_next", parse(d.hu_next + "-15").toLocaleDateString(loc(), { month: "long", year: "numeric" })) : "", d.hu_result || "",
        d.deadline ? t("deadline", dt(d.deadline)) : "", d.signed ? t("signed_on", dt(d.signed)) : "", !d.sick && !d.expires && !d.signed ? dt(d.date) : ""].filter(Boolean)
      : [dt(d.date), d.category ? t("cat_" + d.category) : "", d.vat != null ? t("vat") + " " + money(d.vat) + (d.vat_rate ? " (" + d.vat_rate + " %)" : "") : ""].filter(Boolean);
    var route = (d.route || []).map(function (x) { return t("to_" + x); }).join(" + ");
    var title = isDoc ? t("dk_" + kind) + (d.merchant && r.status !== "filed" ? " · " + d.merchant : "") : d.merchant || t("ask_receipt");
    var pm = d.payment || {}, onReceipt = pm.method === "cash" ? t("pm_cash") : pm.method === "card" ? t("pm_card") + (pm.card_name ? " " + pm.card_name : "") + (pm.card_last4 ? " …" + pm.card_last4 : "") : "";
    return '<button class="row tap" style="width:100%;text-align:left;align-items:flex-start' + (fresh[r.id] ? ";background:var(--mint-soft);border-radius:12px;padding-left:8px;padding-right:8px" : "") + '" data-rimg="' + r.id + '"><span class="grow"><span class="t">' + esc(title) + "</span>" +
      (facts.length ? '<br><span class="small">' + esc(facts.join(" · ")) + "</span>" : "") +
      (fresh[r.id] && onReceipt ? '<br><span class="small">' + esc(t("on_receipt") + ": " + onReceipt + (d.liters ? " · " + d.liters + " l" : "")) + "</span>" : "") +
      (d.source === "email" ? '<br><span class="small" style="font-weight:700">' + esc(t("mail_from") + (d.email && d.email.subject ? ": " + d.email.subject : "")) + "</span>" : "") +
      (r.status === "duplicate" ? '<br><span class="small" style="color:var(--bad,#b3261e)">' + esc(t("dup_hint")) + "</span>" : "") +
      (isDoc && d.summary && r.status === "filed" ? '<br><span class="small">' + esc(d.summary) + "</span>" : "") +
      (route ? '<br><span class="small" style="font-weight:700">→ ' + esc(t("goes_to", route)) + "</span>" : "") +
      '<br><span class="muted small">' + esc(t("uploaded_at", time) + (r.status === "filed" || r.paid === "none" ? "" : " · " + t("paid_" + r.paid))) + "</span></span>" +
      '<span style="text-align:right;white-space:nowrap"><b>' + esc(d.total != null && r.status !== "duplicate" ? money(d.total) : "") + '</b><br><span class="chip ' + cls + '">' + esc(d.invoice_missing && r.status !== "rejected" ? t("inv_missing") : st === "confirm" ? t("rs_confirm") : st === "approve" ? t("rs_approve") : d.approve === "no" ? t("ap_cancelled") : t("rs_" + st)) + "</span></span></button>";
  }
  // The receipts tab: add new ones (camera or gallery) on top, then everything sent, newest first, by the day it was sent.
  function receiptsScreen() {
    var h = '<div class="top"><h1>' + esc(t("up_title")) + "</h1></div>";
    h += '<div class="grid2" style="margin-top:0"><button class="btn dark" style="height:auto;padding:18px 8px" data-rnew="cam"><span style="font-size:28px">📷</span><br>' + esc(t("receipt_take")) + '</button>' +
      '<button class="btn ghost" style="height:auto;padding:18px 8px" data-rnew="gal"><span style="font-size:28px">🖼️</span><br>' + esc(t("receipt_gallery")) + "</button></div>";
    h += '<p class="muted small" style="margin:10px 2px 0">' + esc(t("up_intro")) + "</p>";
    if (!receipts) { loadReceipts(); return h + '<div class="empty">…</div>'; }
    if (receipts.to_confirm > 0) h += '<div class="card" style="background:#e6f0fd;margin-top:14px"><b>' + esc(t("confirm_home", receipts.to_confirm)) + '</b><div class="muted small">' + esc(t("confirm_tap")) + "</div></div>";
    if (receipts.owed > 0) h += '<div class="card" style="background:var(--mint-soft);margin-top:14px"><div class="muted small">' + esc(t("owed2")) + '</div><div style="font-size:28px;font-weight:900">' + esc(money(receipts.owed)) + "</div></div>";
    var list = (receipts.list || []).filter(function (r) { return !(r.data && r.data.removed); });
    if (!list.length) return h + '<div class="empty">' + esc(t("no_receipts")) + "</div>";
    // Three kinds, each its own list: receipts (money spent), documents (licences, insurance, letters, sick notes),
    // proofs (payment / order confirmations waiting for their real invoice). Proofs without an invoice stay on top.
    var cnt = { rcpt: 0, docs: 0, proof: 0 }; list.forEach(function (r) { cnt[rKind(r)]++; });
    if (!cnt[rSeg]) rSeg = cnt.rcpt ? "rcpt" : cnt.docs ? "docs" : cnt.proof ? "proof" : "rcpt";
    var missing = list.filter(function (r) { return r.data && r.data.invoice_missing && r.status !== "rejected"; });
    if (missing.length) h += '<h2>' + esc(t("inv_missing_top")) + '</h2><div class="card" style="padding:4px 14px;background:#fff4e5">' + missing.map(receiptRow).join("") + "</div>";
    h += '<div class="seg" role="tablist" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:18px;padding:4px;border-radius:14px;background:var(--soft,#eef2f0)">' +
      ["rcpt", "docs", "proof"].map(function (k) {
        var on = rSeg === k;
        return '<button type="button" role="tab" aria-selected="' + on + '" data-rseg="' + k + '" style="padding:10px 4px;border-radius:10px;border:0;font:inherit;font-weight:' + (on ? 800 : 600) +
          ';background:' + (on ? "var(--card,#fff)" : "transparent") + ';color:inherit;box-shadow:' + (on ? "0 1px 3px rgba(0,0,0,.12)" : "none") + '">' + esc(t("seg_" + k)) +
          '<span class="muted small" style="display:block;font-weight:600">' + cnt[k] + "</span></button>";
      }).join("") + "</div>";
    var seg = list.filter(function (r) { return rKind(r) === rSeg; });
    var month = function (r) { return String((r.data && r.data.date) || r.at).slice(0, 7); };
    var months = []; seg.forEach(function (r) { var m = month(r); if (months.indexOf(m) < 0) months.push(m); }); months.sort().reverse();
    if (rMonth && months.indexOf(rMonth) < 0) rMonth = "";
    var mName = function (m) { var x = m.split("-"); return new Date(+x[0], +x[1] - 1, 1).toLocaleDateString(loc(), { month: "short", year: "2-digit" }); };
    if (months.length > 1) h += '<div style="display:flex;gap:6px;overflow-x:auto;margin-top:10px;padding-bottom:2px">' + [""].concat(months).map(function (m) {
      var on = rMonth === m;
      return '<button type="button" data-rmonth="' + m + '" class="chip' + (on ? " ok" : "") + '" style="border:0;white-space:nowrap;padding:6px 12px;font:inherit;font-size:14px' + (on ? ";font-weight:800" : "") + '">' + esc(m ? mName(m) : t("all_months")) + "</button>";
    }).join("") + "</div>";
    if (rMonth) seg = seg.filter(function (r) { return month(r) === rMonth; });
    if (!seg.length) return h + '<div class="empty">' + esc(t("seg_empty")) + "</div>";
    if (rSeg === "rcpt") {
      var counted = seg.filter(function (r) { var d = r.data || {}; return (r.status === "read" || r.status === "approved") && d.total != null && d.approve !== "pending" && d.approve !== "no"; });
      var tot = counted.reduce(function (s, r) { return s + Number(r.data.total || 0); }, 0), vat = counted.reduce(function (s, r) { return s + Number(r.data.vat || 0); }, 0);
      h += '<div class="grid2" style="margin-top:12px"><div class="card kpi"><div class="muted small">' + esc(t("sum_total")) + '</div><div class="n" style="font-size:24px">' + esc(money(tot)) +
        '</div><div class="muted small">' + counted.length + " " + esc(t("sum_counted")) + '</div></div><div class="card kpi"><div class="muted small">' + esc(t("sum_vat")) +
        '</div><div class="n" style="font-size:24px">' + esc(money(vat)) + "</div></div></div>";
    }
    var groups = [], last = null;
    seg.slice().sort(function (a, b) { return month(a) === month(b) ? (a.at < b.at ? 1 : -1) : month(a) < month(b) ? 1 : -1; }).forEach(function (r) {
      var k = month(r); if (k !== last) { groups.push({ k: k, a: [] }); last = k; } groups[groups.length - 1].a.push(r); });
    return h + groups.map(function (g) {
      var x = g.k.split("-"), name = new Date(+x[0], +x[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" });
      return '<div class="muted small" style="margin:16px 2px 6px;font-weight:700">' + esc(name) + '</div><div class="card" style="padding:4px 14px">' + g.a.map(receiptRow).join("") + "</div>"; }).join("");
  }
  var rSeg = load("team_rseg") || "rcpt", rMonth = "";
  function rKind(r) {
    var d = r.data || {}, k = d.kind || "";
    if (d.invoice_missing || d.proof || /payment|order_conf|confirmation/.test(k)) return "proof";
    if (r.hint === "doc" || (k && k !== "receipt")) return "docs";
    return "rcpt";
  }
  function secWallet() {
    var slips = data.payslips || [];
    return "<h2>" + esc(t("movements")) + "</h2>" + (slips.length ? '<div class="card" style="padding:4px 14px">' + slips.map(function (s) {
      var m = s.month.split("-"), name = new Date(+m[0], +m[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" });
      return '<button class="row tap" style="width:100%;text-align:left" data-slip="' + esc(s.month) + '"><span class="grow"><span class="t">' + esc(name) + '</span><br><span class="muted small">' + esc(s.data && s.data.hours != null ? s.data.hours + " " + t("h") : "") + "</span></span><b>" + esc(money(s.data && (s.data.net != null ? s.data.net : s.data.gross))) + "</b></button>";
    }).join("") + "</div>" : '<div class="empty">' + esc(t("no_payslips")) + "</div>") +
      '<button class="btn ghost" style="margin-top:12px" data-ask="payslip">' + esc(t("ask_payslip")) + "</button>" +
      "<h2>" + esc(t("receipts")) + '</h2><button class="card row tap" style="width:100%;border:0" data-go="receipts"><span class="grow t" style="text-align:left">' + esc(t("my_receipts")) +
      (receipts && receipts.owed > 0 ? " · " + esc(t("owed2")) + " " + esc(money(receipts.owed)) : "") + "</span>›</button>";
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
  // For a road check (customs/FKS, police, Ordnungsamt): proof of employment, in German for the officer.
  function checkSheet() {
    var p = profile(), me = data.me || {}, emp = p.employer || {}, docs = p.documents || {};
    function d(x) { return x ? parse(x).toLocaleDateString("de-DE") : "—"; }
    var types = { minijob: "Geringfügige Beschäftigung (Minijob)", teilzeit: "Teilzeit", vollzeit: "Vollzeit", kurzfristig: "Kurzfristige Beschäftigung", freelance: "Freie Mitarbeit", inhaber: "Inhaber" };
    var today = ymd(new Date()), shift = (data.shifts || []).filter(function (s) { return s.day === today; });
    var rows = [
      ["Arbeitgeber", [emp.name, emp.address, emp.phone].filter(Boolean).join(", ") || "—"],
      ["Arbeitnehmer", me.name + (p.birthdate ? ", geb. " + d(p.birthdate) : "")],
      ["Beschäftigt seit", d(p.start)],
      ["Art der Beschäftigung", types[p.type] || p.type || "—"],
      ["Tätigkeit", p.role || "Fahrer im Mietwagenverkehr (§ 49 Abs. 4 PBefG)"],
      ["Arbeitszeit", p.hours_per_week ? p.hours_per_week + " Std./Woche" : p.days_per_week ? p.days_per_week + " Tage/Woche" : "—"],
      ["Sofortmeldung (SV)", docs.sofortmeldung && docs.sofortmeldung.done ? "erfolgt am " + d(docs.sofortmeldung.done) : "—"],
      ["Arbeitsvertrag", docs.arbeitsvertrag && docs.arbeitsvertrag.signed ? "unterschrieben am " + d(docs.arbeitsvertrag.signed) : "—"],
      ["Führerschein", docs.fuehrerschein && docs.fuehrerschein.expires ? "gültig bis " + d(docs.fuehrerschein.expires) : "—"],
      ["P-Schein", docs.p_schein && docs.p_schein.expires ? "gültig bis " + d(docs.p_schein.expires) : "—"],
      ["Dienstplan heute", shift.length ? shift.map(function (s) { return s.start + "–" + s.end; }).join(", ") : "—"]
    ];
    openSheet('<div style="display:flex;justify-content:space-between;align-items:center"><div class="wordmark" style="font-size:18px">TRANSFER<i></i></div><span class="chip ok">' + esc(new Date().toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" })) + "</span></div>" +
      '<h2 style="margin:14px 0 2px">Nachweis über das Beschäftigungsverhältnis</h2>' + (lang !== "de" ? '<p class="muted small" style="margin:0 0 10px">' + esc(t("check_note")) + "</p>" : "") +
      '<div class="card" style="padding:4px 14px">' + rows.map(function (r) { return '<div class="row" style="align-items:flex-start"><span class="muted" style="width:44%">' + esc(r[0]) + '</span><b style="flex:1;text-align:right">' + esc(r[1]) + "</b></div>"; }).join("") + "</div>" +
      '<p class="small" style="margin:12px 2px">Ausweis oder Pass wird zusätzlich vorgelegt (§ 2a SchwarzArbG).</p>' +
      '<div style="display:grid;gap:10px"><button class="btn" id="ctr">' + esc(t("show_contract")) + '</button><button class="btn ghost" data-close>OK</button></div>', function (s) {
      s.querySelector("#ctr").onclick = function () {
        var txt = p.contract_text;
        openSheet('<h2 style="margin-top:0">Arbeitsvertrag</h2>' + (txt ? '<div class="card"><p style="margin:0;white-space:pre-wrap;line-height:1.5;font-size:15px">' + esc(txt) + "</p></div>" : '<div class="empty">' + esc(t("no_contract")) + "</div>") +
          '<button class="btn ghost" style="margin-top:16px" id="back2">' + esc(t("cancel")) + "</button>", function (s2) { s2.querySelector("#back2").onclick = checkSheet; });
      };
    });
  }
  // Photograph a receipt: made small in the phone (max 1600 px, JPEG), fingerprinted (SHA-256) so the same
  // photo is caught at once; the HR assistant on the Mac reads shop, date, total and VAT and checks the rest.
  // Photograph a receipt now, or pick older photos from the gallery (several at once). Each photo is made small
  // in the phone (max 1600 px, JPEG) and fingerprinted (SHA-256) so the same photo is caught at once; the HR
  // assistant on the Mac reads shop, date, total and VAT and checks the rest.
  function shrink(f) {
    return new Promise(function (ok, bad) {
      var url = URL.createObjectURL(f), im = new Image();
      im.onload = function () {
        var k = Math.min(1, 1600 / Math.max(im.width, im.height)), c = document.createElement("canvas");
        c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url); ok(c.toDataURL("image/jpeg", 0.72));
      };
      im.onerror = function () { URL.revokeObjectURL(url); bad(new Error(t("err"))); };
      im.src = url;
    });
  }
  function sha256(text) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
    });
  }
  function receiptSheet(mode) {
    var imgs = [], paid = "fuelcard", hint = "receipt";
    openSheet('<h2 style="margin-top:0">' + esc(t("up_title")) + '</h2><p class="muted small">' + esc(t("receipt_hint")) + "</p>" +
      '<input type="file" accept="image/*" capture="environment" id="rcam" style="display:none">' +
      '<input type="file" accept="image/*" multiple id="rgal" style="display:none">' +
      '<div class="two"><button class="btn dark" id="rtake">📷 ' + esc(t("receipt_take")) + '</button><button class="btn ghost" id="rpick">🖼️ ' + esc(t("receipt_gallery")) + "</button></div>" +
      '<div id="rprev" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px"></div>' +
      '<label class="f">' + esc(t("up_what")) + '</label><div class="seg" id="rhint">' + ["receipt", "doc"].map(function (k) {
        return '<button type="button" data-h="' + k + '" aria-pressed="' + (k === hint) + '">' + esc(t("up_" + k)) + "</button>"; }).join("") + "</div>" +
      '<p class="muted small" id="rdochint" style="margin:6px 2px 0;display:none">' + esc(t("up_doc_hint")) + "</p>" +
      '<div id="rpaybox"><label class="f">' + esc(t("paid_how")) + '</label><div class="seg" id="rpaid" style="flex-wrap:wrap">' + ["fuelcard", "company", "cash", "card"].map(function (k) {
        return '<button type="button" data-p="' + k + '" aria-pressed="' + (k === paid) + '">' + esc(t("paid_" + k)) + "</button>"; }).join("") + "</div>" +
      '<p class="muted small" style="margin:6px 2px 0">' + esc(t("receipt_paid_hint")) + "</p></div>" +
      '<label class="f" for="rnote">' + esc(t("receipt_note")) + '</label><input class="in" id="rnote">' +
      '<div style="display:grid;gap:10px;margin-top:16px"><button class="btn" id="rsend" disabled>' + esc(t("send")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      var cam = s.querySelector("#rcam"), gal = s.querySelector("#rgal"), send = s.querySelector("#rsend");
      s.querySelector("#rtake").onclick = function () { picking(); cam.click(); };
      s.querySelector("#rpick").onclick = function () { picking(); gal.click(); };
      s.querySelectorAll("[data-h]").forEach(function (b) { b.onclick = function () { hint = b.dataset.h; s.querySelectorAll("[data-h]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        s.querySelector("#rpaybox").style.display = hint === "doc" ? "none" : ""; s.querySelector("#rdochint").style.display = hint === "doc" ? "" : "none"; }; });
      s.querySelectorAll("[data-p]").forEach(function (b) { b.onclick = function () { paid = b.dataset.p; s.querySelectorAll("[data-p]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); }; });
      function draw() {
        s.querySelector("#rprev").innerHTML = imgs.map(function (src, i) {
          return '<div style="position:relative"><img src="' + src + '" alt="" style="width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:10px">' +
            '<button data-rm="' + i + '" aria-label="✕" style="position:absolute;top:4px;right:4px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.6);color:#fff">✕</button></div>';
        }).join("");
        s.querySelectorAll("[data-rm]").forEach(function (b) { b.onclick = function () { imgs.splice(+b.dataset.rm, 1); draw(); }; });
        send.disabled = !imgs.length;
        send.textContent = imgs.length > 1 ? t("send_n", imgs.length) : t("send");
      }
      function add(input) {
        backFromPick();
        console.log("receipt: " + (input.files ? input.files.length : 0) + " photo(s) chosen");
        var files = Array.prototype.slice.call(input.files || [], 0, 30);
        input.value = "";
        files.reduce(function (p, f) { return p.then(function () { return shrink(f).then(function (src) { imgs.push(src); draw(); }); }); }, Promise.resolve())
          .catch(function (e) { toast(e.message); });
      }
      cam.addEventListener("cancel", backFromPick); gal.addEventListener("cancel", backFromPick);
      cam.onchange = function () { add(cam); };
      if (mode === "cam") { picking(); cam.click(); } else if (mode === "gal") { picking(); gal.click(); }
      gal.onchange = function () { add(gal); };
      send.onclick = function () {
        if (!imgs.length) return;
        send.disabled = true;
        var note = s.querySelector("#rnote").value.trim(), sent = 0, dups = 0, list = imgs.slice();
        list.reduce(function (p, src, i) {
          return p.then(function () {
            send.textContent = (i + 1) + " / " + list.length + " …";
            return sha256(src).then(function (sha) {
              return rpc("team_receipt_add", { p_token: token, p_image: src, p_sha: sha, p_paid: hint === "doc" ? "none" : paid, p_note: note, p_hint: hint });
            }).then(function (r) { receipts = r.receipts; if (r.duplicate) dups++; else sent++; });
          });
        }, Promise.resolve()).then(function () {
          closeSheet();
          toast(dups ? t("receipts_done_dup", sent).replace("{d}", dups) : list.length > 1 ? t("receipts_done", sent) : t("receipt_sent"));
          go("receipts");
        }).catch(function (e) { send.disabled = false; send.textContent = t("send"); toast(e.message); });
      };
    });
  }
  function receiptView(id) {
    var r = ((receipts && receipts.list) || []).filter(function (x) { return x.id === id; })[0]; if (!r) return;
    var d = r.data || {}, rows = [[t("date"), d.date ? parse(d.date).toLocaleDateString(loc()) : ""], ["€", d.total != null ? money(d.total) : ""],
      [lang === "de" ? "MwSt." : lang === "el" ? "ΦΠΑ" : "VAT", d.vat != null ? money(d.vat) + (d.vat_rate ? " (" + d.vat_rate + " %)" : "") : ""], ["Nr.", d.number || ""],
      [t("paid_how"), t("paid_" + r.paid)], [t("receipt_note"), r.note || ""]].filter(function (x) { return x[1]; });
    var kind = d.kind || "receipt", route = (d.route || []).map(function (x) { return t("to_" + x); }).join(" + ");
    if (d.sick && d.sick.from) rows.unshift([t("dk_sick_note"), parse(d.sick.from).toLocaleDateString(loc()) + " – " + parse(d.sick.to || d.sick.from).toLocaleDateString(loc())]);
    if (d.expires) rows.unshift([t("valid_until", ""), parse(d.expires).toLocaleDateString(loc())]);
    if (d.hu_next) rows.unshift([t("hu_next", ""), d.hu_next.split("-").reverse().join("/")]);
    if (d.deadline) rows.unshift([t("deadline", ""), parse(d.deadline).toLocaleDateString(loc())]);
    if (route) rows.push(["→", t("goes_to", route)]);
    if (r.paid === "none") rows = rows.filter(function (x) { return x[0] !== t("paid_how"); });
    openSheet('<h2 style="margin-top:0">' + esc(kind !== "receipt" ? t("dk_" + kind) : d.merchant || t("ask_receipt")) + '</h2>' + (d.summary && kind !== "receipt" ? '<p class="small">' + esc(d.summary) + "</p>" : "") + '<div id="rimg" class="card" style="text-align:center">…</div>' +
      '<div class="card" style="padding:4px 14px;margin-top:12px">' + rows.map(function (x) { return kv(x[0], x[1]); }).join("") + "</div>" +
      (d.items ? '<p class="muted small" style="margin:10px 2px">' + esc([].concat(d.items).join(", ")) + "</p>" : "") +
      (d.approve === "pending" && r.status !== "rejected" ? '<h2>' + esc(t("ap_q")) + '</h2>' + (d.email && (d.email.from || d.email.subject) ? '<p class="muted small">📧 ' + esc([d.email.from, d.email.subject].filter(Boolean).join(" · ")) + "</p>" : "") +
        '<div class="grid2"><button class="btn dark" data-ap="1">' + esc(t("ap_yes")) + '</button><button class="btn ghost" data-ap="0">' + esc(t("ap_no")) + "</button></div>" : "") +
      (d.confirm === "pending" && d.approve !== "pending" ? '<h2>' + esc(t("confirm_q")) + '</h2><div style="display:grid;gap:8px">' + [["cash", "confirm_own_cash"], ["card", "confirm_own_card"], ["company", "confirm_company"]].map(function (x) {
        return '<button class="btn ' + (x[0] === "company" ? "dark" : "ghost") + '" data-conf="' + x[0] + '">' + esc(t(x[1])) + "</button>"; }).join("") + "</div>" : "") +
      '<button class="btn ghost" style="margin-top:12px" data-close>OK</button>', function (s) {
      s.querySelectorAll("[data-ap]").forEach(function (b) { b.onclick = function () {
        s.querySelectorAll("[data-ap]").forEach(function (x) { x.disabled = true; });
        var ok = b.dataset.ap === "1";
        rpc("team_receipt_approve", { p_token: token, p_id: id, p_ok: ok }).then(function (rr) { receipts = rr; closeSheet(); toast(t(ok ? "ap_ok" : "ap_cancelled")); render(); })
          .catch(function (e) { s.querySelectorAll("[data-ap]").forEach(function (x) { x.disabled = false; }); toast(e.message); });
      }; });
      s.querySelectorAll("[data-conf]").forEach(function (b) { b.onclick = function () {
        b.disabled = true;
        rpc("team_receipt_confirm", { p_token: token, p_id: id, p_paid: b.dataset.conf }).then(function (rr) { receipts = rr; closeSheet(); toast(t("saved")); render(); })
          .catch(function (e) { b.disabled = false; toast(e.message); });
      }; });
      rpc("team_receipt_image", { p_token: token, p_id: id }).then(function (src) {
        if (src && /^data:image\//.test(src)) s.querySelector("#rimg").innerHTML = '<img src="' + src + '" alt="" style="max-width:100%;max-height:420px;border-radius:12px">';
        else s.querySelector("#rimg").innerHTML = '<span class="muted small">🔒 ' + esc(t("photo_gone")) + "</span>";
      }).catch(function () {});
    });
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
    var demoReceipts = { owed: 62.4, list: [{ id: 10, at: new Date(Date.now() - 3 * 864e5).toISOString(), paid: "company", status: "read", hint: "receipt", data: { kind: "payment_confirmation", merchant: "PayPal · Ortel Mobile", total: 20, date: d(-3), invoice_missing: true } }, { id: 9, at: new Date().toISOString(), paid: "company", status: "read", note: "📧 Your receipt from Anthropic", data: { merchant: "Anthropic", date: d(0), total: 91.57, vat: 14.62, vat_rate: 19, source: "email", approve: "pending", email: { from: "Anthropic", subject: "Your receipt from Anthropic" } } }, { id: 1, at: new Date().toISOString(), paid: "cash", status: "read", data: { merchant: "Shell Stuttgart-Feuerbach", date: d(-1), total: 62.4, vat: 9.96, vat_rate: 19, number: "4711" } },
      { id: 2, at: new Date().toISOString(), paid: "fuelcard", status: "read", data: { merchant: "Aral Flughafen", date: d(-3), total: 71.1, vat: 11.35, vat_rate: 19 } },
      { id: 3, at: new Date().toISOString(), paid: "cash", status: "read", data: { merchant: "Waschpark Stuttgart", date: d(0), total: 14.9, vat: 2.38, vat_rate: 19, confirm: "pending" } },
      { id: 4, at: new Date().toISOString(), paid: "none", status: "filed", hint: "doc", data: { kind: "sick_note", sick: { from: d(0), to: d(2) }, route: ["hr"], summary: "Arbeitsunfähigkeitsbescheinigung" } },
      { id: 5, at: new Date(Date.now() - 864e5).toISOString(), paid: "none", status: "filed", hint: "doc", data: { kind: "hu_report", hu_next: "2027-11", hu_result: "ohne Mängel", route: ["fleet"], summary: "HU-Prüfbericht, keine Mängel" } }], to_confirm: 1 };
    var msgs = [], reqs = [{ id: 1, at: new Date(Date.now() - 2 * 864e5).toISOString(), kind: "leave", text: "Urlaub für Familienbesuch", details: { from: d(20), to: d(24) }, status: "with_owner", answer: "Danke, ich habe deinen Urlaub an den Chef weitergegeben. Du bekommst Bescheid, sobald er entschieden hat." }];
    var home = {
      me: { id: "demo", name: "Max Testfahrer" },
      profile: { phone: "4915100000000", type: /[?&]owner\b/.test(location.search) ? "inhaber" : "minijob", start: "2026-09-01", hourly_wage: 13.9, days_per_week: 2, vacation_days_per_year: 10, role: "Fahrer",
        documents: { fuehrerschein: { expires: "2031-04-30" }, p_schein: { expires: d(40) }, arbeitsvertrag: { signed: "2026-08-28" }, sofortmeldung: { done: "2026-08-31" } },
        duties: [{ id: "belege", due: d(3), done: false, title: { de: "Alle Belege des Vormonats hochladen", en: "Upload all receipts of last month", el: "Ανέβασε όλες τις αποδείξεις του προηγούμενου μήνα" } }] },
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
        if (fn === "driver_login" || fn === "team_login") return ok({ token: "demo", driver: home.me });
        if (fn === "team_owner_people") return ok([{ id: "demo", name: "Max Testfahrer", phone: "4915100000000", role: "Fahrer", last_seen: new Date().toISOString(), receipts_open: 1, requests_open: 1 }]);
        if (fn === "team_owner_person") return ok({ me: { id: "demo", name: "Max Testfahrer", phone: "4915100000000" }, profile: home.profile, shifts: home.shifts, leave: home.leave, requests: reqs, receipts: demoReceipts });
        if (fn === "team_owner_reset") return ok({ pin: a.p_new_pin ? "4821" : null, phone: a.p_phone ? a.p_phone.replace(/\D/g, "") : "4915100000000" });
        if (fn === "team_home") return ok(JSON.parse(JSON.stringify(home)));
        if (fn === "team_chat") return ok(msgs.slice());
        if (fn === "team_send") {
          msgs.push({ id: msgs.length + 1, at: new Date().toISOString(), sender: "employee", body: a.p_body });
          setTimeout(function () { msgs.push({ id: msgs.length + 1, at: new Date().toISOString(), sender: "agent",
            body: "(Beispiel) Du hast noch 7 Urlaubstage in diesem Jahr. Deine nächste Schicht: " + dateLabel(d(0)) + " 15:00 – 21:30." }); }, 2500);
          return ok(msgs.slice());
        }
        if (fn === "team_receipts") return ok(demoReceipts);
        if (fn === "team_receipt_add") { var dup = demoReceipts.list.some(function (x) { return x.sha === a.p_sha; }); demoReceipts.list.unshift({ id: demoReceipts.list.length + 10, at: new Date().toISOString(), paid: a.p_paid, note: a.p_note, status: dup ? "duplicate" : "new", hint: a.p_hint, data: {}, sha: a.p_sha }); return ok({ duplicate: dup, duplicate_at: new Date().toISOString(), receipts: demoReceipts }); }
        if (fn === "team_receipt_image") return ok(null);
        if (fn === "team_receipt_approve") { demoReceipts.list.forEach(function (x) { if (x.id === a.p_id) { x.data.approve = a.p_ok ? "yes" : "no"; if (!a.p_ok) x.status = "rejected"; } }); demoReceipts.to_confirm = Math.max(0, demoReceipts.to_confirm - 1); return ok(demoReceipts); }
        if (fn === "team_receipt_confirm") { demoReceipts.list.forEach(function (x) { if (x.id === a.p_id) { x.paid = a.p_paid; x.data.confirm = "done"; } }); demoReceipts.to_confirm = 0; if (a.p_paid !== "company") demoReceipts.owed += 14.9; return ok(demoReceipts); }
        if (fn === "team_prefs") { home.prefs = a.p_prefs; return ok(JSON.parse(JSON.stringify(home))); }
        if (fn === "team_read") { home.posts.forEach(function (p) { if (p.id === a.p_post) p.read_at = new Date().toISOString(); }); return ok({ ok: true }); }
        if (fn === "team_request") { reqs.unshift({ id: reqs.length + 1, at: new Date().toISOString(), kind: a.p_kind, text: a.p_text, details: a.p_details, status: "open" }); return ok(JSON.parse(JSON.stringify(home))); }
        ok(null);
      }, 250); });
    } };
  })();

  if (token) start(); else pinScreen();
})();

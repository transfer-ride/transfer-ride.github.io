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
  // Offline helper (network first; last good copy of the app's files only when there is no internet).
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) try { navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) {}

  /* ---------------- texts ---------------- */
  var T = {
    de: {
      dup_hint: "Schon einmal gesendet – zählt nicht doppelt.", owed2: "Bekommst du zurück",
      up_tab: "Hochladen", up_title: "Belege & Dokumente", up_intro: "Beleg, Krankmeldung, TÜV-Bericht, Werkstattrechnung, Führerschein, Brief – einfach fotografieren. Der Assistent erkennt, was es ist, und gibt es an die richtige Person.", up_list: "Meine Uploads", up_what: "Was ist es?", up_receipt: "Beleg (Geld ausgegeben)", up_doc: "Anderes Dokument", up_doc_hint: "Krankmeldung, TÜV, Brief, Führerschein … Der Assistent erkennt es selbst.", rs_filed: "Abgelegt", goes_to: "Geht an {n}", to_hr: "Lisa (HR)", to_fleet: "Daniel (Fahrzeuge)", to_owner: "den Chef", photo_gone: "Foto aus Datenschutzgründen gelöscht", reading_doc: "Der Assistent erkennt, was es ist, und gibt es weiter – etwa 30 Sekunden.", sick_from_to: "Krank {n}", valid_until: "Gültig bis {n}", hu_next: "Nächste HU {n}", deadline: "Frist {n}", signed_on: "Unterschrieben {n}", paid_none: "Nichts bezahlt", cat_inspection: "TÜV / HU", leave_this_year: "Urlaub {n} (gesetzlich)", leave_calc: "{d} Tage/Woche × 4 = {f} Tage im Jahr", leave_part: "{m} volle Monate → {n} Tage in diesem Jahr",
      dk_receipt: "Beleg", dk_car_invoice: "Werkstattrechnung", dk_hu_report: "TÜV-/HU-Bericht", dk_sick_note: "Krankmeldung", dk_licence: "Führerschein", dk_p_schein: "P-Schein", dk_id_card: "Ausweis", dk_work_permit: "Aufenthaltstitel", dk_contract: "Arbeitsvertrag", dk_insurance: "Versicherungsbrief", dk_fine: "Bußgeld / Anhörung", dk_car_letter: "Fahrzeug-Schreiben", dk_hr_letter: "Brief (Krankenkasse/Behörde)", dk_other: "Dokument",
      my_receipts: "Meine Belege", receipts_intro: "Auch alte Fotos aus der Galerie, mehrere auf einmal. Der Assistent liest jeden Beleg in etwa 30 Sekunden und zeigt hier, was er gelesen hat.", reading_hint: "Der Assistent liest Geschäft, Datum, Betrag und MwSt. – dauert etwa 30 Sekunden.", uploaded_at: "Gesendet um {n}", sent_on: "Gesendet {n}", yesterday: "Gestern", read_done: "Gelesen", vat: "MwSt.", on_receipt: "Auf dem Beleg", pm_cash: "Barzahlung", pm_card: "Karte", confirm_tap: "Tippe auf den blau markierten Beleg.", cat_fuel: "Tanken", cat_charging: "Laden", cat_wash: "Wäsche", cat_parking: "Parken", cat_toll: "Maut", cat_repair: "Werkstatt", cat_car_care: "Fahrzeugpflege", cat_office: "Büro", cat_phone: "Telefon", cat_food: "Essen", cat_vehicle: "Fahrzeugkauf", cat_equipment: "Geräte / Anschaffungen", cat_other: "Sonstiges",
      receipt_gallery: "Galerie / PDF", receipt_paid_hint: "Gilt für alle gewählten Fotos. Steht auf dem Beleg etwas anderes, fragt der Assistent nach.", send_n: "{n} Belege senden", receipts_done: "{n} Belege gesendet. Der HR-Assistent liest sie gleich.", receipts_done_dup: "{n} gesendet, {d} waren schon da und zählen nicht doppelt.",
      paid_company: "Firmengeld / Firmenkarte", confirm_q: "Wessen Geld war das?", confirm_own_cash: "Mein eigenes Bargeld", confirm_own_card: "Meine eigene Karte", confirm_company: "Geld der Firma", rs_confirm: "Bitte bestätigen", confirm_home: "{n} Beleg wartet auf deine Bestätigung|{n} Belege warten auf deine Bestätigung", rs_approve: "Aus E-Mail – zählt?", mail_from: "📧 aus E-Mail", ap_q: "Zählt dieser Beleg für die Firma?", ap_yes: "✓ Passt", ap_no: "✕ Abbrechen", ap_ok: "Zählt jetzt", ap_cancelled: "Abgebrochen – zählt nicht", flags_t: "Hinweis",
      ask_receipt: "Beleg", receipt_title: "Beleg hinzufügen", receipt_take: "Foto aufnehmen", receipt_again: "Anderes Foto", paid_how: "Wie bezahlt?", paid_cash: "Bar (eigenes Geld)", paid_card: "Eigene Karte", paid_fuelcard: "Tankkarte", receipt_note: "Wofür? (optional)", receipt_sent: "Beleg gesendet. Der HR-Assistent liest ihn gleich.", receipt_dup: "Diesen Beleg hast du schon am {n} gesendet. Er wird nicht doppelt gezählt.", receipts: "Belege", owed: "Bar ausgelegt – bekommst du zurück", no_receipts: "Noch keine Belege.", rs_new: "Wird gelesen", rs_read: "Gelesen", rs_duplicate: "Doppelt", rs_approved: "Bestätigt", rs_rejected: "Abgelehnt", rs_settled: "Ausgezahlt", receipt_hint: "Das ganze Blatt flach und gut beleuchtet fotografieren.",
      check: "Für Kontrollen", check_sub: "Zoll · Polizei · Ordnungsamt", check_note: "Zeig diese Seite bei einer Kontrolle. Ausweis oder Pass zusätzlich vorzeigen.", show_contract: "Arbeitsvertrag anzeigen", no_contract: "Der Vertrag ist noch nicht hinterlegt. Frag den Chef.", doc_ph: "Arbeitsbescheinigung, Vertrag, …",
      sec_space: "Mein Bereich", sec_cal: "Kalender", sec_wallet: "Geld", sec_dev: "Entwicklung", sec_docs: "Dokumente", sec_set: "Einstellungen", schedule: "Plan", prefs: "Wünsche", worked: "Gearbeitete Stunden", prefs_sub: "Wann arbeitest du am liebsten? Der Chef sieht das beim Planen.", can: "kann", cannot: "nicht", save: "Speichern", saved: "Gespeichert", movements: "Zahlungen", read_on: "Gelesen am {n}", unread: "Neu", support: "Hilfe", policy: "Nutzungsregeln", policy_text: "Transfer Team ist nur für Mitarbeiter von Transfer. Melde dich nicht auf fremden Geräten an, gib deinen PIN nicht weiter. Was du hier siehst, sind deine persönlichen Daten: bitte nicht weitergeben. Fragen an den HR-Assistenten werden auf dem Rechner der Personalverwaltung beantwortet; Entscheidungen trifft der Chef.", other_docs: "Weitere Dokumente",
      menu: "Menü", search: "Suche", search_ph: "Suchen: Urlaub, Schicht, Regeln …", no_hits: "Nichts gefunden.", c_news: "Neuigkeiten", c_company: "Über Transfer", c_benefits: "Vorteile", c_learning: "Lernen", c_development: "Entwicklung", c_guidelines: "Richtlinien", c_favs: "Favoriten", no_favs: "Tippe bei einem Beitrag auf ☆, um ihn hier zu sammeln.", full_plan: "Ganzer Plan", my_plan: "Mein Plan",
      app: "Team", forgot: "PIN vergessen?", forgot_txt: "Sag es dem Chef. Er gibt dir in der App einen neuen PIN (oder trägt eine neue Handynummer ein). Alle deine Daten bleiben.", pin: "PIN eingeben", pin_sub: "Dein 4-stelliger PIN", mobile_no: "Deine Handynummer", phone_bad: "Bitte die Handynummer prüfen.", wrong: "Falscher PIN. Noch {n} Versuche.",
      locked: "Zu viele Versuche. Bitte später noch einmal.", offline: "Keine Verbindung. Bitte später noch einmal.",
      home: "Start", plan: "Plan", requests: "Anträge", chat: "HR-Chat", profile: "Profil",
      tm_title: "Team", tm_owner: "Nur für dich als Inhaber", tm_last: "Zuletzt in der App: {n}", tm_never: "Noch nie angemeldet", tm_newpin: "Neuer PIN", tm_newpin_q: "{n} bekommt einen neuen PIN. Alte Handys werden abgemeldet, alle Daten bleiben. Weiter?", tm_pin_is: "Neuer PIN für {n}: {p}", tm_pin_tell: "Sag ihn persönlich weiter. Er wird nicht noch einmal angezeigt.", tm_phone: "Handynummer ändern", tm_phone_q: "Neue Handynummer für {n}:", tm_kept: "Alle Daten bleiben: Plan, Urlaub, Belege, Dokumente, Chat.", tm_plan: "Nächste Termine", tm_docs: "Dokumente", tm_rcpt: "Belege", tm_req: "Offene Anträge", tm_none: "Nichts", seg_rcpt: "Belege", seg_docs: "Unterlagen", seg_proof: "Nachweise", all_months: "Alle", sum_total: "Summe", sum_vat: "davon MwSt", sum_counted: "zählt", inv_missing: "Rechnung fehlt", inv_missing_top: "Hier fehlt noch die echte Rechnung", seg_empty: "Hier ist noch nichts.", dk_payment_confirmation: "Zahlungsnachweis", dk_order_confirmation: "Bestellbestätigung", bl_title: "Zahlungen", bl_sub: "Offene Rechnungen und feste Monatskosten", bl_open: "Offen", bl_due: "fällig {n}", bl_late: "überfällig seit {n}", bl_paid_btn: "Bezahlt", bl_undo: "Zurück", bl_fixed: "Feste Monatskosten", bl_from: "ab {n}", bl_paid: "Zuletzt bezahlt", bl_none: "Keine offenen Rechnungen.", rp_title: "Berichte", rp_sub: "Ausgaben pro Monat und Kategorie", rp_months: "Pro Monat", rp_cats: "Nach Kategorie", rp_people: "Nach Person", rp_flags: "Zum Prüfen", rp_year: "Jahr {n}", rp_net: "netto", ex_title: "Monatsabrechnung", ex_open: "offen", ex_approved: "freigegeben", ex_paid: "ausgezahlt", ex_approve: "Freigeben", ex_pay: "Ausgezahlt", ex_none: "Keine eigenen Auslagen.", tk_title: "Offene Aufgaben", tk_you: "Braucht dich", tk_me: "Mache ich", tk_closed: "Kürzlich erledigt", tk_upload: "Rechnung hochladen", tk_upload_doc: "Dokument hochladen", tk_done: "Erledigt", tk_notbiz: "Nicht geschäftlich", tk_notbiz_q: "Als nicht geschäftlich schließen? Dann wird nicht mehr danach gesucht.", tk_open: "Öffnen", tk_later: "Später", tk_checking: "Ich prüfe es", tk_none: "Keine offenen Aufgaben.", tk_all: "Alle ({n})", tk_dropped: "nicht geschäftlich", tk_cancelled: "storniert", tk_since: "seit {n}", tk_agent_hint: "Hier musst du nichts tun. Ich melde mich, sobald es da ist.", vat_title: "MwSt pro Quartal", vat_in: "Vorsteuer", vat_due: "Voranmeldung bis {n}", vat_hint: "Vorsteuer aus den gezählten Belegen. Die Umsatzsteuer aus den Fahrten kommt dazu.", csv_btn: "Als CSV exportieren (für Buchhaltung)", csv_done: "CSV gespeichert", doc_soon: "{d}: läuft in {n} Tag ab|{d}: läuft in {n} Tagen ab", doc_gone: "{d}: abgelaufen", doc_hint: "Bitte rechtzeitig einen Termin machen und das neue Dokument hier hochladen.", ow_today: "Für dich", ow_bills_due: "{n} Rechnung in 7 Tagen fällig|{n} Rechnungen in 7 Tagen fällig", ow_bills_late: "{n} Rechnung überfällig|{n} Rechnungen überfällig", ow_team: "{n} Sache wartet im Team|{n} Sachen warten im Team", bl_sum: "Offen gesamt", rp_prev: "Vorjahr", rp_next: "Nächstes Jahr", r_search: "Suchen (Händler, Notiz, Betrag)", r_nohit: "Nichts gefunden.", tk_sub: "Fehlende Rechnungen, Briefe, Daten", vh_title: "Fahrzeuge", vh_sub: "TÜV, Service, Versicherung, Aufgaben", vh_km: "Kilometerstand", vh_hu: "HU / TÜV", vh_service: "Nächster Service", vh_ins: "Versicherung bis", vh_cancel: "kündbar bis {n}", vh_aid: "Verbandkasten", vh_tyres: "Reifen", vh_winter: "Winterreifen", vh_summer: "Sommerreifen", vh_tasks: "Offene Aufgaben von Daniel", vh_none: "Keine Fahrzeuge.", vh_left_km: "noch {n} km", vh_over_km: "{n} km drüber", vh_month: "{n}/Monat", vh_by: "seit {n}", pr_critical: "dringend", pr_high: "wichtig", pr_normal: "normal", pr_low: "später", lv_info: "{n} Werktag (Mo–Fr)|{n} Werktage (Mo–Fr)", lv_left: "danach bleibt {n} Tag|danach bleiben {n} Tage", lv_over: "Mehr als dein Resturlaub ({n} Tage). Der Chef entscheidet.", lv_back: "„Bis“ liegt vor „Von“ – ich drehe es um.", dc_approve: "✓ Genehmigen", dc_reject: "✕ Ablehnen", dc_done: "Erledigt", dc_note: "Notiz an {n} (optional)", dc_sent: "Entschieden. {n} bekommt Bescheid.", dc_approved: "genehmigt", dc_rejected: "abgelehnt", dc_doneL: "erledigt", dc_q_reject: "Wirklich ablehnen?", stale: "Keine Verbindung – du siehst den letzten Stand.", np_btn: "+ Neu", np_title: "Neue Nachricht ans Team", np_t: "Titel", np_b: "Text", np_pin: "Oben anheften", np_hint: "Schreib in deiner Sprache. Jeder sieht es in seiner (Deutsch, Englisch, Griechisch), übersetzt in etwa einer Minute.", np_send: "Veröffentlichen", np_done: "Veröffentlicht", np_del_q: "Diese Nachricht für alle löschen?", np_deleted: "Gelöscht", ap_btn: "+ Termin", ap_title: "Neuer Termin", ap_what: "Was?", ap_ph: "z. B. Ordnungsamt, Anruf Buchhalter", ap_day: "Tag", ap_start: "Beginn", ap_end: "Ende (optional)", ap_hint: "Lisa erinnert dich 1 Monat, 1 Woche und am Tag selbst um 9 Uhr.", ap_save: "Speichern", ap_done: "Gespeichert. In ein paar Sekunden im Plan.", wn_title: "Neu in der App", wn_ok: "Verstanden", wn_all: ["Dunkles Design, wenn dein Handy dunkel eingestellt ist", "Öffnet sofort und zeigt den letzten Stand auch ohne Internet", "Urlaub: du siehst die Arbeitstage und was dir danach bleibt", "Suche findet auch Belege und offene Aufgaben", "Warnung auf der Startseite, wenn ein Dokument bald abläuft"], wn_owner: ["„Für dich“ auf der Startseite: fällige Rechnungen und was im Team wartet", "Team → Person: Anträge genehmigen oder ablehnen", "Menü → Fahrzeuge: TÜV, Service, Versicherung, Aufgaben von Daniel", "Plan → „+ Termin“, Neuigkeiten → „+ Neu“ für das Team", "Berichte: Jahr wechseln, auf Monat/Kategorie tippen für die Belege"], tk_add: "+ Eigene Aufgabe", tk_add_t: "Neue Aufgabe", tk_add_what: "Was ist zu tun?", tk_add_due: "Bis wann? (optional)", tk_mine: "Meine Aufgaben", csv_wv: "In der App kann ich keine Datei speichern. Kopiere die Tabelle und füge sie in eine E-Mail ein – oder öffne Transfer Team in Chrome und tippe dort auf Export.", csv_copy: "Tabelle kopieren", csv_copied: "Kopiert", ow_cars: "{n} dringende Fahrzeug-Aufgabe|{n} dringende Fahrzeug-Aufgaben", rq_withdraw: "Antrag zurückziehen", rq_withdraw_q: "Diesen Antrag wirklich zurückziehen?", rq_withdrawn: "Zurückgezogen", ib_title: "Hinweise", ib_sub: "Was Lisa dir sonst auf dem Mac zeigt", ib_none: "Keine Hinweise.", ow_inbox: "{n} neuer Hinweis von Lisa|{n} neue Hinweise von Lisa", ow_tasks_late: "{n} Aufgabe überfällig|{n} Aufgaben überfällig", hello: "Hallo {n}", duties: "Zu erledigen", due_by: "bis {n}", next_shift: "Deine nächste Schicht", no_shift: "Keine Schicht geplant", today: "Heute", tomorrow: "Morgen",
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
      sick_note: "Ab dem 1. Krankheitstag brauchst du eine AU (Krankschreibung) vom Arzt. Ohne AU gilt es nicht als Krankheit. Ruf am 1. Tag vor Arbeitsbeginn den Chef an.",
      chat_title: "Lisa · KI-Assistentin", chat_sub: "Künstliche Intelligenz · kann Fehler machen", ai_note: "Lisa ist eine KI (künstliche Intelligenz), kein Mensch, und kann Fehler machen. Verbindlich sind nur die Entscheidungen des Chefs und dein Vertrag – prüfe wichtige Angaben.",
      chat_empty: "Schreib in deiner Sprache – Deutsch, Englisch, Griechisch, Türkisch, Arabisch, Rumänisch oder jede andere. Frag alles zu Schichten, Urlaub, Lohn, Dokumenten oder Regeln. Über Geld, Urlaub und Verträge entscheidet der Chef.",
      typing: "Lisa schreibt …", owner: "Chef", agent: "Lisa (KI)", ph: "Nachricht schreiben …",
      q1: "Wie viel Urlaub habe ich noch?", q2: "Wann ist meine nächste Schicht?", q3: "Wann kommt der Lohn?",
      personal: "Persönlich", contract: "Vertrag", documents: "Dokumente", payslips: "Lohnzettel", settings: "Einstellungen",
      type: "Art", start: "Seit", wage: "Stundenlohn", salary: "Monatsgehalt", per_week: "Tage pro Woche", leave_year: "Urlaub pro Jahr",
      role: "Aufgabe", phone: "Telefon", expires: "gültig bis", expired: "abgelaufen", in_days: "noch {n} Tag|noch {n} Tage", signed: "unterschrieben",
      no_docs: "Keine Dokumente eingetragen.", no_payslips: "Noch keine Lohnzettel.", gross: "Brutto", net: "Netto", hours: "Stunden",
      language: "Sprache", signout: "Abmelden", cp_btn: "PIN ändern", lv_week: "Urlaub bitte mindestens 1 Woche vorher beantragen.", lv_early: "Urlaub muss mindestens 1 Woche vorher beantragt werden – frühestens ab {n}.", cc_label: "Land", ob_title: "Bevor du anfängst", ob_sub: "Das brauchen wir bis zu deinem ersten Tag ({d}). Tippe auf einen Punkt.", ob_form: "Personalfragebogen ausfüllen", ob_form_sub: "Hier in der App – oder den Papierbogen ausfüllen und ein Foto hochladen", ob_contract: "Arbeitsvertrag unterschreiben (auf Papier, mit dem Chef)", ob_id: "Ausweis oder Pass dem Chef zeigen (keine Kopie hochladen)", ob_done_n: "{n} von {m} erledigt", ob_up: "Foto hochladen", ob_paper: "Papierbogen ausgefüllt? Foto hochladen", ob_save: "Speichern (später weiter)", ob_send: "Fertig – absenden", ob_sent: "Abgeschickt. Danke! Lisa prüft es.", ob_saved: "Gespeichert", ob_decl: "Ich versichere, dass alle Angaben wahr und vollständig sind, und melde jede Änderung sofort.", ob_wa: "Freiwillig: Ich möchte in die WhatsApp-Gruppe des Arbeitgebers (meine Nummer ist dort sichtbar).", ob_need_decl: "Bitte die Erklärung unten bestätigen.", ob_privacy: "Deine Angaben sehen nur der Chef und das HR-Team. Sie werden nur für dein Arbeitsverhältnis genutzt (Lohn, Sozialversicherung, Finanzamt).", ob_view: "Personalfragebogen", ob_empty: "Noch nichts ausgefüllt.", yes: "ja", no: "nein", phone_need: "Bitte zuerst deine Handynummer eingeben.", stay_in: "Angemeldet bleiben", sp_title: "Wähle deinen eigenen PIN", sp_sub: "Nur dieses eine Mal: Wähle jetzt einen eigenen 4-stelligen PIN, den nur du kennst. Merk ihn dir gut – ab jetzt meldest du dich immer mit Handynummer + diesem PIN an (auch in der Fahrer-App). Den PIN, den du bekommen hast, gilt danach nicht mehr.", sp_old: "PIN, den du bekommen hast", cp_old: "Jetziger PIN", cp_new: "Neuer PIN (4 Ziffern)", cp_new2: "Neuer PIN noch einmal", cp_save: "PIN speichern", cp_ok: "PIN geändert. Ab jetzt gilt der neue – auch in der Fahrer-App.", cp_wrong: "Der jetzige PIN stimmt nicht.", cp_taken: "Diesen PIN hat schon jemand. Bitte einen anderen wählen.", cp_4: "Der neue PIN muss aus 4 Ziffern bestehen.", cp_same: "Die zwei neuen PINs sind nicht gleich.", install: "Zum Startbildschirm hinzufügen",
      install_ios: "In Safari: Teilen-Symbol → „Zum Home-Bildschirm“.", ig_title: "Transfer Team aufs iPhone", ig_sub: "Einmal einrichten, dann öffnet es sich wie eine App – mit eigenem Symbol und ohne Browserleiste.", ig_1: "Tippe auf das Teilen-Symbol {s} – in Safari unten (bei neuem iOS erst ⋯), in Chrome oben rechts neben der Adresse.", ig_sym: "Achte auf dieses Symbol:", ig_1s: "Tippe in Safari unten auf das Teilen-Symbol (Quadrat mit Pfeil nach oben). Siehst du es nicht? Erst auf ⋯ tippen.", ig_1c: "Tippe in Chrome oben rechts neben der Adresse auf das Teilen-Symbol (Quadrat mit Pfeil nach oben).", ig_2b: "Es geht ein Menü auf. Scrolle nach unten und tippe auf „Zum Home-Bildschirm“ (Quadrat mit +).", ig_3b: "Oben rechts auf „Hinzufügen“ tippen.", ig_4b: "Fertig! Auf deinem Home-Bildschirm ist jetzt Transfer Team. Öffne es dort und melde dich mit Handynummer + PIN an.", ig_add_label: "Zum Home-Bildschirm", ig_add_btn: "Hinzufügen", ig_2: "Wähle {a} „Zum Home-Bildschirm“ (eventuell nach unten scrollen).", ig_3: "„Als Web-App öffnen“ anlassen und oben rechts auf „Hinzufügen“ tippen.", ig_4: "Jetzt Transfer Team auf dem Home-Bildschirm öffnen und mit Handynummer + PIN anmelden.", ig_safari: "Bitte diesen Link in Safari oder Chrome öffnen (hier geht es nicht):", ig_copy: "Link kopieren", ig_copied: "Kopiert – in Safari einfügen", ig_later: "Erst mal im Browser weiter", demo: "Beispieldaten",
      t_minijob: "Minijob", t_teilzeit: "Teilzeit", t_vollzeit: "Vollzeit", t_kurzfristig: "Kurzfristig", t_freelance: "Freiberuflich", t_inhaber: "Inhaber",
      err: "Das ging nicht. Bitte noch einmal.", too_many: "Zu viele Nachrichten. Bitte etwas später.", signed_out: "Abgemeldet. Bitte PIN eingeben."
    },
    en: {
      dup_hint: "Already sent before – not counted twice.", owed2: "You get this back",
      up_tab: "Upload", up_title: "Receipts & documents", up_intro: "Receipt, sick note, TÜV report, workshop invoice, driving licence, letter – just take a photo. The assistant sees what it is and passes it to the right person.", up_list: "My uploads", up_what: "What is it?", up_receipt: "Receipt (money spent)", up_doc: "Other document", up_doc_hint: "Sick note, TÜV, letter, licence … The assistant recognises it.", rs_filed: "Filed", goes_to: "Goes to {n}", to_hr: "Lisa (HR)", to_fleet: "Daniel (vehicles)", to_owner: "the boss", photo_gone: "Photo deleted for data protection", reading_doc: "The assistant sees what it is and passes it on – about 30 seconds.", sick_from_to: "Sick {n}", valid_until: "Valid until {n}", hu_next: "Next TÜV {n}", deadline: "Deadline {n}", signed_on: "Signed {n}", paid_none: "Nothing paid", cat_inspection: "TÜV / HU", leave_this_year: "Leave {n} (by law)", leave_calc: "{d} days/week × 4 = {f} days a year", leave_part: "{m} full months → {n} days this year",
      dk_receipt: "Receipt", dk_car_invoice: "Workshop invoice", dk_hu_report: "TÜV/HU report", dk_sick_note: "Sick note", dk_licence: "Driving licence", dk_p_schein: "P-Schein", dk_id_card: "ID card", dk_work_permit: "Residence permit", dk_contract: "Employment contract", dk_insurance: "Insurance letter", dk_fine: "Fine / hearing", dk_car_letter: "Vehicle letter", dk_hr_letter: "Letter (insurer/authority)", dk_other: "Document",
      my_receipts: "My receipts", receipts_intro: "Old photos from the gallery too, several at once. The assistant reads each receipt in about 30 seconds and shows here what it read.", reading_hint: "The assistant reads shop, date, amount and VAT – takes about 30 seconds.", uploaded_at: "Sent at {n}", sent_on: "Sent {n}", yesterday: "Yesterday", read_done: "Read", vat: "VAT", on_receipt: "On the receipt", pm_cash: "cash", pm_card: "card", confirm_tap: "Tap the receipt marked in blue.", cat_fuel: "Fuel", cat_charging: "Charging", cat_wash: "Car wash", cat_parking: "Parking", cat_toll: "Toll", cat_repair: "Garage", cat_car_care: "Car care", cat_office: "Office", cat_phone: "Phone", cat_food: "Food", cat_vehicle: "Vehicle purchase", cat_equipment: "Equipment", cat_other: "Other",
      receipt_gallery: "Gallery / PDF", receipt_paid_hint: "Applies to all chosen photos. If the receipt says otherwise, the assistant asks you.", send_n: "Send {n} receipts", receipts_done: "{n} receipts sent. The HR assistant reads them in a moment.", receipts_done_dup: "{n} sent, {d} were already there and are not counted twice.",
      paid_company: "Company money / card", confirm_q: "Whose money was it?", confirm_own_cash: "My own cash", confirm_own_card: "My own card", confirm_company: "Company money", rs_confirm: "Please confirm", confirm_home: "{n} receipt waits for your confirmation|{n} receipts wait for your confirmation", rs_approve: "From e-mail – counts?", mail_from: "📧 from e-mail", ap_q: "Does this receipt count for the business?", ap_yes: "✓ Passes", ap_no: "✕ Cancel", ap_ok: "Counts now", ap_cancelled: "Cancelled – does not count", flags_t: "Note",
      ask_receipt: "Receipt", receipt_title: "Add a receipt", receipt_take: "Take photo", receipt_again: "Another photo", paid_how: "How was it paid?", paid_cash: "Cash (my own money)", paid_card: "My own card", paid_fuelcard: "Fuel card", receipt_note: "What for? (optional)", receipt_sent: "Receipt sent. The HR assistant reads it in a moment.", receipt_dup: "You already sent this receipt on {n}. It is not counted twice.", receipts: "Receipts", owed: "Paid in cash – you get it back", no_receipts: "No receipts yet.", rs_new: "Being read", rs_read: "Read", rs_duplicate: "Duplicate", rs_approved: "Approved", rs_rejected: "Declined", rs_settled: "Paid back", receipt_hint: "Photograph the whole page, flat and well lit.",
      check: "For checks", check_sub: "Customs · police · public order office", check_note: "Show this page at a check. Also show your ID card or passport.", show_contract: "Show employment contract", no_contract: "The contract is not stored yet. Ask the boss.", doc_ph: "Employment certificate, contract, …",
      sec_space: "My space", sec_cal: "Calendar", sec_wallet: "Money", sec_dev: "Development", sec_docs: "Documents", sec_set: "Settings", schedule: "Schedule", prefs: "Wishes", worked: "Worked hours", prefs_sub: "When do you like to work? The boss sees this when planning.", can: "can", cannot: "no", save: "Save", saved: "Saved", movements: "Payments", read_on: "Read on {n}", unread: "New", support: "Help", policy: "Usage rules", policy_text: "Transfer Team is only for Transfer staff. Do not sign in on other people's devices and do not share your PIN. What you see here is your personal data: please keep it to yourself. HR assistant questions are answered on the HR computer; the boss makes the decisions.", other_docs: "Other documents",
      menu: "Menu", search: "Search", search_ph: "Search: leave, shift, rules …", no_hits: "Nothing found.", c_news: "News", c_company: "About Transfer", c_benefits: "Benefits", c_learning: "Learning", c_development: "Development", c_guidelines: "Guidelines", c_favs: "Favourites", no_favs: "Tap ☆ on a post to keep it here.", full_plan: "Full schedule", my_plan: "My schedule",
      app: "Team", forgot: "Forgot your PIN?", forgot_txt: "Tell the boss. He gives you a new PIN in the app (or enters a new mobile number). All your data stays.", pin: "Enter your PIN", pin_sub: "Your 4-digit PIN", mobile_no: "Your mobile number", phone_bad: "Please check the mobile number.", wrong: "Wrong PIN. {n} tries left.",
      locked: "Too many tries. Please try later.", offline: "No connection. Please try later.",
      home: "Home", plan: "Schedule", requests: "Requests", chat: "HR chat", profile: "Profile",
      tm_title: "Team", tm_owner: "Only for you as the owner", tm_last: "Last in the app: {n}", tm_never: "Never signed in", tm_newpin: "New PIN", tm_newpin_q: "{n} gets a new PIN. Old phones are signed out, all data stays. Continue?", tm_pin_is: "New PIN for {n}: {p}", tm_pin_tell: "Tell it in person. It is not shown again.", tm_phone: "Change mobile number", tm_phone_q: "New mobile number for {n}:", tm_kept: "All data stays: plan, leave, receipts, documents, chat.", tm_plan: "Next dates", tm_docs: "Documents", tm_rcpt: "Receipts", tm_req: "Open requests", tm_none: "Nothing", seg_rcpt: "Receipts", seg_docs: "Documents", seg_proof: "Proofs", all_months: "All", sum_total: "Total", sum_vat: "VAT in it", sum_counted: "counted", inv_missing: "Invoice missing", inv_missing_top: "The real invoice is still missing", seg_empty: "Nothing here yet.", dk_payment_confirmation: "Proof of payment", dk_order_confirmation: "Order confirmation", bl_title: "Payments", bl_sub: "Open invoices and fixed monthly costs", bl_open: "Open", bl_due: "due {n}", bl_late: "overdue since {n}", bl_paid_btn: "Paid", bl_undo: "Undo", bl_fixed: "Fixed monthly costs", bl_from: "from {n}", bl_paid: "Recently paid", bl_none: "No open invoices.", rp_title: "Reports", rp_sub: "Spending per month and category", rp_months: "Per month", rp_cats: "By category", rp_people: "By person", rp_flags: "To check", rp_year: "Year {n}", rp_net: "net", ex_title: "Monthly expenses", ex_open: "open", ex_approved: "approved", ex_paid: "paid out", ex_approve: "Approve", ex_pay: "Paid out", ex_none: "No own expenses.", tk_title: "Open tasks", tk_you: "Needs you", tk_me: "I do it", tk_closed: "Recently done", tk_upload: "Upload invoice", tk_upload_doc: "Upload document", tk_done: "Done", tk_notbiz: "Not business", tk_notbiz_q: "Close as not business? Then I stop looking for it.", tk_open: "Open", tk_later: "Later", tk_checking: "I am checking it", tk_none: "No open tasks.", tk_all: "All ({n})", tk_dropped: "not business", tk_cancelled: "cancelled", tk_since: "since {n}", tk_agent_hint: "Nothing to do for you. I tell you when it is here.", vat_title: "VAT per quarter", vat_in: "Input VAT", vat_due: "Return due {n}", vat_hint: "Input VAT from the counted receipts. The VAT on the rides comes on top.", csv_btn: "Export as CSV (for the accountant)", csv_done: "CSV saved", doc_soon: "{d}: expires in {n} day|{d}: expires in {n} days", doc_gone: "{d}: expired", doc_hint: "Please book an appointment in time and upload the new document here.", ow_today: "For you", ow_bills_due: "{n} invoice due within 7 days|{n} invoices due within 7 days", ow_bills_late: "{n} invoice overdue|{n} invoices overdue", ow_team: "{n} thing waits in the team|{n} things wait in the team", bl_sum: "Open in total", rp_prev: "Previous year", rp_next: "Next year", r_search: "Search (shop, note, amount)", r_nohit: "Nothing found.", tk_sub: "Missing invoices, letters, dates", vh_title: "Vehicles", vh_sub: "Inspection, service, insurance, tasks", vh_km: "Mileage", vh_hu: "Inspection (HU)", vh_service: "Next service", vh_ins: "Insurance until", vh_cancel: "cancel by {n}", vh_aid: "First-aid kit", vh_tyres: "Tyres", vh_winter: "Winter tyres", vh_summer: "Summer tyres", vh_tasks: "Daniel's open tasks", vh_none: "No vehicles.", vh_left_km: "{n} km left", vh_over_km: "{n} km over", vh_month: "{n}/month", vh_by: "since {n}", pr_critical: "urgent", pr_high: "important", pr_normal: "normal", pr_low: "later", lv_info: "{n} working day (Mon–Fri)|{n} working days (Mon–Fri)", lv_left: "{n} day left afterwards|{n} days left afterwards", lv_over: "More than your leave left ({n} days). The boss decides.", lv_back: "\"To\" is before \"From\" – I swap them.", dc_approve: "✓ Approve", dc_reject: "✕ Decline", dc_done: "Done", dc_note: "Note to {n} (optional)", dc_sent: "Decided. {n} gets told.", dc_approved: "approved", dc_rejected: "declined", dc_doneL: "done", dc_q_reject: "Really decline?", stale: "No connection – you see the last saved state.", np_btn: "+ New", np_title: "New message to the team", np_t: "Title", np_b: "Text", np_pin: "Pin to the top", np_hint: "Write in your language. Everyone sees it in theirs (German, English, Greek), translated in about a minute.", np_send: "Publish", np_done: "Published", np_del_q: "Delete this message for everyone?", np_deleted: "Deleted", ap_btn: "+ Appointment", ap_title: "New appointment", ap_what: "What?", ap_ph: "e.g. public office, call with the accountant", ap_day: "Day", ap_start: "Start", ap_end: "End (optional)", ap_hint: "Lisa reminds you 1 month, 1 week and on the day at 9:00.", ap_save: "Save", ap_done: "Saved. In your plan in a few seconds.", wn_title: "New in the app", wn_ok: "Got it", wn_all: ["Dark design when your phone is set to dark", "Opens at once and shows the last state even without internet", "Leave: you see the working days and what is left after", "Search also finds receipts and open tasks", "Warning on Home when a document expires soon"], wn_owner: ["\"For you\" on Home: invoices due and what waits in the team", "Team → person: approve or decline requests", "Menu → Vehicles: inspection, service, insurance, Daniel's tasks", "Plan → \"+ Appointment\", News → \"+ New\" for the team", "Reports: switch year, tap a month/category for the receipts"], tk_add: "+ My own task", tk_add_t: "New task", tk_add_what: "What needs doing?", tk_add_due: "By when? (optional)", tk_mine: "My tasks", csv_wv: "The app cannot save a file. Copy the table and paste it into an e-mail – or open Transfer Team in Chrome and tap export there.", csv_copy: "Copy table", csv_copied: "Copied", ow_cars: "{n} urgent vehicle task|{n} urgent vehicle tasks", rq_withdraw: "Withdraw request", rq_withdraw_q: "Really withdraw this request?", rq_withdrawn: "Withdrawn", ib_title: "Notices", ib_sub: "What Lisa otherwise shows on the Mac", ib_none: "No notices.", ow_inbox: "{n} new notice from Lisa|{n} new notices from Lisa", ow_tasks_late: "{n} task overdue|{n} tasks overdue", hello: "Hi {n}", duties: "To do", due_by: "by {n}", next_shift: "Your next shift", no_shift: "No shift planned", today: "Today", tomorrow: "Tomorrow",
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
      sick_note: "From the 1st day of sickness you need a doctor's note (AU). Without it, it does not count as sick leave. Call the boss on day 1 before work starts.",
      chat_title: "Lisa · AI assistant", chat_sub: "Artificial intelligence · can make mistakes", ai_note: "Lisa is an AI (artificial intelligence), not a person, and can make mistakes. Only the boss's decisions and your contract are binding – check important details.",
      chat_empty: "Write in your own language – English, German, Greek, Turkish, Arabic, Romanian or any other. Ask anything about shifts, leave, pay, documents or rules. The boss decides about money, leave and contracts.",
      typing: "Lisa is typing …", owner: "Boss", agent: "Lisa (AI)", ph: "Write a message …",
      q1: "How much leave do I have left?", q2: "When is my next shift?", q3: "When is payday?",
      personal: "Personal", contract: "Contract", documents: "Documents", payslips: "Payslips", settings: "Settings",
      type: "Type", start: "Since", wage: "Hourly wage", salary: "Monthly salary", per_week: "Days a week", leave_year: "Leave a year",
      role: "Role", phone: "Phone", expires: "valid until", expired: "expired", in_days: "{n} day left|{n} days left", signed: "signed",
      no_docs: "No documents entered.", no_payslips: "No payslips yet.", gross: "Gross", net: "Net", hours: "Hours",
      language: "Language", signout: "Sign out", cp_btn: "Change PIN", lv_week: "Please ask for leave at least 1 week before.", lv_early: "Leave must be asked for at least 1 week before – earliest from {n}.", cc_label: "Country", ob_title: "Before you start", ob_sub: "We need this by your first day ({d}). Tap an item.", ob_form: "Fill in the personnel questionnaire", ob_form_sub: "Here in the app – or fill in the paper form and upload a photo", ob_contract: "Sign the employment contract (on paper, with the boss)", ob_id: "Show your ID card or passport to the boss (do not upload a copy)", ob_done_n: "{n} of {m} done", ob_up: "Upload photo", ob_paper: "Filled in the paper form? Upload a photo", ob_save: "Save (continue later)", ob_send: "Done – send", ob_sent: "Sent. Thank you! Lisa checks it.", ob_saved: "Saved", ob_decl: "I confirm that all information is true and complete, and I report any change at once.", ob_wa: "Voluntary: I want to join the employer’s WhatsApp group (my number is visible there).", ob_need_decl: "Please confirm the declaration below.", ob_privacy: "Only the boss and the HR team see your details. They are used only for your job (pay, social security, tax office).", ob_view: "Personnel questionnaire", ob_empty: "Nothing filled in yet.", yes: "yes", no: "no", phone_need: "Please enter your mobile number first.", stay_in: "Keep me signed in", sp_title: "Choose your own PIN", sp_sub: "Only this once: choose your own 4-digit PIN that only you know. Remember it well – from now on you always sign in with your mobile number + this PIN (also in the driver app). The PIN you were given no longer works after this.", sp_old: "PIN you were given", cp_old: "Current PIN", cp_new: "New PIN (4 digits)", cp_new2: "New PIN again", cp_save: "Save PIN", cp_ok: "PIN changed. The new one counts from now on – also in the driver app.", cp_wrong: "The current PIN is not right.", cp_taken: "Someone already has this PIN. Please pick another one.", cp_4: "The new PIN must be 4 digits.", cp_same: "The two new PINs are not the same.", install: "Add to home screen",
      install_ios: "In Safari: Share icon → “Add to Home Screen”.", ig_title: "Transfer Team on your iPhone", ig_sub: "Set it up once, then it opens like an app – with its own icon and no browser bar.", ig_1: "Tap the share symbol {s} – in Safari at the bottom (on newer iOS first ⋯), in Chrome at the top right next to the address.", ig_sym: "Look for this symbol:", ig_1s: "In Safari, tap the share symbol at the bottom (square with an arrow pointing up). Don’t see it? Tap ⋯ first.", ig_1c: "In Chrome, tap the share symbol at the top right next to the address (square with an arrow pointing up).", ig_2b: "A menu opens. Scroll down and tap “Add to Home Screen” (square with +).", ig_3b: "Tap “Add” at the top right.", ig_4b: "Done! Transfer Team is now on your home screen. Open it there and sign in with your mobile number + PIN.", ig_add_label: "Add to Home Screen", ig_add_btn: "Add", ig_2: "Choose {a} “Add to Home Screen” (scroll down if needed).", ig_3: "Leave “Open as Web App” on and tap “Add” at the top right.", ig_4: "Now open Transfer Team from the home screen and sign in with your mobile number + PIN.", ig_safari: "Please open this link in Safari or Chrome (it does not work in here):", ig_copy: "Copy link", ig_copied: "Copied – paste it in Safari", ig_later: "Continue in the browser for now", demo: "Sample data",
      t_minijob: "Minijob", t_teilzeit: "Part-time", t_vollzeit: "Full-time", t_kurzfristig: "Short-term", t_freelance: "Freelance", t_inhaber: "Owner",
      err: "That did not work. Please try again.", too_many: "Too many messages. Please wait a bit.", signed_out: "Signed out. Please enter your PIN."
    },
    el: {
      dup_hint: "Έχει ξανασταλεί – δεν μετράει δύο φορές.", owed2: "Θα σου επιστραφούν",
      up_tab: "Ανέβασμα", up_title: "Αποδείξεις & έγγραφα", up_intro: "Απόδειξη, αναρρωτική, έκθεση TÜV, τιμολόγιο συνεργείου, δίπλωμα, γράμμα – απλώς βγάλε φωτογραφία. Ο βοηθός καταλαβαίνει τι είναι και το δίνει στον σωστό άνθρωπο.", up_list: "Τι ανέβασα", up_what: "Τι είναι;", up_receipt: "Απόδειξη (ξόδεψα χρήματα)", up_doc: "Άλλο έγγραφο", up_doc_hint: "Αναρρωτική, TÜV, γράμμα, δίπλωμα … Ο βοηθός το αναγνωρίζει μόνος του.", rs_filed: "Αρχειοθετήθηκε", goes_to: "Πηγαίνει {n}", to_hr: "στη Lisa (HR)", to_fleet: "στον Daniel (οχήματα)", to_owner: "στο αφεντικό", photo_gone: "Η φωτογραφία σβήστηκε για προστασία δεδομένων", reading_doc: "Ο βοηθός καταλαβαίνει τι είναι και το προωθεί – περίπου 30 δευτερόλεπτα.", sick_from_to: "Άρρωστος {n}", valid_until: "Ισχύει έως {n}", hu_next: "Επόμενο TÜV {n}", deadline: "Προθεσμία {n}", signed_on: "Υπογράφηκε {n}", paid_none: "Δεν πληρώθηκε τίποτα", cat_inspection: "TÜV / HU", leave_this_year: "Άδεια {n} (κατά τον νόμο)", leave_calc: "{d} μέρες/εβδομάδα × 4 = {f} μέρες τον χρόνο", leave_part: "{m} πλήρεις μήνες → {n} μέρες φέτος",
      dk_receipt: "Απόδειξη", dk_car_invoice: "Τιμολόγιο συνεργείου", dk_hu_report: "Έκθεση TÜV/HU", dk_sick_note: "Αναρρωτική", dk_licence: "Δίπλωμα οδήγησης", dk_p_schein: "P-Schein", dk_id_card: "Ταυτότητα", dk_work_permit: "Άδεια διαμονής", dk_contract: "Σύμβαση εργασίας", dk_insurance: "Επιστολή ασφάλειας", dk_fine: "Πρόστιμο / ακρόαση", dk_car_letter: "Έγγραφο οχήματος", dk_hr_letter: "Επιστολή (ταμείο/αρχή)", dk_other: "Έγγραφο",
      my_receipts: "Οι αποδείξεις μου", receipts_intro: "Και παλιές φωτογραφίες από τη συλλογή, πολλές μαζί. Ο βοηθός διαβάζει κάθε απόδειξη σε περίπου 30 δευτερόλεπτα και σου δείχνει εδώ τι διάβασε.", reading_hint: "Ο βοηθός διαβάζει κατάστημα, ημερομηνία, ποσό και ΦΠΑ – περίπου 30 δευτερόλεπτα.", uploaded_at: "Στάλθηκε {n}", sent_on: "Στάλθηκαν {n}", yesterday: "Χθες", read_done: "Διαβάστηκε", vat: "ΦΠΑ", on_receipt: "Στην απόδειξη", pm_cash: "μετρητά", pm_card: "κάρτα", confirm_tap: "Πάτα την απόδειξη με το μπλε σήμα.", cat_fuel: "Καύσιμα", cat_charging: "Φόρτιση", cat_wash: "Πλύσιμο", cat_parking: "Στάθμευση", cat_toll: "Διόδια", cat_repair: "Συνεργείο", cat_car_care: "Περιποίηση", cat_office: "Γραφείο", cat_phone: "Τηλέφωνο", cat_food: "Φαγητό", cat_vehicle: "Αγορά οχήματος", cat_equipment: "Εξοπλισμός / αγορές", cat_other: "Άλλο",
      receipt_gallery: "Συλλογή / PDF", receipt_paid_hint: "Ισχύει για όλες τις φωτογραφίες. Αν η απόδειξη γράφει κάτι άλλο, ο βοηθός θα σε ρωτήσει.", send_n: "Αποστολή {n} αποδείξεων", receipts_done: "Στάλθηκαν {n} αποδείξεις. Ο βοηθός HR τις διαβάζει σε λίγο.", receipts_done_dup: "Στάλθηκαν {n}, οι {d} υπήρχαν ήδη και δεν μετράνε δύο φορές.",
      paid_company: "Χρήματα/κάρτα εταιρείας", confirm_q: "Τίνος χρήματα ήταν;", confirm_own_cash: "Δικά μου μετρητά", confirm_own_card: "Δική μου κάρτα", confirm_company: "Χρήματα της εταιρείας", rs_confirm: "Επιβεβαίωσε", confirm_home: "{n} απόδειξη περιμένει επιβεβαίωση|{n} αποδείξεις περιμένουν επιβεβαίωση", rs_approve: "Από email – μετράει;", mail_from: "📧 από email", ap_q: "Μετράει αυτή η απόδειξη για την επιχείρηση;", ap_yes: "✓ Περνάει", ap_no: "✕ Ακύρωση", ap_ok: "Μετράει τώρα", ap_cancelled: "Ακυρώθηκε – δεν μετράει", flags_t: "Σημείωση",
      ask_receipt: "Απόδειξη", receipt_title: "Προσθήκη απόδειξης", receipt_take: "Λήψη φωτογραφίας", receipt_again: "Άλλη φωτογραφία", paid_how: "Πώς πληρώθηκε;", paid_cash: "Μετρητά (δικά μου)", paid_card: "Δική μου κάρτα", paid_fuelcard: "Κάρτα καυσίμων", receipt_note: "Για τι; (προαιρετικά)", receipt_sent: "Η απόδειξη στάλθηκε. Ο βοηθός HR τη διαβάζει σε λίγο.", receipt_dup: "Αυτή την απόδειξη την έστειλες ήδη στις {n}. Δεν μετράει δύο φορές.", receipts: "Αποδείξεις", owed: "Πλήρωσες μετρητά – σου επιστρέφονται", no_receipts: "Καμία απόδειξη ακόμα.", rs_new: "Διαβάζεται", rs_read: "Διαβάστηκε", rs_duplicate: "Διπλή", rs_approved: "Εγκρίθηκε", rs_rejected: "Απορρίφθηκε", rs_settled: "Επιστράφηκε", receipt_hint: "Φωτογράφισε ολόκληρη τη σελίδα, ίσια και με καλό φως.",
      check: "Για ελέγχους", check_sub: "Zoll · Αστυνομία · Ordnungsamt", check_note: "Δείξε αυτή τη σελίδα σε έλεγχο. Δείξε επίσης ταυτότητα ή διαβατήριο.", show_contract: "Εμφάνιση σύμβασης εργασίας", no_contract: "Η σύμβαση δεν έχει καταχωριστεί ακόμα. Ρώτα το αφεντικό.", doc_ph: "Βεβαίωση εργασίας, σύμβαση, …",
      sec_space: "Ο χώρος μου", sec_cal: "Ημερολόγιο", sec_wallet: "Χρήματα", sec_dev: "Εξέλιξη", sec_docs: "Έγγραφα", sec_set: "Ρυθμίσεις", schedule: "Πρόγραμμα", prefs: "Προτιμήσεις", worked: "Ώρες εργασίας", prefs_sub: "Πότε προτιμάς να δουλεύεις; Το αφεντικό το βλέπει όταν φτιάχνει το πρόγραμμα.", can: "μπορώ", cannot: "όχι", save: "Αποθήκευση", saved: "Αποθηκεύτηκε", movements: "Πληρωμές", read_on: "Διαβάστηκε {n}", unread: "Νέο", support: "Βοήθεια", policy: "Κανόνες χρήσης", policy_text: "Το Transfer Team είναι μόνο για το προσωπικό του Transfer. Μη συνδέεσαι σε ξένες συσκευές και μη δίνεις το PIN σου. Όσα βλέπεις εδώ είναι προσωπικά σου στοιχεία: κράτα τα για σένα. Τις ερωτήσεις στον βοηθό HR τις απαντά ο υπολογιστής του HR· τις αποφάσεις τις παίρνει το αφεντικό.", other_docs: "Άλλα έγγραφα",
      menu: "Μενού", search: "Αναζήτηση", search_ph: "Αναζήτηση: άδεια, βάρδια, κανόνες …", no_hits: "Δεν βρέθηκε τίποτα.", c_news: "Νέα", c_company: "Για το Transfer", c_benefits: "Παροχές", c_learning: "Εκπαίδευση", c_development: "Εξέλιξη", c_guidelines: "Κανόνες", c_favs: "Αγαπημένα", no_favs: "Πάτα ☆ σε μια ανάρτηση για να τη βρίσκεις εδώ.", full_plan: "Όλο το πρόγραμμα", my_plan: "Το πρόγραμμά μου",
      app: "Team", forgot: "Ξέχασες το PIN;", forgot_txt: "Πες το στο αφεντικό. Σου δίνει νέο PIN από την εφαρμογή (ή βάζει νέο κινητό). Όλα τα δεδομένα σου μένουν.", pin: "Βάλε το PIN", pin_sub: "Το 4ψήφιο PIN σου", mobile_no: "Το κινητό σου", phone_bad: "Έλεγξε τον αριθμό του κινητού.", wrong: "Λάθος PIN. Απομένουν {n} προσπάθειες.",
      locked: "Πολλές προσπάθειες. Δοκίμασε αργότερα.", offline: "Χωρίς σύνδεση. Δοκίμασε αργότερα.",
      home: "Αρχική", plan: "Πρόγραμμα", requests: "Αιτήματα", chat: "Chat HR", profile: "Προφίλ",
      tm_title: "Ομάδα", tm_owner: "Μόνο για σένα ως ιδιοκτήτη", tm_last: "Τελευταία φορά στην εφαρμογή: {n}", tm_never: "Δεν έχει συνδεθεί ακόμα", tm_newpin: "Νέο PIN", tm_newpin_q: "Ο/Η {n} θα πάρει νέο PIN. Τα παλιά κινητά αποσυνδέονται, όλα τα δεδομένα μένουν. Συνέχεια;", tm_pin_is: "Νέο PIN για {n}: {p}", tm_pin_tell: "Πες το του προσωπικά. Δεν θα ξαναφανεί.", tm_phone: "Αλλαγή κινητού", tm_phone_q: "Νέο κινητό για {n}:", tm_kept: "Όλα τα δεδομένα μένουν: πρόγραμμα, άδειες, αποδείξεις, έγγραφα, chat.", tm_plan: "Επόμενα ραντεβού", tm_docs: "Έγγραφα", tm_rcpt: "Αποδείξεις", tm_req: "Ανοιχτά αιτήματα", tm_none: "Τίποτα", seg_rcpt: "Αποδείξεις", seg_docs: "Δικαιολογητικά", seg_proof: "Αποδεικτικά", all_months: "Όλα", sum_total: "Σύνολο", sum_vat: "από αυτά ΦΠΑ", sum_counted: "μετράνε", inv_missing: "Λείπει τιμολόγιο", inv_missing_top: "Εδώ λείπει ακόμα το κανονικό τιμολόγιο", seg_empty: "Δεν υπάρχει τίποτα εδώ ακόμα.", dk_payment_confirmation: "Αποδεικτικό πληρωμής", dk_order_confirmation: "Επιβεβαίωση παραγγελίας", bl_title: "Πληρωμές", bl_sub: "Ανοιχτά τιμολόγια και σταθερά μηνιαία", bl_open: "Ανοιχτά", bl_due: "λήγει {n}", bl_late: "ληξιπρόθεσμο από {n}", bl_paid_btn: "Πληρώθηκε", bl_undo: "Αναίρεση", bl_fixed: "Σταθερά μηνιαία έξοδα", bl_from: "από {n}", bl_paid: "Πληρώθηκαν πρόσφατα", bl_none: "Κανένα ανοιχτό τιμολόγιο.", rp_title: "Αναφορές", rp_sub: "Έξοδα ανά μήνα και κατηγορία", rp_months: "Ανά μήνα", rp_cats: "Ανά κατηγορία", rp_people: "Ανά άτομο", rp_flags: "Για έλεγχο", rp_year: "Έτος {n}", rp_net: "καθαρά", ex_title: "Μηνιαία έξοδα", ex_open: "ανοιχτό", ex_approved: "εγκρίθηκε", ex_paid: "πληρώθηκε", ex_approve: "Έγκριση", ex_pay: "Πληρώθηκε", ex_none: "Δεν υπάρχουν έξοδα από δικά του χρήματα.", tk_title: "Εκκρεμότητες", tk_you: "Θέλει εσένα", tk_me: "Το κάνω εγώ", tk_closed: "Έκλεισαν πρόσφατα", tk_upload: "Ανέβασε το τιμολόγιο", tk_upload_doc: "Ανέβασε το έγγραφο", tk_done: "Έγινε", tk_notbiz: "Δεν είναι της δουλειάς", tk_notbiz_q: "Να κλείσει ως μη επαγγελματικό; Τότε σταματάω να το ψάχνω.", tk_open: "Άνοιγμα", tk_later: "Αργότερα", tk_checking: "Το ελέγχω", tk_none: "Καμία ανοιχτή εκκρεμότητα.", tk_all: "Όλες ({n})", tk_dropped: "όχι της δουλειάς", tk_cancelled: "ακυρώθηκε", tk_since: "από {n}", tk_agent_hint: "Δεν χρειάζεται να κάνεις τίποτα. Θα σου πω μόλις έρθει.", vat_title: "ΦΠΑ ανά τρίμηνο", vat_in: "ΦΠΑ εξόδων (Vorsteuer)", vat_due: "Δήλωση έως {n}", vat_hint: "ΦΠΑ από τις αποδείξεις που μετράνε. Ο ΦΠΑ από τις διαδρομές προστίθεται.", csv_btn: "Εξαγωγή CSV (για τον λογιστή)", csv_done: "Το CSV αποθηκεύτηκε", doc_soon: "{d}: λήγει σε {n} μέρα|{d}: λήγει σε {n} μέρες", doc_gone: "{d}: έληξε", doc_hint: "Κλείσε ραντεβού έγκαιρα και ανέβασε εδώ το νέο έγγραφο.", ow_today: "Για σένα", ow_bills_due: "{n} τιμολόγιο λήγει μέσα σε 7 μέρες|{n} τιμολόγια λήγουν μέσα σε 7 μέρες", ow_bills_late: "{n} τιμολόγιο ληξιπρόθεσμο|{n} τιμολόγια ληξιπρόθεσμα", ow_team: "{n} θέμα περιμένει στην ομάδα|{n} θέματα περιμένουν στην ομάδα", bl_sum: "Ανοιχτά συνολικά", rp_prev: "Προηγούμενο έτος", rp_next: "Επόμενο έτος", r_search: "Αναζήτηση (κατάστημα, σημείωση, ποσό)", r_nohit: "Δεν βρέθηκε τίποτα.", tk_sub: "Τιμολόγια που λείπουν, γράμματα, ημερομηνίες", vh_title: "Αυτοκίνητα", vh_sub: "ΚΤΕΟ, σέρβις, ασφάλεια, εργασίες", vh_km: "Χιλιόμετρα", vh_hu: "ΚΤΕΟ (HU)", vh_service: "Επόμενο σέρβις", vh_ins: "Ασφάλεια έως", vh_cancel: "καταγγελία έως {n}", vh_aid: "Φαρμακείο", vh_tyres: "Λάστιχα", vh_winter: "Χειμερινά", vh_summer: "Καλοκαιρινά", vh_tasks: "Ανοιχτές εργασίες του Daniel", vh_none: "Κανένα αυτοκίνητο.", vh_left_km: "απομένουν {n} km", vh_over_km: "{n} km πάνω", vh_month: "{n}/μήνα", vh_by: "από {n}", pr_critical: "επείγον", pr_high: "σημαντικό", pr_normal: "κανονικό", pr_low: "αργότερα", lv_info: "{n} εργάσιμη (Δευ–Παρ)|{n} εργάσιμες (Δευ–Παρ)", lv_left: "σου μένει μετά {n} μέρα|σου μένουν μετά {n} μέρες", lv_over: "Περισσότερες από όσες σου μένουν ({n} μέρες). Αποφασίζει το αφεντικό.", lv_back: "Το «Έως» είναι πριν από το «Από» – τα αντιστρέφω.", dc_approve: "✓ Εγκρίνω", dc_reject: "✕ Απορρίπτω", dc_done: "Έγινε", dc_note: "Σημείωση προς {n} (προαιρετικά)", dc_sent: "Έγινε. Ο/Η {n} ενημερώνεται.", dc_approved: "εγκρίθηκε", dc_rejected: "απορρίφθηκε", dc_doneL: "έγινε", dc_q_reject: "Σίγουρα απόρριψη;", stale: "Χωρίς σύνδεση – βλέπεις τα τελευταία στοιχεία.", np_btn: "+ Νέο", np_title: "Νέα ανακοίνωση στην ομάδα", np_t: "Τίτλος", np_b: "Κείμενο", np_pin: "Καρφίτσωμα πάνω πάνω", np_hint: "Γράψε στη γλώσσα σου. Ο καθένας τη βλέπει στη δική του (γερμανικά, αγγλικά, ελληνικά), μεταφρασμένη σε περίπου ένα λεπτό.", np_send: "Δημοσίευση", np_done: "Δημοσιεύτηκε", np_del_q: "Να σβηστεί αυτή η ανακοίνωση για όλους;", np_deleted: "Σβήστηκε", ap_btn: "+ Ραντεβού", ap_title: "Νέο ραντεβού", ap_what: "Τι;", ap_ph: "π.χ. Ordnungsamt, τηλέφωνο με λογιστή", ap_day: "Μέρα", ap_start: "Ώρα", ap_end: "Τέλος (προαιρετικά)", ap_hint: "Η Lisa σού το θυμίζει 1 μήνα, 1 εβδομάδα πριν και την ίδια μέρα στις 9:00.", ap_save: "Αποθήκευση", ap_done: "Αποθηκεύτηκε. Σε λίγα δευτερόλεπτα στο πρόγραμμα.", wn_title: "Νέα στην εφαρμογή", wn_ok: "Εντάξει", wn_all: ["Σκούρο θέμα όταν το κινητό είναι σε σκούρο", "Ανοίγει αμέσως και δείχνει τα τελευταία στοιχεία και χωρίς internet", "Άδεια: βλέπεις τις εργάσιμες και πόσες σου μένουν", "Η αναζήτηση βρίσκει και αποδείξεις και εκκρεμότητες", "Προειδοποίηση στην αρχική όταν λήγει ένα έγγραφο"], wn_owner: ["«Για σένα» στην αρχική: τιμολόγια που λήγουν και ό,τι περιμένει στην ομάδα", "Ομάδα → άτομο: εγκρίνεις ή απορρίπτεις αιτήματα", "Μενού → Αυτοκίνητα: ΚΤΕΟ, σέρβις, ασφάλεια, εργασίες του Daniel", "Πρόγραμμα → «+ Ραντεβού», Νέα → «+ Νέο» για την ομάδα", "Αναφορές: αλλαγή έτους, πάτα μήνα/κατηγορία για τις αποδείξεις"], tk_add: "+ Δική μου εκκρεμότητα", tk_add_t: "Νέα εκκρεμότητα", tk_add_what: "Τι πρέπει να γίνει;", tk_add_due: "Μέχρι πότε; (προαιρετικά)", tk_mine: "Δικές μου", csv_wv: "Μέσα στην εφαρμογή δεν αποθηκεύεται αρχείο. Αντίγραψε τον πίνακα και επικόλλησέ τον σε email – ή άνοιξε το Transfer Team στον Chrome και πάτα εκεί Εξαγωγή.", csv_copy: "Αντιγραφή πίνακα", csv_copied: "Αντιγράφηκε", ow_cars: "{n} επείγουσα εργασία αυτοκινήτου|{n} επείγουσες εργασίες αυτοκινήτου", rq_withdraw: "Ακύρωση αιτήματος", rq_withdraw_q: "Σίγουρα να ακυρωθεί αυτό το αίτημα;", rq_withdrawn: "Ακυρώθηκε", ib_title: "Ειδοποιήσεις", ib_sub: "Όσα η Lisa δείχνει αλλιώς μόνο στο Mac", ib_none: "Καμία ειδοποίηση.", ow_inbox: "{n} νέα ειδοποίηση από τη Lisa|{n} νέες ειδοποιήσεις από τη Lisa", ow_tasks_late: "{n} εκκρεμότητα έληξε|{n} εκκρεμότητες έληξαν", hello: "Γεια σου {n}", duties: "Υποχρεώσεις", due_by: "έως {n}", next_shift: "Η επόμενη βάρδια σου", no_shift: "Καμία βάρδια", today: "Σήμερα", tomorrow: "Αύριο",
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
      sick_note: "Από την 1η μέρα ασθένειας χρειάζεσαι βεβαίωση γιατρού (AU). Χωρίς βεβαίωση δεν μετράει ως ασθένεια. Πάρε τηλέφωνο το αφεντικό την 1η μέρα πριν την ώρα της δουλειάς.",
      chat_title: "Lisa · Βοηθός AI", chat_sub: "Τεχνητή νοημοσύνη · μπορεί να κάνει λάθη", ai_note: "Η Lisa είναι AI (τεχνητή νοημοσύνη), όχι άνθρωπος, και μπορεί να κάνει λάθη. Δεσμευτικές είναι μόνο οι αποφάσεις του αφεντικού και η σύμβασή σου – έλεγξε τα σημαντικά.",
      chat_empty: "Γράψε στη γλώσσα σου – ελληνικά, γερμανικά, αγγλικά, τουρκικά, αραβικά, ρουμανικά ή όποια άλλη. Ρώτα ό,τι θες για βάρδιες, άδειες, μισθό, έγγραφα ή κανόνες. Για χρήματα, άδειες και συμβάσεις αποφασίζει το αφεντικό.",
      typing: "Η Lisa γράφει …", owner: "Αφεντικό", agent: "Lisa (AI)", ph: "Γράψε μήνυμα …",
      q1: "Πόση άδεια μου μένει;", q2: "Πότε είναι η επόμενη βάρδια μου;", q3: "Πότε πληρωνόμαστε;",
      personal: "Προσωπικά", contract: "Σύμβαση", documents: "Έγγραφα", payslips: "Εκκαθαριστικά", settings: "Ρυθμίσεις",
      type: "Είδος", start: "Από", wage: "Ωρομίσθιο", salary: "Μηνιαίος μισθός", per_week: "Μέρες την εβδομάδα", leave_year: "Άδεια τον χρόνο",
      role: "Θέση", phone: "Τηλέφωνο", expires: "ισχύει έως", expired: "έληξε", in_days: "απομένει {n} μέρα|απομένουν {n} μέρες", signed: "υπογράφηκε",
      no_docs: "Δεν έχουν καταχωριστεί έγγραφα.", no_payslips: "Δεν υπάρχουν εκκαθαριστικά ακόμα.", gross: "Μικτά", net: "Καθαρά", hours: "Ώρες",
      language: "Γλώσσα", signout: "Αποσύνδεση", cp_btn: "Αλλαγή PIN", lv_week: "Η άδεια δηλώνεται τουλάχιστον 1 εβδομάδα πριν.", lv_early: "Η άδεια δηλώνεται τουλάχιστον 1 εβδομάδα πριν – το νωρίτερο από {n}.", cc_label: "Χώρα", ob_title: "Πριν ξεκινήσεις", ob_sub: "Τα χρειαζόμαστε μέχρι την πρώτη σου μέρα ({d}). Πάτα σε κάθε σημείο.", ob_form: "Συμπλήρωσε το ερωτηματολόγιο προσωπικού", ob_form_sub: "Εδώ στην εφαρμογή – ή συμπλήρωσε το χαρτί και ανέβασε φωτογραφία", ob_contract: "Υπογραφή σύμβασης εργασίας (σε χαρτί, με το αφεντικό)", ob_id: "Δείξε ταυτότητα ή διαβατήριο στο αφεντικό (μην ανεβάσεις αντίγραφο)", ob_done_n: "{n} από {m} έτοιμα", ob_up: "Ανέβασε φωτογραφία", ob_paper: "Συμπλήρωσες το χαρτί; Ανέβασε φωτογραφία", ob_save: "Αποθήκευση (συνεχίζω αργότερα)", ob_send: "Έτοιμο – αποστολή", ob_sent: "Στάλθηκε. Ευχαριστούμε! Η Lisa το ελέγχει.", ob_saved: "Αποθηκεύτηκε", ob_decl: "Βεβαιώνω ότι όλα τα στοιχεία είναι αληθινά και πλήρη και θα ενημερώνω αμέσως για κάθε αλλαγή.", ob_wa: "Προαιρετικά: θέλω να μπω στην ομάδα WhatsApp του εργοδότη (ο αριθμός μου φαίνεται εκεί).", ob_need_decl: "Επιβεβαίωσε τη δήλωση στο τέλος.", ob_privacy: "Τα στοιχεία σου τα βλέπουν μόνο το αφεντικό και το HR. Χρησιμοποιούνται μόνο για τη δουλειά σου (μισθός, ασφάλιση, εφορία).", ob_view: "Ερωτηματολόγιο προσωπικού", ob_empty: "Δεν έχει συμπληρωθεί τίποτα ακόμα.", yes: "ναι", no: "όχι", phone_need: "Γράψε πρώτα τον αριθμό του κινητού σου.", stay_in: "Μείνε συνδεδεμένος", sp_title: "Διάλεξε το δικό σου PIN", sp_sub: "Μόνο αυτή τη φορά: διάλεξε τώρα ένα δικό σου 4ψήφιο PIN που θα ξέρεις μόνο εσύ. Να το θυμάσαι καλά – από εδώ και πέρα μπαίνεις πάντα με το κινητό σου + αυτό το PIN (και στην εφαρμογή οδηγού). Το PIN που σου έδωσαν δεν θα ισχύει πια.", sp_old: "PIN που σου έδωσαν", cp_old: "Τωρινό PIN", cp_new: "Νέο PIN (4 ψηφία)", cp_new2: "Νέο PIN ξανά", cp_save: "Αποθήκευση PIN", cp_ok: "Το PIN άλλαξε. Από τώρα ισχύει το νέο – και στην εφαρμογή οδηγού.", cp_wrong: "Το τωρινό PIN δεν είναι σωστό.", cp_taken: "Αυτό το PIN το έχει ήδη κάποιος άλλος. Διάλεξε άλλο.", cp_4: "Το νέο PIN πρέπει να έχει 4 ψηφία.", cp_same: "Τα δύο νέα PIN δεν είναι ίδια.", install: "Προσθήκη στην αρχική οθόνη",
      install_ios: "Στο Safari: εικονίδιο κοινοποίησης → «Προσθήκη στην οθόνη αφετηρίας».", ig_title: "Το Transfer Team στο iPhone σου", ig_sub: "Το ρυθμίζεις μία φορά και μετά ανοίγει σαν εφαρμογή – με δικό του εικονίδιο, χωρίς τη μπάρα του browser.", ig_1: "Πάτα το σύμβολο κοινοποίησης {s} – στο Safari κάτω (σε νέο iOS πρώτα το ⋯), στο Chrome πάνω δεξιά δίπλα στη διεύθυνση.", ig_sym: "Ψάξε αυτό το σύμβολο:", ig_1s: "Στο Safari πάτα κάτω το σύμβολο κοινοποίησης (τετράγωνο με βελάκι προς τα πάνω). Δεν το βλέπεις; Πάτα πρώτα το ⋯.", ig_1c: "Στο Chrome πάτα πάνω δεξιά, δίπλα στη διεύθυνση, το σύμβολο κοινοποίησης (τετράγωνο με βελάκι προς τα πάνω).", ig_2b: "Ανοίγει ένα μενού. Κατέβα λίγο και πάτα «Προσθήκη στην οθόνη αφετηρίας» (τετράγωνο με +).", ig_3b: "Πάτα πάνω δεξιά «Προσθήκη».", ig_4b: "Έτοιμο! Στην αρχική οθόνη του κινητού υπάρχει τώρα το Transfer Team. Άνοιξέ το από εκεί και συνδέσου με κινητό + PIN.", ig_add_label: "Προσθήκη στην οθόνη αφετηρίας", ig_add_btn: "Προσθήκη", ig_2: "Διάλεξε {a} «Προσθήκη στην οθόνη αφετηρίας» (ίσως χρειαστεί να κατέβεις λίγο).", ig_3: "Άφησε ανοιχτό το «Άνοιγμα ως εφαρμογή Ιστού» και πάτα πάνω δεξιά «Προσθήκη».", ig_4: "Άνοιξε τώρα το Transfer Team από την αρχική οθόνη και συνδέσου με κινητό + PIN.", ig_safari: "Άνοιξε αυτόν τον σύνδεσμο στο Safari ή στο Chrome (εδώ μέσα δεν γίνεται):", ig_copy: "Αντιγραφή συνδέσμου", ig_copied: "Αντιγράφηκε – επικόλλησέ τον στο Safari", ig_later: "Συνέχεια στον browser προς το παρόν", demo: "Δείγμα",
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
  // Last good data on this phone: the app opens at once and still shows something without internet. Cleared on sign-out.
  var stale = false;
  function cacheSet(k, v) { if (!DEMO) try { localStorage.setItem("team_c_" + k, JSON.stringify(v)); } catch (e) {} }
  function cacheGet(k) { if (DEMO) return null; try { return JSON.parse(localStorage.getItem("team_c_" + k) || "null"); } catch (e) { return null; } }
  function cacheClear() { ["home", "rc"].forEach(function (k) { store("team_c_" + k, null); }); }
  var lang = load("team_lang") || ((navigator.language || "de").slice(0, 2) in T ? (navigator.language || "de").slice(0, 2) : "de");
  var token = DEMO && !/[?&]firstpin\b/.test(location.search) ? "demo" : load("team_token");
  var data = null, tab = load("team_tab") || "home", chat = [], chatTimer = null, homeTimer = null, sheet = null, planView = "week";
  // "one|many" texts pick the form by n (1 → first, else second).
  function t(k, n) { var s = (T[lang] && T[lang][k]) || T.de[k] || k; if (s.indexOf("|") > 0 && n != null) s = s.split("|")[Number(n) === 1 ? 0 : 1]; return n == null ? s : s.replace("{n}", n); }
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
  function clock(iso) { var d = new Date(iso); return d.toLocaleTimeString(loc(), { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }); }
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

  /* ---------------- Before you start: Personalfragebogen + documents (v38) ---------------- */
  // Field list = the paper Personalfragebogen (hr/vertraege/…/KORB_Personalfragebogen.pdf), sections 1–8.
  // [key, German (official), English, Greek, type]  type: t text, d date, n number, e e-mail, yn yes/no, or "a|b|c" choice.
  var OBF = [
    ["1", "Persönliche Angaben", "Personal details", "Προσωπικά στοιχεία"],
    ["surname", "Nachname", "Surname", "Επώνυμο", "t"], ["first_names", "Vorname(n)", "First name(s)", "Όνομα/ονόματα", "t"],
    ["birth_name", "Geburtsname (falls abweichend)", "Birth name (if different)", "Επώνυμο γέννησης (αν διαφέρει)", "t"],
    ["gender", "Geschlecht", "Gender", "Φύλο", "m|f|d"], ["street", "Straße, Hausnr.", "Street, no.", "Οδός, αριθμός", "t"],
    ["zip_city", "PLZ, Ort", "Postcode, city", "ΤΚ, πόλη", "t"], ["birth_date", "Geburtsdatum", "Date of birth", "Ημερομηνία γέννησης", "d"],
    ["birth_place", "Geburtsort, -land", "Place, country of birth", "Τόπος, χώρα γέννησης", "t"], ["nationality", "Staatsangehörigkeit", "Nationality", "Υπηκοότητα", "t"],
    ["email", "E-Mail (privat)", "E-mail (private)", "Email (προσωπικό)", "e"], ["uber_email", "E-Mail des Uber-Driver-Kontos", "Uber Driver account e-mail", "Email λογαριασμού Uber Driver", "e"],
    ["2", "Steuer und Sozialversicherung", "Tax and social security", "Εφορία και ασφάλιση"],
    ["tax_id", "Steuer-ID (11 Ziffern)", "Tax ID (11 digits)", "Steuer-ID (11 ψηφία)", "t"], ["tax_class", "Steuerklasse", "Tax class", "Φορολογική κλάση", "t"],
    ["religion", "Konfession (Kirchensteuer)", "Religion (church tax)", "Θρήσκευμα (φόρος εκκλησίας)", "t"], ["child_allow", "Kinderfreibeträge", "Child allowances", "Αφορολόγητο παιδιών", "t"],
    ["sv_nr", "Sozialversicherungsnr. (oder „noch keine“)", "Social security no. (or “none yet”)", "Αριθμός κοινωνικής ασφάλισης (ή «δεν έχω ακόμα»)", "t"],
    ["job_kind", "Beschäftigung ist", "This job is", "Αυτή η δουλειά είναι", "Haupt|Neben"],
    ["health", "Gesetzliche Krankenkasse", "Health insurer", "Ταμείο υγείας (Krankenkasse)", "t"], ["health_since", "Versichert seit", "Insured since", "Ασφαλισμένη/ος από", "d"],
    ["health_type", "Versicherungsart", "Insurance type", "Είδος ασφάλισης", "selbst|familienversichert|privat"],
    ["children", "Eigene Kinder?", "Own children?", "Δικά σου παιδιά;", "yn"], ["children_u25", "davon unter 25 J.", "of which under 25", "από αυτά κάτω των 25", "n"],
    ["disabled", "Schwerbehindert (freiwillig)", "Severely disabled (voluntary)", "Αναπηρία (προαιρετικά)", "yn"],
    ["3", "Bankverbindung", "Bank details", "Τράπεζα"],
    ["iban", "IBAN", "IBAN", "IBAN", "t"], ["holder", "Kontoinhaber", "Account holder", "Δικαιούχος", "t"], ["bank", "Bank", "Bank", "Τράπεζα", "t"], ["bic", "BIC", "BIC", "BIC", "t"],
    ["4", "Ausbildung", "Education", "Σπουδές"],
    ["school", "Höchster Schulabschluss", "Highest school level", "Ανώτερο απολυτήριο", "ohne|Haupt-/Volksschule|Mittlere Reife|Abitur/Fachabitur|unbekannt"],
    ["voc", "Höchste Berufsausbildung", "Highest vocational qualification", "Ανώτερη επαγγελματική εκπαίδευση", "ohne|Berufsausbildung|Meister/Techniker|Bachelor|Master/Diplom|Promotion"],
    ["5", "Weitere Beschäftigungen und Status", "Other jobs and status", "Άλλες δουλειές και κατάσταση"],
    ["other_job", "Weitere Beschäftigung?", "Other employment?", "Άλλη δουλειά;", "yn"], ["other_employer", "Arbeitgeber dort", "Employer there", "Εργοδότης εκεί", "t"],
    ["other_type", "Art dort", "Type there", "Είδος εκεί", "Minijob|Teilzeit|Vollzeit"], ["other_hours", "Std./Woche dort", "Hours/week there", "Ώρες/εβδομάδα εκεί", "n"],
    ["other_gross", "Brutto/Monat dort (€)", "Gross/month there (€)", "Μικτά/μήνα εκεί (€)", "n"], ["other_this_year", "Beschäftigungen im lfd. Jahr (von–bis)", "Other jobs this year (from–to)", "Άλλες δουλειές φέτος (από–έως)", "t"],
    ["pension", "Altersrente", "Old-age pension", "Σύνταξη γήρατος", "yn"], ["student", "Student/in (eingeschrieben)", "Enrolled student", "Φοιτήτρια/ής", "yn"],
    ["alg", "Bezug ALG I / Bürgergeld", "Unemployment benefit", "Επίδομα ανεργίας / Bürgergeld", "yn"], ["before", "Schon einmal bei uns beschäftigt?", "Worked for us before?", "Έχεις δουλέψει ξανά σε εμάς;", "yn"],
    ["6", "Fahrerlaubnisse", "Driving licences", "Άδειες οδήγησης"],
    ["dl_no", "Führerschein-Nr.", "Licence no.", "Αριθμός διπλώματος", "t"], ["dl_classes", "Klassen", "Classes", "Κατηγορίες", "t"], ["dl_country", "Ausgestellt in", "Issued in", "Εκδόθηκε σε", "t"],
    ["dl_points", "Punkte Flensburg", "Penalty points", "Πόντοι Flensburg", "n"], ["ps_no", "P-Schein-Nr.", "Passenger licence no.", "Αριθμός P-Schein", "t"],
    ["ps_until", "P-Schein gültig bis", "P-Schein valid until", "P-Schein ισχύει έως", "d"], ["ps_auth", "Ausstellende Behörde", "Issuing authority", "Αρχή έκδοσης", "t"],
    ["7", "Nur Nicht-EU/EWR/Schweiz", "Non-EU/EEA/Swiss only", "Μόνο εκτός ΕΕ/ΕΟΧ/Ελβετίας"],
    ["permit", "Aufenthaltstitel (Art)", "Residence permit (type)", "Άδεια διαμονής (είδος)", "t"], ["permit_until", "Gültig bis", "Valid until", "Ισχύει έως", "d"],
    ["work_ok", "Erwerbstätigkeit erlaubt", "Work permitted", "Επιτρέπεται εργασία", "yn"],
    ["8", "Nur Minijob", "Minijob only", "Μόνο Minijob"],
    ["rv_exempt", "Befreiung von der Rentenversicherung beantragt", "Exemption from pension insurance requested", "Αίτηση απαλλαγής από τη σύνταξη (RV)", "yn"],
    ["rv_date", "Datum Antrag", "Date of request", "Ημερομηνία αίτησης", "d"]
  ];
  var OBD = [["fuehrerschein", "Führerschein (beidseitig)", "Driving licence (both sides)", "Δίπλωμα (και οι δύο πλευρές)"], ["p_schein", "P-Schein", "P-Schein (passenger licence)", "P-Schein (άδεια μεταφοράς επιβατών)"],
    ["sv", "SV-Ausweis / Rentenversicherungsnachweis", "Social security card / proof", "Κάρτα κοινωνικής ασφάλισης (SV-Ausweis)"], ["kk", "Mitgliedsbescheinigung Krankenkasse", "Health insurer certificate", "Βεβαίωση ταμείου υγείας"],
    ["steuer_id", "Nachweis Steuer-ID", "Tax ID letter", "Βεβαίωση Steuer-ID"], ["rv", "Befreiungsantrag Rentenversicherung (Minijob)", "Pension exemption form (Minijob)", "Αίτηση απαλλαγής RV (Minijob)"]];
  function obLab(x) { return lang === "de" ? x[1] : (lang === "el" ? x[3] : x[2]) + (lang !== "de" ? " · " + x[1] : ""); }
  var onb = null;
  function onbLoad() { if (onb || onbLoad.busy) return; onbLoad.busy = true; rpc("team_onboarding_get", { p_token: token }).then(function (o) { onb = o || { data: {} }; onbLoad.busy = false; if (tab === "home" && !sheet) render(); }).catch(function () { onbLoad.busy = false; }); }
  function onbUploaded(k) { return ((receipts && receipts.list) || []).some(function (r) { return String(r.note || "").indexOf("onb:" + k) === 0 && r.status !== "rejected"; }); }
  function onboardingCard(p) {
    if (!p || p.type === "inhaber" || !(p.status === "planned" || (p.start && p.start > ymd(new Date())))) return "";
    onbLoad();
    var docs = p.documents || {}, items = [];
    items.push({ k: "form", done: !!(onb && onb.submitted_at) || onbUploaded("form"), t: t("ob_form"), sub: t("ob_form_sub") });
    OBD.forEach(function (x) { if (x[0] === "rv" && p.type !== "minijob") return; items.push({ k: x[0], done: onbUploaded(x[0]), t: obLab(x) }); });
    items.push({ k: "contract", done: !!(docs.arbeitsvertrag && docs.arbeitsvertrag.signed), t: t("ob_contract"), info: 1 });
    items.push({ k: "id", done: !!(docs.ausweis && docs.ausweis.seen), t: t("ob_id"), info: 1 });
    var n = items.filter(function (x) { return x.done; }).length;
    if (n === items.length) return "";
    return '<section class="card" style="border:2px solid var(--mint,#3ecf8e)"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><h2 style="margin:0">📝 ' + esc(t("ob_title")) + '</h2><span class="chip info">' + esc(t("ob_done_n", n).replace("{m}", items.length)) + "</span></div>" +
      '<p class="muted small" style="margin:6px 0 8px">' + esc(t("ob_sub").replace("{d}", p.start ? parse(p.start).toLocaleDateString(loc()) : "—")) + "</p>" +
      items.map(function (x) {
        return '<button class="row tap" style="width:100%;text-align:left;align-items:flex-start"' + (x.info || x.done ? "" : ' data-onb="' + x.k + '"') + '><span style="font-size:20px;width:28px">' + (x.done ? "✅" : x.info ? "🤝" : "⬜") + '</span><span class="grow"><span class="t"' + (x.done ? ' style="opacity:.6;text-decoration:line-through"' : "") + ">" + esc(x.t) + "</span>" +
          (x.sub && !x.done ? '<span class="muted small" style="display:block">' + esc(x.sub) + "</span>" : "") + "</span>" + (x.info || x.done ? "" : "›") + "</button>"; }).join("") + "</section>";
  }
  function onbOpen(k) {
    if (k === "form") return onbForm();
    var x = OBD.filter(function (y) { return y[0] === k; })[0];
    receiptSheet("gal", { hint: "doc", note: "onb:" + k + " " + (x ? x[1] : k) });
  }
  function onbForm() {
    var d = Object.assign({}, (onb && onb.data) || {});
    function field(x) {
      var v = d[x[0]] == null ? "" : String(d[x[0]]), id = "ob_" + x[0], lab = '<label class="f" for="' + id + '">' + esc(obLab(x)) + "</label>";
      if (x[4] === "yn" || x[4].indexOf("|") > 0) {
        var opts = x[4] === "yn" ? [["ja", t("yes")], ["nein", t("no")]] : x[4].split("|").map(function (o) { return [o, o]; });
        return lab + '<div class="seg" data-obk="' + x[0] + '" style="flex-wrap:wrap">' + opts.map(function (o) { return '<button type="button" data-v="' + esc(o[0]) + '" aria-pressed="' + (v === o[0]) + '">' + esc(o[1]) + "</button>"; }).join("") + "</div>";
      }
      var ty = x[4] === "d" ? "date" : x[4] === "e" ? "email" : "text", im = x[4] === "n" ? ' inputmode="decimal"' : "";
      return lab + '<input class="in" id="' + id + '" data-obi="' + x[0] + '" type="' + ty + '"' + im + ' value="' + esc(v) + '" autocomplete="off">';
    }
    var h = '<h2 style="margin-top:0">' + esc(t("ob_form")) + '</h2><p class="muted small">' + esc(t("ob_privacy")) + "</p>" +
      '<button class="btn ghost" id="obpaper" style="width:100%">📷 ' + esc(t("ob_paper")) + "</button>";
    OBF.forEach(function (x) { h += x.length === 4 ? '<h3 style="margin:22px 0 4px">' + esc(x[0] + ". " + obLab(x)) + "</h3>" : field(x); });
    h += '<label style="display:flex;gap:10px;align-items:flex-start;margin-top:20px"><input type="checkbox" id="obdecl"' + (d.declaration ? " checked" : "") + ' style="width:22px;height:22px;flex:none"><span class="small">' + esc(t("ob_decl")) + "</span></label>" +
      '<label style="display:flex;gap:10px;align-items:flex-start;margin-top:10px"><input type="checkbox" id="obwa"' + (d.whatsapp ? " checked" : "") + ' style="width:22px;height:22px;flex:none"><span class="small">' + esc(t("ob_wa")) + "</span></label>" +
      '<p class="err small" id="oberr" role="alert"></p><div style="display:grid;gap:10px;margin-top:8px"><button class="btn" id="obsend">' + esc(t("ob_send")) + '</button><button class="btn ghost" id="obsave">' + esc(t("ob_save")) + "</button></div>";
    openSheet(h, function (s) {
      s.querySelectorAll("[data-obk]").forEach(function (g) { g.querySelectorAll("button").forEach(function (b) { b.onclick = function () {
        var on = b.getAttribute("aria-pressed") !== "true"; g.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); b.setAttribute("aria-pressed", String(on)); }; }); });
      function collect() {
        s.querySelectorAll("[data-obi]").forEach(function (i) { var v = i.value.trim(); if (v) d[i.dataset.obi] = v; else delete d[i.dataset.obi]; });
        s.querySelectorAll("[data-obk]").forEach(function (g) { var b = g.querySelector('[aria-pressed="true"]'); if (b) d[g.dataset.obk] = b.dataset.v; else delete d[g.dataset.obk]; });
        d.declaration = s.querySelector("#obdecl").checked; d.whatsapp = s.querySelector("#obwa").checked; d.lang = lang;
      }
      function save(submit, btn) {
        collect();
        if (submit && !d.declaration) { s.querySelector("#oberr").textContent = t("ob_need_decl"); return; }
        btn.disabled = true;
        rpc("team_onboarding_save", { p_token: token, p_data: d, p_submit: !!submit }).then(function (o) { onb = o; closeSheet(); toast(t(submit ? "ob_sent" : "ob_saved")); render(); })
          .catch(function (e) { btn.disabled = false; s.querySelector("#oberr").textContent = e.message || t("err"); });
      }
      s.querySelector("#obsend").onclick = function () { save(true, this); };
      s.querySelector("#obsave").onclick = function () { save(false, this); };
      s.querySelector("#obpaper").onclick = function () { collect(); rpc("team_onboarding_save", { p_token: token, p_data: d, p_submit: false }).catch(function () {}); receiptSheet("cam", { hint: "doc", note: "onb:form Personalfragebogen (Papier)" }); };
    });
  }
  // Owner: the questionnaire of one person (Team → person).
  function onbOwnerSheet(id, name) {
    rpc("team_owner_onboarding", { p_token: token, p_driver: id }).then(function (o) {
      var d = (o && o.data) || {}, rows = OBF.filter(function (x) { return x.length > 4 && d[x[0]] != null && d[x[0]] !== ""; });
      openSheet('<h2 style="margin-top:0">' + esc(t("ob_view")) + " · " + esc(name) + "</h2>" + (o && o.submitted_at ? '<p class="muted small">✅ ' + esc(new Date(o.submitted_at).toLocaleString(loc(), { dateStyle: "short", timeStyle: "short", hourCycle: "h23" })) + "</p>" : "") +
        (rows.length ? '<div class="card" style="padding:4px 14px">' + rows.map(function (x) { return '<div class="row" style="align-items:flex-start"><span class="muted small" style="width:45%">' + esc(x[1]) + '</span><b style="flex:1;text-align:right;word-break:break-word">' + esc(d[x[0]]) + "</b></div>"; }).join("") +
          '<div class="row"><span class="muted small" style="width:45%">WhatsApp-Gruppe</span><b style="flex:1;text-align:right">' + (d.whatsapp ? "ja" : "nein") + "</b></div></div>" : '<div class="empty">' + esc(t("ob_empty")) + "</div>") +
        '<div style="margin-top:14px"><button class="btn ghost" data-close>OK</button></div>');
    }).catch(function (e) { toast(e.message); });
  }

  /* ---------------- iPhone: put it on the home screen first ---------------- */
  // An iPhone cannot install an app from outside the App Store, so the site itself becomes the "app": Safari → Share →
  // Add to Home Screen. The home-screen copy has its own storage, so the guide comes BEFORE the sign-in.
  function iosBrowser() {
    var ua = navigator.userAgent, ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    var app2 = navigator.standalone || (window.matchMedia && matchMedia("(display-mode: standalone)").matches);
    return ios && !app2 && !/[?&]demo\b/.test(location.search);
  }
  function installScreen() {
    var ua = navigator.userAgent, notSafari = /FBAN|FBAV|Instagram|Line\/|GSA\/|Snapchat|TikTok/.test(ua), chrome = /CriOS/.test(ua);
    var BLUE = "#0a84ff";
    function share(sz) { return '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none" stroke="' + BLUE + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>'; }
    function plus(sz) { return '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>'; }
    // Each step: number, text, and a big picture of exactly what to look for on the iPhone.
    function step(n, txt, pic) {
      return '<li style="margin:0 0 22px;text-align:left"><div style="display:flex;gap:12px;align-items:flex-start"><span style="flex:none;width:32px;height:32px;border-radius:50%;background:var(--ink-bg,#0b0f0d);color:#fff;font-weight:800;font-size:17px;display:grid;place-items:center">' + n +
        '</span><span style="padding-top:4px;line-height:1.4;font-size:17px">' + txt + "</span></div>" + (pic ? '<div style="margin:12px 0 0 44px">' + pic + "</div>" : "") + "</li>";
    }
    var picShare = chrome
      ? '<div style="display:flex;align-items:center;gap:10px;background:#f2f2f7;border-radius:14px;padding:10px 14px;color:#111"><span style="flex:1;background:#fff;border-radius:10px;padding:8px 10px;font-size:13px;color:#666">transfer-ride.github.io</span><span style="display:grid;place-items:center;width:64px;height:64px;border-radius:16px;background:#fff;border:3px solid ' + BLUE + ';animation:igp 1.4s ease-in-out infinite">' + share(36) + "</span></div>"
      : '<div style="display:flex;justify-content:space-around;align-items:center;background:#f2f2f7;border-radius:14px;padding:10px 6px;color:#999;font-size:22px"><span>‹</span><span>›</span><span style="display:grid;place-items:center;width:64px;height:64px;border-radius:16px;background:#fff;border:3px solid ' + BLUE + ';animation:igp 1.4s ease-in-out infinite">' + share(36) + '</span><span>▢</span><span style="display:grid;place-items:center;width:44px;height:44px;border-radius:12px;border:2px dashed #bbb;color:#555">⋯</span></div>';
    var picAdd = '<div style="background:#f2f2f7;border-radius:14px;padding:6px;color:#111"><div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:10px;padding:12px 14px;margin-bottom:4px;opacity:.45;font-size:15px"><span>' + (lang === "el" ? "Αντιγραφή" : lang === "de" ? "Kopieren" : "Copy") + '</span><span>⧉</span></div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:10px;padding:14px;border:3px solid ' + BLUE + ';font-size:16px;font-weight:700;animation:igp 1.4s ease-in-out infinite"><span>' + esc(t("ig_add_label")) + '</span><span style="color:#111">' + plus(30) + "</span></div></div>";
    var picOk = '<div style="display:flex;align-items:center;gap:10px;justify-content:space-between;background:#f2f2f7;border-radius:14px;padding:12px 14px;color:#111;font-size:15px"><span style="opacity:.5">' + esc(t("cancel")) + '</span><b>Transfer Team</b><span style="color:' + BLUE + ';font-weight:800;font-size:17px;border:3px solid ' + BLUE + ';border-radius:10px;padding:4px 10px;animation:igp 1.4s ease-in-out infinite">' + esc(t("ig_add_btn")) + "</span></div>";
    var picIcon = '<div style="display:inline-flex;flex-direction:column;align-items:center;gap:6px;background:linear-gradient(160deg,#5b8def,#a46bd9);border-radius:16px;padding:14px 22px"><img src="../assets/icon-192.png" alt="" width="60" height="60" style="border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,.25)"><span style="color:#fff;font-size:12px;font-weight:600">Transfer Team</span></div>';
    var link = location.origin + location.pathname;
    app.innerHTML = '<style>@keyframes igp{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}@media (prefers-reduced-motion:reduce){[style*="igp"]{animation:none!important}}</style>' +
      '<div class="pin" style="max-width:440px"><div class="wordmark" style="font-size:30px">TRANSFER<i></i></div>' +
      '<h2 style="margin-top:14px">' + esc(t("ig_title")) + '</h2><p class="muted" style="margin:6px auto 20px;line-height:1.4">' + esc(t("ig_sub")) + "</p>" +
      (notSafari ? '<div class="card" style="text-align:left"><div style="margin-bottom:8px">' + esc(t("ig_safari")) + '</div><div class="small" style="word-break:break-all;font-weight:700">' + esc(link) + '</div><button class="btn" id="igcopy" style="margin-top:10px">' + esc(t("ig_copy")) + "</button></div>" : "") +
      '<ol style="list-style:none;padding:0;margin:8px 0 0">' +
        step(1, esc(t(chrome ? "ig_1c" : "ig_1s")), picShare) + step(2, esc(t("ig_2b")), picAdd) + step(3, esc(t("ig_3b")), picOk) + step(4, esc(t("ig_4b")), picIcon) + "</ol>" +
      '<div class="langs"></div></div>';
    langButtons(app.querySelector(".langs"), installScreen);
    var c = app.querySelector("#igcopy");
    if (c) c.onclick = function () { (navigator.clipboard ? navigator.clipboard.writeText(link) : Promise.reject()).then(function () { c.textContent = t("ig_copied"); }).catch(function () { prompt("", link); }); };
  }

  /* ---------------- PIN ---------------- */
  var CC = [["🇩🇪", "49"], ["🇬🇷", "30"], ["🇨🇾", "357"], ["🇦🇹", "43"], ["🇨🇭", "41"], ["🇮🇹", "39"], ["🇪🇸", "34"], ["🇫🇷", "33"], ["🇳🇱", "31"], ["🇧🇪", "32"],
    ["🇵🇱", "48"], ["🇷🇴", "40"], ["🇧🇬", "359"], ["🇭🇷", "385"], ["🇷🇸", "381"], ["🇦🇱", "355"], ["🇽🇰", "383"], ["🇧🇦", "387"], ["🇲🇰", "389"], ["🇹🇷", "90"],
    ["🇵🇹", "351"], ["🇨🇿", "420"], ["🇭🇺", "36"], ["🇺🇦", "380"], ["🇬🇧", "44"], ["🇺🇸", "1"], ["🇸🇾", "963"], ["🇦🇫", "93"], ["🇮🇷", "98"], ["🇮🇳", "91"]];
  function pinScreen(msg) {
    stopTimers();
    var pin = "";
    app.innerHTML = '<div class="pin"><div class="wordmark" style="font-size:34px">TRANSFER<i></i></div>' +
      '<div class="muted" style="margin-top:4px">' + esc(t("app")) + '</div>' +
      '<label style="display:block;margin-top:28px;text-align:left"><span class="muted small">' + esc(t("mobile_no")) + '</span>' +
      '<span style="display:flex;gap:8px;margin-top:4px"><select id="cc" aria-label="' + esc(t("cc_label")) + '" style="flex:none;padding:12px 8px;font:inherit;font-size:17px;border:1px solid var(--line,#d6ddd9);border-radius:12px;background:transparent;color:inherit">' +
        CC.map(function (c) { return '<option value="' + c[1] + '"' + (c[1] === (load("team_cc") || "49") ? " selected" : "") + ">" + c[0] + " +" + c[1] + "</option>"; }).join("") + "</select>" +
      '<input id="ph" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="163 1234567" value="' + esc(load("team_phone_n") || "") + '" style="flex:1;min-width:0;padding:12px 14px;font:inherit;font-size:18px;border:1px solid var(--line,#d6ddd9);border-radius:12px;background:transparent;color:inherit"></span></label>' +
      '<label style="display:flex;gap:10px;align-items:center;justify-content:center;margin-top:14px;font-weight:600"><input type="checkbox" id="stay"' + (load("team_stay") === "0" ? "" : " checked") + ' style="width:22px;height:22px"> ' + esc(t("stay_in")) + "</label>" +
      '<h2 style="margin-top:18px">' + esc(t("pin")) + '</h2><div class="muted small">' + esc(t("pin_sub")) + "</div>" +
      '<div class="dots" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
      '<div class="err" role="alert">' + esc(msg || "") + '</div><div class="keys"></div>' +
      '<button type="button" id="forgot" class="muted small" style="margin-top:14px;text-decoration:underline">' + esc(t("forgot")) + '</button><p id="forgottxt" class="small" style="display:none;margin:8px auto 0;max-width:300px;line-height:1.4;text-align:center">' + esc(t("forgot_txt")) + "</p>" +
      '<div class="langs"></div></div>';
    app.querySelector("#forgot").onclick = function () { var x = app.querySelector("#forgottxt"); x.style.display = x.style.display === "none" ? "" : "none"; };
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
      // Country code from the list + the number; a leading 0 (or +49 typed again) is dropped by itself.
      var raw = (app.querySelector("#ph").value || "").trim(), cc = app.querySelector("#cc").value, ph;
      if (!raw.replace(/\D/g, "")) { pin = ""; dots(); app.querySelector(".err").textContent = t("phone_need"); app.querySelector("#ph").focus(); return; }
      if (/^(\+|00)/.test(raw)) ph = "+" + raw.replace(/^00/, "").replace(/\D/g, "");
      else { var dg = raw.replace(/\D/g, "").replace(/^0+/, ""); if (dg.indexOf(cc) === 0 && dg.length > 10) dg = dg.slice(cc.length); ph = "+" + cc + dg; }
      store("team_cc", cc); store("team_phone_n", raw);
      rpc("team_login", { p_phone: ph, p_pin: p }).then(function (o) {
        if (o && o.error) { pin = ""; dots(); app.querySelector(".err").textContent = o.error === "locked" ? t("locked") : o.error === "phone" ? t("phone_bad") : t("wrong", o.left); return; }
        var stay = app.querySelector("#stay") ? app.querySelector("#stay").checked : true;
        store("team_stay", stay ? "1" : "0");
        token = o.token; store("team_token", token); document.onkeydown = null;
        // Not "stay signed in": forget the sign-in when the app/tab is closed.
        if (!stay) { try { sessionStorage.setItem("team_tab", "1"); } catch (e) {} }
        if (o.set_pin) { store("team_set_pin", "1"); setPinScreen(p); } else start();
      }).catch(function (e) { pin = ""; dots(); var box = app.querySelector(".err"); box.innerHTML = esc(e.network ? t("offline") : (e.message || t("err"))) + why(); });
    }
  }
  // First sign-in with a start PIN (v37 set_pin): the employee picks their own before anything else.
  function setPinScreen(oldPin) {
    stopTimers();
    function f(id, lab) { return '<label class="f" for="' + id + '" style="text-align:left">' + esc(t(lab)) + '</label><input class="in" id="' + id + '" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" style="font-size:22px;letter-spacing:8px;text-align:center">'; }
    app.innerHTML = '<div class="pin" style="max-width:380px"><div class="wordmark" style="font-size:30px">TRANSFER<i></i></div><h2 style="margin-top:22px">🔑 ' + esc(t("sp_title")) + '</h2><p class="muted small" style="line-height:1.4">' + esc(t("sp_sub")) + "</p>" +
      (oldPin ? "" : f("spo", "sp_old")) + f("spn", "cp_new") + f("spn2", "cp_new2") +
      '<p class="err" id="sperr" role="alert" style="min-height:1.2em"></p><button class="btn" id="spsave" style="margin-top:6px">' + esc(t("cp_save")) + "</button></div>";
    var b = app.querySelector("#spsave"), err = app.querySelector("#sperr");
    b.onclick = function () {
      var o = oldPin || app.querySelector("#spo").value.trim(), n = app.querySelector("#spn").value.trim(), n2 = app.querySelector("#spn2").value.trim();
      if (!/^\d{4}$/.test(n)) { err.textContent = t("cp_4"); return; }
      if (n !== n2) { err.textContent = t("cp_same"); return; }
      b.disabled = true; err.textContent = "";
      rpc("team_change_pin", { p_token: token, p_old: o, p_new: n }).then(function () { store("team_set_pin", null); toast(t("cp_ok")); start(); })
        .catch(function (e) { b.disabled = false; var m = String(e.message || ""); err.textContent = /wrong/i.test(m) ? t("cp_wrong") : /taken/i.test(m) ? t("cp_taken") : /signed in/i.test(m) ? (signOut(true), "") : (m || t("err")); });
    };
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
    store("team_token", null); store("team_set_pin", null); token = null; data = null; chat = []; receipts = null; cacheClear();
    pinScreen(expired ? t("signed_out") : "");
  }

  /* ---------------- main ---------------- */
  function stopTimers() { clearInterval(chatTimer); clearInterval(homeTimer); chatTimer = homeTimer = null; }
  function start() {
    stopTimers();
    if (!data) { var ch = cacheGet("home"); if (ch) { data = ch; receipts = receipts || cacheGet("rc"); render(); } }
    refresh().then(function () { render(); loadReceipts().then(function () { if (tab === "home" && !sheet) render(); }); homeTimer = setInterval(function () { refresh().then(function () { if (tab !== "chat" && !sheet && !typing()) render(); else tabsBadge(); }); }, 30000); })
      .catch(function (e) {
        if (!token) return;
        if (data && e.network) { stale = true; render(); clearTimeout(start.retry); start.retry = setTimeout(start, 20000); return; }
        app.innerHTML = '<div class="pin"><p class="err">' + esc(e.network ? t("offline") : (e.message || t("err"))) + "</p>" + why() +
          '<button class="btn ghost" style="max-width:240px;margin-top:16px" id="retry">↻</button>' +
          '<button class="btn ghost" style="max-width:240px;margin-top:10px" id="relog">' + esc(t("signout")) + "</button></div>";
        app.querySelector("#retry").onclick = start;
        app.querySelector("#relog").onclick = function () { signOut(false); };
      });
  }
  function refresh() { return rpc("team_home", { p_token: token }).then(function (d) {
    data = d; stale = false; cacheSet("home", d);
    if (d && (!d.prefs || d.prefs.lang !== lang)) rpc("team_prefs", { p_token: token, p_prefs: Object.assign({}, d.prefs || {}, { lang: lang }) }).catch(function () {});
  }); }

  function render() {
    if (tab === "chat") return chatScreen();
    var body = { home: homeScreen, plan: planScreen, menu: menuScreen, receipts: receiptsScreen, requests: requestsScreen, profile: profileScreen, search: searchScreen, team: teamScreen, bills: billsScreen, reports: reportsScreen, tasks: tasksScreen, cars: carsScreen, inbox: inboxScreen }[tab] || homeScreen;
    app.innerHTML = '<main class="screen">' + (stale ? '<div class="card small" style="background:var(--warn-soft);color:var(--warn);font-weight:700;margin-bottom:12px">⚠ ' + esc(t("stale")) + "</div>" : "") + body() + "</main>" + tabsHtml();
    bind();
  }
  function tabsHtml() {
    return '<nav class="tabs" aria-label="Menu">' + ["home", "receipts", "requests", "chat", "profile"].map(function (k) {
      var n = k === "chat" ? data && data.unread : k === "receipts" ? receipts && receipts.to_confirm : 0;
      var badge = n > 0 ? '<span class="badge">' + n + "</span>" : "";
      var cur = tab === k || (k === "home" && (tab === "plan" || tab === "search" || tab === "menu" || tab === "team" || tab === "bills" || tab === "reports" || tab === "tasks" || tab === "cars" || tab === "inbox"));
      return '<button type="button" data-tab="' + k + '"' + (cur ? ' aria-current="page"' : "") + ">" + ICON[k] + "<span>" + esc(t(k === "receipts" ? "up_tab" : k)) + "</span>" + badge + "</button>";
    }).join("") + "</nav>";
  }
  // Someone is typing in a field on the screen: a background refresh must not redraw it (keyboard would close).
  function typing() { var a = document.activeElement; return !!(a && app.contains(a) && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)); }
  function tabsBadge() { var n = app.querySelector(".tabs"); if (n) { n.outerHTML = tabsHtml(); bindTabs(); } }
  function bindTabs() { app.querySelectorAll("[data-tab]").forEach(function (b) { b.onclick = function () { go(b.dataset.tab); }; }); }
  function go(k) { if (k === "team") { tmList = null; tmSel = null; tmPerson = null; tmPin = null; } if (k === "bills" || k === "reports") ownAll = null; tab = k; store("team_tab", k); clearInterval(chatTimer); chatTimer = null; window.scrollTo(0, 0); render(); if (k === "receipts" || k === "tasks") loadReceipts(); }
  function bind() {
    bindTabs(); bindTeam(); bindOwner();
    app.querySelectorAll("[data-rseg]").forEach(function (b) { b.onclick = function () { rSeg = b.dataset.rseg; rMonth = ""; store("team_rseg", rSeg); render(); }; });
    app.querySelectorAll("[data-rmonth]").forEach(function (b) { b.onclick = function () { rMonth = b.dataset.rmonth; render(); }; });
    var rqi = app.querySelector("#rq"); if (rqi) rqi.oninput = function () { rQuery = rqi.value; var y = window.scrollY; render(); window.scrollTo(0, y); var n = app.querySelector("#rq"); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } };
    app.querySelectorAll("[data-ask]").forEach(function (b) { b.onclick = function () { askSheet(b.dataset.ask); }; });
    app.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { go(b.dataset.go); }; });
    app.querySelectorAll("[data-q]").forEach(function (b) { b.onclick = function () { go("chat"); setTimeout(function () { sendChat(b.dataset.q); }, 50); }; });
    app.querySelectorAll("[data-view]").forEach(function (b) { b.onclick = function () { planView = b.dataset.view; render(); }; });
    app.querySelectorAll("[data-slip]").forEach(function (b) { b.onclick = function () { slipSheet(b.dataset.slip); }; });
    app.querySelectorAll("[data-req]").forEach(function (b) { b.onclick = function () { reqSheet(+b.dataset.req); }; });
    var so = app.querySelector("#signout"); if (so) so.onclick = function () { signOut(false); };
    var cp = app.querySelector("#cpin"); if (cp) cp.onclick = pinSheet;
    app.querySelectorAll("[data-onb]").forEach(function (b) { b.onclick = function () { onbOpen(b.dataset.onb); }; });
    app.querySelectorAll("[data-tm-onb]").forEach(function (b) { b.onclick = function () { onbOwnerSheet(tmSel, tmPerson ? tmPerson.me.name : ""); }; });
    var ck = app.querySelector("#check"); if (ck) ck.onclick = checkSheet;
    app.querySelectorAll("[data-wallet]").forEach(function (b) { b.onclick = function () { go("receipts"); }; });
    app.querySelectorAll("[data-receipt]").forEach(function (b) { b.onclick = function () { receiptSheet(); }; });
    app.querySelectorAll("[data-task]").forEach(function (b) { b.onclick = function () { taskSheet(b.dataset.task); }; });
    var csv = app.querySelector("#csv"); if (csv) csv.onclick = exportCsv;
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
    app.querySelectorAll("[data-delpost]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); if (!window.confirm(t("np_del_q"))) return;
      rpc("team_owner_post_delete", { p_token: token, p_id: +b.dataset.delpost }).then(function (d) { data = d; toast(t("np_deleted")); render(); }).catch(function (er) { toast(er.message || t("err")); }); }; });
    var np = app.querySelector("#newpost"); if (np) np.onclick = newPostSheet;
    var na = app.querySelector("#newappt"); if (na) na.onclick = apptSheet;
    var tka = app.querySelector("#tkadd"); if (tka) tka.onclick = taskAddSheet;
    var wn = app.querySelector("#wnok"); if (wn) wn.onclick = function () { store("team_wn", WN); render(); };
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
    h += onboardingCard(p);
    h += '<section class="hero" data-go="plan" role="button" tabindex="0"><div class="muted">' + esc(t("next_shift")) + "</div>" +
      (ns ? '<div class="big">' + esc(dateLabel(ns.day)) + "</div><div>" + esc(ns.start + " – " + ns.end) + (ns.note ? " · " + esc(ns.note) : "") + "</div>"
          : '<div class="big">' + esc(t("no_shift")) + "</div>") + '<div style="margin-top:12px;color:var(--mint);font-weight:700">' + esc(t("full_plan")) + " ›</div></section>";
    h += '<div class="grid2"><div class="card kpi"><div class="muted small">' + esc(t("leave_left")) + '</div><div class="n">' + (left == null ? "—" : left.toLocaleString(loc())) + '</div><div class="muted small">' + esc(t("days")) + "</div></div>" +
      '<div class="card kpi" data-tab="requests" role="button" tabindex="0"><div class="muted small">' + esc(t("open_req")) + '</div><div class="n">' + open + '</div><div class="muted small">›</div></div></div>';
    h += docAlerts(p) + ownerToday();
    // Duties (e.g. monthly receipts): stay here until done. Tap = upload.
    var dut = ((p && p.duties) || []).filter(function (u) { return !u.done; });
    if (dut.length) h += "<h2>" + esc(t("duties")) + "</h2>" + dut.map(function (u) {
      var late = u.due < new Date().toISOString().slice(0, 10), w = (u.title && (u.title[lang] || u.title.de)) || u.id;
      return '<button class="card row tap" style="width:100%;margin-top:8px;border:0;text-align:left' + (late ? ';background:var(--bad-soft)' : '') + '" data-receipt="1"><span class="grow t">' + esc(w) +
        '<span class="muted small" style="display:block">' + esc(t("due_by", new Date(u.due + "T12:00:00").toLocaleDateString(loc()))) + "</span></span>›</button>";
    }).join("");
    if (!receipts) loadReceipts();
    var tko = openTasks(), mine = tko.filter(function (x) { return x.who === "owner" && x.answer !== "uploaded"; });
    if (tko.length) h += '<h2 style="display:flex;justify-content:space-between;align-items:baseline">' + esc(t("tk_title")) + '<button class="small" style="border:0;background:none;color:var(--mint);font:inherit;font-weight:700" data-go="tasks">' + esc(t("tk_all", tko.length)) + ' ›</button></h2>' +
      '<div class="card" style="padding:4px 14px">' + (mine.length ? mine : tko).slice(0, 3).map(taskRow).join("") + "</div>";
    if (receipts && receipts.to_confirm > 0) h += '<button class="card row tap" style="width:100%;margin-top:12px;border:0;background:var(--blue-soft)" data-wallet="1"><span class="grow t" style="text-align:left">' + esc(t("confirm_home", receipts.to_confirm)) + '</span><span class="chip info">' + receipts.to_confirm + "</span></button>";
    if (open) h += '<button class="card row tap" style="width:100%;margin-top:12px;border:0" data-go="requests"><span class="grow t" style="text-align:left">' + esc(t("open_req")) + '</span><span class="chip wait">' + open + "</span></button>";
    h += '<div class="actions">' + [["leave", "ask_leave", "leave"], ["sick", "ask_sick", "sick"], ["shift_swap", "ask_swap", "swap"]].map(function (k) {
      return '<button class="action" data-ask="' + k[0] + '">' + ICON[k[2]] + esc(t(k[1])) + "</button>"; }).join("") +
      '<button class="action" data-ask="payslip">' + ICON.payslip + esc(t("ask_payslip")) + "</button>" +
      '<button class="action" data-receipt="1">' + ICON.receipt + esc(t("ask_receipt")) + "</button>" +
      '<button class="action" data-go="chat">' + ICON.chat + esc(t("ask_chat")) + "</button></div>";
    h += profile().type === "inhaber" ? '<h2 style="display:flex;justify-content:space-between;align-items:baseline">' + esc(t("news")) + '<button class="small" style="border:0;background:none;color:var(--deep);font:inherit;font-weight:800" id="newpost">' + esc(t("np_btn")) + "</button></h2>" : "<h2>" + esc(t("news")) + "</h2>";
    var news = posts().filter(function (p) { return (p.category || "news") === "news"; });
    h += news.length ? news.map(postCard).join("") : '<div class="empty">' + esc(t("no_news")) + "</div>";
    return h;
  }

  // One card after an update: what is new (owner sees his tools too). Gone after "Got it".
  var WN = "2026-11-28";
  function whatsNew() {
    if (load("team_wn") === WN) return "";
    var tr = T[lang] || T.de, list = (tr.wn_all || T.de.wn_all).concat(profile().type === "inhaber" ? (tr.wn_owner || T.de.wn_owner) : []);
    return '<div class="card" style="margin-top:12px;background:var(--mint-soft)"><div class="t" style="font-size:17px">✨ ' + esc(t("wn_title")) + '</div><ul style="margin:8px 0 0;padding-left:20px;line-height:1.45">' +
      list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><button class="btn ghost" style="height:44px;margin-top:12px" id="wnok">' + esc(t("wn_ok")) + "</button></div>";
  }
  // Documents that run out within 60 days (or already did): stay on Home until a new date is in.
  function docAlerts(p) {
    var docs = (p && p.documents) || {}, names = DOC_NAMES[lang] || DOC_NAMES.de, today = parse(ymd(new Date())), out = [];
    Object.keys(docs).forEach(function (k) { var d = docs[k] || {}; if (!d.expires) return;
      var n = Math.round((parse(d.expires) - today) / 864e5); if (n > 60) return;
      out.push({ n: n, txt: (n < 0 ? t("doc_gone") : t("doc_soon", n)).replace("{d}", names[k] || k.replace(/_/g, " ")) }); });
    out.sort(function (a, b) { return a.n - b.n; });
    return out.map(function (x) {
      return '<button class="card row tap" style="width:100%;margin-top:12px;border:0;text-align:left;background:' + (x.n < 0 || x.n <= 14 ? "var(--bad-soft)" : "var(--warn-soft)") + '" data-tab="profile"><span class="grow t">⚠ ' + esc(x.txt) +
        '<span class="muted small" style="display:block;font-weight:400">' + esc(t("doc_hint")) + "</span></span>›</button>"; }).join("");
  }
  // Owner: what needs him today (invoices due / overdue, things waiting in the team).
  function ownerToday() {
    if (profile().type !== "inhaber") return "";
    if (!ownAll) { ownLoad(ymd(new Date(Date.now() - 400 * 864e5))); return ""; }
    if (!tmList) tmLoad();
    var today = ymd(new Date()), week = ymd(new Date(Date.now() + 7 * 864e5)), ob = openBills();
    var late = ob.filter(function (r) { return r.data.due_date && r.data.due_date < today; }), soon = ob.filter(function (r) { return r.data.due_date && r.data.due_date >= today && r.data.due_date <= week; });
    var team = (tmList || []).reduce(function (a, x) { return a + (x.receipts_open || 0) + (x.requests_open || 0); }, 0);
    var sum = function (l) { return money(l.reduce(function (a, r) { return a + (Number(r.data.total) || 0); }, 0)); };
    var rows = [];
    if (late.length) rows.push('<button class="row tap" style="width:100%;text-align:left" data-go="bills"><span class="grow t" style="color:var(--danger)">' + esc(t("ow_bills_late", late.length)) + '</span><b>' + esc(sum(late)) + "</b> ›</button>");
    if (soon.length) rows.push('<button class="row tap" style="width:100%;text-align:left" data-go="bills"><span class="grow t">' + esc(t("ow_bills_due", soon.length)) + '</span><b>' + esc(sum(soon)) + "</b> ›</button>");
    var cu = (profile().vehicles || []).reduce(function (a, v) { return a + (v.tasks || []).filter(function (x) { return x.priority === "critical" || (x.deadline && x.deadline < today); }).length; }, 0);
    if (cu) rows.push('<button class="row tap" style="width:100%;text-align:left" data-go="cars"><span class="grow t">' + esc(t("ow_cars", cu)) + '</span><span class="chip bad">' + cu + "</span> ›</button>");
    var tl = openTasks().filter(function (x) { return x.due && x.due < today && (x.who === "owner" || /^own-/.test(x.key)); }).length;
    if (tl) rows.push('<button class="row tap" style="width:100%;text-align:left" data-go="tasks"><span class="grow t" style="color:var(--danger)">' + esc(t("ow_tasks_late", tl)) + '</span><span class="chip bad">' + tl + "</span> ›</button>");
    var ibn = inboxUnread();
    if (ibn) rows.push('<button class="row tap" style="width:100%;text-align:left" data-go="inbox"><span class="grow t">' + esc(t("ow_inbox", ibn)) + '</span><span class="chip info">' + ibn + "</span> ›</button>");
    if (team) rows.push('<button class="row tap" style="width:100%;text-align:left" data-go="team"><span class="grow t">' + esc(t("ow_team", team)) + '</span><span class="chip wait">' + team + "</span> ›</button>");
    return rows.length ? "<h2>" + esc(t("ow_today")) + '</h2><div class="card" style="padding:4px 14px">' + rows.join("") + "</div>" : "";
  }

  // Owner: a message to the whole team (shown in Home → News), translated by the HR agent.
  function apptSheet() {
    var tom = new Date(Date.now() + 864e5);
    openSheet('<h2 style="margin-top:0">' + esc(t("ap_title")) + '</h2><label class="f" for="apw">' + esc(t("ap_what")) + '</label><input class="in" id="apw" maxlength="200" placeholder="' + esc(t("ap_ph")) + '">' +
      '<label class="f" for="apd">' + esc(t("ap_day")) + '</label><input class="in" type="date" id="apd" value="' + ymd(tom) + '" min="' + ymd(new Date()) + '">' +
      '<div class="two"><div><label class="f" for="aps">' + esc(t("ap_start")) + '</label><input class="in" type="time" id="aps" value="10:00"></div><div><label class="f" for="ape">' + esc(t("ap_end")) + '</label><input class="in" type="time" id="ape"></div></div>' +
      '<p class="muted small">' + esc(t("ap_hint")) + '</p><div style="display:grid;gap:10px;margin-top:12px"><button class="btn" id="aps2">' + esc(t("ap_save")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      s.querySelector("#aps2").onclick = function () {
        var b = this, w = s.querySelector("#apw").value.trim(), d = s.querySelector("#apd").value, st = s.querySelector("#aps").value, en = s.querySelector("#ape").value;
        if (!w) { s.querySelector("#apw").focus(); return; }
        if (!d || !st) return;
        b.disabled = true;
        rpc("team_owner_appt_add", { p_token: token, p_title: w, p_day: d, p_start: st.slice(0, 5), p_end: en ? en.slice(0, 5) : null }).then(function () {
          closeSheet(); toast(t("ap_done")); setTimeout(function () { refresh().then(function () { if (!sheet) render(); }); }, 35000);
        }).catch(function (e) { b.disabled = false; toast(e.message || t("err")); });
      };
    });
  }
  function newPostSheet() {
    openSheet('<h2 style="margin-top:0">' + esc(t("np_title")) + '</h2><label class="f" for="npt">' + esc(t("np_t")) + '</label><input class="in" id="npt" maxlength="200">' +
      '<label class="f" for="npb">' + esc(t("np_b")) + '</label><textarea class="in" id="npb" maxlength="4000"></textarea>' +
      '<label style="display:flex;gap:10px;align-items:center;margin-top:12px"><input type="checkbox" id="npp" style="width:22px;height:22px;accent-color:var(--deep)">' + esc(t("np_pin")) + "</label>" +
      '<p class="muted small">' + esc(t("np_hint")) + '</p><div style="display:grid;gap:10px;margin-top:12px"><button class="btn" id="nps">' + esc(t("np_send")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      s.querySelector("#nps").onclick = function () {
        var b = this, ti = s.querySelector("#npt").value.trim(), bo = s.querySelector("#npb").value.trim();
        if (!ti || !bo) { (ti ? s.querySelector("#npb") : s.querySelector("#npt")).focus(); return; }
        b.disabled = true;
        rpc("team_owner_post", { p_token: token, p_title: ti, p_body: bo, p_pinned: s.querySelector("#npp").checked }).then(function (d) { data = d; closeSheet(); toast(t("np_done")); render(); })
          .catch(function (e) { b.disabled = false; toast(e.message || t("err")); });
      };
    });
  }

  function postCard(p) {
    var on = favs().indexOf(String(p.id)) >= 0;
    return '<article class="card post"><div style="display:flex;justify-content:space-between;gap:8px"><div class="muted small">' + (p.at ? esc(new Date(p.at).toLocaleDateString(loc())) : esc(t("c_" + (p.category || "news")))) + (p.pinned ? " · 📌" : "") +
      '</div><span style="display:flex;gap:12px">' + (typeof p.id === "number" && profile().type === "inhaber" ? '<button data-delpost="' + p.id + '" aria-label="Delete" style="color:var(--muted)">🗑</button>' : "") + '<button data-fav="' + esc(p.id) + '" aria-label="★" aria-pressed="' + on + '" style="color:' + (on ? "var(--warn)" : "var(--muted)") + '">' + (on ? "★" : "☆") + '</button></span></div><div class="t">' + esc(p.title) + "</div><p>" + esc(p.body) + "</p></article>";
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
      menuTiles() +
      '<div class="card" style="padding:4px 14px">' + tiles.map(function (x) {
        var n = x[0] === "plan" || x[0] === "favs" ? "" : posts().filter(function (p) { return (p.category || "news") === x[0]; }).length;
        return '<button class="row tap" style="width:100%;text-align:left" ' + (x[0] === "plan" ? 'data-tab="plan"' : 'data-cat="' + x[0] + '"') + '><span style="width:26px;display:grid;place-items:center">' + (icon[x[2]] || ICON.doc).replace("<svg ", '<svg width="24" height="24" ') +
          '</span><span class="grow t">' + esc(t(x[1])) + '</span><span class="muted small">' + (n || "") + ' ›</span></button>';
      }).join("") + "</div>";
  }

  // Big tiles on top of the menu: open tasks for everyone; team, payments and reports for the owner. A number shows what waits.
  function menuTiles() {
    var own = profile().type === "inhaber";
    if (!receipts) loadReceipts();
    if (own && !ownAll) ownLoad(ymd(new Date(Date.now() - 400 * 864e5)));
    if (own && !tmList && !tmSel) tmLoad();
    var tk = openTasks().length, ob = own && ownAll ? openBills().length : 0;
    var team = own && tmList ? tmList.reduce(function (a, x) { return a + (x.receipts_open || 0) + (x.requests_open || 0); }, 0) : 0;
    var tiles = [["tasks", "tk_title", "tk_sub", tk]];
    var today0 = ymd(new Date()), cw = (profile().vehicles || []).reduce(function (a, v) { return a + (v.tasks || []).filter(function (x) { return x.priority === "critical" || (x.deadline && x.deadline < today0); }).length; }, 0);
    if (own) tiles = [["team", "tm_title", "tm_owner", team]].concat(tiles).concat([["bills", "bl_title", "bl_sub", ob], ["reports", "rp_title", "rp_sub", 0]]).concat((profile().vehicles || []).length ? [["cars", "vh_title", "vh_sub", cw]] : []).concat([["inbox", "ib_title", "ib_sub", inboxUnread()]]);
    if (!own && !tk) return "";
    return '<div class="' + (tiles.length > 1 ? "grid2" : "") + '" style="margin:0 0 12px">' + tiles.map(function (x) {
      return '<button class="card tap" style="border:0;text-align:left;display:flex;flex-direction:column;gap:4px;min-height:92px;position:relative' + (tiles.length > 1 ? "" : ";width:100%;min-height:0") + '" data-go="' + x[0] + '"><span class="t" style="font-weight:800;font-size:17px;padding-right:30px">' + esc(t(x[1])) + "</span>" +
        '<span class="muted small">' + esc(t(x[2])) + "</span>" + (x[3] ? '<span class="chip wait" style="position:absolute;top:10px;right:10px">' + x[3] + "</span>" : "") + "</button>"; }).join("") + "</div>";
  }

  /* ---------------- Notices for the owner (Lisa's Mac notifications, also here) ---------------- */
  var IB_TX = { el: [["Beleg prüfen", "Έλεγξε απόδειξη"], ["Beleg doppelt", "Διπλή απόδειξη"], ["Fristen", "Προθεσμίες"], ["Pflicht offen", "Υποχρέωση ανοιχτή"], ["dringend", "Επείγον"], ["krank", "άρρωστος/η"], ["Arbeitsvertrag hochgeladen", "Ανέβηκε σύμβαση εργασίας"], ["hochgeladen", "ανέβηκε"], ["gültig bis", "ισχύει έως"], ["Frist", "προθεσμία"], ["Inhaber", "Ιδιοκτήτης"], ["Überfällig", "Ληξιπρόθεσμο"], ["In ", "Σε "], [" Tagen", " μέρες"]],
    en: [["Beleg prüfen", "Check receipt"], ["Beleg doppelt", "Duplicate receipt"], ["Fristen", "Deadlines"], ["Pflicht offen", "Duty open"], ["dringend", "Urgent"], ["krank", "sick"], ["Arbeitsvertrag hochgeladen", "Employment contract uploaded"], ["hochgeladen", "uploaded"], ["gültig bis", "valid until"], ["Frist", "deadline"], ["Inhaber", "Owner"]] };
  function ibTx(x) {
    x = String(x || ""); if (lang === "de") return x;
    x = x.split(" – ").map(function (part, i) { return i ? part.split(", ").map(flagTx).join(", ") : part; }).join(" – ");
    (IB_TX[lang] || []).forEach(function (p) { x = x.split(p[0]).join(p[1]); }); return x;
  }
  function inboxUnread() { var seen = load("team_ib_seen") || ""; return (profile().inbox || []).filter(function (x) { return x.at > seen; }).length; }
  function inboxScreen() {
    var list = profile().inbox || [], seen = load("team_ib_seen") || "";
    if (list.length) store("team_ib_seen", list[0].at);
    var h = '<div class="top"><button class="back" aria-label="Back" data-go="menu">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("ib_title")) + "</h1></div>";
    if (!list.length) return h + '<div class="empty">' + esc(t("ib_none")) + "</div>";
    return h + '<div class="card" style="padding:4px 14px">' + list.map(function (x) {
      var nw = x.at > seen;
      return '<div class="row" style="align-items:flex-start' + (nw ? ";background:var(--mint-soft);border-radius:10px;padding-left:8px;padding-right:8px" : "") + '"><span class="grow"><span class="t">' + esc(ibTx(String(x.title || "").replace(/^Transfer Team · /, "").replace(/^Lisa \(HR\): /, ""))) +
        '</span><span class="small" style="display:block;margin-top:2px;white-space:pre-wrap">' + esc(ibTx(x.text)) + '</span><span class="muted small">' + esc(new Date(x.at).toLocaleString(loc(), { dateStyle: "short", timeStyle: "short", hourCycle: "h23" })) + "</span></span></div>"; }).join("") + "</div>";
  }

  /* ---------------- Vehicles (owner only): read from the fleet agent's files, nothing to edit here ---------------- */
  function carsScreen() {
    var h = '<div class="top"><button class="back" aria-label="Back" data-go="menu">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("vh_title")) + "</h1></div>";
    var vs = profile().vehicles || [];
    if (!vs.length) return h + '<div class="empty">' + esc(t("vh_none")) + "</div>";
    var today = parse(ymd(new Date()));
    var days = function (d) { return d ? Math.round((parse(String(d).length === 7 ? d + "-28" : d) - today) / 864e5) : null; };
    var stat = function (d, warn) { var n = days(d); if (n == null) return ""; return n < 0 ? '<span class="chip bad">' + esc(t("expired")) + "</span>" : n <= (warn || 60) ? '<span class="chip wait">' + esc(t("in_days", n)) + "</span>" : ""; };
    var mon = function (d) { if (!d) return "—"; if (String(d).length === 7) { var x = d.split("-"); return new Date(+x[0], +x[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" }); } return fmtDay(d); };
    var row = function (label, val, extra) { return '<div class="row" style="align-items:flex-start"><span class="grow t">' + esc(label) + (extra ? '<span class="muted small" style="display:block;font-weight:400">' + esc(extra) + "</span>" : "") + '</span><span style="text-align:right">' + val + "</span></div>"; };
    vs.forEach(function (v) {
      h += '<div class="card" style="margin-top:12px"><div style="font-size:20px;font-weight:900">' + esc(v.name || v.model || v.id) + '</div><div class="muted small">' + esc([v.model, v.year].filter(Boolean).join(" · ")) + "</div></div>";
      var nextDate = null, nextKm = null;
      if (v.service_last && v.service_months) { var sd = parse(v.service_last); sd.setMonth(sd.getMonth() + v.service_months); nextDate = ymd(sd); }
      if (v.service_last_km != null && v.service_km) nextKm = v.service_last_km + v.service_km;
      var kmLeft = nextKm != null && v.km != null ? nextKm - v.km : null;
      var rows = [];
      if (v.km != null) rows.push(row(t("vh_km"), "<b>" + esc(Number(v.km).toLocaleString(loc())) + " km</b>", v.km_date ? fmtDay(v.km_date) : ""));
      if (v.hu_due) rows.push(row(t("vh_hu"), "<b>" + esc(mon(v.hu_due)) + "</b><br>" + stat(v.hu_due)));
      if (nextDate || nextKm) rows.push(row(t("vh_service"), "<b>" + esc(nextDate ? fmtDay(nextDate) : "") + "</b>" + (nextDate && days(nextDate) < 0 ? "<br>" + stat(nextDate) : kmLeft != null ? '<br><span class="chip ' + (kmLeft < 0 ? "bad" : kmLeft < 3000 ? "wait" : "ok") + '">' + esc(kmLeft < 0 ? t("vh_over_km", Number(-kmLeft).toLocaleString(loc())) : t("vh_left_km", Number(kmLeft).toLocaleString(loc()))) + "</span>" : "<br>" + stat(nextDate))));
      if (v.ins_ends) rows.push(row(t("vh_ins"), "<b>" + esc(fmtDay(v.ins_ends)) + "</b><br>" + stat(v.ins_cancel_by || v.ins_ends), [v.insurer, v.ins_month ? t("vh_month", money(v.ins_month)) : "", v.ins_cancel_by ? t("vh_cancel", fmtDay(v.ins_cancel_by)) : ""].filter(Boolean).join(" · ")));
      if (v.first_aid) rows.push(row(t("vh_aid"), "<b>" + esc(fmtDay(v.first_aid)) + "</b><br>" + stat(v.first_aid)));
      if (v.tyres) rows.push(row(t("vh_tyres"), "<b>" + esc(v.tyres === "winter" ? t("vh_winter") : v.tyres === "summer" ? t("vh_summer") : v.tyres) + "</b>", v.tyres_changed ? t("vh_by", fmtDay(v.tyres_changed)) : ""));
      h += '<div class="card" style="padding:4px 14px;margin-top:8px">' + rows.join("") + "</div>";
      var ts = v.tasks || [];
      if (ts.length) h += "<h2>" + esc(t("vh_tasks")) + " (" + ts.length + ')</h2><div class="card" style="padding:4px 14px">' + ts.map(function (x) {
        var n = days(x.deadline), late = n != null && n < 0, cls = x.priority === "critical" ? "bad" : x.priority === "high" ? "wait" : "";
        return '<div class="row" style="align-items:flex-start' + (late ? ";background:var(--bad-soft);border-radius:10px;padding-left:8px;padding-right:8px" : "") + '"><span class="grow t">' + esc(x.title) +
          '<span class="muted small" style="display:block;font-weight:400">' + esc([x.deadline ? (late ? t("bl_late", fmtDay(x.deadline)) : t("due_by", fmtDay(x.deadline))) : "", x.due_km ? Number(x.due_km).toLocaleString(loc()) + " km" : ""].filter(Boolean).join(" · ")) +
          '</span></span><span class="chip ' + cls + '" style="white-space:nowrap">' + esc(t("pr_" + x.priority) !== "pr_" + x.priority ? t("pr_" + x.priority) : x.priority) + "</span></div>"; }).join("") + "</div>";
    });
    return h;
  }

  /* ---------------- Team (owner only): everyone's data, new PIN / new phone without losing anything ---------------- */
  var tmList = null, tmSel = null, tmPerson = null, tmPin = null;
  var tmBusy = false;
  function tmLoad() {
    if (tmBusy) return; tmBusy = true;
    var p = tmSel ? rpc("team_owner_person", { p_token: token, p_driver: tmSel }).then(function (x) { tmPerson = x; })
                  : rpc("team_owner_people", { p_token: token }).then(function (x) { tmList = x || []; });
    p.then(function () { tmBusy = false; if (tab === "team" || tab === "home" || tab === "menu") render(); }).catch(function (e) { tmBusy = false; toast(e.message || t("err")); });
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
            (x.docs_soon ? '<span class="chip bad" title="' + esc(t("documents")) + '">🪪 ' + x.docs_soon + "</span>" : "") + (badge ? '<span class="chip wait">' + badge + "</span>" : "") + " ›</button>";
        }).join("") + "</div>";
    }
    var P = tmPerson;
    var h = '<div class="top"><button class="back" aria-label="Back" data-tm="">' + ICON.back + '</button><h1 style="flex:1">' + esc(P ? P.me.name : "…") + "</h1></div>";
    if (!P) { tmLoad(); return h; }
    var who = tmList && tmList.filter(function (x) { return x.id === tmSel; })[0];
    h += '<div class="card"><div class="t">' + (P.me.phone ? "+" + esc(P.me.phone) : "–") + '</div><div class="muted small">' +
      esc(who && who.last_seen ? t("tm_last", new Date(who.last_seen).toLocaleString(loc(), { dateStyle: "short", timeStyle: "short", hourCycle: "h23" })) : t("tm_never")) + "</div>";
    if (tmPin) h += '<div class="card" style="margin-top:10px;background:var(--mint-soft)"><div class="t" style="font-size:22px">' + esc(t("tm_pin_is", P.me.name.split(" ")[0]).replace("{p}", tmPin)) + '</div><div class="muted small">' + esc(t("tm_pin_tell")) + "</div></div>";
    h += '<div class="grid2" style="margin-top:12px"><button class="btn ghost" data-tm-pin="1">' + esc(t("tm_newpin")) + '</button><button class="btn ghost" data-tm-phone="1">' + esc(t("tm_phone")) + "</button></div>" +
      '<div class="muted small" style="margin-top:8px">' + esc(t("tm_kept")) + '</div><button class="btn ghost" style="margin-top:10px;width:100%" data-tm-onb="1">📋 ' + esc(t("ob_view")) + "</button></div><!--REQ-->";
    var today = new Date().toISOString().slice(0, 10);
    var nexts = (P.shifts || []).filter(function (s) { return s.day >= today; }).slice(0, 6);
    h += "<h2>" + esc(t("tm_plan")) + '</h2><div class="card" style="padding:4px 14px">' + (nexts.length ? nexts.map(function (s) {
      return '<div class="row"><span class="grow t">' + esc(fmtDay(s.day)) + '</span><span class="muted small">' + esc(s.start + (s.end && s.end !== s.start ? " – " + s.end : "") + (s.note ? " · " + s.note : "")) + "</span></div>"; }).join("") : '<div class="row muted">' + esc(t("tm_none")) + "</div>") + "</div>";
    var reps = (P.receipts && P.receipts.reports) || [];
    h += "<h2>" + esc(t("ex_title")) + '</h2><div class="card" style="padding:4px 14px">' + (reps.length ? reps.map(exRow(true)).join("") : '<div class="row muted">' + esc(t("ex_none")) + "</div>") + "</div>";
    h += "<h2>" + esc(t("tm_docs")) + "</h2>" + docList(P.profile || {});
    var ptk = ((P.receipts && P.receipts.tasks) || []).filter(function (x) { return x.status === "open"; });
    if (ptk.length) h += "<h2>" + esc(t("tk_title")) + " (" + ptk.length + ')</h2><div class="card" style="padding:4px 14px">' + ptk.map(function (k) {
      return '<div class="row"><span class="grow t">' + esc(tx(k.title)) + '</span><span class="muted small">' + esc(k.due ? t("due_by", fmtDay(k.due)) : "") + "</span></div>"; }).join("") + "</div>";
    var rl = (P.receipts && P.receipts.list) || [];
    h += "<h2>" + esc(t("tm_rcpt")) + " (" + rl.length + ')</h2><div class="card" style="padding:4px 14px">' + (rl.length ? rl.slice(0, 40).map(function (r) {
      var d = r.data || {};
      return '<div class="row"><span class="grow t">' + esc(d.merchant || r.note || "…") + '<span class="muted small" style="display:block">' + esc(fmtDay(d.date || r.at)) +
        (d.approve === "pending" ? " · ?" : "") + (r.status === "rejected" ? " · ✕" : "") + '</span></span><span class="t">' + (d.total != null ? esc(Number(d.total).toLocaleString(loc(), { style: "currency", currency: "EUR" })) : "") + "</span></div>"; }).join("") : '<div class="row muted">' + esc(t("tm_none")) + "</div>") + "</div>";
    var rq = (P.requests || []).filter(function (r) { return r.status === "open" || r.status === "with_owner"; });
    var kname = function (r) { var k = KINDS.filter(function (x) { return x[0] === r.kind; })[0]; return k ? t(k[1]) : r.kind; };
    var rdates = function (r) { var d = r.details || {}; return d.from ? fmtDay(d.from) + (d.to && d.to !== d.from ? " – " + fmtDay(d.to) : "") : d.date ? fmtDay(d.date) : ""; };
    var reqH = "";
    if (rq.length) reqH += "<h2>" + esc(t("tm_req")) + " (" + rq.length + ')</h2><div class="card" style="padding:4px 14px">' + rq.map(function (r) {
      return '<button class="row tap" style="width:100%;text-align:left;align-items:flex-start" data-dc="' + r.id + '"><span class="grow t">' + esc(kname(r)) + (rdates(r) ? " · " + esc(rdates(r)) : "") +
        '<span class="muted small" style="display:block;font-weight:400">' + esc(r.text || "") + '</span></span><span class="chip wait">' + esc(fmtDay(r.at)) + "</span> ›</button>"; }).join("") + "</div>";
    var rdone = (P.requests || []).filter(function (r) { return r.decision; }).slice(0, 5);
    if (rdone.length) reqH += '<div class="card" style="padding:4px 14px;margin-top:10px;opacity:.85">' + rdone.map(function (r) {
      return '<div class="row"><span class="grow t">' + esc(kname(r)) + (rdates(r) ? " · " + esc(rdates(r)) : "") + '</span><span class="chip ' + (r.decision === "rejected" ? "bad" : "ok") + '">' + esc(t(r.decision === "done" ? "dc_doneL" : "dc_" + r.decision)) + "</span></div>"; }).join("") + "</div>";
    h = h.replace("<!--REQ-->", reqH);
    return h;
  }
  // Owner decides a request: approve / decline / done, with an optional note. The HR agent tells the employee.
  function decideSheet(id) {
    var r = ((tmPerson && tmPerson.requests) || []).filter(function (x) { return x.id === id; })[0]; if (!r) return;
    var first = (tmPerson.me.name || "").split(" ")[0], k = KINDS.filter(function (x) { return x[0] === r.kind; })[0], d = r.details || {};
    var when = d.from ? fmtDay(d.from) + (d.to && d.to !== d.from ? " – " + fmtDay(d.to) : "") : d.date ? fmtDay(d.date) : "";
    var yesNo = ["leave", "shift_swap", "raise", "other"].indexOf(r.kind) >= 0;
    openSheet('<h2 style="margin-top:0">' + esc((k ? t(k[1]) : r.kind) + " · " + first) + '</h2><p class="muted small">' + esc([when, fmtDay(r.at)].filter(Boolean).join(" · ")) + "</p>" +
      (r.text ? '<div class="card"><p style="margin:0;white-space:pre-wrap">' + esc(r.text) + "</p></div>" : "") +
      (r.answer ? '<p class="muted small" style="white-space:pre-wrap">' + esc(t("agent") + ": " + r.answer) + "</p>" : "") +
      '<label class="f" for="dcn">' + esc(t("dc_note", first)) + '</label><textarea class="in" id="dcn" style="min-height:70px"></textarea>' +
      '<div style="display:grid;gap:10px;margin-top:16px">' + (yesNo ? '<button class="btn" data-d="approved">' + esc(t("dc_approve")) + '</button><button class="btn ghost" data-d="rejected" style="color:var(--danger)">' + esc(t("dc_reject")) + "</button>" : "") +
      '<button class="btn' + (yesNo ? " ghost" : "") + '" data-d="done">' + esc(t("dc_done")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      s.querySelectorAll("[data-d]").forEach(function (b) { b.onclick = function () {
        if (b.dataset.d === "rejected" && !window.confirm(t("dc_q_reject"))) return;
        s.querySelectorAll("[data-d]").forEach(function (x) { x.disabled = true; });
        rpc("team_owner_request_decide", { p_token: token, p_request: id, p_decision: b.dataset.d, p_note: s.querySelector("#dcn").value.trim() || null })
          .then(function (P) { tmPerson = P; tmList = null; closeSheet(); toast(t("dc_sent", first)); render(); })
          .catch(function (e) { s.querySelectorAll("[data-d]").forEach(function (x) { x.disabled = false; }); toast(e.message || t("err")); });
      }; });
    });
  }
  function bindTeam() {
    app.querySelectorAll("[data-dc]").forEach(function (b) { b.onclick = function () { decideSheet(+b.dataset.dc); }; });
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

  // One month of an employee's own-money expenses: total + status; the owner can approve / mark paid out.
  function exRow(owner) { return function (e) {
    var x = e.month.split("-"), name = new Date(+x[0], +x[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" });
    var cls = { open: "wait", approved: "info", paid: "ok" }[e.status] || "";
    var btn = !owner ? "" : e.status === "open" ? '<button class="chip info" style="border:0;font:inherit;margin-top:6px" data-ex="' + e.month + '" data-exs="approved">' + esc(t("ex_approve")) + "</button>"
      : e.status === "approved" ? '<button class="chip ok" style="border:0;font:inherit;margin-top:6px" data-ex="' + e.month + '" data-exs="paid">' + esc(t("ex_pay")) + "</button>" : "";
    return '<div class="row" style="align-items:flex-start"><span class="grow t">' + esc(name) + (btn ? "<br>" + btn : "") + '</span><span style="text-align:right"><b>' + esc(money(e.total)) +
      '</b><br><span class="chip ' + cls + '">' + esc(t("ex_" + e.status)) + "</span></span></div>";
  }; }

  // Owner: all receipts (no photos) since a date, for Payments and Reports.
  var ownAll = null, ownFrom = null, ownBusy = false, rpYear = new Date().getFullYear();
  function ownLoad(from) {
    if (ownBusy) return; ownBusy = true;
    rpc("team_owner_receipts", { p_token: token, p_from: from }).then(function (x) { ownBusy = false; ownAll = x || []; ownFrom = from; if (tab === "bills" || tab === "reports" || tab === "home" || tab === "menu") render(); }).catch(function (e) { ownBusy = false; toast(e.message || t("err")); });
  }
  // Counts as an expense only with a real invoice: proofs of payment / order confirmations wait for theirs.
  function isProof(d) { return !!(d.invoice_missing || d.proof || /payment|order_conf|confirmation/.test(d.kind || "")); }
  function counts(r) { var d = r.data || {}; return (r.status === "read" || r.status === "approved") && d.total != null && d.approve !== "pending" && d.approve !== "no" && !isProof(d); }
  // Owner's own receipt (photo on this phone's list) → tap opens it.
  function ownRc(id) { return ((receipts && receipts.list) || []).some(function (x) { return x.id === id; }); }
  function openBills() {
    return (ownAll || []).filter(function (r) { var d = r.data || {}; return d.payment_status === "open" && !d.paid_at && r.status !== "rejected" && r.status !== "duplicate" && d.approve !== "pending" && d.approve !== "no"; });
  }
  function billsScreen() {
    var h = '<div class="top"><button class="back" aria-label="Back" data-go="menu">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("bl_title")) + "</h1></div>";
    if (!ownAll) { ownLoad(ymd(new Date(Date.now() - 400 * 864e5))); return h + '<div class="empty">…</div>'; }
    var today = ymd(new Date());
    var open = openBills().sort(function (a, b) { return String(a.data.due_date || "9") < String(b.data.due_date || "9") ? -1 : 1; });
    if (open.length) h += '<div class="card kpi" style="margin-top:4px"><div class="muted small">' + esc(t("bl_sum")) + '</div><div class="n" style="font-size:26px">' + esc(money(open.reduce(function (a, r) { return a + (Number(r.data.total) || 0); }, 0))) + "</div></div>";
    var week = ymd(new Date(Date.now() + 7 * 864e5));
    h += "<h2>" + esc(t("bl_open")) + " (" + open.length + ')</h2><div class="card" style="padding:4px 14px">' + (open.length ? open.map(function (r) {
      var d = r.data, late = d.due_date && d.due_date < today, soon = !late && d.due_date && d.due_date <= week;
      return '<div class="row" style="align-items:flex-start' + (late ? ';background:var(--bad-soft);border-radius:10px;padding-left:8px;padding-right:8px' : soon ? ';background:var(--warn-soft);border-radius:10px;padding-left:8px;padding-right:8px' : "") + '"><span class="grow t"' + (ownRc(r.id) ? ' role="button" tabindex="0" style="cursor:pointer;text-decoration:underline dotted" data-rimg="' + r.id + '"' : "") + '>' + esc(d.merchant || r.note || "…") +
        '<span class="muted small" style="display:block">' + esc(d.due_date ? t(late ? "bl_late" : "bl_due", fmtDay(d.due_date)) : fmtDay(d.date)) + '</span><button class="chip ok" style="border:0;font:inherit;margin-top:6px" data-bill="' + r.id + '" data-billv="1">' + esc(t("bl_paid_btn")) +
        '</button></span><b>' + esc(money(d.total)) + "</b></div>"; }).join("") : '<div class="row muted">' + esc(t("bl_none")) + "</div>") + "</div>";
    var fixed = profile().recurring || [];
    if (fixed.length) h += "<h2>" + esc(t("bl_fixed")) + '</h2><div class="card" style="padding:4px 14px">' + fixed.map(function (c) {
      return '<div class="row" style="align-items:flex-start"><span class="grow t">' + esc(c.merchant) + '<span class="muted small" style="display:block">' + esc(c.start ? t("bl_from", fmtDay(c.start)) : (c.start_rule || "")) +
        "</span></span><b>" + esc(money(c.monthly)) + "</b></div>"; }).join("") + "</div>";
    var paid = ownAll.filter(function (r) { return r.data && r.data.paid_at; }).sort(function (a, b) { return a.data.paid_at < b.data.paid_at ? 1 : -1; }).slice(0, 10);
    if (paid.length) h += "<h2>" + esc(t("bl_paid")) + '</h2><div class="card" style="padding:4px 14px">' + paid.map(function (r) {
      return '<div class="row"><span class="grow t">' + esc(r.data.merchant || "…") + '<span class="muted small" style="display:block">' + esc(fmtDay(r.data.paid_at)) + ' · <button style="border:0;background:none;color:inherit;text-decoration:underline;font:inherit;padding:0" data-bill="' + r.id + '" data-billv="0">' + esc(t("bl_undo")) +
        "</button></span></span><b>" + esc(money(r.data.total)) + "</b></div>"; }).join("") + "</div>";
    return h;
  }
  function bar(label, v, max, sub, drill) {
    var w = max > 0 ? Math.max(2, Math.round(v / max * 100)) : 0;
    return '<div ' + (drill ? 'role="button" tabindex="0" class="tap" data-drill="' + esc(drill) + '" ' : "") + 'style="padding:8px 0;border-bottom:1px solid var(--line,#e5e9e7)' + (drill ? ";cursor:pointer" : "") + '"><div style="display:flex;justify-content:space-between;gap:8px"><span class="t">' + esc(label) + "</span><b>" + esc(money(v)) + "</b></div>" +
      '<div style="height:8px;border-radius:4px;background:var(--raised);margin-top:6px"><div style="height:8px;border-radius:4px;width:' + w + '%;background:var(--mint,#2fbf71)"></div></div>' + (sub ? '<div class="muted small" style="margin-top:4px">' + esc(sub) + "</div>" : "") + "</div>";
  }
  function reportsScreen() {
    var h = '<div class="top"><button class="back" aria-label="Back" data-go="menu">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("rp_title")) + "</h1></div>";
    if (!ownAll || ownFrom > rpYear + "-01-01") { ownAll = null; ownLoad(rpYear + "-01-01"); return h + '<div class="empty">…</div>'; }
    var rows = ownAll.filter(function (r) { return counts(r) && String(r.data.date || r.at).slice(0, 4) === String(rpYear); });
    var tot = 0, vat = 0, byM = {}, byC = {}, byP = {};
    rows.forEach(function (r) { var d = r.data, v = Number(d.total) || 0, m = String(d.date || r.at).slice(0, 7);
      tot += v; vat += Number(d.vat) || 0; byM[m] = (byM[m] || 0) + v; var c = d.category || "other"; byC[c] = (byC[c] || 0) + v; byP[r.driver] = (byP[r.driver] || 0) + v; });
    var thisY = new Date().getFullYear();
    h += '<div style="display:flex;align-items:center;gap:8px"><button class="back" aria-label="' + esc(t("rp_prev")) + '" data-rpy="-1" style="width:36px;height:36px">‹</button><b style="flex:1;text-align:center">' + esc(t("rp_year", rpYear)) + "</b>" +
      (rpYear < thisY ? '<button class="back" aria-label="' + esc(t("rp_next")) + '" data-rpy="1" style="width:36px;height:36px">›</button>' : '<span style="width:36px"></span>') + "</div>" +
      '<div class="grid2" style="margin-top:8px"><div class="card kpi"><div class="muted small">' + esc(t("sum_total")) + '</div><div class="n" style="font-size:24px">' + esc(money(tot)) + '</div><div class="muted small">' + rows.length + " " + esc(t("sum_counted")) + '</div></div>' +
      '<div class="card kpi"><div class="muted small">' + esc(t("sum_vat")) + '</div><div class="n" style="font-size:24px">' + esc(money(vat)) + '</div><div class="muted small">' + esc(money(tot - vat)) + " " + esc(t("rp_net")) + "</div></div></div>";
    var sortV = function (o) { return Object.keys(o).sort(function (a, b) { return o[b] - o[a]; }); };
    var mk = Object.keys(byM).sort(), mmax = Math.max.apply(null, mk.map(function (k) { return byM[k]; }).concat([0]));
    if (mk.length) h += "<h2>" + esc(t("rp_months")) + '</h2><div class="card" style="padding:4px 14px">' + mk.map(function (k) { var x = k.split("-"); return bar(new Date(+x[0], +x[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" }), byM[k], mmax, "", "m:" + k); }).join("") + "</div>";
    var ck = sortV(byC), cmax = ck.length ? byC[ck[0]] : 0;
    if (ck.length) h += "<h2>" + esc(t("rp_cats")) + '</h2><div class="card" style="padding:4px 14px">' + ck.map(function (k) { return bar(t("cat_" + k) !== "cat_" + k ? t("cat_" + k) : k, byC[k], cmax, "", "c:" + k); }).join("") + "</div>";
    var pk = sortV(byP);
    if (pk.length > 1) h += "<h2>" + esc(t("rp_people")) + '</h2><div class="card" style="padding:4px 14px">' + pk.map(function (k) { return bar(pname(k), byP[k], byP[pk[0]], "", "p:" + k); }).join("") + "</div>";
    var qv = [0, 0, 0, 0];
    rows.forEach(function (r) { var m = +String(r.data.date || r.at).slice(5, 7), q = Math.floor((m - 1) / 3); qv[q] += Number(r.data.vat) || 0; });
    var vdue = function (q) { var d = q < 3 ? new Date(rpYear, q * 3 + 3, 10, 12) : new Date(rpYear + 1, 0, 10, 12); while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1); return ymd(d); };
    var today = ymd(new Date());
    h += "<h2>" + esc(t("vat_title")) + '</h2><div class="card" style="padding:4px 14px">' + [0, 1, 2, 3].map(function (q) {
      var due = vdue(q), soon = due >= today && (new Date(due) - new Date()) < 45 * 864e5;
      return '<div class="row" style="align-items:flex-start' + (soon ? ";background:var(--warn-soft);border-radius:10px;padding-left:8px;padding-right:8px" : "") + '"><span class="grow t">Q' + (q + 1) + " " + rpYear + '<span class="muted small" style="display:block">' + esc(t("vat_due", fmtDay(due))) + '</span></span><span style="text-align:right"><b>' + esc(money(qv[q])) +
        '</b><br><span class="muted small">' + esc(t("vat_in")) + "</span></span></div>"; }).join("") + '<p class="muted small" style="margin:8px 0">' + esc(t("vat_hint")) + "</p></div>";
    h += '<button class="btn ghost" id="csv" style="margin-top:14px;width:100%">⬇ ' + esc(t("csv_btn")) + "</button>";
    var fl = ownAll.filter(function (r) { return r.data && (r.data.flags || []).length && r.status !== "rejected" && String(r.data.date || r.at).slice(0, 4) === String(rpYear); });
    if (fl.length) h += "<h2>" + esc(t("rp_flags")) + " (" + fl.length + ')</h2><div class="card" style="padding:4px 14px">' + fl.map(function (r) {
      return '<div class="row" style="align-items:flex-start"><span class="grow t">' + esc(r.data.merchant || "…") + '<span class="muted small" style="display:block">' + esc(pname(r.driver) + " · " + fmtDay(r.data.date || r.at)) +
        '</span><span class="small" style="display:block;color:var(--warn,#9a5b00)">⚠ ' + esc(r.data.flags.map(flagTx).join(" · ")) + "</span></span><b>" + esc(money(r.data.total)) + "</b></div>"; }).join("") + "</div>";
    return h;
  }
  // The checks are written in German by the agent; shown in the reader's language.
  var FLAG_TX = [[/^MwSt fehlt/, { el: "Λείπει ο ΦΠΑ στο τιμολόγιο", en: "VAT missing on the invoice" }], [/^Alkohol/, { el: "Αλκοόλ/καπνός στην απόδειξη", en: "Alcohol/tobacco on the receipt" }],
    [/^Essen am Wochenende/, { el: "Φαγητό το Σαββατοκύριακο", en: "Food at the weekend" }], [/^ausländische MwSt/, { el: "Ξένος ΦΠΑ (δεν εκπίπτει)", en: "Foreign VAT (not deductible)" }],
    [/^kein Datum/, { el: "Δεν διαβάζεται ημερομηνία", en: "No date readable" }], [/^älter als 30/, { el: "Παλαιότερη από 30 μέρες", en: "Older than 30 days" }],
    [/^hoher Betrag/, { el: "Μεγάλο ποσό", en: "High amount" }], [/^an diesem Tag keine Schicht/, { el: "Καμία βάρδια εκείνη τη μέρα", en: "No shift that day" }],
    [/^möglicherweise privat/, { el: "Ίσως ιδιωτικό", en: "Maybe private" }], [/^über dem Rahmen/, { el: "Πάνω από το όριο κατηγορίας", en: "Above the category limit" }], [/mehr als ein Tank/, { el: "Περισσότερα λίτρα από ένα ρεζερβουάρ", en: "More than one tank" }]];
  function flagTx(f) { if (lang === "de") return f; for (var i = 0; i < FLAG_TX.length; i++) if (FLAG_TX[i][0].test(f)) return FLAG_TX[i][1][lang] || f; return f; }
  // Owner: the counted receipts of the year as a CSV (semicolon, German decimals) for the accountant.
  function exportCsv() {
    var rows = (ownAll || []).filter(function (r) { return counts(r) && String(r.data.date || r.at).slice(0, 4) === String(rpYear); })
      .sort(function (a, b) { return String(a.data.date || a.at) < String(b.data.date || b.at) ? -1 : 1; });
    var q = function (v) { v = v == null ? "" : String(v); return /[;"\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    var n = function (v) { return v == null || v === "" ? "" : Number(v).toFixed(2).replace(".", ","); };
    var lines = [["Datum", "Lieferant", "Rechnungsnr", "Kategorie", "Brutto", "MwSt", "MwSt-Satz", "Netto", "Bezahlt", "Person", "Beleg-ID"].join(";")].concat(rows.map(function (r) {
      var d = r.data; return [d.date || String(r.at).slice(0, 10), d.merchant, d.number, d.category, n(d.total), n(d.vat), d.vat_rate, n((Number(d.total) || 0) - (Number(d.vat) || 0)), r.paid, r.driver, r.id].map(q).join(";"); }));
    // Inside the Android app (WebView) a download does nothing: offer copy instead.
    if (/; wv\)/.test(navigator.userAgent)) {
      var txt = lines.join("\n");
      openSheet('<h2 style="margin-top:0">CSV ' + rpYear + '</h2><p class="muted small">' + esc(t("csv_wv")) + '</p><textarea class="in" readonly style="min-height:160px;font-size:12px">' + esc(txt) + '</textarea>' +
        '<div style="display:grid;gap:10px;margin-top:12px"><button class="btn" id="csvc">' + esc(t("csv_copy")) + '</button><button class="btn ghost" data-close>OK</button></div>', function (s) {
        s.querySelector("#csvc").onclick = function () {
          var ta = s.querySelector("textarea"), done = function () { toast(t("csv_copied")); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { ta.select(); document.execCommand("copy"); done(); });
          else { ta.select(); document.execCommand("copy"); done(); }
        };
      });
      return;
    }
    var blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "ausgaben-" + rpYear + ".csv"; document.body.appendChild(a); a.click(); a.remove(); toast(t("csv_done"));
  }
  // Reports: tap a month / category / person → the receipts behind the number.
  function pname(x) { return x === "Inhaber" ? t("owner") : x; }
  function drillSheet(key) {
    var kind = key.slice(0, 1), val = key.slice(2);
    var rows = (ownAll || []).filter(function (r) { if (!counts(r) || String(r.data.date || r.at).slice(0, 4) !== String(rpYear)) return false;
      return kind === "m" ? String(r.data.date || r.at).slice(0, 7) === val : kind === "c" ? (r.data.category || "other") === val : r.driver === val; })
      .sort(function (a, b) { return Number(b.data.total) - Number(a.data.total); });
    var title = kind === "m" ? (function () { var x = val.split("-"); return new Date(+x[0], +x[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" }); })() : kind === "c" ? (t("cat_" + val) !== "cat_" + val ? t("cat_" + val) : val) : pname(val);
    var sum = rows.reduce(function (a, r) { return a + (Number(r.data.total) || 0); }, 0);
    openSheet('<h2 style="margin-top:0">' + esc(title) + '</h2><p class="muted small">' + rows.length + " " + esc(t("sum_counted")) + " · " + esc(money(sum)) + '</p><div class="card" style="padding:4px 14px">' + rows.map(function (r) {
      var d = r.data;
      return '<div class="row" style="align-items:flex-start' + (ownRc(r.id) ? ";cursor:pointer" : "") + '"' + (ownRc(r.id) ? ' data-dimg="' + r.id + '"' : "") + '><span class="grow t">' + esc(d.merchant || r.note || "…") + '<span class="muted small" style="display:block;font-weight:400">' + esc([fmtDay(d.date || r.at), kind !== "p" ? pname(r.driver) : "", d.vat != null ? t("sum_vat") + " " + money(d.vat) : ""].filter(Boolean).join(" · ")) +
        "</span></span><b>" + esc(money(d.total)) + "</b></div>"; }).join("") + '</div><button class="btn ghost" data-close style="margin-top:14px">OK</button>', function (s) {
      s.querySelectorAll("[data-dimg]").forEach(function (b) { b.onclick = function () { closeSheet(); receiptView(+b.dataset.dimg); }; }); });
  }
  function bindOwner() {
    app.querySelectorAll("[data-drill]").forEach(function (b) { b.onclick = function () { drillSheet(b.dataset.drill); }; });
    app.querySelectorAll("[data-rpy]").forEach(function (b) { b.onclick = function () { rpYear += +b.dataset.rpy; render(); }; });
    app.querySelectorAll("[data-bill]").forEach(function (b) { b.onclick = function () {
      b.disabled = true;
      rpc("team_owner_bill_paid", { p_token: token, p_id: +b.dataset.bill, p_paid: b.dataset.billv === "1" }).then(function () { ownAll = null; toast(t("saved")); render(); }).catch(function (e) { b.disabled = false; toast(e.message); });
    }; });
    app.querySelectorAll("[data-ex]").forEach(function (b) { b.onclick = function () {
      b.disabled = true;
      rpc("team_owner_report_set", { p_token: token, p_driver: tmSel, p_month: b.dataset.ex, p_status: b.dataset.exs }).then(function (reps) { if (tmPerson && tmPerson.receipts) tmPerson.receipts.reports = reps; toast(t("saved")); render(); })
        .catch(function (e) { b.disabled = false; toast(e.message); });
    }; });
  }

  /* ---------------- Search ---------------- */
  function searchScreen() {
    if (!receipts) loadReceipts();
    return '<div class="top"><button class="back" aria-label="Back" data-go="home">' + ICON.back + '</button><input class="in" id="q" type="search" placeholder="' + esc(t("search_ph")) + '" value="' + esc(query) + '" style="flex:1"></div><div id="hits">' + hits() + "</div>";
  }
  function hits() {
    var q = query.trim().toLowerCase(); if (q.length < 2) return "";
    var out = [];
    posts().forEach(function (p) { if ((p.title + " " + p.body).toLowerCase().indexOf(q) >= 0) out.push(postCard(p)); });
    (data.requests || []).forEach(function (r) { if ((r.text + " " + (r.answer || "")).toLowerCase().indexOf(q) >= 0) out.push('<button class="card row tap" style="width:100%;text-align:left;border:0" data-req="' + r.id + '"><span class="grow t">' + esc(r.text) + "</span>" + chip(r.status) + "</button>"); });
    var words = { plan: [t("plan"), t("my_plan"), "schicht", "shift", "βάρδια"], requests: [t("requests"), "urlaub", "leave", "άδεια", "krank", "sick"], chat: [t("chat"), "hr", "frage"], profile: [t("profile"), t("payslips"), "lohn", "pay", "dokument"] };
    Object.keys(words).forEach(function (k) { if (words[k].some(function (w) { return String(w).toLowerCase().indexOf(q) >= 0; })) out.unshift('<button class="card row tap" style="width:100%;text-align:left;border:0" data-tab="' + k + '"><span class="grow t">' + esc(t(k === "plan" ? "my_plan" : k)) + "</span>›</button>"); });
    // own receipts / documents (shop, note, amount) and open tasks
    var rh = ((receipts && receipts.list) || []).filter(function (r) { var d = r.data || {}; return !d.removed && [d.merchant, r.note, d.number, d.summary, d.total != null ? Number(d.total).toFixed(2).replace(".", ",") : ""].join(" ").toLowerCase().indexOf(q.replace(".", ",")) >= 0; }).slice(0, 15);
    if (rh.length) out.push('<div class="card" style="padding:4px 14px;margin-top:12px">' + rh.map(receiptRow).join("") + "</div>");
    var th = allTasks().filter(function (k) { return (tx(k.title) + " " + (k.vendor || "") + " " + tx(k.detail)).toLowerCase().indexOf(q) >= 0; });
    if (th.length) out.push('<div class="card" style="padding:4px 14px;margin-top:12px">' + th.map(taskRow).join("") + "</div>");
    return out.length ? out.join("") : '<div class="empty">' + esc(t("no_hits")) + "</div>";
  }
  function bindHits() {
    app.querySelectorAll("#hits [data-rimg]").forEach(function (b) { b.onclick = function () { receiptView(+b.dataset.rimg); }; });
    app.querySelectorAll("#hits [data-task]").forEach(function (b) { b.onclick = function () { taskSheet(b.dataset.task); }; });
    app.querySelectorAll("#hits [data-tab]").forEach(function (b) { b.onclick = function () { go(b.dataset.tab); }; });
    app.querySelectorAll("#hits [data-req]").forEach(function (b) { b.onclick = function () { reqSheet(+b.dataset.req); }; });
    app.querySelectorAll("#hits [data-fav]").forEach(function (b) { b.onclick = function () { toggleFav(b.dataset.fav); var r = app.querySelector("#hits"); r.innerHTML = hits(); bindHits(); }; });
  }

  /* ---------------- Plan ---------------- */
  function planScreen() {
    var h = '<div class="top"><button class="back" aria-label="Back" data-go="home">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("my_plan")) + "</h1></div>" +
      (profile().type === "inhaber" ? '<button class="btn ghost" style="height:46px;margin:0 0 12px" id="newappt">' + esc(t("ap_btn")) + "</button>" : "") + '<div class="seg" role="group"><button data-view="week" aria-pressed="' + (planView === "week") + '">' + esc(t("week")) +
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

  // Own PIN (v36 team_change_pin): old + new twice. Unique across everyone (the driver app signs in with the PIN alone).
  function pinSheet() {
    function f(id, lab) { return '<label class="f" for="' + id + '">' + esc(t(lab)) + '</label><input class="in" id="' + id + '" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off">'; }
    openSheet('<h2 style="margin-top:0">' + esc(t("cp_btn")) + "</h2>" + f("cpo", "cp_old") + f("cpn", "cp_new") + f("cpn2", "cp_new2") +
      '<p class="err small" id="cperr" role="alert" style="min-height:1.2em"></p><div style="display:grid;gap:10px;margin-top:8px"><button class="btn" id="cpsave">' + esc(t("cp_save")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      var err = s.querySelector("#cperr"), b = s.querySelector("#cpsave");
      b.onclick = function () {
        var o = s.querySelector("#cpo").value.trim(), n = s.querySelector("#cpn").value.trim(), n2 = s.querySelector("#cpn2").value.trim();
        if (!/^\d{4}$/.test(n)) { err.textContent = t("cp_4"); return; }
        if (n !== n2) { err.textContent = t("cp_same"); return; }
        b.disabled = true; err.textContent = "";
        rpc("team_change_pin", { p_token: token, p_old: o, p_new: n }).then(function () { closeSheet(); toast(t("cp_ok")); })
          .catch(function (e) { b.disabled = false; var m = String(e.message || ""); err.textContent = /wrong/i.test(m) ? t("cp_wrong") : /taken/i.test(m) ? t("cp_taken") : /4 digits/.test(m) ? t("cp_4") : (m || t("err")); });
      };
    });
  }
  function openSheet(inner, after) {
    closeSheet();
    var s = el('<div><div class="scrim"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>' + inner + "</div></div>");
    document.body.appendChild(s); sheet = s; document.documentElement.classList.add("sheet-open");
    (function (sh) {
      var y0 = null, dy = 0, fromGrab = false;
      sh.addEventListener("touchstart", function (e) {
        if (e.touches.length !== 1) return;
        fromGrab = !!(e.target.closest && e.target.closest(".grab"));
        y0 = (fromGrab || sh.scrollTop <= 0) ? e.touches[0].clientY : null; dy = 0; sh.style.transition = "none";
      }, { passive: true });
      sh.addEventListener("touchmove", function (e) {
        if (y0 == null) return;
        dy = e.touches[0].clientY - y0;
        if (dy > 0 && (fromGrab || sh.scrollTop <= 0)) { sh.style.transform = "translateY(" + dy + "px)"; if (e.cancelable) e.preventDefault(); }
        else if (dy < 0 && !fromGrab) { y0 = null; sh.style.transform = ""; }
      }, { passive: false });
      sh.addEventListener("touchend", function () {
        if (y0 == null) return; y0 = null;
        sh.style.transition = "transform .2s ease";
        if (dy > 90) { sh.style.transform = "translateY(100%)"; setTimeout(function () { if (sheet && sheet.contains(sh)) closeSheet(); }, 180); }
        else sh.style.transform = "";
      });
    })(s.querySelector(".sheet"));
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
    document.documentElement.classList.remove("sheet-open");
  }

  function askSheet(kind) {
    var k = KINDS.filter(function (x) { return x[0] === kind; })[0], today = ymd(new Date()), f = "";
    var wk0 = new Date(); wk0.setDate(wk0.getDate() + 7); var fromDef = kind === "leave" ? ymd(wk0) : today;
    if (kind === "leave" || kind === "sick") f = '<div class="two"><div><label class="f" for="f1">' + esc(t("from")) + '</label><input class="in" type="date" id="f1" value="' + fromDef + '"' + (kind === "leave" ? ' min="' + fromDef + '"' : "") + '></div><div><label class="f" for="f2">' + esc(t("to")) + '</label><input class="in" type="date" id="f2" value="' + fromDef + '"></div></div>' +
      (kind === "sick" ? '<p class="muted small">' + esc(t("sick_note")) + "</p>" : "");
    if (kind === "shift_swap") f = '<label class="f" for="f1">' + esc(t("date")) + '</label><input class="in" type="date" id="f1" value="' + today + '">';
    if (kind === "payslip") f = '<label class="f" for="f1">' + esc(t("which_month")) + '</label><input class="in" type="month" id="f1" value="' + today.slice(0, 7) + '">';
    if (kind === "document") f = '<label class="f" for="f1">' + esc(t("which_doc")) + '</label><input class="in" id="f1" placeholder="' + esc(t("doc_ph")) + '">';
    if (kind === "leave") f += '<p class="muted" style="margin:6px 2px 0;font-size:12px">' + esc(t("lv_week")) + '</p><p class="small" id="lvinfo" style="margin:8px 2px 0"></p>';
    openSheet("<h2 style=\"margin-top:0\">" + esc(t(k[1])) + "</h2>" + f + '<label class="f" for="txt">' + esc(kind === "other" || kind === "raise" ? t("why") : t("msg")) + '</label><textarea class="in" id="txt"></textarea>' +
      '<div style="display:grid;gap:10px;margin-top:16px"><button class="btn" id="go">' + esc(t("send")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      var li = s.querySelector("#lvinfo");
      if (li) {
        var upd = function () {
          var a = s.querySelector("#f1").value, b2 = s.querySelector("#f2").value || a; if (!a) { li.textContent = ""; return; }
          var back = b2 < a; if (back) { var x = a; a = b2; b2 = x; }
          var n = 0; for (var dd = parse(a); dd <= parse(b2); dd.setDate(dd.getDate() + 1)) if (dd.getDay() > 0 && dd.getDay() < 6) n++;
          var left = leaveLeft(), txt2 = t("lv_info", n) + (left != null ? " · " + t("lv_left", Math.max(0, left - n)) : "");
          li.innerHTML = esc(txt2) + (back ? '<br><span style="color:var(--warn)">' + esc(t("lv_back")) + "</span>" : "") + (left != null && n > left ? '<br><span style="color:var(--danger)">' + esc(t("lv_over", left)) + "</span>" : "");
        };
        s.querySelector("#f1").addEventListener("change", function () { var f2e = s.querySelector("#f2"); if (f2e.value < this.value) f2e.value = this.value; upd(); });
        s.querySelector("#f2").addEventListener("change", upd); upd();
      }
      s.querySelector("#go").onclick = function () {
        var b = this, txt = s.querySelector("#txt").value.trim(), d = {}, f1 = s.querySelector("#f1"), f2 = s.querySelector("#f2");
        if (kind === "leave" || kind === "sick") { d.from = f1.value; d.to = f2.value || f1.value; if (d.to < d.from) { var x = d.to; d.to = d.from; d.from = x; } }
        if (kind === "leave") { var wk = new Date(); wk.setDate(wk.getDate() + 7); var wkd = ymd(wk); if (d.from < wkd) { var li2 = s.querySelector("#lvinfo"); li2.innerHTML = '<span style="color:var(--danger)">' + esc(t("lv_early", parse(wkd).toLocaleDateString(loc()))) + "</span>"; return; } }
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
    var dd = r.details || {}, dparts = [];
    if (dd.from) dparts.push(fmtDay(dd.from) + (dd.to && dd.to !== dd.from ? " – " + fmtDay(dd.to) : ""));
    if (dd.date) dparts.push(fmtDay(dd.date));
    if (dd.month) { var mm = String(dd.month).split("-"); dparts.push(new Date(+mm[0], +mm[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" })); }
    if (dd.document) dparts.push(dd.document);
    Object.keys(dd).forEach(function (x) { if (["from", "to", "date", "month", "document"].indexOf(x) < 0 && dd[x] != null && typeof dd[x] !== "object") dparts.push(x + ": " + dd[x]); });
    var det = dparts.length ? '<p class="muted small">' + esc(dparts.join(" · ")) + "</p>" : "";
    openSheet('<h2 style="margin-top:0">' + esc(t(k ? k[1] : "ask_other")) + " " + chip(r.status) + '</h2><p class="muted small">' + esc(new Date(r.at).toLocaleString(loc(), { dateStyle: "short", timeStyle: "short", hourCycle: "h23" })) + "</p>" + det +
      '<div class="card"><p style="margin:0;white-space:pre-wrap">' + esc(r.text || "—") + "</p></div>" +
      (r.answer ? '<h2>' + esc(t("agent")) + '</h2><div class="card" style="background:var(--mint-soft)"><p style="margin:0;white-space:pre-wrap">' + esc(r.answer) + "</p></div>" : "") +
      '<div style="margin-top:16px;display:grid;gap:10px"><button class="btn dark" id="tochat">' + esc(t("ask_chat")) + "</button>" +
      ((r.status === "open" || r.status === "with_owner") && r.id > 0 ? '<button class="btn ghost" id="rqw" style="color:var(--danger)">' + esc(t("rq_withdraw")) + "</button>" : "") + '<button class="btn ghost" data-close>OK</button></div>', function (s) {
      s.querySelector("#tochat").onclick = function () { closeSheet(); go("chat"); };
      var w = s.querySelector("#rqw"); if (w) w.onclick = function () {
        if (!window.confirm(t("rq_withdraw_q"))) return; w.disabled = true;
        rpc("team_request_withdraw", { p_token: token, p_request: r.id }).then(function (home) { data = home; closeSheet(); toast(t("rq_withdrawn")); render(); })
          .catch(function (e) { w.disabled = false; toast(e.message || t("err")); });
      };
    });
  }

  /* ---------------- Chat ---------------- */
  function chatScreen() {
    app.innerHTML = '<div class="chat"><header class="chat-head"><button class="back" aria-label="Back" data-go="home">' + ICON.back + '</button><div class="avatar" aria-hidden="true"><i></i></div><div class="grow"><b>' + esc(t("chat_title")) +
      '</b><div class="muted small">' + esc(t("chat_sub")) + '</div></div></header><div class="small" role="note" style="margin:8px var(--gutter) 0;padding:8px 12px;border-radius:12px;background:var(--warn-soft);line-height:1.35">ⓘ ' + esc(t("ai_note")) + '</div><div class="msgs" id="msgs"></div>' +
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
    var lastDay = "";
    box.innerHTML = chat.map(function (m) {
      var me = m.sender === "employee", dk = String(new Date(m.at).toDateString()), sep = "";
      if (dk !== lastDay) { lastDay = dk; sep = '<div class="muted small" style="align-self:center;margin:8px 0 2px;font-weight:700">' + esc(dayLabel(new Date(m.at))) + "</div>"; }
      return sep + '<div class="msg ' + (me ? "me" : "them" + (m.sender === "owner" ? " owner" : "")) + '">' + (me ? "" : '<span class="who">' + esc(m.sender === "owner" ? t("owner") : t("agent")) + "</span>") +
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
        return '<button type="button" data-sec="' + x[0] + '" style="' + (profSec === x[0] ? "background:var(--ink-bg);color:#fff;border-color:var(--ink-bg);font-weight:700" : "") + '">' + esc(t(x[1])) + "</button>"; }).join("") + "</div>";
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
    var h = '<div class="seg" role="group" style="margin-top:10px">' + [["schedule", "schedule"], ["prefs", "prefs"]].map(function (x) {
      return '<button data-cal="' + x[0] + '" aria-pressed="' + (calView === x[0]) + '">' + esc(t(x[1])) + "</button>"; }).join("") + "</div>";
    if (calView === "prefs") return h + prefsEditor();
    if (calView === "worked") calView = "schedule";
    // Month grid: shift days in mint, leave in green, sick in red.
    var now = new Date(), m = calMonth || new Date(now.getFullYear(), now.getMonth(), 1), first = new Date(m.getFullYear(), m.getMonth(), 1);
    var byDay = {}; (data.shifts || []).forEach(function (s) { (byDay[s.day] = byDay[s.day] || []).push(s); });
    var cells = "", lead = (first.getDay() + 6) % 7, days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate(), today = ymd(now);
    for (var i = 0; i < lead; i++) cells += "<span></span>";
    for (var d = 1; d <= days; d++) {
      var k = ymd(new Date(m.getFullYear(), m.getMonth(), d)), sh = byDay[k], lv = leaveOn(k);
      var bg = sh ? "var(--mint)" : lv ? (lv.kind === "krank" ? "var(--bad-soft)" : "var(--mint-soft)") : "transparent";
      cells += '<span style="aspect-ratio:1;display:grid;place-items:center;border-radius:12px;background:' + bg + ';' + (k === today ? "outline:2px solid var(--ink);" : "") + 'font-weight:' + (sh ? 800 : 500) + (sh ? ";color:#0b0f0d" : "") + '">' + d + "</span>";
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
      rows += '<div class="row" data-pd="' + j + '"><label class="grow t" style="display:flex;align-items:center;gap:8px;min-width:64px"><input type="checkbox" ' + (v.ok ? "checked" : "") + ' style="width:22px;height:22px;accent-color:var(--deep)">' + esc(name) + "</label>" +
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
      cacheSet("rc", r);
      var before = {}; ((receipts && receipts.list) || []).forEach(function (x) { before[x.id] = x.status; });
      receipts = r;
      (r.list || []).forEach(function (x) {
        if (before[x.id] === "new" && x.status !== "new") {
          fresh[x.id] = true;
          var d = x.data || {};
          toast(x.status === "read" ? "✓ " + t("read_done") + ": " + (d.merchant || "") + " · " + money(d.total) : t("rs_" + x.status));
        }
      });
      if (!sheet && !typing() && (tab === "receipts" || tab === "home" || tab === "tasks" || tab === "menu" || (tab === "profile" && profSec === "docs"))) render(); else tabsBadge();
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
    var up = new Date(r.at), time = up.toLocaleTimeString(loc(), { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    if (r.status === "new") return '<div class="row" style="align-items:flex-start"><span class="spin" aria-hidden="true"></span><span class="grow"><span class="t">' + esc(t("rs_new")) + '…</span><br><span class="muted small">' +
      esc(t(r.hint === "doc" ? "reading_doc" : "reading_hint")) + '</span><br><span class="muted small">' + esc(t("uploaded_at", time)) + "</span></span></div>";
    if (r.status === "duplicate") {
      var o = (receipts.list || []).filter(function (x) { return x.id === r.dup_of; })[0], od = (o && o.data) || {};
      d = Object.assign({}, od, d); 
    }
    var dt = function (x) { return x ? parse(x).toLocaleDateString(loc()) : ""; }, kind = d.kind || "receipt", isDoc = kind !== "receipt" && !(d.total != null && r.paid !== "none");
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
      (r.status === "duplicate" ? '<br><span class="small" style="color:var(--danger)">' + esc(t("dup_hint")) + "</span>" : "") +
      (isDoc && d.summary && r.status === "filed" ? '<br><span class="small">' + esc(d.summary) + "</span>" : "") +
      (route ? '<br><span class="small" style="font-weight:700">→ ' + esc(t("goes_to", route)) + "</span>" : "") +
      '<br><span class="muted small">' + esc(t("uploaded_at", time) + (r.status === "filed" || r.paid === "none" ? "" : " · " + t("paid_" + r.paid))) + "</span></span>" +
      '<span style="text-align:right;white-space:nowrap"><b>' + esc(d.total != null && r.status !== "duplicate" ? money(d.total) : "") + '</b><br><span class="chip ' + cls + '">' + esc(d.invoice_missing && r.status !== "rejected" ? t("inv_missing") : st === "confirm" ? t("rs_confirm") : st === "approve" ? t("rs_approve") : d.approve === "no" ? t("ap_cancelled") : t("rs_" + st)) + "</span></span></button>";
  }
  /* ---------------- Open tasks (invoice missing, letter to send, date to fill in) ---------------- */
  // Written by the agent (hr_tasks). Each stays until done: by the agent (invoice found) or by the person (done / not business).
  function tx(o) { return !o ? "" : typeof o === "string" ? o : o[lang] || o.de || o.el || o.en || ""; }
  function allTasks() { return (receipts && receipts.tasks) || []; }
  function openTasks() { return allTasks().filter(function (x) { return x.status === "open"; }); }
  function taskRow(k) {
    var sub = [k.vendor, k.amount != null ? money(k.amount) : "", k.due ? t("due_by", fmtDay(k.due)) : k.date ? fmtDay(k.date) : ""].filter(Boolean).join(" · ");
    var late = k.status === "open" && k.due && k.due < ymd(new Date());
    var chip = k.status === "done" ? ["ok", t("tk_done")] : k.status === "dropped" ? ["", t(k.answer === "not_business" ? "tk_dropped" : "tk_cancelled")] : k.answer === "uploaded" ? ["info", t("tk_checking")] : /^own-/.test(k.key) ? ["", t("tk_mine")] : k.who === "owner" ? ["wait", t("tk_you")] : ["info", t("tk_me")];
    return '<button class="row tap" style="width:100%;text-align:left;align-items:flex-start;border:0;background:none;font:inherit;color:inherit' + (late ? ";background:var(--bad-soft);border-radius:10px;padding-left:8px;padding-right:8px" : "") + '" data-task="' + esc(k.key) + '"><span class="grow"><span class="t">' + esc(tx(k.title)) + "</span>" +
      (sub ? '<br><span class="muted small">' + esc(sub) + "</span>" : "") + '</span><span class="chip ' + chip[0] + '" style="white-space:nowrap">' + esc(chip[1]) + "</span></button>";
  }
  function tasksScreen() {
    var h = '<div class="top"><button class="back" aria-label="Back" data-go="home">' + ICON.back + '</button><h1 style="flex:1">' + esc(t("tk_title")) + "</h1></div>";
    if (!receipts) return h + '<div class="empty">…</div>';
    h += '<button class="btn ghost" style="height:46px;margin:0 0 4px" id="tkadd">' + esc(t("tk_add")) + "</button>";
    var own = function (x) { return /^own-/.test(x.key); };
    var op = openTasks(), mineT = op.filter(own), you = op.filter(function (x) { return !own(x) && x.who === "owner" && x.answer !== "uploaded"; }), me = op.filter(function (x) { return !own(x) && you.indexOf(x) < 0; });
    if (mineT.length) h += "<h2>" + esc(t("tk_mine")) + " (" + mineT.length + ')</h2><div class="card" style="padding:4px 14px">' + mineT.map(taskRow).join("") + "</div>";
    var closed = allTasks().filter(function (x) { return x.status !== "open"; });
    if (!op.length) h += '<div class="empty">' + esc(t("tk_none")) + "</div>";
    if (you.length) h += "<h2>" + esc(t("tk_you")) + " (" + you.length + ')</h2><div class="card" style="padding:4px 14px">' + you.map(taskRow).join("") + "</div>";
    if (me.length) h += "<h2>" + esc(t("tk_me")) + " (" + me.length + ')</h2><div class="card" style="padding:4px 14px">' + me.map(taskRow).join("") + "</div>";
    if (closed.length) h += "<h2>" + esc(t("tk_closed")) + '</h2><div class="card" style="padding:4px 14px;opacity:.8">' + closed.map(taskRow).join("") + "</div>";
    return h;
  }
  function taskAddSheet() {
    openSheet('<h2 style="margin-top:0">' + esc(t("tk_add_t")) + '</h2><label class="f" for="tkw">' + esc(t("tk_add_what")) + '</label><input class="in" id="tkw" maxlength="200">' +
      '<label class="f" for="tkd">' + esc(t("tk_add_due")) + '</label><input class="in" type="date" id="tkd" min="' + ymd(new Date()) + '">' +
      '<div style="display:grid;gap:10px;margin-top:16px"><button class="btn" id="tks">' + esc(t("ap_save")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      s.querySelector("#tkw").focus();
      s.querySelector("#tks").onclick = function () {
        var b = this, w = s.querySelector("#tkw").value.trim(), d = s.querySelector("#tkd").value;
        if (!w) { s.querySelector("#tkw").focus(); return; }
        b.disabled = true;
        rpc("team_task_add", { p_token: token, p_title: w, p_due: d || null }).then(function (r) { receipts = r; closeSheet(); toast(t("saved")); render(); })
          .catch(function (e) { b.disabled = false; toast(e.message || t("err")); });
      };
    });
  }
  function taskAnswer(key, a) {
    return rpc("team_task_answer", { p_token: token, p_task: key, p_answer: a }).then(function (r) { receipts = r; closeSheet(); toast(t("saved")); render(); }).catch(function (e) { toast(e.message || t("err")); });
  }
  function taskSheet(key) {
    var k = allTasks().filter(function (x) { return x.key === key; })[0]; if (!k) return;
    var open = k.status === "open", facts = [k.vendor, k.amount != null ? money(k.amount) : "", k.date ? fmtDay(k.date) : "", k.due ? t("due_by", fmtDay(k.due)) : "", k.created_at ? t("tk_since", fmtDay(k.created_at)) : ""].filter(Boolean);
    var b = [];
    if (open && k.link) b.push('<a class="btn dark" style="display:flex;align-items:center;justify-content:center;text-decoration:none" href="' + esc(k.link) + '" target="_blank" rel="noopener">' + esc(t("tk_open")) + "</a>");
    if (open && k.kind === "invoice" && k.answer !== "uploaded") b.push('<button class="btn' + (k.link ? " ghost" : "") + '" id="tkup">📷 ' + esc(t("tk_upload")) + "</button>");
    if (open && k.kind === "doc") b.push('<button class="btn" id="tkdoc">📷 ' + esc(t("tk_upload_doc")) + "</button>");
    if (open) b.push('<button class="btn ghost" id="tkdone">✓ ' + esc(t("tk_done")) + "</button>");
    if (open && k.kind === "invoice") b.push('<button class="btn ghost" id="tknb">' + esc(t("tk_notbiz")) + "</button>");
    b.push('<button class="btn ghost" data-close>' + esc(open ? t("tk_later") : t("cancel")) + "</button>");
    openSheet('<h2 style="margin-top:0">' + esc(tx(k.title)) + "</h2>" + (facts.length ? '<p class="muted small">' + esc(facts.join(" · ")) + "</p>" : "") +
      (k.detail ? "<p>" + esc(tx(k.detail)) + "</p>" : "") + (open && k.who === "agent" && k.answer !== "uploaded" ? '<p class="muted small">' + esc(t("tk_agent_hint")) + "</p>" : "") +
      '<div style="display:grid;gap:10px;margin-top:16px">' + b.join("") + "</div>", function (s) {
      var up = s.querySelector("#tkup"); if (up) up.onclick = function () { closeSheet(); receiptSheet(null, { note: k.key + (k.vendor ? " " + k.vendor : ""), paid: "company", task: k.key }); };
      var dc = s.querySelector("#tkdoc"); if (dc) dc.onclick = function () { closeSheet(); receiptSheet(null, { note: k.key, hint: "doc", task: k.key }); };
      var dn = s.querySelector("#tkdone"); if (dn) dn.onclick = function () { dn.disabled = true; taskAnswer(k.key, "done"); };
      var nb = s.querySelector("#tknb"); if (nb) nb.onclick = function () { if (confirm(t("tk_notbiz_q"))) { nb.disabled = true; taskAnswer(k.key, "not_business"); } };
    });
  }

  // The receipts tab: add new ones (camera or gallery) on top, then everything sent, newest first, by the day it was sent.
  function receiptsScreen() {
    var h = '<div class="top"><h1>' + esc(t("up_title")) + "</h1></div>";
    h += '<div class="grid2" style="margin-top:0"><button class="btn dark" style="height:auto;padding:18px 8px" data-rnew="cam"><span style="font-size:28px">📷</span><br>' + esc(t("receipt_take")) + '</button>' +
      '<button class="btn ghost" style="height:auto;padding:18px 8px" data-rnew="gal"><span style="font-size:28px">🖼️</span><br>' + esc(galLabel()) + "</button></div>";
    h += '<p class="muted small" style="margin:10px 2px 0">' + esc(t("up_intro")) + "</p>";
    if (!receipts) { loadReceipts(); return h + '<div class="empty">…</div>'; }
    // What still lacks its real invoice comes first: open tasks of the receipt hunt + uploaded proofs without an invoice.
    var list = (receipts.list || []).filter(function (r) { return !(r.data && r.data.removed); });
    var invT = openTasks().filter(function (x) { return x.kind === "invoice"; });
    var missing = list.filter(function (r) { return r.data && r.data.invoice_missing && r.status !== "rejected"; });
    if (missing.length || invT.length) h += '<h2>' + esc(t("inv_missing_top")) + ' (' + (missing.length + invT.length) + ')</h2><div class="card" style="padding:4px 14px;background:var(--warn-soft)">' + invT.map(taskRow).join("") + missing.map(receiptRow).join("") + "</div>";
    if (receipts.to_confirm > 0) h += '<div class="card" style="background:var(--blue-soft);margin-top:14px"><b>' + esc(t("confirm_home", receipts.to_confirm)) + '</b><div class="muted small">' + esc(t("confirm_tap")) + "</div></div>";
    if (receipts.owed > 0) h += '<div class="card" style="background:var(--mint-soft);margin-top:14px"><div class="muted small">' + esc(t("owed2")) + '</div><div style="font-size:28px;font-weight:900">' + esc(money(receipts.owed)) + "</div></div>";
    if ((receipts.reports || []).length) h += "<h2>" + esc(t("ex_title")) + '</h2><div class="card" style="padding:4px 14px">' + receipts.reports.slice(0, 6).map(exRow(false)).join("") + "</div>";
    if (!list.length) return h + '<div class="empty">' + esc(t("no_receipts")) + "</div>";
    // Three kinds, each its own list: receipts (money spent), documents (licences, insurance, letters, sick notes),
    // proofs (payment / order confirmations waiting for their real invoice). Proofs without an invoice stay on top.
    var cnt = { rcpt: 0, docs: 0, proof: 0 }; list.forEach(function (r) { rKinds(r).forEach(function (k) { cnt[k]++; }); });
    if (!cnt[rSeg]) rSeg = cnt.rcpt ? "rcpt" : cnt.docs ? "docs" : cnt.proof ? "proof" : "rcpt";
    h += '<div class="seg" role="tablist" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:18px;padding:4px;border-radius:14px;background:var(--raised)">' +
      ["rcpt", "docs", "proof"].map(function (k) {
        var on = rSeg === k;
        return '<button type="button" role="tab" aria-selected="' + on + '" data-rseg="' + k + '" style="padding:10px 4px;border-radius:10px;border:0;font:inherit;font-weight:' + (on ? 800 : 600) +
          ';background:' + (on ? "var(--card)" : "transparent") + ';color:inherit;box-shadow:' + (on ? "0 1px 3px rgba(0,0,0,.12)" : "none") + '">' + esc(t("seg_" + k)) +
          '<span class="muted small" style="display:block;font-weight:600">' + cnt[k] + "</span></button>";
      }).join("") + "</div>";
    var seg = list.filter(function (r) { return rKinds(r).indexOf(rSeg) >= 0; });
    var month = function (r) { return String((r.data && r.data.date) || r.at).slice(0, 7); };
    var months = []; seg.forEach(function (r) { var m = month(r); if (months.indexOf(m) < 0) months.push(m); }); months.sort().reverse();
    if (rMonth && months.indexOf(rMonth) < 0) rMonth = "";
    var mName = function (m) { var x = m.split("-"); return new Date(+x[0], +x[1] - 1, 1).toLocaleDateString(loc(), { month: "short", year: "2-digit" }); };
    if (months.length > 1) h += '<div style="display:flex;gap:6px;overflow-x:auto;margin-top:10px;padding-bottom:2px">' + [""].concat(months).map(function (m) {
      var on = rMonth === m;
      return '<button type="button" data-rmonth="' + m + '" class="chip' + (on ? " ok" : "") + '" style="border:0;white-space:nowrap;padding:6px 12px;font:inherit;font-size:14px' + (on ? ";font-weight:800" : "") + '">' + esc(m ? mName(m) : t("all_months")) + "</button>";
    }).join("") + "</div>";
    if (rMonth) seg = seg.filter(function (r) { return month(r) === rMonth; });
    if (list.length > 5) h += '<input class="in" id="rq" type="search" enterkeyhint="search" placeholder="' + esc(t("r_search")) + '" value="' + esc(rQuery) + '" style="width:100%;margin-top:10px">';
    var rq = rQuery.trim().toLowerCase().replace(",", ".");
    if (rq) seg = seg.filter(function (r) { var d = r.data || {};
      return [d.merchant, r.note, d.number, d.category, d.total != null ? Number(d.total).toFixed(2) : "", d.summary].join(" ").toLowerCase().indexOf(rq) >= 0; });
    if (!seg.length) return h + '<div class="empty">' + esc(rq ? t("r_nohit") : t("seg_empty")) + "</div>";
    if (rSeg === "rcpt") {
      var counted = seg.filter(counts);
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
  var rSeg = load("team_rseg") || "rcpt", rMonth = "", rQuery = "";
  // Anything with an amount spent is a receipt (incl. the car invoice, which counts in ELSTER as an asset).
  // Vehicle invoices also show under documents, because they are papers of the car too.
  function rKinds(r) {
    var d = r.data || {}, k = d.kind || "";
    if (d.invoice_missing || d.proof || /payment|order_conf|confirmation/.test(k)) return ["proof"];
    if (d.total != null && r.paid !== "none") return /car|vehicle/.test(k) || d.category === "vehicle" ? ["rcpt", "docs"] : ["rcpt"];
    if (r.hint === "doc" || (k && k !== "receipt")) return ["docs"];
    return ["rcpt"];
  }
  function rKind(r) { return rKinds(r)[0]; }
  function secWallet() {
    var slips = data.payslips || [];
    return "<h2>" + esc(t("movements")) + "</h2>" + (slips.length ? '<div class="card" style="padding:4px 14px">' + slips.map(function (s) {
      var m = s.month.split("-"), name = new Date(+m[0], +m[1] - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" });
      return '<button class="row tap" style="width:100%;text-align:left" data-slip="' + esc(s.month) + '"><span class="grow"><span class="t">' + esc(name) + '</span><br><span class="muted small">' + "" + "</span></span><b>" + esc(money(s.data && (s.data.net != null ? s.data.net : s.data.gross))) + "</b></button>";
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
    h += '<div class="card" style="padding:4px 14px"><button class="row tap" style="width:100%;text-align:left" id="cpin"><span class="grow t">🔑 ' + esc(t("cp_btn")) + "</span>›</button></div>";
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
      ["Arbeitszeit", "nach Arbeitsvertrag, flexible Einteilung; Aufzeichnungen beim Arbeitgeber (§ 17 MiLoG)"],
      ["Sofortmeldung (SV)", docs.sofortmeldung && docs.sofortmeldung.done ? "erfolgt am " + d(docs.sofortmeldung.done) : "—"],
      ["Arbeitsvertrag", docs.arbeitsvertrag && docs.arbeitsvertrag.signed ? "unterschrieben am " + d(docs.arbeitsvertrag.signed) : "—"],
      ["Führerschein", docs.fuehrerschein && docs.fuehrerschein.expires ? "gültig bis " + d(docs.fuehrerschein.expires) : "—"],
      ["P-Schein", docs.p_schein && docs.p_schein.expires ? "gültig bis " + d(docs.p_schein.expires) : "—"]
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
  // A PDF invoice becomes one image on the phone (first 3 pages under each other), so the rest stays as for photos.
  var PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
  function pdfLib() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    return new Promise(function (ok, bad) {
      var sc = document.createElement("script"); sc.src = PDFJS + "pdf.min.js";
      sc.onload = function () { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; ok(window.pdfjsLib); };
      sc.onerror = function () { bad(new Error(t("offline"))); }; document.head.appendChild(sc);
    });
  }
  function pdfToJpeg(f) {
    return Promise.all([pdfLib(), f.arrayBuffer()]).then(function (x) { return x[0].getDocument({ data: x[1] }).promise; }).then(function (doc) {
      var n = Math.min(doc.numPages, 3), pages = [];
      var next = function (i) { if (i > n) return Promise.resolve();
        return doc.getPage(i).then(function (pg) { var v0 = pg.getViewport({ scale: 1 }), v = pg.getViewport({ scale: 1400 / v0.width }), c = document.createElement("canvas");
          c.width = Math.round(v.width); c.height = Math.round(v.height); var g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
          return pg.render({ canvasContext: g, viewport: v }).promise.then(function () { pages.push(c); return next(i + 1); }); }); };
      return next(1).then(function () {
        var w = pages[0].width, h = pages.reduce(function (a, c) { return a + c.height; }, 0), k = Math.min(1, 4200 / h), out = document.createElement("canvas");
        out.width = Math.round(w * k); out.height = Math.round(h * k); var g = out.getContext("2d"), y = 0;
        g.fillStyle = "#fff"; g.fillRect(0, 0, out.width, out.height);
        pages.forEach(function (c) { g.drawImage(c, 0, y, Math.round(c.width * k), Math.round(c.height * k)); y += Math.round(c.height * k); });
        var q = 0.8, src = out.toDataURL("image/jpeg", q); while (src.length > 2800000 && q > 0.35) { q -= 0.1; src = out.toDataURL("image/jpeg", q); }
        return src;
      });
    });
  }
  function shrink(f) {
    if (f && (f.type === "application/pdf" || /\.pdf$/i.test(f.name || ""))) return pdfToJpeg(f);
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
  // In the Android app the gallery shows photos only; app 1.4+ (TransferTeamApp/2) has its own PDF button.
  function inApp() { return /; wv\)/.test(navigator.userAgent); }
  function appPdf() { return /TransferTeamApp\/\d/.test(navigator.userAgent); }
  function galLabel() { return inApp() ? t("receipt_gallery").replace(/ \/ PDF$/, "") : t("receipt_gallery"); }
  function receiptSheet(mode, pre) {
    pre = pre || {};
    var imgs = [], paid = pre.paid || "fuelcard", hint = pre.hint || "receipt";
    openSheet('<h2 style="margin-top:0">' + esc(t("up_title")) + '</h2><p class="muted small">' + esc(t("receipt_hint")) + "</p>" +
      '<input type="file" accept="image/*" capture="environment" id="rcam" style="display:none">' +
      '<input type="file" accept="image/*,application/pdf" multiple id="rgal" style="display:none">' +
      (appPdf() ? '<input type="file" accept="application/pdf" multiple id="rpdfin" style="display:none">' : "") +
      '<div class="two"><button class="btn dark" id="rtake">📷 ' + esc(t("receipt_take")) + '</button><button class="btn ghost" id="rpick">🖼️ ' + esc(galLabel()) + "</button></div>" +
      (appPdf() ? '<button class="btn ghost" id="rpdf" style="width:100%;margin-top:10px">📄 PDF</button>' : "") +
      '<div id="rprev" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px"></div>' +
      '<label class="f">' + esc(t("up_what")) + '</label><div class="seg" id="rhint">' + ["receipt", "doc"].map(function (k) {
        return '<button type="button" data-h="' + k + '" aria-pressed="' + (k === hint) + '">' + esc(t("up_" + k)) + "</button>"; }).join("") + "</div>" +
      '<p class="muted small" id="rdochint" style="margin:6px 2px 0;display:none">' + esc(t("up_doc_hint")) + "</p>" +
      '<div id="rpaybox"><label class="f">' + esc(t("paid_how")) + '</label><div class="seg" id="rpaid" style="flex-wrap:wrap">' + ["fuelcard", "company", "cash", "card"].map(function (k) {
        return '<button type="button" data-p="' + k + '" aria-pressed="' + (k === paid) + '">' + esc(t("paid_" + k)) + "</button>"; }).join("") + "</div>" +
      '<p class="muted small" style="margin:6px 2px 0">' + esc(t("receipt_paid_hint")) + "</p></div>" +
      '<label class="f" for="rnote">' + esc(t("receipt_note")) + '</label><input class="in" id="rnote" value="' + esc(pre.note || "") + '">' +
      '<div style="display:grid;gap:10px;margin-top:16px"><button class="btn" id="rsend" disabled>' + esc(t("send")) + '</button><button class="btn ghost" data-close>' + esc(t("cancel")) + "</button></div>", function (s) {
      var cam = s.querySelector("#rcam"), gal = s.querySelector("#rgal"), send = s.querySelector("#rsend");
      s.querySelector("#rtake").onclick = function () { picking(); cam.click(); };
      s.querySelector("#rpick").onclick = function () { picking(); gal.click(); };
      var pin = s.querySelector("#rpdfin");
      if (pin) { s.querySelector("#rpdf").onclick = function () { picking(); pin.click(); }; pin.onchange = function () { add(pin); }; pin.addEventListener("cancel", backFromPick); }
      s.querySelectorAll("[data-h]").forEach(function (b) { b.onclick = function () { hint = b.dataset.h; s.querySelectorAll("[data-h]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        s.querySelector("#rpaybox").style.display = hint === "doc" ? "none" : ""; s.querySelector("#rdochint").style.display = hint === "doc" ? "" : "none"; }; });
      if (hint === "doc") { s.querySelector("#rpaybox").style.display = "none"; s.querySelector("#rdochint").style.display = ""; }
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
      if (mode === "cam") { picking(); cam.click(); } else if (mode === "gal") { picking(); gal.click(); } else if (mode === "pdf" && pin) { picking(); pin.click(); }
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
          if (pre.task && sent) rpc("team_task_answer", { p_token: token, p_task: pre.task, p_answer: "uploaded" }).then(function (r) { receipts = r; render(); }).catch(function () {});
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
      if (k === "hours" || k === "days") return;
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
      { id: 5, at: new Date(Date.now() - 864e5).toISOString(), paid: "none", status: "filed", hint: "doc", data: { kind: "hu_report", hu_next: "2027-11", hu_result: "ohne Mängel", route: ["fleet"], summary: "HU-Prüfbericht, keine Mängel" } }], to_confirm: 1, reports: [{ month: d(0).slice(0, 7), total: 62.4, status: "open" }, { month: d(-31).slice(0, 7), total: 41.2, status: "paid" }] };
    demoReceipts.tasks = [
      { key: "inv-demo-rental", kind: "invoice", who: "owner", status: "open", vendor: "Autovermietung", date: d(-40), created_at: d(-2), title: { de: "Mietwagen: Rechnung fehlt", en: "Rental car: invoice missing", el: "Ενοικίαση αυτοκινήτου: λείπει το τιμολόγιο" }, detail: { de: "Einmal im Kundenkonto anmelden, dann lade ich die Rechnung.", en: "Sign in to the customer account once, then I fetch the invoice.", el: "Συνδέσου μία φορά στον λογαριασμό, μετά το κατεβάζω εγώ." }, link: "https://example.com/" },
      { key: "inv-demo-printer", kind: "invoice", who: "agent", status: "open", vendor: "Online-Shop", amount: 233.85, date: d(-1), created_at: d(-1), title: { de: "Drucker: Rechnung folgt", en: "Printer: invoice to follow", el: "Εκτυπωτής: περιμένει τιμολόγιο" }, detail: { de: "Die Rechnung kommt nach dem Versand.", en: "The invoice comes after shipping.", el: "Το τιμολόγιο βγαίνει μετά την αποστολή." } },
      { key: "todo-demo-vat", kind: "todo", who: "owner", status: "open", due: d(20), created_at: d(-1), title: { de: "MwSt-Voranmeldung senden", en: "Send the VAT return", el: "Στείλε τη δήλωση ΦΠΑ" }, detail: { de: "Den Entwurf mache ich. Du sendest ihn.", en: "I prepare the draft. You send it.", el: "Το σχέδιο το ετοιμάζω εγώ. Το στέλνεις εσύ." } },
      { key: "doc-demo-dates", kind: "doc", who: "owner", status: "open", created_at: d(-3), title: { de: "Ablaufdatum fehlt: Führerschein", en: "Expiry date missing: licence", el: "Λείπει η ημερομηνία λήξης: δίπλωμα" } },
      { key: "inv-demo-old", kind: "invoice", who: "agent", status: "done", vendor: "Paketdienst", amount: 10.49, created_at: d(-5), done_at: d(-1), title: { de: "Paketmarke: Rechnung", en: "Parcel label: invoice", el: "Ετικέτα δέματος: τιμολόγιο" } }];
    var msgs = [], reqs = [{ id: 1, at: new Date(Date.now() - 2 * 864e5).toISOString(), kind: "leave", text: "Urlaub für Familienbesuch", details: { from: d(20), to: d(24) }, status: "with_owner", answer: "Danke, ich habe deinen Urlaub an den Chef weitergegeben. Du bekommst Bescheid, sobald er entschieden hat." }];
    var home = {
      me: { id: "demo", name: "Max Testfahrer" },
      profile: { phone: "4915100000000", type: /[?&]owner\b/.test(location.search) ? "inhaber" : "minijob", start: /[?&]onb\b/.test(location.search) ? "2027-03-01" : "2026-09-01", status: /[?&]onb\b/.test(location.search) ? "planned" : "active", hourly_wage: 13.9, days_per_week: 2, vacation_days_per_year: 10, role: "Fahrer",
        inbox: /[?&]owner\b/.test(location.search) ? [{ at: new Date().toISOString(), title: "Transfer Team · Beleg prüfen", text: "Inhaber: Werkstatt (Beispiel), 289,00 € – MwSt fehlt" }, { at: new Date(Date.now() - 864e5).toISOString(), title: "Lisa (HR): Fristen", text: "P-Schein läuft in 40 Tagen ab" }] : undefined,
        vehicles: /[?&]owner\b/.test(location.search) ? [{ id: "v1", name: "Beispielwagen", model: "Kombi Hybrid", year: 2023, km: 129237, km_date: d(0), hu_due: d(90).slice(0, 7), service_last: d(-410), service_last_km: 104518, service_months: 12, service_km: 26000,
          insurer: "Versicherung (Beispiel)", ins_ends: d(330), ins_cancel_by: d(300), ins_month: 60.79, first_aid: d(400), tyres: "winter", tyres_changed: d(0),
          tasks: [{ id: "T1", title: "Mietwagen-Versicherung abschließen", deadline: d(8), priority: "critical", status: "open" }, { id: "T2", title: "Inspektion bei 130.518 km", deadline: d(-48), due_km: 130518, priority: "high", status: "open" }, { id: "T3", title: "Dashcam-Angebote vergleichen", deadline: d(12), priority: "normal", status: "open" }] }] : undefined,
        documents: { fuehrerschein: { expires: "2031-04-30" }, p_schein: { expires: d(40) }, arbeitsvertrag: { signed: "2026-08-28" }, sofortmeldung: { done: "2026-08-31" } },
        recurring: [{ id: "miete", merchant: "Büromiete", monthly: 90, start: "2026-09-01" }],
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
        if (fn === "driver_login" || fn === "team_login") return ok({ token: "demo", driver: home.me, set_pin: /[?&]firstpin\b/.test(location.search) });
        if (fn === "team_owner_receipts") return ok(demoReceipts.list.map(function (r) { return Object.assign({ driver: "Max Testfahrer" }, r); }).concat([
          { id: 50, at: new Date().toISOString(), driver: "Inhaber", paid: "company", status: "read", data: { merchant: "Kfz-Versicherung (Beispiel)", total: 412.5, date: d(-5), category: "other", payment_status: "open", due_date: d(4) } },
          { id: 51, at: new Date().toISOString(), driver: "Inhaber", paid: "company", status: "read", data: { merchant: "Werkstatt (Beispiel)", total: 289, vat: 46.14, date: d(-20), category: "repair", payment_status: "open", due_date: d(-2), flags: ["MwSt fehlt auf der Rechnung"] } }]));
        if (fn === "team_owner_bill_paid") return ok({ ok: true });
        if (fn === "team_owner_report_set") return ok([{ month: d(0).slice(0, 7), total: 62.4, status: a.p_status }]);
        if (fn === "team_owner_people") return ok([{ id: "demo", name: "Max Testfahrer", phone: "4915100000000", role: "Fahrer", last_seen: new Date().toISOString(), receipts_open: 1, requests_open: 1, docs_soon: 1 }]);
        if (fn === "team_owner_appt_add") { home.shifts = (home.shifts || []).concat([{ day: a.p_day, start: a.p_start, end: a.p_end || a.p_start, note: "📅 " + a.p_title }]); return ok({ ok: true }); }
        if (fn === "team_owner_post") { home.posts = [{ id: Date.now() % 100000, at: new Date().toISOString(), title: a.p_title, body: a.p_body, pinned: a.p_pinned, category: "news" }].concat(home.posts || []); return ok(home); }
        if (fn === "team_owner_post_delete") { home.posts = (home.posts || []).filter(function (x) { return x.id !== a.p_id; }); return ok(home); }
        if (fn === "team_owner_request_decide") { reqs.forEach(function (x) { if (x.id === a.p_request) { x.decision = a.p_decision; x.status = "done"; } }); return ok({ me: { id: "demo", name: "Max Testfahrer", phone: "4915100000000" }, profile: home.profile, shifts: home.shifts, leave: home.leave, requests: reqs, receipts: demoReceipts }); }
        if (fn === "team_owner_person") return ok({ me: { id: "demo", name: "Max Testfahrer", phone: "4915100000000" }, profile: home.profile, shifts: home.shifts, leave: home.leave, requests: reqs, receipts: demoReceipts });
        if (fn === "team_onboarding_get") return ok(Demo.onb || { data: {} });
        if (fn === "team_onboarding_save") { Demo.onb = { data: a.p_data, submitted_at: a.p_submit ? new Date().toISOString() : (Demo.onb && Demo.onb.submitted_at) || null }; return ok(Demo.onb); }
        if (fn === "team_owner_onboarding") return ok(Demo.onb || { data: { surname: "Muster", first_names: "Max", health: "TK", whatsapp: true }, submitted_at: new Date().toISOString() });
        if (fn === "team_change_pin") return ok(a.p_old === "0000" ? Promise.reject(new Error("wrong PIN")) : { ok: true });
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
        if (fn === "team_request_withdraw") { reqs.forEach(function (x) { if (x.id === a.p_request) x.status = "done"; }); home.requests = reqs; return ok(home); }
        if (fn === "team_task_add") { demoReceipts.tasks.unshift({ key: "own-" + Date.now(), kind: "todo", who: "owner", status: "open", due: a.p_due, created_at: d(0), title: { de: a.p_title, en: a.p_title, el: a.p_title } }); return ok(demoReceipts); }
        if (fn === "team_task_answer") { demoReceipts.tasks.forEach(function (x) { if (x.key === a.p_task) { x.answer = a.p_answer; if (a.p_answer === "done") x.status = "done"; if (a.p_answer === "not_business") x.status = "dropped"; if (a.p_answer === "uploaded") x.who = "agent"; } }); return ok(demoReceipts); }
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

  // Keyboard: Enter / Space on tappable rows that are not real buttons.
  document.addEventListener("keydown", function (e) { var el = e.target; if ((e.key === "Enter" || e.key === " ") && el && el.getAttribute && el.getAttribute("role") === "button" && el.tagName !== "BUTTON") { e.preventDefault(); el.click(); } });
  // Pull down at the top of a screen to reload (the Android app has no reload button).
  (function () {
    var y0 = null, pulled = 0, tip = null;
    document.addEventListener("touchstart", function (e) { y0 = (window.scrollY <= 0 && token && tab !== "chat" && !sheet && e.touches.length === 1) ? e.touches[0].clientY : null; pulled = 0; }, { passive: true });
    document.addEventListener("touchmove", function (e) {
      if (y0 == null) return; pulled = e.touches[0].clientY - y0;
      if (pulled > 20) {
        if (!tip) { tip = document.createElement("div"); tip.style.cssText = "position:fixed;left:50%;top:calc(var(--safe-t) + 8px);transform:translateX(-50%);z-index:60;background:var(--ink-bg);color:#fff;border-radius:999px;padding:6px 14px;font-weight:800;font-size:14px;transition:opacity .2s"; document.body.appendChild(tip); }
        tip.textContent = pulled > 80 ? "↻" : "↓"; tip.style.opacity = Math.min(1, pulled / 80);
      }
    }, { passive: true });
    document.addEventListener("touchend", function () {
      var go2 = y0 != null && pulled > 80; y0 = null;
      if (tip) { var x = tip; tip = null; if (!go2) x.remove(); else { x.textContent = "↻ …"; refresh().then(function () { return loadReceipts(); }).then(function () { if (tab === "team") { tmList = null; tmPerson = null; } if (tab === "bills" || tab === "reports") ownAll = null; if (!sheet) render(); }).catch(function () {}).then(function () { x.remove(); }); } }
    }, { passive: true });
  })();
  // "Stay signed in" switched off: a new start of the app (no tab mark) signs out.
  try { if (token && load("team_stay") === "0" && !sessionStorage.getItem("team_tab")) { store("team_token", null); token = null; } } catch (e) {}
  if (iosBrowser()) installScreen(); else if (token && load("team_set_pin")) setPinScreen(null); else if (token) start(); else pinScreen();
})();

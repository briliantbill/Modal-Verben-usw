/* ============================================================
   DATA SOAL LATIHAN
   Anda bisa menambah soal di file ini tanpa menyentuh quiz.js.

   Format soal pilihan:
   {
     type: "choice",
     prompt: "Kalimat dengan ___ sebagai bagian kosong.",
     options: ["am", "um", "von ... bis"],
     answer: "am",
     explanation: "Alasan singkat untuk murid."
   }
   ============================================================ */

const QUIZ_DATA = {
  zeitangaben: {
    title: "Latihan Topik 1: pilih am, um, atau von ... bis",
    hint: "Klik jawaban yang paling tepat. Feedback langsung muncul setelah menjawab.",
    questions: [
      {
        type: "choice",
        prompt: "Der Deutschkurs beginnt ___ acht Uhr.",
        options: ["am", "um", "von ... bis"],
        answer: "um",
        explanation: "Delapan Uhr adalah jam. Jam selalu memakai um."
      },
      {
        type: "choice",
        prompt: "Ich lerne Deutsch ___ Montag.",
        options: ["am", "um", "von ... bis"],
        answer: "am",
        explanation: "Montag adalah hari, jadi jawabannya am Montag."
      },
      {
        type: "choice",
        prompt: "Die Schule ist ___ Montag ___ Freitag offen.",
        options: ["am", "um", "von ... bis"],
        answer: "von ... bis",
        explanation: "Ada rentang dari Senin sampai Jumat, jadi pakai von ... bis."
      },
      {
        type: "choice",
        prompt: "Wir treffen uns ___ Wochenende.",
        options: ["am", "um", "von ... bis"],
        answer: "am",
        explanation: "Akhir pekan memakai am Wochenende."
      },
      {
        type: "choice",
        prompt: "Der Film beginnt ___ Viertel nach sieben.",
        options: ["am", "um", "von ... bis"],
        answer: "um",
        explanation: "Viertel nach sieben adalah waktu jam, jadi memakai um."
      },
      {
        type: "choice",
        prompt: "Ich arbeite ___ Vormittag.",
        options: ["am", "um", "von ... bis"],
        answer: "am",
        explanation: "Bagian hari seperti Vormittag memakai am."
      },
      {
        type: "choice",
        prompt: "Der Laden ist ___ neun Uhr ___ siebzehn Uhr geoeffnet.",
        options: ["am", "um", "von ... bis"],
        answer: "von ... bis",
        explanation: "Kalimat ini menyatakan rentang waktu buka, dari jam 9 sampai jam 17."
      },
      {
        type: "choice",
        prompt: "Ich schlafe ___ Nacht.",
        options: ["am", "um", "in der"],
        answer: "in der",
        explanation: "Nacht adalah pengecualian. Bentuk yang benar: in der Nacht."
      },
      {
        type: "choice",
        prompt: "Der Unterricht endet ___ halb vier.",
        options: ["am", "um", "von ... bis"],
        answer: "um",
        explanation: "halb vier adalah 15:30. Karena ini jam, pakai um."
      },
      {
        type: "choice",
        prompt: "Ich gehe ___ Abend spazieren.",
        options: ["am", "um", "von ... bis"],
        answer: "am",
        explanation: "Bagian hari Abend memakai am Abend. Bentuk alternatifnya: abends."
      }
    ]
  },
  possessiv: {
    title: "Latihan Topik 2: isi possessivartikel yang tepat",
    hint: "Ketik jawabannya, lalu klik Cek. Perhatikan genus dan kasus Nominativ/Akkusativ.",
    questions: [
      {
        type: "fill",
        prompt: "Das ist ___ Vater. (ich)",
        answer: "mein",
        explanation: "Vater maskulin dalam Nominativ. Polanya seperti ein Vater: mein Vater."
      },
      {
        type: "fill",
        prompt: "Das ist ___ Mutter. (ich)",
        answer: "meine",
        explanation: "Mutter feminin. Bentuk feminin memakai -e: meine Mutter."
      },
      {
        type: "fill",
        prompt: "Wo ist ___ Kind? (du)",
        answer: "dein",
        explanation: "Kind neutrum. Maskulin/neutrum memakai bentuk dasar: dein Kind."
      },
      {
        type: "fill",
        prompt: "Sind das ___ Eltern? (er)",
        answer: "seine",
        explanation: "Eltern plural. Bentuk plural memakai -e: seine Eltern."
      },
      {
        type: "fill",
        prompt: "Das ist ___ Bruder. (sie = dia perempuan)",
        answer: "ihr",
        explanation: "Untuk sie dia perempuan: ihr Bruder. Bruder maskulin Nominativ, jadi tanpa -e."
      },
      {
        type: "fill",
        prompt: "Das ist ___ Schwester. (wir)",
        answer: "unsere",
        explanation: "Schwester feminin. unser menjadi unsere untuk feminin."
      },
      {
        type: "fill",
        prompt: "Ist das ___ Mutter? (ihr = kalian)",
        answer: "eure",
        explanation: "Untuk ihr: euer/eure. Di depan Mutter feminin, bentuknya eure, bukan euere."
      },
      {
        type: "fill",
        prompt: "Ich sehe ___ Vater. (ich)",
        answer: "meinen",
        explanation: "sehen membuat objek Akkusativ. Vater maskulin, jadi mein berubah menjadi meinen."
      },
      {
        type: "fill",
        prompt: "Ich sehe ___ Mutter. (ich)",
        answer: "meine",
        explanation: "Akkusativ feminin tidak berubah dari Nominativ: meine Mutter."
      },
      {
        type: "fill",
        prompt: "Wir besuchen ___ Eltern. (wir)",
        answer: "unsere",
        explanation: "Eltern plural. Nominativ dan Akkusativ plural untuk possessivartikel tetap unsere."
      },
      {
        type: "fill",
        prompt: "Wo ist ___ Kind? (Sie = Anda)",
        answer: "Ihr",
        caseSensitive: true,
        explanation: "Sie formal memakai Ihr/Ihre dengan huruf besar. Kind neutrum, jadi Ihr Kind."
      },
      {
        type: "fill",
        prompt: "Ich kenne ___ Bruder. (du)",
        answer: "deinen",
        explanation: "kennen memakai objek Akkusativ. Bruder maskulin, jadi dein menjadi deinen."
      }
    ]
  },
  modalverben: {
    title: "Latihan Topik 3: konjugasi modalverben lengkap",
    hint: "Isi bentuk modalverb yang tepat sesuai subjek. Perhatikan ich = er/es/sie, perubahan vokal, dan bentuk sopan möchten.",
    questions: [
      {
        type: "fill",
        prompt: "Ich ___ heute lernen. (müssen)",
        answer: "muss",
        explanation: "Untuk ich, müssen menjadi muss."
      },
      {
        type: "fill",
        prompt: "Er ___ am Samstag arbeiten. (müssen)",
        answer: "muss",
        explanation: "ich dan er/es/sie sama persis: er muss, bukan er musst."
      },
      {
        type: "fill",
        prompt: "Du ___ sehr gut schwimmen. (können)",
        answer: "kannst",
        explanation: "Untuk du, können menjadi kannst."
      },
      {
        type: "fill",
        prompt: "Sie ___ Deutsch sprechen. (sie = mereka, können)",
        answer: "können",
        explanation: "Untuk sie plural, bentuknya sama dengan infinitiv: sie können."
      },
      {
        type: "fill",
        prompt: "Wir ___ Pizza essen. (wollen)",
        answer: "wollen",
        explanation: "Untuk wir, wollen tetap wollen."
      },
      {
        type: "fill",
        prompt: "Ich ___ nach Hause gehen. (wollen)",
        answer: "will",
        explanation: "Untuk ich, wollen menjadi will. Artinya saya mau, bukan saya akan."
      },
      {
        type: "fill",
        prompt: "Ihr ___ jetzt schlafen. (müssen)",
        answer: "müsst",
        explanation: "Untuk ihr, müssen menjadi müsst."
      },
      {
        type: "fill",
        prompt: "Sie ___ bitte hier warten. (Sie = Anda, können)",
        answer: "können",
        explanation: "Untuk Sie formal, bentuknya können, sama seperti infinitiv."
      },
      {
        type: "fill",
        prompt: "Es ___ nicht kommen. (können)",
        answer: "kann",
        explanation: "ich dan er/es/sie sama: es kann."
      },
      {
        type: "fill",
        prompt: "Ihr ___ einen Kaffee trinken. (wollen)",
        answer: "wollt",
        explanation: "Untuk ihr, wollen menjadi wollt."
      },
      {
        type: "fill",
        prompt: "Meine Mutter ___ heute kochen. (müssen)",
        answer: "muss",
        explanation: "Meine Mutter = sie tunggal. Bentuknya muss."
      },
      {
        type: "fill",
        prompt: "Die Kinder ___ im Park spielen. (können)",
        answer: "können",
        explanation: "Die Kinder = sie plural. Bentuknya können."
      },
      {
        type: "fill",
        prompt: "Ich ___ hier sitzen. (dürfen)",
        answer: "darf",
        explanation: "Untuk ich, dürfen menjadi darf."
      },
      {
        type: "fill",
        prompt: "Du ___ jetzt gehen. (dürfen)",
        answer: "darfst",
        explanation: "Untuk du, dürfen menjadi darfst."
      },
      {
        type: "fill",
        prompt: "Wir ___ im Unterricht Deutsch sprechen. (dürfen)",
        answer: "dürfen",
        explanation: "Untuk wir, bentuknya sama dengan infinitiv: dürfen."
      },
      {
        type: "fill",
        prompt: "Er ___ mehr lernen. (sollen)",
        answer: "soll",
        explanation: "Untuk er/es/sie, sollen menjadi soll."
      },
      {
        type: "fill",
        prompt: "Ihr ___ bitte leise sein. (sollen)",
        answer: "sollt",
        explanation: "Untuk ihr, sollen menjadi sollt."
      },
      {
        type: "fill",
        prompt: "Sie ___ den Arzt anrufen. (Sie = Anda, sollen)",
        answer: "sollen",
        explanation: "Untuk Sie formal, bentuknya sollen."
      },
      {
        type: "fill",
        prompt: "Ich ___ Kaffee. (mögen)",
        answer: "mag",
        explanation: "Untuk ich, mögen menjadi mag. mögen sering langsung diikuti kata benda."
      },
      {
        type: "fill",
        prompt: "Du ___ Tee. (mögen)",
        answer: "magst",
        explanation: "Untuk du, mögen menjadi magst."
      },
      {
        type: "fill",
        prompt: "Wir ___ Musik. (mögen)",
        answer: "mögen",
        explanation: "Untuk wir, mögen tetap mögen."
      },
      {
        type: "fill",
        prompt: "Ich ___ einen Kaffee. (möchten)",
        answer: "möchte",
        explanation: "Untuk ich, möchten menjadi möchte. Ini sopan untuk memesan."
      },
      {
        type: "fill",
        prompt: "Du ___ eine Pizza. (möchten)",
        answer: "möchtest",
        explanation: "Untuk du, möchten menjadi möchtest."
      },
      {
        type: "fill",
        prompt: "Wir ___ bitte bezahlen. (möchten)",
        answer: "möchten",
        explanation: "Untuk wir, möchten tetap möchten."
      }
    ]
  },
  satzklammer: {
    title: "Latihan Topik 4: susun kata menjadi kalimat benar",
    hint: "Seret kata ke kotak jawaban, atau klik kata untuk memasukkannya. Ingat: infinitiv pergi ke ujung kalimat.",
    questions: [
      {
        type: "order",
        prompt: "Aussagesatz: kami bisa pergi ke bioskop.",
        words: ["gehen", "ins Kino", "können", "Wir"],
        answer: ["Wir", "können", "ins Kino", "gehen"],
        explanation: "Modalverb können berada di posisi 2, sedangkan infinitiv gehen berada di akhir."
      },
      {
        type: "order",
        prompt: "Aussagesatz dengan negasi: saya tidak bisa datang hari ini.",
        words: ["heute", "kommen", "kann", "nicht", "Ich"],
        answer: ["Ich", "kann", "heute", "nicht", "kommen"],
        explanation: "kann dikonjugasikan, kommen tetap infinitiv di akhir."
      },
      {
        type: "order",
        prompt: "Keterangan waktu di depan: hari ini saya harus belajar bahasa Jerman.",
        words: ["lernen", "Heute", "Deutsch", "muss", "ich"],
        answer: ["Heute", "muss", "ich", "Deutsch", "lernen"],
        explanation: "Heute mengisi posisi 1, jadi muss tetap posisi 2 dan subjek ich pindah setelah modalverb."
      },
      {
        type: "order",
        prompt: "Ja-Nein-Frage: apakah kita mau pergi yoga?",
        words: ["wir", "gehen", "Wollen", "zum Yoga"],
        answer: ["Wollen", "wir", "zum Yoga", "gehen"],
        modalIndex: 0,
        explanation: "Dalam Ja-Nein-Frage, modalverb Wollen berada di posisi 1."
      },
      {
        type: "order",
        prompt: "W-Frage: kapan kamu bisa belajar bahasa Jerman?",
        words: ["du", "lernen", "Deutsch", "kannst", "Wann"],
        answer: ["Wann", "kannst", "du", "Deutsch", "lernen"],
        explanation: "W-Frage di posisi 1, modalverb kannst di posisi 2, infinitiv lernen di akhir."
      },
      {
        type: "order",
        prompt: "Aussagesatz: dia harus bekerja hari ini.",
        words: ["arbeiten", "heute", "muss", "Er"],
        answer: ["Er", "muss", "heute", "arbeiten"],
        explanation: "Er memakai muss, bukan musst. Infinitiv arbeiten diletakkan di akhir."
      },
      {
        type: "order",
        prompt: "Aussagesatz: anak-anak mau bermain di taman.",
        words: ["im Park", "spielen", "wollen", "Die Kinder"],
        answer: ["Die Kinder", "wollen", "im Park", "spielen"],
        explanation: "Subjek plural Die Kinder memakai wollen. Kata kerja kedua spielen tetap infinitiv di akhir."
      },
      {
        type: "order",
        prompt: "W-Frage: apa yang mau kamu lakukan hari ini?",
        words: ["machen", "du", "heute", "willst", "Was"],
        answer: ["Was", "willst", "du", "heute", "machen"],
        explanation: "Was di posisi 1, willst di posisi 2, dan infinitiv machen di akhir."
      }
    ]
  }
};

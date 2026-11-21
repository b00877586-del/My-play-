// =================================
// بيانات القضايا الثلاث
// =================================

const cases = [

    {
        title: "القضية الأولى: جريمة المدرسة",

        question:
`💡 حدثت جريمة قتل في مدرسة في أول يوم دراسة في السنة.

المحقق سأل ثلاثة مدرسين كانوا في المدرسة وقتها:

🔹 مدرس الرياضة: كنت أدرب الطلاب في الملعب.

🔹 مدرس العلوم: كنت أحضر أدوات المعمل.

🔹 مدرس التاريخ: كنت أصحح امتحانات نصف العام.

المحقق قبض على القاتل فورًا!

من القاتل؟`,

        options: [
            "مدرس الرياضة",
            "مدرس العلوم",
            "مدرس التاريخ"
        ],

        answer: 2
    },


    {
        title: "القضية الثانية: جريمة الشركة",

        question:
`💡 يوم الجمعة صباحًا، وهو يوم إجازة رسمية، قُتل مدير شركة كبيرة داخل مكتبه.

المحقق سأل ثلاثة موظفين كانوا في المبنى:

🔹 عامل النظافة: كنت أمسح الأرضيات قبل أن يأتي الموظفون.

🔹 الحارس: كنت أقف عند البوابة الرئيسية.

🔹 السكرتيرة: كنت أوزع البريد والأوراق الجديدة على مكاتب الموظفين.

المحقق عرف الكاذب فورًا!

من المشتبه به؟`,

        options: [
            "عامل النظافة",
            "الحارس",
            "السكرتيرة"
        ],

        answer: 2
    },


    {
        title: "القضية الثالثة: جريمة المطعم",

        question:
`💡 قُتل شيف مشهور في مطبخه الساعة العاشرة مساءً.

المحقق استجوب ثلاثة من طاقم المطعم:

🔹 الجرسون: كنت أقدم الطعام للزبائن في الصالة.

🔹 الكاشير: كنت أعد الأموال في الخزنة.

🔹 مساعد الشيف: كنت أجهز عجينة الفطور للغد.

تلميح: المطعم مغلق يوم الأحد، واليوم هو السبت ليلًا.

المحقق عرف القاتل فورًا!

من القاتل؟`,

        options: [
            "الجرسون",
            "الكاشير",
            "مساعد الشيف"
        ],

        answer: 2
    }

];


// =================================
// متغيرات اللعبة
// =================================

let currentCase = 0;
let gameOver = false;


// =================================
// التنقل بين الشاشات
// =================================

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.classList.remove("active");

    });

    document.getElementById(screenId).classList.add("active");

}


// =================================
// بدء اللعبة
// =================================

function startGame() {

    currentCase = 0;
    gameOver = false;

    showScreen("gameScreen");

    showCase();

}


// =================================
// عرض القضية
// =================================

function showCase() {

    const current = cases[currentCase];

    document.getElementById("questionTitle").textContent =
        current.title;

    document.getElementById("questionText").textContent =
        current.question;

    document.getElementById("progress").textContent =
        `القضية ${currentCase + 1} من ${cases.length}`;

    document.getElementById("feedback").textContent = "";

    document.getElementById("feedback").className = "";

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";

    current.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option";

        button.textContent = option;

        button.addEventListener("click", function () {

            checkAnswer(index, button);

        });

        optionsContainer.appendChild(button);

    });

}


// =================================
// التحقق من الإجابة
// =================================

function checkAnswer(selected, button) {

    if (gameOver) return;

    const current = cases[currentCase];

    const feedback = document.getElementById("feedback");

    const allButtons =
        document.querySelectorAll(".option");


    // الإجابة الصحيحة

    if (selected === current.answer) {

        allButtons.forEach(btn => {

            btn.disabled = true;

        });

        button.style.background = "#176b45";

        button.style.borderColor = "#75e6a1";

        feedback.className = "correct";

        feedback.textContent =
            "🎉👏 أحسنت أيها المحقق! إجابة صحيحة!";

        // الانتقال للقضية التالية

        setTimeout(() => {

            currentCase++;

            if (currentCase < cases.length) {

                showCase();

            } else {

                winGame();

            }

        }, 1800);

    }

    // الإجابة الخاطئة

    else {

        gameOver = true;

        allButtons.forEach(btn => {

            btn.disabled = true;

        });

        button.style.background = "#762b32";

        button.style.borderColor = "#ff7777";

        feedback.className = "wrong";

        feedback.textContent =
            "❌ للأسف! إجابة خاطئة... خسرت شارة المحققين!";

        setTimeout(() => {

            showScreen("loseScreen");

        }, 2200);

    }

}


// =================================
// الفوز
// =================================

function winGame() {

    gameOver = true;

    showScreen("winScreen");

}


// =================================
// إعادة اللعب
// =================================

function restartGame() {

    currentCase = 0;

    gameOver = false;

    showScreen("welcome");

        }

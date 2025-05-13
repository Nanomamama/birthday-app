
document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("nameInput");
    const btn = document.getElementById("generateMessage");
    const messageDisplay = document.getElementById("birthdayMessage");
    let emojiInterval = null;

    btn.addEventListener("click", function() {
        const name = nameInput.value.trim();
        if (name) {
            const birthdayMessage = `🎁 สุขสันต์วันเกิดนะ ${name} ขอให้ปีนี้เป็นปีที่พิเศษที่สุดนะ เพราะมีคนแอบชอบอย่างเราอยู่ข้างๆเสมอ 💖 ขอให้รอยยิ้มของเจ้าหมูสดใสเหมือนทุกวัน และถ้าวันไหนเหงา...อย่าลืมว่ามีเราแอบห่วงอยู่ตรงนี้นะ 😊`;
            messageDisplay.textContent = birthdayMessage;
            if (!emojiInterval) {
                emojiInterval = setInterval(launchEmojis, 400);
            }
            showHeartLine();

            // หลังจากกดปุ่มไป 5 วิ ให้ขึ้นเค้กอีกก้อน (แสดงค้าง)
            setTimeout(() => {
                launchFinalCake();
                if (emojiInterval) {
                    clearInterval(emojiInterval);
                    emojiInterval = null;
                }
            }, 5000);
        } else {
            messageDisplay.textContent = "กรุณาใส่ชื่อของคุณ!";
        }
    });

    function launchEmojis() {
        const emojis = ['💖', '🎁', '🎂'];
        for (let i = 0; i < 3; i++) {
            const emoji = document.createElement('span');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.className = 'floating-emoji';
            emoji.style.left = Math.random() * 90 + '%';
            emoji.style.animationDelay = (Math.random() * 0.5) + 's';
            document.body.appendChild(emoji);

            setTimeout(() => {
                emoji.remove();
            }, 3000);
        }
    }

    function launchBigCake() {
        const cake = document.createElement('span');
        cake.textContent = '🎂';
        cake.style.position = 'fixed';
        cake.style.left = '50%';
        cake.style.bottom = '-100px';
        cake.style.fontSize = '6rem';
        cake.style.transform = 'translateX(-50%)';
        cake.style.zIndex = 9999;
        cake.style.transition = 'bottom 1.2s cubic-bezier(.77,0,.18,1), opacity 0.8s';
        document.body.appendChild(cake);

        setTimeout(() => {
            cake.style.bottom = '60%';
        }, 50);

        setTimeout(() => {
            cake.style.opacity = '0';
        }, 1800);

        setTimeout(() => {
            cake.remove();
        }, 2600);
    }

function launchFinalCake() {
    // ลบเค้กสุดท้ายเดิมถ้ามี
    const oldCake = document.getElementById('final-cake');
    if (oldCake) oldCake.remove();

    const cake = document.createElement('span');
    cake.textContent = '🎂';
    cake.id = 'final-cake';
    cake.style.position = 'fixed';
    cake.style.left = '50%';
    cake.style.bottom = '-100px'; // เริ่มล่างสุด
    cake.style.fontSize = '8rem';
    cake.style.transform = 'translateX(-50%)';
    cake.style.zIndex = 9999;
    cake.style.opacity = '0';
    cake.style.transition = 'bottom 1.2s cubic-bezier(.77,0,.18,1), opacity 1.2s';
    document.body.appendChild(cake);

    setTimeout(() => {
        cake.style.bottom = '60%';
        cake.style.opacity = '1';
    }, 50);
}

    function showHeartLine() {
        const old = document.getElementById('heart-svg');
        if (old) old.remove();

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("id", "heart-svg");
        svg.setAttribute("width", "180");
        svg.setAttribute("height", "160");
        svg.setAttribute("viewBox", "0 0 180 160");
        svg.style.position = "absolute";
        svg.style.left = "50%";
        svg.style.top = "50%";
        svg.style.transform = "translate(-50%, -55%)";
        svg.style.zIndex = "10";
        svg.style.pointerEvents = "none";

        const gradientId = "heart-rgb-gradient";
        const defs = document.createElementNS(svgNS, "defs");
        const linearGradient = document.createElementNS(svgNS, "linearGradient");
        linearGradient.setAttribute("id", gradientId);
        linearGradient.setAttribute("x1", "0%");
        linearGradient.setAttribute("y1", "0%");
        linearGradient.setAttribute("x2", "100%");
        linearGradient.setAttribute("y2", "0%");

        // สร้าง stop หลายสี
        const stops = [
            { offset: "0%", color: "#ff69b4" },
            { offset: "33%", color: "#ffb6e6" },
            { offset: "66%", color: "#ff69b4" },
            { offset: "100%", color: "#ffb6e6" }
        ];
        stops.forEach(stopInfo => {
            const stop = document.createElementNS(svgNS, "stop");
            stop.setAttribute("offset", stopInfo.offset);
            stop.setAttribute("stop-color", stopInfo.color);
            linearGradient.appendChild(stop);
        });
        defs.appendChild(linearGradient);
        svg.appendChild(defs);

        // เส้นคลื่น (ต้องมีจำนวนจุดเท่ากับหัวใจ)
        const wavePathD = "M10 80 Q 45 40, 90 80 Q 135 120, 170 80";
        // เส้นหัวใจ (จำนวนจุดควรเท่ากันเพื่อ morph สวย)
        const heartPathD = "M90 120 C 10 60, 40 10, 90 40 C 140 10, 170 60, 90 120";

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", wavePathD);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", `url(#${gradientId})`);
        path.setAttribute("stroke-width", "5");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");

        // วาดเส้นคลื่นแบบ dash
        const length = 400;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = "stroke-dashoffset 1s cubic-bezier(.77,0,.18,1)";

        svg.appendChild(path);
        document.querySelector(".container").appendChild(svg);

        // วาดเส้นคลื่น
        setTimeout(() => {
            path.style.strokeDashoffset = 0;
        }, 100);

        // Morph เป็นหัวใจ
        setTimeout(() => {
            path.style.transition = "d 1.2s cubic-bezier(.77,0,.18,1)";
            path.setAttribute("d", heartPathD);
        }, 1200);

        let rgbColors = ["#FF0099", "#ffb6e6", "#FF0099", "#ffb6e6"];
        let rgbIndex = 0;
        setInterval(() => {
            const stops = linearGradient.querySelectorAll("stop");
            rgbColors = rgbColors.slice(1).concat(rgbColors[0]); // วนสี
            stops.forEach((stop, i) => {
                stop.setAttribute("stop-color", rgbColors[i % rgbColors.length]);
            });
        }, 400);
    }
});
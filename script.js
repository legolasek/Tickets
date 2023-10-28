
// Coded with ❤ by PSteczka

const qrCodeContainer = document.getElementById("qrCode");
let qrCode = null;

function generateQRCode() {
    if (!qrCode) {
        qrCode = new QRCode(qrCodeContainer, {
            text: "", // Początkowo pusty
            width: 256,
            height: 256,
        });
    }
	
	// Wygenerowane dane na podstawie informacji biletu
    const ticketData = {
        cid: 2,
        pid: 550,
        tid: 36638712,
        sig: "d1a2612de3f130792a073bfe1cdeb1df280653b8d3ff53689ddbc789b0db39db",
    };

    const qrCodeData = JSON.stringify(ticketData);
    qrCode.makeCode(qrCodeData);
}

// Funkcja do generowania daty ważności i innych informacji
function generateData() {
    const now = new Date();
    const expirationTime = new Date(now.getTime() + 40 * 60 * 1000); // Dodaj 40 minut
    const current = Math.floor(Math.random() * 10000000); // Wygenerowany numer bieżący
    const control = Math.floor(Math.random() * 100000); // Wygenerowany numer kontrolny

    // Formatuj datę ważności i czas zakupu
    const formattedExpiration = `${("0" + expirationTime.getDate()).slice(-2)}.${("0" + (expirationTime.getMonth() + 1)).slice(-2)}.${expirationTime.getFullYear()}r. ${("0" + expirationTime.getHours()).slice(-2)}:${("0" + expirationTime.getMinutes()).slice(-2)}`;
    const formattedPurchaseTime = `${("0" + now.getDate()).slice(-2)}.${("0" + (now.getMonth() + 1)).slice(-2)}.${now.getFullYear()}r. ${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)}:${("0" + now.getSeconds()).slice(-2)}`;

    document.getElementById("validUntil").textContent = formattedExpiration;
    document.getElementById("currentNumber").textContent = current;
    document.getElementById("controlNumber").textContent = control;
    document.getElementById("purchaseTime").textContent = formattedPurchaseTime;
}

// Nasłuchuj zmian w polu tekstowym
const vehicleNumberInput = document.getElementById("vehicleNumber");
vehicleNumberInput.addEventListener("input", () => {
    generateData();
    generateQRCode();
});

// Wywołaj funkcję generującą dane i kod QR przy ładowaniu strony
generateData();
generateQRCode();

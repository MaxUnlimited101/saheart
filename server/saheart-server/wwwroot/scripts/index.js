const serverUrl = window.location.origin;
//
// document.getElementById("languageSelect").addEventListener("change", checkSelections);
// document.getElementById("signSelect").addEventListener("change", checkSelections);
//
// async function onGetHoroscopeButtonClickAsync() {
//     console.log("Fetching horoscope...");
//
//     const today = new Date();
//     const currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'); // Get current date in YYYY-MM-DD format
//
//     const lang = document.getElementById("languageSelect").value;
//     const sign = document.getElementById("signSelect").value;
//
//     try {
//         const response = await fetch(`${serverUrl}/${lang}/${sign}?date=${currentDate}`);
//         const data = await response.json();
//
//         if (response.ok) {
//             setHoroscope(data.text);
//             setBackgroundImageUrl(data.pathToImage);
//         } else {
//             setHoroscope("Failed to fetch horoscope");
//         }
//     } catch (err) {
//         setHoroscope("Failed to fetch horoscope (error fetching)");
//     }
// }
//
function setHoroscope(text) {
    const horoscopeText = document.getElementById("horoscopeText");
    horoscopeText.innerHTML = text;
}

function setBackgroundImageUrl(path) {
    const backgroundImageDiv = document.getElementById("backgroundImageDiv");
    backgroundImageDiv.style.backgroundImage = `url(${serverUrl}/${path})`;
}

const languageSelect = document.getElementById('languageSelect');
const signSelect = document.getElementById('signSelect');
const fetchPredictionButton = document.getElementById('fetchPredictionButton');
const fetchAiPredictionButton = document.getElementById('fetchAiPredictionButton');
const horoscopeText = document.getElementById('horoscopeText');

fetchPredictionButton.addEventListener('click', async function () {
    await fetchPrediction();
});

fetchAiPredictionButton.addEventListener('click', async function () {
    await fetchAiPrediction();
});

async function fetchPrediction() {
    console.log("Fetching horoscope...");

    const today = new Date();
    const currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'); // Get current date in YYYY-MM-DD format

    const lang = document.getElementById("languageSelect").value;
    const sign = document.getElementById("signSelect").value;

    try {
        const response = await fetch(`${serverUrl}/${lang}/${sign}?date=${currentDate}`);
        const data = await response.json();

        if (response.ok) {
            setHoroscope(data.text);
            setBackgroundImageUrl(data.pathToImage);
        } else {
            setHoroscope("Failed to fetch horoscope");
        }
    } catch (err) {
        setHoroscope("Failed to fetch horoscope (error fetching)");
    }
}

async function fetchAiPrediction() {
    console.log("Fetching ai horoscope...");

    const today = new Date();
    const currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'); // Get current date in YYYY-MM-DD format

    const lang = document.getElementById("languageSelect").value;
    const sign = document.getElementById("signSelect").value;

    try {
        const response = await fetch(`${serverUrl}/ai_pred?date=${currentDate}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    language: lang,
                    sign: sign,
                })
            });
        const data = await response.json();

        if (response.ok) {
            setHoroscope("[AI]" + data.text);
            setBackgroundImageUrl(data.pathToImage);
        } else {
            setHoroscope("Failed to fetch horoscope");
        }
    } catch (err) {
        setHoroscope("Failed to fetch horoscope (error fetching)");
    }
}

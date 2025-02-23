document.addEventListener("DOMContentLoaded", () => {
  console.log("^-^");

  const popup = document.createElement("div");
  popup.className = "errorpopup";
  popup.innerHTML = `
    <h2>Oh, this is a very unusual error.</h2>
    <button onclick="jumpscare()">Contact Support</button>
  `;

  const style = document.createElement("style");
  style.textContent = `
    .errorpopup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 20px;
      text-align: center;
      z-index: 10000;
      width: 300px;
    }
    .errorpopup h2 {
      color: #cf222e;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .errorpopup button {
      background: #2ea44f;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    }
    .errorpopup button:hover {
      background: #22863a;
    }
  `;
  
  setTimeout(() => {
    document.head.appendChild(style);
    document.body.appendChild(popup);
  }, 1000)
});

function jumpscare() {
  document.body.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
  body {
    margin: 0;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  #scare {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;
  document.head.appendChild(style);

  const media = document.createElement("img");
  media.src = "data/jumpscare.png";
  media.id = "scare";
  document.body.appendChild(media);

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0;
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    const audio = new Audio("data/jumpscare.mp3");
    audio.play().catch((err) => {
      console.error("Failed to play sound:", err);
    });
  }, 100);
};

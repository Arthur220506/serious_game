const levels = [
    {
        explanation: `
            <p>A Cifra de César é um método de criptografia simples onde cada letra do texto original é substituída por outra, deslocada um número fixo de posições no alfabeto.</p>
            <p><strong>Exemplo:</strong> Com deslocamento de 3, a letra "A" vira "D", "B" vira "E", e assim por diante. Para decifrar, basta deslocar na direção oposta.</p>
            <img src="/image/cifra-de-cesar.png" alt="Exemplo de Cifra de César">
        `,
        story: "O primeiro obstáculo é uma mensagem codificada com a Cifra de César. Desvende-a para destrancar a porta.",
        encrypted: "GRQHWUD",
        answer: "DONETRA",
        hint: "Ex: Letra G no alfabeto, use a Cifra de César com um deslocamento de 3 para trás.", 
        hintImage: "/image/explicacao1.jpg"
    },
    {
        explanation: `
            <p>A Cifra de Substituição consiste em substituir cada letra do alfabeto por outra com base em um padrão ou chave específica.</p>
            <p><strong>Exemplo:</strong> Se a chave diz que "A" vira "M" e "B" vira "N", a palavra "AB" será criptografada como "MN".</p>
            <img src="/image/ROT13.png" alt="Exemplo de Cifra de Substituição" style="margin-left: 25%;">
        `,
        story: "A segunda porta utiliza uma cifra de substituição. As letras foram embaralhadas, mas o padrão é claro.",
        encrypted: "MPSCTP",
        answer: "ARTHUR",
        hint: "Observe que cada letra foi trocada por outra de um alfabeto embaralhado.",
        hintImage: "/image/dica2.png"
    },
    {
        explanation: `
            <p>Na Criptografia de Inversão, o texto é simplesmente invertido. Para decifrar, leia as letras na ordem contrária.</p>
            <p><strong>Exemplo:</strong> A palavra "Segurança" será criptografada como "AÇNARUGES".</p>
            <img src="/image/dica3.png" alt="Exemplo de texto invertido">
        `,
        story: "A última barreira usa uma mensagem invertida. Apenas quem conhece os segredos pode passar.",
        encrypted: "EDADIRANILPICSIDSNART",
        answer: "TRANSDISCIPLINARIDADE",
        hint: "Leia a mensagem de trás para frente.",
        hintImage: "/image/dica3.png"
    }
];
let currentLevel = 0;
let attempts = 0;

const correctSound = new Audio("/sound/Correct.mp3");
const errorSound = new Audio("/sound/Error.mp3");

function loadExplanation() {
    attempts = 0; // Reseta as tentativas ao carregar uma nova explicação
    document.getElementById("explanationSection").style.display = "block";
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("explanation").innerHTML = levels[currentLevel].explanation;
}

function startLevel() {
    document.getElementById("explanationSection").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
    loadLevel();
}

function loadLevel() {
    const level = levels[currentLevel];
    document.getElementById("encryptedMessage").innerHTML = 
        `Fase ${currentLevel + 1}: ${level.story}<br>Mensagem criptografada: <strong>${level.encrypted}</strong>`;
    document.getElementById("result").textContent = "";
    document.getElementById("nextLevelControl").style.display = "none";
    document.getElementById("hintSection").style.display = "none";
}

function showHint() {
    const level = levels[currentLevel];
    document.getElementById("hint").textContent = level.hint;
    document.getElementById("hintImage").src = level.hintImage;
    document.getElementById("hintSection").style.display = "block";
}

function checkAnswer() {
    const userInput = document.getElementById("userInput").value.toUpperCase();
    const resultElement = document.getElementById("result");

    if (userInput === levels[currentLevel].answer) {
        correctSound.play();
        resultElement.textContent = "Correto! A porta foi destrancada.";
        resultElement.style.color = "green";
        document.getElementById("nextLevelControl").style.display = "block";
        attempts = 0; 
    } else {
        errorSound.play(); 
        attempts++;
        if (attempts >= 3) {
            resultElement.textContent = "Você falhou 3 vezes! O alarme soou e a policia chegou";
            resultElement.style.color = "red";
            setTimeout(() => {
                currentLevel = 0;
                loadExplanation();
            }, 5000); 
        } else {
            resultElement.textContent = `Resposta incorreta. Você tem ${3 - attempts} tentativas restantes.`;
            resultElement.style.color = "red";
        }
    }
}
function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        loadExplanation();
    } else {
        document.getElementById("encryptedMessage").textContent = 
            "Parabéns! Você conseguiu destrancar todas as portas do cofre!";
        document.getElementById("result").textContent = "";
        document.getElementById("nextLevelControl").style.display = "none";
        setTimeout(() => {
            window.location.href = "/paginas/historia-part4.html";
        }, 2000); 
    }
}
loadExplanation();
 
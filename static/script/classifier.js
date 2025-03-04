function stars(count = 500) {
    const scene = document.querySelector(".scene");

    Array.from({ length: count }).forEach(() => {
        const star = document.createElement("i");
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = `${1 + Math.random() * 2}px`;
        star.style.animationDuration = `${5 + Math.random() * 10}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        scene.appendChild(star);
    });
}

stars();

const fileInput = document.getElementById("image_file");

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; //imagem selecionada
    if (!file) return; // Se nenhum arquivo for selecionado, sai

    const reader = new FileReader();

    reader.onload = () => {
        const base64String = reader.result.split(",")[1]; //imagem em base64
        console.log(base64String)    
        fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64String }), // Envia a imagem em base64
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro ao fazer a solicitação. ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            document.getElementById("result").innerHTML =
                `<div class="preformatted-text"><p>O resultado da predição é: ${data.predict}</p></div>`;
            console.log(data.predict);
        })
        .catch((error) => {
            console.error("Erro:", error);
            document.getElementById("result").innerText = `Erro: ${error.message}`;
        });
    };

    reader.readAsDataURL(file); 
});

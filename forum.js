import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    increment
}
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyASgoTtFKGHAOf9jMRgDk9w0jYvXeslEnw",

    authDomain: "forum-domoustache.firebaseapp.com",

    projectId: "forum-domoustache",

    storageBucket: "forum-domoustache.firebasestorage.app",

    messagingSenderId: "609863036952",

    appId: "1:609863036952:web:0bd971da4f4db16bf7d36d",

    measurementId: "G-ESREQB30TB"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const publicar =
document.getElementById("publicar");

publicar.addEventListener("click", async () => {

    const nome =
    document.getElementById("nome").value;

    const comentario =
    document.getElementById("comentario").value;

    const nota =
    parseInt(
        document.getElementById("nota").value
    );

    if(!nome || !comentario){

        alert(
            "Preencha todos os campos."
        );

        return;
    }

    await addDoc(
        collection(db, "avaliacoes"),
        {
            nome,
            comentario,
            nota,
            likes: 0
        }
    );

    location.reload();

});

async function carregarAvaliacoes(){

    const lista =
    document.getElementById(
        "lista-avaliacoes"
    );

    lista.innerHTML = "";

    const docs =
    await getDocs(
        collection(db, "avaliacoes")
    );

    docs.forEach((documento) => {

    const dados = documento.data();

    lista.innerHTML += `

        <div class="avaliacao">

            <h3>${dados.nome}</h3>

            <p>${"⭐".repeat(dados.nota)}</p>

            <p>${dados.comentario}</p>

            <button
                class="likes-btn"
                data-id="${documento.id}"
            >
                👍 ${dados.likes}
            </button>

        </div>

    `;
});

    const botoesLikes =
document.querySelectorAll(".likes-btn");

botoesLikes.forEach((botao) => {

    botao.addEventListener(
        "click",
        async () => {

            const id =
            botao.dataset.id;

            const referencia =
            doc(
                db,
                "avaliacoes",
                id
            );

            await updateDoc(
                referencia,
                {
                    likes: increment(1)
                }
            );

            carregarAvaliacoes();

        }
    );

});

        const dados =
        doc.data();

        lista.innerHTML += `

            <div class="avaliacao">

                <h3>
                    ${dados.nome}
                </h3>

                <p>
                    ${"⭐".repeat(dados.nota)}
                </p>

                <p>
                    ${dados.comentario}
                </p>

                <button class="likes-btn">

                    👍 ${dados.likes}

                </button>

            </div>

        `;

    });

}

carregarAvaliacoes();

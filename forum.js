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

    const arquivo =
    document.getElementById("foto")?.files[0];

    let fotoURL = "";

    if (!nome || !comentario) {

        alert(
            "Preencha todos os campos."
        );

        return;
    }

    try {

        if (arquivo) {

            const formData =
            new FormData();

            formData.append(
                "file",
                arquivo
            );

            formData.append(
                "upload_preset",
                "Dom Moustache"
            );

            const resposta =
            await fetch(
                "https://api.cloudinary.com/v1_1/duo7iqlb0/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const dadosUpload =
            await resposta.json();

            fotoURL =
            dadosUpload.secure_url;
        }

        await addDoc(
            collection(
                db,
                "avaliacoes"
            ),
            {
                nome,
                comentario,
                nota,
                likes: 0,
                fotoURL,
                resposta: ""
            }
        );

        document.getElementById("nome").value = "";
        document.getElementById("comentario").value = "";

        if(
            document.getElementById("foto")
        ){
            document.getElementById("foto").value = "";
        }

        carregarAvaliacoes();

    }
    catch(error){

        console.error(error);

        alert(
            "Erro ao publicar avaliação."
        );
    }

});

async function carregarAvaliacoes() {

    const lista =
    document.getElementById(
        "lista-avaliacoes"
    );

    if(!lista) return;

    lista.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(
            db,
            "avaliacoes"
        )
    );

    snapshot.forEach(
        (documento) => {

            const dados =
            documento.data();

            lista.innerHTML += `

            <div class="avaliacao">

                ${
                    dados.fotoURL
                    ?
                    `<img
                        src="${dados.fotoURL}"
                        class="foto-avaliacao"
                    >`
                    :
                    ""
                }

                <h3>${dados.nome}</h3>

                <p>${"⭐".repeat(dados.nota)}</p>

                <p>${dados.comentario}</p>
                
                ${
    dados.resposta
    ?
    `
    <div class="resposta-barbearia">
        <strong>Resposta da Dom Moustache:</strong>
        <p>${dados.resposta}</p>
    </div>
    `
    :
    ""
}

                <button
                    class="likes-btn"
                    data-id="${documento.id}"
                >
                    👍 ${dados.likes}
                </button>
                
                <button
    class="responder-btn"
    data-id="${documento.id}"
    >
        Responder
    </button>

            </div>

            `;

        }
    );

    const botoesLikes =
    document.querySelectorAll(
        ".likes-btn"
    );

    botoesLikes.forEach(
        (botao) => {

            botao.addEventListener(
                "click",
                async () => {

                    const id =
                    botao.dataset.id;

                    const chaveCurtida =
                    `curtiu_${id}`;

                    if(
                        localStorage.getItem(
                            chaveCurtida
                        )
                    ){

                        alert(
                            "Você já curtiu esta avaliação."
                        );

                        return;
                    }

                    const referencia =
                    doc(
                        db,
                        "avaliacoes",
                        id
                    );

                    await updateDoc(
                        referencia,
                        {
                            likes:
                            increment(1)
                        }
                    );

                    localStorage.setItem(
                        chaveCurtida,
                        "true"
                    );

                    carregarAvaliacoes();

                }
            );

        }
    );

}

document.addEventListener("click", async (e) => {

    if(
        e.target.classList.contains(
            "responder-btn"
        )
    ){

        const resposta =
        prompt(
            "Digite a resposta da Dom Moustache:"
        );

        if(!resposta) return;

        const id =
        e.target.dataset.id;

        await updateDoc(
            doc(
                db,
                "avaliacoes",
                id
            ),
            {
                resposta
            }
        );

        carregarAvaliacoes();

    }

});

carregarAvaliacoes();
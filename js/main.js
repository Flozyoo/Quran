import { db, appId, collection, onSnapshot, initAuth, addDoc, serverTimestamp } from './firebase.js';

async function start() {
    await initAuth();
    
    const articlesRef = collection(db, 'artifacts', appId, 'public', 'data', 'articles');
    onSnapshot(articlesRef, (snapshot) => {
        const articles = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        const sorted = [...articles].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        const trending = [...articles].sort((a, b) => (b.votes || 0) - (a.votes || 0)).slice(0, 5);
        renderFeed(sorted);
        renderTrending(trending);
    });

    setupNewsletter();
}

function setupNewsletter() {
    const form = document.getElementById('subscribe-form');
    if (!form) return;
    emailjs.init("3lx-5sxYDtiIgT-1-");

    form.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('sub-email').value;
        try {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'subscriptions'), {
                email, subscribedAt: serverTimestamp()
            });
            await emailjs.send("service_bhwlvch", "template_5k28zie", { to_email: email });
            alert("Bienvenue chez Yahya Service !");
            form.reset();
        } catch (err) { alert("Erreur."); }
    };
}

function renderFeed(articles) {
    const feed = document.getElementById('news-feed');
    feed.innerHTML = articles.map(art => `
        <article class="card">
            <img src="${art.image}" class="card-img">
            <div class="card-body">
                <h3 class="card-title">${art.title}</h3>
                <p class="card-text">${art.content.substring(0, 100)}...</p>
                <a href="article.html?id=${art.id}" class="btn btn-outline">Lire</a>
            </div>
        </article>`).join('');
}

function renderTrending(articles) {
    const list = document.getElementById('trending-list');
    list.innerHTML = articles.map((art, i) => `
        <div onclick="location.href='article.html?id=${art.id}'" style="cursor:pointer; display:flex; gap:10px;">
            <span style="font-size:1.5rem; color:#eee;">0${i+1}</span>
            <div><h4 style="font-size:0.9rem;">${art.title}</h4></div>
        </div>`).join('');
}

start();

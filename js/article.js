import { db, appId, doc, getDoc, collection, getDocs, initAuth, updateDoc, increment } from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

async function load() {
    await initAuth();
    if (!articleId) return;

    const snap = await getDoc(doc(db, 'artifacts', appId, 'public', 'data', 'articles', articleId));
    if (snap.exists()) {
        const data = snap.data();
        document.getElementById('article-content').innerHTML = `
            <h1>${data.title}</h1>
            <img src="${data.image}" style="width:100%; border-radius:12px; margin: 2rem 0;">
            <button id="v-btn" class="btn btn-primary">Voter (${data.votes || 0})</button>
            <div style="margin-top:2rem;">${data.content}</div>`;
        
        document.getElementById('v-btn').onclick = async () => {
            await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'articles', articleId), { votes: increment(1) });
            location.reload();
        };
    }
}
load();

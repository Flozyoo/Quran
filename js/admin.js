import { auth, db, appId, collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, signInWithEmailAndPassword, signOut, onAuthStateChanged, serverTimestamp } from './firebase.js';

onAuthStateChanged(auth, (user) => {
    const isLogged = user && !user.isAnonymous;
    document.getElementById('auth-section').style.display = isLogged ? 'none' : 'block';
    document.getElementById('dashboard-section').style.display = isLogged ? 'block' : 'none';
    document.getElementById('logout-btn').style.display = isLogged ? 'block' : 'none';
    if (isLogged) loadList();
});

document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, document.getElementById('admin-email').value, document.getElementById('admin-password').value);
};

document.getElementById('logout-btn').onclick = () => signOut(auth);

document.getElementById('article-form').onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('art-title').value,
        image: document.getElementById('art-image').value,
        tags: document.getElementById('art-tags').value.split(','),
        content: document.getElementById('art-content').value,
        createdAt: serverTimestamp()
    };
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'articles'), { ...data, votes: 0 });
    alert("Enregistré !");
    e.target.reset();
};

function loadList() {
    onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'articles'), (snap) => {
        document.getElementById('admin-article-list').innerHTML = snap.docs.map(d => `
            <div style="padding:10px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between;">
                <span>${d.data().title}</span>
                <button onclick="window.del('${d.id}')" style="color:red;">Supprimer</button>
            </div>`).join('');
    });
}

window.del = async (id) => { if(confirm("Supprimer?")) await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'articles', id)); };

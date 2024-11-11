import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyBoQovSZfN-IWxwE6SNigeVFl7EyoGo6I8",
  authDomain: "insan-cemerlang-bf3bc.firebaseapp.com",
  projectId: "insan-cemerlang-bf3bc",
  storageBucket: "insan-cemerlang-bf3bc.appspot.com",
  messagingSenderId: "97027282334",
  appId: "1:97027282334:web:f8b63d43a947098d3df28f",
  measurementId: "G-TJFSY9D8R1"
};

// inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)


export async function tambahBarang(item, harga, jumlah) {
  try {
    // menyimpan data ke firebase
    const refDoKumen = await addDoc(collection(basisdata, "Inventory"), {
      item: item,
      harga: harga,
      jumlah: jumlah,
    })

    //menampilkan pesan berhasil 
    console.log("berhasil menyimpan data Buah")
  } catch (error) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data Buah")

  }
}

export async function ambilDaftarBarang() {
  const refDoKumen = collection(basisdata, "Inventory");
  const kueri = query(refDoKumen, orderBy("item"));
  const cuplikankueri = await getDocs(kueri);

  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      jumlah: dokumen.data().jumlah,
      harga: dokumen.data().harga,

    })
  })

  return hasilkueri;
}

export async function hapusBarang(id) {
  await deleteDoc(doc(basisdata, "barang", id))
}

export async function ubahBarang(id, item, harga,jumlah) {
  await updateDoc(
    doc(basisdata, "inventory", id),
    { item: itembaru, harga: hargabaru, jumlah: jumlahbaru }
    )
  
}

export async function ambilBarang(id) {
  const refDokumen = await doc(basisdata, "inventory",  id )
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}

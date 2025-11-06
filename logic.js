import { db, collection, addDoc, getDocs, deleteDoc, doc } from "./firebase-config.js";

const form = document.getElementById("nilaiForm");
const tabelBody = document.querySelector("#tabelNilai tbody");
const tabelSection = document.querySelector(".tabel-section");

// Tambahkan tombol "Hapus Semua Data" di bawah tabel
const btnHapusSemua = document.createElement("button");
btnHapusSemua.textContent = "🧹 Hapus Semua Data";
btnHapusSemua.id = "btnHapusSemua";
btnHapusSemua.style.marginTop = "15px";
btnHapusSemua.style.backgroundColor = "#e67e22";
btnHapusSemua.style.color = "white";
btnHapusSemua.style.border = "none";
btnHapusSemua.style.padding = "8px 16px";
btnHapusSemua.style.borderRadius = "6px";
btnHapusSemua.style.cursor = "pointer";
btnHapusSemua.style.fontWeight = "bold";
btnHapusSemua.style.transition = "0.2s";
btnHapusSemua.addEventListener("mouseover", () => {
  btnHapusSemua.style.backgroundColor = "#d35400";
});
btnHapusSemua.addEventListener("mouseout", () => {
  btnHapusSemua.style.backgroundColor = "#e67e22";
});
tabelSection.appendChild(btnHapusSemua);

// Event submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validasiInput()) return;

  const data = {
    nim: form.nim.value.trim(),
    nama: form.nama.value.trim(),
    matkul: form.matkul.value.trim(),
    nilai: parseInt(form.nilai.value.trim())
  };

  try {
    await addDoc(collection(db, "nilaiMahasiswa"), data);
    alert("✅ Data berhasil disimpan!");
    form.reset();
    loadData();
  } catch (error) {
    console.error("❌ Gagal menyimpan data:", error);
    alert("Terjadi kesalahan saat menyimpan data.");
  }
});

// Fungsi validasi input
function validasiInput() {
  const { nim, nama, matkul, nilai } = form;
  if (!nim.value || !nama.value || !matkul.value || !nilai.value) {
    alert("⚠ Harap isi semua field!");
    return false;
  }
  if (isNaN(nilai.value) || nilai.value < 0 || nilai.value > 100) {
    alert("Nilai harus berupa angka 0–100!");
    return false;
  }
  return true;
}

// Fungsi menampilkan data dari Firestore
async function loadData() {
  tabelBody.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "nilaiMahasiswa"));

  if (querySnapshot.empty) {
    tabelBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Belum ada data.</td></tr>`;
    return;
  }

  querySnapshot.forEach((document) => {
    const d = document.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${d.nim}</td>
      <td>${d.nama}</td>
      <td>${d.matkul}</td>
      <td>${d.nilai}</td>
      <td><button class="btn-hapus" data-id="${document.id}">🗑 Hapus</button></td>
    `;
    tabelBody.appendChild(row);
  });

  // Tambahkan event listener untuk tombol hapus individual
  document.querySelectorAll(".btn-hapus").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Yakin ingin menghapus data ini?")) {
        await deleteDoc(doc(db, "nilaiMahasiswa", id));
        alert("🗑 Data berhasil dihapus!");
        loadData();
      }
    });
  });
}

// Fungsi untuk hapus semua data
btnHapusSemua.addEventListener("click", async () => {
  if (!confirm("⚠ Yakin ingin menghapus SEMUA data mahasiswa?")) return;

  const querySnapshot = await getDocs(collection(db, "nilaiMahasiswa"));
  if (querySnapshot.empty) {
    alert("Tidak ada data untuk dihapus.");
    return;
  }

  try {
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, "nilaiMahasiswa", document.id));
    }
    alert("🧹 Semua data berhasil dihapus!");
    loadData();
  } catch (error) {
    console.error("❌ Gagal menghapus semua data:", error);
    alert("Terjadi kesalahan saat menghapus semua data.");
  }
});

// Jalankan saat pertama kali halaman dimuat
loadData();

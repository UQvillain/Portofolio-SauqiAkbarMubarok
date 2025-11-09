// Fungsi umum untuk memuat 1 halaman HTML ke dalam container tertentu
async function loadSection(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Gagal memuat " + filePath);

    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Gagal memuat ${filePath}:`, err);
    container.innerHTML = `<p style="color:red;">Gagal memuat ${filePath}</p>`;
  }
}

// Fungsi khusus untuk Portofolio (karena memuat banyak file sekaligus)
async function loadPortfolio() {
  const container = document.getElementById("Portofolio-container");
  if (!container) return;

  try {
    const files = [
      "page/Portofolio/qa-project.html",
      "page/Portofolio/front-end.html",
      "page/Portofolio/UI-UX.html",
      "page/Portofolio/back-end.html",
      "page/Portofolio/ml.html",
    ];

    const contents = await Promise.all(
      files.map((file) =>
        fetch(file).then((res) =>
          res.ok ? res.text() : Promise.reject("Gagal memuat " + file)
        )
      )
    );

    container.innerHTML = contents.join("");
  } catch (err) {
    console.error("Gagal memuat portofolio:", err);
    container.innerHTML = "<p style='color:red;'>Gagal memuat portofolio.</p>";
  }
}

// Jalankan setelah halaman siap
document.addEventListener("DOMContentLoaded", () => {
  loadSection("home-container", "page/home.html");
  loadSection("About-Container", "page/about.html");
  loadPortfolio();
  loadSection("Certificate-container", "page/certificate.html");
  loadSection("Contact-container", "page/contact.html");
});

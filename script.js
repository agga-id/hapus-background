window.addEventListener('DOMContentLoaded', (event) => {
  const inputElement = document.getElementById('imageUpload');
  inputElement.addEventListener('change', handleFiles, false);

  function handleFiles() {
    const file = this.files[0];

    if (file) {
      // Membuat objek FormData
      const formData = new FormData();
      formData.append('image_file', file);

      // Menampilkan pemberitahuan sedang diproses
      const notification = document.getElementById('notification');
      notification.innerHTML = 'Sabar ges proses dulu...';

      // Mengirim permintaan POST ke remove.bg API
      fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'sdvkgriWG6QGaWVignW7yKdT' // Ganti dengan API key Anda dari remove.bg
        },
        body: formData
      })
        .then(response => response.blob())
        .then(result => {
          // Menghilangkan pemberitahuan
          notification.innerHTML = '';

          // Membuat URL objek Blob
          const imgUrl = URL.createObjectURL(result);

          // Menampilkan hasil
          const resultContainer = document.getElementById('result');
          resultContainer.innerHTML = `<img src="${imgUrl}" alt="Hasil">`;

          // Menambahkan tombol download
          const downloadButton = document.createElement('button');
          downloadButton.textContent

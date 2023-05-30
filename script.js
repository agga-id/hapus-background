window.addEventListener('DOMContentLoaded', (event) => {
  const inputElement = document.getElementById('imageUpload');
  inputElement.addEventListener('change', handleFiles, false);

  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', reset);

  function handleFiles() {
    const file = this.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image_file', file);

      const notification = document.getElementById('notification');
      notification.innerHTML = 'Sabar ges, on proses...';

      fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'sdvkgriWG6QGaWVignW7yKdT' // Ganti dengan API key Anda dari remove.bg
        },
        body: formData
      })
        .then(response => response.blob())
        .then(result => {
          notification.innerHTML = '';

                    const imgUrl = URL.createObjectURL(result);

          const resultContainer = document.getElementById('result');
          resultContainer.innerHTML = `<img src="${imgUrl}" alt="Hasil">`;

          const downloadButton = document.createElement('button');
          downloadButton.textContent = 'Download';
          downloadButton.addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = imgUrl;
            a.download = 'hasil.png';
            a.click();
          });

          const resetButton = document.getElementById('resetButton');
          resetButton.style.display = 'inline-block';

          resultContainer.appendChild(downloadButton);
        })
        .catch(error => {
          console.error('Error:', error);
          notification.innerHTML = 'Terjadi kesalahan. Silakan coba lagi.';
        });
    }
  }

  function reset() {
    const inputElement = document.getElementById('imageUpload');
    inputElement.value = '';

    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    const notification = document.getElementById('notification');
    notification.innerHTML = '';

    const resetButton = document.getElementById('resetButton');
    resetButton.style.display = 'none';
  }
});


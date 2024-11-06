let codeReader;

function startScanner() {
  // Buat instance dari QR Code reader
  codeReader = new ZXing.BrowserQRCodeReader();
  
  // Cari elemen untuk menampilkan hasil
  const resultElement = document.getElementById('result');
  const scannerElement = document.getElementById('scanner');

  // Mulai memindai dari video stream
  codeReader.decodeFromVideoDevice(null, scannerElement, (result, error) => {
    if (result) {
      resultElement.textContent = `Hasil QR Code: ${result.text}`;
      window.location.href = result.text; // Membuka hasil scan
    }
    if (error) {
      console.error(error);
    }
  });
}
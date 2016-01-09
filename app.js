var photo = document.getElementById('photo');
var progressBar = document.querySelector('progress');
var processBtn = document.getElementById('processBtn');
var stretchInput = document.getElementById('stretch');
var files = null;

document.body.addEventListener('dragover', function(e){
  e.preventDefault();
});

document.body.addEventListener('drop', function(e){
  e.preventDefault();
  files = e.dataTransfer.files;
  processBtn.disabled = false;
});

processBtn.addEventListener('click', function(e){
  var process = processImage({
    img: photo,
    stretch: stretchInput.value|0,
    photos: files
  });
  process.addProgressListener(function(progress){
    progressBar.max = progress.total;
    progressBar.value = progress.number;
  });
});

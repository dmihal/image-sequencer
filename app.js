var photoCanvas = document.getElementById('photo');
var progressBar = document.querySelector('progress');

document.body.addEventListener('dragover', function(e){
  e.preventDefault();
});

document.body.addEventListener('drop', function(e){
  e.preventDefault();
  var files = e.dataTransfer.files;
  var process = processImage({
    canvas: photoCanvas,
    photos: files
  });
  process.addProgressListener(function(progress){
  	progressBar.max = progress.total;
  	progressBar.value = progress.number;
  });
});

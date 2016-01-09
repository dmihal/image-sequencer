var photoCanvas = document.getElementById('photo');

document.body.addEventListener('dragover', function(e){
  e.preventDefault();
});

document.body.addEventListener('drop', function(e){
  e.preventDefault();
  var files = e.dataTransfer.files;
  processImage({
    canvas: photoCanvas,
    photos: files
  });
});

document.body.addEventListener('dragover', function(e){
  e.preventDefault();
});

document.body.addEventListener('drop', function(e){
  e.preventDefault();
  var files = e.dataTransfer.files;
  console.log(files);
});

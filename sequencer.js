processImage = function(options){
  var ctx = options.canvas.getContext('2d');
  var reader = new FileReader();
  var index = 0;
  var img = new Image();

  reader.onloadend = function(){
    img.src = reader.result;
  }
  img.onload = function(){
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;

    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    done();
  };
  var done = function(){
    if (index + 1 < options.photos.length) {
      index++;
      drawImage();
    } else {
      console.log("done");
    }
  };

  var drawImage = function(){
    reader.readAsDataURL(options.photos[index]);
  };
  drawImage(0);
  return {}
};

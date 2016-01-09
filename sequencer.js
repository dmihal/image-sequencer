processImage = function(options){
  var ctx = options.canvas.getContext('2d');
  var reader = new FileReader();
  var img = new Image();
  var workingCtx = document.createElement('canvas').getContext('2d');

  var index = 0;
  var stretch = options.stretch || 1;
  var width, height, span, blankData;

  reader.onloadend = function(){
    img.src = reader.result;
  }
  img.onload = function(){
    if (index == 0) {
      ctx.canvas.width = workingCtx.canvas.width = width = img.width;
      ctx.canvas.height = workingCtx.canvas.height = height = img.height;
      blankData = ctx.createImageData(width, height);
      span = Math.ceil(width / (options.photos.length - 1));
    }

    var middleCol = index * span;

    workingCtx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var col = 0; col < width; col++) {
      var alpha = getPixelAlpha(col, middleCol, span * stretch) / stretch;
      if (alpha > 0){
        drawCol(col, alpha);
      }
    }
    next();
  };
  var next = function(){
    index++;

    for (var i = 0; i < progressListeners.length; i++) {
      progressListeners[i]({
        number: index,
        total: options.photos.length
      });
    }
    if (index < options.photos.length) {
      drawImage();
    } else {
      ctx.putImageData(blankData, 0, 0);
      console.log("done");
    }
  };
  var drawImage = function(){
    reader.readAsDataURL(options.photos[index]);
  };
  var drawCol = function(col, alpha){
    var data = workingCtx.getImageData(col, 0, 1, height).data;
    for (var row = 0; row < height; row++) {
      var ptr = row * 4;
      var bigPtr = (col + (row * width)) * 4;
      blankData.data[bigPtr]     += Math.floor(alpha * data[ptr]);     // red
      blankData.data[bigPtr + 1] += Math.floor(alpha * data[ptr + 1]); // green
      blankData.data[bigPtr + 2] += Math.floor(alpha * data[ptr + 2]); // blue
      blankData.data[bigPtr + 3] = 255;
    }
  };

  var getPixelAlpha = function(column, middleCol, span){
    var val = 1 - Math.abs((column - middleCol) / span);
    return val >= 0 ? val : 0;
  };

  drawImage();

  var progressListeners = [];
  return {
    addProgressListener: Array.prototype.push.bind(progressListeners)
  };
};

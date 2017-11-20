'use strict';

var field = {
  width: 420,
  height: 270,
  left: 100,
  top: 10,
  shadowOffest: 10
};

var bar = {
  width: 40,
  maxHeight: 150,
  left: 120,
  top: 70,
  indent: 50
};

function renderRect(context, coords, fill) {
  context.fillStyle = fill;
  context.fillRect(coords.left, coords.top, coords.width, coords.height);
}

function renderText(context, options) {
  context.fillStyle = options.color;
  context.font = options.font;
  context.fillText(options.text, options.left, options.top);
}

window.renderStatistics = function (ctx, names, times) {
  var barsCount = names.length;
  var histogramWidth = bar.width * barsCount + bar.indent * (barsCount - 1);
  var fieldPadding = (field.width - histogramWidth) / 2;

  renderRect(ctx, {left: field.left + field.shadowOffest, top: field.top + field.shadowOffest,
    width: field.width, height: field.height
  }, 'rgba(0, 0, 0, 0.7)');
  renderRect(ctx, field, 'rgba(255, 255, 255, 1)');
  renderText(ctx, {
    color: '#000', font: '14px PT Mono', text: 'Ура, вы победили!',
    left: field.left + fieldPadding,
    top: field.top + 20
  });


  var maxTime = Math.max.apply(null, times);

  for (var i = 0; i < barsCount; i++) {
    var barLeftX = field.left + fieldPadding + (bar.width + bar.indent) * i;
    var barTopY = 70 + bar.maxHeight * (1 - times[i] / maxTime);
    var barHeight = bar.maxHeight * times[i] / maxTime;

    if (names[i] === 'Вы') {
      var barFill = 'rgb(255, 0, 0)';
    } else {
      barFill = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    renderRect(ctx, {left: barLeftX, top: barTopY, width: bar.width, height: barHeight}, barFill);
    renderText(ctx, {
      color: '#000', font: '14px PT Mono',
      text: names[i],
      left: barLeftX,
      top: bar.top + bar.maxHeight + 20
    });
    renderText(ctx, {
      color: '#000', font: '14px PT Mono',
      text: Math.floor(times[i] / 100) / 10 + ' ms',
      left: barLeftX,
      top: bar.top + bar.maxHeight + 40
    });
  }
};

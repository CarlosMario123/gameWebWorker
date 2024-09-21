export default class Titulo {
    constructor(context) {
        this.context = context;
    }

    setTextStyle(fontSize = '48px', fontFamily = 'sans-serif', color = 'black') {
        this.context.font = `${fontSize} ${fontFamily}`;
        this.context.fillStyle = color;
    }

    drawText(text, x, y) {
        this.context.fillText(text, x, y);
    }
    drawStyledText(text, x, y, fontSize = '48px', fontFamily = 'sans-serif', color = 'black') {
        this.setTextStyle(fontSize, fontFamily, color);
        this.drawText(text, x, y);
    }
}


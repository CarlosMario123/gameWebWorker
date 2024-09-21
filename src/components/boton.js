export default class Boton {
    constructor(context, x, y, width, height, text, color, hoverColor, textColor, onClick) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = color;
        this.hoverColor = hoverColor;
        this.textColor = textColor;
        this.onClick = onClick;
        this.isHovered = false;
        this.draw();
    }

    draw() {
        this.context.fillStyle = this.isHovered ? this.hoverColor : this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        this.context.fillStyle = this.textColor;
        this.context.font = '24px Arial';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    update(mouseX, mouseY) {
        this.isHovered = this.isMouseOver(mouseX, mouseY);
        this.draw();
    }

    isMouseOver(mouseX, mouseY) {
        return mouseX > this.x && mouseX < this.x + this.width &&
               mouseY > this.y && mouseY < this.y + this.height;
    }


    handleClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.onClick) {
                this.onClick();
            }
        }
    }
}
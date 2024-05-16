export const init = () => {
    String.prototype.left = function (length) { if (this.length <= length) return this; else return this.substring(0, length); }
    String.prototype.right = function (length) { if (this.length <= length) return this; else return this.substring(this.length - length, this.length); }
}
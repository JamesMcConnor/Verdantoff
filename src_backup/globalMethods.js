export function changeImage(index) {
    this.currentImgIndex = index
    //this.currentSrc = (this.currentSrc == 0) ? 1 : 0;
    if (this.currentSrc < this.src.length - 1) {
        this.currentSrc++;
    }
    else {
        this.currentSrc = 0;
    }
}

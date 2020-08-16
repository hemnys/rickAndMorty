class scrollToTop {
  constructor(config) {
    const defaultOptions = {
      showOnScroll: false,
      shape: "square",
      style: {
        bottom: "10px",
        right: "10px",
        background: "#000000",
        color: "#ffffff",
        width: "50px",
        height: "50px",
      },
    };
    this.options = { ...defaultOptions, ...config };
    this.init = this.init.bind(this);
    this.style();
    this.init();
  }
  _template() {
    const template = `<button class="scroll-button ${this.options.shape} ${
      this.options.showOnScroll ? "scroll-hide" : "scroll-show"
    }"><i class="arrow up"></i></button>`;
    return this.stringToHTML(template);
  }
  _backtoTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  style() {
    let root = document.documentElement;
    for (let key in this.options.style) {
      root.style.setProperty(`--scroll-${key}`, `${this.options.style[key]}`);
    }
  }
  init() {
    const button = document.querySelector("body").appendChild(this._template());
    button.onclick = () => {
      this._backtoTop();
    };
    if (this.options.showOnScroll) {
      window.onscroll = () => {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          button.classList.add("scroll-show");
        } else {
          button.classList.remove("scroll-show");
        }
      };
    }
  }
  stringToHTML(s) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(s, "text/html");
    return doc.body.firstChild;
  }
}

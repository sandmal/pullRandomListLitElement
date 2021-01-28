import { LitElement, html, css } from 'lit-element';

export class PullRandom extends LitElement {
	static get properties() {
		return {
			staticList: { type: Array },
			listB: { type: Array },
			listA: { type: Array },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
				font-family: sans-serif;
				margin: 5em;
			}

			#originalList li.status_strike {
				text-decoration: line-through;
			}
		`;
	}

	constructor() {
		super();
		this.staticList;
	}

	setStaticList(list) {
		let listAux = list ? list : [];
		this.staticList = [...listAux];
		this.listA = [...listAux];
		this.listB = [];
	}

	handlePullBtn(e) {
		if (!this.listA.length) return null;
		const randomIndex = Math.floor(Math.random() * this.listA.length);
		const randomElem = this.listA.splice(randomIndex, 1)[0];
		this.listB = this.listB.concat(randomElem);

		if (this.setStaticList.length && this.listA.length === 0) {
			e.target.disabled = true;
		}
	}

	handleResetBtn(e) {
		this.setStaticList(this.staticList);
		e.target.previousElementSibling.disabled = false;
	}

	render() {
		return html`<h2>Original list</h2>
			<ul id="originalList">
				${this.staticList.map((item) => {
					const isItemNotPulled = this.listA.find((elem) => elem === item);
					const stringClass = isItemNotPulled ? '' : 'status_strike';
					return html`<li class="${stringClass}">${item}</li>`;
				})}
			</ul>

			<button @click="${this.handlePullBtn}">Pull element</button>
			<button @click="${this.handleResetBtn}">Reset</button>

			<h2>Random element removed from list</h2>
			<ol>
				${this.listB.map((item) => html`<li>${item}</li>`)}
			</ol> `;
	}
}

customElements.define('pull-list', PullRandom);

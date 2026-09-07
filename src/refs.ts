export class RefCounted implements Disposable {
	#refCount: number = 0;

	get refCount() {
		return this.#refCount;
	}

	ref(): this {
		this.#refCount++;
		return this;
	}

	unref() {
		if (this.#refCount > 0) this.#refCount--;
	}

	[Symbol.dispose]() {
		this.unref();
	}
}

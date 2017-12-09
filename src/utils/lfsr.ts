export function lfsr(n: number, t: number) {
	let r;

	if (n & 1) {
		r = (n >> 1) ^ t;
	} else {
		r = (n >> 1);
	}

	return r;
}

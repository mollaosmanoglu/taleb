/**
 * Skewed Gaussian curve generation for probability distribution figures.
 * Used by Hydra (Fig 22) and Tony (Fig 26).
 */

export function skewedGaussian(x, mu, sigma, alpha) {
	const z = (x - mu) / sigma;
	const phi = Math.exp(-0.5 * z * z);
	const erf = Math.tanh(alpha * z * 0.7071); // fast erf approximation
	return phi * (1 + erf);
}

export function generateCurve(mu, sigma, alpha, n = 100, range = [-4, 4]) {
	const step = (range[1] - range[0]) / n;
	const points = Array.from({ length: n + 1 }, (_, i) => {
		const x = range[0] + i * step;
		return { x, y: skewedGaussian(x, mu, sigma, alpha) };
	});

	// Normalize so max y = 1
	const maxY = Math.max(...points.map((p) => p.y));
	if (maxY > 0) {
		for (const p of points) p.y /= maxY;
	}

	return points;
}

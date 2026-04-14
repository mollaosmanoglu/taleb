/**
 * Skewed Gaussian curve generation for probability distribution figures.
 * Used by Hydra (Fig 22) and Tony (Fig 26).
 */

export function skewedGaussian(x, mu, sigma, alpha) {
	const z = (x - mu) / sigma;
	// Use wider base for the skewed side to create a visible fat tail
	const skewZ = z - alpha * 0.15;
	const phi = Math.exp(-0.5 * skewZ * skewZ / (1 + Math.abs(alpha) * 0.08));
	// Suppress the opposite tail
	const suppress = 1 / (1 + Math.exp(-alpha * z * 1.5));
	return phi * suppress;
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

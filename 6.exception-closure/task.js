function parseCount(value) {
	const num = Number.parseFloat(value);

	if (Number.isNaN(num)) {
		throw new Error("Невалидное значение");
	}

	return num;
}

function validateCount(value) {
	try {
		return parseCount(value);
	} catch (error) {
		return error;
	}
}

class Triangle {
	constructor(a, b, c) {
		if (a + b <= c || a + c <= b || b + c <= a) {
			throw new Error("Треугольник с такими сторонами не существует");
		}

		this.a = a;
		this.b = b;
		this.c = c;
	}

	get perimeter() {
		return this.a + this.b + this.c;
	}

	get area() {
		const p = this.perimeter / 2;
		const square = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
		return Number(square.toFixed(3));
	}
}

function getTriangle(a, b, c) {
	try {
		return new Triangle(a, b, c);
	} catch (error) {
		const errorTriangle = {};

		Object.defineProperty(errorTriangle, 'perimeter', {
			get() {
				return "Ошибка! Треугольник не существует";
			},
			set() {
				// игнорируем присвоение
			},
			configurable: false,
			enumerable: true
		});

		Object.defineProperty(errorTriangle, 'area', {
			get() {
				return "Ошибка! Треугольник не существует";
			},
			set() {
				// игнорируем присвоение
			},
			configurable: false,
			enumerable: true
		});

		return errorTriangle;
	}
}
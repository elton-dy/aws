const square = require("./square")

describe('Tests unitaires', () => {
	test("Calcul un nombre positif", () => {
		expect(square(5)).toBe(25);
	})

	test("Calcul un nombre négatif", () => {
		expect(square(-3)).toBe(9)
	})

	test("Calcul un non nombre", () => {
		expect(() => square("Hello")).toThrow("Le paramètre doit être un chiffre.")
	})
})
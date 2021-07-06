import { erf } from "mathjs";
import { E, PI } from "./constants";

export class Distribution {
    constructor() {

    }
}

export class UniformDistribution extends Distribution {
    a: number;
    b: number;

    constructor(a: number, b: number) {
        super()
        this.a = a;
        this.b = b
    }

    get range() { return this.b - this.a };

    inBounds(x: number) { return this.a < x && x < this.b }

    pdf = (x: number) => { return (this.inBounds(x) ? 1 / (this.range) : 0) }

    cdf = (x: number) => {
        if (x < this.a) { return 0 }
        else if (this.inBounds(x)) { return ((x - this.a) / (this.range)) }
        else { return 1 }
    }
}

export class NormalDistribution extends Distribution {
    mu: number;
    sigma: number;

    constructor(mu: number, sigma: number) {
        super();
        this.mu = mu;
        this.sigma = sigma;
    }

    pdf = (x: number) => (1 / (this.sigma * Math.sqrt(2 * PI))) * Math.pow(E, -0.5 * (((x - this.mu) / this.sigma) ** 2));

    cdf = (x: number) => 0.5 * (1 + erf((x - this.mu) / this.sigma))
}
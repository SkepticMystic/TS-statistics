import { NormalDistribution } from './distributions';
import { confInt } from './Functions/basic-stats';

const stdNorm = new NormalDistribution(0, 1);

// console.log(stdNorm.pdf(0))
console.log(confInt(0.4401, Math.sqrt(0.4401 * (1 - 0.4401)), 902, 0.05))
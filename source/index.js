import instructions from './instructions.js';
import { createMemory } from './memory.js';
import { createProcessor, debugRegister, stepRegister } from './processor.js';

const memory = createMemory(256);
const writeableBytes = new Uint8Array(memory.buffer);

export const processor = createProcessor(memory);

writeableBytes[0] = instructions.MOV_LIT_R1;
writeableBytes[1] = 0x12;
writeableBytes[2] = 0x34;

writeableBytes[3] = instructions.MOV_LIT_R2;
writeableBytes[4] = 0xab;
writeableBytes[5] = 0xcd;

writeableBytes[3] = instructions.ADD_REG_REG;
writeableBytes[4] = 0x2;
writeableBytes[5] = 0x3;

debugRegister();
stepRegister();

debugRegister();
stepRegister();

debugRegister();
stepRegister();

debugRegister();
stepRegister();

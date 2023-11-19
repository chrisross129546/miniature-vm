import { processor } from './index.js';
import instructions from './instructions.js';
import { createMemory } from './memory.js';

export const createProcessor = memory => {
    const registerNames = ['ip', 'acc', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8'];
    const register = createMemory(registerNames.length * 2);
    const registerMap = registerNames.reduce((map, name, index) => {
        map[name] = index * 2;
        return map;
    }, {});

    return { memory, registerNames, register, registerMap };
};

const getRegister = name => {
    if (!processor.registerNames.includes(name)) throw Error(`Register ${name} does not exist`);

    const offset = processor.registerMap[name];
    return processor.register.getUint16(offset);
};

const setRegister = (name, value) => {
    if (!processor.registerNames.includes(name)) throw Error(`Register ${name} does not exist`);

    const offset = processor.registerMap[name];
    return processor.register.setUint16(offset, value);
};

const fetchRegister = () => {
    const nextInstructionAddress = getRegister('ip');
    const instruction = processor.memory.getUint8(nextInstructionAddress);

    setRegister('ip', nextInstructionAddress + 1);
    return instruction;
};

const fetchRegister16 = () => {
    const nextInstructionAddress = getRegister('ip');
    const instruction = processor.memory.getUint16(nextInstructionAddress);

    setRegister('ip', nextInstructionAddress + 2);
    return instruction;
};

const debugRegister = () => {
    processor.registerNames.forEach(name =>
        console.log(`${name} 0x${getRegister(name).toString(16).padStart(4, '0')}`)
    );

    console.log();
};

const stepRegister = () => {
    const instruction = fetchRegister();
    return executeRegister(instruction);
};

const executeRegister = instruction => {
    switch (instruction) {
        // r1
        case instructions.MOV_LIT_R1: {
            const literal = fetchRegister16();
            setRegister('r1', literal);

            break;
        }

        // r2
        case instructions.MOV_LIT_R2: {
            const literal = fetchRegister16();
            setRegister('r2', literal);

            break;
        }

        // add
        case instructions.ADD_REG_REG: {
            const register1 = fetchRegister();
            const register2 = fetchRegister();

            const value1 = processor.register.getUint16(register1 * 2);
            const value2 = processor.register.getUint16(register2 * 2);

            setRegister('acc', value1 + value2);

            break;
        }
    }
};

export { getRegister, setRegister, fetchRegister, fetchRegister16, debugRegister, stepRegister, executeRegister };

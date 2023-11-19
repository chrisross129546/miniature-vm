export const createMemory = byteLength => {
    const buffer = new ArrayBuffer(byteLength);
    const view = new DataView(buffer);

    return view;
};

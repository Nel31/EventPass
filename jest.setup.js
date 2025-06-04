import '@testing-library/jest-dom';

// Mock File API
global.File = class MockFile {
  constructor(bits, name, options) {
    this.name = name;
    this.type = options?.type || '';
  }
}; 
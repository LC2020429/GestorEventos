global.localStorage = {
  getItem: jest.fn(() => JSON.stringify([])), 
  setItem: jest.fn(),
};

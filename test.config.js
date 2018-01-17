const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-15.4');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
export default (state = [], { type, payload }) => {
  switch (type) {
    case 'ATTACHMENT_CREATE':
      return [payload, ...state];   
    case 'TOKEN_REMOVE': 
      return [];
    default: 
      return state;
  }
};

import apiFetch from "./http"; 

const getPastKycCalls = () => {
  return apiFetch("/past"); 
};

export default getPastKycCalls;

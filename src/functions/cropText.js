export const cropText = (pros, cons, maxLength, maxOfMax) => {
  let remainderCharechters = maxOfMax;
  let substr = "";

  let cPros = "";
  let cCons = "";

  // pros check
  if (pros.length > maxLength) {
    cPros = pros.substring(0, maxLength) + "...";
    remainderCharechters = 0;
    return { pros: cPros, cons: cCons, endOfText: false };
  } else {
    cPros = cPros + pros;
    remainderCharechters = remainderCharechters - cPros.length;
  }

  // cons check
  if (cons.length > remainderCharechters) {
    cCons = cCons + cons.substring(0, remainderCharechters) + "...";
    return { pros: cPros, cons: cCons, endOfText: false };
  } else {
    cCons = cCons + cons;
    return { pros: cPros, cons: cCons, endOfText: true };
  }
};

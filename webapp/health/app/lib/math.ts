export function calcLin(vals_n : (number | null)[]) {
    for (const x in vals_n) {
      if (x === null) {
        return null;
      }
    }
  
    const vals = vals_n as number[];
  
    const initVal = 0;
    const n = 6;
    // 0 + ... + 5
    const nSum = 15; 
    const sum = vals.reduce((total, val) => total + val, initVal); 
    let i = 0;
    const squareXSum = vals.reduce((total, val) => {
      i++
      return total + ((i-1) * (i-1))}, initVal); 
    i = 0;
    const productSum = vals.reduce((total, val) => { 
      i++;
      return total + (val * (i-1));
    }, initVal); 
    
    // Calculate, m & c for "y = mx + c"
    let gradient = (n * productSum - nSum * sum) / (n * squareXSum - nSum * nSum);
    let intercept = (sum / n) - ((gradient * nSum) / n);
  
    const ys = [];
    for (let i = 0; i < n; i++) {
      // y_i = mx_i + c
      ys.push(i * gradient + intercept);
    }

    console.log(ys)
    return ys;
  }
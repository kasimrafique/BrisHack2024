// For a line of length 5.
// export async function calcLin(start : number, vals_n : (number | null)[]) {
//   for (const x in vals_n) {
//     if (x === null) {
//       return null;
//     }
//   }


//   const vals = vals_n as number[];
//   console.log(vals)

//   const n = 6;
//   // (start + 0) + ... + (start + 5)
//   const nSum = (1/2) * (start + (start + 5)); 
//   const sum = vals.reduce((total, val) => total + val); 
//   const squareSum = vals.reduce((total, val) => total + (val * val)); 
//   let i = start;
//   const productSum = vals.reduce((total, val) => { 
//     i++;
//     return total + (val * (i-1));
//   }); 

//   console.log(`${nSum}, ${sum}, ${squareSum}, ${productSum}`)

//   // Calculate, m & c for "y = mx + c"
//   let gradient = (n * productSum - nSum * sum) / (n * squareSum - nSum * nSum);
//   let intercept = (sum / n) - ((gradient * nSum) / n);
//   console.log(`${gradient}, ${intercept}`)

//   const ys = [];
//   for (let i = start; i < start + n; i++) {
//     // y_i = mx_i + c
//     ys.push(i * gradient + intercept);
//   }
//   console.log(`${ys}`)
//   return ys;
// }

export function calcLin(start : number, vals_n : (number | null)[]) {
    for (const x in vals_n) {
      if (x === null) {
        return null;
      }
    }
  
  
    const vals = vals_n as number[];
    // console.log(vals)
  
    const initVal = 0;
    const n = 6;
    // 0 + ... + 5
    const nSum = 15; 
    const sum = vals.reduce((total, val) => total + val, initVal); 
    const squareSum = vals.reduce((total, val) => {
      // console.log(`${val} * ${val}`)
      return total + (val * val)}, initVal); 
    let i = 0;
    const productSum = vals.reduce((total, val) => { 
      i++;
      // console.log(`Total: ${total}`)
      // console.log(`${val} * ${i-1}`)
      return total + (val * (i-1));
    }, initVal); 
  
    console.log(`${nSum}, ${sum}, ${squareSum}, ${productSum}`)
  
    // Calculate, m & c for "y = mx + c"
    let gradient = (n * productSum - nSum * sum) / (n * squareSum - nSum * nSum);
    let intercept = (sum / n) - ((gradient * nSum) / n);
    //console.log(`${gradient}, ${intercept}`)

  
    const ys = [];
    for (let i = 0; i < n; i++) {
      // y_i = mx_i + c
      ys.push(i * gradient + intercept);
    }
    //console.log(`${ys}`)

    return ys;
  }
/**
 * https://www.hackerrank.com/challenges/bigger-is-greater/problem
 */

let vals = w.split('');
    let largest = -1;
    
    
    for(let i = 0 ; i < vals.length - 1 ; i++){
        if(vals[i] < vals[i+1]){
            largest = i; 
        }
    }
    
    if(largest === -1){
        return 'no answer'
    }
    
    let large =-1;
    for(let j = 0; j < vals.length; j++){
        if(vals[largest] < vals[j]){
            large = j
        }
    }
    
    let temp = vals[largest];
    vals[largest] = vals[large];
    vals[large] = temp;
    
    const endArray = vals.splice(largest + 1);
    endArray.reverse();
    vals = vals.concat(endArray);


    return vals.join('');
const arr = [1,2,3,4,6]
let index = 4;
let arr2 = [...(index>0?arr.slice(0, index):[]), 9, ...(index<arr.length-1?arr.slice(index+1):[])]

function k(arr){
  let j = [...arr]
  j[index] = 9;
  return j;
}

console.log(arr)
console.log(((arr)=>{
  let j = [...arr]
  j[index] = 9;
  return j;
})(arr))
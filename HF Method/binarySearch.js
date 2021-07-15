let arr = [3,48,66,71,99,101,120,151,188,209]

function BinarySearch(target){
  let start = 0;
  let end = arr.length-1;
  let middle, element;

  while(start <= end){
    middle = Math.floor((start+end)/2);
    element = arr[middle]
    if(element === target){
      return middle;
    }
    else if(target <= element){
      end = middle-1;
    }
    else{
      start = middle+1;
    }
  }
  return false;
}

console.log(BinarySearch(71))
const users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",

    email: "john.doe@example.com",
    isActive: true,
    age: 30,
  },
  {
    id: 2,

    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    isActive: false,
    age: 19,
  },
  {
    id: 3,

    firstname: "John",
    lastname: "Doe",
    email: "mike.johnson@example.com",
    isActive: true,
    age: 76,
  },
];
// const huh=[]
// for (let i=0;i<users.length; i++){
//     huh[i]=users[i].name

// }
// console.log(huh)
// const names=[]
// users.forEach((user)=>{

//     names.push(user.firstname+" "+user.lastname)

// })
// const names=[]
// users.forEach((user)=>{
//     if(user.isActive){
//         names.push(user.firstname+" "+user.lastname)
//     }
// })

//

// const names = [];
// users.sort((user1, user2) => (user1.age > user2.age ? -1 : 1));
// users.forEach((user) => {
//   if (user.isActive) {
//     names.push(user.firstname + " " + user.lastname);
//   }
// });
// const names = users
//   .sort((user1, user2) => (user1.age > user2.age ? -1 : 1))
//   .filter((user) => user.isActive)
//   .map((user) => user.firstname + " " + user.lastname);
// console.log(names);

// const private=()=>{
//     let count=2
//     //  inc=()=>{
//     //     return count+2
//     // }
//     return{
//         inc:()=>{
//             return count+2
//         },
//         getvalue:()=>{
//                 return count
//         }
//     }
// }
// const clo=private()
// console.log(clo.getvalue)
// console.log(clo.inc)
// console.log(clo.getvalue)


// const curry=(a)=>{
//     return curry2=(b,c)=>{
//         const nums=[a,b,c]
//         nums.sort((num1,num2)=>num1<num2? -1:1)
//         return nums
//     }
// }
// console.log(curry(5)(2,3))
 
// const es=(arr,el)=>{
    
//     return [...arr,el]
// }
// let num=[1,2]
// console.log(es(num,3))
// console.log(num)
// const isexist=users.some((user)=>user.firstname=="John")
// if (isexist){
//     console.log(isexist)
// }
// const unique=arr={
//     unq:new Set(arr)

// }
// const nums=[1,2,5,2,4,5,2,3,7,1]
// const unq=(arr)=>{
//    const result=[]
//    arr.forEach((num)=>{
//     if(!result.includes(num)){
//       result.push[num]
//     }
//    })
// }
// console.log(unq(nums))
// const names=users.map((user)=>user.firstname+" "+user.lastname)
// function printnames(){
//     console.log(names)
// }
// // console.log(names)
// printnames()

// const outer=(a)=>{
//     return function inner(b){
//         console.log(a,b)
//     }
// }
// const func=outer("a")
// func("b")
console.log(1)
setTimeout(()=>{
    console.log(2)
},0)
console.log(3)
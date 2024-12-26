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
 
const es=(arr,el)=>{
    
    return [...arr,el]
}
let num=[1,2]
console.log(es(num,3))
console.log(num)
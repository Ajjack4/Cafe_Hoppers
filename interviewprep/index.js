const fetchapi = async () => {
  await fetch("https://api.sampleapis.com/coffee/hot")
    .then((resp) => resp.json())
    .then((data) => console.log(data[0]));
  console.log("done ");
  console.log(data);
};

fetchapi();

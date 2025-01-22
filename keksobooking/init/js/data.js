let appartments = [];
let map;

const saveData = (newAppartments) =>{
  appartments = structuredClone(newAppartments);
  return appartments;
};

const saveMap = (mapData) =>{
  map = mapData;
  console.log(map);
  return map;
};

export {saveData, saveMap};

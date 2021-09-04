import create from 'zustand';

async function loadGamineData() {
  const response = await fetch('./gamine.csv');
  const text = await response.text();
  return CSVToJson(text);
}

async function loadHookfishData() {
  const response = await fetch('./hookfish.csv');
  const text = await response.text();
  return CSVToJson(text);
}

function CSVToJson(csv) {
  const lines = csv.split('\r\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {        
      if (!lines[i])
          continue
      const obj = {}
      const currentline = lines[i].split(',')

      for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j]
      }
      result.push(obj)
  }
  return result
}

const useStore = create(set => ({
  gamineData: [],
  hookfishData: [],
  currRestaurant: '',
  loadGamineData: async () => {
    loadGamineData().then((resp)=> {
      set(state => ({gamineData: resp}))
    });
  },
  loadHookfishData: async () => {
    loadHookfishData().then((resp)=> {
      set(state => ({hookfishData: resp}))
    });
  },
  setCurrRestaurant: (restaurant) => {
    set(state => ({currRestaurant: restaurant == 'hookfish' ? 'hookfishData' : 'gamineData'}))
  }
}));

export default useStore;
const req = require("request-promise-native")
const sleep = require("util").promisify(setTimeout)
const url = require("./config").API

const lim = 4200

const TO = 500

const slots = {
  "2": "amour",
  "3": "belt",
  "5": "gloves",
  "6": "boots",
  "7": "shoulders",
  "8": "cape",
  "9": "helm",
  "10": "weapon",
  "12": "pet"
}

let init = 1287

function getItem(id) {
  req({
    method: 'POST',
    uri: `${url}${id}`,
    json: true
  }).then( async res => {
      if (id > lim) return

      if (res[0]) {
        if (res[0].EquipSlot) {
        console.log(`{ "ID": "${res[0].ID}", "Name": "${res[0].Name}", "Type": "${slots[res[0].EquipSlot]}", "Colour": "", "2ndColour": "", "Availability": "", "Gender": "", "url": "" }`)
        }
      }
      await sleep(TO)
      getItem(id + 1)
    })
}

getItem(init)

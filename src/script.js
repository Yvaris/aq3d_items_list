const req = require("request-promise-native")
const sleep = require("util").promisify(setTimeout)
const url = require("./config").API

const lim = 4200

const TO = 500

const slots = {
  "2": "armours",
  "3": "belts",
  "5": "gloves",
  "6": "boots",
  "7": "shoulders",
  "8": "capes",
  "9": "helms",
  "10": "weapons",
  "11": "guns",
  "12": "pets"
}

let init = 1326

function getItem(id) {
  req({
    method: "POST",
    uri: `${url}${id}`,
    json: true
  }).then(async res => {
    if (id > lim) return

    if (res[0]) {
      if (res[0].EquipSlot) {
        console.log(
          `{ id: ${res[0].ID}, name: "${res[0].Name}", type: ${
            res[0].EquipSlot
          }, rarity: ${res[0].Rarity}, colour: "", "2ndColour": "", availability: "", url_m: "", url_f: "" },`
        )
      }
    }
    await sleep(TO)
    getItem(id + 1)
  })
}

getItem(init)

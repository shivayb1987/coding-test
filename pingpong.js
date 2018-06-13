var fs = require('fs')
var input = fs.readFileSync('./input.txt', 'utf8')
main(input)

function main(input) {
    var [n, ...rest] = input.split("\r\n");
    let players = []
    let timeMap = {}
    for (let i=0; i < n; i++) {
        let [start, end] = rest[i].split(' ').map(str => parseInt(str))
        for (let j=start; j < end; j++) {
            players.push({
                player: i,
                slot: `${start+(j-start)} - ${start+(j-start)+1}`
            })
        }
    }
    let totalCount = 0
    let slotCount = {}
    for (let i=0; i < players.length; i++) {
        const {slot} = players[i]
        if (timeMap[slot]) {
            slotCount[slot] = slotCount[slot] + 1
        } else {
            timeMap[slot] = slot
            slotCount[slot] = 0
        }
    }
    let count = { single: 0, double: 0}
    for (let key in slotCount) {
        const num = slotCount[key]
        if (num >= 3) {
            count['double'] += 1
        } else if (num === 2) {
            count['single'] += 1
        } else {
            count['single'] += num
        }
    }
    return count
}



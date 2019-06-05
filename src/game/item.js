var item = [
  {
    title: 'red potion',
    src: '/static/redPotion.png',
    slots: 1
  },
  {
    title: 'blue potion',
    src: '/static/bluePotion.png',
    slots: 1
  },
  {
    title: 'green potion',
    src: '/static/greenPotion.png',
    slots: 1
  },
  {
    title: 'sword',
    src: '/static/sword.png',
    slots: 2,
    type: 'weapon',
    bon: [
      {
        type: 'dmg',
        value: 10
      },
      {
        type: 'armor',
        value: 10
      }
    ],
    lvl: 1
  },
  {
    title: 'glewia',
    src: '/static/glaive.png',
    slots: 3,
    type: 'weapon',
    dmg: 20,
    lvl: 1
  },
  {
    title: 'mnisia',
    src: '/static/mnisia.png',
    slots: 2,
    type: 'armor',
    bon: [
      {
        type: 'armor',
        value: 10
      }
    ],
    lvl: 1
  },
  {
    title: 'helmet',
    src: '/static/helmet.png',
    slots: 1,
    type: 'helmet',
    bon: [
      {
        type: 'armor',
        value: 5
      }
    ],
    lvl: 1
  },
  {
    title: 'shield',
    src: '/static/shield.png',
    slots: 1,
    type: 'shield',
    bon: [
      {
        type: 'armor',
        value: 5
      }
    ],
    lvl: 1
  },
  {
    title: 'shoes',
    src: '/static/shoes.png',
    slots: 1,
    type: 'shoes',
    bon: [
      {
        type: 'armor',
        value: 5
      }
    ],
    lvl: 1
  },
  {
    title: 'long sword',
    src: '/static/LongSword.png',
    slots: 2,
    type: 'weapon',
    bon: [
      {
        type: 'dmg',
        value: 30
      }
    ],
    lvl: 2
  }
]

export default item

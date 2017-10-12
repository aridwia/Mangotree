var cron = require('node-cron');
var firebase = require('firebase');

// Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-BR9MGjt6bdRcZ-gmov1ynrjB3_ETKig",
    authDomain: "battle-ex-6f625.firebaseapp.com",
    databaseURL: "https://battle-ex-6f625.firebaseio.com",
    projectId: "battle-ex-6f625",
    storageBucket: "battle-ex-6f625.appspot.com",
    messagingSenderId: "623899963707"
  };

  firebase.initializeApp(config);

  var db = firebase.database()

"use strict"

class Fruit {
  constructor () {
    this.quality = this.cekKualitasBuah();
  }
  cekKualitasBuah () {
    let kualitasAcak = Math.floor(Math.random() * 2);
    return (kualitasAcak == 0)? 'bad': 'good'
  }
}
class FruitTree {
  constructor () {
    this.umur = 0;
    this.tinggi = 0;
    this.buah = [];
    this.statusKesehatan = true;
    this.maxUmur = 20;
    this.panen = ''
  }

  getAge () {
    return this.umur
  }

  getHeight () {
    return this.tinggi
  }

  getFruits () {
    return this.buah
  }

  getHealtyStatus () {
    return this.statusKesehatan
  }

  grow (inputmaxUmur) {
    this.umur++
    if (this.umur < inputmaxUmur) {
      if (this.umur <= (inputmaxUmur-10)) {
        this.tinggi = this.tinggi + parseFloat((Math.random() * 1).toFixed(2))
      }
    } else if(this.umur == inputmaxUmur) {
      this.statusKesehatan = false;
    }
  }

  produceFruits () {
    let jumlahBuahdiProduksi = Math.ceil(Math.random() * 15);
    for (var i = 0; i < jumlahBuahdiProduksi; i++) {
      this.buah.push(new Fruit())
    }
    // console.log("ini juamlah buah",jumlahBuahdiProduksi);
  }

  harvest () {
    let goodFruit = 0;
    let badFruit = 0;

    for (var i = 0; i < this.buah.length; i++) {
      if (this.buah[i].quality == 'good') {
        goodFruit++
      } else {
        badFruit++
      }
    }
    let fruitsHarvested = this.buah.length;
    this.panen = this.buah.length
    return `${fruitsHarvested} (${goodFruit} good, ${badFruit} bad)`
  }
}


class MangoTree extends FruitTree {
  constructor(name) {
    super();
    this.name = name;
    this.maxUmur = 20;
  }
}

class Mango extends Fruit{
}

//   driver code untuk release 0
   let mangoTree = new MangoTree('manggo')

   db.ref('tree').set(mangoTree)

   let grow = cron.schedule('*/5 * * * * * ', function () {
     if (mangoTree.statusKesehatan !== false) {
       mangoTree.grow(1000)
       mangoTree.produceFruits(10)
       mangoTree.harvest()
       db.ref('tree').set(mangoTree)
       console.log(`[Year ${mangoTree.umur} Report] Height = ${mangoTree.tinggi} Meter| Fruits harvested = ${mangoTree.panen}`)
       //  } while (mangoTree.statusKesehatan != false)
     } else {
       grow.stop()
       console.log('mango nya modars');
     }
   })

//   driver code untuk release 0
  //  let mangoTree = new MangoTree()
  //
  //  do {
  //    mangoTree.grow(20);
  //    mangoTree.produceFruits();
  //   //  mangoTree.harvest();
  //    console.log(`[Year ${mangoTree.umur} Report] Height = ${mangoTree.tinggi} | Fruits harvested = ${mangoTree.harvest()}`)
  //  } while (mangoTree.statusKesehatan != false)
  //  console.log();
// console.log(mangoTree.buah);


//release 1
// class AppleTree extends FruitTree {
//   constructor (name) {
//     super();
//     this.name = name;
//     this.maxUmur = 15;
//   }
// }
//
// class Apple extends Fruit {
// }
//
// let appleTree = new AppleTree('Apple')
// console.log(`${appleTree.name} tree is alive`);
// do {
//   appleTree.grow(15)
//   appleTree.produceFruits();
//   console.log(`Year ${appleTree.umur} Height = ${appleTree.tinggi} m , Fruit harvested = ${appleTree.harvest()}`);
// } while (appleTree.statusKesehatan != false)
// console.log(`Pohon ${appleTree.statusKesehatan} ${appleTree.name} modars`);
//
// console.log('******************************************************************');
// //release 2
// class PearTree extends FruitTree {
//   constructor(name) {
//     super()
//     this.name = name
//     this.maxUmur = 12
//   }
// }
//
// class Pear extends Fruit {
// }
//
// let pear = new PearTree('Pear')
// console.log(`Pohon ${PearTree.name} hidup`);
// do {
//   pear.grow(12);
//   pear.produceFruits();
//   console.log(`Year ${pear.umur} Height = ${pear.tinggi} m , Fruit harvested = ${pear.harvest()}`);
// } while (pear.statusKesehatan != false)
// console.log(`Pohon ${pear.statusKesehatan} ${PearTree.name} modars`);
// console.log('******************************************************************');
//
//
// // release 3
// class TreeGrove {
//   constructor() {
//     this.pohon2 = []
//   }
//   inputTree(jenis, umur, tinggi, buah, statusKesehatan) {
//     let pohon = new jenis();
//     pohon.name = jenis.name
//     pohon.umur = umur;
//     pohon.tinggi = tinggi;
//     pohon.buahnya = [];
//     pohon.jumlahBuah = buah;
//     pohon.statusKesehatan = statusKesehatan;
//     this.pohon2.push(pohon)
//   }
//
//   showTrees() {
//     for (var i = 0; i < this.pohon2.length; i++) {
//       console.log(this.pohon2[i].name);
//     }
//   }
//
//   showAges() {
//     for (var i = 0; i < this.pohon2.length; i++) {
//       console.log(`${this.pohon2[i].name}, umur: ${this.pohon2[i].umur}`)
//     }
//   }
//
//   matureTrees() {
//     let mature = '\n'
//     for (var i = 0; i < this.pohon2.length; i++) {
//       if((this.pohon2[i].jumlahBuah > 0) && (this.pohon2[i].statusKesehatan)) {
//         mature += `${this.pohon2[i].name} \n`
//       }
//     }
//     return mature
//   }
//
//   deadTrees() {
//     let dead = '\n'
//     for (var i = 0; i < this.pohon2.length; i++) {
//       if (!this.pohon2[i].statusKesehatan) {
//         dead += `${this.pohon2[i].name} \n`
//       }
//     }
//     return dead
//   }
// }

// let treeGrove = new TreeGrove()

// treeGrove.inputTree(MangoTree, 7, 12, 102, true);
// treeGrove.inputTree(AppleTree, 4, 8, 14, true);
// treeGrove.inputTree(PearTree, 19, 18, 0, false);
// treeGrove.showTrees();
// treeGrove.showAges();
// console.log(`Ini pohon yang sedang berbuah: ${treeGrove.matureTrees()}`);
// console.log(`Ini pohon yang sudah mati: ${treeGrove.deadTrees()}`);
